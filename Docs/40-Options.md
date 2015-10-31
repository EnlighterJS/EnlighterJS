
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