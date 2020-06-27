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

// Octave/Matlab Language
// Author: [Andi Dittrich]
// --
export class matlab extends generic {

    setupLanguage() {

        this.rules = [

            // single line comments
            {
                regex: /%.*$/gm,
                type: 'c0'
            },

            // block comments
            {
                regex: /%%.*$/gm,
                type: 'c1'
            },

            // strings
            _language_common_rules.sqStrings,

            // strings
            _language_common_rules.dqStrings,

            // boolean
            _language_common_rules.boolean,

            // method calls
            _language_common_rules.mCalls,

            // properties - render before keywords!
            _language_common_rules.prop,

            // control keywords
            {
                regex: /\b(break|case|catch|continue|do|else|elseif|end|end_try_catch|endfor|endif|endmethods|endparfor|endproperties|endswitch|endwhile|for|if|switch|try|until|while)\b/gi,
                type: 'k1'
            },

            // keywords: https://www.gnu.org/software/octave/doc/interpreter/Keywords.html
            {
                regex: /\b(__FILE__|__LINE__|classdef|end_unwind_protect|endclassdef|endenumeration|endevents|endfunctionenumeration|events|function|global|methods|otherwise|parfor|persistent|properties|return|static|unwind_protect|unwind_protect_cleanup)\b/gi,
                type: 'k0'
            },

            // function handles
            {
                regex: /(@[\w]+)\s*/gm,
                type: 'k7'
            },

            // function calls
            _language_common_rules.fCalls,

            // floats numbers
            _language_common_rules.floats,

            // brackets
            _language_common_rules.brackets
        ];
    }
}