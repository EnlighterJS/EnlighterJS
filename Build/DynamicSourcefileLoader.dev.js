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
	var enlighterJsSources = "Source/EnlighterJS.js Source/SpecialLineHighlighter.js Source/Language/Generic.js Source/LanguageManager.js Source/Native/Element.EnlighterJS.js Source/Tokenizer.js Source/Token.js Source/Renderer/InlineRenderer.js Source/Renderer/BlockRenderer.js Source/Tokenizer/Lazy.js Source/Tokenizer/Xml.js Source/Util/Helper.js Source/UI/TabPane.js Source/Util/Metainit.js Source/Language/Cpp.js Source/Language/Xml.js Source/Language/Css.js Source/Language/Java.js Source/Language/Js.js Source/Language/Markdown.js Source/Language/Php.js Source/Language/Python.js Source/Language/Ruby.js Source/Language/Shell.js Source/Language/Sql.js Source/Language/Nsis.js Source/Language/Raw.js Source/Language/Template.mylang.js";
	var enlighterCssSources = "Source/Themes/Base.css Source/Themes/MooTools.css Source/Themes/Enlighter.css Source/Themes/Git.css Source/Themes/Mocha.css Source/Themes/Panic.css Source/Themes/Tutti.css Source/Themes/Twilight.css";

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

