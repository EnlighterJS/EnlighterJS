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

// LUA http://www.lua.org/
// Author: [Andi Dittrich]
// --
export class lua extends generic {

    setupLanguage() {

        this.rules = [
            // special comments end (inline code enabled)
            {
                regex: /---\[\[[\s\S]*?(]])/g,
                type: 'c1'
            },

            // multi line comments
            {
                regex: /--\[\[[\s\S]*?]]/g,
                type: 'c1'
            },

            // single line comments
            {
                regex: /(--.*)$/gm,
                type: 'c0'
            },

            // single and double quoted strings
            _language_common_rules.dqStrings,
            _language_common_rules.sqStrings,

            // multi line strings
           {
               regex: /(\[(=*)\[[\S\s]*?]\2])/g,
               type: 's5'
            },

            // boolean expression
            {
                regex: /\b(true|false)\b/gi,
                type: 'e0'
            },

            // null expression
            {
                regex: /\b(nil)\b/gi,
                type: 'e1'
            },

            // variable type/initializations
            {
                regex: /\b(local)\b/g,
                type: 'k2'
            },

            // control keywords
            {
                regex: /\b(break|do|else|elseif|end|for|if|repeat|then|until|while)\b/g,
                type: 'k1'
            },

            // keywords
            {
                regex: /\b(function|return|and|in|or|not)\b/g,
                type: 'k0'
            },

            // brackets
            _language_common_rules.brackets,

            // all numbers are floats (real precision)
            _language_common_rules.floats,

            // general method calls
            _language_common_rules.mCalls,

            // general function calls
            _language_common_rules.fCalls
        ]
    }
}