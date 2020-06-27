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

// Swift Language Pattern
// Author: [Andi Dittrich]
// --
export class swift extends generic{

    setupLanguage(){


        this.rules = [

            // strings
            _language_common_rules.dqStrings,

            // boolean valies
            _language_common_rules.boolean,

            // directives
            {
                regex: /#.*$/gm,
                type: 'k4'
            },

            // properties - render before keywords!
            _language_common_rules.prop,

            // namespace module imports
            {
                regex: /(import )(.*?)$/gm,
                type: ['k0', 'k10']
            },

            // null expression
            {
                regex: /\b(nil)\b/gi,
                type: 'e1'
            },

            // control keywords
            {
                regex: /\b(break|case|continue|default|do|else|for|if|switch|while|catch|throw|try)\b/g,
                type: 'k1'
            },

            // variable/constant initializations
            {
                regex: /\b(var|let|enum|struct)\b/g,
                type: 'k2'
            },

            // static types
            {
                regex: /\b(Int|UInt|Float|Double|Bool|String|Character|Optional|Array|Dictionary)\b/g,
                type: 'k5'
            },

            // keywords
            {
                regex: /\b(associatedtype|class|deinit|extension|func|init|inout|internal|operator|private|protocol|public|static|subscript|typealias|defer|fallthrough|guard|in|as|repeat|return|where|dynamicType|is|rethrows|super|self|Self|throws|associativity|convenience|dynamic|didSet|final|get|infix|indirect|lazy|left|mutating|none|nonmutating|optional|override|postfix|precedence|prefix|Protocol|required|right|set|Type|unowned|weak|willSet)\b/g,
                type: 'k0'
            },


            // method calls
            _language_common_rules.mCalls,

            // global function calls
            _language_common_rules.fCalls,

            // slash style doc comments
            {
                regex: /(?:^|[^\\])\/\/\/.*$/gm,
                type: 'c2'
            },

            // multi line doc comments
            _language_common_rules.docComments,

            // slash style comments
            _language_common_rules.slashComments,

            // multi line comments
            _language_common_rules.blockComments,

            // binary numbers: 0b10001001
            {
                regex: /[\b\W](-?0b[01_]+)\b/gi,
                type: 'n3'
            },

            // hex numbers: 0x21F1A9
            {
                regex: /[\b\W](-?0x[A-F0-9_]+)(?!\.)\b/gi,
                type: 'n2'
            },

            // octal numbers: 07172
            {
                regex: /[\b\W](-?0o[0-7_]+)(?!\.)\b/g,
                type: 'n4'
            },

            // integers (non word boundary!): -1234
            {
                regex: /[\b\W](-?[\d_]+)(?!\.)\b/g,
                type: 'n1'
            },

            // floats
            {
                regex: /(-?(?:[\d_]+\.[\d_]+(?:e[+-]?[\d_]+)?))/gi,
                type: 'n0'
            },

            // hex floats
            {
                regex: /(-?0x(?:[A-F0-9_]+\.[A-F0-9_]+(?:p[+-]?[A-F0-9_]+)?))/gi,
                type: 'n2'
            },

            // brackets
            _language_common_rules.brackets

        ];
    }
}
