/*
---
description: JSON Object Highlighting

license: MIT-style

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.json]
...
*/
EJS.Language.json = new Class({
    
    Extends: EJS.Language.generic,
    
    setupLanguage: function()
    {
        this.keywords = {
            values: {
                csv: "true, false, null",
                alias: 'kw2'
            }
        };
        
        this.patterns = {
            'keys': {
                pattern: /("[^"\\\r\n]+?")\s*?:/gi,
                alias: 'kw1'
            },
            'strings': {
                pattern: this.common.strings,
                alias:   'st0'
            },
            'brackets': {
                pattern: this.common.brackets,
                alias:   'br0'
            },
            'numbers': {
                pattern: /\b((([0-9]+)?\.)?[0-9_]+([e][-+]?[0-9]+)?|0x[A-F0-9]+)\b/gi,
                alias:   'nu0'
            },
            'symbols': {
                pattern: /,|:/g,
                alias:   'sy0'
            }
        };
        
        this.delimiters = {

        };
    }
});
