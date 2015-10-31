/*
---
description: Template to build custom languages for EnlighterJS.

license: MIT-style

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.mylang]
...
*/
// your language is identified by it`s (lowercase!) classname - for example "mylang" is used
// you can try out this example using Development.html - it is not included in regular builds!
EnlighterJS.Language.mylang = new Class({

	// every language have to extend the generic language or in case it's a superset the origin language
	Extends : EnlighterJS.Language.generic,

	// override the setupLanguage() method to configure your language-patterns
	setupLanguage: function(){
		// a set of keywords-groups to highlight
		// you can define multiple keyword-groups within, each containg a list of comma seperated keywords ("csv") and an alias with the matching css-class to highlight
        // keep these lists AS SMALL AS POSSIBLE - use regex if possible
		this.keywords = {
			langElements : {
				csv : 'if, else, endif, elseif, then',
				alias : 'kw1'
			},
			output: {
				csv: 'echo',
				alias: 'kw3'
			}
		};

		// a set of patterns used to match your language
		// some generic patterns are already defined into EnlighterJS.Language.generic - you can access them with this.common
		// like keywords, each pattern requires an alias with the matching css-class
        // the tokenizer will take respect to the list ordering (priority)
		this.patterns = {
			// mylang uses slash-style-comments
			'slashComments' : {
				pattern : this.common.slashComments,
				alias : 'co1'
			},

			// single and double quoted strings are used
			'chars' : {
				pattern : this.common.singleQuotedString,
				alias : 'st0'
			},
			'strings' : {
				pattern : this.common.doubleQuotedString,
				alias : 'st0'
			},

			// annotations starting with an @
			'annotation' : {
				pattern : /@[\W\w_][\w\d_]+/gm,
				alias : 'st1'
			},

			// special regex pattern is used to match numbers
			'numbers' : {
				pattern : /\b((([0-9]+)?\.)?[0-9_]+([e][-+]?[0-9]+)?|0x[A-F0-9]+|0b[0-1_]+)\b/gim,
				alias : 'nu0'
			},

			// standard function calls are used
			'functionCalls' : {
				pattern : this.common.functionCalls,
				alias : 'de1'
			},

			// directives starting with an hash
			'directives' : {
				pattern : /#.*$/gm,
				alias : 'kw2'
			}
		};

		// maybe "mylang" is a scripting language and uses start/stop "tags"
		// to handle arbitrary strings, use this.strictRegExp to escape these sequences
		this.delimiters = {
			start : this.strictRegExp('<!##'),
			end : this.strictRegExp('##!>')
		};
	}
});
