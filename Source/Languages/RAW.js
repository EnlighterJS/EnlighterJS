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
    
    Extends: EnlighterJS.Language.cpp,
    language: 'raw',
        
    initialize: function(code, options) {
    	this.code = code;
    },
    
    getTokens: function(){
    	return [
    	        new EnlighterJS.Token(this.code, '', 0)
    	];
    }
});
