
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