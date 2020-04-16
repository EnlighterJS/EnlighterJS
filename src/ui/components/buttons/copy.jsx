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

export function copy(props){
    // trigger clipboard copy
    function copyToClipboard(){
        // try to copy to clipboard
        _clipboard.copy(props.getRawCode());
    }

    return <Button name="copy" tooltip="Copy to clipboard" onClick={copyToClipboard}></Button>
}