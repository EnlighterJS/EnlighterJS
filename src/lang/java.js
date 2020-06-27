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

// Java Language
// Author: [Andi Dittrich]
// --
export class java extends generic {

    setupLanguage() {

        this.rules = [

            // strings, chars
            _language_common_rules.dqStrings,
            _language_common_rules.char,

            // annotations
            {
                regex: /@[\W\w_][\w]+/gm,
                type: 'k11'
            },

            // properties
            _language_common_rules.prop,

             // types
            {
                regex: /\b(boolean|byte|char|short|int|long|float|double|String|void|Integer|Double|BigInt|Float|Boolean|Byte|Char|Long)\b/g,
                type: 'k5'
            },

            // control keywords
            {
                regex: /\b(while|try|catch|case|else|throw|break|if|do|goto|switch|for|continue)\b/g,
                type: 'k1'
            },

            // package directives
            {
                regex: /^(package|import)(\s+[\w.]+)/gm,
                type: ['k0', 'k10']
            },

            // type initialization
            {
                regex: /\b(enum)\b/g,
                type: 'k2'
            },

            // qualifier/modifier
            {
                regex: /\b(const)\b/g,
                type: 'k8'
            },

            // keywords
            {
                regex: /\b(native|volatile|strictfp|finally|class|static|interface|final|extends|transient|return|throws|public|protected|implements|private|synchronized|default|assert|abstract)\b/g,
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

            // comments
            _language_common_rules.slashComments,
            _language_common_rules.blockComments,
            _language_common_rules.docComments,


            // numbers
            _language_common_rules.int,
            _language_common_rules.floats,
            _language_common_rules.bin,
            _language_common_rules.hex,
            _language_common_rules.octal,


            // brackets
            _language_common_rules.brackets

        ];
    }
}
