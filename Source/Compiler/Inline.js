/*
---
description: Compiles an array of Wicks into an Element.

license: MIT-style

authors:
- Jose Prado

requires:
- core/1.3: '*'
- Compiler

provides: [Compiler.Inline]
...
*/
Compiler.Inline = new Class({
    
    Extends: Compiler,
    
    options: {
        containerTag: 'pre'
    },
    
    initialize: function(options)
    {
        this.parent(options);
    },
    
    _compile: function(fuel, flame, wicks)
    {
        var innerHTML = '',
            wick      = null,
            className = '',
            text      = '',
            i;
        
        // Step through each match and add wicks as text to the innerHtml.
        for (i = 0; i < wicks.length; i++) {
            wick = wicks[i];
            text = wick.text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;');
            className = wick.type ? fuel.aliases[wick.type] || wick.type : '';
            innerHTML += '<span class="' + className + '">' + text + '</span>';
        }
        
        return new Element(this.options.containerTag, {
            'html': innerHTML
        });
    }
});
