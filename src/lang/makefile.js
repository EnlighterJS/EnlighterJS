// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2023 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

// Generic Rules/Regex
import {generic} from './generic';

// makefile syntax
// Author: [Andi Dittrich]
// --
export class makefile extends generic {

    // language aliases
    static alias(){
        return ['make'];
    }

    setupLanguage() {

        this.rules = [

            // pound comments: # hello world
            {
                regex: /(?:^|[^\\\S])(#.*)$/gm,
                type: 'c0'
            },
            
            // dq strings, single escaped chars like \" can be used within bash scripts
            {
                regex: /[^\\]("(?:[^"\\]|\\.)*")/g,
                type: 's0'
            },

            // command wrapper
            {
                regex: /(\$)\(/gm,
                type: 's2'
            },

            // arguments
            {
                regex: /(\$\d)\b/gim,
                type: 'k9'
            },

            // variables
            {
                regex: /(\$\w+)\b/gim,
                type: 'k7'
            },

            // special variables
            {
                regex: /(\$[*+^@<?|])/gim,
                type: 'k9'
            },
            
            // variable assignment
            {
                regex: /^(\s*[\w_-]+\s*)[:?+!]?=/gm,
                type: 'k7'
            },

            // control keywords
            {
                regex: /\b(ifeq|else|endif|include|sinclude|-include|define|endef)\b/gi,
                type: 'k1'
            },

            // special keywords
            {
                regex: /(@echo|.PHONY)\b/gi,
                type: 'k9'
            },

            // general keywords
            {
                regex: /\b(return|function)\b/gi,
                type: 'k0'
            },

            // targets: (labels)
            {
                regex: /^([\w_.%-]+)\s*:/gm,
                type: 'k6'
            },
        ];
    }
}