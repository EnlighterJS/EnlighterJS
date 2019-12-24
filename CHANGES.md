## Branch 3.x ##

**Re-Created from Scratch - The whole systems architecture has been changed**

### Version 3.2.0 ###

* Added: verilog support - thanks to [t123yh on GitHub](https://github.com/EnlighterJS/EnlighterJS/pull/86)
* Changed: updated gulp + plugins

### Version 3.1.0 ###

* Added: additional css classes can be added to the outer container
* Added: css classes of the origin element can be copied to the outer container (disabled by default)
* Added: additional shell script aliases `sh` and `zsh` - feature requested [on GitHub](https://github.com/EnlighterJS/Plugin.WordPress/issues/183)
* Added: language instance cache via factory - already used language class instances can be re-used
* Changed: language aliases moved into language support files as static method
* Changed: language instances are initialized via factory
* Bugfix: rawcode on doubleclick doesn't work - event handler name typo
* Bugfix: removed invalid c# annoation symbol #76
* Bugfix: allow single escaped quotes `\"` in shell scripts
* Bugfix: numbers were not highlighted in shell scripts

### Version 3.0.1 ###

* License changed to **Mozilla Public License 2.0**
* Replaced MooTools Framework by native code - requires IE >= 10
* **NEW Highlighting Engines** - every language support file has been rewritten
* [Gulp](http://gulpjs.com/) based build-system
* ES6 Syntax using [babeljs](http://babeljs.io/) as transpiler
* Library is build and optimized with [rollup.js](https://rollupjs.org/)
* UI components build with [jsx](https://reactjs.org/docs/introducing-jsx.html) - but without native react
* All Themes are transformed to [LESS](http://lesscss.org)
* New Tokenizer Engine including a two stage analyzer
* Excessive Performance Optimizations
* The complete javascript code is capsuled within a closure and is only exposed by the `window.EnlighterJS` object
* Highlighting can be removed at any time (elements will be removed from DOM)
* Removed the last pieces of Lighter.js codebase

**New/Deprecated Features**
* Added jQuery (jQuery.fn.x) `enlight()` extensions
* Added: ECMA6 Support to Javascript Engine
* Added: Copy to clipboard button
* Added: horizontal scroll option
* Added: [GO](https://golang.org/) Support
* Added: [RUST](https://www.rust-lang.org/) Support
* Added: [YAML](http://docs.ansible.com/ansible/YAMLSyntax.html) Support
* Added: [Kotlin](https://kotlinlang.org) support
* Added: [TypeScript](https://www.typescriptlang.org/) support
* Added: [Groovy](http://groovy-lang.org) support
* Added: [LESS](http://lesscss.org/) Support
* Added: [SASS/SCSS](http://sass-lang.com/) Support
* Added: [Dockerfile](https://docs.docker.com/engine/reference/builder/) Support
* Added: [CSS Level3](http://www.w3schools.com/css/css3_intro.asp) Support
* Added: [Powershell](https://msdn.microsoft.com/en-us/powershell/mt173057.aspx) Support
* Added: [VisualBasic NET/Classic](https://msdn.microsoft.com/de-de/library/2x7h1hfk.aspx) Support
* Added: [Swift](https://developer.apple.com/library/prerelease/content/documentation/Swift/Conceptual/Swift_Programming_Language/index.html) Support
* Added: [QML](https://doc.qt.io/qt-5/qtqml-syntax-basics.html) Support
* Added: VHDL Support
* Added: ABAP Support (simple)
* Added: Prolog Support (simple)
* Added: Cordpro Support (simple)
* Added: Bootstrap4 Theme
* Added: Dracula Theme (dark, following [draculatheme](https://draculatheme.com/) colors)
* Added: Monokai Theme (dark)
* Removed: Lighter.js legacy themes (Git, Mocha, MooTools, Panic, Tutti, Twilight)
* Removed: most keyword lists from language files (direct regular expressions are used)