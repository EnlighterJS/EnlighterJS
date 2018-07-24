// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2018 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

// Internal "ReactDOM"
import * as React from '../lib/dom';

export default function toolbar(options){

    // optimization
    const _window = React.getWindow();

    // open raw code in new window
    function openCodeWindow(){
                
        // open new window
        const w = _window.open('', '', 'width=' + (_window.screen.width/2) + ', height=' + (_window.screen.height/2) + ', menubar=no, titlebar=no, toolbar=no, top=100, left=100, scrollbars=yes, status=no');

        // escape code
        const code = options.getRawCode().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

        // insert code
        w.document.body.innerHTML = '<pre>' + code + '</pre>';
        w.document.title = 'Sourcecode | EnlighterJS Syntax Highlighter';
    }

    // open enlighterjs website
    function openEnlighterLink(){
        _window.open('https://enlighterjs.org');
    }

    // generate wrapper
    return <div className={'enlighter-toolbar'}>
        <div className="enlighter-btn enlighter-btn-raw" onClick={options.toggleRawCode} title="Toggle RAW code"></div>
        <div className="enlighter-btn enlighter-btn-copy" onClick={options.copyCode} title="Copy to clipboard"></div>
        <div className="enlighter-btn enlighter-btn-window" onClick={openCodeWindow} title="Open code in new window"></div>
        <div className="enlighter-btn enlighter-btn-website" onClick={openEnlighterLink} title="EnlighterJS 3 Syntax Highlighter"></div>
    </div>;
}