/*
---
description: CSS (Cascading Style Sheets)

license: MIT-style

authors:
  - Andi Dittrich
  - Jose Prado

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.css]
...
*/
EnlighterJS.Language.css = new Class({
    
    Extends: EnlighterJS.Language.generic,
        
    setupLanguage: function() {
        
        this.keywords = {
        };
        
        this.patterns = {
            'comments2':     { pattern: /\/\*![\s\S]*?\*\//gm,                         alias: 'co2'},
            'comments':      { pattern: this.common.multiComments,                     alias: 'co1'},
            'strings':       { pattern: this.common.strings,                           alias: 'st0' },
            'selectors':     { pattern:  /(?:^|}|\/)\s*([^\\/{@]+)\s*\{/gi,            alias: 'kw1' },
            'directives':    { pattern:  /(@[a-z]+)\s+/gi,                             alias: 'kw2' },
            'rules':         { pattern: /([\w-]+)\s*:/g,                               alias: 'kw3' },
            'uri':           { pattern: /url\s*\([^\)]*\)/gi,                          alias: 'kw4' },
            'units':         { pattern: /\b(\d+[\.\d+-]?\s*(%|[a-z]{1,3})?)/gi,        alias: 'nu0' },
            'hexColors':     { pattern: /(#[A-F0-9]{3}([A-F0-9]{3})?)\b/gi,            alias: 'nu0' },
            'brackets':      { pattern: this.common.brackets,                          alias: 'br0'},
            'symbols':       { pattern: /,|\.|;|:|>/g,                                 alias: 'sy0'}
        };
    }
});
