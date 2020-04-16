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
    // @scope SETTINGS
    indent: 4,

    // &amp; to &
    // @scope SETTINGS
    ampersandCleanup: true,

    // enable line hover highlighting
    // @scope SETTINGS
    linehover: true,

    // show raw code on double click ?
    // @scope SETTINGS
    rawcodeDbclick: false,

    // text overflow behaviour: break/scroll
    // @scope SETTINGS
    textOverflow: 'break',

    // enable collapse / vertical scroll
    // @scope SETTINGS
    collapse: false,

    // copy css classes from origin element to outer wrapper
    // @scope SETTINGS
    retainCssClasses: false,

    // additional css classes added to outer wrapper
    // @scope SETTINGS
    cssClasses: '',

    // top outer toolbar
    toolbarOuter: '{BTN_TABS}',

    // header toolbar
    toolbarTop: '{BTN_RAW}{BTN_COPY}{BTN_WINDOW}{BTN_WEBSITE}',

    // footer toolbar
    toolbarBottom: '{BTN_COLLAPSE}',

    // show linenumbers
    // @scope SETTINGS,ATTRIBUTE
    linenumbers: true,

    // no line offset
    // @scope SETTINGS,ATTRIBUTE
    lineoffset: 0,

    // no special line highlighting
    // @scope SETTINGS,ATTRIBUTE
    highlight: '',

    // default layout
    // @scope SETTINGS,ATTRIBUTE
    layout: 'standard',

    // default language
    // @scope SETTINGS,ATTRIBUTE
    language: 'generic',

    // default theme
    // @scope SETTINGS,ATTRIBUTE
    theme: 'enlighter',

    // default title
    // @scope SETTINGS,ATTRIBUTE
    title: ''
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
export function getOption(key){
    return _options[key] || null;
}

// set a single options
export function setOption(key, value){
    _options.key = value;
}