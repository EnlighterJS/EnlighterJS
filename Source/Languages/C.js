/*
---
description: C Language.

license: MIT-style

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [Language.c]
...
*/
Language.c = new Class({
    
    Extends: Language.cpp,
    language: 'c',
        
    initialize: function(code, options) {
        
      
        
        
        this.parent(code, options);
    }
});
