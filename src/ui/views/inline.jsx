// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2018 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

// Renderer
import {DomInlineRenderer} from '../renderer/dom-inline.jsx';

// Internal "ReactDOM"
import * as React from '../../lib/dom';

import {Container} from '../components/container.jsx';

export function inline(dataset){
    // list of css classes to apply on the outer wrapper
    const cssClasses = [
        'enlighter-default',
        'enlighter-v-inline',
        'enlighter-t-' + dataset[0].params.theme
    ];
    
    // render
    return  <Container className={cssClasses}>
                <DomInlineRenderer tokens={dataset[0].tokens} options={dataset[0].params} />
            </Container>;
}

