// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2018 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

// Generic Rules/Regex
import _language_common_rules from '../engine/generic-rules';
import {generic} from './generic';

// Shell/Bash Scripting
// Author: [Andi Dittrich]
// --
export class shell extends generic {

    setupLanguage() {

        this.rules = [

            // strings
            _language_common_rules.dqStrings,

            // shebang
            {
                regex: /(^#!.*?)\n/gi,
                type: 'k4'
            },

            // back-tick command string
            {
                regex: /`.*?`/gm,
                type: 's2'
            },

            // command wrapper
            {
                regex: /(\$)\(/gm,
                type: 's2'
            },

            // arguments
            {
                regex: /(\$\d)\b/gim,
                type: 'k9'
            },

            // variables
            {
                regex: /(\$\w+)\b/gim,
                type: 'k7'
            },
            
            // variable assignment
            {
                regex: /^(\s*\w+)=/gm,
                type: 'k7'
            },

            // cases/labels
            {
                regex: /^\s*\w+\)\s*$/gm,
                type: 'k6'
            },

            // comments
            {
                regex: /((?:^\s*|\s+)#.*$)/gm,
                type: 'c0'
            },

            // control keywords
            {
                regex: /\b(if|fi|then|elif|else|for|do|done|until|while|break|continue|case|esac|in|eq|ne|gt|lt|ge|le)\b/gi,
                type: 'k1'
            },

            // general keywords
            {
                regex: /\b(return|function)\b/gi,
                type: 'k0'
            },

            // functions
            {
                regex: /^\s*\w+\(\)\s*\{/gm,
                type: 'k0'
            },

            // numbers
            _language_common_rules.floats
        ];
    }
}