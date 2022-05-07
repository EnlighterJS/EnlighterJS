// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2022 Andi Dittrich <https://andidittrich.com>, 2022 Minas Giannekas
// ----------------------------------------------------------------------

// Generic Rules/Regex
import _language_common_rules from './rulesets/generic';
import { generic } from './generic';

import _token from '../engine/token';
import _microTokenizer from '../engine/micro-tokenizer';

// Dart Language Pattern
// Author: [Andi Dittrich, Minas Giannekas]
// --
export class dart extends generic {

    setupLanguage() {
        // escape sequences within strings. Stage-2 Analyzing
        function parseEscapeSeq(token) {

            // run the MicroTokenizer to process escape sequences
            return _microTokenizer(token, /\\(x[A-F0-9]{2}|u[A-F0-9]{4}|.)/gi, function (match) {
                // single escape sequence token
                return [_token(match[0], 's4')];
            });
        }

        // template strings. Stage-2 Analyzing
        function parseTemplateSeq(token) {

            // run the MicroTokenizer to identify the template tags
            return _microTokenizer(token, /\$\{.*?}/g, function (match) {
                return [_token(match[0], 's3')];
            });
        }

        this.rules = [

            // annotations
            {
                regex: /@[\W\w_][\w]+/gm,
                type: 'k11'
            },

            // strings
            {
                regex: _language_common_rules.sqStrings.regex,
                type: 's0',
                filter: parseEscapeSeq
            },

            // strings
            {
                regex: _language_common_rules.dqStrings.regex,
                type: 's0',
                filter: parseEscapeSeq
            },

            // template strings
            {
                regex: /`(?:[^`\\]|\\.)*`/g,
                type: 's2',
                filter: parseTemplateSeq
            },

            // boolean expression
            _language_common_rules.boolean,

            // null expression
            _language_common_rules.null,

            // properties - render before keywords!
            _language_common_rules.prop,

            // variable type/initializations
            {
                regex: /\b(var|dynamic|enum|const)\b/g,
                type: 'k2'
            },

            // types
            {
                regex: /\b(bool|int|num|double|String|Number|Map|List|Set|Symbol|Boolean|void|Object)\b/g,
                type: 'k5'
            },

            // control keywords
            {
                regex: /\b(break|case|catch|continue|do|else|finally|for|if|switch|try|while|throw|rethrow)\b/g,
                type: 'k1'
            },

            // keywords
            {
                regex: /\b(abstract|as|assert|async|await|class|covariant|default|deferred|export|extends|extension|external|factory|false|final|from|Function|get|hide|implements|import|in|inferface|is|late|library|mixin|null|on|operator|part|required|return|set|show|static|sync|true|typedef|with|yield)\b/g,
                type: 'k0'
            },

            // special inheritance
            {
                regex: /\b(this|super)\b/g,
                type: 'k9'
            },

            // special operators
            {
                regex: /\W(=>)\W/g,
                type: 'k3'
            },

            // special operators
            {
                regex: /\.{3}/g,
                type: 'k3'
            },

            // slash style comments
            _language_common_rules.slashComments,

            // multi line comments
            _language_common_rules.blockComments,

            // doc comments (starting with /**)
            _language_common_rules.docComments,

            // doc comments (starting with ///)
            {
                regex: /(?:^|[^\\])(\/\/\/.*)$/gm,
                type: 'c1'
            },

            // method calls
            _language_common_rules.mCalls,

            // global function calls
            _language_common_rules.fCalls,

            // octals
            _language_common_rules.octal,

            // bin
            _language_common_rules.bin,

            // hex
            _language_common_rules.hex,

            // floats/integer numbers
            _language_common_rules.floats,

            // integers
            _language_common_rules.int,

            // brackets
            _language_common_rules.brackets

        ];
    }
}
