/*
---
description: Enlighter`s Standard Tokenizer Engine

license: MIT-style

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [Tokenizer.Standard]
...
*/
EnlighterJS.Tokenizer.Standard = new Class({

	initialize : function(){
	},

    getTokens : function(language, code){
        // token list
		var rawTokens = [];

        // create token object
        var token = (function(text, alias, index){
            return {
                text: text,
                alias: alias,
                index: index,
                length: text.length,
                end: text.length + index
            }
        });

        // apply each rule to given sourcecode string
		Array.each(language.getRules(), function(rule){
            var text = null;
            var index = null;
            var match = null;

            // find ALL possible matches (also overlapping ones!)
            while (match = rule.pattern.exec(code)){
                // overrides the usual regex behaviour of not matching results that overlap
                rule.pattern.lastIndex = match.index+1;

                // extract index - add offset when matching group is used
                index = match[1] ? match.index + match[0].indexOf(match[1]) : match.index;

                // inner match defined or use the full matched pattern ?
                text = match[1] || match[0];

                // add new token
                rawTokens.push(token(text, rule.alias, index));
            }
		});

        // sort tokens by index (first occurrence)
        rawTokens = rawTokens.sort(function(token1, token2){
			return token1.index - token2.index;
		});

        // cleaned token list to render
        var tokens = [];

        // last token position
        var lastTokenEnd = 0;

        // iterate over raw token list
        for (var i=0; i<rawTokens.length; i++){
            // unmatched text between tokens ?
            if (lastTokenEnd < rawTokens[i].index ){
                // create new start text token
                tokens.push(token(code.substring(lastTokenEnd, rawTokens[i].index), 'unknown', lastTokenEnd));
            }

            // push current token to list
            tokens.push(rawTokens[i]);

            // store last token position
            lastTokenEnd = rawTokens[i].end;

            // find next, non overlapping token
            for (var j = i + 1; j < rawTokens.length; j++){
                if (rawTokens[i].end <= rawTokens[j].index){
                    i = j-1;
                    break;
                }
            }
        }

        // text fragments complete ? or is the final one missing ?
        if (lastTokenEnd < code.length -1){
            tokens.push(token(code.substring(lastTokenEnd), 'unknown', lastTokenEnd));
        }

		return tokens;
	}
});
