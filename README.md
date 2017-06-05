EnlighterJS
===========

EnlighterJS is a free, easy-to-use, syntax highlighting class developed for [MooTools](http://mootools.net "MooTools.net").
Using it can be as simple as adding a single script and style to your website, choosing the elements you wish to highlight, and EnlighterJS takes care of the rest.
It also supports Inline-Syntax-Highlighting as well as the automatic creation of tab-panes to display groups of code together (useful for multi-language examples - e.g. html+css+js)
Take a look into the [Documentation](http://enlighterjs.org/Documentation.html) or view the [Theme Demo](http://enlighterjs.org/Themes.html)

### Download ###
* [Download Latest Release](https://github.com/AndiDittrich/EnlighterJS/releases/latest)
* [Custom-Builds](http://enlighterjs.org/Builder.html)

![Screenshot](http://enlighterjs.org/screenshot1.png)

Features
--------

* Written in MooTools. Requires version 1.4+
* Build-in support for most commonly used languages
* Easy to use with familiar MooTools syntax.
* Supports code-groups (displays multiple code-blocks within a tab-pane)
* Includes Inline Syntax highlighting
* Extensible language and theme engines - add your own one.
* Simple CSS based themes
* ANT build-script included for easy custom builds (Web-based Customizer also available)
* Small footprint
* Point out special lines of code
* Initialization can be performed by adding a simple html meta-tag or using a small piece of javascript
* Toolbar buttons to switch to raw-code or open it into a new window

Plugins
-------
* [Enlighter for WordPress](http://wordpress.org/plugins/enlighter/) - The official EnlighterJS plugin for WordPress

How to use
----------
This is a minimalistic example how to highlight sourcecode with EnlighterJS. The working example (correct js+css paths) is available within the EnlighterJS package (Example1.html).

```HTML
<head>
    ...
    <!-- Include EnlighterJS Styles -->
    <link rel="stylesheet" type="text/css" href="EnlighterJS.min.css" />

    <!-- Include MooTools Framework -->
    <script type="text/javascript" src="mootools-core-nocompat.min.js"></script>

    <!-- Include EnlighterJS -->
    <script type="text/javascript" src="EnlighterJS.min.js" ></script>

    <!-- Initialize EnlighterJS -->
    <meta name="EnlighterJS" content="Advanced javascript based syntax highlighting" data-indent="4" data-selector-block="pre" data-selector-inline="code.special" />
    ...
</head>
<body>
    ...
    <!-- This code will be highlighted as Javascript !-->
    <pre data-enlighter-language="js">
    $('#loading-example-btn').click(function () {
      var btn = $(this)
      btn.button('loading')
      $.ajax(...).always(function () {
        btn.button('reset')
      });
    });
    </pre>
    ...
    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, <code class="special">window.addEvent('domready', function(){});</code> labore et dolore magna aliquyam erat.</p>
</body>
```

Build-in Languages & Themes
---------------------------
The following Themes and Languages are included into the EnlighterJS standard package:

### Languages ###
List of languages with their corresponding identifiers and supported aliases (wrapped into brackets behind the names)

* **Assembly** (asm)
* **AVR Assembly** (avrasm)
* **CSS** (css)
* **C** (c)
* **C++** (cpp, c++)
* **C#** (csharp)
* **Cython** (cython)
* **HTML** (html)
* **Ini** (ini, conf)
* **Java** (java)
* **Javascript** (js, javascript, jquery, mootools, ext.js)
* **JSON** (json)
* **Kotlin** (kotlin)
* **LUA** (lua)
* **NSIS** (nsis)
* **Markdown** (md, markdown)
* **Matlab/Octave** (octave, matlab)
* **PHP** (php)
* **Python** (py, python)
* **Ruby** (ruby(
* **Shellscript** (shell, bash)
* **SQL** (sql)
* **Squirrel** (squirrel)
* **XML** (xml)
* **Generic** (generic, standard) - default highlighting scheme
* **RAW** (raw) - raw code without highlighting with EnlighterJS container styles!
* **No-Highlight** (no-highlight) - disables highlighting and retains your page styles!

### Themes ###
Theme identifiers are always expressed as lowercase!

#### Modern Themes ####
* **Enlighter** (enlighter, standard) - Enlighter`s default Theme
* **Classic** (classic) - SyntaxHighlighter inspired
* **Eclipse** (eclipse) - Eclipse inspired
* **Beyond** (beyond) - BeyondTechnology Theme
* **Godzilla** (godzilla) - A MDN inspired Theme
* **MooTwo** (mootwo) - Inspired by the current MooTools Website
* **Droide** (droide) - Modern, minimalistic
* **Minimal** (minimal) - Bright, High contrast
* **Atomic** (atomic) - Dark, Colorful
* **Rowhammer** (rowhammer) - Light, Transparent, divided rows

#### Legacy Themes (Lighter.js) ####
* **MooTools** (mootools) - MooTools Docs inspired Theme
* **Git** (git) - GitHub inspired
* **Mocha** (mocha)
* **Panic** (panic)
* **Tutti** (tutti)
* **Twilight** (twilight)

Basic Usage
-----------

Download EnlighterJS and extract the files or use [bower](http://bower.io). 

```shell
$bower install enlighterjs
```

Copy the prebuild files of the *Build/* directory into a web-accessible directory of your choice. 

Link to the EnlighterJS.min.js javascript file and the EnlighterJS.min.css stylesheet in the head section of your document **after** the MooTools file. 
The example below assumes you moved the files into your scripts folder under "js/" and your styles folder under "css/". 
The extension .min indicates that these files are already minified. **These files are ready for productive use!** 
If you want to start developing, you should consider to use the uncompressed versions for easier debugging!

Rendering options can be defined as global option (Metainit attributes or options object) or local option using the `data-enlighter-` attributes on each codeblock. 
It is recommended to use local options only if necessary (e.g. to define a language for each block).

### Integrate EnlighterJS ###

The integration of EnlighterJS requires the following 3 steps:
1. Integrate MooTools.Core, EnlighterJS Script+Styles into your page
2. Prepare your source code elements on your page by adding a language identifier
3. ["Initialize"](#initialization) EnlighterJS to highlight the code

Link to the EnlighterJS.yui.js javascript file and the EnlighterJS.yui.css stylesheet

```html
<head>
    ...
    <!-- Include EnlighterJS Styles -->
    <link rel="stylesheet" type="text/css" href="css/EnlighterJS.min.css" />
    	 
    <!-- Include MooTools Framework -->
    <script type="text/javascript" src="js/mootools-core-1.5.0-full-nocompat.js"></script>
    
    <!-- Include EnlighterJS -->
    <script type="text/javascript" src="js/EnlighterJS.min.js" ></script>
    ...
</head>
```

Prepare your source code by giving the element (containing the code) an optional *data-enlighter-language* attribute with the language of the code. 
**Notice**: Instead of Lighter.js *fuel:flame' syntax combo within the css classname, EnlighterJS will use HTML5 `data-` attributes!

```html
<!-- Syntax highlight using Javascript and default theme -->
<pre data-enlighter-language="js">var myClass = new Class({})</pre>

<!-- Syntax highlight using the Git Theme with default language-->
<pre data-enlighter-theme="git">php_info();</pre>
```

Finally, use the following JavaScript code examples inside of a 'domready' or 'onload' callback to create the highlighted elements - this process is called *initialization*.
Be sure to check out the Options section to see the various options you can use. The Example pages have various examples you can use.
Further informations as well as some advanced examples are available within the [Initialization Section](#initialization).

```js
// Use the Init utility function to highlight all pre elements - this is the recommended way and required to use the Code-Group feature
EnlighterJS.Util.Init('pre', null, {
    language: 'php',
    theme: 'Classic'
});
```

Instead of initializing EnlighterJS manually, since version 1.1 it is possible to use a simple html-metatag (called *EnlighterJS Metainit*) to run Enlighter on your page (with basic config options).

```html
<!-- Initialize EnlighterJS -->	
<meta name="EnlighterJS" content="Advanced javascript based syntax highlighting" data-language="php" data-theme="Enlighter" data-indent="2" />
```

### Some Examples ###
Since version 1.8, it's possible to highlight special lines of code. Just add the attribute `data-enlighter-highlight` to your codeblock and provide a set of lines to mark (ranges supported).

```html
<!-- just highlight line number 2 !-->
<pre data-enlighter-language="js" data-enlighter-highlight="2">
this.tokens = tokens || [];
options = this.options;
</pre>

<!-- highlight line 2,3,4 !-->
<pre data-enlighter-language="js" data-enlighter-highlight="2-4">
EnlighterJS.Util.Init('pre', null, {
   indent : 2,
   grouping: false
});
</pre>
```

Version 2.0 introduces some amazing features like Inline-Syntax-Highlighting. The [Metainit](#metainit_initialization) tool performs this action automatically.

```js
// Highlight all pre(block) + code(inline) tags and use Javascript as default language
EnlighterJS.Util.Init('pre', 'code', {
    language: 'javascript'
});
```

In some cases it might be usefull to start the linnumber counting with another value than 1 (maybe an excerpt). In this case you can add the `data-enlighter-lineoffset` attribute to your codeblock.

```html
<!-- start linenumber counting with line 15 !-->
<pre data-enlighter-language="js" data-enlighter-lineoffset="15">
this.tokens = tokens || [];
options = this.options;
</pre>
```

Initialization
--------------

Initialization means, that all elements (you wish to highlight) get selected and rendered by EnlighterJS. The original codeblock is set invisible and the rendered one is injected after. This task can be performed in **two different ways**:

### 1. Metainit Initialization ##
Instead of initializing EnlighterJS by javascript, it's possible to use a simple html-metatag (called *EnlighterJS Metainit*) to run Enlighter on your page (with basic config options). This will be usefull if you only need a basic setup. Take a look into the examples *Examples/Testcase.Metainit.html* to see how it is working!
Basically Metainit takes the given html attribute options and converts them into a options object. These options will be passed to the `Enlighter.Util.Helper()` utility function - for inline elements (InlineRenderer) identified by `data-selector-inline` as well as block elements (BlockRenderer) by `data-selector-block`.
This will take all the work for you by adding a single line to the head section to use all the amazing EnlighterJS features like Inline-Syntax-Highlighting or CodeGroups!

#### Example ####
Description: It enables block highlighting for all `pre` elements on the page as well as inline highlighting for all `code` elements. Javascript is set as default language used for highlighting. Each tab is replaced by four spaces to avoid rendering issues. Additionally the "raw code button" is enabled which allows the user to toggle between highlighted and unhighlighted code (e.g. to copy code).

```html
<!-- Initialize EnlighterJS -->	
<meta name="EnlighterJS" content="Advanced javascript based syntax highlighting" data-indent="4" data-selector-block="pre" data-selector-inline="code" data-rawcodebutton="true" data-language="javascript" />
```

#### Attributes ####
Following attributes are available (optional) and will be converted to the required options object to trigger `EnlighterJS.Util.Helper`. Take a look into the Metainit.js sources to see how it is working.

* **name** (string) **REQUIRED** - This attribute identifies the metatag and has to be set to "EnlighterJS" (case sensitive)
* **data-language** (string) - Sets the default language of every codeblock (inline+block) on the page - default: **generic**
* **data-theme** (string) - Sets the default theme of every codeblock (inline+block) on the page - default: **enlighter**
* **data-indent** (number) - Number of spaces to replace tabs with (-1 means no replacement) - default: **-1**
* **data-selector-block** (string) - The CSS selector to match all codeblocks for block-highlighting. Use "NULL" to disable block highlighting - default: **pre**
* **data-selector-inline** (string) - The CSS selector to match all codeblocks for inline-highlighting. Use "NULL" to disable inline highlighting - default: **code**
* **data-rawcodebutton** (boolean) - Enables the optional "RAW Code Button" which will appear in ever codeblock (Block Renderer) to switch between highlighted and un-highlighted code - default: **false**
* **data-windowwbutton** (boolean) - Enables the optional " Button" which
* **data-infobutton** (boolean) - Enables the optional " Button" which
* **data-linenumbers** (boolean) - Display line-numbers in code-blocks (ol/li list used as container) - default: **true**
* **data-hover** (string) -  Defines a css-classname which is added to each line. To enable build-in hover effects set it to "hoverEnabled" (default), *null* to disable it or to any custom class - default: **"hoverEnabled"**

### 2. Javacript based Initialization ###
EnlighterJS provides 4 ways to get manually initialized:

* Use the native `Element.enlight()` method which will automatically creates an EnlighterJS instance of the selected single element
* Create a new instance of `EnlighterJS` and provide the single element to highlight
* To use Code-Groups you have to use `EnlighterJS.Util.Helper` utility function

**Notice:** You can pass any of the [Global Options](#global_options) with each method. Every method will invoke the `EnlighterJS` constructor.

#### Option 1 - Native Element extension ####

```js
// get element by it's ID and activate highlighting using markdown as language
document.id('myCustomCode').enlight({
  language: 'ruby', 
  indent: 2
});

// disable highlighting
document.id('myCustomCode').enlight(false);

// remove highlighting (drop generated HTML from DOM)
document.id('myHighlightedCode').enlight('dispose');
```

#### Option 2 - Use an EnlighterJS instance (OOP Style) ####

```js
// create a new EnlighterJS instance
var myEnlighter = new EnlighterJS(document.id('myCustomCode'), {
  language: 'php',
  showLinenumbers: false
});

// enable highlighting
myEnlighter.enlight(true);

// remove highlighting (drop generated HTML from DOM)
myEnlighter.dispose();
```

#### Option 3 - Use an EnlighterJS.Util.Helper utility function ####

```js
// Highlight all code tags (inline code) and use Javascript as default language
EnlighterJS.Util.Helper(document.getElements('code'), {
    language: 'javascript',
    renderer: 'Inline'
});

// OPTION1 - Element style syntax - get element by it's ID
document.id('myJsCode').enlight(true);
    
// OPTION2 - Element style syntax - highlight all pre elements with the class *myPhp*
// an EnlighterJS instance is automatically created
document.getElements('pre.myPhp').enlight({language: php});    
```

Options
-------

Customize EnlighterJS` appearance by using the following configuration options. Try to start with one of the Example pages!

### Global Options ###

The following options can be passed to the following methods to customize the rendering behaviour:
* `EnlighterJS(codeblockElement, options = {}, container = null)` constructor
* `EnlighterJS.Util.Helper(elements, options = {})` utility function
* `EnlighterJS.Util.Init(blockSelector, inlineSelector, options= {})` utility function (recommended)

#### Option Keys ####
* **language** - (string) The default language used if no `data-enlighter-language` attibutes are used - default: **"generic"**
* **theme** - (string) The default theme used if no `data-enlighter-theme` attibutes are used - default: **"enlighter"**
* **indent** - (integer) Number of spaces to replace tabs with (-1 means no replacement) - default: **-1**
* **hover** - (string) Defines a css-classname which is added to each line. To enable build-in hover effects set it to "hoverEnabled" (default), *null* to disable it or to any custom class - default: **"hoverEnabled"**
* **oddClassname** - (string) CSS-classname of all odd lines - default: **"odd"**
* **evenClassname** - (string) CSS-classname of all even lines - default: **"even"**
* **showLinenumbers** - (boolean) Display line-numbers in code-blocks (ol/li list used as container) - default: **true**
* **forceTheme** - (boolean) Forces the renderer to use ignore attribute theme setting `data-enlighter-theme` - default: **false**
* **renderer** - (string) Defines the renderer used to generate the output. Use `Inline` for Inline-Syntax-Highlighting or `Block` for standard highlighting - default: **Block**
* **rawButton** - (boolean) Enables the optional "RAW Code Button" which will appear in ever codeblock (Block Renderer) to switch between highlighted and un-highlighted code - default: **true**
* **infoButton** - (boolean) Enables the optional "Info Button" which provides a link to `enlighterjs.andidittrich.de` - default: **true**
* **windowButton** - (boolean) Enables the optional "Window Button" which opens a new window with the unhighlighted  "raw" code within  - default: **true**
* **grouping** - (boolean) Enables code-groups (only used by `EnlighterJS.Util.Helper` utility) - default: **true**
* **inlineContainerTag** - (string) The html tag-name of the container (inline-syntax-highlighting only) where the generated code is wrapped into - default: **"span"**
* **ampersandCleanup** - (boolean) Should the ampersand escape sequence `&#38;amp;` automatically replaced by the ampersand sign during code cleanup ? Useful to resolve double escaped html code - default: **true**
* **rawcodeDoubleclick** - (boolean) Toggle RAW/Highlighted code on doubleclick ? - default: **false**
* **cryptex** - (object) Special options for use with the [Cryptex WordPress Plugin](https://wordpress.org/plugins/cryptex)

#### Example ####

```js
var options = {
    language : 'javascript',
    theme : 'Eclipse',
    indent : 2,
    forceTheme: false,
    rawButton: false,
    showLinenumbers: false,
    renderer: 'Inline'
};

// Initialize EnlighterJS - use inline-highlighting only
EnlighterJS.Util.Init(null, 'code', options);
```

### Element Options ###

Some options need to be applied directly to the container elements which holds the code to highlight. These "local" options will override all global options which are set.

* **data-enlighter-language** (string) - The language of the codeblock - overrides the global default setting | Block+Inline Content option
* **data-enlighter-theme** (string) - The theme of the codeblock - overrides the global default setting | Block+Inline Content option
* **data-enlighter-group** (string) - The identifier of the codegroup where the codeblock belongs to | Block Content option
* **data-enlighter-title** (string) - The title/name of the tab | Block Content option
* **data-enlighter-linenumbers** (boolean) - Show/Hide the linenumbers of a codeblock (Values: "true", "false") | Block Content option
* **data-enlighter-highlight** (string) - A List of lines to point out, comma seperated (ranges are supported) e.g. "2,3,6-10" | Block Content option
* **data-enlighter-lineoffset** (number) - Start value of line-numbering e.g. "5" to start with line 5 - attribute `start` of the ol tag is set | Block Content option

#### Example 1 ####

```html
<pre data-enlighter-language="js" data-enlighter-linenumbers="false" data-enlighter-lineoffset="5">
...
</pre>
```

#### Example 2 ####

```html
<p>
EnlighterJS also supports <code class="special" data-enlighter-language="js">alert('Inline Sourcecode highlighting');</code> (since version 2.0).
</p>
```

Code-Groups
-----------

This example shows how to use code-groups. You can define a new code-group by adding a `data-enlighter-group` attribute to your code tags you want to group. The value is used as an internal identifier and is not shown anywhere (e.g. use numerical identifiers).
The name/title of the tab is defined by a `data-enlighter-title` attribute. To use a corporate style within all code-blocks grouped together, the theme definition of the first code-block defined in your document (the group leader) is used as theme of the complete group - other theme definitions will be ignored. if no theme is specified, the default theme (defined in the options) will be used, which is recommended.

### Define a Code-Group ###

```html
<!-- the following 3 code-blocks will be grouped togehter - the theme will be "enlighter" (global theme definition of the group-leader) !-->
<pre data-enlighter-language="js" data-enlighter-group="group0001" data-enlighter-title="Javascript">
this.tokens = tokens || [];
options = this.options;
</pre>

<!-- Theme definition will be ignored !-->
<pre data-enlighter-language="java" data-enlighter-theme="panic" data-enlighter-group="group0001" data-enlighter-title="pure Java">
import javax.swing.JOptionPane;

public class OddEven {
/**
 * "input" is the number that the user gives to the computer
 */
private int input; // a whole number("int" means integer)
</pre>

<!-- Theme definition will be ignored !-->
<pre data-enlighter-language="php" data-enlighter-theme="twilight" data-enlighter-group="group0001" data-enlighter-title="PHP Script">
/** Test Snippet */
$mysqli = new mysqli("localhost", "my_user", "my_password", "world");
   
/* check connection */
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}
</pre>
```
	
### Initialize Code-Groups ###
The initialization of code-groups differs from the standard. You have to use the `EnlighterJS.Util.Helper` utility function (triggered by Metainit and EnlighterJS.Util.Init) - it does the complete initialization and grouping for you!
* JS-Initialization Chain: EnlighterJS.Util.Init -> **EnlighterJS.Util.Helper** -> EnlighterJS
* Metainit-Initialization Chain: EnlighterJS.Util.Metainit -> **EnlighterJS.Util.Helper** -> EnlighterJS

Finally, use the following JavaScript code inside of a `domready` or `onload` event to create the highlighted elements. 
Check out the options section to see the various options you can use. 

**Notice:** `grouping` has to set to `true` when using the javascript based initialization

```js
// highlight all pre tags; no inline-highlighting
EnlighterJS.Util.Init('pre', null, {
    indent: 4,
    language: 'js',
    theme: 'enlighter',
    grouping: true,
    rawButton: true
});
```

Custom Builds
-------------
The EnlighterJS project is using [Apache ANT](http://ant.apache.org/) as build-system. 
[UglifyJS2](https://github.com/mishoo/UglifyJS2) and [clean-css](https://github.com/jakubpawlowicz/clean-css) are used to minify the production-ready javascript and css files.
To save bandwidth/traffic or include self-defined languages, you can easily customize your EnlighterJS build by editing the *build.xml* file (found in the root directory) and run Apache ANT (target *build*)

### Cloud/Web based builder ###

You can also use the web-based [EnlighterJS Builder](http://enlighterjs.org/Builder.html) to generate your customized package **without the need of ANT/development environment** - everything is done for you server-site!

### Software Requirements ###

* [Apache ANT 1.9](http://ant.apache.org/)
* [Ant-Contrib](http://sourceforge.net/projects/ant-contrib/files/ant-contrib/)
* [Node.js](https://nodejs.org/)
* [UglifyJS2](https://github.com/mishoo/UglifyJS2)
* [clean-css](https://github.com/jakubpawlowicz/clean-css)

### Include/Exclude Languages and Themes ###

If you want to remove some of the default theme you can edit the *include.themes* property and modify the list of css source files.
For Example: only include the modern themes

```xml
<!-- Themes to include !-->
<property name="include.themes" value="Enlighter Godzilla Beyond Classic MooTwo Eclipse Droide" />
```

Or Include only your custom themes (Note: they have to be located into `Source/Themes/`)

```xml
<!-- Themes to include !-->
<property name="include.themes" value="Custom1 Custom2" />		
```xml
			
Removing/Adding languages is also easy as this - they are defined by the *include.languages* property.
For Example: only include html+css+js syntax highlighting (be careful - html is an alias for XML!, you have to include `Xml`)

```xml
<!-- Languages to include !-->
<property name="include.languages" value="Css Javascript Xml" />
```

Contribution
------------

EnlighterJS is OpenSource and managed on [GitHub](https://github.com/AndiDittrich/EnlighterJS) - if you like, you're welcome to contribute!
To simplify the release and quality control process, please follow these remarks:

### Notices ###
* Your commits/pull-request should only contain changes of the `Source/`, `Resources/TestcaseData` directories or the Examples located into the root directory - otherwise i have to merge the request manually
* **Do not change** the files located into the `Examples/` or `Build/` directory - they are automatically generated during the build-process using data from `Resources/TestcaseData`
* Related software packages like MooTools, Bootstrap, ANT-contrib are updated by the maintainer
* If you form a concept of larger project changes, please [discuss](https://github.com/AndiDittrich/EnlighterJS/issues) them with the contributors **before** implementing

### Documentation ###
* To change contents of the `README.md` file please edit the split files in `Docs/` - the readme file is automatically generated by merging these files during the build process

### Adding a new Language ###
* First of all: take a look on other languages which are already available to learn about functions and coding styles
* To start with a new language please use the `LanguageDevelopment.phtml` workspace. It will automatically load `Source/Language/Template.mylang.js` (the startup file for your language development).
* Rename your language file `Template.mylang.js` to the **camel-cased** real language name - e.g. `Vhdl.js`
* Add detailed comments to each language rule!
* Keep the code as small as possible: e.g. use regex instead of long keyword lists
* In case your language is a superset of another one, please **extend** the origin language - do not copy the origin file
* Add an language testcase/demo to the `Resouces/TestcaseData` directory
* Finally create a [Pull Request on GitHub](https://help.github.com/articles/creating-a-pull-request/) - your changes will be reviewed and commonly added to the project

Compatibility
-------------

All browsers supported by MooTools and with HTML5 capabilities for "data-" attributes are compatible with EnlighterJS.
It's possible that it may work with earlier/other browsers.

* Chrome 10+
* Safari 5+
* Internet Explorer 6+
* Firefox 2+
* Opera 9+

EnlighterJS requires MooTools.Core/1.4 (no compat) - tested with:
* Core/1.4.5
* Core/1.5.0
* Core/1.5.1

Screenshots
-----------

![Screenshot 1](http://enlighterjs.org/screenshot1.png)
![Screenshot 2](http://enlighterjs.org/screenshot2.png)    
License
-------

EnlighterJS is OpenSource and licensed under the Terms of [The MIT License (X11)](http://opensource.org/licenses/MIT). You're welcome to [contribute](https://github.com/AndiDittrich/EnlighterJS/blob/master/CONTRIBUTE.md)!
