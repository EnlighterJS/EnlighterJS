// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2018 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

// Generic Rules/Regex
import {generic} from './generic';

export class raw extends generic{

    // RAW Code - create just a single text token
    setupLanguage(){
        this.rules = [
            // text pass-through
            {
                regex: /^(.*?)$/g,
                type: 'text'
            }
        ]
    }
}