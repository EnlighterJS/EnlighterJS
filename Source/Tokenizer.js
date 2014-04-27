/*
---
description: Code parsing engine for Lighter.

license: MIT-style

authors:
  - Jose Prado
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Tokenizer]
...
*/
EnlighterJS.Tokenizer = new Class({

	/**
	 * @constructs
	 */
	initialize : function(){
	},

	/**
	 * Parses source code using language regex rules and returns the array of tokens.
	 * 
	 * @param {Language}
	 *            language The Language to use for parsing.
	 * @param {String}
	 *            code The source code to parse.
	 * @param {Number}
	 *            [offset] Optional offset to add to the found index.
	 */
	getTokens : function(language, code){
		var text = null;
		var token = null;

		// parse code
		var tokens = this.parseTokens(language, code);

		// Add code between matches as an unknown token to the token array.
		for (var i = 0,pointer = 0; i < tokens.length; i++){
			if (pointer < tokens[i].index){
				text = code.substring(pointer, tokens[i].index);
				token = new EnlighterJS.Token(text, 'unknown', pointer);
				tokens.splice(i, 0, token);
			}
			pointer = tokens[i].end;
		}

		// Add the final unmatched piece if it exists.
		if (pointer < code.length){
			text = code.substring(pointer, code.length);
			token = new EnlighterJS.Token(text, 'unknown', pointer);
			tokens.push(token);
		}

		return tokens;
	},

	/**
	 * Parsing strategy method which child classes must override.
	 */
	parseTokens : function(language, code){
		throw new Error('Extending classes must override the parseTokens() method.');
	}
});
