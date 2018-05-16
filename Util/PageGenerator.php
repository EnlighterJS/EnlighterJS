<?php 

/**
 * Generate the EnlighterJS Documentation Pages
 * @author Andi Dittrich
 * @license MIT Style X11
 */

// Get Build Version
define('EJS_VERSION', (count($argv)>=3 ? $argv[2] : 'unknown'));
define('EJS_PACKAGE_ZIP', 'https://github.com/EnlighterJS/EnlighterJS/archive/v' . EJS_VERSION.'.zip');
define('EJS_PACKAGE_TGZ', 'https://github.com/EnlighterJS/EnlighterJS/archive/v' . EJS_VERSION.'.tar.gz');

require('global.php');

// === GETTING STARTED ============================================================
renderTemplate($outputDir.'index.html', array(
    'PAGE' => 'Resources/Pages/GettingStarted.phtml',
    'title' => 'EnlighterJS',
    'subtitle' => 'An OpenSource Syntax Highlighter',
));

// === Changelog ============================================================
renderTemplate($outputDir.'Changelog.html', array(
    'PAGE' => 'Resources/Pages/Changelog.phtml',
    'title' => 'Changelog',
    'subtitle' => 'The History of EnlighterJS',
));


// === Documentation ============================================================
renderTemplate($outputDir.'Documentation.html', array(
    'PAGE' => 'Resources/Pages/Documentation.phtml',
    'title' => 'Documentation',
    'subtitle' => 'Feature Reference',
));

// === Languages ============================================================
foreach ($languageExamples as $currentLanguage) {
    renderTemplate($outputDir . 'Language.'.$currentLanguage.'.html', array(
        'PAGE' => 'Resources/Pages/Languages.phtml',
        'title' => 'Languages',
        'subtitle' => 'Build-In Support',
        'currentLanguage' => $currentLanguage,
        'languageExamples' => $languageExamples,
        'themes' => $themes
    ));
}

// === Themes ============================================================
foreach ($themes as $theme) {
    renderTemplate($outputDir . 'Theme.'.$theme.'.html', array(
        'PAGE' => 'Resources/Pages/Themes.phtml',
        'title' => 'Themes',
        'subtitle' => 'Enlighter`s Appearance',
        'theme' => $theme,
        'themes' => $themes
    ));
}

// === Builder ============================================================
renderTemplate($outputDir.'Builder.html', array(
    'PAGE' => 'Resources/Pages/Builder.phtml',
    'title' => 'Builder',
    'subtitle' => 'Customized EnlighterJS Packages',
    'languages' => $languageDescriptions
));

// === Plugins ============================================================
renderTemplate($outputDir.'Plugins.html', array(
    'PAGE' => 'Resources/Pages/Plugins.phtml',
    'title' => 'Plugins',
    'subtitle' => 'Extend, Integrate'
));

function renderTemplate($destination, $vars = array()){
    file_put_contents($destination, captureTemplate('Resources/Web.phtml', $vars));
}
