// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2018 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

export function getRawCodeFromElement(element, options){
    // get the raw content
    let code = element.innerHTML || '';

    // remove empty lines at the beginning+end of the codeblock
    code = code.replace(/(^\s*\n|\n\s*$)/gi, '');

    // apply input filter
    //code = this.textFilter.filterInput(code);

    // replace html escaped chars
    code = code .replace(/&lt;/gim, '<')
                .replace(/&gt;/gim, '>')
                .replace(/&nbsp;/gim, ' ');

    // cleanup ampersand ?
    // run cleanup after regular html escape sequences
    if (options.ampersandCleanup === true) {
        code = code.replace(/&amp;/gim, '&');
    }

    // get indent option value
    const newIndent = options.indent;

    // replace tabs with spaces ? re-indent code if specified
    if (newIndent !== false && newIndent > -1){
        // match all tabs
        code = code.replace(/(\t*)/gim, function(match, p1){
            // replace n tabs with n*newIndent spaces
            return (new Array(newIndent * p1.length + 1)).join(' ');
        });
    }

    return code;
}