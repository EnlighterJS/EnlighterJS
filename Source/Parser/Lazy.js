/*
---
description: Lazy parsing engine for Lighter.

license: MIT-style

authors:
  - Jose Prado

requires:
  - Core/1.3
  - Parser

provides: [Parser.Lazy]
...
*/
Parser.Lazy = new Class({
    
    Extends: Parser,
    
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
     * inner matches. Faster than LighterParser.Strict, but less robust and
     * prone to erroneous matches.
     *
     * @param {Fuel} fuel       The fuel to use for parsing.
     * @param {String} code     The code to parse.
     * @param {Number} [offset] Optional offset to add to the match index.
     * @return {Array} The array of matches found.
     */
    _parse: function(fuel, code, offset)
    {
        var wicks = [],
            match = null,
            text  = null,
            index = null;
        
        offset = offset || 0;
        
        Object.each(fuel.getRules(), function(regex, rule) {
            while (null !== (match = regex.exec(code))) {
                index = match[1] && match[0].contains(match[1]) ? match.index + match[0].indexOf(match[1]) : match.index;
                text  = match[1] || match[0];
                wicks.push(new Wick(text, rule, index + offset));
            }
        }, this);
        
        wicks = wicks.sort(function(wick1, wick2) {
            return wick1.index - wick2.index;
        });
        
        for (var i = 0, j = 0; i < wicks.length; i++) {
            
            if (wicks[i] === null) { continue; }
            
            for (j = i + 1; j < wicks.length && wicks[i] !== null; j++) {
                if (wicks[j] === null) {
                    continue;
                } else if (wicks[j].isBeyond(wicks[i])) {
                    break;
                } else if (wicks[j].overlaps(wicks[i])) {
                    wicks[i] = null;
                } else if (wicks[i].contains(wicks[j])) {
                    wicks[j] = null;
                }
            }
        }
        
        wicks = wicks.clean();
        
        return wicks;
    }
});
