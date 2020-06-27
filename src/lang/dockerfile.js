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

// Dockerfile
// Author: [Andi Dittrich]
// --
export class dockerfile extends generic {

    // language aliases
    static alias(){
        return ['docker'];
    }

    setupLanguage() {

        this.rules = [

            // strings
            _language_common_rules.dqStrings,

            // variables (usage)
            {
                regex: /\$\{\w+\}/gi,
                type: 'k7'
            },

            // arguments
            {
                regex: /ARG\s+(\w+)(?:(=)(.*?)$)?/gim,
                type: ['k7', 'k3', 's0']
            },

            // env vars (single)
            {
                regex: /ENV\s+(\w+)(?:(\s+|=)(.*?)$)?/gim,
                type: ['k7', 'k3', 's0']
            },

            // directives
            {
                regex: /(?:^|[^\\])#\s*\w+=.*$/gm,
                type: 'k4'
            },

            // comments
            _language_common_rules.poundComments,

            // instructions
            {
                regex: /^([a-z]+)\b/gmi,
                type: 'k0'
            },

            // general keywords
            {
                regex: /\b(AS)\b/gi,
                type: 'k0'
            },

            // multiline "sugar"
            {
                regex: /^\s+(&&)/gim,
                type: 'k3'
            },

            // brackets
            _language_common_rules.brackets
        ];
    }
}