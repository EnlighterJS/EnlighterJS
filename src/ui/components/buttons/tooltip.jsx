// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2022 Andi Dittrich <https://andidittrich.com>
// ----------------------------------------------------------------------

// Internal "ReactDOM"
import * as React from 'dom-magic';

export function Tooltip(props){
    return <div className="enlighter-tooltip">
        {props.text}
    </div>;
}