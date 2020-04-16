// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2018 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

import * as _dom from 'dom-magic';
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

    // get the options provided via javascript
    function getOption(name){
        // merge defaults - use utlity function to handle numbers + boolean options (|| operator won't!)
        return mergeOptions(elementOptions[name], _options[name], null);
    }

    // merge options:
    // 1. element options (data attribute)
    // 2. given options
    // 3. global options/defaults
    function getAttributeOption(name, type){
        // is attribute set ?
        let v = _dom.getElementDataAttribute(element, 'enlighter-' + name);

        // merge default values with provided element options
        const defaults = getOption(name);

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

    // additional css classes
    let additionalCssClasses = getOption('cssClasses') || '';

    // retain origin element classes ?
    if (getOption('retainCssClasses') === true){
        additionalCssClasses += ' ' + (_dom.getElementAttribute(element, 'class') || '');
    }

    // to array
    const cssClassList = additionalCssClasses.replace(/\s+/g, ' ').trim().split(' ');

    // merge options
    return {
        // @scope SETTINGS,ATTRIBUTE
        language:           getAttributeOption('language'),
        theme:              getAttributeOption('theme'),
        layout:             getAttributeOption('layout'),
        title:              getAttributeOption('title'),
        highlight:          getAttributeOption('highlight'),
        linenumbers:        getAttributeOption('linenumbers', 'boolean'),
        lineoffset:         getAttributeOption('lineoffset', 'int'),

        // @scope SETTINGS
        indent:             getOption('indent'),
        ampersandCleanup:   getOption('ampersandCleanup'),
        linehover:          getOption('linehover'),
        rawcodeDbclick:     getOption('rawcodeDbclick'),
        textOverflow:       getOption('textOverflow'),
        collapse:           getOption('collapse'),
        cssClasses:         cssClassList,
        toolbarTop:         getOption('toolbarTop'),
        toolbarBottom:      getOption('toolbarBottom'),
        toolbarHeader:      getOption('toolbarHeader')
    }
}

