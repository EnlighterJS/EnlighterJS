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

//Bird Script Language
// Author: [Krishnavyshak R]
// -- 
export class birdscript extends generic {

    // language aliases
    static alias(){
        return ['bs'];
    }

    setupLanguage() {

        this.rules = [

            // multi line comment strings
            {
                regex: /^("""[\s\S]*?"""|'''[\s\S]*?''')/gm,
                type: 'c9'
            },

            // multi line strings
            {
                regex: /("""[\s\S]*?"""|'''[\s\S]*?''')/g,
                type: 's5'
            },

            // strings
            _language_common_rules.dqStrings,
            _language_common_rules.sqStrings,

            // class attributes
            {
                regex:  /\b(__[a-z]+__)\b/g,
                type: 'e3'
            },

            // namespace
            {
                regex: /[^;]\s*(from\s+)([\w.]+)(\s+import)/gi,
                type: ['k0', 'k10', 'k0']
            },

            // control keywords
            {
                regex: /\b(VAR|STR|IF|LEN|FUN|ELSE|ELIF|FOR|STEP|WHILE|THEN|RETURN|CONTINUE|BREAK)\b/g,
                type: 'k1'
            },

            // keywords
            {
                regex: /\b(POP|APPEND|LENG|WAIT|RAND|STR|QUIT|PRINT_END|LEN|PRINT|MATH_PI|PRINT_RET|INPUT|INPUT_INT|CLEAR|CLS|IS_NUM|IS_STR|IS_LIST|IS_FUN|EXTEND|RUN|HELP|GUIMAKER|QUIT)\b/g,
                type: 'k0'
            },

            // operator
            {
                regex: /\b(AND|OR|TO|END)\b/g,
                type: 'k3'
            },

            // boolean
            {
                regex: /\b(TRUE|FALSE)\b/g,
                type: 'e0'
            },

            // null
            {
                regex: /\b(NULL)\b/g,
                type: 'e1'
            },

            // method calls
            _language_common_rules.mCalls,

            // global function calls
            _language_common_rules.fCalls,

            // comments
            _language_common_rules.poundComments,

            // numbers
            _language_common_rules.int,
            _language_common_rules.hex,
            _language_common_rules.floats,
            _language_common_rules.octal,

            // brackets
            _language_common_rules.brackets


        ];
    }
}
