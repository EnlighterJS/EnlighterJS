<?php
/**
 * Generate the EnlighterJS Example Pages
 * @author Andi Dittrich
 * @license MIT Style X11
 */
$enlighterMetaInitDirective = '<meta name="EnlighterJS" content="Advanced javascript based syntax highlighting" data-language="javascript" data-indent="4" data-selector-block="pre" data-selector-inline="code" data-rawcodebutton="true" />';

function cdnbase($file){
	return '../'.$file;
}

// Get output dir
$outputDir = (count($argv)==2 ? $argv[1] : 'Output/');

// === Language Examples =================================================
$languages = array(
	'C', 'Cpp', 'CSS', 'HTML', 'Java', 'js', 'JSON', 'MarkDown', 'NSIS', 'PHP', 'Python', 'Ruby', 'SQL', 'Unit', 'XML', 'RAW', 'NoHighlight'
);
foreach ($languages as $lang){
	$langContent = file_get_contents('Resources/TestcaseData/'.strtolower($lang).'.html');
	renderTemplate($outputDir.strtolower($lang).'.html', array(
		'pageContent' => $langContent,
		'pageTitle' => 'Language Example: ' . $lang,
		'headerContent' => $enlighterMetaInitDirective
	));
}

// === Theme Demo ========================================================
$themes = array(
	'Enlighter', 'Git', 'Mocha', 'MooTools', 'Panic', 'Tutti', 'Twilight'
);
// output buffer to append
$themeHtmlData = '';
foreach ($themes as $theme){
	$themeHtmlData .= '<h2>"' . $theme. '" <small>Theme Demo</small></h2>';
	$themeHtmlData .= captureTemplate('Resources/TestcaseData/Theme.phtml', array(
		'theme' => strtolower($theme)
	));
	$themeHtmlData .= '<hr />';
}
renderTemplate($outputDir.'Themes.html', array(
	'pageContent' => $themeHtmlData,
	'pageTitle' => 'Theme Browser',
	'headerContent' => $enlighterMetaInitDirective
));

	/**
	 * Renders the template file and return HTML
	 * @param Array $vars
	 */
	function renderTemplate($destination, $vars = array()){
		file_put_contents($destination, captureTemplate('Resources/BootstrapTemplate.phtml', $vars));
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