/*
---
description: Template to build custom Fuel for Lighter.js.

license: MIT-style

authors:
- Jose Prado

requires:
- core/1.3: '*'

provides: [Fuel.myFuel.js]
 ...
*/
Fuel.myFuel = new Class ({
	
	Extends: Fuel,
	language: '',
	
	initialize: function(options)
	{
		/** Set of keywords in CSV form. Add multiple keyword hashes for differentiate keyword sets. */
		this.keywords = {
			/*keywords: {
				csv: "keyword1, keyword2, keyword3",
				alias: 'kw0'
			},*/
		},
		
		/** Set of RegEx patterns to match */
		this.patterns = {
			//'slashComments': {pattern: this.common.slashComments, alias: 'co0'},
		};
		
		/** Script Delimiters. Remove or set to null if not applicable. */
		this.delimiters = {
			start: this.strictRegExp('startTag1', 'startTag2'),
			end:   this.strictRegExp('endTag1')
		};
		
		// Call parent constructor AFTER instance variables are set.
		this.parent(options);
	}
});
