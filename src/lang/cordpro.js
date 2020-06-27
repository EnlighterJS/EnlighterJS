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

// CordPro Highlighting (Unified format)
// Author: [Andi Dittrich]
// --
export class cordpro extends generic {

    setupLanguage() {

        this.rules = [

            // comments
            _language_common_rules.poundComments,

            // brackets
            _language_common_rules.brackets,

            // chords
            {
                regex : /\[(\w+)\]/gm,
                type : 'k9'
            },

            // metadata key:value
            {
                regex : /\{([\w_-]+)\s*(?::\s*(.*?))?}/gm,
                type : ['k7', 's0']
            }
        ];
    }
}