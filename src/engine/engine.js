// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2018 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

// global plugin options
import {getOption} from '../engine/options';

// Container of Language Engines
//import * as _languages from '../lang/index';

// Languages aliases
import {getInstance} from './language-resolver';

// Container of Views/Layouts
import * as _views from '../ui/views/index';

// helper funtion
function getLayout(name){
    // transform to lowercase
    name = (name || '').toLowerCase();

    // layout available ?
    return (_views[name] ? _views[name] : _views.standard);
}

// The Highlighting Engine Backend
export function render(dataset){

    // get layout
    const layoutEngine = getLayout(dataset[0].params.layout)

    // entries to token lists
    const codeblocks = dataset.map(function({code, params}){
         // text input required!
        if (typeof code !== 'string'){
            throw new TypeError('EnlighterJS Engine requires string input')
        }

        // use given language - including generic fallback
        //const languageIdentifier = getLanguage(params.language) || getLanguage(getOption('language')) || 'generic';

        // create language engine instance
        //const languageProcessor = new _languages[languageIdentifier];

        // create language engine instance
        const languageProcessor = getInstance(params.language, getOption('language'));

        // apply language processor
        return {
            tokens: languageProcessor.analyze(code),
            params: params,
            code: code
        }
    });

    // render layout
    return layoutEngine(codeblocks);
}