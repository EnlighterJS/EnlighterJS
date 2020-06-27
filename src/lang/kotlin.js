// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2020 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

// Generic Rules/Regex
import _language_common_rules from './rulesets/generic';
import {generic} from './generic';

import _token from '../engine/token';
import _microTokenizer from '../engine/micro-tokenizer';

// Kotlin Language
// Author: [Andi Dittrich]
// --
export class kotlin extends generic {

    setupLanguage() {

        // template strings. Stage-2 Analyzing
        function parseTemplateSeq(token){

            // run the MicroTokenizer to identify the template tags
            return _microTokenizer(token, /\$(?:\{.*?}|\w+)/g, function(match){
                return [_token(match[0], 's3')];
            });
        }

        this.rules = [

            // multi line strings
            {
                regex: /"""[\s\S]*?"""/g,
                type: 's5',
                filter: parseTemplateSeq
            },
            
            // strings
            {
                regex: _language_common_rules.dqStrings.regex,
                type: 's0',
                filter: parseTemplateSeq
            },

            // chars
            _language_common_rules.char,

            // properties
            _language_common_rules.prop,

             // types
            {
                regex: /\b(Double|Float|Long|Int|Short|Byte|Any|String|Array)\b/g,
                type: 'k5'
            },

            // control keywords
            {
                regex: /\b(break|continue|do|else|for|if|throw|try|when|while|catch|finally)\b/g,
                type: 'k1'
            },

            // package directives
            {
                regex: /^(package|import)(\s+[\w.]+)/gm,
                type: ['k0', 'k10']
            },

            // type initialization
            {
                regex: /\b(enum|typealias|object|companion|val|var)\b/g,
                type: 'k2'
            },

            // qualifier/modifier
            {
                regex: /\b(actual|abstract|annotation|companion|crossinline|data|expect|external|final|infix|inline|inner|internal|lateinit|noinline|open|operator|out|override|private|protected|public|reified|sealed|suspend|tailrec|vararg)\b/g,
                type: 'k8'
            },

            // keywords
            {
                regex: /\b(as|class|fun|in|interface|is|return|by|constructor|delegate|dynamic|field|file|get|init|param|property|receiver|set|setparam|where|field|it)\b/g,
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

            // labels
            {
                regex: /(@\w+|\w+@)/gm,
                type: 'k6'
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

             // integers (non word boundary!): -1234
            {
                regex: /[\b\W](-?\d[\d_]*L?)(?!\.)\b/g,
                type: 'n1'
            },

            _language_common_rules.floats,

            // hex numbers: 0x21F1A9
            {
                regex: /[\b\W](-?0x[A-F0-9][A-F0-9_]+)\b/gi,
                type: 'n2'
            },

            // binary numbers: 0b10001001
            {
                regex: /[\b\W](-?0b[01][01_]+)\b/gi,
                type: 'n3'
            },
            
            // brackets
            _language_common_rules.brackets

        ];
    }
}
