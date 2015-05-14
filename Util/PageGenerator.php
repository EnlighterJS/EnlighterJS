<?php 

/**
 * Generate the EnlighterJS Documentation Pages
 * @author Andi Dittrich
 * @license MIT Style X11
 */

function cdnbase($file){
	return $file;
}

// Get output dir
$outputDir = (count($argv)>=2 ? $argv[1] : 'Output/');

// Get Build Version
define('ENLIGHTERJS_VERSION', (count($argv)>=3 ? $argv[2] : 'unknown'));

$themes = array(
    'Enlighter', 'Classic', 'Eclipse', 'Beyond', 'Git', 'Mocha', 'MooTools', 'Panic', 'Tutti', 'Twilight'
);

$languages = array(
    'C', 'Cpp', 'CSharp', 'CSS', 'Diff', 'HTML', 'Java', 'Javascript', 'JSON', 'MarkDown', 'NSIS', 'PHP', 'Python', 'Ruby', 'SQL', 'Unit', 'XML', 'RAW', 'NoHighlight', 'AVRASM', 'Ini'
);

// === README ============================================================
// create Readme.html
$readmeContent = renderMarkdownDocument(file_get_contents('README.md'));
$readmeContent = str_replace('<h2>', '<hr /><h2>', $readmeContent);
$readmeContent .= '<blockquote>'. nl2br(file_get_contents('LICENSE.md')).'</blockquote>';
renderTemplate($outputDir.'Documentation.html', array(
	'pageContent' => $readmeContent,
	'pageTitle' => 'Documentation <small>Advanced Javascript based Syntax Highlighter for MooTools</small>'
));

// === Changelog ============================================================
// create Changelog.html
$changelogContent = renderMarkdownDocument(file_get_contents('CHANGES.md'));
$changelogContent = str_replace('<h3>', '<hr /><h3>', $changelogContent);
renderTemplate($outputDir.'Changelog.html', array(
'pageContent' => $changelogContent,
'pageTitle' => 'Changelog <small>EnlighterJS` History</small>'
));

// === QUICKSTART ========================================================
$quickstartContent = captureTemplate('Resources/Templates/Quickstart.phtml') ;
renderTemplate($outputDir.'Quickstart.html', array(
	'pageContent' => $quickstartContent,
	'pageTitle' => 'Quickstart <small>First Steps with EnlighterJS</small>'
));

// === FRONTPAGE ========================================================
$frontpageContent = captureTemplate('Resources/Templates/Frontpage.phtml');
file_put_contents($outputDir.'index.html', $frontpageContent);

// === Builder ========================================================
$builderContent = captureTemplate('Resources/Templates/Builder.phtml') ;
renderTemplate($outputDir.'Builder.html', array(
'pageContent' => $builderContent,
'pageTitle' => 'Builder <small>Generate your custom EnlighterJS package</small>'
));


// === Language Examples =================================================
foreach ($languages as $lang){
    $langContent = captureTemplate('Resources/Templates/ThemeSelector.phtml', array(
        'themes' => $themes
    )) ;
	$langContent .= file_get_contents('Resources/TestcaseData/'.strtolower($lang).'.html');
	renderTemplate($outputDir.strtolower($lang).'.html', array(
		'pageContent' => $langContent,
		'pageTitle' => $lang. ' <small>Language Example</small>',
	));
}

// === Theme Demo ========================================================

// output buffer to append
$themeHtmlData = '';
foreach ($themes as $theme){
	$themeHtmlData .= captureTemplate('Resources/Templates/Theme.phtml', array(
		'theme' => strtolower($theme),
		'title' => $theme	
	));
}
renderTemplate($outputDir.'Themes.html', array(
	'pageContent' => $themeHtmlData,
	'pageTitle' => 'Theme Browser'
));


	function extractContent($filename, $start=0, $stop=99999){
		$content = file_get_contents($filename);
		$lines = explode("\n", $content);
		$buffer = '';

		for ($i=$start;$i<min($stop, count($lines)-1);$i++){
			$buffer .= $lines[$i]. "\n";
		}
		
		return $buffer;
	}

	/**
	 * Renders the template file and return HTML
	 * @param Array $vars
	 */
	function renderTemplate($destination, $vars = array()){
		file_put_contents($destination, captureTemplate('Resources/Templates/WebsiteTemplate.phtml', $vars));
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
		$htmlContent = file_get_contents('http://promethium.andidittrich.de/lightup/', false, stream_context_create($opts));
		
		// remove first heading1
		return preg_replace('/<h1>.*<\/h1>/', '', $htmlContent, 1);
	}
?>