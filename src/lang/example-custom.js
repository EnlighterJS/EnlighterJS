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

// Language Example files
// Author: [Andi Dittrich]
// --
export class example extends generic {

    setupLanguage() {

        this.rules = [

            // strings
            _language_common_rules.sqStrings,
            _language_common_rules.dqStrings,

            // boolean expression
            _language_common_rules.boolean,

            // null expression
            _language_common_rules.null,

            // method calls
            _language_common_rules.mCalls,

            // properties
            _language_common_rules.prop,

            // global function calls
            _language_common_rules.fCalls,

            // control keywords
            {
                regex: /\b(as|break|case|catch|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|finally|for|foreach|goto|if|switch|throw|try|while)\b/g,
                type: 'k1'
            },

            // magic constants
            {
                regex:  /\b__[A-Z][A-Z0-9_]+__\b/g,
                type: 'e3'
            },

            // keywords
            // http://php.net/manual/en/reserved.keywords.php
            // http://php.net/manual/en/reserved.other-reserved-words.php
            {
                regex: /\b(abstract|array|callable|classe_once|instanceof|static|trait|use|var|yield)\b/g,
                type: 'k0'
            },

            // operator
            {
                regex: /\b(and|or|xor|clone|new|unset)\b/g,
                type: 'k3'
            },

            // slash style comments
            _language_common_rules.slashComments,

            // multi line comments
            _language_common_rules.blockComments,

            // variables
            {
                regex: /\$[A-Z_][\w]*/gim,
                type: 'k7'
            },

            // octal
            _language_common_rules.octal,

            // bin
            _language_common_rules.bin,

            // hex
            _language_common_rules.hex,

            // floats numbers
            _language_common_rules.floats,

            // brackets
            _language_common_rules.brackets

        ]
    }
}