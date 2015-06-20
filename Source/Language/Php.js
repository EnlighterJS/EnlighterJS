/*
---
description: PHP language

license: MIT-style

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.php]
...
*/
EnlighterJS.Language.php = new Class({
    
    Extends: EnlighterJS.Language.generic,
    tokenizerType : 'Standard',

    setupLanguage: function(){

        this.keywords = {
            // http://php.net/manual/en/reserved.keywords.php
            keywords: {
                csv: '__halt_compiler,abstract,and,as,break,callable,case,catch,class,clone,const,continue,declare,default,do,else,elseif,enddeclare,endfor,endforeach,endif,endswitch,endwhile,extends,final,finally,function,global,goto,implements,instanceof,insteadof,interface,namespace,new,or,private,protected,public,static,throw,trait,try,use,var,xor,yield',
                alias: 'kw1'
            },

            // http://php.net/manual/en/reserved.other-reserved-words.php
            reserved: {
                csv: 'int,float,bool,string,true,false,null,resource,object,mixed,numeric',
                alias: 'kw4',
                mod: 'gi'
            }
        };

        this.patterns = {
            'keywordsFn': {
                pattern: /(require_once|include_once|array|die|exit|echo|print|empty|eval|include|isset|list|require|unset|if|switch|while|foreach|for|return)(?:\s*\(|\s+)?/gi,
                alias: 'kw1'
            },
            inherit: {
                pattern: /(self|parent|\$this)/gi,
                alias: 'kw4'
            },

            'slashComments': { pattern: this.common.slashComments,                              alias: 'co1' },
            'multiComments': { pattern: this.common.multiComments,                              alias: 'co2' },

            'dqStrings':     { pattern: this.common.multiLineDoubleQuotedStrings,                           alias: 'st0' },
            'sqStrings':     { pattern: this.common.multiLineSingleQuotedStrings,                           alias: 'st1' },

            'heredocs':      { pattern: /(<<<\s*?('?)([A-Z0-9]+)\2[^\n]*?\n[\s\S]*?\n\3(?![A-Z0-9\s]))/gim, alias: 'st1' },

            'numbers':       { pattern: /\b((([0-9]+)?\.)?[0-9_]+([e][\-+]?[0-9]+)?|0x[A-F0-9]+)\b/gi,      alias: 'nu0' },

            'variables':     { pattern: /\$[A-Z_][\w]*/gim,                                     alias: 'kw3' },

            'functions':     { pattern: this.common.functionCalls,                              alias: 'me0' },
            'methods':       { pattern: /(?:->|::)([\w]+)/gim,                                  alias: 'me1' },

            'constants':     { pattern: /\b[A-Z][A-Z0-9_]+[A-Z]\b/g,                            alias: 'kw4' },
            'lconstants':     { pattern: /\b__[A-Z][A-Z0-9_]+__\b/g,                            alias: 're0' },

            'brackets':      { pattern: this.common.brackets,                                   alias: 'br0' },
            'symbols':       { pattern: /!|@|&|<|>|=|=>|-|\+/g,                                 alias: 'sy0' }
        };

        // Delimiters
        this.delimiters = {
            start: this.strictRegExp('<?php'),
            end:   this.strictRegExp('?>')
        };
    }
});
