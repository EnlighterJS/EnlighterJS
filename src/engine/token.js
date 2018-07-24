// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2018 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

// create token object
export default function token(text, type, filter, index, priority){
    return{
        text: text,
        type: type,
        index: index || 0,
        end: text.length + index,
        filter: filter || null,
        priority: priority || 0
    }
}