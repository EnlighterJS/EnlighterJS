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
import _common_css_rules from './rulesets/css';

import {getTokens} from '../engine/tokenizer';

// CSS - Cascading Style Sheets
// Author: [Andi Dittrich]
// --
export class css extends generic {

    // language aliases
    static alias(){
        return ['styles'];
    }

    setupLanguage() {

        // selector rules (2nd stage)
        const selectorRules = [
            _common_css_rules.pseudoElements,
            _common_css_rules.idSelector,
            _common_css_rules.classSelector,
            _common_css_rules.elementSelector,
            
            // strings (e.g. fonts, images)
            _language_common_rules.dqStrings,
            _language_common_rules.sqStrings,
        ];

        // main ruleset
        this.rules = [

            // selectors
            {
                regex: /(?:^|}|\*\/|;|{)\s*([^{};/]+?)\s*{/g,
                type: 'text',
                filter: function(token){
                    // selectors. Stage-2 Analyzing
                    // run tokenizer with sub-ruleset
                    return getTokens(token.text, selectorRules);
                }
            },

            // strings (e.g. fonts, images)
            _language_common_rules.dqStrings,
            _language_common_rules.sqStrings,
            
            // directives @media, @import
            {
                regex: /\W@(charset|import|namespace|page|font-face|keyframes|viewport|document|supports)\b/gi,
                type: 'k4'
            },

            // url payload
            {
                regex: /(url\s*)(\(.*?\))/gi,
                type: ['m0', 's0']
            },

            // hex colors
            {
                regex: /(#[a-z0-9]+)\W/gi,
                type: 'x14'
            },

            // units
            {
                regex: /(-?\.?\d+[.\d]*(%|[a-z]{2,4})?)/gim,
                type: 'x13'
            },

            // rule/property
            {
                regex: /([\w-]+)\s*:/g,
                type: 'x12'
            },

            // multi line comments
            _language_common_rules.blockComments,

            _language_common_rules.brackets
        ];
    }
}