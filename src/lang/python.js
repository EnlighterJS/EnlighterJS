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

// Python Language
// Author: [Andi Dittrich]
// --
export class python extends generic {

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
                regex: /\b(raise|while|try|if|for|finally|else|elif|continue|break)\b/g,
                type: 'k1'
            },

            // keywords
            {
                regex: /\b(yield|with|return|print|pass|lambda|is|in|import|global|from|exec|except|def|class|assert|as)\b/g,
                type: 'k0'
            },

            // operator
            {
                regex: /\b(and|or|not|del)\b/g,
                type: 'k3'
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