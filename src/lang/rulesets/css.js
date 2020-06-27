// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2020 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

// Commonly used Regular Expressions
export default {
    // pseudo elements + selectors
    pseudoElements: {
        regex: /[\w\])](::?[\w-]+)\b/g,
        type: 'x15'
    },

    // id selector
    idSelector: {
        regex: /(#[\w-]+)/g,
        type: 'x10'
    },

    // class selector
    classSelector: {
        regex: /(\.[\w-]+)/g,
        type: 'x11'
    },

    // element selector
    elementSelector: {
        regex: /\b([\w-]+)/g,
        type: 'x16'
    }

}