/*
---
name: CodeWindow
description: Opens a new Window with the raw-sourcecode within

license: MIT-style X11 License

authors:
  - Andi Dittrich
  
requires:
  - Core/1.4.5

provides: [EnlighterJS.UI.CodeWindow]
...
*/
EJS.UI.CodeWindow = (function(code){
	// code "cleanup"
	code = code.replace(/&/gim, '&amp;').replace(/</gim, '&lt;').replace(/>/gim, '&gt;');

	// open new window
	var w = window.open('', '', 'width=' + (window.screen.width -200) + ', height=' + (screen.height-300) + ', menubar=no, titlebar=no, toolbar=no, top=100, left=100, scrollbars=yes, status=no');
	
	// insert code
	w.document.body.innerHTML = '<pre>' + code + '</pre>';
	w.document.title = 'EnlighterJS Sourcecode';
});



