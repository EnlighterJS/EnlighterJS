// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2018 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

// array/object foreach
export default function foreach(objectOrArray, cb, context){
    if (!objectOrArray){
        return;
    }

    // array or object?
    if (Array.isArray(objectOrArray)){
        // run callback for each array element
        for (let i=0;i<objectOrArray.length;i++){
            cb.apply(context || cb, [objectOrArray[i], i]);
        }

    // object..
    }else{
        // iterate over object properties
        for (const key in objectOrArray){
            // object property ?
            if (!objectOrArray.hasOwnProperty(key)){
                continue;
            }

            // run callback
            cb.apply(context || cb, [objectOrArray[key], key]);
        }
    }
}

