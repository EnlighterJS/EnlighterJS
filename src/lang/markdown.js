// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2018 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

// Generic Rules/Regex
import {generic} from './generic';

// Markdown Highlighting
// Author: [Andi Dittrich]
// --
export class markdown extends generic {

    // language aliases
    static alias(){
        return ['md', 'gfm'];
    }

    setupLanguage() {

        this.rules = [

            // code block
            {
                regex: /[\r|\n](```[a-z_-]*[\r|\n][\S\s]+?```)/gi,
                type: 't8'
            },

            // # header
            {
                regex: /^\s*#{1,6}.+$/gm,
                type: 't1'
            },

            // underline-ish header style
            {
                regex: /(.+[\r|\n][=-]{3,})[\r|\n]/g,
                type: 't1'
            },

            // code inline
            {
                regex: /`.+?`/g,
                type: 't8'
            },

            // horizontal lines
            {
                regex: /^(?:\*|_|-){3,}$/gm,
                type: 't2'
            },

            // formatting strong/italic
            {
                regex: /\W(\*\*|\*|~~|~|__|_)(.*?\1)\W/gm,
                type: 't4'
            },

            // hyperlinks
            {
                regex: /!?\[.*?]\(.*?\)/g,
                type: 't3'
            }
        ];
    }
}













