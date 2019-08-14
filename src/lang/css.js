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

// CSS - Cascading Style Sheets
// Author: [Andi Dittrich]
// --
export class css extends generic {

    // language aliases
    static alias(){
        return ['styles'];
    }

    setupLanguage() {

        this.rules = [

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
                regex: /\b(\d+[.\d+-]?\s*(%|[a-z]{1,3})?)/gi,
                type: 'x13'
            },

            // pseudo elements + selectors
            {
                regex: /[\w\]](::?[\w-]+)\b/g,
                type: 'x15'
            },

            // id selector
            {
                regex: /(#[\w-]+)\W/g,
                type: 'x10'
            },

            // class selector
            {
                regex: /(\.[\w-]+)\W/g,
                type: 'x11'
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