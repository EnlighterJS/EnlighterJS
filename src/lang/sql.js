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

// Generic SQL
// Author: [Andi Dittrich]
// --
export class sql extends generic {

    setupLanguage() {

        this.rules = [

            // multiline comments 
            _language_common_rules.blockComments,
            
            // -- style comments
            {
                regex: /--.*$/gm,
                type: 'c0'
            },

            // null keywords
            _language_common_rules.null,

            // values
            _language_common_rules.sqStrings,

            // constraints
            {
                regex: /\b(NOT NULL|UNIQUE|PRIMARY KEY|FOREIGN KEY|CHECK|DEFAULT|INDEX)\b/gi,
                type: 'k4'
            },

            // column name literals
            {
                regex: /`\S+?`(?:\.`\S+?`)*/g,
                type: 'k9'
            },

            // operators
            {
                regex: /\b(all|and|any|between|exists|in|like|not|or|is null|is not null|=|!=|<>|>|<|>=|<=|!<|!>)\b/gi,
                type: 'k3'
            },

            // common keyword set
            {
                regex: /\b(SELECT|INSERT|UPDATE|DELETE|INTO|FROM|CREATE|TABLE|VIEW|WHERE|TRIGGER|ALTER|ORDER BY|DESC|ASC|AS|BETWEEN|JOIN|LEFT|RIGHT|INNER|OUTER|USING|ON|UNION)\b/gi,
                type: 'k0'
            },

            // general keywords (uppercase)
            {
                regex: /\b[A-Z]+\b/g,
                type: 'k0'
            },


            // numbers
            _language_common_rules.int,
            _language_common_rules.floats
        ]
    }
}
