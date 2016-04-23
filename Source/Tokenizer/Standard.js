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
EJS.Tokenizer.Standard = new Class({

	initialize : function(){
	},

    getTokens : function(language, code){
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


        // token list
		var rawTokens = this.getPreprocessedTokens(token);

        // cleaned token list to render
        var tokens = [];


        // apply each rule to given sourcecode string
		Array.each(language.getRules(), function(rule){
            var match;

            // find ALL possible matches (also overlapping ones!)
            while (match = rule.pattern.exec(code)){
                // overrides the usual regex behaviour of not matching results that overlap
                rule.pattern.lastIndex = match.index+1;

                // matching groups used ?
                if (match.length == 1) {
                    rawTokens.push(token(match[0], rule.alias, match.index));
                // use full pattern
                }else{
                    // get first matched group
                    for (var i = 1; i < match.length; i++) {
                        if (match[i] && match[i].length > 0){
                            rawTokens.push(token(match[i], rule.alias, match.index + match[0].indexOf(match[i])));
                        }
                    }
                }
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

        // iterate over raw token list and retain the first match - drop overlaps
        for (var i=0; i<rawTokens.length; i++){
            // unmatched text between tokens ?
            if (lastTokenEnd < rawTokens[i].index ){
                // create new start text token
                tokens.push(token(code.substring(lastTokenEnd, rawTokens[i].index), '', lastTokenEnd));
            }

            // push current token to list
            tokens.push(rawTokens[i]);

            // store last token position
            lastTokenEnd = rawTokens[i].end;

            // find next, non overlapping token
            var nextTokenFound = false;
            for (var j = i + 1; j < rawTokens.length; j++){
                if (rawTokens[j].index >= lastTokenEnd){
                    // the "current" token -> i will be incremented in the next loop => j-1
                    i = j-1;
                    nextTokenFound = true;
                    break;
                }
            }

            // final position reached ?
            if (nextTokenFound===false){
                break;
            }
        }

        // text fragments complete ? or is the final one missing ?
        if (lastTokenEnd < code.length){
            tokens.push(token(code.substring(lastTokenEnd), '', lastTokenEnd));
        }

		return tokens;
	},

    // token pre-processing; can be overloaded by extending class
    getPreprocessedTokens: function(token){
        return [];
    }
});
