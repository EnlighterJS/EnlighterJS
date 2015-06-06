<?php
// get the sourcefile lists of current build
$sources = new stdClass();
$sources->js = explode(' ', file_get_contents('.tmp/js.txt'));
$sources->css = explode(' ', file_get_contents('.tmp/css.txt'));

// Theme name List
$themes = explode(' ', file_get_contents('.tmp/themes.txt'));

// Language Example List
$languageExamples = array(
    'C', 'Cpp', 'CSharp', 'CSS', 'LESS', 'Diff', 'HTML', 'Java', 'Javascript', 'JSON', 'MarkDown', 'NSIS', 'PHP', 'Python', 'Ruby', 'SQL', 'Unit', 'XML', 'RAW', 'NoHighlight', 'AVRASM', 'Ini', 'Rust', 'Shell', 'VHDL', 'Matlab'
);

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