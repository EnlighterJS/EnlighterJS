/*
---
description: Code parsing engine for Lighter.

license: MIT-style

authors:
  - Jose Prado
  - Andi Dittrich

requires:
  - Core/1.3

provides: [Language]
...
*/
(function() {
    
var Language = this.Language = new Class({
    
    Implements: [Options],
    options: {},
    
    language: '',
    tokenizerType: 'Lazy',
    tokenizer: null,
    code: null,
    
    
    patterns:   {},
    keywords:   {},
    delimiters: {},

    /**
     * Common Regex Rules
     */
    common: {    
        slashComments: /(?:^|[^\\])\/\/.*$/gm, // Matches a C style single-line comment.
        poundComments: /#.*$/gm,               // Matches a Perl style single-line comment.
        multiComments: /\/\*[\s\S]*?\*\//gm,   // Matches a C style multi-line comment.
        aposStrings:   /'[^'\\]*(?:\\.[^'\\]*)*'/gm, // Matches a string enclosed by single quotes. Legacy.
        quotedStrings: /"[^"\\]*(?:\\.[^"\\]*)*"/gm, // Matches a string enclosed by double quotes. Legacy.
        multiLineSingleQuotedStrings: /'[^'\\]*(?:\\.[^'\\]*)*'/gm, // Matches a string enclosed by single quotes across multiple lines.
        multiLineDoubleQuotedStrings: /"[^"\\]*(?:\\.[^"\\]*)*"/gm, // Matches a string enclosed by double quotes across multiple lines.
        multiLineStrings:   /'[^'\\]*(?:\\.[^'\\]*)*'|"[^"\\]*(?:\\.[^"\\]*)*"/gm, // Matches both.
        singleQuotedString: /'[^'\\\r\n]*(?:\\.[^'\\\r\n]*)*'/gm, // Matches a string enclosed by single quotes.
        doubleQuotedString: /"[^"\\\r\n]*(?:\\.[^"\\\r\n]*)*"/gm, // Matches a string enclosed by double quotes.
        strings: /'[^'\\\r\n]*(?:\\.[^'\\\r\n]*)*'|"[^"\\\r\n]*(?:\\.[^"\\\r\n]*)*"/gm, // Matches both.
        properties:    /\.([\w]+)\s*/gi,     // Matches a property: .property style.
        methodCalls:   /\.([\w]+)\s*\(/gm,   // Matches a method call: .methodName() style.
        functionCalls: /\b([\w]+)\s*\(/gm,   // Matches a function call: functionName() style.
        brackets:      /\{|\}|\(|\)|\[|\]/g, // Matches any of the common brackets.
        numbers:       /\b((?:(\d+)?\.)?[0-9]+|0x[0-9A-F]+)\b/gi // Matches integers, decimals, hexadecimals.
    },
    
    /**
     * Constructor.
     * 
     * @constructs
     * @param {Object} options
     */
    initialize: function(code, options)
    {
        this.setOptions(options);
        
        this.aliases = {};
        this.rules   = {};
        this.code = code;
        
        // create new tokenizer
        this.tokenizer = new Tokenizer[this.tokenizerType](options);
        
        // Add delimiter rules.
        if (this.delimiters.start) {
            this.addRule('delimBeg', this.delimiters.start, 'de1');
        }
        
        if (this.delimiters.end) {
            this.addRule('delimEnd', this.delimiters.end, 'de2');
        }
        
        // Set Keyword Rules from this.keywords object.
        Object.each(this.keywords, function(keywordSet, ruleName) {
        	// keyword set contains elements ?
            if (keywordSet.csv != '') {
                this.addRule(ruleName, this.csvToRegExp(keywordSet.csv, keywordSet.mod || "g"), keywordSet.alias);
            }
        }, this);
        
        // Set Rules from this.patterns object.
        Object.each(this.patterns, function(regex, ruleName) {
            this.addRule(ruleName, regex.pattern, regex.alias);
        }, this);
    },
    
    getTokens: function(){
    	return this.tokenizer.parse(this, this.code, 0);
    },
    
    
    getRules: function()
    {
        return this.rules;
    },
    
    hasDelimiters: function()
    {
        return this.delimiters.start && this.delimiters.end;
    },
    
    addRule: function(ruleName, regex, className)
    {
        this.rules[ruleName] = regex;
        this.addAlias(ruleName, className);
    },
    
    addAlias: function(key, alias)
    {
        this.aliases[key] = alias || key;
    },
    
    csvToRegExp: function(csv, mod)
    {
        return new RegExp('\\b(' + csv.replace(/,\s*/g, '|') + ')\\b', mod);
    },
    
    delimToRegExp: function(beg, esc, end, mod, suffix)
    {
        beg = beg.escapeRegExp();
        if (esc) { esc = esc.escapeRegExp(); }
        end = (end) ? end.escapeRegExp() : beg;
        var pat = (esc) ? beg+"[^"+end+esc+'\\n]*(?:'+esc+'.[^'+end+esc+'\\n]*)*'+end : beg+"[^"+end+'\\n]*'+end;
        
        return new RegExp(pat+(suffix || ''), mod || '');
    },
    
    strictRegExp: function()
    {
        var regex = '(';
        for (var i = 0; i < arguments.length; i++) {
            regex += arguments[i].escapeRegExp();
            regex += (i < arguments.length - 1) ? '|' : '';
        }
        regex += ')';
        return new RegExp(regex, "gim");
    }
});

Language.standard = new Class({
    
    Extends: Language,
    
    initialize: function(options)
    {
        this.parent(options);
    }
});

})();
