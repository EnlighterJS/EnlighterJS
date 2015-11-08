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
                'csv': 'and,break,do,else,elseif,end,false,for,function,if,in,local,nil,not,or,repeat,return,then,true,until,while',
                'alias': 'kw1'
            }
		};

		this.patterns = {
			'singleLineComments': {
				pattern: /(--.*)$/gm,
				alias: 'co1'
			},
			

		};
	}
});
