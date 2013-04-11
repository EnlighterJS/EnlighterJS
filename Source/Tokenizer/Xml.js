/*
---
description: XML parser engine for EnlighterJS

license: MIT-style

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5
  - Tokenizer

provides: [Tokenizer.Xml]
...
*/
Tokenizer.Xml = new Class({
    
    Extends: Tokenizer,
    
    /**
     * @constructs
     */
    initialize: function(options)
    {
        this.parent(options);
    },
    
    /**
     * Xml Tokenizer
     * @author Jose Prado
     *
     * @param {Language} lang       The language to use for parsing.
     * @param {String} code     The code to parse.
     * @param {Number} [offset] Optional offset to add to the match index.
     * @return {Array} The array of matches found.
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
        	tokens.push(new Token(match[1], 'kw1', match.index));
            while((attMatch = attPattern.exec(match[2])) != null) {
                index = match.index + match[1].length + attMatch.index;
                tokens.push(new Token(attMatch[1], 'kw2', index)); // Attributes
                index += attMatch[1].length + attMatch[2].length;
                tokens.push(new Token(attMatch[3], 'kw1', index)); // Separators (=)
                index += attMatch[3].length + attMatch[4].length;
                tokens.push(new Token(attMatch[5], 'kw3', index)); // Values
            }
            tokens.push(new Token(match[3], 'kw1', match.index + match[1].length + match[2].length));
        }
        
        return tokens;
    }
});
