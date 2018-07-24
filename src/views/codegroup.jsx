// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2018 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

// Renderer
import _domBlockRenderer from '../renderer/dom-block';

// Internal "ReactDOM"
import * as React from '../lib/dom';

// button toolbar
import Toolbar from '../ui/toolbar.jsx';

// clipboard copy
import * as Clipboard from '../lib/clipboard';

export function codegroup(dataset, options){
    let wrapper = null;

    // index of the active tab
    let activeTabIndex = 0;

    // tabs, buttons
    let tabs = [];
    let buttons = [];

    // list of css classes to apply on the outer wrapper
    const cssClasses = [
        'enlighter-default',
        'enlighter-v-codegroup',
        'enlighter-t-' + dataset[0].params.theme
    ];

    // hover enabled ?
    if (options.linehover === true){
        cssClasses.push('enlighter-hover');
    }

    // utility function to toggle raw code
    function toggleContainer(){
        React.toggleClass(wrapper, 'enlighter-show-rawcode');
    }

    // utility to fetch raw code
    function getRawCode(){
        return dataset[activeTabIndex].code;
    }

    // utility function to swap tabs
    function showtab(index){
        // hide current element
        React.displayElement(tabs[activeTabIndex], false);

        // show new element
        React.displayElement(tabs[index], true);

        // unlight old button
        React.removeClass(buttons[activeTabIndex], 'enlighter-active');

        // highlight button
        React.addClass(buttons[index], 'enlighter-active');

        // store index
        activeTabIndex = index;
    }

    // utility to copy code to clipboard from current tab
    function copyCode(){
        Clipboard.copy(tabs[activeTabIndex], wrapper, 'enlighter-show-rawcode');
    }

    // initialize toolbar with custom event handlers
    const toolbarEl = Toolbar({
        toggleRawCode: toggleContainer,
        getRawCode: getRawCode,
        copyCode: copyCode
    });

    // list of tabs
    tabs = dataset.map(d => {
        // create container
        return <div style="display:none">
            {_domBlockRenderer(d.tokens, d.params)}
            <pre className="enlighter-raw">{d.code}</pre>
        </div>;
    });

    // list of tab buttons
    buttons = dataset.map((d, i) => <div className="enlighter-btn" onClick={e => showtab(i)}>{d.params.title||d.params.language}</div>);

    // highlight first button
    showtab(0);

    // create wrapper
    wrapper = 
    <div className={cssClasses.join(' ')}>
        <div className="enlighter-codegroup-switch">
            {buttons}
        </div>
        <div className="enlighter-codegroup-wrapper">
            {toolbarEl}
            {tabs}
        </div>
    </div>;

    // dbclick event ?
    if (options.rawcodeDbclick){
        wrapper.on('dbclick', toggleContainer);
    }

    return wrapper;
}