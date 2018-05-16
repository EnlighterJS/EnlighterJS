## Branch 2.x ##

### Version 2.12.0 ###
* Added: `msdos` support - thanks to [audioscavenger on GitHub](https://github.com/EnlighterJS/EnlighterJS/pull/33/commits)
* Bugfix: misspelled css attribute `padding` in droide theme - thanks to [audioscavenger on WordPress.org](https://wordpress.org/support/topic/paddding-does-not-exist/)
* Changed: modified legacy build process to run with local npm modules

### Version 2.11.1 ##
* Bugfix: Underscore not allowed in xml tags - thanks to [higginbg on GitHub](https://github.com/AndiDittrich/WordPress.Enlighter/issues/72)

### Version 2.11.0 ###
* Added: Kontlin Language Support - thanks to [kevcodez on GitHub](https://github.com/AndiDittrich/EnlighterJS/pull/27)
* Bugfix: Fixed Websites Theme Chooser

### Version 2.10.1 ###
* Changed: toolbar button link to http://enlighterjs.org
* Bugfix: The special-line color of the Atomic theme was too dark. changed to 0x392d3b - thanks to [CraigMcKenna on GitHub](https://github.com/AndiDittrich/WordPress.Enlighter/issues/24)

### Version 2.10.0 ###
* Added: [Cython](http://cython.org/) Language support - thanks to [DevynCJohnson on GitHub](https://github.com/AndiDittrich/EnlighterJS/pull/14)
* Added: [Squirrel](http://www.squirrel-lang.org/) Language support - thanks to [DevynCJohnson on GitHub](https://github.com/AndiDittrich/EnlighterJS/pull/16)
* Added: [General Assembly Language support](https://en.wikipedia.org/wiki/Assembly_language) - feature requested on [GitHub](https://github.com/AndiDittrich/EnlighterJS/issues/12)
* Added: [LUA](http://www.lua.org/) Language support
* Added: Minimal Theme (bright, high contrast)
* Added: Atomic Theme (dark, colorful)
* Added: Rowhammer Theme (light)
* Added: new social buttons to the website
* Added: contribution guidelines
* Added: missing AVR Assembly features (used [AVR-1022](www.atmel.com/Images/doc1022.pdf) reference) 
* Added: new AVR Assembly testcase/example
* Added: support for multiple matching groups within patterns - thanks to [Krusen on GitHub](https://github.com/AndiDittrich/EnlighterJS/pull/11)
* Added: dispose() function to remove generated HTML from DOM - may required for high dynamic sites - feature requested on [GitHub](https://github.com/AndiDittrich/EnlighterJS/issues/9)
* Changed: used GFM style for the documentation (will break outdated MooTools-Forge markdown parser)
* Changed: the file extensions of `ThemeDevelopment` and `LanguageDevelopment` are changed to `.html` because PHP is not needed anymore during language/theme development
* Changed: removed some javascript keywords like `stop`, `close`
* Bugfix: removed `console.log` debugging output from tokenizer
* EnlighterJS has a new home **http://enlighterjs.org**

### Version 2.9.0 ###
* Bugfix: the final character of highlighted code got removed by the tokenizer engine in case it's a text token with length=1 - thanks to [dan-j on GitHub](https://github.com/AndiDittrich/WordPress.Enlighter/issues/15)
* Bugfix: Generic highlighting was accidentally removed from EnlighterJS 

### Version 2.8.0 ###
* Bugfix: Under some special conditions the tokenizer repeats the last sequence of a codeblock - thanks to [Kalydon](https://github.com/AndiDittrich/EnlighterJS/issues/8) and [dan-j on GitHub](https://github.com/AndiDittrich/WordPress.Enlighter/issues/13)
* Bugfix: Wrong CSS Meta Data within the new Themes

### Version 2.7.0 ###
* Added: [Rust](http://www.rust-lang.org/) language support - feature requested on [GitHub](https://github.com/AndiDittrich/EnlighterJS/issues/7)
* Added: [VHDL](http://en.wikipedia.org/wiki/VHDL) language support
* Added: [Matlab](http://en.wikipedia.org/wiki/MATLAB) language support
* Added: New Shell/Bash language engine
* Added: New PHP language engine
* Added: New CSS language engine - some styles have changed!
* Added: Shell script example
* Added: "MooTwo" theme inspired by the mootools.net website
* Added: "Godzilla" theme inspired by the MDN
* Added: "Droide" theme
* Added: New EnlighterJS Info Button (Toolbar)
* Added: New Tokenizer Engine which increases the rendering performance by nearly **700%**
* Added: Manifest `package.json` file to load required Node.js dependencies via npm (required for the build process)
* Moved: `LanguageDevelopment.html` and `ThemeDevelopment.html` back to the project root
* Removed: Build/Sources.json file - replaced by `.tmp/js.txt` and `.tmp/css.txt` (list of all used source files - required for development only!)
* Removed: Old Tokenizer Engines (`Smart`, `Lazy`, `Tokenizer`)
* Removed: CSS Class `unknown` from un-highlighted tokens (text)
* Bugfix: The Theme Selector of the language demo pages doesn't remove the default styles
* Bugfix: Wrong highlighting class used for SQL comments
* Changed: Smart Tokenizer Engine is used instead of the old Lazy Bruteforce matching
* Changed: All Fonts of the modern Themes are replaced by "Source Code Pro" as default
* Changed: CSS theme sources are converted to [LESS](http://lesscss.org)
* Changed: Classic Themes `kw3` color switched with `kw4`
* Changed: The *hover* css-class is now added to the outer `ol,ul` container instead of each `li` line - all themes have been adapted 
* Changed: Inline gif imaages are used for the button toolbar instead of png images (size optimization)
* Many performance improvements
* Reduced the CSS and JS file-size by massive sourcecode optimizations (43kB JS; 28KB CSS; including all Themes and Languages!)
* New EnlighterJS Project Website


### Version 2.6.0 ###
* Added input/output TextFilter
* Added: Native JSON markup language support
* Added: Extended JSON language examples
* Added: Support for the [Cryptex WordPress Plugin](https://wordpress.org/plugins/cryptex)
* Added: New PHP Language Example
* Added: Alias `conf` for ini files
* Registered EnlighterJS within [bower](http://bower.io) package manager
* Some performance improvements (raw code is now cached)
* Semantic Versioning [semver](http://semver.org/) is used for releases

### Version 2.5 ###
* Added DOM abstraction layer
* Added: Language "AVR Assembler"
* Added: Language "Ini" (ini, conf, property files)
* Added: XML Namespace highlighting
* Added: Theme Switcher to the Language Examples
* Changed: kw3 with kw4 color of the beyond-theme
* Changed: The compressed JS/CSS files are now named `Enlighter.min.js` and `Enlighter.min.css`
* Changed: javascript [Strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) is used within the plugin namespace
* Changed: All Examples are moved to `Examples/`
* Bugfix: Screenshots are not available within the `PublicHtml` build
* Bugfix: Invalid bootstrap css paths within `Development.phtml`
* Bugfix: Highlighting of multi-line XML/HTML tags failed - thanks to [Suleiman19 on GitHub](https://github.com/AndiDittrich/WordPress.Enlighter/issues/8)
* Removed: ant-contrib package from utils
* Updated: MooTools to 1.5.1
* Replaced YUI Compressor by [UglifyJS2](https://github.com/mishoo/UglifyJS2) and [clean-css](https://github.com/jakubpawlowicz/clean-css)

### Version 2.4 ###
* Bugfix: Wrong line-font-size in the Enlighter-Theme YAML header
* Bugfix: Wrong styles within the Beyond-Themes YAML header
* Bugfix: Wrong line-font-size in the Eclipse-Theme YAML header
* Bugfix: General fixes within the Documentation

### Version 2.3 ###
* Added Theme "Classic"
* Added Theme "Eclipse"
* Added Theme "Beyond"
* Added Language "Diff" for changelogs
* Added optional "Code Window" button which displays the raw-code in a new window
* Added optional "Info Button"
* Added "Toolbar Container" (containing all buttons)
* Added Metainit options `data-windowbutton` and `data-infobutton`
* Added `LanguageDevelopment.html` and `ThemeDevelopment.html` for rapid development startup
* Addded `EnlighterJS.Util.Init` utility function for easy script based initialization of inline+block code
* Added new Quickstart-page
* Added new Examples - including the new `EnlighterJS.Util.Init` utility function as well as some advanced examples!
* Added optional doubleklick event to toggle between highlighted- and raw-code
* Added new intro page
* Added new NSIS command as of NSIS 3.0b1 (see [release notes](http://nsis.sourceforge.net/Docs/AppendixF.html#v3.0b1-rl)) by [idleberg](https://github.com/idleberg)
* Changed XML coloring-scheme: comments are now handled as `co2` (multiline comments)
* Changed hover and specialline highlighting color of the Enlighter-Theme
* Chnaged button visibility: all toolbar buttons are visible by default
* Updated MooTools to the [NEW 1.5 Release](http://mootools.net/blog/2014/05/19/mootools-1-5-is-here/)
* Updated Bootstrap (used for the Examples) to `v3.2.0`
* Removed unused attribute `id` from generated container-element
* Replaced `.firstline` and `.lastLine` css classes with native :first-child/:last-child
* Replaced the `DynamicSourcefileLoader` (introduced in v2.0) with a PHP based version into `Development.phtml` (this will avoid some strange errors during debugging)´
* Replaced `div` toolbar-button containers by `a` tags - title attribute supported for buildin tooltips
* Replaced text-buttons with icons
* Renamed javascript language "js" to "javascript" - an alias is added for backward compatibility
* Tested EnlighterJS with MooTools 1.5
* Some internal changes (Theme CSS; HTML Structure; Toolbar buttons outsourced to `UI/Toolbar.js`)
* Moved the Documentation to `Docs/` and seperated the sections by file - `README.md` is automatically generated during the build-process

### Version 2.2.1 ###
* Added Web-based Build-Service to easily generate custom EnlighterJS packages
* Added Webbuild Target (used for Promethium CloudBuilder Service)
* Improved Build-File
* Removed "Util/human-readable-filter.xml" - formattings moved into the "concat-compress" task
* Bugfix: Invalid directory names within buildfile

### Version 2.2 ###
* Added language support for C# (csharp) [provided by Joshua Maag](https://github.com/joshmaag)
* Added C# language example
* Added language alias "c#" for language csharp
* Changed: using YUI compressed file within Examples+PublicHtml pages
* Bugfix: Indentation of first line got lost - thanks to [cdonts](http://wordpress.org/support/topic/no-indentation-in-the-first-line?replies=2)

### Version 2.1 ###
* Added Changelog to doc pages
* Added Inline Highlighting example to the Theme-Demo page
* Added Build Version to doc pages
* Added option `ampersandCleanup` to enable/disable code cleanup for ampersand signs
* Added YAML metadata to each theme containing basic style informations - used within the official [Enlighter WordPress Plugin](http://wordpress.org/plugins/enlighter/)
* Improved theme designs
* Changed the tab design of the "Git" Theme
* Changed rgba background-color values of "Tutti" Theme to hex (#fffdf7)
* Bugifx: Option "data-enlighter-offset" not recognized if local option "data-enlighter-linenumbers" was missing
* Bugfix: Some CSS Container margin fixes
* Bugfix: Global options got modified by EnlighterJS.Util.Helper (using codegroups) which caused an unexcepted behaviour (options of multiple instances got merged)
* Bugfix: Added missing inline-theme-styles
* Bugfix: Optional linenumber-offset not recognized for highlighting/pointing out special lines of code
* Bugfix: Code cleanup for `nbsp;` escape sequence missing

### Version 2.0 ###
* Added support for Inline-Syntax-Highlighting
* Added Python Testcase
* Added DynamicSourcefileLoader (js+css files) used for rapid-development without rebuild (only used within "Development.html")
* Added Development Playground "Development.html"
* Added Metainit selector options for inline and block content
* Added Bootstrap based Demo/Testcases/Templates
* Added New standard theme "Enlighter"
* Added Metainit option to disable inline/block highlighting - just use `NULL` as selector 
* Added C Language Example
* Added new Markdown Language Example
* Added new Language Template `Source/Language/Template.mylang.js` with additional comments/instructions how to create your own language
* Added optional line-number-offset (`start` attribute of `ol` tag used) - just add `data-enlighter-lineoffset="5"` to your codeblock
* Added global option to enable/disable line-numbers. Local attribute overwrite via `data-enlighter-linenums="false"` is also available
* Added javascript language aliases for `jquery`, `mootools` and `ext.js`
* Added Inline code examples for each language
* Added optional "raw code" button to toggle between highlighted and raw code (usefull to copy code with original identation) - option disabled by default
* Improved Code Structure
* Improved XML Testcase
* Changed: "Compilers" replaced by `BlockRenderer` and `InlineRenderer` classes
* Changed: Testcase data moved to "Resources/TestcaseData"
* Changed: Renamed the old standard theme to "MooTools"
* Changed: Type of EnlighterJS.Util.Helper is changed from `Class` to `Function` - an instance was never used/necessary
* Changed: The option `compiler` is replaced by `renderer` Block/Inline
* Changed: Demo-URL to `http://enlighterjs.andidittrich.de/`
* Changed: CSS Class of the output container changed from `EnlighterJSRendererd` to `EnlighterJS` 
* Changed: `Quickstart.html` and `Development.html` moved to project root
* Changed: Renamed language `md` to `markdown` - an alias is added for backward compatibility
* Changed: Option `altline` renamed to `hover` (also used by Metainit)
* Changed: Initialization of language parameters is now handled into `setupLanguage`
* Changed: All Themes are derived from `Base.css`
* Changed: The visibility of Line-Numbers is now controlled via global/local settings and not by the "compiler" option like in previous versions
* Changed: Block-Content is now always displayed as `ol` or `ul` container, depending on the line-number setting.
* Changed TabPane Container structure: `ul` item list is wrapped into a div container
* Changed: Language "no-highlight" will not trigger the Enlighter Engine and keep your code as it is (no styles are added). To display unhighlighted code with the enlighter styles, use `raw` as language instead.
* Changed: PHP is used to generate the Examples/Testcases
* Changed XML styling behaviour: attribute values are now expressed as class-type `st0` (string0) instead of kw2
* Changed: Java function-calls are now expressed as class-type `kw0` (keyword0)
* Deprecated: The `EnlighterJS.light()` and `EnlighterJS.unlight()` methods got replaced by `enlight(bool)` - backward compatibility included until next major release
* Deprecated: The `Element.light()` and `Element.unlight()` extensions got replaced by `Element.enlight(bool|object)` - backward compatibility included until next major release
* Removed: Python ruby style multiline comments
* Removed: EnlighterJS.Language.standard is replaced by EnlighterJS.Language.generic - an alias is added for backward compatibility
* Removed the `compiler` option from Metainit options (not needed anymore: inline code is automatically handled by the InlineRenderer and all other code by the BlockRenderer)
* Removed `C` language class (used as alias for `cpp` before - now implemented as language alias)
* Removed `HTML` language class (used as alias for `xml` before - now implemented as language alias)
* Removed unused language names from language files - each language is named/identified by it's own (lowercase) classname
* Removed unused offsets from Tokenizers
* Removed unused Tokenizer.Smart from builds
* Updated ANT-contrib package to 1.0b3
* Updated YUI Compressor to 2.4.8
* Bugfix: Using Language-Aliases as default-language failed
* Bugifx: Python used Ruby Multiline String comment style instead of `""" """; ''' '''`
* Bugfix: CSS Class "unknown" added to TabPane container
* Bugfix: Theme settings of TabPane failed using EnlighterJS.Util.Helper directly
* Bugfix: Missing fallback when passing "null" as theme option
* Bugfix: Code cleaning for Ampersand `&amp;` was processed as last - to handle chains like `&amp;lt;` => `&lt;` => `<` it is now processed first
* Bugfix: Added missing right+left borders to git theme

## Branch 1.x ##

### Version 1.8 ###
* Added highlighting for special-lines, just add the attribute `data-enlighter-highlight="1,2,8-10"` to highlight the lines 1,2,8,9,10

### Version 1.7.1 ###
* CSS Hotfix for bad linenumbers in Chrome @see http://wordpress.org/support/topic/bad-line-numbers-in-chrome?replies=3 - thanks to **cdonts**
* Added JSON language alias (parsed as javascript)

### Version 1.7 ###
* Added Language Aliases - e.g. "javascript" is a valid name for EnlighterJS.Language.js
	* Javascript -> js
	* Markdown -> md
	* no-highlight -> raw
	* bash -> shell
	* styles -> css
	* c++ -> cpp
* Added check of default language within options - improoved fallback function to "standard" highlighting mode

### Version 1.6 ###
* Fixed Testcase-Buildscript: Testcase files didn't got removed on build
* Bugfix: Added missing check of unknown languages (throws javascript error)
* Added RAW language: text is rendered unhighlighted
* Added lowercase-text-transforms to language- and theme-names - "GIT, Git, git" are valid names for the "git" theme

### Version 1.5.2 ###
* Added Plugin section to readme file

### Version 1.5.1 ###
* fixed YAML header within NSIS language support

### Version 1.5 ###
* Added language support for NSIS (Nullsoft Scriptable Install System) provided by Jan T. Sott

### Version 1.4 ###
* Added Quickstart Example
* Renamed *Tests/* to *Examples/* 

### Version 1.3 ###
* Added odd/even classes to Compiler.List
* Added Version+Build informations to css+js builds

### Version 1.2 ###
* Replaced Compiler.Inline with a new version (full DOM based handling)
* Replaced Compiler.List with a new version (full DOM based handling)
* Removed the Compiler.Lines (it does exactly the same as Compiler.List, but used div-elements)
* Fixed rendering bug within html-comments (specialchars didn't got replaced - solved by new compilers)
* Moved all subclasses into EnlighterJS object-namespace
* Modified id-naming-scheme of generated output containers (old: Lighter_ + (new Date()); new: EnlighterJS_ + String.uniqueID())
* Added class *EnlighterJSRendered* to generated container
* Modiefied the css-classname for theming (old: <themename>Lighter; new: <themename>EnligherJS)
* Replaced all standard-themes with rewritten versions - now they are all extending the standard theme, only the colors differs
* Reduced the size of the css files to ~8kB
* Enhanced the css robustness
* Modified the usage of *altLines* option: altLines now defines a name of a css class which is added on each line of the *List* view

### Version 1.1 ###
* Added Cpp and C language support
* Added metatag-based initialization

### Version 1.0 ###

* Initial Release of EnlighterJS (fork of [Lighter.js](https://github.com/pradador/Lighter) v3.0)
* Added ANT based build-script and utilities (YUI-compressor)
* Included prebuilds within the new GIT repository
* Added current MooTools build (1.4.5)
* Modified the testcases (now generated by ANT-buildfile)
* Renamed Fuels/Flames/Wick into conventional scheme Language/Themes/Token/Tokenizer
* Added SQL, Java testcases
* Added Apache Ant-contrib package (required for the new build script)
* Removed Loader.js - themes&languages are now bundled with the build
* Modified the complete software-architecture (tokenizers are now initialized by the chosen language)
* Modified the usage - one EnlighterJS instance per codeblock is required (strict oop design)
* Modified the usage - HTML5 data- attributes are used instead of css class attribute language:theme combo
* Added XML and HTML support (incorrect html support got fixed)
* Added support for tab based code-groups (displays multiple code-blocks within a tab-pane)
* Removed the outdated class-documentation of Lighter.js (extensive documentation/inline comments are in the source files)