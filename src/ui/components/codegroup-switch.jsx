// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2018 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

// Internal "ReactDOM"
import * as React from 'dom-magic';

import {Container} from './container.jsx';
import {Button} from './buttons/button.jsx';

export function CodegroupSwitch(props){

    // index of currently active button
    let activeButton = 0;

    // buttons
    let buttons = [];

    function click(i){
        // unlight old button
        React.removeClass(buttons[activeButton], 'enlighter-active');

        // highlight button
        React.addClass(buttons[i], 'enlighter-active');

        // store active button
        activeButton = i;

        // propagate event
        props.onChange(i);
    }

    // generate buttons
    buttons = props.dataset.map((d, i) => {
        return <Button 
                onClick={() => click(i)} 
                text={d.params.title||d.params.language} 
                />
    });

    // first button is active
    React.addClass(buttons[0], 'enlighter-active');

    // generate wrapper
    return  <Container name="codegroup-switch">
                {buttons}
            </Container>;
}