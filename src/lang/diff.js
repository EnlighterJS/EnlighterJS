// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2018 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

// Generic Rules/Regex
import {generic} from './generic';

// DIFF Highlighting (Unified format)
// Author: [Andi Dittrich]
// --
export class diff extends generic {

    setupLanguage() {

        this.rules = [

            // comments
            {
                regex : /^([+-]{3}.*)$/gm,
                type : 'c0'
            },

            // section
            {
                regex : /^(@@.*@@\s*)/gm,
                type : 't2'
            },

            // new content
            {
                regex : /^(\+.*)/gm,
                type : 't5'
            },

            // removed content
            {
                regex : /^(-.*)/gm,
                type : 't6'
            }
        ];
    }
}