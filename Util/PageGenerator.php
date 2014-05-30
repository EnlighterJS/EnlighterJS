<?php 

/**
 * Generate the EnlighterJS Documentation Pages
 * @author Andi Dittrich
 * @license MIT Style X11
 */
$enlighterMetaInitDirective = '<meta name="EnlighterJS" content="Advanced javascript based syntax highlighting" data-language="generic" data-indent="4" data-selector-block="pre" data-selector-inline="code" data-rawcodebutton="true" />';

function cdnbase($file){
	return $file;
}

// Get output dir
$outputDir = (count($argv)>=2 ? $argv[1] : 'Output/');

// Get Build Version
define('ENLIGHTERJS_VERSION', (count($argv)>=3 ? $argv[2] : 'unknown'));

// === README ============================================================
// create Readme.html
$readmeContent = renderMarkdownDocument(file_get_contents('README.md'));
renderTemplate($outputDir.'index.html', array(
	'pageContent' => $readmeContent,
	'pageTitle' => 'Advanced Javascript based Syntax Highlighter for MooTools',
	'headerContent' => $enlighterMetaInitDirective
));

// === Changelog ============================================================
// create Changelog.html
$readmeContent = renderMarkdownDocument(file_get_contents('CHANGES.md'));
renderTemplate($outputDir.'Changelog.html', array(
'pageContent' => $readmeContent,
'pageTitle' => 'Changelog',
'headerContent' => $enlighterMetaInitDirective
));

// === QUICKSTART ========================================================
$quickstartContent = captureTemplate('Resources/TestcaseData/Quickstart.phtml') ;
renderTemplate($outputDir.'Quickstart.html', array(
	'pageContent' => $quickstartContent,
	'pageTitle' => 'Quickstart Example',
	'headerContent' => $enlighterMetaInitDirective
));

// === Builder ========================================================
$builderContent = captureTemplate('Resources/Builder.phtml') ;
renderTemplate($outputDir.'Builder.html', array(
'pageContent' => $builderContent,
'pageTitle' => 'Generate your custom EnlighterJS Build',
'headerContent' => ''
));


// === Language Examples =================================================
$languages = array(
	'C', 'Cpp', 'CSharp', 'CSS', 'HTML', 'Java', 'js', 'JSON', 'MarkDown', 'NSIS', 'PHP', 'Python', 'Ruby', 'SQL', 'Unit', 'XML', 'RAW', 'NoHighlight'
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

	/**
	 * Render a Markdown Document using LightUp with Promethium CloudAPI
	 * @param unknown $content
	 */
	function renderMarkdownDocument($content) {
		$postdata = http_build_query(array(
				'mddata' => $content,
				'highlightingMode' => 'enlighterjs',
				'addAnchors' => 'true'
		));
		$opts = array(
				'http' => array (
						'method' => 'POST',
						'header' => 'Content-type: application/x-www-form-urlencoded',
						'content' => $postdata
				)
		);
		$htmlContent = file_get_contents ('http://promethium.andidittrich.de/lightup/', false, stream_context_create($opts));
		
		// remove first heading1
		return preg_replace('/<h1>.*<\/h1>/', '', $htmlContent, 1);
	}
?>