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

// Ruby Language
// Author: [Andi Dittrich]
// --
export class ruby extends generic {

    setupLanguage() {
        // string, regex, template literals
        function processLiterals(token){

            // is regex ?
            if (token.text.match(/^%r/)){
                token.type = 'e2';
            }else if (token.text.match(/^%x/)){
                token.type = 'e4';
            }

            return [token];
        }

        this.rules = [

            // strings
            _language_common_rules.dqStrings,
            _language_common_rules.sqStrings,

            // heredoc
            _language_common_rules.heredoc,

            // shell command expressions
            {
                regex: /(`(?:[^`\\]|\\.)*`)/g,
                type: 'e4'
            },

            // boolean expression
            _language_common_rules.boolean,

            // null expression
            {
                regex: /\b(nil)\b/gi,
                type: 'e1'
            },

            _language_common_rules.fCalls,

            // properties - render before keywords!
            _language_common_rules.prop,

            // class/instance variables
            {
                regex: /@{1,2}[A-Za-z_]\w*\W/g,
                type: 'k7'
            },

            // symbols
            {
                regex: /[^:](:[\w]+)\b/g,
                type: 'k6'
            },

            // pre-defined global variables
            {
                regex: /(\$[a-z0-9_-]+|\$.)\W/gi,
                type: 'k9'
            },

            // control keywords
            {
                regex: /\b(begin|break|case|do|else|elsif|end|ensure|for|if|in|next|redo|rescue|retry|then|unless|until|when|while)\b/gi,
                type: 'k1'
            },

            // compile time constants
            {
                regex:  /\b((?:__)?[A-Z][A-Z0-9_]+)\b/g,
                type: 'e3'
            },

            // keywords
            {
                regex: /\b(alias|class|defined\?|undef|def|module|return|self|super|yield)\W/gi,
                type: 'k0'
            },

            // operator
            {
                regex: /\b(and|not|or)\b/gi,
                type: 'k3'
            },

            _language_common_rules.poundComments,

            // embedded documentation
            {
                regex: /^=begin[\S\s]*?^=end/gim,
                type: 'c2'
            },

            // general literals with non-alphanumeric delimiters
            {
                regex: /(%[iqrswx](\W)(?:[^\2\n\\]|\\.)*\2[iomx]*)/gim,
                type: 's2',
                filter: processLiterals
            },

            // literals with asymmetric brackets <> [] {} ()
            {
                regex: /(%[iqrswx]?(\{(?:[^}\\]|\\.)*}|\[(?:[^}\\]|\\.)*]|\((?:[^)\\]|\\.)*\))[iomx]*)/gim,
                type: 's2',
                filter: processLiterals
            },

            // slash-style regular expressions
            {
                regex: /\W(\/(?:[^/\\]|\\.)*\/\w*)\W/g,
                type: 'e2'
            },

            // ascii char sequences
            {
                regex: /\W\?(?:\w|\\M|\\C)(?:-\w|-\\M|-\\C)*\b/g,
                type: 'n1'
            },

            // integers
            {
                regex: /[\b\W](-?\d[\d_]+?)(?!\.)\b/g,
                type: 'n1'
            },

            // hex
            {
                regex: /[\b\W](-?0x[A-F0-9][A-F0-9_]+)\b/gi,
                type: 'n2'
            },

            // bin
            {
                regex: /[\b\W](-?0b[01][01_]+)\b/gi,
                type: 'n3'
            },

            // float literals
            {
                regex: /[\b\W](-?[\d_]+(?:\.[\d_]+)?(?:e[+-]?\d+)?[ji]?)\b/gi,
                type: 'n0'
            },

            // brackets
            _language_common_rules.brackets

        ]
    }
}