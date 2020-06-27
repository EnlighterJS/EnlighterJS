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

// AVR Assembly Syntax
// Author: [Andi Dittrich]
// --
export class avrassembly extends generic{

    // language aliases
    static alias(){
        return ['avrasm'];
    }

    setupLanguage() {

        this.rules = [
            // singleLineComments - comments start with a semicolon (only single line comments available)
            {
                regex: /(;.*)$/gm,
                type: 'co0'
            },

            // "strings" may used in some assemblers for char constants
            _language_common_rules.sqStrings,
            _language_common_rules.dqStrings,

            // available directives: BYTE,CSEG,DB,DEF,DEVICE,DSEG,DW,ENDMACRO,EQU,ESEG,EXIT,INCLUDE,LIST,LISTMAC,MACRO,NOLIST,ORG,SET
            {
                regex: /^\s*?\.\w+\s+/gm,
                type: 'kw4'
            },

            // register
            {
                regex: /\b(r\d{1,2})/gi,
                type: 'kw0'
            },

            // macro parameter
            {
                regex: /(@[0-9])/gi,
                type: 'k2'
            },

            // labels
            {
                regex: /^\s*?(\w+:)\s*?/gm,
                type: 'kw6'
            },

            // instructions
            {
                regex: /(^|:)\s*?(\w+)\s+/gm,
                type: 'kw0'
            },

            // Hexadecimal (two notations): 0x0a, $0a, 0xff, $ff
            {
                regex: /(0x[A-F0-9]+|\$[A-F0-9]+)/gi,
                type: 'nu2'
            },

            // Binary Numbers
            _language_common_rules.bin,

            // Integers/Decimals
            _language_common_rules.int,

            // functions e.g. LOW(), HIGH() ..
            _language_common_rules.fCalls,

            // io register alias e.g. DDRA, PORTB, TIMSK
            {
                regex: /\b[A-Z]{2,}[0-9]?[0-9]?\b/g,
                type: 'kw9'
            }

        ];
    }
}