<?php

include('global.php');

if ($argc < 3){
    die('Usage: cli.php command args..');
}

switch ($argv[1]){

    case 'markdown':
        file_put_contents($argv[3], renderMarkdownDocument($argv[2]));
        break;
}