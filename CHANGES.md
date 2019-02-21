## Branch 3.x ##

**Re-Created from Scratch - The whole systems architecture has been changed**

### Version 3.0 ###

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
* Added: Prolog Support (simple)
* Added: Bootstrap4 Theme
* Added: Dracula Theme (dark, following [draculatheme](https://draculatheme.com/) colors)
* Added: Monokai Theme (dark)
* Removed: Lighter.js legacy themes (Git, Mocha, MooTools, Panic, Tutti, Twilight)
* Removed: most keyword lists from language files (direct regular expressions are used)