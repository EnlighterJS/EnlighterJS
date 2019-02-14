// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2018 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

// Renderer
import _domBlockRenderer from '../renderer/dom-block.jsx';

// Internal "ReactDOM"
import * as React from '../lib/dom';

// button toolbar
import Toolbar from '../ui/toolbar.jsx';

// clipboard copy
import * as Clipboard from '../lib/clipboard';

export function standard(dataset, options){
    let wrapper = null;

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

    // code container
    const codeEl = _domBlockRenderer(dataset[0].tokens, dataset[0].params);

    // raw container
    const rawEl = <pre className="enlighter-raw">{dataset[0].code}</pre>;

    // utility function to toggle raw code
    function toggleContainer(){
        React.toggleClass(wrapper, 'enlighter-show-rawcode');
    }

    // utility to fetch raw code
    function getRawCode(){
        return dataset[0].code;
    }

    // utility to copy code to clipboard from current tab
    function copyCode(){
        Clipboard.copy(rawEl, wrapper, 'enlighter-show-rawcode');
    }

    // initialize toolbar with custom event handlers
    const toolbarEl = Toolbar({
        toggleRawCode: toggleContainer,
        getRawCode: getRawCode,
        copyCode: copyCode
    });

    // generate wrapper
    wrapper = <div className={cssClasses.join(' ')}>
            {toolbarEl}
            {codeEl}
            {rawEl}            
        </div>;

    // dbclick event ?
    if (options.rawcodeDbclick){
        wrapper.on('dbclick', toggleContainer);
    }

    return wrapper;
}