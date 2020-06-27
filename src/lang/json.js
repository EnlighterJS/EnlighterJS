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

// JSON
// Author: [Andi Dittrich]
// --
export class json extends generic {

    setupLanguage() {

        this.rules = [
            // variable type/initializations
            {
                regex: /"(?:[^"\\]|\\.)*"\s*:/g,
                type: 'k2'
            },

            // strings
            _language_common_rules.dqStrings,

            // boolean expression
            _language_common_rules.boolean,

            // null expression
            _language_common_rules.null,

            // brackets
            {
                regex: /\{|}|\(|\)|\[|]/g,
                type: 'g1'
            },

            // floats/integer numbers
            _language_common_rules.int,
            _language_common_rules.floats,

            // symbols
            {
                regex: /,|:/g,
                type:   'g0'
            }
        ];
    }
}