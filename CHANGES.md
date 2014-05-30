### Version 2.2.1 ##
* Added Web-based Build-Service to easily generate custom EnlighterJS packages
* Added Webbuild Target (used for Promethium CloudBuilder Service)
* Improved Build-File
* Removed "Util/human-readable-filter.xml" - formattings moved into the "concat-compress" task
* Bugfix: Invalid directory names within buildfile

### Version 2.2 ##
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