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

// open enlighterjs website
function openEnlighterLink(){
    React.getWindow().open('https://enlighterjs.org');
}

export function website(){
    return <Button name="website" tooltip="EnlighterJS 3 Syntax Highlighter" onClick={openEnlighterLink}></Button>
}