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
EJS.Language.java = new Class ({
    
    Extends: EJS.Language.generic,

    setupLanguage: function(code)
    {
        this.keywords = {
            reserved: {
                csv:   "continue, for, new, switch, assert, default, goto, synchronized, do, if, this, break, throw, else, throws, case, instanceof, return, transient, catch, try, final, finally, strictfp, volatile, const, native, super, while",
                alias: 'kw1'
            },
            keywords: {
            	csv:   "abstract, package, private, implements, protected, public, import, extends, interface, static, void, class",
            	alias: 'kw3'
            },
            primitives: {
                csv:   "byte, short, int, long, float, double, boolean, char, String",
                alias: 'kw2'
            },
            internal: {
            	csv:   "System",
            	alias: 'kw4'
            }
        },
        
        this.patterns = {
            'slashComments': { pattern: this.common.slashComments, alias: 'co1'},
            'multiComments': { pattern: this.common.multiComments, alias: 'co2'},
            'chars':         { pattern: this.common.singleQuotedString, alias: 'st0' },
            'strings':       { pattern: this.common.doubleQuotedString, alias: 'st1' },
            'annotation':    { pattern: /@[\W\w_][\w\d_]+/gm, alias: 'st1' },
            'numbers':       { pattern: /\b((([0-9]+)?\.)?[0-9_]+([e][-+]?[0-9]+)?|0x[A-F0-9]+|0b[0-1_]+)\b/gim, alias: 'nu0' },
            'properties':    { pattern: this.common.properties, alias: 'me0' },
            'brackets':      { pattern: this.common.brackets, alias: 'br0' },
            'functionCalls': { pattern: this.common.functionCalls, alias: 'kw1'}
        };
        
    }
});
