
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