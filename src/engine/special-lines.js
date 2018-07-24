// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2018 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

export function getSpecialLines(lineNumberString, lineOffsetString){
    // special lines given ?
    if (typeof lineNumberString !== 'string' || lineNumberString.length === 0){
        // empty generator
        return function(){
            return false;
        };
    }

    // line offset available ?
    const rawLineOfsset = parseInt(lineOffsetString);
    const lineOffset = (!isNaN(rawLineOfsset) && rawLineOfsset > 1 ? rawLineOfsset-1 : 0);

    // list of special lines (lookup table)
    const specialLines = {};

    // split attribute string into segments
    const segments = lineNumberString.split(',');

    // iterate over segments
    segments.forEach(function(item){
        // pattern xxxx-yyyy
        const parts = item.match(/([0-9]+)-([0-9]+)/);
        
        // single line or line-range
        if (parts!=null){
            // 2 items required
            const start = parseInt(parts[1])-lineOffset;
            const stop = parseInt(parts[2])-lineOffset;
            
            // valid range ? forward only
            if (stop > start){
                // add lines to storage
                for (let i=start;i<=stop;i++){
                    specialLines['' + i] = true;
                }
            }
        }else{
            // add line to storage
            specialLines['' + (parseInt(item)-lineOffset)] = true;
        }
    });

    // line selected ?
    return function isSpecial(line){
        return (specialLines['' + line]) || false;
    }
}