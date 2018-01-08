/*
---
description: Shell/Bash Scripting

license: MIT-style

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.shell]
...
*/
EJS.Language.shell = new Class ({
    
    Extends: EJS.Language.generic,
    
    setupLanguage: function(){
        this.keywords = {
            keywords: {
                csv: 'if, fi, then, elif, else, for, do, done, until, while, break, continue, case, esac, return, function, in, eq, ne, gt, lt, ge, le',
                alias: 'kw1'
            }
        };
        
        this.patterns = {
            'comments': {
                pattern: /((?:^\s*|\s+)#.*$)/gm,
                alias: 'co1'
            },
            'strings': {
                pattern: this.common.strings,
                alias: 'st0'
            },
            'backticks': {
                pattern: /`.*?`/gm,
                alias: 'st1'
            },
            'braces': {
                pattern: /=(\$\(.*?\))/gm,
                alias: "me1"
            },
            'cases': {
                pattern: /^\s*\w+\)\s*$/gm,
                alias: 'kw2'
            },
            'def': {
                pattern: /^(\s*\w+)=/gm,
                alias: 'kw4'
            },
            'vars': {
                pattern: /(\$(?:\{\w+\}|\w+))\b/gim,
                alias: 'kw4'
            },
            'functions': {
                pattern: /^\s*(?:function\b)?\w+\(\)\s*\{/gm,
                alias: 'kw3'
            }
        };
    }
});
