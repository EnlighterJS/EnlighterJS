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

// Squirrel Language http://www.squirrel-lang.org/
// Author: [Andi Dittrich]
// --
export class squirrel extends generic {

    setupLanguage() {

        this.rules = [
            // strings - double quoted
            _language_common_rules.dqStrings,

            // char-numbers - chars handled as numbers
            {
                regex: _language_common_rules.sqStrings.regex,
                type: 'n0'
            },

            // properties
            _language_common_rules.prop,

            // slash style comments
            _language_common_rules.slashComments,

            // # style comments
            _language_common_rules.poundComments,

            // multi line comments
            _language_common_rules.blockComments,

            // brackets () {} [] <>
            _language_common_rules.brackets,

            // variable type/initializations
            {
                regex: /\b(const|enum|local)\b/g,
                type: 'k2'
            },

            // control keywords
            {
                regex: /\b(break|case|catch|continue|else|for|foreach|if|switch|while|try|do)\b/g,
                type: 'k1'
            },

            // keywords
            {
                regex: /\b(base|class|clone|constructor|default|extends|false|function|null|resume|return|static|this|throw|true|yield)\b/g,
                type: 'k0'
            },

            // operator
            {
                regex: /\b(delete|in|instanceof|typeof)\b/g,
                type: 'k3'
            },

            // method calls
            _language_common_rules.mCalls,

            // function calls
            _language_common_rules.fCalls,

            // octals
            _language_common_rules.octal,

            // numbers (hex)
            _language_common_rules.hex,

            // numbers (floats)
            _language_common_rules.floats,

            // numbers (int)
            _language_common_rules.int
        ];
    }
}
