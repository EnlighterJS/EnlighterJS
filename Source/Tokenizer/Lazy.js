/*
---
description: Lazy parsing engine for Lighter.

license: MIT-style

authors:
  - Jose Prado
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [Tokenizer.Lazy]
...
*/
EnlighterJS.Tokenizer.Lazy = new Class({

	Extends : EnlighterJS.Tokenizer,

	/**
	 * @constructs
	 */
	initialize : function(){
	},

	/**
	 * Brute force the matches by finding all possible matches from all rules. Then we sort them and cycle through the matches finding and eliminating inner matches. Faster than
	 * LighterTokenizer.Strict, but less robust and prone to erroneous matches.
	 * 
	 * @param {Language}
	 *            language The language to use for parsing.
	 * @param {String}
	 *            code The code to parse.
	 * @return {Array} The array of matches found.
	 */
	parseTokens : function(language, code){
		var tokens = [];
		var match = null;
		var text = null;
		var index = null;


		Object.each(language.getRules(), function(regex, rule){
			while (null !== (match = regex.exec(code))){
				index = match[1] && match[0].contains(match[1]) ? match.index + match[0].indexOf(match[1]) : match.index;
				text = match[1] || match[0];
				tokens.push(new EnlighterJS.Token(text, rule, index));
			}
		}, this);

		tokens = tokens.sort(function(token1, token2){
			return token1.index - token2.index;
		});

		for (var i = 0,j = 0; i < tokens.length; i++){

			if (tokens[i] === null){
				continue;
			}

			for (j = i + 1; j < tokens.length && tokens[i] !== null; j++){
				if (tokens[j] === null){
					continue;
				}else if (tokens[j].isBeyond(tokens[i])){
					break;
				}else if (tokens[j].overlaps(tokens[i])){
					tokens[i] = null;
				}else if (tokens[i].contains(tokens[j])){
					tokens[j] = null;
				}
			}
		}

		return tokens.clean();
	}
});
