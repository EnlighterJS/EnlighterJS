// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2020 Andi Dittrich <https://andidittrich.com>
// ----------------------------------------------------------------------

// Generic Rules/Regex
//import _language_common_rules from './rulesets/generic';
import {sql} from './sql';

// Oracle Database Syntax
// Author: [Andi Dittrich]
// --
export class mssql extends sql {

    // language aliases
    static alias(){
        return [];
    }

    setupLanguage(){
        // setup css
        super.setupLanguage();

        // addon rules
        const addonRules = [
        ];

        // push to css rule-set
        this.rules = this.rules.concat(addonRules);
    }
}
