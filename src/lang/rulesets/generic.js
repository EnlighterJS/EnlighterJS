// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2020 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

// Commonly used Regular Expressions
export default {

    // single quoted strings: 'hello world'
    sqStrings: {
        regex: /('(?:[^'\\]|\\.)*')/g,
        type: 's0'
    },

    // double quoted strings: "hello world"
    dqStrings: {
        regex: /"(?:[^"\\]|\\.)*"/g,
        type: 's0'
    },

    // backtick quoted strings: `hello world`
    bqStrings: {
        regex: /`(?:[^`\\]|\\.)*`/g,
        type: 's0'
    },

    // chars in single quotes
    char: {
        regex: /('(\\.|.|\\\w+)')/g,
        type: 's1'
    },

    // slash style comments: // hello world
    slashComments: {
        regex: /(?:^|[^\\])(\/\/.*)$/gm,
        type: 'c0'
    },

    // pound comments: # hello world
    poundComments: {
        regex: /(?:^|[^\\])(#.*)$/gm,
        type: 'c0'
    },

    // block comments: (modern style) /* hello world */
    blockComments: {
        regex: /\/\*[\s\S]*?\*\//g,
        type: 'c1'
    },

    // doc comments: /** hello world */
    docComments: {
        regex: /\/\*\*[\s\S]*?\*\//g,
        type: 'c2'
    },
    
    // heredoc/nowdow
    heredoc: {
        regex:  /(<<[<-]?\s*?(['"]?)([A-Z0-9_]+)\2\s*\n[\s\S]*?\n\3)/gi,
        type: 's5'
    },

    // common used brackets: () {} [] <>
    brackets: {
        regex: /[[\](){}<>]+/g,
        type: 'g1'
    },

    // floats: -12.412e-12
    floats: {
        regex: /[\b\W](-?((?:\d+\.\d+|\.\d+|\d+\.)(?:e[+-]?\d+)?)|\d+(?:e[+-]?\d+))/gi,
        type: 'n0'
    },

    // complex numbers/floats: -12.412e-12i
    complex: {
        regex: /[\b\W](?:-?(?:(?:\d+\.\d+|\.\d+|\d+\.|\d+)(?:e[+-]?\d+)?)|\d+(?:e[+-]?\d+))[ij]/gi,
        type: 'n5'
    },

    // integers (non word boundary!): -1234
    int: {
        regex: /[\b\W](-?\d+)(?!\.)\b/g,
        type: 'n1'
    },

    // hex numbers: 0x21F1A9
    hex: {
        regex: /[\b\W](-?0x[A-F0-9]+)\b/gi,
        type: 'n2'
    },

    // binary numbers: 0b10001001
    bin: {
        regex: /[\b\W](-?0b[01]+)\b/gi,
        type: 'n3'
    },

    // octal numbers: 07172
    octal: {
        regex: /[\b\W](-?0[0-7]+)(?!\.)\b/g,
        type: 'n4'
    },

    // properties
    prop: {
        regex: /[\w\])]\.(\w+)\b/g,
        type: 'm3'
    },

    // function calls
    fCalls: {
        regex: /\b([\w]+)\s*\(/gm,
        type: 'm0'
    },

    // method calls
    mCalls: {
        regex: /\.([\w]+)\s*\(/gm,
        type: 'm1'
    },

    // boolean expression
    boolean: {
        regex: /\b(true|false)\b/gi,
        type: 'e0'
    },

    // null expression
    null: {
        regex: /\b(null)\b/gi,
        type: 'e1'
    }
}