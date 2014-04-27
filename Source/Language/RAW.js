/*
---
description: RAW Language - returns pure raw text

license: MIT-style

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.raw]
...
*/
EnlighterJS.Language.raw = new Class({
    
    Extends: EnlighterJS.Language.generic,
        
    initialize: function(code) {
    	this.code = code;
    },
    
    getTokens: function(){
    	// raw means "no-highlight" - return a single, unknown token with the given sourcecode
    	return [
    	        new EnlighterJS.Token(this.code, '', 0)
    	];
    }
});
