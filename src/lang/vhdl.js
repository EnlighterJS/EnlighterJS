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

// VHDL Language Pattern
// Author: [Andi Dittrich]
// --
export class vhdl extends generic {

    setupLanguage(){

        this.rules = [
            // single line comments
            {
                regex: /((?:^\s*|\s+)--.*$)/gm,
                type: 'c0'
            },

            // directives
            {
                regex: /^\s*(?:use|library)\s*(\S+);/gim,
                type: 'k9'
            },

            // global function calls
            _language_common_rules.fCalls,

            // symbols
            {
                regex: /\*\*|\*|\/|\+|-|&|=|\/=|<|<=|>|>=/g,
                type: 'g0'
            },

            // vectors (double quotes)
            _language_common_rules.dqStrings,

            // single bit (single quotes)
            {
                regex: /('.')/g,
                type: 's0'
            },

            // brackets
            _language_common_rules.brackets,

            // variable type/initializations
            {
                regex: /\b(alias|array|variable|downto|range|to|type|units)\b/g,
                type: 'k2'
            },

            // types
            {
                regex: /\b(array|buffer|bus|file)\b/g,
                type: 'k5'
            },

            // control keywords
            {
                regex: /\b(if|else|elsif|end|for|while|loop|when|begin|block|case|exit|next|then)\b/g,
                type: 'k1'
            },

            // keywords
            {
                regex: /\b(access|after|all|architecture|attribute|assert|body|component|configuration|constant|disconnect|entity|function|generate|generic|group|guarded|impure|in|inertial|inout|is|label|library|linkage|literal|map|null|of|on|open|others|out|package|port|postponed|procedure|process|pure|record|return|select|severity|signal|shared|subtype|transport|unaffected|use|vaiable|with|wait|until)\b/g,
                type: 'k0'
            },

            // operator
            {
                regex: /\b(abs|not|mod|rem|sll|srl|sla|sra|rol|ror|and|or|nand|nor|xor|xnor|new)\b/g,
                type: 'k3'
            },

            // floats/integer numbers - scalar types
            _language_common_rules.floats
        ];
    }
}
