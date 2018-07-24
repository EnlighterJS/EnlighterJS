// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2018 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

import * as _dom from '../lib/dom';
import _foreach from '../lib/foreach';

export default function DomInlineRenderer(tokens){
    // create new outer container element
    const container = _dom.createElement('span', {
        'class': 'enlighter'
    });

    // generate output based on ordered list of tokens
    _foreach(tokens, function(token){
        container.appendChild(_dom.createElement('span', {
            'class': 'enlighter-' + token.type
        }, token.text));
    });

    return container;
}