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
