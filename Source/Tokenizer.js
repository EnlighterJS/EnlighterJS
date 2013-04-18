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
    
    Implements: [Options],
    
    options: {
        strict: false
    },
    
    /**
     * @constructs
     */
    initialize: function(options)
    {
        this.setOptions(options);
    },
    
    /**
     * Parses source code using language regex rules and returns the array of
     * tokens.
     *
     * @param {Language} language       The Language to use for parsing.
     * @param {String} code     The source code to parse.
     * @param {Number} [offset] Optional offset to add to the found index.
     */
    parse: function(language, code, offset)
    {
        var tokens = [],
            text  = null,
            token  = null;
        
//        if (this.options.strict && language.hasDelimiters()) {
//            var match    = null,
//                endMatch = null,
//                codeBeg  = 0,
//                codeEnd  = code.length,
//                codeSeg  = '';
//            
//            while ((match = language.delimiters.start.exec(code)) != null) {
//                language.delimiters.end.lastIndex = language.delimiters.start.lastIndex;
//                if ((endMatch = language.delimiters.end.exec(code)) != null) {
//                    tokens.push(new Token(match[0], 'de1', match.index));
//                    codeBeg = language.delimiters.start.lastIndex;
//                    codeEnd = endMatch.index - 1;
//                    codeSeg = code.substring(codeBeg, codeEnd);
//                    tokens.append(this._parse(language, codeSeg, codeBeg));
//                    tokens.push(new Token(endMatch[0], 'de2', endMatch.index));
//                }
//            }
//        } else {
//            tokens.append(this._parse(language, code, offset));
//        }
        
        // parse code
        tokens = this._parse(language, code, offset);
        
        // Add code between matches as an unknown token to the token array.
        for (var i = 0, pointer = 0; i < tokens.length; i++) {
            if (pointer < tokens[i].index) {
                text = code.substring(pointer, tokens[i].index);
                token = new EnlighterJS.Token(text, 'unknown', pointer);
                tokens.splice(i, 0, token);
            }
            pointer = tokens[i].end;
        }
        
        // Add the final unmatched piece if it exists.
        if (pointer < code.length) {
            text = code.substring(pointer, code.length);
            token = new EnlighterJS.Token(text, 'unknown', pointer);
            tokens.push(token);
        }
        
        return tokens;
    },
    
    /**
     * Parsing strategy method which child classes must override.
     */
    _parse: function(language, code, offset)
    {
        throw new Error('Extending classes must override the _parse method.');
    }
});
