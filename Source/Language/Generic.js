/*
---
description: Code parsing engine for EnlighterJS

license: MIT-style

authors:
  - Jose Prado
  - Andi Dittrich

requires:
  - core/1.4.5

provides: [EnlighterJS.Language.generic]
...
*/
EnlighterJS.Language.generic = new Class({

	tokenizerType : 'Lazy',
	tokenizer : null,
	code : null,

	patterns : {},
	keywords : {},
	delimiters : {
		start: null,
		end: null
	},


	// commonly used Regex Patterns
	common : {
		// Matches a C style single-line comment.
		slashComments : /(?:^|[^\\])\/\/.*$/gm,

		// Matches a Perl style single-line comment.
		poundComments : /#.*$/gm,

		// Matches a C style multi-line comment
		multiComments : /\/\*[\s\S]*?\*\//gm,

		// Matches a string enclosed by single quotes. Legacy.
		aposStrings : /'[^'\\]*(?:\\.[^'\\]*)*'/gm,

		// Matches a string enclosed by double quotes. Legacy.
		quotedStrings : /"[^"\\]*(?:\\.[^"\\]*)*"/gm,

		// Matches a string enclosed by single quotes across multiple lines.
		multiLineSingleQuotedStrings : /'[^'\\]*(?:\\.[^'\\]*)*'/gm,

		// Matches a string enclosed by double quotes across multiple lines.
		multiLineDoubleQuotedStrings : /"[^"\\]*(?:\\.[^"\\]*)*"/gm,

		// Matches both.
		multiLineStrings : /'[^'\\]*(?:\\.[^'\\]*)*'|"[^"\\]*(?:\\.[^"\\]*)*"/gm,

		// Matches a string enclosed by single quotes.
		singleQuotedString : /'[^'\\\r\n]*(?:\\.[^'\\\r\n]*)*'/gm,

		// Matches a string enclosed by double quotes.
		doubleQuotedString : /"[^"\\\r\n]*(?:\\.[^"\\\r\n]*)*"/gm,

		// Matches both.
		strings : /'[^'\\\r\n]*(?:\\.[^'\\\r\n]*)*'|"[^"\\\r\n]*(?:\\.[^"\\\r\n]*)*"/gm,

		// Matches a property: .property style.
		properties : /\.([\w]+)\s*/gi,

		// Matches a method call: .methodName() style.
		methodCalls : /\.([\w]+)\s*\(/gm,

		// Matches a function call: functionName() style.
		functionCalls : /\b([\w]+)\s*\(/gm,

		// Matches any of the common brackets.
		brackets : /\{|\}|\(|\)|\[|\]/g,

		// Matches integers, decimals, hexadecimals.
		numbers : /\b((?:(\d+)?\.)?[0-9]+|0x[0-9A-F]+)\b/gi
	},

	/**
	 * Constructor.
	 * 
	 * @constructs
	 * @param {Object}
	 *            options
	 */
	initialize : function(code){
		// initialize language options
		this.setupLanguage();
		
		this.aliases = {};
		this.rules = {};
		this.code = code;

		// create new tokenizer
		this.tokenizer = new EnlighterJS.Tokenizer[this.tokenizerType]();

		// Add delimiter rules.
		if (this.delimiters.start){
			this.addRule('delimBeg', this.delimiters.start, 'de1');
		}

		if (this.delimiters.end){
			this.addRule('delimEnd', this.delimiters.end, 'de2');
		}

		// Set Keyword Rules from this.keywords object.
		Object.each(this.keywords, function(keywordSet, ruleName){
			// keyword set contains elements ?
			if (keywordSet.csv != ''){
				this.addRule(ruleName, this.csvToRegExp(keywordSet.csv, keywordSet.mod || "g"), keywordSet.alias);
			}
		}, this);

		// Set Rules from this.patterns object.
		Object.each(this.patterns, function(regex, ruleName){
			this.addRule(ruleName, regex.pattern, regex.alias);
		}, this);
	},
	
	// override this method to setup language params
	setupLanguage: function(){
	},

	getTokens : function(){
		return this.tokenizer.getTokens(this, this.code);
	},

	getRules : function(){
		return this.rules;
	},

	hasDelimiters : function(){
		return this.delimiters.start && this.delimiters.end;
	},

	addRule : function(ruleName, regex, className){
		this.rules[ruleName] = regex;
		this.addAlias(ruleName, className);
	},

	addAlias : function(key, alias){
		this.aliases[key] = alias || key;
	},

	csvToRegExp : function(csv, mod){
		return new RegExp('\\b(' + csv.replace(/,\s*/g, '|') + ')\\b', mod);
	},

	delimToRegExp : function(beg, esc, end, mod, suffix){
		beg = beg.escapeRegExp();
		if (esc){
			esc = esc.escapeRegExp();
		}
		end = (end) ? end.escapeRegExp() : beg;
		var pat = (esc) ? beg + "[^" + end + esc + '\\n]*(?:' + esc + '.[^' + end + esc + '\\n]*)*' + end : beg + "[^" + end + '\\n]*' + end;

		return new RegExp(pat + (suffix || ''), mod || '');
	},

	strictRegExp : function(){
		var regex = '(';
		for (var i = 0; i < arguments.length; i++){
			regex += arguments[i].escapeRegExp();
			regex += (i < arguments.length - 1) ? '|' : '';
		}
		regex += ')';
		return new RegExp(regex, "gim");
	}
});
