// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2022 Andi Dittrich <https://andidittrich.com>
// ----------------------------------------------------------------------

// --------------------------------------------------------------------------
// EnlighterJS Syntax Highlighter - https://enlighterjs.org
// --------------------------------------------------------------------------

const _package = require('./package.json');
const _path = require('path');
const _gulp = require('gulp');
const _express = require('express');
const _log = require('fancy-log');
const _gulp_less = require('gulp-less');
const _gulp_replace = require('gulp-replace');
const _prettyError = require('gulp-prettyerror');
const _concat = require('gulp-concat');
const _gulp_cleancss = require('gulp-clean-css');
const _header = require('gulp-header');
const _uglify = require('gulp-uglify');
const _rollup = require('rollup');
const _rollup_babel = require('@rollup/plugin-babel');
const _rollup_resolve = require('@rollup/plugin-node-resolve');

// themes to include
const themelist = ['enlighter', 'beyond', 'classic', 'godzilla', 'atomic', 'droide', 'minimal', 'eclipse', 'mowtwo', 'rowhammer', 'bootstrap4', 'dracula', 'monokai'];

// license header prepended to builds
const licenseHeader = `/*! EnlighterJS Syntax Highlighter ${_package.version} | Mozilla Public License 2.0 | https://enlighterjs.org */\n`;

// transpile ES6 and write to tmp file
_gulp.task('es6-transpile', async function(){
    const bundle = await _rollup.rollup({
        input: './src/browser/EnlighterJS.js',
        plugins: [
            _rollup_resolve.nodeResolve(),
            _rollup_babel.babel({
                babelHelpers: 'bundled'
            })
        ]
    });

    // write the bundle to disk
    await bundle.write({
        format: 'iife',
        name: 'EnlighterJS',
        file: './.tmp/enlighterjs.js'
    });
});

// compress
_gulp.task('library', _gulp.series('es6-transpile', function(){

    // add jquery addon and minify it
    return _gulp.src(['.tmp/enlighterjs.js', 'src/browser/jquery.js'])
        .pipe(_prettyError())

        // minify
        .pipe(_uglify())
        .pipe(_concat('enlighterjs.min.js'))

        // add license header
        .pipe(_header(licenseHeader))

        // add version string
        .pipe(_gulp_replace(/\[\[VERSION]]/g, _package.version))

        .pipe(_gulp.dest('./dist/'));
}));

// generator to transpile less->css
function less2css(themes, outputFilename){
    const themesources = themes.map(function(l){
        return 'src/themes/' + l + '.less';
    });
    
    // base is always required!
    return _gulp.src(['src/themes/core/base.less'].concat(themesources))
        .pipe(_prettyError())

        .pipe(_gulp_less())
        .pipe(_gulp_cleancss())
        .pipe(_concat(outputFilename + '.min.css'))

        // add license header
        .pipe(_header(licenseHeader))

        .pipe(_gulp.dest('dist'));
}

// LESS to CSS (Base + Themes)- FULL Bundle
_gulp.task('less-themes-full', function (){
    return less2css(themelist, 'enlighterjs');
});

// Single Theme export
_gulp.task('less-themes-single', _gulp.series(
    ...themelist.map(name => {
        _gulp.task('less-theme-' + name, function(){
            return less2css([name], 'enlighterjs.' + name)
        });
        return 'less-theme-' + name;
    })
));

// development webserver
_gulp.task('webserver', function(){
    // start development webserver
    const webapp = _express();
    webapp.get('/', function(req, res){
        res.sendFile(_path.join(__dirname, 'Development.html'));
    });
    webapp.get('/dev.html', function(req, res){
        res.sendFile(_path.join(__dirname, 'Development.html'));
    });
    webapp.use(_express.static(_path.join(__dirname, 'dist')));
    webapp.listen(8888, () => _log('DEV Webserver Online - localhost:8888'));
});

_gulp.task('watch', _gulp.series('library', 'less-themes-full', 'webserver', function(){
    // js, jsx files
    _gulp.watch(['src/**/*.js', 'src/**/*.jsx'], ['library']).on('change', function(event) {
        _log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    // less files
    _gulp.watch('src/**/*.less', ['less-themes-full']).on('change', function(event) {
        _log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
}));

// default task
_gulp.task('default', _gulp.series('library', 'less-themes-full', 'less-themes-single'));