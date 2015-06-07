/*
---
description: XML parser engine for EnlighterJS

license: MIT-style

authors:
  - Andi Dittrich
  - Jose Prado

requires:
  - Core/1.4.5

provides: [EnlighterJS.Tokenizer.Xml]
...
*/
EJS.Tokenizer.Xml = new Class({

	Extends : EJS.Tokenizer.Standard,

	/**
	 * @constructs
	 */
	initialize : function(){
	},

	/**
	 * Xml Tokenizer
	 * 
	 * @author Jose Prado, Andi Dittrich
	 * 
	 * @param {Language}
	 *            lang The language to use for parsing.
	 * @param {String}
	 *            code The code to parse.
	 * @param {Number}
	 *            [offset] Optional offset to add to the match index.
	 * @return {Array} The array of tokens found.
	 */
	parseTokens : function(lang, code){
		// Tags + attributes matching and preprocessing.
		var tagPattern = /((?:\&lt;|<)[A-Z:_][A-Z0-9:.-]*)([\s\S]*?)(\/?(?:\&gt;|>))/gi;
		var attPattern = /\b([\w:-]+)([ \t]*)(=)([ \t]*)(['"][^'"]+['"]|[^'" \t]+)/gi;
		
		// tmp storage
		var tokens = [];
		var match = null;
		var attMatch = null;
		var index = 0;

		// Create array of matches containing opening tags, attributes, values, and separators.
		while ((match = tagPattern.exec(code)) != null){
			tokens.push(new EJS.Token(match[1], 'kw1', match.index));
			while ((attMatch = attPattern.exec(match[2])) != null){
				index = match.index + match[1].length + attMatch.index;
				tokens.push(new EJS.Token(attMatch[1], 'kw2', index)); // Attributes
				index += attMatch[1].length + attMatch[2].length;
				tokens.push(new EJS.Token(attMatch[3], 'kw1', index)); // Separators (=)
				index += attMatch[3].length + attMatch[4].length;
				tokens.push(new EJS.Token(attMatch[5], 'st0', index)); // Values
			}
			tokens.push(new EJS.Token(match[3], 'kw1', match.index + match[1].length + match[2].length));
		}

		// apply rules
		Object.each(lang.getRules(), function(regex, rule){
			while (null !== (match = regex.exec(code))){
				index = match[1] && match[0].contains(match[1]) ? match.index + match[0].indexOf(match[1]) : match.index;
				text = match[1] || match[0];
				tokens.push(new EJS.Token(text, rule, index));
			}
		}, this);

		// sort tokens
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
