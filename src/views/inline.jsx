// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2018 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

// Renderer
import _domInlineRenderer from '../renderer/dom-inline';

// Internal "ReactDOM"
import * as React from '../lib/dom';

export function inline(dataset){
    return <div className={'enlighter-default enlighter-v-inline enlighter-t-' + dataset[0].params.theme}>
        {_domInlineRenderer(dataset[0].tokens, dataset[0].params)}
    </div>;
}

