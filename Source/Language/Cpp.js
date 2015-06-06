/*
---
description: C/C++ Language

license: MIT-style

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.cpp]
...
*/
EJS.Language.cpp = new Class({
    
    Extends: EJS.Language.generic,
        
    setupLanguage: function() {
        this.keywords = {
            cpp: {
            	csv: "and,and_eq,asm,auto,bitand,bitor,bool,break,case,catch,char,class,compl,const,const_cast,continue,default,delete,do,double,dynamic_cast,else,enum,explicit,export,extern,false,float,for,friend,goto,if,inline,int,long,mutable,namespace,new,not,not_eq,operator,or,or_eq,private,protected,public,register,reinterpret_cast,return,short,signed,sizeof,static,static_cast,struct,switch,template,this,throw,true,try,typedef,typeid,typename,union,unsigned,using,virtual,void,volatile,wchar_t,while,xor,xor_eq",
                alias: 'kw1'
            },
            cppX11: {
            	csv: "alignas,alignof,char16_t,char32_t,constexpr,decltype,noexcept,nullptr,static_assert,thread_local",
                alias: 'kw4'
            },
            directives: {
            	csv: "__LINE__,__FILE__,__DATE__,__TIME__,__cplusplus",
            	alias: 'kw2'
            }
        };
        
        this.patterns = {
            'slashComments': { pattern: this.common.slashComments, alias: 'co1'},
            'multiComments': { pattern: this.common.multiComments, alias: 'co2'},
            'chars':         { pattern: this.common.singleQuotedString, alias: 'st0' },
            'strings':       { pattern: this.common.doubleQuotedString, alias: 'st1' },
            'annotation':    { pattern: /@[\W\w_][\w\d_]+/gm, alias: 'st1' },
            'numbers':       { pattern: /\b((([0-9]+)?\.)?[0-9_]+([e][-+]?[0-9]+)?|0x[A-F0-9]+|0b[0-1_]+)\b/gim, alias: 'nu0' },
            'properties':    { pattern: this.common.properties, alias: 'me0' },
            'brackets':      { pattern: this.common.brackets, alias: 'br0' },
            'functionCalls': { pattern: this.common.functionCalls, alias: 'de1'},
            'directives':	 { pattern: /#.*$/gm, alias: 'kw2'}
        };
    }
});
