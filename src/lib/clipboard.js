// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2018 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

// Internal "ReactDOM"
import * as DOM from './dom';

// copy content of sourceElement to clipboard
export function copy(sourceElement, wrapper=null, toggleClass){
    // optimization
    const _document = DOM.getDocument();
    const _window = DOM.getWindow();

    try{
        // select source element
        const range = _document.createRange();
        range.selectNodeContents(sourceElement);

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
    
    let success = false;

    // just copy in case the raw code pane is visible
    if (wrapper===null || DOM.hasClass(wrapper, toggleClass)){
        success = execCommand();

    // set raw container temporary visible
    }else{
        DOM.toggleClass(wrapper, toggleClass);
        success = execCommand();
        DOM.toggleClass(wrapper, toggleClass);
    }

    // remove range from window
    _window.getSelection().removeAllRanges();

    return success;
}