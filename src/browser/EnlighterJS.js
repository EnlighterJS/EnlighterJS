// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2018 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

import * as _engine from '../engine/engine';
import * as _dom from 'dom-magic';
import {setOptions} from '../engine/options';
import {getRawCodeFromElement} from '../engine/sourcecode-extractor';
import * as _codegroupMapper from '../engine/codegroup-mapper';
import * as _optionReader from '../engine/option-reader';
import * as _elementManager from '../engine/element-manager';
import * as _logger from '../lib/console';

// static properties
export const version = '[[VERSION]]';

// enlighter a single element/codegroup
export function enlight(elements, elementOptions={}){
    try {
        // single element or group to highlight ?
        if (!Array.isArray(elements)){
            // to array 
            elements = [elements];
        }

        // empty dataset ?
        if (elements.length === 0){
            return false;
        }

        // remove highlighted codeblock ?
        if (elementOptions === false){
            // try to remove highlighted codeblock referenced by origin element
            return _elementManager.remove(elements[0]);
        }

        // already highlighted ?
        if (_dom.hasClass(elements[0], 'enlighter-origin')){
            return false;
        }
        
        // prepare elements, extract code
        const dataset = elements.map(function(element){
            // extract + parse params
            const params = _optionReader.parse(element, elementOptions);

            // extract code
            const code = getRawCodeFromElement(element, params);

            // hide the element
            _dom.addClass(element, 'enlighter-origin');

            // render the 
            return {element, code, params}
        });

        // render code
        const wrapper = _engine.render(dataset);

        // add element before the original container
        _dom.insertBefore(elements[0], wrapper);

        // store element reference
        _elementManager.add(elements, wrapper);

        // ok
        return true;
        

    // Global Error Handling (FATAL ERRORS)
    }catch (err){
        _logger.error('EnlighterJS Internal Error:', err);
        return false;
    }
}

// static entry - highlight elements (block, codegroup, inline) by css selector
export function init(blockSelector = 'pre.ejs', inlineSelector = 'code.ejs', opt=null, layout={}){
    // set global options
    setOptions(opt);

    // fetch all inline and block elements
    const blockElements = _dom.getElements(blockSelector);
    const inlineElements = _dom.getElements(inlineSelector);

    // separate codegroups and standalone elements
    const {standalone, groups} = _codegroupMapper.map(blockElements);

    // enlight all matched block-elements
    for (let i = 0; i < standalone.length; i++) {
        enlight(standalone[i], {
            layout: layout.block || 'standard'
        });
    }

    // enlight all matched codegroups block-elements
    for (let i = 0; i < groups.length; i++) {
        enlight(groups[i], {
            layout: layout.codegroup || 'codegroup'
        });
    }

    // enlight all matched inline-elements
    for (let i = 0; i < inlineElements.length; i++) {
        enlight(inlineElements[i], {
            layout: layout.inline || 'inline'
        });
    }
}