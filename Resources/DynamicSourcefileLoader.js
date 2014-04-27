/*!
---
name: EnlighterJS Development Sourcefile Loader
description: Dynamically loads all EnlighterJS Sourcefiles (used for rapid development without the requirement of rebuilds)

license: MIT-style X11 License

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5
  - More/Asset
...
*/
window.addEvent('domready', function(){
	// generated sourcefile list (space separated values) - placeholder get replaced during build process
	var enlighterJsSources = "{{JSSOURCES}}";
	var enlighterCssSources = "{{CSSSOURCES}}";

	// extract sourcefiles
	var jsfiles = enlighterJsSources.split(' ');
	var cssfiles = enlighterCssSources.split(' ');

	// sequential js file loading
	var loadScript = (function(file){
		Asset.javascript(file, {
			onLoad : function(){
				if (jsfiles.length > 0){
					loadScript(jsfiles.shift());
				}else{
					window.fireEvent('jsloaded');
				}
			},
			onError: function(msg){
				alert(msg);
			}
		});
	});
	loadScript(jsfiles.shift());
	
	// sequential css file loading
	var loadStyles = (function(file){
		Asset.css(file, {
			onLoad : function(){
				if (cssfiles.length > 0){
					loadStyles(cssfiles.shift());
				}else{
					window.fireEvent('cssloaded');
				}
			},
			onError: function(msg){
				alert(msg);
			}
		});
	});
	loadStyles(cssfiles.shift());
});

