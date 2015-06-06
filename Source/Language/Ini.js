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
	Extends : EJS.Language.generic,

	setupLanguage: function(){
		this.keywords = {
		};

		this.patterns = {
			'singleLineComments': {
				pattern: /(;.*)$/gm, 
				alias: 'co1'
			},
			
			'section': {
				pattern: /^\s*?(\[.*\])\s*?$/gm, 
				alias: 'kw4'
			},
			
			'directive': {
				pattern: /^\s*?[a-z0-9\._-]+\s*?=/gim,
				alias: 'kw1'
			},
			
			'boolean': {
				pattern: /\b(true|false|on|off|yes|no)\b/gim, 
				alias: 'kw2'
			},
			
			'strings': {
				pattern: this.common.doubleQuotedString, 
				alias: 'st1'
			},
            'numbers': { 
            	pattern: /\b((([0-9]+)?\.)?[0-9_]+([e][-+]?[0-9]+)?|0x[A-F0-9]+|0b[0-1_]+)[a-z]*?\b/gim, 
            	alias: 'nu0'
            },
            'brackets': {
            	pattern: this.common.brackets, 
            	alias: 'br0'
            }
		};
	}
});
