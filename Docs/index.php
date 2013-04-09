<?php
include_once('./markdown.php');
$docs = $nav = "";

$docFile = (isset($_GET['page'])) ? $_GET['page'].'.md' : 'Wick.md';

$fp = fopen($docFile, 'r');
$title = fgets($fp, 4096);
while ($line = fgets($fp, 4096)) $docs .= $line;
fclose($fp);

$fp = fopen('./Nav.md', 'r');
while ($line = fgets($fp, 4096)) $nav .= $line;
fclose($fp);

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title><?= $title ?></title>
		<link rel="stylesheet" type="text/css" media="all" href="styles.css" />
		<script type="text/javascript" src="../mootools-1.2.1-core.js"></script>
		<script type="text/javascript" src="../Lighter.js"></script>
		<script type="text/javascript" src="../Flame.js"></script>
		<script type="text/javascript" src="../Fuel.js"></script>
		<script type="text/javascript">
			window.addEvent('domready', function() {
				$$('code').light({
					altLines: 'hover',
					fuel: "js",
					//flame: "git",
					indent: 2,
					mode: "ol",
					path: "../"
				});
			});
		</script>
	</head>
	<body>
		<div id="container">
			
			<?=  Markdown($nav) ?>
			<?= Markdown($docs) ?>
			
			<div id="footer"></div>
		</div>
	</body>
</html>
