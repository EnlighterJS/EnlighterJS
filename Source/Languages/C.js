/*
---
description: C Language.

license: MIT-style

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.c]
...
*/
EnlighterJS.Language.c = new Class({
    
    Extends: EnlighterJS.Language.cpp,
    language: 'c',
        
    initialize: function(code, options) {
        
        
        this.parent(code, options);
    }
});
