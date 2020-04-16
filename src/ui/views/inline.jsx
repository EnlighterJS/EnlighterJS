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
import * as React from 'dom-magic';

import {Container} from '../components/container.jsx';

export function inline(dataset){
    // extract options/params from first codeblock
    const options = dataset[0].params;

    // list of css classes to apply on the outer wrapper
    const cssClasses = [
        'enlighter-default',
        'enlighter-v-inline',
        'enlighter-t-' + options.theme
    ];

    // additional css classes set ?
    if (options.cssClasses.length > 0){
        cssClasses.push(...options.cssClasses);
    }
    
    // render
    return  <Container className={cssClasses}>
                <DomInlineRenderer tokens={dataset[0].tokens} options={options} />
            </Container>;
}

