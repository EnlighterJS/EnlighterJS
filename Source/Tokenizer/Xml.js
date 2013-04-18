/*
---
description: XML parser engine for EnlighterJS

license: MIT-style

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Tokenizer.Xml]
...
*/
EnlighterJS.Tokenizer.Xml = new Class({
    
    Extends: EnlighterJS.Tokenizer,
    
    /**
     * @constructs
     */
    initialize: function(options)
    {
        this.parent(options);
    },
    
    /**
     * Xml Tokenizer
     * @author Jose Prado, Andi Dittrich
     *
     * @param {Language} lang       The language to use for parsing.
     * @param {String} code     The code to parse.
     * @param {Number} [offset] Optional offset to add to the match index.
     * @return {Array} The array of tokens found.
     */
    _parse: function(lang, code, offset)
    {
    	// Tags + attributes matching and preprocessing.
        var tagPattern = /((?:\&lt;|<)[A-Z][A-Z0-9]*)(.*?)(\/?(?:\&gt;|>))/gi,
            attPattern = /\b([\w-]+)([ \t]*)(=)([ \t]*)(['"][^'"]+['"]|[^'" \t]+)/gi,
            tokens    = [],
            match      = null,
            attMatch   = null,
            index      = 0;
            
        // Create array of matches containing opening tags, attributes, values, and separators.
        while ((match = tagPattern.exec(code)) != null) {
        	tokens.push(new EnlighterJS.Token(match[1], 'kw1', match.index));
            while((attMatch = attPattern.exec(match[2])) != null) {
                index = match.index + match[1].length + attMatch.index;
                tokens.push(new EnlighterJS.Token(attMatch[1], 'kw2', index)); // Attributes
                index += attMatch[1].length + attMatch[2].length;
                tokens.push(new EnlighterJS.Token(attMatch[3], 'kw1', index)); // Separators (=)
                index += attMatch[3].length + attMatch[4].length;
                tokens.push(new EnlighterJS.Token(attMatch[5], 'kw3', index)); // Values
            }
            tokens.push(new EnlighterJS.Token(match[3], 'kw1', match.index + match[1].length + match[2].length));
        }
        
        // apply rules
        Object.each(lang.getRules(), function(regex, rule) {
            while (null !== (match = regex.exec(code))) {
                index = match[1] && match[0].contains(match[1]) ? match.index + match[0].indexOf(match[1]) : match.index;
                text  = match[1] || match[0];
                tokens.push(new EnlighterJS.Token(text, rule, index + offset));
            }
        }, this);
        
        // sort tokens
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
