// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2018 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

import {python} from './python';

// Cython Language Extension
// Author: [Andi Dittrich]
// --
export class cython extends python{

    setupLanguage(){
        // run python regex setup
        super.setupLanguage();

        // local rule-set
        const addonRules = [
            // static types
            {
                regex: /\b(bool|char|double|float|int|long|short|void)\b/g,
                type: 'k5'
            },

            // type initialization
            {
                regex: /\b(enum|struct|typedef|union|object)\b/g,
                type: 'k2'
            },

            // qualifier/modifier
            {
                regex: /\b(const|volatile|unsigned|signed|restrict)\b/g,
                type: 'k8'
            },

            // additional keywords
            {
                regex: /\b(readonly|extern|namespace|public|privat|include|cimport|pyximport|cythonize|cdef|cpdef|ctypedef|property|IF|ELIF|ELSE|DEF)\b/g,
                type: 'k0'
            }
        ];

        // merge rules (prepend)
        this.rules = addonRules.concat(this.rules);
    }
}