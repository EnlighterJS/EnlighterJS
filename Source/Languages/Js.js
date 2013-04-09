/*
---
description: JavaScript language fuel.

license: MIT-style

authors:
  - Jose Prado

requires:
  - Core/1.3
  - Fuel

provides: [Fuel.js]
...
*/
Fuel.js = new Class({
    
    Extends: Fuel,
    language: 'js',
    
    initialize: function(options)
    {
        this.keywords = {
            commonKeywords: {
                csv: "as, break, case, catch, continue, delete, do, else, eval, finally, for, if, in, is, item, instanceof, return, switch, this, throw, try, typeof, void, while, write, with",
                alias: 'kw1'
            },
            langKeywords: {
                csv: "class, const, default, debugger, export, extends, false, function, import, namespace, new, null, package, private, protected, public, super, true, use, var",
                alias: 'kw2'
            },
            windowKeywords: {
                csv: "alert, back, blur, close, confirm, focus, forward, home, navigate, onblur, onerror, onfocus, onload, onmove, onresize, onunload, open, print, prompt, scroll, status, stop",
                alias: 'kw3'
            }
        };
        
        this.patterns = {
            'slashComments': {
                pattern: this.common.slashComments,
                alias:   'co1'
            },
            'multiComments': {
                pattern: this.common.multiComments,
                alias:   'co2'
            },
            'strings': {
                pattern: this.common.strings,
                alias:   'st0'
            },
            'methodCalls': {
                pattern: this.common.properties,
                alias:   'me0'
            },
            'brackets': {
                pattern: this.common.brackets,
                alias:   'br0'
            },
            'numbers': {
                pattern: /\b((([0-9]+)?\.)?[0-9_]+([e][-+]?[0-9]+)?|0x[A-F0-9]+)\b/gi,
                alias:   'nu0'
            },
            'regex': {
                pattern: this.delimToRegExp("/", "\\", "/", "g", "[gimy]*"),
                alias:   're0'
            },
            'symbols': {
                pattern: /\+|-|\*|\/|%|!|@|&|\||\^|\<|\>|=|,|\.|;|\?|:/g,
                alias:   'sy0'
            }
        };
        
        this.delimiters = {
            start: this.strictRegExp('<script type="text/javascript">', '<script language="javascript">'),
            end:   this.strictRegExp('</script>')
        };
        
        this.parent(options);
    }
});
