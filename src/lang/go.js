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

// GOLANG Language
// Author: [Andi Dittrich]
// --
export class go extends generic {

    // language aliases
    static alias(){
        return ['golang'];
    }

    setupLanguage() {

        this.rules = [

            // strings
            _language_common_rules.dqStrings,
            _language_common_rules.bqStrings,
            
            // chars
            _language_common_rules.char,


            // boolean expression
            _language_common_rules.boolean,

            // null expression
            {
                regex: /\b(nil)\b/gi,
                type: 'e1'
            },

            // properties - render before keywords!
            _language_common_rules.prop,

            // variable type/initializations
            {
                regex: /\b(var)\b/g,
                type: 'k2'
            },

            // control keywords
            {
                regex: /\b(case|break|default|else|goto|switch|if|continue|for)\b/g,
                type: 'k1'
            },

            // keywords
            {
                regex: /\b(func|interface|select|defer|go|map|chan|package|fallthrough|range|import|return)\b/g,
                type: 'k0'
            },

            // special keywords
            {
                regex: /\b(iota)\b/g,
                type: 'k9'
            },

            // static types
            {
                regex: /\b(bool|string|u?int(8|16|32|64)?|uintptr|byte|rune|float32|float64|complex64|complex128)\b/g,
                type: 'k5'
            },

            // type initialization
            {
                regex: /\b(struct|type)\b/g,
                type: 'k2'
            },

            // qualifier/modifier
            {
                regex: /\b(const)\b/g,
                type: 'k8'
            },

            // method calls
            _language_common_rules.mCalls,

            // global function calls
            _language_common_rules.fCalls,

            // slash style comments
            _language_common_rules.slashComments,

            // multi line comments
            //_language_common_rules.blockComments,

            // octal - processed as int
            _language_common_rules.octal,

            // integers
            _language_common_rules.int,

            // complex numbers
            _language_common_rules.complex,

            // float numbers
            _language_common_rules.floats,

            // hex  - processed as int
            _language_common_rules.hex,

            // brackets
            _language_common_rules.brackets

        ]
    }
}