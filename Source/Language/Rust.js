/*
---
description: Rust Language https://doc.rust-lang.org

license: MIT-style

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.rust]
...
*/
EJS.Language.rust = new Class({
    
    Extends: EJS.Language.generic,
        
    setupLanguage: function() {
        this.keywords = {
            // keywords: https://doc.rust-lang.org/syntax/parse/token/keywords/enum.Keyword.html
            kw: {
            	csv: "As,Break,Crate,Else,Enum,Extern,False,Fn,For,If,Impl,In,Let,Loop,Match,Mod,Move,Mut,Pub,Ref,Return,Static,SelfValue,SelfType,Struct,Super,True,Trait,Type,Unsafe,Use,Virtual,While,Continue,Box,Const,Where,Proc,Alignof,Become,Offsetof,Priv,Pure,Sizeof,Typeof,Unsized,Yield,Do,Abstract,Final,Override,Macro",
                alias: 'kw1',
                mod: 'gi'
            }
        };
        
        this.patterns = {
            'slashComments': { pattern: this.common.slashComments, alias: 'co1'},
            'multiComments': { pattern: this.common.multiComments, alias: 'co1'},

            'slashDocComments': { pattern: /(?:^|[^\\])\/\/[\/!].*$/gm, alias: 'co2'},
            'multiDocComments': { pattern: /\/\*[\*!][\s\S]*?\*\//gm, alias: 'co2'},

            'chars':         { pattern: /'.'/gm, alias: 'st0' },
            'rawStrings':       { pattern: /r((#+)".*?"\2)/gm, alias: 'st1' },
            'strings':       { pattern: /("(?:\\.|\\\s*\n|\\s*\r\n|[^\\"])*")/g, alias: 'st1' },

            'directives':	 { pattern: /^\s*#.*$/gm, alias: 'sy0'},
            'brackets':      { pattern: this.common.brackets, alias: 'br0' },

            // https://doc.rust-lang.org/stable/reference.html#integer-literals
            'intLiteral': { pattern: /\b([0-9_]+|0o[0-9_]+|0x[A-F0-9_]+|0b[0-1_]+)(u8|i8|u16|i16|u32|i32|u64|i64|isize|usize)?\b/gim, alias: 'nu0' },

            // https://doc.rust-lang.org/stable/reference.html#floating-point-literals
            'floatLiteral': { pattern: /\b([0-9_]+\.?[0-9_]+?(e\+[0-9_]+)?)(?:f32|f64)?\b/gim, alias: 'nu0' },

            // method definitions
            'methodDefs': {pattern:  /fn\s+([\w]+)\s*(<\w+\s*>)?\(/gm, alias: 'kw2'},

            // method/function calls
            'funCalls':  {pattern:  /\b\.?([\w]+)\s*(\(|::)/gm, alias: 'kw3'},

            // macro calls
            'macro':  {pattern:  /\b([\w]+)!/gm, alias: 'kw4'},

            'symbols': {
                pattern: /\+|-|\*|\/|%|!|@|&|\||\^|<|<<|>>|>|=|,|\.|;|\?|:|self/g,
                alias:   'sy0'
            }
        };
    }
});
