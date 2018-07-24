// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2018 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

// Generic Rules/Regex
import _language_common_rules from '../engine/generic-rules';
import {generic} from './generic';

// Generic SQL
// Author: [Andi Dittrich]
// --
export class sql extends generic {

    setupLanguage() {

        this.rules = [

            // general comments
            _language_common_rules.poundComments,
            _language_common_rules.blockComments,

            // null keywords
            _language_common_rules.null,

            // values
            _language_common_rules.sqStrings,

            // -- style comments
            {
                regex: /--.*$/g,
                type: 'c0'
            },

            // column name literals
            {
                regex: /`\w+?`(?:\.`\w+?`)*/g,
                type: 'k9'
            },

            // operators
            {
                regex: /\b(all|and|any|between|exists|in|like|not|or|is null|is not null|unique|=|!=|<>|>|<|>=|<=|!<|!>)\b/gi,
                type: 'k3'
            },

            // general keywords
            {
                regex: /\b[A-Z]+\b/g,
                type: 'k0'
            },

            // common keyword set
            {
                regex: /\b(SELECT|INSERT|UPDATE|DELETE|INTO|FROM|CREATE|TABLE|VIEW|TRIGGER|ALTER|ORDER BY|DESC|ASC|AS|BETWEEN|IN|JOIN|LEFT|RIGHT|INNER|OUTER|USING|ON)b/gi,
                type: 'k0'
            },

            // functions
            _language_common_rules.fCalls,

            // numbers
            _language_common_rules.floats
        ]
    }
}
