Lighter
=======

Lighter is a free syntax highlighting class developed for MooTools. It was created with the MooTools developer in mind and takes advantage of many of the Framework's features. Using it can be as simple as adding a single script to your webpage, selecting the elements you wish to highlight, and Lighter takes care of the rest. It is currently in use on the MooTools forge so you are seeing it in action right there.

![Screenshot](http://pradador.com/images/mootools/lighter.screenshot.jpg)


Features
--------

* Written in MooTools. Requires version 1.3+
* Easy to use with familiar MooTools syntax.
* Outputs in various formats like ordered lists and tables. Choose the method that works best for you.
* GeSHi-like class naming for (hopeful) style interoperability.
* Extensible language and themeing engines.
* Quirky Lighter analogies included with every download.


How to use
----------

Download Lighter and extract the files. Copy the files into a web-accessible directory of your choice. Feel free to rename the folder to anything you want. You can safely delete any Fuel/Flame files you're not going to use. For easiest usage, keep all the files in the same folder structure.

Link to the Lighter.js file in the head section of your document after the MooTools file. The example below assumes you moved the files into your scripts folder under "js/Lighter".

	#HTML
	<head>
	...
	<script type="text/javascript" src="/js/mootools.core.js"></script>
	<script type="text/javascript" src="/js/lighter/Lighter.js"></script>
	...
	</head>

Prepare your source code by giving the element containing the code a class name with the language and theme you want to use. *Note*: Lighter use the first class as the fuel:flame combo. Ensure that any other classes go after this.

	#HTML
	<!-- Syntax highlight using Fuel.js.js and default theme -->
	<pre id="jsCode" class="js">var myClass = new Class({})</pre>
	
	<!-- Syntax highlight using Fuel.php.js and theme from Flame.twilight.css -->
	<pre id="phpCode" class="php:twilight"><?php php_info() ?></pre>

Finally, use the following JavaScript code examples inside of a 'domready' or 'onload' callback to create the highlighted elements. Be sure to check out the Options section to see the various options you can use. The FAQ and Examples page has other various examples you can use.

	#JS
	// Object style syntax.
	var myLighter = new Lighter('jsCode', { altLines: 'hover' });
	
	// Element style syntax
	$('phpCode').light({ altLines: 'hover' });
	
	// Highlight all "pre" elements in a document
	$$('pre').light({ altLines: 'hover' });
	
	// Highlight all code elements within a pre element (how Markdown usually outputs code) using the each() method
	$$('pre > code').each(function(element) {
		var lighter = new Lighter(element, {
			altLines: 'odd',
			container: el.getParent()
		});
	})
	
**Note**: Lighter assumes that the rest of the files needed are also in that "/js/lighter/" folder. It will attach those files on demand. This means that Lighter files don't load until after the domready/load event happens which might cause a small flicker between unhighlighted and highlighted state. If you don't like this behavior, you can attach the files yourself to load all Lighter files along side the initial document load.


Options
-------

* altLines - (string) Pseudo-selector enabled field which lets you specify a group of lines you'd like to apply the alt styles to. Check out Selectors in the MooTools documentation for possible values. You can also set this to "hover" which highlights lines as you mouse-over them.
* clipboard - (element) Will overlay a ZeroClipboard.js object on-top of the element passed in to provide copy-to-cliboard functionality. Check out the FAQ and Examples page to see how you can employ this.
* container - (string) By default, Lighter injects the highlighted element after the source-code block and hides the original code, effectively taking its spot. If you'd like, you can set this to the id of a container element which Lighter will empty and inject the highlighted code element into.
* editable - (boolean) Set to true if you'd like to allow editing of the highlighted element. Note: Highlighting isn't real-time so any edits might not have the correct highlighting.
* flame - (string) Lets you set which Flame to use from the options section. If a Flame is specified in the class name of the source code, that choice will take precedence.
* fuel - (string) Lets you set which Fuel to use from the options section. If a Fuel is specified in the class name of the source code, that choice will take precedence.
* id - (string, defaults to "Lighter_uniqueId") Id to give the Lighter element.
* indent - (integer) Number of spaces to replace tabs with.
* matchType - (string, defaults to "standard") Controls how the Fuel finds matches within the source code. Set to "lazy" for faster matching at the expense of accuracy.
* mode - (string, defaults to "pre") Controls the output format of Lighter. Current options are:
	* "pre" - Fastest mode with no line numbers. Code is wrapped in a pre element and matched bits are wrapped with span elements.
	* "inline" - Same as above except code is wrapped in a CODE element. Useful for single line examples like shell commands.
	* "ol" - Code is wrapped in an ordered list where every line is a code line. Users can even copy paste this code and line numbers will not be included. Preferred method if you want line numbers but it is not very style friendly.
	* "div" - Code is wrapped in div elements where each code line is a new div which contains a span element with the line number and a span element with the code. Most style friendly but at the same time toughest to style.
	* "table" - Code is wrapped in a table element where each line is a tr containing a td element with the line number and a td element with the code. Easily styled at the expense of truly semantic markup.
* path - (string) Lighter includes the necessary Fuel/Flame files on-demand by searching the same directory that Lighter is in for the scripts. If you'd like to place the Fuel/Flame files in a different folder, use this option to let Lighter where it should load the scripts from. You can ignore this option if you keep the default directory layout or include ths scripts yourself manually.
* strict - (string) Set to true if you'd like Lighter to find matches within valid language delimiters only. E.g. only match PHP code within <?php ?> tags.


Compatibility
-------------

All browsers supported by MooTools are compatible with Lighter. It's possible that it may work with earlier/other browsers but these are unofficially supported. The official list is:

* Safari 2+
* Internet Explorer 6+
* Firefox 2+
* Opera 9+


License
-------

Lighter is licensed under the MIT License. Use it, modify it, have fun with it... in any circumstance.
