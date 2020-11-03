// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2020 Andi Dittrich <https://andidittrich.com>
// ----------------------------------------------------------------------

import {javascript} from './javascript';

// JSX (preliminary)
// Author: [Andi Dittrich]
// --
export class jsx extends javascript {

    setupLanguage(){
        // setup css
        super.setupLanguage();

        // addon rules
        const addonRules = [
            // opening tags + self closing
            // @TODO JSX attribute parsing
            {
                regex: /(<)([A-Z:_][A-Z0-9:.-]*)([\s\S]*?)(\/?>)/gi,
                type: ['g1', 'x1', 'text', 'g1'],
                filter: [null, null, null, null]
            },

            // closing tags
            {
                regex: /(<\/)([A-Z:_][A-Z0-9:.-]*\s*)(>)/gi,
                type: ['g1', 'x1', 'g1']
            }

        ];

        // push to css rule-set
        this.rules = this.rules.concat(addonRules);
    }
}