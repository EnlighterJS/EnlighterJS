// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2018 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

// Internal "ReactDOM"
import * as React from '../../lib/dom';

import {Container} from './container.jsx';
import {Button} from './button.jsx';

import * as _clipboard from '../../lib/clipboard';

export function Toolbar(props){

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

    // open enlighterjs website
    function openEnlighterLink(){
        _window.open('https://enlighterjs.org');
    }

    // trigger clipboard copy
    function copyToClipboard(){
        // try to copy to clipboard
        _clipboard.copy(props.getRawCode());
    }

    // generate wrapper
    return <Container name="toolbar">
        <Button name="raw" tooltip="Toggle RAW code" onClick={props.toggleRawCode}></Button>
        <Button name="copy" tooltip="Copy to clipboard" onClick={copyToClipboard}></Button>
        <Button name="window" tooltip="Open code in new window" onClick={openCodeWindow}></Button>
        <Button name="website" tooltip="EnlighterJS 3 Syntax Highlighter" onClick={openEnlighterLink}></Button>
    </Container>;
}