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
EnlighterJS.Tokenizer.Xml = new Class({

	Extends : EnlighterJS.Tokenizer.Standard,

    code: null,

    /**
     * Store code to pre-process XML
     */
    getTokens : function(language, code){
        this.code = code;
        return this.parent(language, code);
    },

    /**
     * XML Syntax is preprocessed
     */
    getPreprocessedTokens: function(token){
        // token list
        var rawTokens = [];

        // Tags + attributes matching and preprocessing.
        var tagPattern = /((?:\&lt;|<)[A-Z:_][A-Z0-9:._-]*)([\s\S]*?)(\/?(?:\&gt;|>))/gi;
        var attPattern = /\b([\w:-]+)([ \t]*)(=)([ \t]*)(['"][^'"]+['"]|[^'" \t]+)/gi;

        // tmp storage
        var match = null;
        var attMatch = null;
        var index = 0;

        // Create array of matches containing opening tags, attributes, values, and separators.
        while ((match = tagPattern.exec(this.code)) != null){
            rawTokens.push(token(match[1], 'kw1', match.index));
            while ((attMatch = attPattern.exec(match[2])) != null){
                // Attributes
                index = match.index + match[1].length + attMatch.index;
                rawTokens.push(token(attMatch[1], 'kw2', index));

                // Separators (=)
                index += attMatch[1].length + attMatch[2].length;
                rawTokens.push(token(attMatch[3], 'kw1', index));

                // Values
                index += attMatch[3].length + attMatch[4].length;
                rawTokens.push(token(attMatch[5], 'st0', index));
            }
            rawTokens.push(token(match[3], 'kw1', match.index + match[1].length + match[2].length));
        }

        return rawTokens;
    }
});
