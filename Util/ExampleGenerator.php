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

// === Language Examples =================================================
$languages = array(
	'C', 'Cpp', 'CSharp', 'CSS', 'Diff', 'HTML', 'Java', 'Javascript', 'JSON', 'MarkDown', 'NSIS', 'PHP', 'Python', 'Ruby', 'SQL', 'Unit', 'XML', 'RAW', 'NoHighlight'
);
foreach ($languages as $lang){
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
	
	function captureTemplate($file, $vars = array()){
		// exapand vars to local variables
		extract($vars);
		
		// start capturing
		ob_start();
		
		// load local template file
		require($file);
		
		// store captured content
		$_generatedContent = ob_get_clean();
		return $_generatedContent;
	}
?>