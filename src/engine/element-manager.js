// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2018 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

import * as _dom from 'dom-magic';

// global list of highlighted elements
const _highlightedElements = [];

// try to find origin element in stack
function search(originElement){

    // iterate over highlighted groups
    for (let i=0;i<_highlightedElements.length;i++){

        // iterate over origin elements associated to highlighte group
        for (let j=0;j<_highlightedElements[i].elements.length;j++){

            // compare elements with first of given elements
            if (_highlightedElements[i].elements[j] === originElement){
                // return index
                return i;
            }
        }
    }

    // not found
    return false;
}

// add new highlighting group to stack
export function add(elements, wrapper){
    _highlightedElements.push({
        elements: elements,
        wrapper: wrapper
    });
}

// remove highloghting group from stack and restore state
export function remove(originElement){
    // search in highlighted element list
    const index = search(originElement);

    // element not found ?
    if (index === false){
        return false;
    }

    // extract group - remove from stack
    const group = _highlightedElements.splice(index, 1);

    // remove highlighted codeblock
    _dom.disposeElement(group[0].wrapper);

    // set element origin visible
    group[0].elements.map(el => _dom.removeClass(el, 'enlighter-origin'));

    return true;
}