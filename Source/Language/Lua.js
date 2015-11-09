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
	Extends : EJS.Language.generic,

	setupLanguage: function(){
		this.keywords = {
            'reserved': {
                'csv': 'and,break,do,else,elseif,end,for,function,if,in,local,or,repeat,return,not,then,until,while',
                'alias': 'kw1'
            },
            'values': {
                'csv': 'false,nil,true',
                'alias': 'kw2'
            }
		};

		this.patterns = {

            'multiLineComments': {
                pattern: /--\[\[[\s\S]*?]]/g,
                alias: 'co1'
            },

            'singleLineComments': {
                pattern: /(--.*)$/gm,
                alias: 'co1'
            },

            'specialComments': {
                pattern: /---\[\[[\s\S]*?(]])/g,
                alias: 'co1'
            },

            // single and double quoted strings
            'strings': {
                pattern: this.common.strings,
                alias: 'st0'
            },

            // multi line strings
            'mlstring': {
                pattern: /(\[(=*)\[[\S\s]*?]\2])/g,
                alias: 'st1'
            },

            'brackets': {
                pattern: this.common.brackets,
                alias:   'br0'
            },

            'numbers': {
                pattern: /\b((([0-9]+)?\.)?[0-9_]+([e][-+]?[0-9]+)?)/gim,
                alias: 'nu0'
            },

            'functionCalls': {
                pattern: this.common.functionCalls,
                alias: 'me0'
            },

            'methodCalls': {
                pattern: this.common.methodCalls,
                alias: 'me1'
            }

        };
	}
});
