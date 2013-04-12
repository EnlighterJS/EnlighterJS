/*
---
description: HTML language fuel.

license: MIT-style

authors:
  - Jose Prado
  - Andi Dittrich

requires:
  - Core/1.4.5
  - Language

provides: [Language.html]
...
*/
Language.html = new Class ({
    
    Extends: Language.xml,

    initialize: function(code, options) {
        this.parent(code, options);
    }
    
});
