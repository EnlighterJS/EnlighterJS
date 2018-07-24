// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2018 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

import * as _dom from '../lib/dom';
import _foreach from '../lib/foreach';
import {getSpecialLines} from '../engine/special-lines';

export default function DomBlockRenderer(tokens, options = {}){
    // create new outer container element - use ol tag if lineNumbers are enabled
    const container = _dom.createElement((options.linenumbers === true) ? 'ol' : 'ul', {
        'class': 'enlighter'
    });

    // add "start" attribute ? line counting starts at defined offset
    if (options.linenumbers === true && options.lineoffset > 1){
        container.setAttribute('start', options.lineoffset);
    }

    // check if the current line is special (should highlighted)
    const isSpecialLine = getSpecialLines(options.highlight, options.lineoffset);

    // current line count
    let lineCounter = 0;

    // util to create a new lineg
    function addLine(){
        // increment line counter
        lineCounter++;

        // create new line
        return _dom.createElement('li', {
            'class': (isSpecialLine(lineCounter) ? 'enlighter-special' : '')
        });
    }

    // current line element
    let currentLine = addLine(1);

    // util to create output filter
    function addFragment(className, text){
        currentLine.appendChild(_dom.createElement('span', {
            'class': 'enlighter-' + className
        }, text));
    }

    // generate output based on ordered list of tokens
    _foreach(tokens, function(token){
        // split the token into lines
        const lines = token.text.split('\n');

        // line-breaks found ?
        if (lines.length > 1){
            // just add the first line
            addFragment(token.type, lines.shift());

            // generate element for each line
            _foreach(lines, function(line){
                // grab old line into output container
                container.appendChild(currentLine);

                // create new line, add special line classes - index starts at 0
                currentLine = addLine();

                // create new token-element
                addFragment(token.type, line);
            });

        // token is a simple fragment
        }else{
            addFragment(token.type, token.text);
        }
    });

    // grab last line into container
    container.appendChild(currentLine);

    return container;
}
