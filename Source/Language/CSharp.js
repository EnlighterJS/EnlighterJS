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
EJS.Language.csharp = new Class ({
    
    Extends: EJS.Language.generic,

    setupLanguage: function(){
        this.keywords = {
            reserved: {
                csv:   "as, base, break, case, catch, checked, continue, default, do, else, event, explicit, false, finally, fixed, for, foreach, goto, if, implicit, internal, is, lock, namespace, new, null, operator, params, private, protected, public, ref, return, sizeof, stackalloc, switch, this, throw, true, try, typeof, unchecked, using, void, while",
                alias: 'kw1'
            },
            keywords: {
            	csv:   "abstract, async, class, const, delegate, dynamic, event, extern, in, interface, out, override, readonly, sealed, static, unsafe, virtual, volatile",
            	alias: 'kw3'
            },
            primitives: {
                csv:   "bool, byte, char, decimal, double, enum, float, int, long, sbyte, short, struct, uint, ulong, ushort, object, string",
                alias: 'kw2'
            },
            internal: {
            	csv:   "System",
            	alias: 'kw4'
            }
        };
        
        this.patterns = {
            'slashComments': { pattern: this.common.slashComments, alias: 'co1'},
            'multiComments': { pattern: this.common.multiComments, alias: 'co2'},
            'chars':         { pattern: this.common.singleQuotedString, alias: 'st0' },
            'strings':       { pattern: this.common.doubleQuotedString, alias: 'st1' },
            'numbers':       { pattern: /\b((([0-9]+)?\.)?[0-9_]+([e][-+]?[0-9]+)?|0x[A-F0-9]+|0b[0-1_]+)\b/gim, alias: 'nu0' },
            'brackets':      { pattern: this.common.brackets, alias: 'br0' },
            'functionCalls': { pattern: this.common.functionCalls, alias: 'me0'},
			'methodCalls':   { pattern: this.common.methodCalls, alias: 'me1'}
        };
        
    }
});
