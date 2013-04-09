/*
---
description: Compiles an array of Wicks into an OL Element.

license: MIT-style

authors:
  - Jose Prado

requires:
  - Core/1.3
  - Compiler

provides: [Compiler.List]
...
*/
Compiler.List = new Class({
    
    Extends: Compiler,
    
    options: {
        altLines: null,
        containerTag: 'ol'
    },
    
    initialize: function(options)
    {
        this.parent(options);
    },
    
    _compile: function(fuel, flame, wicks)
    {
        var el        = new Element(this.options.containerTag),
            innerHTML = '<li class="' + flame + 'line ' + flame + 'first">',
            wick      = null,
            text      = '',
            className = '',
            lines     = null,
            i, j;
        
        // Step through each match and add wicks to the Element by breaking
        // them up into individual lines.
        for (i = 0; i < wicks.length; i++) {
            wick  = wicks[i];
            lines = wick.text.split('\n');
            for (j = 0; j < lines.length; j++) {
                
                if (lines[j].length > 0) {
                    className = wick.type ? fuel.aliases[wick.type] || wick.type : '';
                    text = lines[j].replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;');
                    innerHTML += '<span class="' + className + '">' + text + '</span>';
                }

                if (j < lines.length - 1) {
                    className = flame + 'line';
                    innerHTML += '</li><li class="' + className + '">';
                }
            }
        }
        
        innerHTML += '</li>';
        el.set('html', innerHTML);

        // Add last line classes to correct element.
        el.getLast().addClass(flame + 'last');
        

        // Add alternate line styles based on pseudo-selector.
        switch (this.options.altLines) {
            case null:
                break;
                
            case 'hover':
                el.getElements('li').addEvents({
                    'mouseover': function() { this.toggleClass('alt'); },
                    'mouseout':  function() { this.toggleClass('alt'); }
                });
                break;
                
            default:
                el.getChildren(':' + this.options.altLines).addClass('alt');
                break;
        }
        
        return el;
    }
});
