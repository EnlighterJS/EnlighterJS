// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2018 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

// Internal "ReactDOM"
import * as DOM from 'dom-magic';

// copy content to clipboard
export function copy(content){
    // optimization
    const _document = DOM.getDocument();
    const _window = DOM.getWindow();

    // create dummy node
    const contentContainer = DOM.createElement('pre', {className: 'enlighter-clipboard'}, content);

    // append dummy element to document
    _document.body.appendChild(contentContainer)

    try{
        // select source element
        const range = _document.createRange();
        range.selectNodeContents(contentContainer);

        // add range to window
        const selection = _window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }catch(e){
        return false;
    }

    // exec wrapper
    function execCommand(){
        try{
            return _document.execCommand('copy');
        }catch(e){
            return false;
        }
    }
    
    // try to exec "copy"
    const success = execCommand();

    // remove range from window
    _window.getSelection().removeAllRanges();

    // dispose dummy element
    DOM.disposeElement(contentContainer);

    return success;
}