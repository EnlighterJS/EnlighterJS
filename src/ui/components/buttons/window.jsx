// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2020 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

// Internal "ReactDOM"
import * as React from 'dom-magic';

import {Button} from './button.jsx';

export function window(props){
    // optimization
    const _window = React.getWindow();

    // open raw code in new window
    function openCodeWindow(){

        // open new window
        const w = _window.open('', '', 'width=' + (_window.screen.width/2) + ', height=' + (_window.screen.height/2) + ', menubar=no, titlebar=no, toolbar=no, top=100, left=100, scrollbars=yes, status=no');

        // escape code
        const code = props.getRawCode().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

        // insert code
        w.document.body.innerHTML = '<pre>' + code + '</pre>';
        w.document.title = 'Sourcecode | EnlighterJS Syntax Highlighter';
    }
    
    return <Button name="window" tooltip="Open code in new window" onClick={openCodeWindow}></Button>
}