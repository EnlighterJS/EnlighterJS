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
import * as React from 'dom-magic';

import {CodegroupSwitch} from '../components/codegroup-switch.jsx';
import {Toolbar} from '../components/toolbar.jsx';
import {Container} from '../components/container.jsx';
import {RawCode} from '../components/rawcode.jsx';

export function codegroup(dataset){
    let wrapper = null;

    // extract options/params from first codeblock
    const options = dataset[0].params;

    // index of the active tab
    let activeTabIndex = 0;

    // tabs, buttons
    let tabs = [];
    //let buttons = [];

    // list of css classes to apply on the outer wrapper
    const cssClasses = [
        'enlighter-default',
        'enlighter-v-codegroup',
        'enlighter-t-' + options.theme
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

    // limit vertical height ?
    if (options.collapse === true){
        cssClasses.push('enlighter-collapse');
    }

    // additional css classes set ?
    if (options.cssClasses.length > 0){
        cssClasses.push(...options.cssClasses);
    }

    // utility function to toggle raw code
    function toggleClass(name){
        React.toggleClass(wrapper, name);
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

        // store index
        activeTabIndex = index;
    }

    // list of tabs
    tabs = dataset.map(d => {
        // create container
        return <div style="display:none">
            <DomBlockRenderer tokens={d.tokens} options={d.params} />
            <RawCode>{d.code}</RawCode>
        </div>;
    });

    // highlight first button
    showtab(0);

    // create wrapper
    wrapper =   <Container className={cssClasses}>
                    <CodegroupSwitch onChange={i => showtab(i)} dataset={dataset} />

                    <Container name="codegroup-wrapper">
                        <Toolbar name="top" layout={options.toolbarTop} toggleClass={toggleClass} getRawCode={getRawCode} />
                        {tabs}
                        <Toolbar name="bottom" layout={options.toolbarBottom} toggleClass={toggleClass} getRawCode={getRawCode} />
                    </Container>
                </Container>;

    // dbclick event ?
    if (options.rawcodeDbclick){
        wrapper.on('dblclick', () => {
            toggleClass('enlighter-show-rawcode');
        });
    }

    return wrapper;
}