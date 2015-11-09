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
                alias: 'kw1'
            },
        };
        
        this.patterns = {
            'slashComments': { pattern: this.common.slashComments, alias: 'co1'},

            'poundComments': { pattern: this.common.poundComments, alias: 'co1'},

            'multiComments': { pattern: this.common.multiComments, alias: 'co2'},

            'strings':       { pattern: this.common.doubleQuotedString, alias: 'st0' },

            //'annotation':    { pattern: /@[\W\w_][\w\d_]+/gm, alias: 'st1' },

            // int, float, octals, hex
            'numbers':       { pattern: /\b((([0-9]+)?\.)?[0-9_]+([e][-+]?[0-9]+)?|0x[A-F0-9]+)\b/gim, alias: 'nu0' },

            // chars are handled as numbers
            'charnumber':    { pattern: this.common.singleQuotedString, alias: 'nu0' },

            'brackets':      { pattern: this.common.brackets, alias: 'br0' },

            'functionCalls': { pattern: this.common.functionCalls, alias: 'me0'},

            'methodCalls':   { pattern: this.common.methodCalls, alias: 'me1'},

            'properties':    { pattern: this.common.properties, alias: 'me1' }
        };
    }
});
