<?php
// lightup parser (TMP FIX)
require('/home/andi/Development/PHP/LightUp/Dist/LightUp.php');

// Get output dir
$outputDir = (isset($argv) && isset($argv[1]) ? $argv[1] : 'Output/');

// get the sourcefile lists of current build
$sources = new stdClass();
$sources->js = explode(' ', file_get_contents('.tmp/js.txt'));
$sources->css = explode(' ', file_get_contents('.tmp/css.txt'));

// Theme name List
$themes = explode(' ', file_get_contents('.tmp/themes.txt'));

// Language Example List
$languageExamples = array(
    'C', 'Cpp', 'CSharp', 'CSS', 'Cython', 'Diff', 'HTML', 'Java', 'Javascript', 'JSON', 'Kotlin', 'MarkDown', 'NSIS', 'PHP', 'Python', 'Ruby', 'SQL',
    'Unit', 'XML', 'RAW', 'NoHighlight', 'AVR-Assembly', 'Ini', 'Rust', 'Shell', 'VHDL', 'Matlab', 'Generic', 'Squirrel', 'LUA', 'Assembly'
);
asort($languageExamples);

// all languages
$languageList = explode(' ', file_get_contents('.tmp/languages.txt'));
$languageDescriptions = array();
foreach ($languageList as $l){
    // get file content
    $f = file_get_contents('Source/Language/'.$l.'.js');

    // extract description from header
    preg_match('/^\s*description\:(.*)$/mi', $f, $matches);

    if (count($matches) == 2){
        $languageDescriptions[$l] = trim($matches[1]);
    }
}


/**
 * @param $file
 * @param array $vars
 * @return string
 */
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
 /*
function renderMarkdownDocument($filename){
    $content = file_get_contents($filename);

    $postdata = http_build_query(array(
        'mddata' => $content,
        'highlightingMode' => 'enlighterjs',
        'addAnchors' => 'false'
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
*/

// TMP FIX
function renderMarkdownDocument($filename){
    $content = file_get_contents($filename);

    $opt = array(
        'highlightingMode' => 'enlighterjs',
        'addAnchors' => 'false'
    );

    $htmlContent = de\andidittrich\lightup\LightUp::render($content, $opt);

        // remove first heading1
    return preg_replace('/<h1>.*<\/h1>/', '', $htmlContent, 1);
}