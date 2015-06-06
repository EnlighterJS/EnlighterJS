/*
---
description: LESS (Cascading Style Sheets)

license: MIT-style

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.less]
...
*/
EnlighterJS.Language.less = new Class({
    
    Extends: EnlighterJS.Language.css,
        
    setupLanguage: function() {
        this.parent();

        this.keywords = Object.merge(this.keywords, {

        });

        this.patterns = Object.merge(this.patterns, {
            'vars': {
                pattern: /(@[\w_-]+:?)/gi,
                alias: 'kw4'
            },
            /*
            'fn': {
                pattern: /\b(\.?[\w_-]+)\s*\(/gm,
                alias: ''
            },
            'include': {
                pattern: /(\.[\w_-]+)\s*;/gm,
                alias: 'me0'
            },*/
            'symbols': {
                pattern: /,|\.|;|:|>|\+|\-|\*|\//g,
                alias: 'sy0'
            },
            'singleComments': {
                pattern: this.common.slashComments,
                alias: 'co1'
            }

        });
    }
});
