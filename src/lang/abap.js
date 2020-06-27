// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2019 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

// Generic Rules/Regex
import _language_common_rules from './rulesets/generic';
import {generic} from './generic';

// ABAP File Highlighting
// Author: [Andi Dittrich]
// --
export class abap extends generic {

    setupLanguage() {

        this.rules = [
            // single quoted strings
            _language_common_rules.sqStrings,

            // template strings
            {
                regex: /\|.*?\|/g,
                type: 's2'
            },

            // quote style comments
            {
                regex: /(".*)$/gm,
                type: 'c0'
            },

            // * style comments
            {
                regex: /^\s*(\*.*)$/gm,
                type: 'c0'
            },

            // variable initialization
            {
                regex: /(data):?\s*(\w+)\s*/gi,
                type: ['k2', 'k7']
            },

            // variable types
            {
                regex: /(type)\s+(\w+)\s*/gi,
                type: ['k2', 'k5']
            },

            // boolean expressions
            {
                regex: /\b(abap_true|abap_false)\b/gi,
                type: 'e0'
            },

            // undefined
            {
                regex: /\b(abap_undefined)\b/gi,
                type: 'e1'
            },

            // keywords
            {
                regex: /\b[A-Z_][A-Za-z0-9_]*\b/g,
                type: 'k0'
            },

            // functions calls
            _language_common_rules.fCalls,

            // integer numbers
            _language_common_rules.int,

            // common brackets
            _language_common_rules.brackets
        ];
    }
}