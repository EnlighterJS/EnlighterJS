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

// Prolog
// Author: [Andi Dittrich]
// --
export class prolog extends generic {

    setupLanguage() {

        this.rules = [

            // single line comments
            {
                regex: /(%.*)$/gm,
                type: 'c0'
            },

            // multiline comments
            _language_common_rules.blockComments,

            // single and double quoted strings
            _language_common_rules.dqStrings,
            _language_common_rules.sqStrings,
            
            // term head
            {
                regex: /^(\w+)(?:\(.*?\))?\s*(?::-|\.)/gm,
                type: 'k9'
            },

            // boolean expression
            {
                regex: /\b(true|false|Yes|No|not|fail)\b/gi,
                type: 'e0'
            },

            // control keywords
            {
                regex: /\b(catch|throw|repeat)\b/g,
                type: 'k1'
            },

            // interactive mode
            {
                regex: /^(\?-)/g,
                type: 'k9'
            },

            // operator
            {
                regex: /\b(is)\b/g,
                type: 'k3'
            },

            // variables
            {
                regex: /[A-Z_][\w]*/g,
                type: 'k7'
            },

            // brackets
            _language_common_rules.brackets,

            // numbers
            _language_common_rules.floats,
            _language_common_rules.int,

            // general function calls
            _language_common_rules.fCalls
        ]
    }
}