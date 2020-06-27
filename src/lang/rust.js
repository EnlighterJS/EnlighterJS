// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2018 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

// Generic Rules/Regex
import _language_common_rules from './rulesets/generic';
import {generic} from './generic';

// Rust Language https://doc.rust-lang.org
// Author: [Andi Dittrich]
// --
export class rust extends generic {

    setupLanguage() {

        this.rules = [

            // chars
            _language_common_rules.char,

            // strings
            {
                regex: /r((#+)".*?"\2)/gm,
                type: 's0'
            },

            // raw strings
            {
                regex: /("(?:\\.|\\\s*\n|\\s*\r\n|[^\\"])*")/g,
                type: 's0'
            },

            // directives
            {
                regex: /^\s*#.*$/gm,
                type: 'k4'
            },

            // method defs
            {
                regex: /fn\s+([\w]+)\s*(<\w+\s*>)?\(/gm,
                type: 'k0'
            },

            // function defs
            {
                regex: /\b\.?([\w]+)\s*(\(|::)/gm,
                type: 'k1'
            },

            // macro defs
            {
                regex: /\b([\w]+)!/gm,
                type: 'k9'
            },

            // keywords
            {
                regex: /\bself\b/gi,
                type: 'k9'
            },

            _language_common_rules.boolean,

            // control keywords
            {
                regex: /\b(while|loop|in|for|if|else|do|continue|break)\b/g,
                type: 'k1'
            },

            // type initialization
            {
                regex: /\b(type|struct|let|enum)\b/g,
                type: 'k2'
            },

            // qualifier/modifier
            {
                regex: /\b(const)\b/g,
                type: 'k8'
            },

            // keywords
            {
                regex: /\b(yield|where|virtual|use|unsized|unsafe|trait|super|static|return|ref|pure|pub|proc|priv|override|offsetof|mut|move|mod|match|macro|impl|fn|final|extern|crate|box|become|as|alignof|abstract)\b/g,
                type: 'k0'
            },

            // operator
            {
                regex: /\b(sizeof|typeof)\b/g,
                type: 'k3'
            },

            // float literals
            {
                regex: /\b([0-9_]+\.?[0-9_]+?(e\+[0-9_]+)?)(?:f32|f64)?\b/gim,
                type: 'n0'
            },

            // int literals
            {
                regex: /\b([0-9_]+|0o[0-9_]+|0x[A-F0-9_]+|0b[0-1_]+)(?:u8|i8|u16|i16|u32|i32|u64|i64|isize|usize)?\b/gim,
                type: 'n1'
            },

            // comments
            _language_common_rules.slashComments,
            _language_common_rules.blockComments,

            // doc comments
            {
                regex: /(?:^|[^\\])\/\/[/!].*$/gm,
                type: 'c2'
            },
            {
                regex: /\/\*[*!][\s\S]*?\*\//gm,
                type: 'c2'
            },

            _language_common_rules.brackets,

            // operators
            {
                regex: /\W(&)\w/g,
                type: 'k3'
            }

        ];
    }
}