// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2018 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

import * as _dom from '../lib/dom';
import {_options} from './options';

// merge multiple options
function mergeOptions(...options){
    // extract final options
    const final = options.pop();

    // iterate over options
    for (let i=0;i<options.length;i++){
        // extract option
        const o = options[i];

        // value exists and not null ?
        if( (typeof o !== 'undefined') && o !== null){
            return o;
        }
    }

    // fallback
    return final;
}

// utility function to fetch enlighter data attributes and merge local + global options
export function parse(element, elementOptions){
    // merge options:
    // 1. element options (data attribute)
    // 2. given options
    // 3. global options/defaults
    function getEnlighterAttribute(name, type){
        // is attribute set ?
        let v = _dom.getElementDataAttribute(element, 'enlighter-' + name);

        // merge defaults - use utlity function to handle numbers + boolean options (|| operator won't!)
        const defaults = mergeOptions(elementOptions[name], _options[name], null);

        // string input
        if (v && v.length > 0){
            switch (type){

                // boolean flags
                case 'boolean':
                    // lc
                    v = v.toLowerCase().trim();

                    // boolean string expression given ?
                    if (v === 'true'){
                        return true;
                    }else if (v === 'false'){
                        return false;
                    }else{
                        return defaults;
                    }

                case 'int':
                    // parse integer (fault tolerant)
                    v = parseInt(v);

                    // valid number ?
                    if (isNaN(v)){
                        return defaults;
                    }else{
                        return v;
                    }
                    
                // string
                default:
                    return v;
            }

        // use defaults
        }else{
            return defaults;
        }
    }

    // rendering parameters
    // add some defaults
    return {
        language: getEnlighterAttribute('language') || 'generic',
        theme: getEnlighterAttribute('theme') || 'enlighter',
        layout: getEnlighterAttribute('layout') || 'standard',
        title: getEnlighterAttribute('title'),
        highlight: getEnlighterAttribute('highlight'),
        linenumbers: getEnlighterAttribute('linenumbers', 'boolean'),
        lineoffset: getEnlighterAttribute('lineoffset', 'int')
    }
}

