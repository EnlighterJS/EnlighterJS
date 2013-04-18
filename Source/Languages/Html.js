/*
---
description: HTML language fuel.

license: MIT-style

authors:
  - Jose Prado
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.html]
...
*/
EnlighterJS.Language.html = new Class ({
    
    Extends: EnlighterJS.Language.xml,

    initialize: function(code, options) {
        this.parent(code, options);
    }
    
});
