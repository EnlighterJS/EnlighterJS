// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2018 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

// Generic Rules/Regex
import _language_common_rules from '../engine/generic-rules';
import {generic} from './generic';

// PureBasic Language
// Author: [Guillaume Philippot]
// --
export class purebasic extends generic {

    // language aliases
    static alias() {
        return ['pb'];
    }

    setupLanguage() {

        this.rules = [

            // double quoted strings
            _language_common_rules.dqStrings,

            // common used brackets: () []
            {
                regex: /[[\]()]+/g,
                type: 'g0'
            },

            // constants
            {
                regex: /#\w+/gim,
                type: 'g0'
            },

            // addresses
            {
                regex: /[@?]\w+/gim,
                type: 'g1'
            },

            // namespace module imports
            {
                regex: /(IncludeFile|XIncludeFile|IncludeBinary|IncludePath) (.*?)$/gim,
                type: 'k0'
            },

            // control keywords
            {
                regex: /\b(Break|Case|Continue|Default|Else|ElseIf|End|EndIf|EndSelect|For|ForEver|ForEach|Gosub|Goto|If|Next|Repeat|Return|FakeReturn|Select|Until|Wend|While)\b/gi,
                type: 'k1'
            },

            // keywords
            {
                regex: /\b(Array|List|Map|Procedure(?:C|Dll|CDll)?|ProcedureReturn|EndProcedure|Declare(?:C|Dll|CDll)?|ImportC?|EndImport|As|Interface|Extends|EndInterface|Macro|MacroExpandedCount|EndMacro|UndefineMacro|DeclareModule|EndDeclareModule|Module|EndModule|UseModule|UnuseModule|To|Step|Structure(?:Union)?|EndStructure(?:Union)?|With|EndWith|PrototypeC?|Runtime|Swap|Data|DataSection|EndDataSection|Read|Restore)\b/gi,
                type: 'k2'
            },

            // type initialization
            {
                regex: /\b(Dim|Enumeration|EndEnumeration|ReDim|NewList|NewMap)\b/gi,
                type: 'k2'
            },

            // qualifier/modifier
            {
                regex: /\b(Define|Global|Protected|Shared|Static|Threaded)\b/gi,
                type: 'k3'
            },

            // type initialization
            {
                regex: /[\w\])]\.(s{\d+}|(?:p-ascii|p-utf8|p-bstr|p-unicode|p-variant)|\w+)(?:\([\d,]*\))?/gi,
                type: 'k4'
            },

            // compiler directives
            {
                regex: /\b(CompilerIf|CompilerElse|CompilerElseIf|CompilerEndIf|CompilerSelect|CompilerCase|CompilerDefault|CompilerEndSelect|CompilerError|CompilerWarning|EnableExplicit|DisableExplicit|EnableASM|DisableASM|EnableDebugger|DisableDebugger|Debug|DebugLevel|CallDebugger)\b/gi,
                type: 'k5'
            },

            // boolean operator
            {
                regex: /\W(And|Not|Or|Xor)\W/gi,
                type: 'k6'
            },

            // arithemtic operator
            {
                regex: /(<=|=<|>=|=>|<>|<<|>>|=|\+|(?<!(?:[(,=<>+/*\-%&|!~:]|case|if|elseif|to|step|while|until|select|and|or|xor|not|procedurereturn|debug|debuglevel)\s*)-|\*|\/|<|>|(?!%[01])%|&|\||!|~)/gi,
                type: 'k6'
            },

            // module prefix
            {
                regex: /(\w+)::/gi,
                type: 'k7'
            },
            
            // labels
            {
                regex: /(\w+):/gi,
                type: 'k8'
            },            

            // function calls
            {
                regex: /\b(?<!(?:\.|Dim|NewList|NewMap)\s*)([\w]+)\(/gim,
                type: 'm0'
            },

            // single line comments
            {
                regex: /;.*$/gm,
                type: 'c0'
            },

            // integers
            _language_common_rules.int,

            // floats
            _language_common_rules.floats,

            // hex numbers: $21F1A9
            {
                regex: /[\b\W](-?\$[A-F0-9]+)\b/gi,
                type: 'n2'
            },

            // binary numbers: %10001001
            {
                regex: /[\b\W](-?%[01]+)\b/gi,
                type: 'n3'
            },

            // prop
            {
                regex: /\\(\w+)\b/g,
                type: 'm3'
            },
        ]
    }
}