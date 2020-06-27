// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2018 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

// Generic Rules/Regex
import _language_common_rules from './rulesets/generic';
import {css} from './css';
import _common_css_rules from './rulesets/css';

// LESS
// Author: [Andi Dittrich]
// --
export class less extends css {

    setupLanguage(){
        // setup css
        super.setupLanguage();

        // remove selector subparser
        this.rules.shift();

        // addon rules
        const addonRules = [
            // single line comments
            _language_common_rules.slashComments,

            // selectors
            _common_css_rules.pseudoElements,
            _common_css_rules.idSelector,
            _common_css_rules.classSelector,

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