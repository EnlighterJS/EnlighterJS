/*
---
description: Compiles an array of Tokens into an Element.

license: MIT-style

authors:
  - Jose Prado
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [Compiler]
...
*/
(function(){

var Compiler = this.Compiler = new Class({
    
    Implements: Options,
    
    options: {
        editable: false
    },
    
    /**
     * @constructs
     * @param {Object} [options] The options object to use.
     * @return {Compiler} The current Compiler instance.
     */
    initialize: function(options)
    {
        this.setOptions(options);
        
        return this;
    },
    
    /**
     * Compiles an array of tokens into a highlighted element using a language and
     * a theme.
     * 
     * @param {Language}   language  The Language used when parsing.
     * @param {String} theme The Theme to use.
     * @param {Array}  tokens The array of tokens to compile.
     * @return {Element} The generated Element.
     */
    compile: function(language, theme, tokens)
    {
        var lighter = this._compile(language, theme, tokens);
        
        // Set class and id attributes.
        lighter.set('class', theme + 'Lighter');
        lighter.set('id', 'Lighter_' + Date.now());
        
        if (this.options.editable) {
            lighter.set('contenteditable', 'true');
        }
        
        return lighter;
    },
    
    /**
     * Extending classes must override this method and return a highlighted
     * Element using the language and theme that were passed in.
     */
    _compile: function(language, theme, tokens)
    {
        throw new Error('Extending classes must override the _compile method.');
    }
});

})();
