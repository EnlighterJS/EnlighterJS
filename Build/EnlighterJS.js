/*! EnlighterJS Syntax Highlighter 2.12.0 | MIT License (X11) | https://enlighterjs.org/ | May 16 2018 */
(function() {
    /*
---
name: EnlighterJS
description: Syntax Highlighter based on the famous Lighter.js

license: MIT-style X11 License

authors:
  - Andi Dittrich
  
requires:
  - Core/1.4.5

provides: [EnlighterJS]
...
 */
    var EJS = window.EnlighterJS = new Class({
        Implements: Options,
        options: {
            language: "generic",
            theme: "Enlighter",
            renderer: "Block",
            indent: -1,
            forceTheme: false,
            rawButton: true,
            windowButton: true,
            infoButton: true,
            ampersandCleanup: true,
            rawcodeDoubleclick: false
        },
        // used renderer instance
        renderer: null,
        // used codeblock to highlight
        originalCodeblock: null,
        // used container to store highlighted code
        container: null,
        // lightning active ?
        isRendered: false,
        // language alias manager
        languageManager: null,
        // toggle raw code
        rawContentContainer: null,
        // rendered output span/ou/ul container
        output: null,
        // input/output filter
        textFilter: null,
        // cached code input
        rawCode: null,
        /**
	 * @constructs
	 * @param {Element} originalCodeblock An Element containing code to highlight
	 * @param {Object} options The options object.
	 * @param {Element} container (optional) The output container - if not defined, the output will be injected after the originalCodeblock
	 */
        initialize: function(originalCodeblock, opt, container) {
            this.setOptions(opt);
            // create new language alias manager instance
            this.languageManager = new EJS.LanguageManager(this.options);
            // create new coe filter instance
            this.textFilter = new EJS.TextFilter(this.options);
            // initialize renderer
            if (this.options.renderer == "Inline") {
                this.renderer = new EJS.Renderer.InlineRenderer(this.options, this.textFilter);
            } else {
                this.renderer = new EJS.Renderer.BlockRenderer(this.options, this.textFilter);
            }
            // store codeblock element
            this.originalCodeblock = EJS.Dom.id(originalCodeblock);
            // store/create container
            if (container) {
                this.container = EJS.Dom.id(container);
            }
        },
        /**
	 * Takes a codeblock and highlights the code inside of it using the
	 * stored parser/compilers. It reads the class name to figure out what
	 * language and theme to use for highlighting.
	 * 
	 * @return {EnlighterJS} The current EnlighterJS instance.
	 */
        enlight: function(enabled) {
            // show highlighted sourcecode ?
            if (enabled) {
                // get element language
                var rawLanguageName = this.originalCodeblock.get("data-enlighter-language");
                // ignore higlighting ?
                if (rawLanguageName == "no-highlight") {
                    return;
                }
                // hide original codeblock
                this.originalCodeblock.setStyle("display", "none");
                // EnlighterJS exists so just toggle display.
                if (this.isRendered) {
                    this.container.setStyle("display", "inherit");
                    return this;
                }
                // get language name - use alias manager to check language string and validate
                var languageName = this.languageManager.getLanguage(rawLanguageName);
                // get theme name - use options as fallback
                var themeName = (this.options.forceTheme ? null : this.originalCodeblock.get("data-enlighter-theme")) || this.options.theme || "Enlighter";
                // special lines to highlight ?
                var specialLines = new EJS.SpecialLineHighlighter(this.originalCodeblock.get("data-enlighter-highlight"), this.originalCodeblock.get("data-enlighter-lineoffset"));
                // Load language parser
                var language = new EJS.Language[languageName](this.getRawCode(true));
                // compile tokens -> generate output
                this.output = this.renderer.render(language, specialLines, {
                    lineOffset: this.originalCodeblock.get("data-enlighter-lineoffset") || null,
                    lineNumbers: this.originalCodeblock.get("data-enlighter-linenumbers")
                });
                // set class and id attributes.
                this.output.addClass(themeName.toLowerCase() + "EnlighterJS").addClass("EnlighterJS");
                // add wrapper ?
                if (this.options.renderer == "Block") {
                    // grab content into specific container or after original code block ?
                    if (!this.container) {
                        this.container = new EJS.Dom.Element("div");
                        // put the highlighted code wrapper behind the original	
                        this.container.inject(this.originalCodeblock, "after");
                    }
                    // add wrapper class
                    this.container.addClass("EnlighterJSWrapper").addClass(themeName.toLowerCase() + "EnlighterJSWrapper");
                    // add the highlighted code
                    this.container.grab(this.output);
                    // create raw content container
                    this.rawContentContainer = new EJS.Dom.Element("pre", {
                        text: this.getRawCode(false),
                        styles: {
                            display: "none"
                        }
                    });
                    // add raw content container
                    this.container.grab(this.rawContentContainer);
                    // show raw code on double-click ?
                    if (this.options.rawcodeDoubleclick) {
                        this.container.addEvent("dblclick", function() {
                            this.toggleRawCode();
                        }.bind(this));
                    }
                    // toolbar ?
                    if (this.options.rawButton || this.options.windowButton || this.options.infoButton) {
                        this.container.grab(new EJS.UI.Toolbar(this));
                    }
                } else {
                    // grab content into specific container or after original code block ?
                    if (this.container) {
                        this.container.grab(this.output);
                    } else {
                        this.output.inject(this.originalCodeblock, "after");
                        this.container = this.output;
                    }
                }
                // set render flag
                this.isRendered = true;
            } else {
                // already highlighted ?
                if (this.isRendered) {
                    this.originalCodeblock.setStyle("display", "inherit");
                    this.container.setStyle("display", "none");
                }
            }
            return this;
        },
        /**
     * Disable highlighting and remove generated DOM
     */
        dispose: function() {
            // already highlighted ?
            if (!this.isRendered) {
                return;
            }
            // restore original codeblock
            this.originalCodeblock.setStyle("display", null);
            // hide highlighted code
            this.container.setStyle("display", "none");
            this.rawContentContainer.setStyle("display", "none");
            // drop dom
            this.container.dispose();
            this.rawContentContainer.dispose();
            this.container = null;
            this.rawContentContainer = null;
            // reset flag
            this.isRendered = false;
        },
        /**
	 * Extracts the raw code from given codeblock
	 * @return {String} The plain-text code (raw)
	 */
        getRawCode: function(reindent) {
            // cached version available ?
            var code = this.rawCode;
            if (code == null) {
                // get the raw content
                code = this.originalCodeblock.get("html");
                // remove empty lines at the beginning+end of the codeblock
                code = code.replace(/(^\s*\n|\n\s*$)/gi, "");
                // apply input filter
                code = this.textFilter.filterInput(code);
                // cleanup ampersand ?
                if (this.options.ampersandCleanup === true) {
                    code = code.replace(/&amp;/gim, "&");
                }
                // replace html escaped chars
                code = code.replace(/&lt;/gim, "<").replace(/&gt;/gim, ">").replace(/&nbsp;/gim, " ");
                // cache it
                this.rawCode = code;
            }
            // replace tabs with spaces ?
            if (reindent === true) {
                // get indent option value
                var newIndent = this.options.indent.toInt();
                // re-indent code if specified
                if (newIndent > -1) {
                    // match all tabs
                    code = code.replace(/(\t*)/gim, function(match, p1, offset, string) {
                        // replace n tabs with n*newIndent spaces
                        return new Array(newIndent * p1.length + 1).join(" ");
                    });
                }
            }
            return code;
        },
        /**
	 * Hide/Show the RAW Code Container/Toggle Highlighted Code
	 */
        toggleRawCode: function(show) {
            // initialization required!
            if (this.output == null) {
                return;
            }
            // argument set ?
            if (typeof show != "boolean") {
                show = this.rawContentContainer.getStyle("display") == "none";
            }
            // toggle container visibility
            if (show) {
                this.output.setStyle("display", "none");
                this.rawContentContainer.setStyle("display", "block");
            } else {
                this.output.setStyle("display", "block");
                this.rawContentContainer.setStyle("display", "none");
            }
        },
        /**
     * Takes a codeblock and highlights the code inside. The original codeblock is set to invisible
     * @DEPRECATED since v2.0 - this method will be removed in the future
     *
     * @return {EnlighterJS} The current EnlighterJS instance.
     */
        light: function() {
            return this.enlight(true);
        },
        /**
     * Unlights a codeblock by hiding the enlighter element if present and re-displaying the original code.
     * @DEPRECATED since v2.0 - this method will be removed in the future
     *
     * @return {EnlighterJS} The current EnlighterJS instance.
     */
        unlight: function() {
            return this.enlight(false);
        }
    });
    // register namespaces
    EJS.Language = {};
    EJS.Tokenizer = {};
    EJS.Renderer = {};
    EJS.Util = {};
    EJS.UI = {};
    /*
---
description: Filters the RAW Code from given pre tags

license: MIT-style

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.TextFilter]
...
*/
    EJS.TextFilter = new Class({
        Implements: Options,
        options: {
            cryptex: {
                enabled: false,
                email: "protected.email@example.tld"
            }
        },
        initialize: function(options) {
            this.setOptions(options);
        },
        /**
     * Apply Filter to text fragments output)
     * @param textFragment
     */
        filterOutput: function(textFragment) {
            return textFragment;
        },
        /**
     * Apply filter to the input chain (text block)
     * @param text
     * @returns {*}
     */
        filterInput: function(text) {
            // apply cryptex email address filter ?
            if (this.options.cryptex.enabled === true) {
                text = text.replace(/<!--CTX!--><span (rel="([a-f0-9]+)")?[\s\S]*?<!--\/CTX!-->/gim, function(match, m1, m2, offset, string) {
                    if (m2 && m2.length > 2 && typeof window.Cryptex != "undefined") {
                        return window.Cryptex.decode(m2);
                    } else {
                        return this.options.cryptex.email;
                    }
                }.bind(this));
            }
            return text;
        }
    });
    /*
---
description: EnlighterJS DOM Abstraction Layer (MooTools)

license: MIT-style X11 License

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Dom]
...
 */
    EJS.Dom = {
        /**
	 * Selects a single DOM Eement by given css selector
	 * @param sel
	 * @returns
	 */
        getElement: function(sel) {
            return document.getElement(sel);
        },
        /**
	 * Selects a collection of DOM Eöements by given css selector
	 * @param sel
	 * @returns
	 */
        getElements: function(sel) {
            return document.getElements(sel);
        },
        /**
	 * Selects an Element by it's ID
	 * @param elementID
	 * @returns DOM Element
	 */
        id: function(elementID) {
            return document.id(elementID);
        }
    };
    /*
---
description: EnlighterJS DOM Abstraction Layer (MooTools) - Just an Alias for MooTools Element

license: MIT-style X11 License

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Dom.Element]
...
 */
    EJS.Dom.Element = Element;
    /*
---
name: Special Line Highlighter
description: Highlights special lines

license: MIT-style X11 License

authors:
  - Andi Dittrich
  
requires:
  - Core/1.4.5

provides: [EnlighterJS.SpecialLineHighlighter]
...
*/
    EJS.SpecialLineHighlighter = new Class({
        // storage of line numbers to highlight
        specialLines: {},
        /**
	 * @constructs
	 * @param {String} html attribute content "highlight" - scheme 4,5,6,10-12,19
	 */
        initialize: function(lineNumberString, lineOffsetString) {
            // special lines given ?
            if (lineNumberString == null || lineNumberString.length == 0) {
                return;
            }
            // line offset available ?
            var lineOffset = lineOffsetString != null && lineOffsetString.toInt() > 1 ? lineOffsetString.toInt() - 1 : 0;
            // split attribute string into segments
            var segments = lineNumberString.split(",");
            // iterate over segments
            segments.each(function(item, index) {
                // pattern xxxx-yyyy
                var parts = item.match(/([0-9]+)-([0-9]+)/);
                // single line or line-range
                if (parts != null) {
                    // 2 items required
                    var start = parts[1].toInt() - lineOffset;
                    var stop = parts[2].toInt() - lineOffset;
                    // valid range ?
                    if (stop > start) {
                        // add lines to storage
                        for (var i = start; i <= stop; i++) {
                            this.specialLines["l" + i] = true;
                        }
                    }
                } else {
                    // add line to storage
                    this.specialLines["l" + (item.toInt() - lineOffset)] = true;
                }
            }.bind(this));
        },
        /**
	 * Check if the given linenumber is a special line
	 * @param Integer lineNumber
	 * @returns {Boolean}
	 */
        isSpecialLine: function(lineNumber) {
            return this.specialLines["l" + lineNumber] || false;
        }
    });
    /*
---
description: defines a key/value object with language aliases e.g. javascript -> js

license: MIT-style

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.LanguageManager]
...
*/
    EJS.LanguageManager = new Class({
        Implements: Options,
        options: {
            language: "generic"
        },
        /**
	 * @constructs
	 * @param {Object} options The options object.
	 */
        initialize: function(options) {
            this.setOptions(options);
        },
        // map of language aliases
        languageAliases: {
            standard: "generic",
            js: "javascript",
            md: "markdown",
            "c++": "cpp",
            c: "cpp",
            styles: "css",
            bash: "shell",
            py: "python",
            html: "xml",
            jquery: "javascript",
            mootools: "javascript",
            "ext.js": "javascript",
            "c#": "csharp",
            conf: "ini"
        },
        // get language name, process aliases and default languages
        getLanguage: function(languageName) {
            // get default language
            var defaultLanguage = this.options.language != null ? this.options.language.trim().toLowerCase() : "";
            // alias available ?
            if (this.languageAliases[defaultLanguage]) {
                defaultLanguage = this.languageAliases[defaultLanguage];
            }
            // default language class available ?
            if (defaultLanguage.trim() == "" || !EJS.Language[defaultLanguage]) {
                defaultLanguage = "generic";
            }
            // valid string ?
            if (languageName == null || languageName.trim() == "") {
                return defaultLanguage;
            }
            // "clean" languge name
            languageName = languageName.trim().toLowerCase();
            // alias available ?
            if (this.languageAliases[languageName]) {
                languageName = this.languageAliases[languageName];
            }
            // language class available ?
            if (EJS.Language[languageName]) {
                return languageName;
            } else {
                return defaultLanguage;
            }
        }
    });
    /*
---
description: Compiles an array of tokens into inline elements, grabbed into a outer container.

license: MIT-style X11

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Renderer.InlineRenderer]
...
*/
    EJS.Renderer.InlineRenderer = new Class({
        Implements: Options,
        options: {
            inlineContainerTag: "span"
        },
        textFilter: null,
        initialize: function(options, textFilter) {
            this.setOptions(options);
            this.textFilter = textFilter;
        },
        /**
	 * Renders the generated Tokens
	 * 
	 * @param {Language} language The Language used when parsing.
	 * @param {SpecialLineHighlighter} specialLines Instance to define the lines to highlight           
	 * @return {Element} The renderer output
	 */
        render: function(language, specialLines, localOptions) {
            // create output container element
            var container = new EJS.Dom.Element(this.options.inlineContainerTag);
            // generate output based on ordered list of tokens
            language.getTokens().each(function(token, index) {
                // create new inline element which contains the token - htmlspecialchars get escaped by mootools setText !
                container.grab(new EJS.Dom.Element("span", {
                    "class": token.alias,
                    text: this.textFilter.filterOutput(token.text)
                }));
            }, this);
            return container;
        }
    });
    /*
---
description: Renders the generated Tokens into li-elements, grabbed into a outer ul/ol-container.

license: MIT-style X11

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Renderer.BlockRenderer]
...
*/
    EJS.Renderer.BlockRenderer = new Class({
        Implements: Options,
        options: {
            hover: "hoverEnabled",
            oddClassname: "odd",
            evenClassname: "even",
            showLinenumbers: true
        },
        textFilter: null,
        initialize: function(options, textFilter) {
            this.setOptions(options);
            this.textFilter = textFilter;
        },
        /**
	 * Renders the generated Tokens
	 * 
	 * @param {Language} language The Language used when parsing.
	 * @param {SpecialLineHighlighter} specialLines Instance to define the lines to highlight           
	 * @return {Element} The renderer output
	 */
        render: function(language, specialLines, localOptions) {
            // elememt shortcut
            var _el = EJS.Dom.Element;
            // create new outer container element - use ol tag if lineNumbers are enabled. element attribute settings are priorized
            var container = null;
            if (localOptions.lineNumbers != null) {
                container = new _el(localOptions.lineNumbers.toLowerCase() === "true" ? "ol" : "ul");
            } else {
                container = new _el(this.options.showLinenumbers ? "ol" : "ul");
            }
            // add "start" attribute ?
            if ((localOptions.lineNumbers || this.options.showLinenumbers) && localOptions.lineOffset && localOptions.lineOffset.toInt() > 1) {
                container.set("start", localOptions.lineOffset);
            }
            // line number count
            var lineCounter = 1;
            var tokens = language.getTokens();
            var odd = " " + this.options.oddClassname || "";
            var even = " " + this.options.evenClassname || "";
            // current line element
            var currentLine = new _el("li", {
                "class": (specialLines.isSpecialLine(lineCounter) ? "specialline" : "") + odd
            });
            // output filter
            var addFragment = function(className, text) {
                currentLine.grab(new _el("span", {
                    "class": className,
                    text: this.textFilter.filterOutput(text)
                }));
            }.bind(this);
            // generate output based on ordered list of tokens
            Array.each(tokens, function(token) {
                // split the token into lines
                var lines = token.text.split("\n");
                // linebreaks found ?
                if (lines.length > 1) {
                    // just add the first line
                    addFragment(token.alias, lines.shift());
                    // generate element for each line
                    Array.each(lines, function(line, lineNumber) {
                        // grab old line into output container
                        container.grab(currentLine);
                        // new line
                        lineCounter++;
                        // create new line, add special line classes; add odd/even classes
                        currentLine = new _el("li", {
                            "class": (specialLines.isSpecialLine(lineCounter) ? "specialline" : "") + (lineCounter % 2 == 0 ? even : odd)
                        });
                        // create new token-element
                        addFragment(token.alias, line);
                    });
                } else {
                    addFragment(token.alias, token.text);
                }
            });
            // grab last line into container
            container.grab(currentLine);
            // highlight lines ?
            if (this.options.hover && this.options.hover != "NULL") {
                // add hover enable class
                container.addClass(this.options.hover);
            }
            return container;
        }
    });
    /*
---
description: Enlighter`s Standard Tokenizer Engine

license: MIT-style

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [Tokenizer.Standard]
...
*/
    EJS.Tokenizer.Standard = new Class({
        initialize: function() {},
        getTokens: function(language, code) {
            // create token object
            var token = function(text, alias, index) {
                return {
                    text: text,
                    alias: alias,
                    index: index,
                    length: text.length,
                    end: text.length + index
                };
            };
            // token list
            var rawTokens = this.getPreprocessedTokens(token);
            // cleaned token list to render
            var tokens = [];
            // apply each rule to given sourcecode string
            Array.each(language.getRules(), function(rule) {
                var match;
                // find ALL possible matches (also overlapping ones!)
                while (match = rule.pattern.exec(code)) {
                    // overrides the usual regex behaviour of not matching results that overlap
                    rule.pattern.lastIndex = match.index + 1;
                    // matching groups used ?
                    if (match.length == 1) {
                        rawTokens.push(token(match[0], rule.alias, match.index));
                    } else {
                        // get first matched group
                        for (var i = 1; i < match.length; i++) {
                            if (match[i] && match[i].length > 0) {
                                rawTokens.push(token(match[i], rule.alias, match.index + match[0].indexOf(match[i])));
                            }
                        }
                    }
                }
            });
            // sort tokens by index (first occurrence)
            rawTokens = rawTokens.sort(function(token1, token2) {
                return token1.index - token2.index;
            });
            // cleaned token list to render
            var tokens = [];
            // last token position
            var lastTokenEnd = 0;
            // iterate over raw token list and retain the first match - drop overlaps
            for (var i = 0; i < rawTokens.length; i++) {
                // unmatched text between tokens ?
                if (lastTokenEnd < rawTokens[i].index) {
                    // create new start text token
                    tokens.push(token(code.substring(lastTokenEnd, rawTokens[i].index), "", lastTokenEnd));
                }
                // push current token to list
                tokens.push(rawTokens[i]);
                // store last token position
                lastTokenEnd = rawTokens[i].end;
                // find next, non overlapping token
                var nextTokenFound = false;
                for (var j = i + 1; j < rawTokens.length; j++) {
                    if (rawTokens[j].index >= lastTokenEnd) {
                        // the "current" token -> i will be incremented in the next loop => j-1
                        i = j - 1;
                        nextTokenFound = true;
                        break;
                    }
                }
                // final position reached ?
                if (nextTokenFound === false) {
                    break;
                }
            }
            // text fragments complete ? or is the final one missing ?
            if (lastTokenEnd < code.length) {
                tokens.push(token(code.substring(lastTokenEnd), "", lastTokenEnd));
            }
            return tokens;
        },
        // token pre-processing; can be overloaded by extending class
        getPreprocessedTokens: function(token) {
            return [];
        }
    });
    /*
---
description: XML parser engine for EnlighterJS

license: MIT-style

authors:
  - Andi Dittrich
  - Jose Prado

requires:
  - Core/1.4.5

provides: [EnlighterJS.Tokenizer.Xml]
...
*/
    EnlighterJS.Tokenizer.Xml = new Class({
        Extends: EnlighterJS.Tokenizer.Standard,
        code: null,
        /**
     * Store code to pre-process XML
     */
        getTokens: function(language, code) {
            this.code = code;
            return this.parent(language, code);
        },
        /**
     * XML Syntax is preprocessed
     */
        getPreprocessedTokens: function(token) {
            // token list
            var rawTokens = [];
            // Tags + attributes matching and preprocessing.
            var tagPattern = /((?:\&lt;|<)[A-Z:_][A-Z0-9:._-]*)([\s\S]*?)(\/?(?:\&gt;|>))/gi;
            var attPattern = /\b([\w:-]+)([ \t]*)(=)([ \t]*)(['"][^'"]+['"]|[^'" \t]+)/gi;
            // tmp storage
            var match = null;
            var attMatch = null;
            var index = 0;
            // Create array of matches containing opening tags, attributes, values, and separators.
            while ((match = tagPattern.exec(this.code)) != null) {
                rawTokens.push(token(match[1], "kw1", match.index));
                while ((attMatch = attPattern.exec(match[2])) != null) {
                    // Attributes
                    index = match.index + match[1].length + attMatch.index;
                    rawTokens.push(token(attMatch[1], "kw2", index));
                    // Separators (=)
                    index += attMatch[1].length + attMatch[2].length;
                    rawTokens.push(token(attMatch[3], "kw1", index));
                    // Values
                    index += attMatch[3].length + attMatch[4].length;
                    rawTokens.push(token(attMatch[5], "st0", index));
                }
                rawTokens.push(token(match[3], "kw1", match.index + match[1].length + match[2].length));
            }
            return rawTokens;
        }
    });
    /*
---
name: CodeWindow
description: Opens a new Window with the raw-sourcecode within

license: MIT-style X11 License

authors:
  - Andi Dittrich
  
requires:
  - Core/1.4.5

provides: [EnlighterJS.UI.CodeWindow]
...
*/
    EJS.UI.CodeWindow = function(code) {
        // code "cleanup"
        code = code.replace(/&/gim, "&amp;").replace(/</gim, "&lt;").replace(/>/gim, "&gt;");
        // open new window
        var w = window.open("", "", "width=" + (window.screen.width - 200) + ", height=" + (screen.height - 300) + ", menubar=no, titlebar=no, toolbar=no, top=100, left=100, scrollbars=yes, status=no");
        // insert code
        w.document.body.innerHTML = "<pre>" + code + "</pre>";
        w.document.title = "EnlighterJS Sourcecode";
    };
    /*
---
name: Toolbar
description: Container which contains various buttons

license: MIT-style X11 License

authors:
  - Andi Dittrich
  
requires:
  - Core/1.4.5

provides: [EnlighterJS.UI.Toolbar]
...
*/
    EJS.UI.Toolbar = new Class({
        Implements: Options,
        options: {
            toolbar: {
                rawTitle: "Toggle RAW Code",
                windowTitle: "Open Code in new Window",
                infoTitle: "EnlighterJS Syntax Highlighter"
            }
        },
        // toolbar container
        container: null,
        initialize: function(enlighterInstance) {
            // get options
            this.setOptions(enlighterInstance.options);
            // create outer container
            this.container = new EJS.Dom.Element("div", {
                "class": "EnlighterJSToolbar"
            });
            // info button ?
            if (this.options.infoButton) {
                // create window "button"
                this.container.grab(new EJS.Dom.Element("a", {
                    "class": "EnlighterJSInfoButton",
                    title: this.options.toolbar.infoTitle,
                    events: {
                        // open new window on click
                        click: function() {
                            window.open("http://enlighterjs.org");
                        }.bind(this)
                    }
                }));
            }
            // toggle button ?
            if (this.options.rawButton) {
                // create toggle "button"
                this.container.grab(new EJS.Dom.Element("a", {
                    "class": "EnlighterJSRawButton",
                    title: this.options.toolbar.rawTitle,
                    events: {
                        click: function() {
                            // trigger toggle
                            enlighterInstance.toggleRawCode();
                        }.bind(this)
                    }
                }));
            }
            // code window button ?
            if (this.options.windowButton) {
                // create window "button"
                this.container.grab(new EJS.Dom.Element("a", {
                    "class": "EnlighterJSWindowButton",
                    title: this.options.toolbar.windowTitle,
                    events: {
                        // open new window on click
                        click: function() {
                            EJS.UI.CodeWindow(enlighterInstance.getRawCode(false));
                        }.bind(this)
                    }
                }));
            }
            // clearfix
            this.container.grab(new EJS.Dom.Element("span", {
                "class": "clear"
            }));
        },
        toElement: function() {
            return this.container;
        }
    });
    /*
---
description: Extends MooTools.Element with the `enlight()` shortcut. Also adds `light()` and `unlight()` for backward compatibility with Lighter.js

license: MIT-style X11 License

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [Element.enlight]
...
 */
    Element.implement({
        /**
     * Highlights an element/Removes Element highlighting
     *
     * @param {Object, Boolean} [options] EnlighterJS options Object or Boolean value to enable/disable highlighting
     * @returns {Element} The current Element instance.
     */
        enlight: function(options) {
            // mixed input check - options available ?
            options = typeof options == "undefined" ? {} : options;
            // convert "true" to empty Object!
            options = options === true ? {} : options;
            // enlighter instance already available ?
            var enlighter = this.retrieve("EnlighterInstance");
            // dispose element ?
            if (options === "dispose" && enlighter) {
                enlighter.dispose();
                this.eliminate("EnligterInstance");
                return this;
            }
            // hide highlighted sourcecode ?
            if (options === false) {
                if (enlighter !== null) {
                    enlighter.enlight(false);
                }
            } else {
                // create new enlighter instance
                if (enlighter === null) {
                    enlighter = new EJS(this, options, null);
                    this.store("EnlighterInstance", enlighter);
                }
                enlighter.enlight(options);
            }
            // element instance
            return this;
        },
        /**
     * Highlights an element
     * @DEPRECATED since v2.0 - this method will be removed in the future
     * @param {Object} [options] EnlighterJS Options Object
     * @returns {Element} The current Element instance.
     */
        light: function(options) {
            return this.enlight(options);
        },
        /**
     * Removes/hides Element highlighting
     * @DEPRECATED since v2.0 - this method will be removed in the future
     * @returns {Element} The current Element instance.
     */
        unlight: function() {
            return this.enlight(false);
        }
    });
    /*
---
name: Helper
description: Helper to initialize multiple Enlighter instances on your page as well as code-groups

license: MIT-style X11 License

authors:
  - Andi Dittrich
  
requires:
  - Core/1.4.5

provides: [EnlighterJS.Util.Helper]
...
*/
    EJS.Util.Helper = function(elements, options) {
        // break if no elements are selected/found
        if (elements == null || elements.length && elements.length == 0) {
            return;
        }
        // defaults
        options = options || {};
        // element grouping disabled?
        if (options.grouping && options.grouping === false) {
            // highlight all elements
            elements.enlight(options);
        } else {
            // get separated groups and single elements
            var groups = {};
            var ungrouped = [];
            // group elements
            Array.each(elements, function(el) {
                // extract group name
                var groupName = el.get("data-enlighter-group");
                // build element tree
                if (groupName) {
                    if (groups[groupName]) {
                        groups[groupName].push(el);
                    } else {
                        groups[groupName] = [ el ];
                    }
                } else {
                    ungrouped.push(el);
                }
            });
            // highlight single elements (non grouped)
            ungrouped.each(function(el) {
                el.enlight(options);
            });
            // create & highlight groups
            Object.each(groups, function(obj) {
                // copy options
                var localoptions = Object.clone(options);
                // force theme defined within options (all group members should have the same theme as group-leader)
                localoptions.forceTheme = true;
                // get group-leader theme
                localoptions.theme = obj[0].get("data-enlighter-theme") || options.theme || "Enlighter";
                // create new tab pane
                var tabpane = new EJS.UI.TabPane(localoptions.theme);
                // put enlighted objects into the tabpane
                Array.each(obj, function(el, index) {
                    // create new tab - set title with fallback
                    var container = tabpane.addTab(el.get("data-enlighter-title") || el.get("data-enlighter-language") || localoptions.language);
                    // run enlighter
                    new EJS(el, localoptions, container).enlight(true);
                }.bind(this));
                // select first tab (group-leader)
                tabpane.getContainer().inject(obj[0], "before");
                tabpane.selectTab(0);
            }.bind(this));
        }
    };
    /*
---
name: TapPane
description: Displays multiple code-blocks within a group

license: MIT-style X11 License

authors:
  - Andi Dittrich
  
requires:
  - Core/1.4.5

provides: [EnlighterJS.UI.TabPane]
...
*/
    EJS.UI.TabPane = new Class({
        // wrapper container which contains the controls + panes
        container: null,
        // control container - contains the tab names
        controlContainer: null,
        // pane container - contains the tab panes
        paneContainer: null,
        // array of tab objects
        tabs: [],
        // current active tab
        selectedTabIndex: 0,
        /**
	 * @constructs
	 * @param {String} cssClassname The class-name of the outer container
	 */
        initialize: function(cssClassname) {
            // create container
            this.container = new EJS.Dom.Element("div", {
                "class": "EnlighterJSTabPane " + cssClassname.toLowerCase() + "EnlighterJSTabPane"
            });
            // create container structure
            //	<div class="EnlighterJSTabPane ...">
            //    <div class="controls">
            //       <ul> <li>Tab1</li> .... </ul>
            //    </div>
            //    <div class="pane">
            //      <div>Enlighter Tab1</div>
            //      <div>Enlighter Tab2</div>
            //    </div>
            //  </div>
            this.controlContainer = new EJS.Dom.Element("ul");
            this.paneContainer = new EJS.Dom.Element("div", {
                "class": "pane"
            });
            var controlWrapper = new EJS.Dom.Element("div", {
                "class": "controls"
            });
            controlWrapper.grab(this.controlContainer);
            this.container.grab(controlWrapper);
            this.container.grab(this.paneContainer);
        },
        selectTab: function(index) {
            if (index < this.tabs.length) {
                // hide current tab
                this.tabs[this.selectedTabIndex].pane.setStyle("display", "none");
                this.tabs[this.selectedTabIndex].control.removeClass("selected");
                // show selected tab
                this.tabs[index].pane.setStyle("display", "block");
                this.tabs[index].control.addClass("selected");
                // store selected index
                this.selectedTabIndex = index;
            }
        },
        addTab: function(name) {
            // create new control element
            var ctrl = new EJS.Dom.Element("li", {
                text: name
            });
            this.controlContainer.grab(ctrl);
            // get new tab position
            var tabIndex = this.tabs.length;
            // select event - display tab
            ctrl.addEvent("click", function() {
                this.selectTab(tabIndex);
            }.bind(this));
            // create new tab element
            var tab = new EJS.Dom.Element("div", {
                styles: {
                    display: "none"
                }
            });
            this.paneContainer.grab(tab);
            // store new tab
            this.tabs.push({
                control: ctrl,
                pane: tab
            });
            // return created tab element
            return tab;
        },
        getContainer: function() {
            return this.container;
        }
    });
    /*
---
description: Automatical element highlighting using meta tag options

license: MIT-style X11 License

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS]
...
*/
    window.addEvent("domready", function() {
        // metadata config available ? -> autoinit
        var m = EJS.Dom.getElement('meta[name="EnlighterJS"]');
        // check instance
        if (!m) {
            return;
        }
        // create new options object
        var options = {
            language: m.get("data-language") || "generic",
            theme: m.get("data-theme") || "Enlighter",
            indent: m.get("data-indent").toInt() || -1,
            hover: m.get("data-hover") || "hoverEnabled",
            rawButton: m.get("data-rawcodebutton") === "true",
            windowButton: m.get("data-windowbutton") === "true",
            infoButton: m.get("data-infobutton") === "true",
            showLinenumbers: m.get("data-linenumbers") !== "false"
        };
        // selector available ? if not, match all pre-tags
        var blockSelector = m.get("data-selector-block") || "pre";
        // selector available ? if not, match all pre-tags
        var inlineSelector = m.get("data-selector-inline") || "code";
        // highlight all matching block tags
        if (blockSelector != "NULL") {
            options.renderer = "Block";
            EJS.Util.Helper(EJS.Dom.getElements(blockSelector), options);
        }
        // highlight all matching inline tags
        if (inlineSelector != "NULL") {
            options.renderer = "Inline";
            options.grouping = false;
            EJS.Util.Helper(EJS.Dom.getElements(inlineSelector), options);
        }
    });
    /*
---
description: Simple global-initialization of inline+block codeblocks

license: MIT-style X11 License

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Util.Init]
...
*/
    EJS.Util.Init = function(blockSelector, inlineSelector, options) {
        // defaults
        options = options || {};
        // highlight all matching block tags
        if (blockSelector) {
            options.renderer = "Block";
            EJS.Util.Helper(EJS.Dom.getElements(blockSelector), options);
        }
        // highlight all matching inline tags
        if (inlineSelector) {
            options.renderer = "Inline";
            options.grouping = false;
            EJS.Util.Helper(EJS.Dom.getElements(inlineSelector), options);
        }
    };
    /*
---
description: Code parsing engine for EnlighterJS

license: MIT-style

authors:
  - Jose Prado
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.generic]
...
*/
    EJS.Language.generic = new Class({
        tokenizerType: "Standard",
        tokenizer: null,
        code: null,
        patterns: {},
        keywords: {},
        delimiters: {
            start: null,
            end: null
        },
        // commonly used Regex Patterns
        common: {
            // Matches a C style single-line comment.
            slashComments: /(?:^|[^\\])\/\/.*$/gm,
            // Matches a Perl style single-line comment.
            poundComments: /#.*$/gm,
            // Matches a C style multi-line comment
            multiComments: /\/\*[\s\S]*?\*\//gm,
            // Matches a string enclosed by single quotes. Legacy.
            aposStrings: /'[^'\\]*(?:\\.[^'\\]*)*'/gm,
            // Matches a string enclosed by double quotes. Legacy.
            quotedStrings: /"[^"\\]*(?:\\.[^"\\]*)*"/gm,
            // Matches a string enclosed by single quotes across multiple lines.
            multiLineSingleQuotedStrings: /'[^'\\]*(?:\\.[^'\\]*)*'/gm,
            // Matches a string enclosed by double quotes across multiple lines.
            multiLineDoubleQuotedStrings: /"[^"\\]*(?:\\.[^"\\]*)*"/gm,
            // Matches both.
            multiLineStrings: /'[^'\\]*(?:\\.[^'\\]*)*'|"[^"\\]*(?:\\.[^"\\]*)*"/gm,
            // Matches a string enclosed by single quotes.
            singleQuotedString: /'[^'\\\r\n]*(?:\\.[^'\\\r\n]*)*'/gm,
            // Matches a string enclosed by double quotes.
            doubleQuotedString: /"[^"\\\r\n]*(?:\\.[^"\\\r\n]*)*"/gm,
            // Matches both.
            strings: /'[^'\\\r\n]*(?:\\.[^'\\\r\n]*)*'|"[^"\\\r\n]*(?:\\.[^"\\\r\n]*)*"/gm,
            // Matches a property: .property style.
            properties: /\.([\w]+)\s*/gi,
            // Matches a method call: .methodName() style.
            methodCalls: /\.([\w]+)\s*\(/gm,
            // Matches a function call: functionName() style.
            functionCalls: /\b([\w]+)\s*\(/gm,
            // Matches any of the common brackets.
            brackets: /\{|}|\(|\)|\[|]/g,
            // Matches integers, decimals, hexadecimals.
            numbers: /\b((?:(\d+)?\.)?[0-9]+|0x[0-9A-F]+)\b/gi
        },
        /**
	 * Constructor.
	 * 
	 * @constructs
	 * @param {Object}
	 *            options
	 */
        initialize: function(code) {
            // initialize language options
            this.setupLanguage();
            this.rules = [];
            this.code = code;
            // create new tokenizer
            this.tokenizer = new EnlighterJS.Tokenizer[this.tokenizerType]();
            // Add delimiter rules.
            if (this.delimiters.start) {
                this.rules.push({
                    pattern: this.delimiters.start,
                    alias: "de1"
                });
            }
            if (this.delimiters.end) {
                this.rules.push({
                    pattern: this.delimiters.end,
                    alias: "de2"
                });
            }
            // Set Keyword Rules from this.keywords object.
            Object.each(this.keywords, function(keywordSet, ruleName) {
                // keyword set contains elements ?
                if (keywordSet.csv != "") {
                    this.rules.push({
                        pattern: this.csvToRegExp(keywordSet.csv, keywordSet.mod || "g"),
                        alias: keywordSet.alias
                    });
                }
            }, this);
            // Set Rules from this.patterns object.
            Object.each(this.patterns, function(regex, ruleName) {
                // add new rule entry
                this.rules.push(regex);
            }, this);
        },
        getRuleByName: function(name) {},
        // override this method to setup language params
        setupLanguage: function() {
            // generic highlighting
            this.patterns = {
                strings: {
                    pattern: this.common.strings,
                    alias: "st0"
                },
                fn: {
                    pattern: this.common.functionCalls,
                    alias: "kw1"
                },
                me: {
                    pattern: this.common.methodCalls,
                    alias: "kw2"
                },
                brackets: {
                    pattern: this.common.brackets,
                    alias: "br0"
                },
                numbers: {
                    pattern: this.common.numbers,
                    alias: "nu0"
                },
                comment0: {
                    pattern: this.common.slashComments,
                    alias: "co1"
                },
                comment1: {
                    pattern: this.common.poundComments,
                    alias: "co1"
                },
                comment3: {
                    pattern: this.common.multiComments,
                    alias: "co2"
                }
            };
        },
        getTokens: function() {
            return this.tokenizer.getTokens(this, this.code);
        },
        getRules: function() {
            return this.rules;
        },
        csvToRegExp: function(csv, mod) {
            return new RegExp("\\b(" + csv.replace(/,\s*/g, "|") + ")\\b", mod);
        },
        delimToRegExp: function(beg, esc, end, mod, suffix) {
            beg = beg.escapeRegExp();
            if (esc) {
                esc = esc.escapeRegExp();
            }
            end = end ? end.escapeRegExp() : beg;
            var pat = esc ? beg + "[^" + end + esc + "\\n]*(?:" + esc + ".[^" + end + esc + "\\n]*)*" + end : beg + "[^" + end + "\\n]*" + end;
            return new RegExp(pat + (suffix || ""), mod || "");
        },
        strictRegExp: function() {
            var regex = "(";
            for (var i = 0; i < arguments.length; i++) {
                regex += arguments[i].escapeRegExp();
                regex += i < arguments.length - 1 ? "|" : "";
            }
            regex += ")";
            return new RegExp(regex, "gim");
        }
    });
    /*
---
description: ASM General Assembly Language

license: MIT-style

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.asm]
...
*/
    EJS.Language.asm = new Class({
        Extends: EJS.Language.generic,
        setupLanguage: function() {
            this.patterns = {
                // comments start with a semicolon (only single line comments available)
                singleLineComments: {
                    pattern: /(;.*)$/gm,
                    alias: "co1"
                },
                // controls - used e.g. in KEIL
                controls: {
                    pattern: /(\$.*)$/gm,
                    alias: "co2"
                },
                // "strings" may used in some assemblers for char constants
                strings: {
                    pattern: this.common.strings,
                    alias: "st0"
                },
                // general instructions (followed after a label or at a new line)
                instruction: {
                    pattern: /(^|:)\s*?(\w+)\s+/gm,
                    alias: "kw3"
                },
                // labels (jump targets)
                label: {
                    pattern: /^\s*?([A-Z\?_][A-Z0-9\?_]+:)\s*?/gim,
                    alias: "kw1"
                },
                // indirect addresses starts with @
                indirect: {
                    pattern: /@\w+/gi,
                    alias: "kw4"
                },
                // immediate data
                immediate: {
                    pattern: /#\w+/gi,
                    alias: "kw4"
                },
                // Hexadecimal (two notations): 0aH  (8051 asm)
                hex: {
                    pattern: /[A-F0-9][A-F0-9$]+?H/gi,
                    alias: "nu0"
                },
                // Decimal: \d+  (8051 asm)
                integer: {
                    pattern: /\d[\d$]+?D/gi,
                    alias: "nu0"
                },
                // Binary: 0b00001010, 0b11111111 (8051 asm)
                binary: {
                    pattern: /[01][01$]+?B/gi,
                    alias: "nu0"
                },
                // Octals: 1767q (8051 asm)
                octals: {
                    pattern: /[0-7][0-7$]+?(?:Q|O)/gi,
                    alias: "nu0"
                },
                // Hexadecimal (two notations): 0x0a, $0a, 0xff, $ff (generic)
                hex2: {
                    pattern: /(0x[A-F0-9]+|\$[A-F0-9]+)/gi,
                    alias: "nu0"
                },
                // Binary: 0b00001010, 0b11111111 (generic)
                binary2: {
                    pattern: /(0b[01]+)/g,
                    alias: "nu0"
                },
                // Decimal: \d+ (generic)
                integer2: {
                    pattern: /\b(\d+)/g,
                    alias: "nu0"
                },
                // e.g. LOW(), HIGH() ..
                functions: {
                    pattern: this.common.functionCalls,
                    alias: "me0"
                }
            };
        }
    });
    /*
---
description: ATMEL AVR Assembly Language

license: MIT-style

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.avrasm]
...
*/
    EJS.Language.avrasm = new Class({
        Extends: EJS.Language.generic,
        setupLanguage: function() {
            this.patterns = {
                singleLineComments: {
                    pattern: /(;.*)$/gm,
                    alias: "co1"
                },
                // available directives: BYTE,CSEG,DB,DEF,DEVICE,DSEG,DW,ENDMACRO,EQU,ESEG,EXIT,INCLUDE,LIST,LISTMAC,MACRO,NOLIST,ORG,SET
                directives: {
                    pattern: /^\s*?\.(\w+)\s+/gm,
                    alias: "kw1"
                },
                register: {
                    pattern: /\b(r\d{1,2})/gi,
                    alias: "kw1"
                },
                macroparam: {
                    pattern: /(@[0-9])/gi,
                    alias: "kw4"
                },
                label: {
                    pattern: /^\s*?(\w+:)\s*?/gm,
                    alias: "kw3"
                },
                instruction: {
                    pattern: /(^|:)\s*?(\w+)\s+/gm,
                    alias: "kw3"
                },
                strings: {
                    pattern: this.common.strings,
                    alias: "st0"
                },
                // Hexadecimal (two notations): 0x0a, $0a, 0xff, $ff
                hex: {
                    pattern: /(0x[A-F0-9]+|\$[A-F0-9]+)/gi,
                    alias: "nu0"
                },
                // Binary: 0b00001010, 0b11111111
                binary: {
                    pattern: /(0b[01]+)/g,
                    alias: "nu0"
                },
                // Decimal: \d+
                integer: {
                    pattern: /\b(\d+)/g,
                    alias: "nu0"
                },
                // e.g. LOW(), HIGH() ..
                functions: {
                    pattern: this.common.functionCalls,
                    alias: "me0"
                },
                // io register alias e.g. DDRA, PORTB, TIMSK
                ioregister: {
                    pattern: /\b[A-Z]{2,}[0-9]?[0-9]?\b/g,
                    alias: "kw4"
                }
            };
        }
    });
    /*
---
description: CSS (Cascading Style Sheets)

license: MIT-style

authors:
  - Andi Dittrich
  - Jose Prado

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.css]
...
*/
    EnlighterJS.Language.css = new Class({
        Extends: EnlighterJS.Language.generic,
        setupLanguage: function() {
            this.keywords = {};
            this.patterns = {
                comments2: {
                    pattern: /\/\*![\s\S]*?\*\//gm,
                    alias: "co2"
                },
                comments: {
                    pattern: this.common.multiComments,
                    alias: "co1"
                },
                strings: {
                    pattern: this.common.strings,
                    alias: "st0"
                },
                selectors: {
                    pattern: /(?:^|}|\/)\s*([^\\\/{@]+)\s*\{/gi,
                    alias: "kw1"
                },
                directives: {
                    pattern: /(@[a-z]+)\s+/gi,
                    alias: "kw2"
                },
                rules: {
                    pattern: /([\w-]+)\s*:/g,
                    alias: "kw3"
                },
                uri: {
                    pattern: /url\s*\([^\)]*\)/gi,
                    alias: "kw4"
                },
                units: {
                    pattern: /\b(\d+[\.\d+-]?\s*(%|[a-z]{1,3})?)/gi,
                    alias: "nu0"
                },
                hexColors: {
                    pattern: /(#[A-F0-9]{3}([A-F0-9]{3})?)\b/gi,
                    alias: "nu0"
                },
                brackets: {
                    pattern: this.common.brackets,
                    alias: "br0"
                },
                symbols: {
                    pattern: /,|\.|;|:|>/g,
                    alias: "sy0"
                }
            };
        }
    });
    /*
---
description: C/C++ Language

license: MIT-style

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.cpp]
...
*/
    EJS.Language.cpp = new Class({
        Extends: EJS.Language.generic,
        setupLanguage: function() {
            this.keywords = {
                cpp: {
                    csv: "and,and_eq,asm,auto,bitand,bitor,bool,break,case,catch,char,class,compl,const,const_cast,continue,default,delete,do,double,dynamic_cast,else,enum,explicit,export,extern,false,float,for,friend,goto,if,inline,int,long,mutable,namespace,new,not,not_eq,operator,or,or_eq,private,protected,public,register,reinterpret_cast,return,short,signed,sizeof,static,static_cast,struct,switch,template,this,throw,true,try,typedef,typeid,typename,union,unsigned,using,virtual,void,volatile,wchar_t,while,xor,xor_eq",
                    alias: "kw1"
                },
                cppX11: {
                    csv: "alignas,alignof,char16_t,char32_t,constexpr,decltype,noexcept,nullptr,static_assert,thread_local",
                    alias: "kw4"
                },
                directives: {
                    csv: "__LINE__,__FILE__,__DATE__,__TIME__,__cplusplus",
                    alias: "kw2"
                }
            };
            this.patterns = {
                slashComments: {
                    pattern: this.common.slashComments,
                    alias: "co1"
                },
                multiComments: {
                    pattern: this.common.multiComments,
                    alias: "co2"
                },
                chars: {
                    pattern: this.common.singleQuotedString,
                    alias: "st0"
                },
                strings: {
                    pattern: this.common.doubleQuotedString,
                    alias: "st1"
                },
                annotation: {
                    pattern: /@[\W\w_][\w\d_]+/gm,
                    alias: "st1"
                },
                numbers: {
                    pattern: /\b((([0-9]+)?\.)?[0-9_]+([e][-+]?[0-9]+)?|0x[A-F0-9]+|0b[0-1_]+)\b/gim,
                    alias: "nu0"
                },
                properties: {
                    pattern: this.common.properties,
                    alias: "me0"
                },
                brackets: {
                    pattern: this.common.brackets,
                    alias: "br0"
                },
                functionCalls: {
                    pattern: this.common.functionCalls,
                    alias: "de1"
                },
                directives: {
                    pattern: /#.*$/gm,
                    alias: "kw2"
                }
            };
        }
    });
    /*
---
description: C# Language

license: MIT-style

authors:
  - Joshua Maag

requires:
  - Core/1.4.5
  
provides: [EnlighterJS.Language.csharp]
...
*/
    EJS.Language.csharp = new Class({
        Extends: EJS.Language.generic,
        setupLanguage: function() {
            this.keywords = {
                reserved: {
                    csv: "as, base, break, case, catch, checked, continue, default, do, else, event, explicit, false, finally, fixed, for, foreach, goto, if, implicit, internal, is, lock, namespace, new, null, operator, params, private, protected, public, ref, return, sizeof, stackalloc, switch, this, throw, true, try, typeof, unchecked, using, void, while",
                    alias: "kw1"
                },
                keywords: {
                    csv: "abstract, async, class, const, delegate, dynamic, event, extern, in, interface, out, override, readonly, sealed, static, unsafe, virtual, volatile",
                    alias: "kw3"
                },
                primitives: {
                    csv: "bool, byte, char, decimal, double, enum, float, int, long, sbyte, short, struct, uint, ulong, ushort, object, string",
                    alias: "kw2"
                },
                internal: {
                    csv: "System",
                    alias: "kw4"
                }
            };
            this.patterns = {
                slashComments: {
                    pattern: this.common.slashComments,
                    alias: "co1"
                },
                multiComments: {
                    pattern: this.common.multiComments,
                    alias: "co2"
                },
                chars: {
                    pattern: this.common.singleQuotedString,
                    alias: "st0"
                },
                strings: {
                    pattern: this.common.doubleQuotedString,
                    alias: "st1"
                },
                numbers: {
                    pattern: /\b((([0-9]+)?\.)?[0-9_]+([e][-+]?[0-9]+)?|0x[A-F0-9]+|0b[0-1_]+)\b/gim,
                    alias: "nu0"
                },
                brackets: {
                    pattern: this.common.brackets,
                    alias: "br0"
                },
                functionCalls: {
                    pattern: this.common.functionCalls,
                    alias: "me0"
                },
                methodCalls: {
                    pattern: this.common.methodCalls,
                    alias: "me1"
                }
            };
        }
    });
    /*
---
description: DIFF Highlighting

license: MIT-style

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.diff]
...
*/
    EJS.Language.diff = new Class({
        Extends: EJS.Language.generic,
        setupLanguage: function() {
            this.keywords = {};
            this.patterns = {
                comments: {
                    pattern: /^((---|\+\+\+) .*)/gm,
                    alias: "co1"
                },
                stats: {
                    pattern: /^(@@.*@@\s*)/gm,
                    alias: "nu0"
                },
                add: {
                    pattern: /^(\+.*)/gm,
                    alias: "re0"
                },
                del: {
                    pattern: /^(-.*)/gm,
                    alias: "st0"
                }
            };
        }
    });
    /*
---
description: Ini/Conf/Property Highlighting

license: MIT-style

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.ini]
...
*/
    EJS.Language.ini = new Class({
        Extends: EJS.Language.generic,
        setupLanguage: function() {
            this.keywords = {};
            this.patterns = {
                singleLineComments: {
                    pattern: /(;.*)$/gm,
                    alias: "co1"
                },
                section: {
                    pattern: /^\s*?(\[.*\])\s*?$/gm,
                    alias: "kw4"
                },
                directive: {
                    pattern: /^\s*?[a-z0-9\._-]+\s*?=/gim,
                    alias: "kw1"
                },
                "boolean": {
                    pattern: /\b(true|false|on|off|yes|no)\b/gim,
                    alias: "kw2"
                },
                strings: {
                    pattern: this.common.doubleQuotedString,
                    alias: "st1"
                },
                numbers: {
                    pattern: /\b((([0-9]+)?\.)?[0-9_]+([e][-+]?[0-9]+)?|0x[A-F0-9]+|0b[0-1_]+)[a-z]*?\b/gim,
                    alias: "nu0"
                },
                brackets: {
                    pattern: this.common.brackets,
                    alias: "br0"
                }
            };
        }
    });
    /*
---
description: Java language

license: MIT-style

authors:
  - Italo Maia
  - Andi Dittrich

requires:
  - Core/1.4.5
  
provides: [EnlighterJS.Language.java]
...
*/
    EJS.Language.java = new Class({
        Extends: EJS.Language.generic,
        setupLanguage: function(code) {
            this.keywords = {
                reserved: {
                    csv: "continue, for, new, switch, assert, default, goto, synchronized, do, if, this, break, throw, else, throws, case, instanceof, return, transient, catch, try, final, finally, strictfp, volatile, const, native, super, while",
                    alias: "kw1"
                },
                keywords: {
                    csv: "abstract, package, private, implements, protected, public, import, extends, interface, static, void, class",
                    alias: "kw3"
                },
                primitives: {
                    csv: "byte, short, int, long, float, double, boolean, char, String",
                    alias: "kw2"
                },
                internal: {
                    csv: "System",
                    alias: "kw4"
                }
            }, this.patterns = {
                slashComments: {
                    pattern: this.common.slashComments,
                    alias: "co1"
                },
                multiComments: {
                    pattern: this.common.multiComments,
                    alias: "co2"
                },
                chars: {
                    pattern: this.common.singleQuotedString,
                    alias: "st0"
                },
                strings: {
                    pattern: this.common.doubleQuotedString,
                    alias: "st1"
                },
                annotation: {
                    pattern: /@[\W\w_][\w\d_]+/gm,
                    alias: "st1"
                },
                numbers: {
                    pattern: /\b((([0-9]+)?\.)?[0-9_]+([e][-+]?[0-9]+)?|0x[A-F0-9]+|0b[0-1_]+)\b/gim,
                    alias: "nu0"
                },
                properties: {
                    pattern: this.common.properties,
                    alias: "me0"
                },
                brackets: {
                    pattern: this.common.brackets,
                    alias: "br0"
                },
                functionCalls: {
                    pattern: this.common.functionCalls,
                    alias: "kw1"
                }
            };
        }
    });
    /*
---
description: JavaScript language

license: MIT-style

authors:
  - Jose Prado

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.javascript]
...
*/
    EJS.Language.javascript = new Class({
        Extends: EJS.Language.generic,
        setupLanguage: function() {
            this.keywords = {
                commonKeywords: {
                    csv: "as, break, case, catch, continue, delete, do, else, eval, finally, for, if, in, is, instanceof, return, switch, this, throw, try, typeof, void, while, write, with",
                    alias: "kw1"
                },
                langKeywords: {
                    csv: "class, const, default, debugger, export, extends, false, function, import, namespace, new, null, package, private, protected, public, super, true, use, var",
                    alias: "kw2"
                },
                windowKeywords: {
                    csv: "alert, confirm, open, print, prompt",
                    alias: "kw3"
                }
            };
            this.patterns = {
                slashComments: {
                    pattern: this.common.slashComments,
                    alias: "co1"
                },
                multiComments: {
                    pattern: this.common.multiComments,
                    alias: "co2"
                },
                strings: {
                    pattern: this.common.strings,
                    alias: "st0"
                },
                methodCalls: {
                    pattern: this.common.properties,
                    alias: "me0"
                },
                brackets: {
                    pattern: this.common.brackets,
                    alias: "br0"
                },
                numbers: {
                    pattern: /\b((([0-9]+)?\.)?[0-9_]+([e][-+]?[0-9]+)?|0x[A-F0-9]+)\b/gi,
                    alias: "nu0"
                },
                regex: {
                    pattern: this.delimToRegExp("/", "\\", "/", "g", "[gimy]*"),
                    alias: "re0"
                },
                symbols: {
                    pattern: /\+|-|\*|\/|%|!|@|&|\||\^|\<|\>|=|,|\.|;|\?|:/g,
                    alias: "sy0"
                }
            };
            this.delimiters = {
                start: this.strictRegExp('<script type="text/javascript">', '<script language="javascript">'),
                end: this.strictRegExp("</script>")
            };
        }
    });
    /*
---
description: JSON Object Highlighting

license: MIT-style

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.json]
...
*/
    EJS.Language.json = new Class({
        Extends: EJS.Language.generic,
        setupLanguage: function() {
            this.keywords = {
                values: {
                    csv: "true, false, null",
                    alias: "kw2"
                }
            };
            this.patterns = {
                keys: {
                    pattern: /("[^"\\\r\n]+?")\s*?:/gi,
                    alias: "kw1"
                },
                strings: {
                    pattern: this.common.strings,
                    alias: "st0"
                },
                brackets: {
                    pattern: this.common.brackets,
                    alias: "br0"
                },
                numbers: {
                    pattern: /\b((([0-9]+)?\.)?[0-9_]+([e][-+]?[0-9]+)?|0x[A-F0-9]+)\b/gi,
                    alias: "nu0"
                },
                symbols: {
                    pattern: /,|:/g,
                    alias: "sy0"
                }
            };
            this.delimiters = {};
        }
    });
    /*
---
description: Java language

license: MIT-style

authors:
  - Italo Maia
  - Andi Dittrich

requires:
  - Core/1.4.5
  
provides: [EnlighterJS.Language.kotlin]
...
*/
    EJS.Language.kotlin = new Class({
        Extends: EJS.Language.generic,
        setupLanguage: function(code) {
            this.keywords = {
                reserved: {
                    csv: "package, as, typealias, class, this, super, val, var, fun, for, null, true, false, is, in, throw, return, break, continue, object, if, try, finally, else, while, do, when, interface, typeof",
                    alias: "kw1"
                },
                keywords: {
                    csv: "import, typealias, constructor, by, where, to, init, companion, abstract, final, enum, open, annotation, sealed, data, lateinit, override, private, protected, public, internal, vararg, noinline, crossinline, reified, const, suspend, tailrec, operator, infix, inline, external",
                    alias: "kw2"
                }
            }, this.patterns = {
                slashComments: {
                    pattern: this.common.slashComments,
                    alias: "co1"
                },
                multiComments: {
                    pattern: this.common.multiComments,
                    alias: "co2"
                },
                chars: {
                    pattern: this.common.singleQuotedString,
                    alias: "st0"
                },
                multiLineStrings: {
                    pattern: /"""[\s\S]*"""/gm,
                    alias: "st1"
                },
                strings: {
                    pattern: this.common.doubleQuotedString,
                    alias: "st1"
                },
                annotation: {
                    pattern: /@[\W\w_][\w\d_]+/gm,
                    alias: "st1"
                },
                numbers: {
                    pattern: /\b((([0-9]+)?\.)?[0-9_]+([e][-+]?[0-9]+)?|0x[A-F0-9]+|0b[0-1_]+)\b/gim,
                    alias: "nu0"
                },
                properties: {
                    pattern: this.common.properties,
                    alias: "me0"
                },
                brackets: {
                    pattern: this.common.brackets,
                    alias: "br0"
                },
                functionCalls: {
                    pattern: this.common.functionCalls,
                    alias: "kw4"
                }
            };
        }
    });
    /*
---
description: LUA http://www.lua.org/

license: MIT-style

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.lua]
...
*/
    EJS.Language.lua = new Class({
        Extends: EJS.Language.generic,
        setupLanguage: function() {
            this.keywords = {
                reserved: {
                    csv: "and,break,do,else,elseif,end,for,function,if,in,local,or,repeat,return,not,then,until,while",
                    alias: "kw1"
                },
                values: {
                    csv: "false,nil,true",
                    alias: "kw2"
                }
            };
            this.patterns = {
                multiLineComments: {
                    pattern: /--\[\[[\s\S]*?]]/g,
                    alias: "co1"
                },
                singleLineComments: {
                    pattern: /(--.*)$/gm,
                    alias: "co1"
                },
                specialComments: {
                    pattern: /---\[\[[\s\S]*?(]])/g,
                    alias: "co1"
                },
                // single and double quoted strings
                strings: {
                    pattern: this.common.strings,
                    alias: "st0"
                },
                // multi line strings
                mlstring: {
                    pattern: /(\[(=*)\[[\S\s]*?]\2])/g,
                    alias: "st1"
                },
                brackets: {
                    pattern: this.common.brackets,
                    alias: "br0"
                },
                numbers: {
                    pattern: /\b((([0-9]+)?\.)?[0-9_]+([e][-+]?[0-9]+)?)/gim,
                    alias: "nu0"
                },
                functionCalls: {
                    pattern: this.common.functionCalls,
                    alias: "me0"
                },
                methodCalls: {
                    pattern: this.common.methodCalls,
                    alias: "me1"
                }
            };
        }
    });
    /*
---
description: Octave/Matlab Language

license: MIT-style

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.matlab]
...
*/
    EJS.Language.matlab = new Class({
        Extends: EJS.Language.generic,
        setupLanguage: function() {
            this.keywords = {
                // keywords: https://www.gnu.org/software/octave/doc/interpreter/Keywords.html
                kw: {
                    csv: "__FILE__,__LINE__,break,case,catch,classdef,continue,do,else,elseif,end,end_try_catch,end_unwind_protect,endclassdef,endenumeration,endevents,endfor,endfunction,endif,endmethods,endparfor,endproperties,endswitch,endwhile,enumeration,events,for,function,global,if,methods,otherwise,parfor,persistent,properties,return,static,switch,try,until,unwind_protect,unwind_protect_cleanup,while",
                    alias: "kw1",
                    mod: "gi"
                },
                "const": {
                    csv: "true, false",
                    alias: "kw3",
                    mod: "gi"
                }
            };
            this.patterns = {
                lineComments: {
                    pattern: /%.*$/gm,
                    alias: "co1"
                },
                blockComments: {
                    pattern: /%%.*$/gm,
                    alias: "co2"
                },
                fn: {
                    pattern: this.common.functionCalls,
                    alias: "me0"
                },
                fn2: {
                    pattern: /\b([\w]+)\s*;/gm,
                    alias: "me0"
                },
                me: {
                    pattern: this.common.methodCalls,
                    alias: "me1"
                },
                brackets: {
                    pattern: this.common.brackets,
                    alias: "br0"
                },
                strings: {
                    pattern: this.common.singleQuotedString,
                    alias: "st0"
                },
                numbers: {
                    pattern: this.common.numbers,
                    alias: "nu0"
                },
                fhandle: {
                    pattern: /(@[\w]+)\s*/gm,
                    alias: "kw3"
                },
                symbols: {
                    pattern: /\+|-|\*|\/|%|!|@|&|\||\^|<|>|=|,|\.|;|\?|:|\[|]/g,
                    alias: "sy0"
                },
                classdef: {
                    pattern: /classdef\s+(\w+(?:\s*<\s*\w+)?)\s*$/gim,
                    alias: "kw4"
                }
            };
        }
    });
    /*
---
description: Markdown language

license: MIT-style

authors:
  - Jose Prado
  - Andi Dittrich

requires:
  - Core/1.4.5
  
provides: [EnlighterJS.Language.markdown]
...
*/
    EJS.Language.markdown = new Class({
        Extends: EJS.Language.generic,
        setupLanguage: function(code) {
            this.patterns = {
                header1: {
                    pattern: /^(.+)\n=+\n/gim,
                    alias: "st1"
                },
                header2: {
                    pattern: /^(.+)\n-+\n/gim,
                    alias: "st2"
                },
                header3: {
                    pattern: /[#]{1,6}.*/gim,
                    alias: "st0"
                },
                ul: {
                    pattern: /^\*\s*.*/gim,
                    alias: "kw1"
                },
                ol: {
                    pattern: /^\d+\..*/gim,
                    alias: "kw1"
                },
                italics: {
                    pattern: /\*.*?\*/g,
                    alias: "kw3"
                },
                bold: {
                    pattern: /\*\*.*?\*\*/g,
                    alias: "kw3"
                },
                url: {
                    pattern: /\[[^\]]*\]\([^\)]*\)/g,
                    alias: "kw4"
                }
            };
        }
    });
    /*
---
description: MsDos/Batch Scripting

license: MIT-style

authors:
  - Eric Derewonko

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.msdos]
...
*/
    EJS.Language.msdos = new Class({
        Extends: EJS.Language.generic,
        setupLanguage: function() {
            this.keywords = {
                keywords: {
                    csv: "if, else, goto, for, in, do, call, exit, not, exist, defined, shift, cd, dir, echo, setlocal, endlocal, pause, copy, append, assoc, at, attrib, break, cacls, cd, chcp, chdir, chkdsk, chkntfs, cls, color, date, dir, erase, fs, help, keyb, label, md, mkdir, mode, more, move, path, pause, print, popd, pushd, promt, rd, recover, rem, rename, replace, restore, rmdir, sort, start, subst, time, title, tree, type, ver, verify, vol, ren, del",
                    alias: "kw1",
                    mod: "gi"
                },
                reserved: {
                    csv: "errorlevel, prn, nul, lpt3, lpt2, lpt1, con, com4, com3, com2, com1, aux",
                    alias: "kw2",
                    mod: "gi"
                },
                system: {
                    csv: "cmd, comp, compact, convert, diskcomp, diskcopy, doskey, find, findstr, format, ftype, graftabl, ping, net, ipconfig, taskkill, xcopy",
                    alias: "kw3",
                    mod: "gi"
                },
                operators: {
                    csv: "equ, neq, lss, leq, gtr, geq, ==",
                    alias: "sy0",
                    mod: "gi"
                }
            };
            this.patterns = {
                comments: {
                    pattern: /^((\s*@?rem\b|::).*)$/gm,
                    alias: "co1"
                },
                numbers: {
                    pattern: this.common.numbers,
                    alias: "nu0"
                },
                setVar: {
                    pattern: /(?:^|\s+)(@?set\s+(?:\/[ap]\s+)?\w+)=/gim,
                    alias: "kw2"
                },
                variables: {
                    pattern: /(%[\d\*]\b|%\w+%|%%\w\b|%~[dpnx]+\d\b|%\w+:\w+=\w+%|%\w+:~(?:\d+,)?\d+%)/gim,
                    alias: "me0"
                },
                functions: {
                    pattern: /(?:^|\s+):\w+\s*?/gm,
                    alias: "me1"
                }
            };
        }
    });
    /*
---
description: Nullsoft Scriptable Install System (NSIS)

license: MIT-style

authors:
  - Jan T. Sott
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.nsis]
...
*/
    EJS.Language.nsis = new Class({
        Extends: EJS.Language.generic,
        setupLanguage: function() {
            /** Set of keywords in CSV form. Add multiple keyword hashes for differentiate keyword sets. */
            this.keywords = {
                commands: {
                    csv: "Function, PageEx, Section, SectionGroup, SubSection, Abort, AddBrandingImage, AddSize, AllowRootDirInstall, AllowSkipFiles, AutoCloseWindow, BGFont, BGGradient, BrandingText, BringToFront, Call, CallInstDLL, Caption, ChangeUI, CheckBitmap, ClearErrors, CompletedText, ComponentText, CopyFiles, CRCCheck, CreateDirectory, CreateFont, CreateShortCut, Delete, DeleteINISec, DeleteINIStr, DeleteRegKey, DeleteRegValue, DetailPrint, DetailsButtonText, DirText, DirVar, DirVerify, EnableWindow, EnumRegKey, EnumRegValue, Exch, Exec, ExecShell, ExecWait, ExpandEnvStrings, File, FileBufSize, FileClose, FileErrorText, FileOpen, FileRead, FileReadByte, FileReadUTF16LE, FileReadWord, FileSeek, FileWrite, FileWriteByte, FileWriteUTF16LE, FileWriteWord, FindClose, FindFirst, FindNext, FindWindow, FlushINI, FunctionEnd, GetCurInstType, GetCurrentAddress, GetDlgItem, GetDLLVersion, GetDLLVersionLocal, GetErrorLevel, GetFileTime, GetFileTimeLocal, GetFullPathName, GetFunctionAddress, GetInstDirError, GetLabelAddress, GetTempFileName, Goto, HideWindow, Icon, IfAbort, IfErrors, IfFileExists, IfRebootFlag, IfSilent, InitPluginsDir, InstallButtonText, InstallColors, InstallDir, InstallDirRegKey, InstProgressFlags, InstType, InstTypeGetText, InstTypeSetText, IntCmp, IntCmpU, IntFmt, IntOp, IsWindow, LangString, LicenseBkColor, LicenseData, LicenseForceSelection, LicenseLangString, LicenseText, LoadLanguageFile, LockWindow, LogSet, LogText, ManifestDPIAware, ManifestSupportedOS, MessageBox, MiscButtonText, Name, Nop, OutFile, Page, PageCallbacks, PageExEnd, Pop, Push, Quit, ReadEnvStr, ReadINIStr, ReadRegDWORD, ReadRegStr, Reboot, RegDLL, Rename, RequestExecutionLevel, ReserveFile, Return, RMDir, SearchPath, SectionEnd, SectionGetFlags, SectionGetInstTypes, SectionGetSize, SectionGetText, SectionGroupEnd, SectionIn, SectionSetFlags, SectionSetInstTypes, SectionSetSize, SectionSetText, SendMessage, SetAutoClose, SetBrandingImage, SetCompress, SetCompressor, SetCompressorDictSize, SetCtlColors, SetCurInstType, SetDatablockOptimize, SetDateSave, SetDetailsPrint, SetDetailsView, SetErrorLevel, SetErrors, SetFileAttributes, SetFont, SetOutPath, SetOverwrite, SetPluginUnload, SetRebootFlag, SetRegView, SetShellVarContext, SetSilent, ShowInstDetails, ShowUninstDetails, ShowWindow, SilentInstall, SilentUnInstall, Sleep, SpaceTexts, StrCmp, StrCmpS, StrCpy, StrLen, SubCaption, SubSectionEnd, Unicode, UninstallButtonText, UninstallCaption, UninstallIcon, UninstallSubCaption, UninstallText, UninstPage, UnRegDLL, Var, VIAddVersionKey, VIFileVersion, VIProductVersion, WindowIcon, WriteINIStr, WriteRegBin, WriteRegDWORD, WriteRegExpandStr, WriteRegStr, WriteUninstaller, XPStyle",
                    alias: "kw1"
                },
                states: {
                    csv: "admin, all, auto, both, colored, false, force, hide, highest, lastused, leave, listonly, none, normal, notset, off, on, open, print, show, silent, silentlog, smooth, textonly, true, user",
                    alias: "kw2"
                },
                statics: {
                    csv: "ARCHIVE, FILE_ATTRIBUTE_ARCHIVE, FILE_ATTRIBUTE_NORMAL, FILE_ATTRIBUTE_OFFLINE, FILE_ATTRIBUTE_READONLY, FILE_ATTRIBUTE_SYSTEM, FILE_ATTRIBUTE_TEMPORARY, HKCR, HKCU, HKDD, HKEY_CLASSES_ROOT, HKEY_CURRENT_CONFIG, HKEY_CURRENT_USER, HKEY_DYN_DATA, HKEY_LOCAL_MACHINE, HKEY_PERFORMANCE_DATA, HKEY_USERS, HKLM, HKPD, HKU, IDABORT, IDCANCEL, IDIGNORE, IDNO, IDOK, IDRETRY, IDYES, MB_ABORTRETRYIGNORE, MB_DEFBUTTON1, MB_DEFBUTTON2, MB_DEFBUTTON3, MB_DEFBUTTON4, MB_ICONEXCLAMATION, MB_ICONINFORMATION, MB_ICONQUESTION, MB_ICONSTOP, MB_OK, MB_OKCANCEL, MB_RETRYCANCEL, MB_RIGHT, MB_RTLREADING, MB_SETFOREGROUND, MB_TOPMOST, MB_USERICON, MB_YESNO, NORMAL, OFFLINE, READONLY, SHCTX, SHELL_CONTEXT, SYSTEM, TEMPORARY",
                    alias: "kw3"
                }
            };
            /** Set of RegEx patterns to match */
            this.patterns = {
                brackets: {
                    pattern: this.common.brackets,
                    alias: "br0"
                },
                commentMultiline: {
                    pattern: this.common.multiComments,
                    alias: "co2"
                },
                commentPound: {
                    pattern: this.common.poundComments,
                    alias: "co1"
                },
                commentSemicolon: {
                    pattern: /;.*$/gm,
                    alias: "co1"
                },
                compilerFlags: {
                    pattern: /(!(addincludedir|addplugindir|appendfile|cd|define|delfile|echo|else|endif|error|execute|finalize|getdllversionsystem|ifdef|ifmacrodef|ifmacrondef|ifndef|if|include|insertmacro|macroend|macro|makensis|packhdr|searchparse|searchreplace|tempfile|undef|verbose|warning))/g,
                    alias: "kw2"
                },
                defines: {
                    pattern: /[\$]\{{1,2}[0-9a-zA-Z_][\w]*[\}]/gim,
                    alias: "kw4"
                },
                jumps: {
                    pattern: /([(\+|\-)]([0-9]+))/g,
                    alias: "nu0"
                },
                langStrings: {
                    pattern: /[\$]\({1,2}[0-9a-zA-Z_][\w]*[\)]/gim,
                    alias: "kw3"
                },
                escapeChars: {
                    pattern: /([\$]\\(n|r|t|[\$]))/g,
                    alias: "kw4"
                },
                numbers: {
                    pattern: /\b((([0-9]+)?\.)?[0-9_]+([e][\-+]?[0-9]+)?|0x[A-F0-9]+)\b/gi,
                    alias: "nu0"
                },
                pluginCommands: {
                    pattern: /(([0-9a-zA-Z_]+)[:{2}]([0-9a-zA-Z_]+))/g,
                    alias: "kw2"
                },
                strings: {
                    pattern: this.common.strings,
                    alias: "st0"
                },
                variables: {
                    pattern: /[\$]{1,2}[0-9a-zA-Z_][\w]*/gim,
                    alias: "kw4"
                }
            };
        }
    });
    /*
---
description: PHP language

license: MIT-style

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.php]
...
*/
    EnlighterJS.Language.php = new Class({
        Extends: EnlighterJS.Language.generic,
        tokenizerType: "Standard",
        setupLanguage: function() {
            this.keywords = {
                // http://php.net/manual/en/reserved.keywords.php
                keywords: {
                    csv: "__halt_compiler,abstract,and,as,break,callable,case,catch,class,clone,const,continue,declare,default,do,else,elseif,enddeclare,endfor,endforeach,endif,endswitch,endwhile,extends,final,finally,function,global,goto,implements,instanceof,insteadof,interface,namespace,new,or,private,protected,public,static,throw,trait,try,use,var,xor,yield",
                    alias: "kw1"
                },
                // http://php.net/manual/en/reserved.other-reserved-words.php
                reserved: {
                    csv: "int,float,bool,string,true,false,null,resource,object,mixed,numeric",
                    alias: "kw4",
                    mod: "gi"
                }
            };
            this.patterns = {
                keywordsFn: {
                    pattern: /(require_once|include_once|array|die|exit|echo|print|empty|eval|include|isset|list|require|unset|if|switch|while|foreach|for|return)(?:\s*\(|\s+)?/gi,
                    alias: "kw1"
                },
                inherit: {
                    pattern: /(self|parent|\$this)/gi,
                    alias: "kw4"
                },
                slashComments: {
                    pattern: this.common.slashComments,
                    alias: "co1"
                },
                multiComments: {
                    pattern: this.common.multiComments,
                    alias: "co2"
                },
                dqStrings: {
                    pattern: this.common.multiLineDoubleQuotedStrings,
                    alias: "st0"
                },
                sqStrings: {
                    pattern: this.common.multiLineSingleQuotedStrings,
                    alias: "st1"
                },
                heredocs: {
                    pattern: /(<<<\s*?('?)([A-Z0-9]+)\2[^\n]*?\n[\s\S]*?\n\3(?![A-Z0-9\s]))/gim,
                    alias: "st1"
                },
                numbers: {
                    pattern: /\b((([0-9]+)?\.)?[0-9_]+([e][\-+]?[0-9]+)?|0x[A-F0-9]+)\b/gi,
                    alias: "nu0"
                },
                variables: {
                    pattern: /\$[A-Z_][\w]*/gim,
                    alias: "kw3"
                },
                functions: {
                    pattern: this.common.functionCalls,
                    alias: "me0"
                },
                methods: {
                    pattern: /(?:->|::)([\w]+)/gim,
                    alias: "me1"
                },
                constants: {
                    pattern: /\b[A-Z][A-Z0-9_]+[A-Z]\b/g,
                    alias: "kw4"
                },
                lconstants: {
                    pattern: /\b__[A-Z][A-Z0-9_]+__\b/g,
                    alias: "re0"
                },
                brackets: {
                    pattern: this.common.brackets,
                    alias: "br0"
                },
                symbols: {
                    pattern: /!|@|&|<|>|=|=>|-|\+/g,
                    alias: "sy0"
                }
            };
            // Delimiters
            this.delimiters = {
                start: this.strictRegExp("<?php"),
                end: this.strictRegExp("?>")
            };
        }
    });
    /*
---
description: Python language

license: MIT-style

authors:
  - Italo Maia

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.python]
...
*/
    EJS.Language.python = new Class({
        Extends: EJS.Language.generic,
        setupLanguage: function() {
            this.keywords = {
                reserved: {
                    csv: "and, del, from, not, while, as, elif, global, or, with, assert, else, if, pass, yield, break, except, import, print, class, exec, in, raise, continue, finally, is, return, def, for, lambda, try",
                    alias: "kw1"
                },
                functions: {
                    csv: "__import__, abs, all, any, apply, bin, callable, chr, cmp, coerce, compile, delattr, dir, divmod, eval, execfile, filter, format, getattr, globals, hasattr, hash, hex, id, input, intern, isinstance, issubclass, iter, len, locals, map, max, min, next, oct, open, ord, pow, print, range, raw_input, reduce, reload, repr, round, setattr, sorted, sum, unichr, vars, zip",
                    alias: "kw2"
                },
                classes: {
                    csv: "ArithmeticError, AssertionError, AttributeError, BaseException, BufferError, BytesWarning, DeprecationWarning, EOFError, EnvironmentError, Exception, FloatingPointError, FutureWarning, GeneratorExit, IOError, ImportError, ImportWarning, IndentationError, IndexError, KeyError, KeyboardInterrupt, LookupError, MemoryError, NameError, NotImplementedError, OSError, OverflowError, PendingDeprecationWarning, ReferenceError, RuntimeError, RuntimeWarning, StandardError, StopIteration, SyntaxError, SyntaxWarning, SystemError, SystemExit, TabError, TypeError, UnboundLocalError, UnicodeDecodeError, UnicodeEncodeError, UnicodeError, UnicodeTranslateError, UnicodeWarning, UserWarning, ValueError, Warning, ZeroDivisionError, basestring, bool, buffer, bytearray, bytes, classmethod, complex, dict, enumerate, file, float, frozenset, int, list, long, object, property, reversed, set, slice, staticmethod, str, super, tuple, type, unicode, xrange",
                    alias: "kw2"
                }
            }, this.patterns = {
                poundComments: {
                    pattern: this.common.poundComments,
                    alias: "co1"
                },
                /*
            'multiComments': {
                pattern: /^=begin[\s\S]*?^=end/gm,
                alias: 'co2'
            },*/
                multiStringComments1: {
                    pattern: /"""[\s\S]*?"""/gm,
                    alias: "co2"
                },
                multiStringComments2: {
                    pattern: /'''[\s\S]*?'''/gm,
                    alias: "co2"
                },
                strings: {
                    pattern: this.common.strings,
                    alias: "st0"
                },
                tickStrings: {
                    pattern: this.delimToRegExp("`", "\\", "`", "gm"),
                    alias: "st0"
                },
                delimString: {
                    pattern: /(%[q|Q|x]?(\W)[^\2\\\n]*(?:\\.[^\2\\]*)*(\2|\)|\]|\}))/gm,
                    alias: "st1"
                },
                heredoc: {
                    pattern: /(<<(\'?)([A-Z0-9]+)\2[^\n]*?\n[\s\S]*\n\3(?![\w]))/gim,
                    alias: "st2"
                },
                variables: {
                    pattern: /(@[A-Za-z_][\w]*|@@[A-Za-z_][\w]*|\$(?:\-[\S]|[\w]+)|\b[A-Z][\w]*)/g,
                    alias: "kw3"
                },
                rubySymbols: {
                    pattern: /[^:](:[\w]+)/g,
                    alias: "kw4"
                },
                constants: {
                    pattern: /\b[A-Z][\w]*/g,
                    alias: "kw3"
                },
                numbers: {
                    pattern: /\b((([0-9]+)?\.)?[0-9_]+([e][-+]?[0-9]+)?|0x[A-F0-9]+|0b[0-1_]+)\b/gim,
                    alias: "nu0"
                },
                properties: {
                    pattern: this.common.properties,
                    alias: "me0"
                },
                brackets: {
                    pattern: this.common.brackets,
                    alias: "br0"
                },
                delimRegex: {
                    pattern: /(%r(\W)[^\2\\\n]*(?:\\.[^\2\\\n]*?)*(\2|\)|\]|\})[iomx]*)/gm,
                    alias: "re0"
                },
                literalRegex: {
                    pattern: this.delimToRegExp("/", "\\", "/", "g", "[iomx]*"),
                    alias: "re0"
                }
            };
        }
    });
    /*
---
description: Cython language

license: MIT-style

authors:
  - Andi Dittrich
  - Devyn Collier Johnson

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.cython]
...
*/
    EJS.Language.cython = new Class({
        Extends: EJS.Language.python,
        setupLanguage: function() {
            // run origin language setup
            this.parent();
            // append cython extension keywords
            this.keywords.reserved.csv += ", __all__, include, cimport, pyximport, cythonize, cdef, cpdef, ctypedef, property, IF, ELIF, ELSE, DEF";
            this.keywords.functions.csv += ", __dealloc__, __get__, __init__, fopen";
            this.keywords.classes.csv += ", PyErr_Fetch, PyErr_Occurred, PyErr_WarnEx, char, double, extern, namespace, public, struct, void, union, unsigned, enum";
        }
    });
    /*
---
description: RAW Code

license: MIT-style

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.raw]
...
*/
    EJS.Language.raw = new Class({
        Extends: EJS.Language.generic,
        initialize: function(code) {
            this.code = code;
        },
        getTokens: function() {
            // create token object
            var token = function(text, alias, index) {
                return {
                    text: text,
                    alias: alias,
                    index: index,
                    length: text.length,
                    end: text.length + index
                };
            };
            // raw means "no-highlight" - return a single, unknown token with the given sourcecode
            return [ token(this.code, "", 0) ];
        }
    });
    /*
---
description: Ruby language

license: MIT-style

authors:
  - Jose Prado

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.ruby]
...
*/
    EJS.Language.ruby = new Class({
        Extends: EJS.Language.generic,
        setupLanguage: function() {
            this.keywords = {
                reserved: {
                    csv: "__FILE__, __LINE__, alias, and, BEGIN, begin, break, case, class, def, defined, do, else, elsif, END, end, ensure, false, for, if, in, module, next, nil, not, or, redo, rescue, retry, return, self, super, then, true, undef, unless, until, when, while, yield",
                    alias: "kw1"
                },
                functions: {
                    csv: "abort, at_exit, autoload, binding, block_given, callcc, caller, catch, chomp, chop, eval, exec, exit, exit!, fail, fork, format, gets, global_variables, gsub, lambda, proc, load, local_variables, loop, open, p, print, proc, putc, puts, raise, fail, rand, readline, readlines, require, scan, select, set_trace_func, sleep, split, sprintf, format, srand, syscall, system, sub, test, throw, trace_var, trap, untrace_var",
                    alias: "kw2"
                },
                classes: {
                    csv: "Abbrev, ArgumentError, Array, Base64, Benchmark, Benchmark::Tms, Bignum, Binding, CGI, Cookie, HtmlExtension, QueryExtension, Session, FileStore, MemoryStore, Class, Comparable, Complex, ConditionVariable, Continuation, Data, Date, DateTime, Dir, EOFError, Enumerable, Errno, Exception, FalseClass, File, Constants, Stat, FileTest, FileUtils, CopyContext_, DryRun, NoWrite, Verbose, Find, Fixnum, Float, FloatDomainError, GC, Generator, Hash, IO, IOError, Iconv, Failure, IllegalSequence, InvalidCharacter, OutOfRange, IndexError, Integer, Interrupt, Kernel, LoadError, LocalJumpError, Logger, Application, LogDevice, Severity, ShiftingError, Marshal, MatchData, Math, Matrix, Method, Module, Mutex, NameError, NilClass, NoMemoryError, NoMethodError, NotImplementedError, Numeric, Object, ObjectSpace, Observable, Pathname, Precision, Proc, Process, GID, Status, Sys, UID, Queue, Range, RangeError, Regexp, RegexpError, RuntimeError, ScriptError, SecurityError, Set, Shellwords, Signal, SignalException, Singleton, SingletonClassMethods, SizedQueue, SortedSet, StandardError, String, StringScanner, StringScanner::Error, Struct, Symbol, SyncEnumerator, SyntaxError, SystemCallError, SystemExit, SystemStackError, Tempfile, Test, Unit, Thread, ThreadError, ThreadGroup, ThreadsWait, Time, TrueClass, TypeError, UnboundMethod, Vector, YAML, ZeroDivisionError, Zlib, BufError, DataError, Deflate, Error, GzipFile, CRCError, Error, LengthError, NoFooter, GzipReader, GzipWriter, Inflate, MemError, NeedDict, StreamEnd, StreamError, VersionError, ZStream, fatal",
                    alias: "kw2"
                }
            }, this.patterns = {
                poundComments: {
                    pattern: this.common.poundComments,
                    alias: "co1"
                },
                multiComments: {
                    pattern: /^=begin[\s\S]*?^=end/gm,
                    alias: "co2"
                },
                strings: {
                    pattern: this.common.strings,
                    alias: "st0"
                },
                tickStrings: {
                    pattern: this.delimToRegExp("`", "\\", "`", "gm"),
                    alias: "st0"
                },
                delimString: {
                    pattern: /(%[q|Q|x]?(\W)[^\2\\\n]*(?:\\.[^\2\\]*)*(\2|\)|\]|\}))/gm,
                    alias: "st1"
                },
                heredoc: {
                    pattern: /(<<(\'?)([A-Z0-9]+)\2[^\n]*?\n[\s\S]*\n\3(?![\w]))/gim,
                    alias: "st2"
                },
                //'instanceVar': { pattern: /@[A-Z_][\w]*/gi,       alias: 'kw3' },
                //'classVar':    { pattern: /@@[A-Z_][\w]*/gi,      alias: 'kw3' },
                //'globalVar':   { pattern: /\$(?:\-[\S]|[\w]+)/gi, alias: 'kw3' },
                variables: {
                    pattern: /(@[A-Za-z_][\w]*|@@[A-Za-z_][\w]*|\$(?:\-[\S]|[\w]+)|\b[A-Z][\w]*)/g,
                    alias: "kw3"
                },
                rubySymbols: {
                    pattern: /[^:](:[\w]+)/g,
                    alias: "kw4"
                },
                constants: {
                    pattern: /\b[A-Z][\w]*/g,
                    alias: "kw3"
                },
                numbers: {
                    pattern: /\b((([0-9]+)?\.)?[0-9_]+([e][-+]?[0-9]+)?|0x[A-F0-9]+|0b[0-1_]+)\b/gim,
                    alias: "nu0"
                },
                properties: {
                    pattern: this.common.properties,
                    alias: "me0"
                },
                brackets: {
                    pattern: this.common.brackets,
                    alias: "br0"
                },
                delimRegex: {
                    pattern: /(%r(\W)[^\2\\\n]*(?:\\.[^\2\\\n]*?)*(\2|\)|\]|\})[iomx]*)/gm,
                    alias: "re0"
                },
                literalRegex: {
                    pattern: this.delimToRegExp("/", "\\", "/", "g", "[iomx]*"),
                    alias: "re0"
                }
            };
        }
    });
    /*
---
description: Rust Language https://doc.rust-lang.org

license: MIT-style

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.rust]
...
*/
    EJS.Language.rust = new Class({
        Extends: EJS.Language.generic,
        setupLanguage: function() {
            this.keywords = {
                // keywords: https://doc.rust-lang.org/syntax/parse/token/keywords/enum.Keyword.html
                kw: {
                    csv: "As,Break,Crate,Else,Enum,Extern,False,Fn,For,If,Impl,In,Let,Loop,Match,Mod,Move,Mut,Pub,Ref,Return,Static,SelfValue,SelfType,Struct,Super,True,Trait,Type,Unsafe,Use,Virtual,While,Continue,Box,Const,Where,Proc,Alignof,Become,Offsetof,Priv,Pure,Sizeof,Typeof,Unsized,Yield,Do,Abstract,Final,Override,Macro",
                    alias: "kw1",
                    mod: "gi"
                }
            };
            this.patterns = {
                slashComments: {
                    pattern: this.common.slashComments,
                    alias: "co1"
                },
                multiComments: {
                    pattern: this.common.multiComments,
                    alias: "co1"
                },
                slashDocComments: {
                    pattern: /(?:^|[^\\])\/\/[\/!].*$/gm,
                    alias: "co2"
                },
                multiDocComments: {
                    pattern: /\/\*[\*!][\s\S]*?\*\//gm,
                    alias: "co2"
                },
                chars: {
                    pattern: /'.'/gm,
                    alias: "st0"
                },
                rawStrings: {
                    pattern: /r((#+)".*?"\2)/gm,
                    alias: "st1"
                },
                strings: {
                    pattern: /("(?:\\.|\\\s*\n|\\s*\r\n|[^\\"])*")/g,
                    alias: "st1"
                },
                directives: {
                    pattern: /^\s*#.*$/gm,
                    alias: "sy0"
                },
                brackets: {
                    pattern: this.common.brackets,
                    alias: "br0"
                },
                // https://doc.rust-lang.org/stable/reference.html#integer-literals
                intLiteral: {
                    pattern: /\b([0-9_]+|0o[0-9_]+|0x[A-F0-9_]+|0b[0-1_]+)(u8|i8|u16|i16|u32|i32|u64|i64|isize|usize)?\b/gim,
                    alias: "nu0"
                },
                // https://doc.rust-lang.org/stable/reference.html#floating-point-literals
                floatLiteral: {
                    pattern: /\b([0-9_]+\.?[0-9_]+?(e\+[0-9_]+)?)(?:f32|f64)?\b/gim,
                    alias: "nu0"
                },
                // method definitions
                methodDefs: {
                    pattern: /fn\s+([\w]+)\s*(<\w+\s*>)?\(/gm,
                    alias: "kw2"
                },
                // method/function calls
                funCalls: {
                    pattern: /\b\.?([\w]+)\s*(\(|::)/gm,
                    alias: "kw3"
                },
                // macro calls
                macro: {
                    pattern: /\b([\w]+)!/gm,
                    alias: "kw4"
                },
                symbols: {
                    pattern: /\+|-|\*|\/|%|!|@|&|\||\^|<|<<|>>|>|=|,|\.|;|\?|:|self/g,
                    alias: "sy0"
                }
            };
        }
    });
    /*
---
description: Shell/Bash Scripting

license: MIT-style

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.shell]
...
*/
    EJS.Language.shell = new Class({
        Extends: EJS.Language.generic,
        setupLanguage: function() {
            this.keywords = {
                keywords: {
                    csv: "if, fi, then, elif, else, for, do, done, until, while, break, continue, case, esac, return, function, in, eq, ne, gt, lt, ge, le",
                    alias: "kw1"
                }
            };
            this.patterns = {
                comments: {
                    pattern: /((?:^\s*|\s+)#.*$)/gm,
                    alias: "co1"
                },
                strings: {
                    pattern: this.common.strings,
                    alias: "st0"
                },
                backticks: {
                    pattern: /`.*?`/gm,
                    alias: "st1"
                },
                braces: {
                    pattern: /=(\$\(.*?\))/gm,
                    alias: "me1"
                },
                cases: {
                    pattern: /^\s*\w+\)\s*$/gm,
                    alias: "kw2"
                },
                def: {
                    pattern: /^(\s*\w+)=/gm,
                    alias: "kw4"
                },
                vars: {
                    pattern: /(\$(?:\{\w+\}|\w+))\b/gim,
                    alias: "kw4"
                },
                functions: {
                    pattern: /^\s*(?:function\b)?\w+\(\)\s*\{/gm,
                    alias: "kw3"
                }
            };
        }
    });
    /*
---
description: Squirrel Language http://www.squirrel-lang.org/

license: MIT-style

authors:
  - Andi Dittrich
  - Devyn Collier Johnson

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.squirrel]
...
*/
    EJS.Language.squirrel = new Class({
        Extends: EJS.Language.generic,
        setupLanguage: function() {
            this.keywords = {
                reserved: {
                    csv: "base,break,case,catch,class,clone,constructor,continue,const,default,delete,else,enum,extends,false,for,foreach,function,if,in,instanceof,local,null,resume,return,static,switch,this,throw,true,try,typeof,while,yield",
                    alias: "kw1"
                }
            };
            this.patterns = {
                slashComments: {
                    pattern: this.common.slashComments,
                    alias: "co1"
                },
                poundComments: {
                    pattern: this.common.poundComments,
                    alias: "co1"
                },
                multiComments: {
                    pattern: this.common.multiComments,
                    alias: "co2"
                },
                strings: {
                    pattern: this.common.doubleQuotedString,
                    alias: "st0"
                },
                //'annotation':    { pattern: /@[\W\w_][\w\d_]+/gm, alias: 'st1' },
                // int, float, octals, hex
                numbers: {
                    pattern: /\b((([0-9]+)?\.)?[0-9_]+([e][-+]?[0-9]+)?|0x[A-F0-9]+)\b/gim,
                    alias: "nu0"
                },
                // chars are handled as numbers
                charnumber: {
                    pattern: this.common.singleQuotedString,
                    alias: "nu0"
                },
                brackets: {
                    pattern: this.common.brackets,
                    alias: "br0"
                },
                functionCalls: {
                    pattern: this.common.functionCalls,
                    alias: "me0"
                },
                methodCalls: {
                    pattern: this.common.methodCalls,
                    alias: "me1"
                },
                properties: {
                    pattern: this.common.properties,
                    alias: "me1"
                }
            };
        }
    });
    /*
---
description: SQL Language

license: MIT-style

authors:
  - Jose Prado
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.sql]
...
*/
    EJS.Language.sql = new Class({
        Extends: EJS.Language.generic,
        setupLanguage: function() {
            this.keywords = {
                keywords: {
                    csv: "savepoint, start, absolute, action, add, after, alter, as, asc, at, authorization, begin, bigint, binary, bit, by, cascade, char, character, check, checkpoint, close, collate, column, commit, committed, connect, connection, constraint, contains, continue, create, cube, current, current_date, current_time, cursor, database, date, deallocate, dec, decimal, declare, default, delete, desc, distinct, double, drop, dynamic, else, end, end-exec, escape, except, exec, execute, false, fetch, first, float, for, force, foreign, forward, free, from, full, function, global, goto, grant, group, grouping, having, hour, ignore, index, inner, insensitive, insert, instead, int, integer, intersect, into, is, isolation, key, last, level, load, local, max, min, minute, modify, move, name, national, nchar, next, no, numeric, of, off, on, only, open, option, order, out, output, partial, password, precision, prepare, primary, prior, privileges, procedure, public, read, real, references, relative, repeatable, restrict, return, returns, revoke, rollback, rollup, rows, rule, schema, scroll, second, section, select, sequence, serializable, set, size, smallint, static, statistics, table, temp, temporary, then, time, timestamp, to, top, transaction, translation, trigger, true, truncate, uncommitted, union, unique, update, values, varchar, varying, view, when, where, with, work",
                    alias: "kw1",
                    mod: "gi"
                },
                functions: {
                    csv: "abs, avg, case, cast, coalesce, convert, count, current_timestamp, current_user, day, isnull, left, lower, month, nullif, replace, right, session_user, space, substring, sum, system_user, upper, user, year",
                    alias: "kw2",
                    mod: "gi"
                },
                operators: {
                    csv: "all, and, any, between, cross, in, join, like, not, null, or, outer, some, if",
                    alias: "kw3",
                    mod: "gi"
                }
            }, this.patterns = {
                singleLineComments: {
                    pattern: /--(.*)$/gm,
                    alias: "co1"
                },
                multiLineComments: {
                    pattern: this.common.multiComments,
                    alias: "co2"
                },
                multiLineStrings: {
                    pattern: this.common.multiLineStrings,
                    alias: "st0"
                },
                numbers: {
                    pattern: this.common.numbers,
                    alias: "nu0"
                },
                columns: {
                    pattern: /`[^`\\]*(?:\\.[^`\\]*)*`/gm,
                    alias: "kw4"
                }
            };
        }
    });
    /*
---
description: VHDL Language

license: MIT-style

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.vhdl]
...
*/
    EJS.Language.vhdl = new Class({
        Extends: EJS.Language.generic,
        setupLanguage: function() {
            this.keywords = {
                keywords: {
                    csv: "abs,access,after,alias,all,and,architecture,array,assert,attribute,begin,block,body,buffer,bus,case,component,configuration,constant,disconnect,downto,else,elsif,end,entity,exit,file,for,function,generate,generic,group,guarded,if,impure,in,inertial,inout,is,label,library,linkage,literal,loop,map,mod,nand,new,next,nor,not,null,of,on,open,or,others,out,package,port,postponed,procedure,process,pure,range,record,register,reject,rem,report,return,rol,ror,select,severity,signal,shared,sla,sll,sra,srl,subtype,then,to,transport,type,unaffected,units,until,use,variable,wait,when,while,with,xnor,xor",
                    alias: "kw1",
                    mod: "gi"
                },
                operators: {
                    csv: "abs,not,mod,rem,sll,srl,sla,sra,rol,ror,and,or,nand,nor,xor,xnor",
                    alias: "sy0"
                }
            };
            this.patterns = {
                comments: {
                    pattern: /((?:^\s*|\s+)--.*$)/gm,
                    alias: "co1"
                },
                uses: {
                    pattern: /^\s*(?:use|library)\s*(\S+);/gim,
                    alias: "kw4"
                },
                functions: {
                    pattern: this.common.functionCalls,
                    alias: "kw2"
                },
                operators: {
                    pattern: /\*\*|\*|\/|\+|\-|&|=|\/=|<|<=|>|>=/g,
                    alias: "sy0"
                },
                strings: {
                    pattern: this.common.strings,
                    alias: "st1"
                },
                numbers: {
                    pattern: this.common.numbers,
                    alias: "nu0"
                },
                brackets: {
                    pattern: this.common.brackets,
                    alias: "br0"
                }
            };
        }
    });
    /*
---
description: XML/HTML language

license: MIT-style

authors:
  - Jose Prado
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.xml]
...
*/
    EnlighterJS.Language.xml = new Class({
        Extends: EnlighterJS.Language.generic,
        tokenizerType: "Xml",
        setupLanguage: function() {
            // Common HTML patterns
            this.patterns = {
                comments: {
                    pattern: /(?:&lt;|<)!--[\s\S]*?--(?:&gt;|>)/gim,
                    alias: "co2"
                },
                cdata: {
                    pattern: /(?:&lt;|<)!\[CDATA\[[\s\S]*?]](?:&gt;|>)/gim,
                    alias: "st1"
                },
                closingTags: {
                    pattern: /(?:&lt;|<)\/[A-Z:_][A-Z0-9:._-]*?(?:&gt;|>)/gi,
                    alias: "kw1"
                },
                doctype: {
                    pattern: /(?:&lt;|<)!DOCTYPE[\s\S]+?(?:&gt;|>)/gim,
                    alias: "st2"
                },
                version: {
                    pattern: /(?:&lt;|<)\?xml[\s\S]+?\?(?:&gt;|>)/gim,
                    alias: "kw2"
                }
            };
        }
    });
})();