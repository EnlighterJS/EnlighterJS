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
EJS.Language.kotlin = new Class ({
    
    Extends: EJS.Language.generic,

    setupLanguage: function(code)
    {
        this.keywords = {
            reserved: {
                csv:   "package, as, typealias, class, this, super, val, var, fun, for, null, true, false, is, in, throw, return, break, continue, object, if, try, finally, else, while, do, when, interface, typeof",
                alias: 'kw1'
            },
            keywords: {
            	csv:   "import, typealias, constructor, by, where, to, init, companion, abstract, final, enum, open, annotation, sealed, data, lateinit, override, private, protected, public, internal, vararg, noinline, crossinline, reified, const, suspend, tailrec, operator, infix, inline, external", 
            	alias: 'kw2'
            }
        },
        
        this.patterns = {
            'slashComments': 	{ pattern: this.common.slashComments, alias: 'co1'},
            'multiComments': 	{ pattern: this.common.multiComments, alias: 'co2'},
            'chars':         	{ pattern: this.common.singleQuotedString, alias: 'st0' },
			'multiLineStrings': { pattern: /"""[\s\S]*"""/gm, alias: 'st1' },
            'strings':       	{ pattern: this.common.doubleQuotedString, alias: 'st1' },
            'annotation':    	{ pattern: /@[\W\w_][\w\d_]+/gm, alias: 'st1' },
            'numbers':       	{ pattern: /\b((([0-9]+)?\.)?[0-9_]+([e][-+]?[0-9]+)?|0x[A-F0-9]+|0b[0-1_]+)\b/gim, alias: 'nu0' },
            'properties':    	{ pattern: this.common.properties, alias: 'me0' },
            'brackets':      	{ pattern: this.common.brackets, alias: 'br0' },
            'functionCalls': 	{ pattern: this.common.functionCalls, alias: 'kw4'}
        };
        
    }
});
