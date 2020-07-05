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

// RouterOS/SwitchOS Language
// Author: [Andi Dittrich]
// --
export class routeros extends generic {

    // language aliases
    static alias(){
        return ['mikrotik', 'mt', 'switchos', 'ros'];
    }

    setupLanguage() {

        this.rules = [

            // strings
            _language_common_rules.dqStrings,

            // multi line strings
            {
                regex: /("[\s\S]*?")/g,
                type: 's5'
            },

            // boolean expression
            {
                regex: /\b(yes|no)\b/gi,
                type: 'e0'
            },

            // key-value pairs
            {
                regex: /\b([\w-]+)(=)/gi,
                type: ['k6', 'k3']
            },

            // variable type/initializations
            {
                regex: /[^\b](:local|:global)\s/gm,
                type: 'k2'
            },

            // namespaces
            {
                regex: /^\/\w+(?:\s+[a-z-]+)*\s*$/gm,
                type: 'k10'
            },

            // special common keywords
            {
                regex: /\b(add|set|print|enable|disable|export|find|get|move|remove)\b/gi,
                type: 'k9'
            },

            // commands
            {
                regex: /[^\b](:[a-z-]+)\s/gm,
                type: 'k0'
            },

            // variables
            {
                regex: /\$[\w]*/gi,
                type: 'k7'
            },

            // mac addresses
            {
                regex: /(?:[a-f0-9]{2}:){5}(?:[a-f0-9]{2})/gi,
                type: 's0'
            },

            // ip4 addresses
            {
                regex: /(?:\d{1,3}\.){3}(?:\d{1,3})(?:\/\d{1,2})?/gi,
                type: 's0'
            },
            
            // regular comments
            _language_common_rules.poundComments,

            // units
            {
                regex: /[\b\W](-?\d+)([a-z]{1,4})?[\b\W]/gi,
                type: 'n0'
            },

            // numbers
            _language_common_rules.int,
            _language_common_rules.hex,

            // brackets
            _language_common_rules.brackets

        ]
    }
}