<?php
/**
 * Generate the EnlighterJS Example Pages
 * @author Andi Dittrich
 * @license MIT Style X11
 */
function cdnbase($file){
	return '../'.$file;
}

// Get output dir
$outputDir = (count($argv)==2 ? $argv[1] : 'Output/');

require('global.php');

// === Basic Examples =================================================
$examples = array(
    'Example1', 'Example2-jsinit', 'Example3-advanced'
);
foreach ($examples as $example){
    file_put_contents('Examples/'.$example.'.html', captureTemplate('Resources/ExampleData/'.$example.'.phtml', array(
        'pageTitle' => $example
    )));
}

// === Language Examples =================================================
foreach ($languageExamples as $lang){
	$langContent = file_get_contents('Resources/TestcaseData/'.strtolower($lang).'.html');
	renderTemplate($outputDir.strtolower($lang).'.html', array(
		'pageContent' => $langContent,
		'pageTitle' => $lang
	));
}
/**
 * Renders the template file and return HTML
 * @param Array $vars
 */
function renderTemplate($destination, $vars = array()){
    file_put_contents($destination, captureTemplate('Resources/Templates/ExampleTemplate.phtml', $vars));
}