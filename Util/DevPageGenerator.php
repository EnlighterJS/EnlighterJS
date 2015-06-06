<?php
/**
 * Generate the EnlighterJS Development Pages
 * @author Andi Dittrich
 * @license MIT Style X11
 */
function cdnbase($file){
	return $file;
}

require('global.php');

// === Deb Examples =================================================
$examples = array(
    'LanguageDevelopment', 'ThemeDevelopment'
);
foreach ($examples as $example){
    file_put_contents($example.'.html', captureTemplate('Resources/ExampleData/'.$example.'.phtml', array(
        'pageTitle' => $example
    )));
}