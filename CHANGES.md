## Branch 3.x ##

**Re-Created from Scratch - The whole systems architecture has been changed**

### Version 3.7.0 ###

* Added: basic support for `makefile` syntax

### Version 3.6.0 ###

* Added: css tooltips to the toolbar
* Added: copy-to-clipboard success/error message via tooltip
* Added: language identifier as css class to the outer wrapper `enlighter-l-<resolvedLanguage>`
* Added: `htaccess` language alias to "Apache httpd"
* Changed: DOM structure has changed: each raw+highlighted code elements are wrapper into `enlighter-code` container
* Changed: DOM structure has changed: removed `enlighter-codegroup-wrapper`
* Changed: toolbar position is now persistent and not affected by horizontal/vertical scrolling
* Bugfix: `bash` pound style comment regex also matched variable substituions and special cases - thanks to [maidentaiwan on GitHub](https://github.com/EnlighterJS/EnlighterJS/issues/200)
* Bugfix: `bash` single quoted strings not highlighted
* Bugfix: language alias `js` was processed as `typescript` due to inheritance issue (missing override)

### Version 3.5.0 ###

* Added: basic support for windows `batch` / `bat` file syntax
* Added: `dart` language support - thanks to [whiplashoo on GitHub](https://github.com/EnlighterJS/EnlighterJS/pull/185)
* Added: dedicated MariaDB/MySQL language support `mariadb`
* Added: dedicated Oracle Database language support `oracledb` (no special rules yet)
* Added: dedicated MSSQL language support `mssql` (no special rules yet)
* Added: dedicated PostgreSQL language support `postgresql` (no special rules yet)
* Added: `constraints` to `sql`
* Changed: splitted sql language into several types/dialects for further extension
* Changed: removed pound style comments from generic `sql` support
* Changed: removed keywords `bigint` and `unsigned` from generic `sql` support
* Changed: `droide` theme color `#009999` to `#007f7f` for higher contrast (WCAG) - thanks to [aphelionz on GitHub](https://github.com/EnlighterJS/EnlighterJS/pull/117)
* Changed: in case of a tokenizer error, the tokenizer will silently fail (output to console) instead of throwing an error - code will still be displayed but related tokens are missing
* Bugfix: `yaml` integer numbers not highlighted
* Bugfix: `php` variable and function names followed by single/double quotes were interpreted as name - thanks to [oleg-dk on GitHub](https://github.com/EnlighterJS/EnlighterJS/issues/178)
* Bugfix: `php` method names which equals a keyword were highlighted as keyword - thanks to [oleg-dk on GitHub](https://github.com/EnlighterJS/EnlighterJS/issues/181)
* Bugfix: `php` method calls on variables were interpreted as variable name - thanks to [oleg-dk on GitHub](https://github.com/EnlighterJS/EnlighterJS/issues/182)
* Bugfix: `latex` command on first line not recognized - thanks to [MamounImadRajab on GitHub](https://github.com/EnlighterJS/EnlighterJS/issues/169)
* Bugfix: `javascript` regular expressions are match over multiple lines - thanks to [mrdexters1 on Wordpress.org Forums](https://wordpress.org/support/topic/problem-with-the-division-symbol/#post-15257942)
* Bugfix: tokenizer loop limit was calculated in total instead of per-rule
* Bugfix: keywords of `generic` language requires a word-boundary before+after instead of a non word character - thanks to [Irwanda04 on GitHub](https://github.com/EnlighterJS/EnlighterJS/issues/129)
* Bugfix: allow any non-whitespace chars in sql column name literals
* Bugfix: added missing `string` keyword to `c#` type list
* Bugfix: pound and double-slash style comments also matched the last character before the comment

### Version 3.4.0 ###

* Added: keyword `k11` for annotations
* Added: keyword `x16` for css element selectors
* Added: contextual keywords to csharp - thanks to [mabako on GitHub](https://github.com/EnlighterJS/EnlighterJS/pull/112)
* Added: kotlin string template support
* Added: `r` language support (covered by generic ruleset)
* Added: MikroTik `RouterOS` language support (ros/mikrotik/switchos/routeros/mt)
* Added: pound style comment support to `php`
* Changed: css selector fragment highlighting is limited to the selector itself
* Changed: enhanced css unit parsing
* Changed: `java`, `scala`, `cpp` annotation token changed to `k11`
* Changed: added token `k11` to themes
* Changed: moved generic highlighting rules to `lang/rulesets/generic`
* Changed: `ampersandCleanup` is performed after html escape sequences to eliminate issues related to double unquoting #109
* Changed: toggle raw code label to "Plain text"
* Changed: allowed utf8 characters in `php` variable and function names (side effect of the php parser)
* Bugfix: vhdl single bit highlighting collided with attribute syntax - thanks to [tyriun on GitHub](https://github.com/EnlighterJS/EnlighterJS/issues/106)
* Bugfix: css classnames/ids with hyphens were not recognized
* Bugfix: XML mixins of single/double quotes in attributes failed #108
* Bugfix: dot char within XML attribute names not recognized
* Bugfix: kotlin raw string where not correctly parsed (wrong rule priority)
* Bugfix: highlighting color of `classic` theme not applied due to invalid selectors - thanks to [woolseyj on GitHub](https://github.com/EnlighterJS/EnlighterJS/issues/117)

### Version 3.3.0 ###

* Added: [apachehttpd/htaccess](https://httpd.apache.org/docs/2.4/configuring.html) support
* Added: [lighttpd](https://redmine.lighttpd.net/projects/lighttpd/wiki/Docs_Configuration) support
* Added: [nginx](https://www.nginx.com/resources/wiki/start/topics/examples/full/) support
* Added: [purebasic](https://www.purebasic.com/) support - thanks to [gphilippot on GitHub](https://github.com/EnlighterJS/EnlighterJS/pull/96)
* Added: latex/tex support
* Changed: theme font sizes + line-height are based on relative `em` values - only the font size of the outer wrapper is set explicitly
* Changed: removed "function" highlighting regex from `sql`
* Bugfix: [engine] possible overlapping matches of multitype tokens in case submatches are equal

### Version 3.2.0 ###

* Added: verilog support - thanks to [t123yh on GitHub](https://github.com/EnlighterJS/EnlighterJS/pull/86)
* Added: `collapse` option to limit the maximal height
* Added: integer highlighting for sql
* Added: modular configurable toolbar system using placeholders
* Added: collapse mode
* Added: browser based tooltips to the buttons (title attribute)
* Bugfix: powershell commands can also expressed lowercase (camel-case not required) - thanks to [krysiekBP on GitHub](https://github.com/EnlighterJS/EnlighterJS/issues/88)
* Bugfix: sql `--` styles comments ignored due to invalid regex - thanks to [petr-hybler on GitHub](https://github.com/EnlighterJS/EnlighterJS/issues/97)

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