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

// Ini/Config File Highlighting
// Author: [Andi Dittrich]
// --
export class ini extends generic {

    // language aliases
    static alias(){
        return ['conf', 'cnf'];
    }

    setupLanguage() {

        this.rules = [
            // strings
            _language_common_rules.dqStrings,

            // semicolon style comments
            {
                regex: /(;.*)$/gm,
                type: 'c0'
            },

            // pound style comments
            _language_common_rules.poundComments,

            // sections
            {
                regex: /^\s*?(\[.*])\s*?$/gm,
                type: 't2'
            },

            // variable assignments/initialization
            {
                regex: /^(\s*?[a-z0-9._-]+\s*?)(=)/gim,
                type: ['k2', 'k3']
            },

            // boolean expressions
            {
                regex: /\b(true|false|on|off|yes|no)\b/gim,
                type: 'e0'
            },

            // octals
            _language_common_rules.octal,

            // bin
            _language_common_rules.bin,

            // hex
            _language_common_rules.hex,

            // floats/integer numbers
            _language_common_rules.floats,

            // common brackets
            _language_common_rules.brackets
        ];
    }
}