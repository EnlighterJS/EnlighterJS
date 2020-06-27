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

// Groovy Language
// Author: [Andi Dittrich]
// --
export class groovy extends generic {

    setupLanguage() {

        this.rules = [

            // multi line strings triple quoted
            {
                regex: /("""[\s\S]*?"""|'''[\s\S]*?''')/g,
                type: 's5'
            },
            
            // strings, chars
            _language_common_rules.dqStrings,
            _language_common_rules.sqStrings,
            _language_common_rules.char,

            // comments
            _language_common_rules.slashComments,
            _language_common_rules.blockComments,
            _language_common_rules.docComments,
            
            // slashy strings
            {
                regex: /(\/(?:[^/\\]|\\.)*\/)/g,
                type: 's5'
            },

            // properties
            _language_common_rules.prop,

             // types
            {
                regex: /\b(byte|char|short|int|long|float|double|String)\b/g,
                type: 'k5'
            },

            // control keywords
            {
                regex: /\b(break|case|catch|continue|default|do|else|finally|for|goto|if|switch|throw|try|while)\b/g,
                type: 'k1'
            },

            // package directives
            {
                regex: /^(package|import)(\s+[\w.]+)/gm,
                type: ['k0', 'k10']
            },

            // type initialization
            {
                regex: /\b(const|enum|def)\b/g,
                type: 'k2'
            },

            // keywords
            {
                regex: /\b(as|assert|class|extends|goto|implements|in|interface|return|thows|trait)\b/g,
                type: 'k0'
            },

            // special inheritance
            {
                regex: /\b(this|super)\b/g,
                type: 'k9'
            },

            // operator
            {
                regex: /\b(instanceof|new)\b/g,
                type: 'k3'
            },


            // function/method calls
            _language_common_rules.fCalls,
            _language_common_rules.mCalls,

            // boolean, null
            _language_common_rules.null,
            _language_common_rules.boolean,

            // shebang line
            {
                regex: /^#.*/g,
                type: 'k9'
            },

            // octal numbers: 07172 
            {
                regex: /[\b\W](-?0[0-7][0-7_]+[GLIDF]?)\b/gi,
                type: 'n4'
            },

            // integers (non word boundary!): -1234
            {
                regex: /[\b\W](-?\d[\d_]*[GLIDF]?)(?!\.)\b/gi,
                type: 'n1'
            },

            // hex numbers: 0x21F1A9
            {
                regex: /[\b\W](-?0x[A-F0-9][A-F0-9_]+[GLIDF]?)\b/gi,
                type: 'n2'
            },

            // binary numbers: 0b10001001
            {
                regex: /[\b\W](-?0b[01][01_]+[GLIDF]?)\b/gi,
                type: 'n3'
            },


            // floats: -12.412e-12
            {
                regex: /(-?((?:\d+\.\d+|\.\d+|\d+\.)(?:e[+-]?\d+)?)|\d+(?:e[+-]?\d+)?)/gi,
                type: 'n0'
            },


            // brackets
            _language_common_rules.brackets

        ];
    }
}
