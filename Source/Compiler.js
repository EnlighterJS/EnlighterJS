/*
---
description: Compiles an array of Wicks into an Element.

license: MIT-style

authors:
  - Jose Prado

requires:
  - Core/1.3
  - Fuel
  - Wick

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
     * Compiles an array of wicks into a highlighted element using a fuel and
     * a flame.
     * 
     * @param {Fuel}   fuel  The Fuel used when parsing.
     * @param {String} flame The Flame to use.
     * @param {Array}  wicks The array of wicks to compile.
     * @return {Element} The generated Element.
     */
    compile: function(fuel, flame, wicks)
    {
        var lighter = this._compile(fuel, flame, wicks);
        
        // Set class and id attributes.
        lighter.set('class', flame + 'Lighter');
        lighter.set('id', 'Lighter_' + Date.now());
        
        if (this.options.editable) {
            lighter.set('contenteditable', 'true');
        }
        
        return lighter;
    },
    
    /**
     * Extending classes must override this method and return a highlighted
     * Element using the fuel and flame that were passed in.
     */
    _compile: function(fuel, flame, wicks)
    {
        throw new Error('Extending classes must override the _compile method.');
    }
});

})();
