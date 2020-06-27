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

export function raw(props){
    // trigger raw code toggle
    function toggleRawCode(){
        props.toggleClass('enlighter-show-rawcode');
    }

    return <Button name="raw" tooltip="Plain text" onClick={toggleRawCode}></Button>
}