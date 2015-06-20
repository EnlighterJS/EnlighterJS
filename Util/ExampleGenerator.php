<?php
/**
 * Generate the EnlighterJS Example Pages
 * @author Andi Dittrich
 * @license MIT Style X11
 */

function cdnbase($file){
    global $argv;

    // Local Examples or Webbuild ?
    if (isset($argv[2]) && trim($argv[2]) == 'www'){
        return basename($file);
    }else{
        return '../'.$file;
    }
}

require('global.php');

// setup metainit string
$metainit = '<meta name="EnlighterJS" content="Advanced javascript based syntax highlighting" data-language="javascript" data-indent="2" data-selector-block="pre" data-selector-inline="code" />';

// === Basic Examples =================================================
renderTemplate($outputDir.'Example1.html', array(
    'page' => 'Resources/ExampleData/Example1.phtml',
    'pageTitle' => 'Basic EnlighterJS Example',
    'header' => $metainit
));
renderTemplate($outputDir.'Example2-jsinit.html', array(
    'page' => 'Resources/ExampleData/Example2-jsinit.phtml',
    'pageTitle' => 'Javascript Initialization Example',
    'header' => ''
));
renderTemplate($outputDir.'Example3-advanced.html', array(
    'page' => 'Resources/ExampleData/Example3-advanced.phtml',
    'pageTitle' => 'Advanced Javascript Example',
    'header' => ''
));

/**
 * Renders the template file and return HTML
 * @param Array $vars
 */
function renderTemplate($destination, $vars = array()){
    file_put_contents($destination, captureTemplate('Resources/ExampleTemplate.phtml', $vars));
}