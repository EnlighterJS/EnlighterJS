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

// LESS
// Author: [Andi Dittrich]
// --
export class less extends css {

    setupLanguage(){
        // setup css
        super.setupLanguage();

        // addon rules
        const addonRules = [
            // single line comments
            _language_common_rules.slashComments,

            // functions
            {
                regex: /\b([\w][\w-]+)\s*\(/gm,
                type: 'm0'
            },

            // variables
            {
                regex: /@[\w-]+\b/g,
                type: 'k7'
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