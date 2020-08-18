// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2018 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

// Generic Rules/Regex
import _language_common_rules from './rulesets/generic';

// Tokenizer
import * as _tokenizer from '../engine/tokenizer';

export class generic{

    constructor(){
        // array of highlighting rules used by the tokenizer
        this.rules = [];

        // initialize language options
        this.setupLanguage();
    }

    // override this method to setup language params
    setupLanguage(){
        this.rules = [
            // strings - single quoted
            _language_common_rules.sqStrings,

            // strings - double quoted
            _language_common_rules.dqStrings,

            // properties
            _language_common_rules.prop,

            // slash style comments
            _language_common_rules.slashComments,

            // # style comments
            _language_common_rules.poundComments,

            // multi line comments
            _language_common_rules.blockComments,

            // brackets () {} [] <>
            _language_common_rules.brackets,

            // common used keywords
            {
                regex: /\b(true|false|null|nil|if|then|else|for|while|do|class|implements|extends|function|end|void|return|in|of|new|this|try|catch|def|except)\b/gi,
                type: 'k1'
            },

            // method calls
            _language_common_rules.mCalls,

            // function calls
            _language_common_rules.fCalls,

            // octals
            _language_common_rules.octal,

            // numbers (bin)
            _language_common_rules.bin,

            // numbers (hex)
            _language_common_rules.hex,

            // numbers (floats)
            _language_common_rules.floats,

            // numbers (int)
            _language_common_rules.int,

            // some symbols
            {
                regex: /[\b\s]([$&|~*:;]+)[\b\s]/g,
                type: 'g0'
            }
        ];
    }

    // run the tokenizer by given rule-set
    // allows to override the default behaviour
    analyze(sourcecode){
        return _tokenizer.getTokens(sourcecode, this.rules);
    }
}
