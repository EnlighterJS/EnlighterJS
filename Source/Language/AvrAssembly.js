/*
---
description: ATMEL AVR Assembly Language

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

		this.patterns = {
			'singleLineComments': {
				pattern: /(;.*)$/gm,
				alias: 'co1'
			},

            // available directives: BYTE,CSEG,DB,DEF,DEVICE,DSEG,DW,ENDMACRO,EQU,ESEG,EXIT,INCLUDE,LIST,LISTMAC,MACRO,NOLIST,ORG,SET
			'directives': {
				pattern: /^\s*?\.(\w+)\s+/gm,
				alias: 'kw1'
			},

			'register': {
				pattern: /\b(r\d{1,2})/gi,
				alias: 'kw1'
			},

            'macroparam': {
                pattern: /(@[0-9])/gi,
                alias: 'kw4'
            },

			'label': {
				pattern: /^\s*?(\w+:)\s*?/gm,
				alias: 'kw3'
			},

            'instruction':{
                pattern: /(^|:)\s*?(\w+)\s+/gm,
                alias: 'kw3'
            },

			'strings': {
	            pattern: this.common.strings,
	            alias: 'st0'
	        },

            // Hexadecimal (two notations): 0x0a, $0a, 0xff, $ff
            'hex': {
                pattern: /(0x[A-F0-9]+|\$[A-F0-9]+)/gi,
                alias: 'nu0'
            },

            // Binary: 0b00001010, 0b11111111
            'binary': {
                pattern: /(0b[01]+)/g,
                alias: 'nu0'
            },

            // Decimal: \d+
	        'integer': {
                pattern: /\b(\d+)/g,
                alias: 'nu0'
            },

            // e.g. LOW(), HIGH() ..
            'functions': {
                pattern: this.common.functionCalls,
                alias: 'me0'
            },

            // io register alias e.g. DDRA, PORTB, TIMSK
            'ioregister': {
                pattern: /\b[A-Z]{2,}[0-9]?[0-9]?\b/g,
                alias: 'kw4'
            }
		};
	}
});
