/*
---
description: VHDL Language

license: MIT-style

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.vhdl]
...
*/
EJS.Language.vhdl = new Class ({
    
    Extends: EJS.Language.generic,
    
    setupLanguage: function(){
        this.keywords = {
            keywords: {
                csv: 'abs,access,after,alias,all,and,architecture,array,assert,attribute,begin,block,body,buffer,bus,case,component,configuration,constant,disconnect,downto,else,elsif,end,entity,exit,file,for,function,generate,generic,group,guarded,if,impure,in,inertial,inout,is,label,library,linkage,literal,loop,map,mod,nand,new,next,nor,not,null,of,on,open,or,others,out,package,port,postponed,procedure,process,pure,range,record,register,reject,rem,report,return,rol,ror,select,severity,signal,shared,sla,sll,sra,srl,subtype,then,to,transport,type,unaffected,units,until,use,variable,wait,when,while,with,xnor,xor',
                alias: 'kw1',
                mod: 'gi'
            },
            operators: {
                csv: 'abs,not,mod,rem,sll,srl,sla,sra,rol,ror,and,or,nand,nor,xor,xnor',
                alias: 'sy0'
            }
        };
        
        this.patterns = {
            'comments': {
                pattern: /((?:^\s*|\s+)--.*$)/gm,
                alias: 'co1'
            },

            'uses': {
                pattern: /^\s*(?:use|library)\s*(\S+);/gim,
                alias: 'kw4'
            },
            'functions': {
                pattern: this.common.functionCalls,
                alias: 'kw2'
            },
            operators: {
                pattern: /\*\*|\*|\/|\+|\-|&|=|\/=|<|<=|>|>=/g,
                alias: 'sy0'
            },
            'strings': {
                pattern: this.common.strings,
                alias: 'st1'
            },
            'numbers': {
                pattern: this.common.numbers,
                alias: 'nu0'
            },
            'brackets': {
                pattern: this.common.brackets,
                alias: 'br0'
            }
        };
    }
});
