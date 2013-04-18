/*
---
description: XML language.

license: MIT-style

authors:
  - Jose Prado
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.xml]
...
*/
EnlighterJS.Language.xml = new Class ({
    
    Extends: EnlighterJS.Language,
    language: 'xml',
    tokenizerType: 'Xml',
    
    initialize: function(code, options) {

        // Common HTML patterns
        this.patterns = {
            'comments':    {pattern: /(?:\&lt;|<)!--[\s\S]*?--(?:\&gt;|>)/gim,          alias: 'co1'},
            'cdata':       {pattern: /(?:\&lt;|<)!\[CDATA\[[\s\S]*?\]\](?:\&gt;|>)/gim, alias: 'st1'},
            'closingTags': {pattern: /(?:\&lt;|<)\/[A-Z][A-Z0-9]*?(?:\&gt;|>)/gi,       alias: 'kw1'},
            'doctype':     {pattern: /(?:\&lt;|<)!DOCTYPE[\s\S]+?(?:\&gt;|>)/gim,       alias: 'st2'},
            'version':     {pattern: /(?:\&lt;|<)\?xml[\s\S]+?\?(?:\&gt;|>)/gim,       alias: 'kw2'}
        };
        
        this.parent(code, options);
    }
    
});
