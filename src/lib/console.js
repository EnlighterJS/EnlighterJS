// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2020 Andi Dittrich <https://andidittrich.com>
// ----------------------------------------------------------------------

export function error(...msg){
    const logger = console.error || console.log || function(){};
    logger(...msg);
}

export function log(...msg){
    const logger = console.log || function(){};
    logger(...msg);
}