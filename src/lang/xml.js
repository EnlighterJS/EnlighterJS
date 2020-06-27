// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2018 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

// Generic Rules/Regex
import {generic} from './generic';

import _token from '../engine/token';
import _microTokenizer from '../engine/micro-tokenizer';

// XML Markup Pattern
// Author: [Andi Dittrich]
// --
export class xml extends generic {

    // language aliases
    static alias(){
        return ['html'];
    }

    setupLanguage(){

        // xml attributes. Stage-2 Analyzing
        // @todo support unicode chars 
        // @see https://www.w3.org/TR/xml/#d0e804
        // @see https://www.w3.org/TR/2011/WD-html5-20110525/syntax.html#syntax-attribute-name
        function parseXmlAttributes(token){
            // run the MicroTokenizer to identify the name=value match
            return _microTokenizer(token, /\b([^\s\0"'>/=]+)(\s*=\s*)((['"]).*?\4|[^'" \t]+)/gi, function(match){
                // attribute name | assignment operator | attribute value (string)
                return [_token(match[1], 'x2'), _token(match[2], 'k3'), _token(match[3], 's0')];
            });
        }

        this.rules = [

            // doctype
            {
                regex: /<!DOCTYPE[\s\S]+?>/g,
                type: 'k9'
            },

            // xml directives
            {
                regex: /<\?xml[\s\S]+\?>/gi,
                type: 'k4'
            },

            // multi line comments
            {
                regex: /<!--[\s\S]*?-->/g,
                type: 'c1'
            },

            // CDATA
            {
                regex: /(<!\[CDATA\[)([\s\S]*?)(]]>)/gim,
                type: ['c9', 'text', 'c9']
            },

            // opening tags + self closing
            {
                regex: /(<)([A-Z:_][A-Z0-9:.-]*)([\s\S]*?)(\/?>)/gi,
                type: ['g1', 'x1', 'text', 'g1'],
                filter: [null, null, parseXmlAttributes, null]
            },

            // closing tags
            {
                regex: /(<\/)([A-Z:_][A-Z0-9:.-]*\s*)(>)/gi,
                type: ['g1', 'x1', 'g1']
            }
        ];
    }
}
