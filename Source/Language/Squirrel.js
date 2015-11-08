/*
---
description: Squirrel Language

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
            'chars':         { pattern: this.common.singleQuotedString, alias: 'st0' },
            'strings':       { pattern: this.common.doubleQuotedString, alias: 'st1' },
            'annotation':    { pattern: /@[\W\w_][\w\d_]+/gm, alias: 'st1' },
            'numbers':       { pattern: /\b((([0-9]+)?\.)?[0-9_]+([e][-+]?[0-9]+)?|0x[A-F0-9]+|0b[0-1_]+)\b/gim, alias: 'nu0' },
            'properties':    { pattern: this.common.properties, alias: 'me0' },
            'brackets':      { pattern: this.common.brackets, alias: 'br0' },
            'functionCalls': { pattern: this.common.functionCalls, alias: 'de1'},
            'directives':	 { pattern: /#.*$/gm, alias: 'kw2'}
        };
    }
});
