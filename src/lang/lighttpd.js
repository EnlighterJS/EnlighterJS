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
export class lighttpd extends generic {

    // language aliases
    static alias(){
        return [];
    }

    setupLanguage(){

        this.rules = [

            // strings
            _language_common_rules.dqStrings,

            // pound style comments
            _language_common_rules.poundComments,

            // properties
            {
                regex: /[\w\])]\.([\w-]+)\b/g,
                type: 'm3'
            },

            // control keywords
            {
                regex: /\b(else)\b/g,
                type: 'k1'
            },

            // vars %{HTTPS}
            {
                regex: /\s\$[A-Z_]+/g,
                type: 'k7'
            },

            // operator
            {
                regex: /(==|!=|=~|!~)/g,
                type: 'k3'
            },

            // module config
            {
                regex: /\b(\w[\w-]+)\.\w/g,
                type: 'k9'
            },

            // numbers
            _language_common_rules.int,

            // brackets
            _language_common_rules.brackets
        ];
    }
}
