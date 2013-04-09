/*
---
description: Code parsing engine for Lighter.

license: MIT-style

authors:
  - Jose Prado

requires:
  - Core/1.3
  - Fuel
  - Wick

provides: [Parser]
...
*/
(function(){

var Parser = this.Parser = new Class({
    
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
     * Parses source code using fuel regex rules and returns the array of
     * tokens.
     *
     * @param {Fuel} fuel       The Fuel to use for parsing.
     * @param {String} code     The source code to parse.
     * @param {Number} [offset] Optional offset to add to the found index.
     */
    parse: function(fuel, code, offset)
    {
        var wicks = [],
            text  = null,
            wick  = null;
        
//        if (this.options.strict && fuel.hasDelimiters()) {
//            var match    = null,
//                endMatch = null,
//                codeBeg  = 0,
//                codeEnd  = code.length,
//                codeSeg  = '';
//            
//            while ((match = fuel.delimiters.start.exec(code)) != null) {
//                fuel.delimiters.end.lastIndex = fuel.delimiters.start.lastIndex;
//                if ((endMatch = fuel.delimiters.end.exec(code)) != null) {
//                    wicks.push(new Wick(match[0], 'de1', match.index));
//                    codeBeg = fuel.delimiters.start.lastIndex;
//                    codeEnd = endMatch.index - 1;
//                    codeSeg = code.substring(codeBeg, codeEnd);
//                    wicks.append(this._parse(fuel, codeSeg, codeBeg));
//                    wicks.push(new Wick(endMatch[0], 'de2', endMatch.index));
//                }
//            }
//        } else {
//            wicks.append(this._parse(fuel, code, offset));
//        }
        
        wicks = this._parse(fuel, code, offset);
        
        // Add code between matches as an unknown wick to the wick array.
        for (var i = 0, pointer = 0; i < wicks.length; i++) {
            if (pointer < wicks[i].index) {
                text = code.substring(pointer, wicks[i].index);
                wick = new Wick(text, 'unknown', pointer);
                wicks.splice(i, 0, wick);
            }
            pointer = wicks[i].end;
        }
        
        // Add the final unmatched piece if it exists.
        if (pointer < code.length) {
            text = code.substring(pointer, code.length);
            wick = new Wick(text, 'unknown', pointer);
            wicks.push(wick);
        }
        
        return wicks;
    },
    
    /**
     * Parsing strategy method which child classes must override.
     */
    _parse: function(fuel, code, offset)
    {
        throw new Error('Extending classes must override the _parse method.');
    }
});

})();
