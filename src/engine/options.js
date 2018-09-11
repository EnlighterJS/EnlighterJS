// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2018 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

// global options storage
export const _options = {
    // default code indentation
    indent: 4,

    // &amp; to &
    ampersandCleanup: true,

    // enable line hover highlighting
    linehover: true,

    // show linenumbers
    linenumbers: true,

    // no line offset
    lineoffset: 0,

    // no special line highlighting
    highlight: '',

    // default layout
    layout: 'standard',

    // default language
    language: 'generic',

    // default theme
    theme: 'enlighter',

    // show raw code on double click ?
    rawcodeDbclick: false,

    // text overflow behaviour: break/scroll
    textOverflow: 'break'
};

// set global enlighter options
export function setOptions(opt){
    Object.assign(_options, opt || {});
}

// fetch all options
export function getOptions(){
    return _options;
}

// fetch a single options
export function get(key){
    return _options[key] || null;
}

// set a single options
export function set(key, value){
    _options.key = value;
}