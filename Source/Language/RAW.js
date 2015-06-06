/*
---
description: RAW Code

license: MIT-style

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.raw]
...
*/
EJS.Language.raw = new Class({
    
    Extends: EJS.Language.generic,
        
    initialize: function(code) {
    	this.code = code;
    },
    
    getTokens: function(){
    	// raw means "no-highlight" - return a single, unknown token with the given sourcecode
    	return [
    	        new EJS.Token(this.code, '', 0)
    	];
    }
});
