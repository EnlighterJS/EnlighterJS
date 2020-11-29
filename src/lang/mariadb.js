// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2020 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

// Generic Rules/Regex
import _language_common_rules from './rulesets/generic';
import {sql} from './sql';

// MariaDB MySQL Syntax
// Author: [Andi Dittrich]
// --
export class mariadb extends sql {

    // language aliases
    static alias(){
        return ['mysql'];
    }

    setupLanguage(){
        // setup css
        super.setupLanguage();

        // addon rules
        const addonRules = [
            // single line comments
            _language_common_rules.poundComments,

            // static numeric types
            {
                regex: /\b(tinyint|smallint|mediumint|bigint|int|integer|boolean|decimal|number|float|double|bit|double precision|real|dec|numeric|fixed)\b/g,
                type: 'k5'
            },

            // qualifier/modifier
            {
                regex: /\b(unsigned|signed|zerofill)\b/g,
                type: 'k8'
            }
            
        ];

        // push to css rule-set
        this.rules = this.rules.concat(addonRules);
    }
}
