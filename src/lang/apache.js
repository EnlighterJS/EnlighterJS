// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2020 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

// Generic Rules/Regex
import _language_common_rules from './rulesets/generic';
import {generic} from './generic';

import _token from '../engine/token';
import _microTokenizer from '../engine/micro-tokenizer';

// Apache HTTPD
// Author: [Andi Dittrich]
// --
export class apache extends generic {

    // language aliases
    static alias(){
        return ['apacheconf', 'httpd'];
    }

    setupLanguage(){

        // xml attributes. Stage-2 Analyzing
        function parseXmlAttributes(token){
            // run the MicroTokenizer to identify strings within
            return _microTokenizer(token, _language_common_rules.dqStrings.regex, function(match){
                // std string
                return [_token(match[0], 's0')];
            });
        }

        this.rules = [

            // strings
            _language_common_rules.dqStrings,

            // pound style comments
            _language_common_rules.poundComments,

            // opening tags + self closing
            {
                regex: /(<)([A-Z:_][A-Z0-9:.-]*)([\s\S]*?)(\/?>)/gi,
                type: ['g1', 'x1', 'text', 'g1'],
                filter: [null, null, parseXmlAttributes, null]
            },

            // closing tags
            {
                regex: /(<\/)([A-Z:_][A-Z0-9:.-]*\s*)(>)/gi,
                type: ['g1', 'x1', 'g1']
            },

            // directives
            {
                regex: /^\s*([A-Z]\w+)\b/gm,
                type: 'k0'
            },

            // vars %{HTTPS}
            {
                regex: /%\{\w+\}/g,
                type: 'k7'
            },

            // boolean expression
            {
                regex: /\b(on|off)\b/gi,
                type: 'e0'
            },

            // numbers
            _language_common_rules.int
        ];
    }
}
