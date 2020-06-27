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

// lighttpd config
// Author: [Andi Dittrich]
// --
export class nginx extends generic {

    // language aliases
    static alias(){
        return [];
    }

    setupLanguage(){

        this.rules = [

            // strings
            _language_common_rules.dqStrings,
            _language_common_rules.sqStrings,

            // pound style comments
            _language_common_rules.poundComments,

            // context
            {
                regex: /([a-z]+)\s*\{/g,
                type: 'k9'
            },

            // directives
            {
                regex: /^\s*([a-z]\w+)\s/gm,
                type: 'k0'
            },

            // uri schemes
            {
                regex: /\W([a-z]+:\/\/.*?);/g,
                type: 'k9'
            },

            // ipv4
            {
                regex: /\b(\d+\.\d+\.\d+\.\d+(?::\d+))\b/g,
                type: 'k9'
            },

            // vars $request
            {
                regex: /(?:\W)\$[a-z_]+/g,
                type: 'k7'
            },

            // units
            {
                regex: /[\b\W](\d+[kmgdyw])\b/g,
                type: 'n0'
            },

            // numbers
            _language_common_rules.int,

            // brackets
            _language_common_rules.brackets
        ];
    }
}
