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
                alias: 'kw1',
                mod: 'gi'
            },
            const: {
                csv: 'true, false',
                alias: 'kw3',
                mod: 'gi'
            }
        };
        
        this.patterns = {
            'lineComments': { pattern: /%.*$/gm, alias: 'co1'},
            'blockComments': { pattern: /%%.*$/gm, alias: 'co2'},

            'fn' : { pattern: this.common.functionCalls, alias: 'me0'},
            'fn2' : { pattern: /\b([\w]+)\s*;/gm, alias: 'me0'},
            'me' : { pattern: this.common.methodCalls, alias: 'me1'},

            'brackets': { pattern: this.common.brackets, alias: 'br0' },

            'strings': {pattern: this.common.singleQuotedString, alias: 'st0'},

            'numbers': { pattern: this.common.numbers, alias: 'nu0' },

            'fhandle': { pattern: /(@[\w]+)\s*/gm, alias: 'kw3' },

            'symbols': { pattern: /\+|-|\*|\/|%|!|@|&|\||\^|<|>|=|,|\.|;|\?|:|\[|]/g, alias:   'sy0' },

            'classdef': { pattern: /classdef\s+(\w+(?:\s*<\s*\w+)?)\s*$/gim, alias: 'kw4'}
        };
    }
});
