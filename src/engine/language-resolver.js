// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2019 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

// Container of Language Engines
import * as _languages from '../lang/index';

// internal alias list with default mappings
const _aliasList = {
    'standard': 'generic'
};

// list of language instances
const _instances = {};

// flag
let _aliasListGenerated = false;

// helper function to process aliases
function resolveAlias(lang){
    // alias list generated ?
    if (!_aliasListGenerated){
        // set flag
        _aliasListGenerated = true;

        // process each language support file
        for (const name in _languages){
            // alias available ?
            if (typeof _languages[name].alias !== 'function'){
                continue;
            }

            // get available aliases
            const aliases = _languages[name].alias();
            
            // process
            for (const alias of aliases){
                // assign alias to language filename
                _aliasList[alias] = name;
            }
        }
    }

    // resolve
    return _aliasList[lang];
}

// lookup alias
export function getLanguage(lang){
    // transform to lowercase
    lang = (lang || '').toLowerCase();

    // alias used ?
    lang = resolveAlias(lang) || lang;

    // language available ?
    return (_languages[lang] ? lang : null);
}

// create new instance
export function getInstance(name1, name2){
    // use given language - including generic fallback
    const languageIdentifier = getLanguage(name1) || getLanguage(name2) || 'generic';

    // instance already exists ?
    if (!_instances[languageIdentifier]){
        // create language engine instance
        _instances[languageIdentifier] = new _languages[languageIdentifier];
    }

    // return cached instance
    return _instances[languageIdentifier];
}