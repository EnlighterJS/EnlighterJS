// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2018 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

// Generic Rules/Regex
import _language_common_rules from './rulesets/generic';
import {generic} from './generic';

// Visual Basic Language
// Author: [Andi Dittrich]
// --
export class visualbasic extends generic {

    // language aliases
    static alias(){
        return ['vb'];
    }

    setupLanguage() {

        this.rules = [

            // strings
            _language_common_rules.dqStrings,

            // boolean
            _language_common_rules.boolean,

            // properties - render before keywords!
            _language_common_rules.prop,

            // directives
            {
                regex: /(#.*?)(?:'|$)/gim,
                type: 'k4'
            },

            // control keywords
            {
                regex: /\b(Case|Catch|Continue|Each|Else|ElseIf|End|EndIf|Do|Finally|For|If|Loop|Next|OrElse|Then|Throw|Try|When|While)\b/g,
                type: 'k1'
            },

            // namespace module imports
            {
                regex: /(Imports )(.*?)$/gm,
                type: ['k0', 'k10']
            },

            // static types
            {
                regex: /\b(Boolean|Byte|CBool|CByte|CChar|CDate|CDbl|CDec|Char|CInt|CLng|CObj|CSByte|CShort|CSng|CStr|CType|CUInt|CULng|CUShort|Decimal|Double|Integer|Long|ParamArray|SByte|Short|Single|String|UInteger|ULong|UShort)\b/g,
                type: 'k5'
            },

            // type initialization
            {
                regex: /\b(Dim|Enum|Let|ReDim)\b/g,
                type: 'k2'
            },

            // qualifier/modifier
            {
                regex: /\b(Const|Shared|Static)\b/g,
                type: 'k8'
            },

            // keywords
            {
                regex: /\b(AddHandler|AddressOf|Alias|As|ByRef|ByVal|Call|Class|Date|Declare|Default|Delegate|DirectCast|Erase|Error|Event|Exit|Friend|Function|Get|GetType|GetXMLNamespace|Global|GoSub|GoTo|Handles|Implements|In|Inherits|Interface|Lib|Like|Me|Module|MustInherit|MustOverride|MyBase|MyClass|Namespace|Narrowing|Nothing|NotInheritable|NotOverridable|Object|Of|On|Operator|Option|Optional|Out|Overloads|Overridable|Overrides|Partial|Private|Property|Protected|Public|RaiseEvent|ReadOnly|REM|RemoveHandler|Resume|Return|Select|Set|Shadows|Step|Stop|Structure|Sub|SyncLock|To|TryCast|Using|Variant|Wend|Widening|With|WithEvents|WriteOnly)\b/gi,
                type: 'k0'
            },

            // operator
            {
                regex: /\b(And|AndAlso|Is|IsNot|Mod|New|Not|Or|TypeOf|Xor)\b/g,
                type: 'k3'
            },

            // method calls
            _language_common_rules.mCalls,

            // global function calls
            _language_common_rules.fCalls,

            // single line comments
            {
                regex: /'.*$/gm,
                type: 'c0'
            },

            // inetgers
            _language_common_rules.int,

            // floatss
            _language_common_rules.floats,

            // brackets
            _language_common_rules.brackets

        ]
    }
}