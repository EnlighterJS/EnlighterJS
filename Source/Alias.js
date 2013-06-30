/*
---
description: defines a key/value object with language aliases e.g. javascript -> js

license: MIT-style

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Alias]
...
*/
EnlighterJS.Alias = new Class({
	
	Implements : Options,
	
	options: {
		'language': 'standard'
	},

	/**
	 * @constructs
	 * @param {Object} options The options object.
	 */
	initialize : function(options) {
		this.setOptions(options);
	},	
	
	// map of language aliases
	languageAliases: {
		'javascript': 'js',
		'markdown': 'md',
		'no-highlight': 'raw',
		'c++': 'cpp',
		'styles': 'css',
		'bash': 'shell'
	},
	
	// get language name, process aliases and default languages
	getLanguage: function(languageName){
		// get default language
		var defaultLanguage = (this.options.language != null ? this.options.language.trim().toLowerCase() : null);
		
		// default language class available ?
		if (defaultLanguage == null || defaultLanguage.trim() == '' || !EnlighterJS.Language[defaultLanguage]){
			defaultLanguage = 'standard';
		}
		
		// valid string ?
		if (languageName == null || languageName.trim() == ''){
			return defaultLanguage;
		}
		
		// "clean" languge name
		languageName = languageName.trim().toLowerCase();
		
		// alias available ?
		if (this.languageAliases[languageName]){
			languageName = this.languageAliases[languageName];
		}
		
		// language class available ?
		if (EnlighterJS.Language[languageName]){
			return languageName;
		}else{
			return defaultLanguage;
		}
	}
		
		
		
});