// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2019 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

// Generic Rules/Regex
import _language_common_rules from './rulesets/generic';
import {generic} from './generic';

// QML https://doc.qt.io/qt-5/qtqml-syntax-basics.html
// Author: [Andi Dittrich]
// --
export class qml extends generic {

    setupLanguage() {

        this.rules = [

            // strings
            _language_common_rules.dqStrings,

            // properties
            _language_common_rules.prop,

             // types - starting with uppercase char
            {
                regex: /\b([A-Z]\w+)\b/g,
                type: 'k5'
            },

            // package directives
            {
                regex: /^(import)(\s+[\w.]+)/gm,
                type: ['k0', 'k5']
            },

            // static types
            {
                regex: /\b(bool|char|double|float|int|long|short|void|string)\b/g,
                type: 'k5'
            },

            // function/method calls
            _language_common_rules.mCalls,

            // boolean, null
            _language_common_rules.null,
            _language_common_rules.boolean,

            // comments
            _language_common_rules.slashComments,
            _language_common_rules.blockComments,

            // numbers
            _language_common_rules.int,
            _language_common_rules.floats,

            // brackets
            _language_common_rules.brackets

        ];
    }
}
