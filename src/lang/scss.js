// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2018 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

// Generic Rules/Regex
import _language_common_rules from '../engine/generic-rules';
import {css} from './css';

// SCSS/SASS
// Author: [Andi Dittrich]
// --
export class scss extends css {

    // language aliases
    static alias(){
        return ['sass'];
    }

    setupLanguage(){
        // setup css
        super.setupLanguage();

        // addon rules
        const addonRules = [
            // single line comments
            _language_common_rules.slashComments,

            // functions
            {
                regex: /\b([\w-]+)\s*\(/gm,
                type: 'm0'
            },

            // variables
            {
                regex: /\$[\w-]+\b/g,
                type: 'k7'
            },

            // conditionals
            {
                regex: /@[\w-]+\b/g,
                type: 'k9'
            },

            // reference operator
            {
                regex: /&/gi,
                type: 'k3'
            }

        ];

        // push to css rule-set
        this.rules = this.rules.concat(addonRules);
    }
}