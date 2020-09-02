// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2020 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

// Generic Rules/Regex
import _language_common_rules from './rulesets/generic';
import {generic} from './generic';

import _token from '../engine/token';
import _microTokenizer from '../engine/micro-tokenizer';

// C# Language
// Author: [Andi Dittrich]
// --
export class csharp extends generic {

    // language aliases
    static alias(){
        return ['c#'];
    }

    setupLanguage() {

        // template strings. Stage-2 Analyzing
        function parseInterpolatedStrings(token){

            // run the MicroTokenizer to identify the template tags
            return _microTokenizer(token, /\{.*?}/g, function(match){
                return [_token(match[0], 's3')];
            });
        }

        this.rules = [

            // strings, chars
            {
                regex: /\$("(?:[^"\\]|\\.)*")/g,
                type: 's0',
                filter: parseInterpolatedStrings
            },

            _language_common_rules.dqStrings,
            _language_common_rules.char,

            // boolean, null
            _language_common_rules.null,
            _language_common_rules.boolean,

            // properties
            _language_common_rules.prop,

            // types
            {
                regex: /\b(bool|byte|char|decimal|double|float|int|long|sbyte|short|uint|ulong|ushort|void|string)\b/g,
                type: 'k5'
            },

            // control keywords
            {
                regex: /\b(while|try|throw|switch|if|goto|foreach|for|finally|else|do|continue|catch|case|break)\b/g,
                type: 'k1'
            },

            // package directives
            {
                regex: /^((?:using|namespace)\s+)(\w[\w._]+[;{\n])/gm,
                type: ['k0', 'k10']
            },

            // type initialization
            {
                regex: /\b(enum|struct|var)\b/g,
                type: 'k2'
            },

            // qualifier/modifier
            {
                regex: /\b(const|in|out)\b/g,
                type: 'k8'
            },

            // keywords
            {
                regex: /\b(using|volatile|virtual|using|unsafe|unchecked|static|stackalloc|sealed|return|ref|readonly|public|protected|private|params|override|operator|object|namespace|lock|is|internal|interface|implicit|fixed|extern|explicit|event|delegate|default|class|checked|base|as|abstract)\b/g,
                type: 'k0'
            },

            // contextual keywords
            {
                regex: /\b(add|alias|ascending|async|await|by|descending|dynamic|equals|from|get|global|group|into|join|let|nameof|on|orderby|partial|remove|select|set|unmanaged|value|var|when|where|yield)\b/g,
                type: 'k0'
            },

            // special inheritance
            {
                regex: /\b(this)\b/g,
                type: 'k9'
            },

            // operator
            {
                regex: /\b(new|sizeof|typeof)\b/g,
                type: 'k3'
            },

            // function/method calls
            _language_common_rules.fCalls,
            _language_common_rules.mCalls,

            // comments
            _language_common_rules.slashComments,
            _language_common_rules.blockComments,
            _language_common_rules.docComments,

            // numbers
            _language_common_rules.int,
            _language_common_rules.floats,
            _language_common_rules.bin,
            _language_common_rules.hex,
            _language_common_rules.octal,

            // brackets
            _language_common_rules.brackets

        ];
    }
}
