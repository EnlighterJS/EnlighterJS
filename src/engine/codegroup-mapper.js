// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2018 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

import * as _dom from 'dom-magic';

// separate codegorups and single instances
export function map(elements){
    // set of codegroups identified by group attribute
    const groups = {};

    // set of non grouped elements
    const standalone = [];

    for (let i=0;i<elements.length;i++){
        // extract group name
        const groupName = _dom.getElementDataAttribute(elements[i], 'enlighter-group');

        // group set ?
        if (groupName){
            // group known ?
            if (!groups[groupName]){
                groups[groupName] = [];
            }

            // store element
            groups[groupName].push(elements[i]);

        // force standalone
        }else{
            standalone.push(elements[i]);
        }
    }

    // return elements as arrays
    return {
        standalone: standalone,
        groups: Object.keys(groups).map(k => groups[k])
    };
}