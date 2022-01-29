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

// PHP
// Author: [Andi Dittrich]
// --
export class php extends generic {

    setupLanguage() {

        this.rules = [

            // strings
            _language_common_rules.sqStrings,
            _language_common_rules.dqStrings,

            // heredoc / nowdoc
            _language_common_rules.heredoc,

            _language_common_rules.boolean,

            // null expression
            _language_common_rules.null,

            // method call on instances (before keywords!)
            {
                regex: /(->)([\w]+)/gim,
                type: ['k3', 'm1']
            },

            // static calls (before keywords!)
            {
                regex: /(::)([\w]+)/gim,
                type: ['k3', 'm2']
            },
            
            // inheritance
            {
                regex: /(self|parent|\$this)/gi,
                type: 'k9'
            },

            // control keywords
            {
                regex: /\b(as|break|case|catch|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|finally|for|foreach|goto|if|switch|throw|try|while)\b/g,
                type: 'k1'
            },

            // magic constants
            {
                regex:  /\b__[A-Z][A-Z0-9_]+__\b/g,
                type: 'e3'
            },

            // keywords
            // http://php.net/manual/en/reserved.keywords.php
            // http://php.net/manual/en/reserved.other-reserved-words.php
            {
                regex: /\b(__halt_compiler|abstract|array|callable|class|const|continue|declare|default|die|echo|empty|eval|exit|extends|final|function|global|implements|include|include_once|instanceof|insteadof|interface|isset|list|namespace|print|private|protected|public|require|require_once|return|static|trait|use|var|yield)\b/g,
                type: 'k0'
            },

            // operator
            {
                regex: /\b(and|or|xor|clone|new|unset)\b/g,
                type: 'k3'
            },

            // reserved
            // http://php.net/manual/en/reserved.other-reserved-words.php
            {
                regex: /\b(int|float|bool|string|resource|object|mixed|numeric)\b/g,
                type: 'k5'
            },

            // slash style comments
            _language_common_rules.slashComments,

            // pound style comments
            _language_common_rules.poundComments,

            // multi line comments
            _language_common_rules.blockComments,

            // variables
            {
                regex: /\$[^\s=;()'">:-]+/gim,
                type: 'k7'
            },

            // global function calls
            {
                regex: /\b(\w[^\s('"]+)\s*\(/gm,
                type: 'm0'
            },

            // octal
            _language_common_rules.octal,

            // bin
            _language_common_rules.bin,

            // hex
            _language_common_rules.hex,

            // floats numbers
            _language_common_rules.floats,

            // integer numbers
            _language_common_rules.int,

            // brackets
            _language_common_rules.brackets

        ]
    }
}