// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2018 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

// Renderer
import {DomBlockRenderer} from '../renderer/dom-block.jsx';

// Internal "ReactDOM"
import * as React from '../../lib/dom';

import {Toolbar} from '../components/toolbar.jsx';
import {Container} from '../components/container.jsx';
import {RawCode} from '../components/rawcode.jsx';

export function standard(dataset){
    let wrapper = null;

    // extract options/params from first codeblock
    const options = dataset[0].params;

    // list of css classes to apply on the outer wrapper
    const cssClasses = [
        'enlighter-default',
        'enlighter-v-standard',
        'enlighter-t-' + dataset[0].params.theme
    ];

    // hover enabled ?
    if (options.linehover === true){
        cssClasses.push('enlighter-hover');
    }

    // linenumbers enabled ?
    if (options.linenumbers === true){
        cssClasses.push('enlighter-linenumbers');
    }

    // overflow === scroll
    if (options.textOverflow === 'scroll'){
        cssClasses.push('enlighter-overflow-scroll');
    }

    // utility function to toggle raw code
    function toggleContainer(){
        React.toggleClass(wrapper, 'enlighter-show-rawcode');
    }

    // utility to fetch raw code
    function getRawCode(){
        return dataset[0].code;
    }

    // generate wrapper
    wrapper =   <Container className={cssClasses}>
                    <Toolbar toggleRawCode={toggleContainer} getRawCode={getRawCode} />
                    <DomBlockRenderer tokens={dataset[0].tokens} options={dataset[0].params} />
                    <RawCode>{dataset[0].code}</RawCode>
                </Container>;

    // dbclick event ?
    if (options.rawcodeDbclick){
        wrapper.on('dbclick', toggleContainer);
    }

    return wrapper;
}