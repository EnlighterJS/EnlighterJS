/*
---
description: AVR Assembler

license: MIT-style

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.avrasm]
...
*/
EJS.Language.avrasm = new Class({
	Extends : EJS.Language.generic,

	setupLanguage: function(){
		this.keywords = {
		};

		this.patterns = {
			'singleLineComments': {
				pattern: /(;.*)$/gm,
				alias: 'co1'
			},

			'definition': {
				pattern: /^\s*?\.(\w+)\s+/gm,
				alias: 'kw1'
			},

			'register': {
				pattern: /(r\d{1,2})/gim,
				alias: 'kw1'
			},

			'label': {
				pattern: /^\s*?(\w+:)\s*?/gm,
				alias: 'kw2'
			},

            'command':{
                pattern: /^\s*?(\w+)\s+/gm,
                alias: 'kw3'
            },

			'strings': {
	            pattern: this.common.strings,
	            alias: 'st0'
	        },

	        'numbers': {
                pattern: /\b((([0-9]+)?\.)?[0-9_]+([e][-+]?[0-9]+)?|0x[A-F0-9]+|0b[0-1_]+)\b/gim,
                alias: 'nu0'
            }
		};
	}
});
