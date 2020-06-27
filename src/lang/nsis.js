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

// Nullsoft Scriptable Install System (NSIS)
// Author: [Andi Dittrich; Jan T. Sott]
// --
export class nsis extends generic {

    setupLanguage() {

        this.rules = [

            _language_common_rules.dqStrings,
            _language_common_rules.sqStrings,
            _language_common_rules.bqStrings,

            // variable type/initializations
            {
                regex: /^\s*(Var(\s+\\GLOBAL)?)(\s+\w+)\b/g,
                type: ['k2', 'k7']
            },

            // defines
            {
                regex: /\W(\$\{\w+})\W/g,
                type: 'k9'
            },

            // variable usage
            {
                regex: /\W(\$\w+)\b/g,
                type: 'k7'
            },
            
            // commands
            {
                regex: /^\s*([A-Z]\w+)\s+/gm,
                type: 'k0'
            },

            // static constants
            {
                regex: /\b[A-Z][A-Z_]*[A-Z]\b/g,
                type: 'e3'
            },

            // compiler flags
            {
                regex: /^\s*(!\w+)\s+/gm,
                type: 'k4'
            },

            // labels (jump targets)
            {
                regex: /^\s*(\w+:)\s*$/gim,
                type: 'k6'
            },

            // states
            {
                regex: /\b(admin|all|auto|both|colored|false|force|hide|highest|lastused|leave|listonly|none|normal|notset|off|on|open|print|show|silent|silentlog|smooth|textonly|true|user)\b/gi,
                type: 'k9'
            },

            // comments
            _language_common_rules.blockComments,

            // pound + semicolon comment syntax
            {
                regex : /[#;].*?$/gm,
                type : 'c0'
            },

            // numbers
            _language_common_rules.int,
            _language_common_rules.hex,
            _language_common_rules.octal,


            _language_common_rules.brackets
        ];
    }
}
