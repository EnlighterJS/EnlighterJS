// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2022 Andi Dittrich <https://andidittrich.com>
// ----------------------------------------------------------------------

// Generic Rules/Regex
import _language_common_rules from './rulesets/generic';
import {generic} from './generic';

// Windows batch Scripting
// Author: [Andi Dittrich]
// --
export class batch extends generic {

    // language aliases
    static alias(){
        return ['bat', 'cmd'];
    }

    setupLanguage() {

        this.rules = [
            // strings
            _language_common_rules.dqStrings,
            
            // REM comments
            {
                regex: /(?:^|\b)(REM)(.*)?$/gim,
                type: ['k0', 'c0']
            },

            // Label comments
            {
                regex: /^(::.*)$/gim,
                type: 'c0'
            },

            // scape sequence
            {
                regex: /%%\w+/gi,
                type: 's4'
            },

            // arguments
            {
                regex: /(%[\d*])\b/gi,
                type: 'k9'
            },

            // variables
            {
                regex: /(%\w+%)/gi,
                type: 'k7'
            },
            
            // variable assignment
            {
                regex: /\b(\w+)=/gi,
                type: ['k0', 'k7']
            },

            // flags
            {
                regex: /\s(\/\w)\s/gi,
                type: 'k8'
            },

            // echo
            {
                regex: /\b(echo)\s+(.*)$/gim,
                type: ['k1', 'text']
            },

            // cases/labels
            {
                regex: /\s*(:[\w_]+)\s*/gi,
                type: 'k6'
            },

            // jump to label
            {
                regex: /\b(goto)\s+([\w_]+)\b/gi,
                type: ['k1', 'k6']
            },

            // control keywords
            {
                regex: /\b(if|else|for|in|do|echo|goto)\b/gi,
                type: 'k1'
            },

            // general keywords
            {
                regex: /\b(set)\b/gi,
                type: 'k0'
            },

            // operator
            {
                regex: /\b(not@equ)\b/gi,
                type: 'k3'
            },

            // boolean
            {
                regex: /\b(on|off)\b/gi,
                type: 'e0'
            },

            // null
            {
                regex: /\b(nul)\b/gi,
                type: 'e1'
            },
            
            // method calls
            _language_common_rules.mCalls,

            // numbers
            _language_common_rules.int
        ];
    }
}