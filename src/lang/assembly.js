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

// General Assembly Syntax
// Author: [Andi Dittrich]
// --
export class assembly extends generic {

    // language aliases
    static alias(){
        return ['asm'];
    }

    setupLanguage(){

        this.rules = [
            // singleLineComments - comments start with a semicolon (only single line comments available)
            {
                regex: /(;.*)$/gm,
                type: 'co0'
            },

            // controls - used e.g. in KEIL
            {
                regex: /(\$.*)$/gm,
                type: 'k4'
            },

            // "strings" may used in some assemblers for char constants
            _language_common_rules.sqStrings,
            _language_common_rules.dqStrings,

            // general instructions (followed after a label or at a new line)
            {
                regex: /(^|:)\s*?(\w+)\s+/gm,
                type: 'k0'
            },

            // labels (jump targets)
            {
                regex: /^\s*?([A-Z?_][A-Z0-9?_]+:)\s*?/gim,
                type: 'k6'
            },

            // indirect addresses starts with @
            {
                regex: /@\w+/gi,
                type: 'k9'
            },

            // immediate data
            {
                regex: /#\w+/gi,
                type: 'k9'
            },

            // Hexadecimal (two notations): 0aH  (8051 asm)
            {
                regex: /[A-F0-9][A-F0-9$]+?H/gi,
                type: 'n2'
            },

            // Decimal: \d+  (8051 asm)
            {
                regex: /\d[\d$]+?D/gi,
                type: 'n1'
            },

            // Binary: 0b00001010, 0b11111111 (8051 asm)
            {
                regex: /[01][01$]+?B/gi,
                type: 'n3'
            },

            // Octals: 1767q (8051 asm)
            {
                regex: /[0-7][0-7$]+?(?:Q|O)/gi,
                type: 'nu4'
            },

            // Hexadecimal2 (two notations): 0x0a, $0a, 0xff, $ff (generic)
            {
                regex: /(0x[A-F0-9]+|\$[A-F0-9]+)/gi,
                type: 'n2'
            },

            // Binary: 0b00001010, 0b11111111 (generic)
            {
                regex: /(0b[01]+)/g,
                type: 'n3'
            },

            // Decimal: \d+ (generic)
            {
                regex: /\b(\d+)/g,
                type: 'n1'
            },

            // e.g. LOW(), HIGH() ..
            _language_common_rules.fCalls

        ];
    }
}
