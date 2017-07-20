/*
---
description: XML/HTML language

license: MIT-style

authors:
  - Jose Prado
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.xml]
...
*/
EnlighterJS.Language.xml = new Class({

	Extends : EnlighterJS.Language.generic,
	tokenizerType : 'Xml',

	setupLanguage: function(){
		// Common HTML patterns
		this.patterns = {
			'comments' : {
				pattern : /(?:&lt;|<)!--[\s\S]*?--(?:&gt;|>)/gim,
				alias : 'co2'
			},
			'cdata' : {
				pattern : /(?:&lt;|<)!\[CDATA\[[\s\S]*?]](?:&gt;|>)/gim,
				alias : 'st1'
			},
			'closingTags' : {
				pattern : /(?:&lt;|<)\/[A-Z:_][A-Z0-9:._-]*?(?:&gt;|>)/gi,
				alias : 'kw1'
			},
			'doctype' : {
				pattern : /(?:&lt;|<)!DOCTYPE[\s\S]+?(?:&gt;|>)/gim,
				alias : 'st2'
			},
			'version' : {
				pattern : /(?:&lt;|<)\?xml[\s\S]+?\?(?:&gt;|>)/gim,
				alias : 'kw2'
			}
		};
	}

});
