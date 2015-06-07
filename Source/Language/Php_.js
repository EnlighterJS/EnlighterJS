/*
---
description: PHP language

license: MIT-style

authors:
  - Jose Prado

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.php]
...
*/
EJS.Language.php = new Class({
    
    Extends: EJS.Language.generic,

    setupLanguage: function(){
        this.keywords = {
            keywords: {
                csv: "abstract, and, as, break, case, catch, cfunction, class, clone, const, continue, declare, default, do, else, elseif, enddeclare, endfor, endforeach, endif, endswitch, endwhile, extends, final, for, foreach, function, global, goto, if, implements, interface, instanceof, namespace, new, old_function, or, private, protected, public, static, switch, throw, try, use, var, while, xor",
                alias: 'kw1'
            },
            /*langConstants: {
                csv: "__CLASS__, __DIR__, __FILE__, __FUNCTION__, __METHOD__, __NAMESPACE__, DEFAULT_INCLUDE_PATH, E_ALL, E_COMPILE_ERROR, E_COMPILE_WARNING, E_CORE_ERROR, E_CORE_WARNING, E_ERROR, E_NOTICE, E_PARSE, E_STRICT, E_USER_ERROR, E_USER_NOTICE, E_USER_WARNING, E_WARNING, PEAR_EXTENSION_DIR, PEAR_INSTALL_DIR, PHP_BINDIR, PHP_CONFIG_FILE_PATH, PHP_DATADIR, PHP_EXTENSION_DIR, PHP_LIBDIR, PHP_LOCALSTATEDIR, PHP_OS, PHP_OUTPUT_HANDLER_CONT, PHP_OUTPUT_HANDLER_END, PHP_OUTPUT_HANDLER_START, PHP_SYSCONFDIR, PHP_VERSION",
                alias: 'kw1'
            },*/
            constructs: {
                csv: "array, die, echo, empty, exit, eval, include, include_once, isset, list, require, require_once, return, print, unset",
                alias: 'kw1'
            }
        };
        
        this.patterns = {
            'slashComments': { pattern: this.common.slashComments, alias: 'co1' },
            'multiComments': { pattern: this.common.multiComments, alias: 'co2' },
            'strings':       { pattern: this.common.multiLineStrings,       alias: 'st0' },
            'heredocs':      { pattern: /(<<<\s*?(\'?)([A-Z0-9]+)\2[^\n]*?\n[\s\S]*?\n\3(?![A-Z0-9\s]))/gim, alias: 'st1' },
            'numbers':       { pattern: /\b((([0-9]+)?\.)?[0-9_]+([e][\-+]?[0-9]+)?|0x[A-F0-9]+)\b/gi,       alias: 'nu0' },
            'variables':     { pattern: /[\$]{1,2}[A-Z_][\w]*/gim, alias: 'kw3' },
            'functions':     { pattern: this.common.functionCalls, alias: 'me1' },
            'constants':     { pattern: /\b[A-Z0-9_]+\b/g,     alias: 'kw4' },
            'methods':       { pattern: /->([\w]+)/gim,            alias: 'kw3' },
            'brackets':      { pattern: this.common.brackets,      alias: 'br0' }
            //'symbols':     { pattern: /!|@|%|&|\||\/|<|>|=|-|\+|\*|\.|:|,|;/g, alias: 'sy0' }
        };
        
        // Delimiters
        this.delimiters = {
            start: this.strictRegExp('<?php', '<?=', '<%'),
            end:   this.strictRegExp('?>', '%>')
        };
        
    }
});
