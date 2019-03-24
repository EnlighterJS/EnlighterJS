// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2018 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

// Internal "ReactDOM"
import * as React from '../../lib/dom';

export function DomInlineRenderer({tokens}){
    return <span className="enlighter">
        {tokens.map(token => {
             return <span className={'enlighter-' + token.type}>{token.text}</span>
        })}
    </span>;
}