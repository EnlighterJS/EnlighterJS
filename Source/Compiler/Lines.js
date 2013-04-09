/*
---
description: Compiles an array of Wicks into an Element.

license: MIT-style

authors:
  - Jose Prado

requires:
  - Core/1.3
  - Compiler

provides: [Compiler.Lines]
...
*/
Compiler.Lines = new Class({
    
    Extends: Compiler,
    
    options: {
        altLines: null,
        containerTag: {
            parent: 'div',
            child:  null
        },
        linesTag: {
            parent: 'div',
            child:  'span'
        },
        numbersTag: 'span'
    },
    
    initialize: function(options)
    {
        this.parent(options);
    },
    
    _compile: function(fuel, flame, wicks)
    {
        var el           = new Element(this.options.containerTag.parent),
            innerHtml    = '',
            lineNum      = 1,
            lines        = null,
            wick         = null,
            className    = '',
            text         = '',
            i, j;

        // If lines need to be wrapped in an inner parent, create that element
        // with this test. (E.g, tbody in a table)
        if (this.options.containerTag.child !== null) {
            el = new Element(containerTag.child).inject(el);
        }
        
        innerHtml += '<' + this.options.linesTag.parent + '>';
        
        innerHtml += '<' + this.options.numbersTag + ' class="' + flame + 'num">'
            + lineNum++
            + '</' + this.options.numbersTag + '>';
        
        innerHtml += '<' + this.options.linesTag.child
            + ' class="' + flame + 'line">';

        // Step through each match and add wicks to the Element by breaking
        // them up into individual lines.
        for (i = 0; i < wicks.length; i++) {
            wick  = wicks[i];
            lines = wick.text.split('\n');
            for (j = 0; j < lines.length; j++) {
                
                if (lines[j].length > 0) {
                    className = wick.type ? fuel.aliases[wick.type] || wick.type : '',
                    text = lines[j].replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;');
                    innerHtml += '<span class="' + className + '">' + text + '</span>';
                }
                
                if (j < lines.length - 1) {
                    innerHtml += '</' + this.options.linesTag.child + '>';
                    innerHtml += '</' + this.options.linesTag.parent + '>';
                    innerHtml += '<' + this.options.linesTag.parent + '>';
                    
                    innerHtml += '<' + this.options.numbersTag
                        + ' class="' + flame + 'num">'
                        + lineNum++
                        + '</' + this.options.numbersTag + '>';
                    
                    innerHtml += '<' + this.options.linesTag.child
                        + ' class="' + flame + 'line">';
                }
            }
        };
        
        innerHtml += '</' + this.options.linesTag.child + '>';
        innerHtml += '</' + this.options.linesTag.parent + '>';
        el.set('html', innerHtml);

        // Add alternate line styles based on pseudo-selector.
        switch (this.options.altLines) {
            case null:
                break;
                
            case 'hover':
                el.getElements(this.options.containerTag.child || this.options.containerTag.parent).addEvents({
                    'mouseover': function() { this.toggleClass('alt'); },
                    'mouseout':  function() { this.toggleClass('alt'); }
                });
                break;
                
            default:
                el.getChildren(':' + this.options.altLines)
                    .getElement('.' + flame + 'line')
                    .addClass('alt');
                break;
        }

        // Add first/last line classes to correct element based on mode.
        el.getFirst().getChildren().addClass(flame + 'first');
        el.getLast().getChildren().addClass(flame + 'last');

        // Ensure we return the real parent, not just an inner element like a tbody.
        if (this.options.containerTag.child) {
            el = el.getParent();
        }
        
        return el;
    }
});
