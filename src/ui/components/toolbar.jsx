// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2020 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

// Internal "ReactDOM"
import * as React from 'dom-magic';

import {Container} from './container.jsx';
import * as Buttons from './buttons/index';

function extractPlaceholder(bar){
    // buffer
    const placeholder = [];
    const regex=/{BTN_([A-Z_]+)}/g;

    // try to find placeholder
    let match;
    while ((match = regex.exec(bar)) != null){
        placeholder.push(match[1].toLowerCase());
    }

    return placeholder;
}

export function Toolbar(props){

    const btn = extractPlaceholder(props.layout).map(p => {
        if (Buttons[p]){
            return React.createElement(Buttons[p], {
                getRawCode: props.getRawCode,
                toggleClass: props.toggleClass
            });
        }else{
            return null;
        }
    }).filter( v => v!==null);

    // generate wrapper
    return <Container name={'toolbar-' + props.name} className="enlighter-toolbar">
        {btn}
    </Container>;
}