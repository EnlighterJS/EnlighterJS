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

export function collapse(props){
    // trigger raw code toggle
    function toggleCollapse(){
        props.toggleClass('enlighter-collapse-full');
    }

    return <Button name="collapse" tooltip="Expand" onClick={toggleCollapse}></Button>
}