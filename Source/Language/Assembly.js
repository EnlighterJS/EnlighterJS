/*
---
description: ASM General Assembly Language

license: MIT-style

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.asm]
...
*/
EJS.Language.asm = new Class({
	Extends : EJS.Language.generic,

	setupLanguage: function(){

		this.patterns = {
            // comments start with a semicolon (only single line comments available)
			'singleLineComments': {
				pattern: /(;.*)$/gm,
				alias: 'co1'
			},

            // controls - used e.g. in KEIL
            'controls': {
                pattern: /(\$.*)$/gm,
                alias: 'co2'
            },

            // "strings" may used in some assemblers for char constants
            'strings': {
                pattern: this.common.strings,
                alias: 'st0'
            },

            // general instructions (followed after a label or at a new line)
            'instruction':{
                pattern: /(^|:)\s*?(\w+)\s+/gm,
                alias: 'kw3'
            },

            // labels (jump targets)
            'label': {
                pattern: /^\s*?([A-Z\?_][A-Z0-9\?_]+:)\s*?/gim,
                alias: 'kw1'
            },

            // indirect addresses starts with @
			'indirect': {
				pattern: /@\w+/gi,
				alias: 'kw4'
			},

            // immediate data
            'immediate': {
                pattern: /#\w+/gi,
                alias: 'kw4'
            },

            // Hexadecimal (two notations): 0aH  (8051 asm)
            'hex': {
                pattern: /[A-F0-9][A-F0-9$]+?H/gi,
                alias: 'nu0'
            },

            // Decimal: \d+  (8051 asm)
            'integer': {
                pattern: /\d[\d$]+?D/gi,
                alias: 'nu0'
            },

            // Binary: 0b00001010, 0b11111111 (8051 asm)
            'binary': {
                pattern: /[01][01$]+?B/gi,
                alias: 'nu0'
            },

            // Octals: 1767q (8051 asm)
            'octals': {
                pattern: /[0-7][0-7$]+?(?:Q|O)/gi,
                alias: 'nu0'
            },

            // Hexadecimal (two notations): 0x0a, $0a, 0xff, $ff (generic)
            'hex2': {
                pattern: /(0x[A-F0-9]+|\$[A-F0-9]+)/gi,
                alias: 'nu0'
            },

            // Binary: 0b00001010, 0b11111111 (generic)
            'binary2': {
                pattern: /(0b[01]+)/g,
                alias: 'nu0'
            },

            // Decimal: \d+ (generic)
            'integer2': {
                pattern: /\b(\d+)/g,
                alias: 'nu0'
            },

            // e.g. LOW(), HIGH() ..
            'functions': {
                pattern: this.common.functionCalls,
                alias: 'me0'
            },

		};
	}
});
