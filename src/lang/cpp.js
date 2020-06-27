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

// C/C++ Language
// Author: [Andi Dittrich]
// --
export class cpp extends generic {

    // language aliases
    static alias(){
        return ['c++', 'c'];
    }

    setupLanguage() {

        this.rules = [

            // strings
            _language_common_rules.dqStrings,
            
            // chars
            _language_common_rules.char,

            // annotations
            {
                regex: /@[\W\w_][\w]+/gm,
                type: 'k11'
            },

            // boolean expression
            _language_common_rules.boolean,

            // null expression
            _language_common_rules.null,

            // properties - render before keywords!
            _language_common_rules.prop,

            // directives
            {
                regex: /#.*$/gm,
                type: 'k4'
            },

            // control keywords
            {
                regex: /\b(break|case|catch|continue|do|else|for|if|goto|switch|try|throw|while)\b/g,
                type: 'k1'
            },

            // compile time constants constants
            {
                regex:  /\b(__[A-Z][A-Z0-9_]+__|__cplusplus)\b/g,
                type: 'e3'
            },

            // generic types like uint16_t
            {
                regex: /\b(\w+\d+?_t)\b/g,
                type: 'k5'
            },

            // static types
            {
                regex: /\b(bool|char|double|float|int|long|short|void)\b/g,
                type: 'k5'
            },

            // type initialization
            {
                regex: /\b(enum|struct|typedef|union)\b/g,
                type: 'k2'
            },

            // qualifier/modifier
            {
                regex: /\b(const|volatile|unsigned|signed|restrict)\b/g,
                type: 'k8'
            },

            // keywords
            {
                regex: /\b(asm|auto|class|auto|default|explicit|export|extern|friend|inline|thread_local|static_assert|nullptr|noexcept|friend|decltype|constexpr|alignof|alignas|virtual|using|typename|typeid|this|template|static|return|register|public|protected|private|operator|namespace|mutable|inline)\b/g,
                type: 'k0'
            },

            // operator
            {
                regex: /\b(new|delete|cast|const_cast|dynamic_cast|static_cast|reinterpret_cast|sizeof|and|bitand|and_eq|not|not_eq|or|bitor|or_eq|xor|xor_eq|compl)\b/g,
                type: 'k3'
            },

            // method calls
            _language_common_rules.mCalls,

            // global function calls
            _language_common_rules.fCalls,

            // slash style comments
            _language_common_rules.slashComments,

            // multi line comments
            _language_common_rules.blockComments,

            // octal
            _language_common_rules.octal,

            // bin
            _language_common_rules.bin,

            // hex
            _language_common_rules.hex,

            // floats numbers
            _language_common_rules.floats,

            // brackets
            _language_common_rules.brackets

        ]
    }
}