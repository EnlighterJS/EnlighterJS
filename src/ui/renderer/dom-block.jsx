// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2018 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------


// Internal "ReactDOM"
import * as React from 'dom-magic';

import {getSpecialLines} from '../../engine/special-lines';

export function DomBlockRenderer({tokens, options}){

    // check if the current line is special (should highlighted)
    const isSpecialLine = getSpecialLines(options.highlight, options.lineoffset);

    // buffer
    const lines = [];

    // current line element
    let currentLine = [];

    // generate multiline structure from tokens
    tokens.forEach(token => {
        // split the token into lines
        const multilines = token.text.split('\n');

        // token is a simple fragment - no linebreaks
        if (multilines.length === 1){
            currentLine.push([token.type, token.text]);

        // line-breaks found
        }else{

            // add the first fragment to the current line
            currentLine.push([token.type, multilines.shift()]);

            // generate element for each line
            multilines.forEach(line => {
                // grab old line into output container
                lines.push(currentLine);

                // create new line, add special line classes - index starts at 0
                currentLine = [];

                // create new token-element
                currentLine.push([token.type, line]);
            });
        }
    });

    // grab last line into container
    lines.push(currentLine);

    // list of styles 
    const styles = [];

    // lineoffset ?
    if (options.lineoffset > 0){
        // set css counter start
        styles.push("counter-reset: enlighter " + (parseInt(options.lineoffset)-1));
    }

    return <div className="enlighter" style={styles.join(';')}>
        {lines.map((line, index) => {
            return <div className={(isSpecialLine(index+1) ? 'enlighter-special' : '')}>
                <div>
                {line.map(fragment => {
                    return <span className={'enlighter-' + fragment[0]}>{fragment[1]}</span>
                })}
                </div>
            </div>
        })}
    </div>;
}
