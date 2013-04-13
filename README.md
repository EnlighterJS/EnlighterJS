EnlighterJS
===========

EnlighterJS is a free, easy-to-use, syntax highlighting class developed for MooTools. It is based on the famous [Lighter.js](https://github.com/pradador/Lighter "Ligher.js") from Jose Prado.
Using it can be as simple as adding a single script to your webpage, selecting the elements you wish to highlight, and EnlighterJS takes care of the rest.
It also supports the automatic creation of tab-panes to display code-groups together (useful for multi-language examples - e.g. html+css+js)
A simple demo can be found [here](http://static.andidittrich.de/EnlighterJS/Demo.html "EnligherJS Theme Demo")

![Screenshot](http://static.andidittrich.de/EnlighterJS/screenshot1.png)

Features
--------

* Written in MooTools. Requires version 1.4+
* Includes build-in support for CSS, HTML, Javascript, XML, Java, Markdown, PHP, Python, Ruby, Shellscript and SQL
* Easy to use with familiar MooTools syntax.
* Supports code-groups (displays multiple code-blocks within a tab-pane)
* Outputs in various formats like ordered lists or inline. Choose the method that works best for you.
* Extensible language and theme engines - add your own one.
* Simple CSS based themes
* ANT build-script included for easy custom builds
* Small footprint: 44kB js + 14kB css (including ALL build-in languages)

Screenshots
-----------

![Screenshot 1](http://static.andidittrich.de/EnlighterJS/screenshot1.png)
![Screenshot 2](http://static.andidittrich.de/EnlighterJS/screenshot2.png)


How to use
----------

Download EnlighterJS and extract the files. You will find some examples located in the *Test/* directory.
Copy the prebuild files of the *Build/* directory into a web-accessible directory of your choice. 

Link to the EnlighterJS.yui.js javascript file and the EnlighterJS.yui.css stylesheet in the head section of your document after the MooTools file. 
The example below assumes you moved the files into your scripts folder under "js/" and your styles folder under "css/". 
The extension .yui indicates that these files are compressed with the [Yahoo YUI Compressor](http://yui.github.io/yuicompressor/). **These files are ready for productive use!** 
If you want to start developing, you should consider to use the uncompressed versions for easier debugging!

	#HTML
	<head>
	...
	<!-- Include EnlighterJS Styles -->
	<link rel="stylesheet" type="text/css" href="css/EnlighterJS.yui.css" />
	
	<!-- Include MooTools Framework -->
	<script type="text/javascript" src="js/mootools-core-1.4.5-full-nocompat.js"></script>

	<!-- Include EnlighterJS -->
	<script type="text/javascript" src="js/EnlighterJS.yui.js" ></script>
		
	...
	</head>

Prepare your source code by giving the element containing the code a *data-enlighter-language* attribute with the language and a *data-enlighter-theme* attribute with the theme you want to use. 
*Note*: Instead of Lighter.js fuel:flame syntax combo within the css classname, EnlighterJS will use HTML5 data- attributes!

	#HTML
	<!-- Syntax highlight using Languages/Js.js and default theme -->
	<pre id="myJsCode" data-enlighter-language="js">var myClass = new Class({})</pre>
	
	<!-- Syntax highlight using Languages/Php.js and Themes/Panic.css -->
	<pre class="myPhp" data-enlighter-language="php" data-enlighter-theme="panic"><?php php_info() ?></pre>

Finally, use the following JavaScript code examples inside of a 'domready' or 'onload' callback to create the highlighted elements. 
Be sure to check out the Options section to see the various options you can use. The FAQ and Examples page has other various examples you can use.
It's strongly recommended to use the Element style syntax or the EnlighterJS.Helper class!

	#JS
	// OPTION1 - Object style syntax - get element by it's ID
	var enlighter = new EnlighterJS('myJsCode', { altLines: 'hover' });
	enlighter.light();
	
	// OPTION2 - Element style syntax - highlight all pre elements with the class *myPhp*
	// an EnlighterJS instance is automatically created
	$$('pre.myPhp').light({ altLines: 'hover' });
	
	// OPTION3 - Highlight all "pre" elements in a document
	$$('pre').light({ altLines: 'hover' });
	
	// OPTION4 - Use the Helper-Class to highlight all pre elements, disable grouping
	new EnlighterJS.Helper($$('pre'), {
		altLines : 'hover',
		indent : 5,
		grouping: false
	});
	
	
	
Advanced usage
--------------

This example shows how to use code-groups. 
You can define a new code-group by adding a *data-enlighter-group* attribute to your code tags you want to group. The value
is used as an internal identifier and is not shown anywhere (e.g. use numerical identifiers). The name of the tab is defined by a *data-enlighter-title* attribute. To use a corporate style within all code-blocks grouped together, the theme definition of the first code-block defined in your document (the group leader) is used as theme of the complete group - other theme definitions will be ignored. if no theme is specified, the default themes (defined in the options) will be used.

	#HTML
	<!-- this 3 code-blocks will be grouped togehter - the theme will be "git" (theme definition of the group-leader) !-->
	<pre data-enlighter-language="js" data-enlighter-theme="git" data-enlighter-group="group0001" data-enlighter-title="Javascript">
	this.tokens = tokens || [];
	options = this.options;
	</pre>
	
	<pre data-enlighter-language="java" data-enlighter-theme="panic" data-enlighter-group="group0001" data-enlighter-title="pure Java">
	import javax.swing.JOptionPane;

	public class OddEven {
    /**
     * "input" is the number that the user gives to the computer
     */
    private int input; // a whole number("int" means integer)
	</pre>
	
	<pre data-enlighter-language="php" data-enlighter-theme="twilight" data-enlighter-group="group0001" data-enlighter-title="PHP Script">
	/** Test Snippet */
	$mysqli = new mysqli("localhost", "my_user", "my_password", "world");
	
	/* check connection */
	if (mysqli_connect_errno()) {
	    printf("Connect failed: %s\n", mysqli_connect_error());
	    exit();
	}
	</pre>
	
	
The initialization of code-groups differs from the "normal" one. You have to use the EnlighterJS.Helper class - it does the complete initialization and grouping for you!
Finally, use the following JavaScript code examples inside of a 'domready' or 'onload' callback to create the highlighted elements. 
Be sure to check out the Options section to see the various options you can use. The FAQ and Examples page has other various examples you can use.
	
	#JS
	// highlight all pre tags - default language 'js", default theme 'panic', enable grouping (enabled by default)
	new EnlighterJS.Helper($$('pre'), {
		altLines : 'hover',
		indent : 2,
		editable: false,
		language: 'js',
		theme: 'panic',
		grouping: true
	});
	
	
Custom Builds
-------------
To save bandwith/traffic or include self-defined languages, you can easily customize your EnlighterJS build by editing the *build.xml* file (found in the root directory) and run Apache ANT Build (target *build*)
If you want to remove some of the default theme you can edit the *include.themes* property and modify the list of css source files.
For Example: only include the Git and Mocha themes
	
	#XML
	<!-- Themes to include !-->
	<property name="include.themes" value="Source/Themes/Git.css Source/Themes/Mocha.css" />

Or Include only your custom themes

	#XML
	<!-- Themes to include !-->
	<property name="include.themes" value="Source/Themes/Custom1.css Source/Themes/Custom2.css" />		
		
Removing/Adding languages is also easy as this - they are defined by the *include.languages* property.
For Example: only include html+css+js syntax highlighting

	#XML
	<!-- Languages to include !-->
	<property name="include.languages" value="Source/Languages/Css.js Source/Languages/Html.js Source/Languages/Js.js" />
		
	
Options
-------

* altLines - (string) Pseudo-selector enabled field which lets you specify a group of lines you'd like to apply the alt styles to. Check out Selectors in the MooTools documentation for possible values. You can also set this to "hover" which highlights lines as you mouse-over them.
* editable - (boolean) Set to true if you'd like to allow editing of the highlighted element. Note: Highlighting isn't real-time so any edits might not have the correct highlighting - default: false
* theme - (string) Lets you set which Theme to use from the options section. If a Theme is specified in the class name of the source code, that choice will take precedence (values: standard, git, mocha, panic, tutti, twilight)- default: standard
* language - (string) Lets you set which Language to use from the options section. If a Language is specified in the data-enlighter-language attribute of the source code, that choice will take precedence (values: standard,  js, css, html, php, python, ruby, xml, shell, java, md, sql) - default: standard
* indent - (integer) Number of spaces to replace tabs with - default: -1 (no replacement)
* forceTheme - (boolean) Ignore the theme settings specified within the data-enlighter-theme attribute - default: false
* compiler - (string) The compiler type which is used to generate the highlighted html output data (values: "Inline", "List", "Lines") - default: List
* containerTag - (string) The html tag-name of the container tag within the generated code is wrapped then using the Inline- or List-Compiler - **NOTE** this options differs for Lines-Compiler type

Compatibility
-------------

All browsers supported by MooTools and with HTML5 capabilities for "data-" attributes are compatible with EnlighterJS.
It's possible that it may work with earlier/other browsers.

* Chrome 10+
* Safari 5+
* Internet Explorer 6+
* Firefox 2+
* Opera 9+


License
-------

EnlighterJS is licensed under [The MIT License (X11)](http://opensource.org/licenses/MIT)
