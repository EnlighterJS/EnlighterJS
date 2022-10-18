// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2020 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

// Internal "ReactDOM"
import * as React from 'dom-magic';

import * as _clipboard from '../../../lib/clipboard';
import {Button} from './button.jsx';
import {Tooltip} from './tooltip.jsx';

const text = {
    'error': 'Error: unable to copy to clipboard',
    'success': 'Code copied!',
    'label': 'Copy to clipboard'
}

export function copy(props){

    // tooltip element
    const tootltipElement = <Tooltip text={text.label}/>

    // trigger clipboard copy
    function copyToClipboard(){
        // try to copy to clipboard
        const success = _clipboard.copy(props.getRawCode());

        tootltipElement.innerText = (success ? text.success : text.error);

        // restore label after 2s 
        setTimeout(function(){
            tootltipElement.innerText = text.label
        }, 2000);
    }

    return <Button name="copy" tooltip={tootltipElement} onClick={copyToClipboard}></Button>
}
