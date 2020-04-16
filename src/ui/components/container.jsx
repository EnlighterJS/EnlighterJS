// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2019 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

// Internal "ReactDOM"
import * as React from 'dom-magic';

// wrap child elements into div container
export function Container(props, ...children){

    // css classes
    const classes = [];

    // name set ?
    if (props.name){
        classes.push('enlighter-' + props.name);
    }

    // additional classnames set ?
    if (props.className){
        // string input ?
        if (typeof props.className === 'string'){
            classes.push(props.className);

        // array input
        }else{
            classes.push(...props.className);
        }
    }

    // use createElement directly to expand the children!
    return React.createElement('div', {className: classes.join(' ')}, ...children);
}