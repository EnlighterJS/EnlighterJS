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

// YAML
// Author: [Andi Dittrich]
// --
export class yaml extends generic {

    setupLanguage() {

        this.rules = [
            // comments
            _language_common_rules.poundComments,

            // boolean expression
            _language_common_rules.boolean,

            // null expression
            _language_common_rules.null,

            // directives
            {
                regex: /^%[A-Z]+\s+.*$/gm,
                type: 'k4'
            },

            // types
            {
                regex: /\b!{1,2}[A-Z]+\b/gi,
                type: 'k5'
            },

            // variables/keys
            {
                regex: /\b[a-z][a-z0-9_-]*:/gim,
                type: 'k7'
            },

            // brackets
            {
                regex: /\{|}|\(|\)|\[|]/g,
                type: 'g1'
            },

            // block data (string)
            /*
            {
                regex: /\s+(?:>|\|)[\r|\n]+((?:\s+[^\r\n]+[\r|\n]+)+)/gi,
                type: 's5'
            },*/

            // quoted strings
            _language_common_rules.dqStrings,
            _language_common_rules.sqStrings,

            // floats/integer numbers
            _language_common_rules.floats,
            _language_common_rules.int
        ];
    }
}