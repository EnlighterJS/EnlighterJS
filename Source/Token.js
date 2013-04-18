/*
---
description: Represents a token with its source code position and type.

license: MIT-style

authors:
  - Jose Prado
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Token]
...
*/
EnlighterJS.Token = new Class({
    
	text: null,
	type: null,
	index: -1,
	length: -1,
	end: -1,
	
    /**
     * Creates an instance of Token.
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
     * Tests whether a Token is contained within this Token.
     * 
     * @param Token token The Token to test against.
     * @return Boolean Whether or not the Token is contained within this one.
     */
    contains: function(token)
    {
        return (token.index >= this.index && token.index < this.end);
    },
    
    /**
     * Tests whether a this Token is past another Token.
     * 
     * @param Token token The Token to test against.
     * @return Boolean Whether or not this Token is past the test one.
     */
    isBeyond: function(token)
    {
        return (this.index >= token.end);
    },
    
    /**
     * Tests whether a Token overlaps with this Token.
     * 
     * @param Token token The Token to test against.
     * @return Boolean Whether or not this Token overlaps the test one.
     */
    overlaps: function(token)
    {
        return (this.index == token.index && this.length > token.length);
    },
    
    toString: function()
    {
        return this.index + ' - ' + this.text + ' - ' + this.end;
    }
});
