// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2020 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

// Generic Rules/Regex
import _language_common_rules from './rulesets/generic';
import {generic} from './generic';

// LaTeX Highlighting
// Author: [Andi Dittrich]
// --
export class latex extends generic {

    // language aliases
    static alias(){
        return ['tex'];
    }    

    setupLanguage() {

        this.rules = [
            // % styles comments
            {
                regex: /(?:^|[^\\])%.*$/gm,
                type: 'c0'
            },

            // commands
            {
                regex: /(?:^|[^\\])(\\\w+)(?:[\W\s])/gm,
                type: 'k0'
            },

            // inline math delimiter
            {
                regex: /[$()]/g,
                type: ['s3']
            },

            // numbers
            _language_common_rules.int,
            _language_common_rules.floats, 

            // brackets
            _language_common_rules.brackets

        ];
    }
}













