/*
---
description: HTML language fuel.

license: MIT-style

authors:
  - Jose Prado

requires:
  - Core/1.3
  - Fuel

provides: [Fuel.html]
...
*/
Fuel.html = new Class ({
    
    Extends: Fuel,
    language: 'html',
    
    initialize: function(options) {
    	console.log(options);
        // Ensure Fuel uses lazy match.
        options.matchType = "lazy";
        
        // Common HTML patterns
        this.patterns = {
            'comments':    {pattern: /(?:\&lt;|<)!--[\s\S]*?--(?:\&gt;|>)/gim,          alias: 'co1'},
            'cdata':       {pattern: /(?:\&lt;|<)!\[CDATA\[[\s\S]*?\]\](?:\&gt;|>)/gim, alias: 'st1'},
            'closingTags': {pattern: /(?:\&lt;|<)\/[A-Z][A-Z0-9]*?(?:\&gt;|>)/gi,       alias: 'kw1'},
            'doctype':     {pattern: /(?:\&lt;|<)!DOCTYPE[\s\S]+?(?:\&gt;|>)/gim,       alias: 'st2'}
        };
        
        // Tags + attributes matching and preprocessing.
        var tagPattern = /((?:\&lt;|<)[A-Z][A-Z0-9]*)(.*?)(\/?(?:\&gt;|>))/gi,
            attPattern = /\b([\w-]+)([ \t]*)(=)([ \t]*)(['"][^'"]+['"]|[^'" \t]+)/gi,
            matches    = [],
            match      = null,
            attMatch   = null,
            index      = 0;
            
        // Create array of matches containing opening tags, attributes, values, and separators.
        while ((match = tagPattern.exec(code)) != null) {
            matches.push(new Wick(match[1], 'kw1', match.index));
            while((attMatch = attPattern.exec(match[2])) != null) {
                index = match.index + match[1].length + attMatch.index;
                matches.push(new Wick(attMatch[1], 'kw2', index)); // Attributes
                index += attMatch[1].length + attMatch[2].length;
                matches.push(new Wick(attMatch[3], 'kw1', index)); // Separators (=)
                index += attMatch[3].length + attMatch[4].length;
                matches.push(new Wick(attMatch[5], 'kw3', index)); // Values
            }
            matches.push(new Wick(match[3], 'kw1', match.index + match[1].length + match[2].length));
        }
        
        this.parent(options);
    }
    
});
