// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2019
// Authors:
// - Andi Dittrich <https://andidittrich.de>
// - Pascal Havé
// ----------------------------------------------------------------------

// Generic Rules/Regex
import _language_common_rules from './rulesets/generic';
import {generic} from './generic';

// Scala Language
// Author: [Pascal Havé]
// --
export class scala extends generic {

    setupLanguage() {

        this.rules = [

            // strings, chars
            _language_common_rules.dqStrings,
            _language_common_rules.char,

            // string interpolation : s"hello ${world}"
            {
                regex: /s"(?:[^"\\]|\\.)*"/g,
                type: 's2'
            },

            // backticks identifier
            {
                regex: /`(?:[^`\\]|\\.)*`/g,
                type: 'k7'
            },

            // annotations
            {
                regex: /@[\W\w_][\w]+/g,
                type: 'k11'
            },
/*
             // basic types
            {
                regex: /\b(Boolean|Byte|Int|Long|Float|Double|Char|String|Unit)\b/g,
                type: 'k5'
            },


            // template types
            {
                regex: /\[\s*([-+]?[A-Z]\w*)\s*\]/g,
                type: 'k5'
            },
*/
            // types
            {
                regex: /\b([A-Z]\w*)\b/g,
                type: 'k5'
            },

            // control keywords
            {
                regex: /\b(while|try|catch|else|throw|break|if|do|goto|switch|for|match)\b/g,
                type: 'k1'
            },

            // package directives
            {
                regex: /(package|import)(\s+[\w.]+)/gm,
                type: ['k0', 'k10']
            },

            // symbol keywords
            {
                regex: /[\b\w\s)](_|:|@|#|<-|←|<:|<%|=|=>|⇒|>:)[\b\w\s]/g,
                type: 'k3'
            },

            // keywords
            {
                regex: /\b(abstract|class|case|extends|final|finally|forSome|implicit|lazy|object|override|private|protected|return|sealed|trait|with|yield)\b/g,
                type: 'k0'
            },

            // def keyword
            
            {
                regex: /\b(def)\s+(\w+)\b/gm,
                type: ['k2', 'm0']
            },

            // type keyword
            {
                regex: /\b(type)\s+(\w+)\b/gm,
                type: ['k2', 'k5']
            },

            // val keyword
            {
                regex: /\b(val)\s+(\w+)\b/gm,
                type: ['k2', 'k7']
            },

            // var keyword
            {
                regex: /\b(var)\s+(\w+)\b/gm,
                type: ['k2', 'k7']
            },

            // special inheritance
            {
                regex: /\b(this|super)\b/g,
                type: 'k9'
            },

            // operator
            {
                regex: /\b(new)\b/g,
                type: 'k3'
            },

            _language_common_rules.mCalls,
            _language_common_rules.fCalls,
/*
            // function/method calls
            {
                regex: /\b([a-z][\w]*)\s*(?:\[(.*?)\])?\s*\(/gm,
                type: 'm0'
            },
            {
                regex: /\.\s*([a-z][\w]*)/gm,
                type: 'm0'
            },
            {
                regex: /\b[a-z]\w*\s+([a-z][\w]*)\b/gm,
                type: 'm0'
            },
*/
            // boolean values, null keywords
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
            //_language_common_rules.hex,
            //_language_common_rules.octal,

            // brackets
            _language_common_rules.brackets

        ];
    }
}
