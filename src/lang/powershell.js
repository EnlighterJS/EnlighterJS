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

// Powershell Scripting
// Author: [Andi Dittrich]
// --
export class powershell extends generic {

    setupLanguage() {

        this.rules = [

            // strings
            _language_common_rules.dqStrings,
            _language_common_rules.sqStrings,

            // properties
            _language_common_rules.prop,

            // control keywords
            {
                regex: /\b(Begin|Break|Catch|Continue|Else|Elseif|End|Finally|For|ForEach|If|Switch|Throw|Try|Until|While)\b/gi,
                type: 'k1'
            },

            // keywords
            {
                regex: /\b(Data|Do|DynamicParam|Exit|Filter|From|Function|In|InlineScript|Hidden|Parallel|Param|Process|Return|Sequence|Trap|Workflow)\b/gi,
                type: 'k0'
            },

            // commands
            {
                regex: /\b([A-Z]\w+(?:-\w+)+)\b/g,
                type: 'm0'
            },


            // multi line comments
            {
                regex: /<#[\S\s]+?#>/gi,
                type: 'c1'
            },

            // single line comments
            _language_common_rules.poundComments,

            // variables
            {
                regex: /\$[A-Z_][\w]*/gim,
                type: 'k7'
            },

            // method calls
            _language_common_rules.mCalls,

            // function calls
            _language_common_rules.fCalls,

            // integers
            _language_common_rules.int,

            // floats
            _language_common_rules.floats,

            // brackets
            _language_common_rules.brackets
        ];
    }
}