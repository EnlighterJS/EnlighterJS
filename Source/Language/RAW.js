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
        // create token object
        var token = (function(text, alias, index){
            return {
                text: text,
                alias: alias,
                index: index,
                length: text.length,
                end: text.length + index
            }
        });

    	// raw means "no-highlight" - return a single, unknown token with the given sourcecode
    	return [
    	        token(this.code, '', 0)
    	];
    }
});
