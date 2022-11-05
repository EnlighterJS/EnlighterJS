// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2018 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

// Generic Rules/Regex
import {javascript} from './javascript';

// TypeScript https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md
// ES2015 Superset
// Author: [Andi Dittrich]
// --
export class typescript extends javascript{

    // language aliases
    static alias(){
        return [];
    }

    setupLanguage(){
        // run python regex setup
        super.setupLanguage();

        // local rule-set
        const addonRules = [
            // types
            {
                regex: /\b(boolean|number|string|any|void|undefined|never|symbol)\b/g,
                type: 'k5'
            },
            
            // variable type/initializations
            {
                regex: /\b(type|interface)\b/g,
                type: 'k2'
            },

            // qualifier/modifier
            {
                regex: /\b(abstract|implements|readonly)\b/g,
                type: 'k8'
            },

            // keywords
            {
                regex: /\b(declare|namespace)\b/g,
                type: 'k0'
            },

            // function calls with generics
            {
                regex: /\b([\w]+)\s*</gm,
                type: 'm0'
            },

            // generics
            {
                regex: /[<>]/g,
                type: 'g1'
            },
        ];

        // merge rules (prepend)
        this.rules = addonRules.concat(this.rules);

    }
}
