/*
---
description: Lazy parsing engine for Lighter.

license: MIT-style

authors:
  - Jose Prado

requires:
  - Core/1.3
  - Tokenizer

provides: [Tokenizer.Lazy]
...
*/
Tokenizer.Lazy = new Class({
    
    Extends: Tokenizer,
    
    /**
     * @constructs
     */
    initialize: function(options)
    {
        this.parent(options);
    },
    
    /**
     * Brute force the matches by finding all possible matches from all rules.
     * Then we sort them and cycle through the matches finding and eliminating
     * inner matches. Faster than LighterTokenizer.Strict, but less robust and
     * prone to erroneous matches.
     *
     * @param {Fuel} fuel       The fuel to use for parsing.
     * @param {String} code     The code to parse.
     * @param {Number} [offset] Optional offset to add to the match index.
     * @return {Array} The array of matches found.
     */
    _parse: function(fuel, code, offset)
    {
        var tokens = [],
            match = null,
            text  = null,
            index = null;
        
        offset = offset || 0;
        
        Object.each(fuel.getRules(), function(regex, rule) {
            while (null !== (match = regex.exec(code))) {
                index = match[1] && match[0].contains(match[1]) ? match.index + match[0].indexOf(match[1]) : match.index;
                text  = match[1] || match[0];
                tokens.push(new Token(text, rule, index + offset));
            }
        }, this);
        
        tokens = tokens.sort(function(token1, token2) {
            return token1.index - token2.index;
        });
        
        for (var i = 0, j = 0; i < tokens.length; i++) {
            
            if (tokens[i] === null) { continue; }
            
            for (j = i + 1; j < tokens.length && tokens[i] !== null; j++) {
                if (tokens[j] === null) {
                    continue;
                } else if (tokens[j].isBeyond(tokens[i])) {
                    break;
                } else if (tokens[j].overlaps(tokens[i])) {
                    tokens[i] = null;
                } else if (tokens[i].contains(tokens[j])) {
                    tokens[j] = null;
                }
            }
        }
        
        tokens = tokens.clean();
        
        return tokens;
    }
});
