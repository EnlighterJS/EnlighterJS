/*
---
description: defines a key/value object with language aliases e.g. javascript -> js

license: MIT-style

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.LanguageManager]
...
*/
EJS.LanguageManager = new Class({
	
	Implements : Options,
	
	options: {
		'language': 'generic'
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
		'standard': 'generic',
		'js': 'javascript',
		'md': 'markdown',
		'c++': 'cpp',
		'c': 'cpp',
		'styles': 'css',
		'bash': 'shell',
		'py': 'python',
		'html': 'xml',
		'jquery': 'javascript',
		'mootools': 'javascript',
		'ext.js': 'javascript',
		'c#': 'csharp',
        'conf': 'ini'
	},
	
	// get language name, process aliases and default languages
	getLanguage: function(languageName){
		// get default language
		var defaultLanguage = (this.options.language != null ? this.options.language.trim().toLowerCase() : '');
		
		// alias available ?
		if (this.languageAliases[defaultLanguage]){
			defaultLanguage = this.languageAliases[defaultLanguage];
		}
		
		// default language class available ?
		if (defaultLanguage.trim() == '' || !EJS.Language[defaultLanguage]){
			defaultLanguage = 'generic';
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
		if (EJS.Language[languageName]){
			return languageName;
		}else{
			return defaultLanguage;
		}
	}		
});