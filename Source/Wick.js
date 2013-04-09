/*
---
description: Represents a token with its source code position and type.

license: MIT-style

authors:
  - Jose Prado

requires:
  - Core/1.3

provides: [Wick]
...
*/
(function() {
    
var Wick = this.Wick = new Class({
    
    /**
     * Creates an instance of Wick.
     *
     * @constructs
     * @param {String} text  The match text.
     * @param {String} type  The type of match.
     * @param {Number} index The index where the match was found.
     */
    initialize: function(text, type, index)
    {
        this.text   = text;
        this.type   = type;
        this.index  = index;
        this.length = this.text.length;
        this.end    = this.index + this.length;
    },
    
    /**
     * Tests whether a Wick is contained within this Wick.
     * 
     * @param Wick wick The Wick to test against.
     * @return Boolean Whether or not the Wick is contained within this one.
     */
    contains: function(wick)
    {
        return (wick.index >= this.index && wick.index < this.end);
    },
    
    /**
     * Tests whether a this Wick is past another Wick.
     * 
     * @param Wick wick The Wick to test against.
     * @return Boolean Whether or not this Wick is past the test one.
     */
    isBeyond: function(wick)
    {
        return (this.index >= wick.end);
    },
    
    /**
     * Tests whether a Wick overlaps with this Wick.
     * 
     * @param Wick wick The Wick to test against.
     * @return Boolean Whether or not this Wick overlaps the test one.
     */
    overlaps: function(wick)
    {
        return (this.index == wick.index && this.length > wick.length);
    },
    
    toString: function()
    {
        return this.index + ' - ' + this.text + ' - ' + this.end;
    }
});

})();
