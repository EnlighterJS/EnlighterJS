// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2019 Andi Dittrich <https://andidittrich.de>
// Copyright 2019 Yunhao Tian
// ----------------------------------------------------------------------

// Generic Rules/Regex
import _language_common_rules from './rulesets/generic';
import {generic} from './generic';

// Verilog HDL Language
// Author: [Yunhao Tian]
// --
export class verilog extends generic {

    setupLanguage() {

        this.rules = [
            // strings
            _language_common_rules.dqStrings,

            // directives
            {
                regex: /`\w*\b/g,
                type: 'k4'
            },

            {
                regex: /\[( *\d+(?: *\: *\d+) *)\]/g,
                type: 'e3'
            },

            {
                regex: /\b(for|generate|if|else|repeat|case|endcase|begin|end|ifnone)\b/g,
                type: 'k1'
            },

            {
                regex: /\b(output|input|inout|reg|wire|assign)\b/g,
                type: 'k5'
            },

            {
                regex: /\b(module|endmodule|always|function|endfunction)\b/g,
                type: 'k2'
            },

            // keywords
            {
                regex: /\b(or|rpmos|tranif1|and|initial|rtran|tri|parameter|rtranif0|tri0|pmos|rtranif1|tri1|buf|endprimitive|integer|posedge|scalared|triand|bufif0|endspecify|join|primitive|small|trior|bufif1|endtable|large|pull0|specify|trireg|endtask|macromodule|pull1|specparam|vectored|casex|event|medium|pullup|strong0|wait|casez|pulldown|strong1|wand|cmos|force|nand|rcmos|supply0|weak0|deassign|forever|negedge|real|supply1|weak1|default|nmos|realtime|table|defparam|nor|task|disable|highz0|not|release|time|wor|edge|highz1|notif0|tran|xnor|notif1|rnmos|tranif0|xor)\b/g,
                type: 'k0'
            },

            // slash style comments
            _language_common_rules.slashComments,

            // multi line comments
            _language_common_rules.blockComments,

            // numbers
            {
                regex: /-?\d*'s?d[0-9_xz]+\b/gi,
                type: 'n1'
            },
            {
                regex: /-?\d*'s?h[0-9a-f_xz]+\b/gi,
                type: 'n2'
            },
            {
                regex: /-?\d*'s?b[01_xz]+\b/gi,
                type: 'n3'
            },
            {
                regex: /-?\d*'s?o[0-7_xz]+\b/gi,
                type: 'n4'
            },
            _language_common_rules.int,

            _language_common_rules.brackets,
        ]
    }
}
