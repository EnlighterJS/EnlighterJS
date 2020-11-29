// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2018 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

import _token from './token';
import * as _logger from '../lib/console';

function findAllMatches(code, rule, priority){
    // token list
    const tokens = [];
    
    // current match
    let match;

    // iteration counter
    let iterationCounter = 0;

    // find ALL possible matches
    while ((match = rule.regex.exec(code)) != null){
        // increment counter
        iterationCounter++;

        // throw an error on > 50k tokens - seems to be a infinite loop which may crash the browser!
        if (iterationCounter > 50000){
            throw new Error('Infinite tokenizer loop detected; more than 50k tokens - language rule [' + priority + '] ' +  rule.regex + ' seems to be broken');
        }

        // ignore empty matches
        if (match[0].length == 0){
            continue;
        }

        // overrides the usual regex behaviour of not matching results that overlap
        // normally it should be only +1.
        // to optimize the matching performance, we skip thrid of the result length and start the new matching
        rule.regex.lastIndex = match.index + 1 + match[0].length/3;

        // default type - first element
        const defaultType = (Array.isArray(rule.type)) ? rule.type[0] : rule.type;

        // default filter - first element
        const defaultFilter = ((Array.isArray(rule.filter)) ? rule.filter[0] : rule.filter) || null;

        // matching group used ?
        if (match.length > 1){

            // match indexOf offset
            let offset = 0;
            
            // process each matching group as single token
            for (let i=1;i<match.length;i++){

                // valid match ?
                if (match[i]){
                    // is array ? get nth type
                    const type = (Array.isArray(rule.type) && rule.type.length >= i) ? rule.type[i-1] : defaultType;

                    // is array ? get nth type
                    const filter = (Array.isArray(rule.filter) && rule.filter.length >= i) ? rule.filter[i-1] : defaultFilter;

                    // get match index - avoid overlapping using offset
                    const matchPosition = match[0].indexOf(match[i], offset);

                    // set new offset
                    offset = matchPosition;

                    // create new token
                    tokens.push(_token(match[i], type, filter, match.index + matchPosition, priority));
                }
            }
        }else{
            // use full pattern matching
            tokens.push(_token(match[0], defaultType, defaultFilter, match.index, priority));
        }
    }

    return tokens;
}

// Stage-1 Master Tokenizer
export function getTokens(code, rules, defaultTokenType = 'text'){
    // token list
    let rawTokens = [];

    // apply each rule to given sourcecode string
    for (let priority=0;priority<rules.length;priority++){
        // extract current rule
        const rule = rules[priority];

        // valid rule ? otherwise skip it!
        if (!rule || !rule.type || !rule.regex){
            return;
        }

        try{
            // try to get all tokens
            const tokens = findAllMatches(code, rule, priority);

            // push tokens to list
            rawTokens = rawTokens.concat(tokens);

        // catch and ignore tokenizer errors
        }catch(e){
            _logger.error(e);
        }
    }

    // sort tokens by index (first occurrence) AND priority
    rawTokens = rawTokens.sort(function(token1, token2){

        // same position ? => use rule prioritisation
        if (token1.index == token2.index){
            // priority comparison
            return (token1.priority < token2.priority) ? -1 : 1;

        // different position: first match wins
        }else{
            return (token1.index < token2.index) ? -1 : 1;
        }
    });

    // cleaned token list to render
    const tokens = [];

    // last token position
    let lastTokenEnd = 0;

    // iterate over raw token list and retain the first match - drop overlaps
    for (let i=0; i<rawTokens.length; i++){
        // unmatched text between tokens ?
        if (lastTokenEnd < rawTokens[i].index ){
            // create new start text token
            tokens.push(_token(code.substring(lastTokenEnd, rawTokens[i].index), defaultTokenType, null, lastTokenEnd));
        }

        // token callback set ?
        if (rawTokens[i].filter){
            // process tokens
            const subTokens = rawTokens[i].filter(rawTokens[i]) || [];

            // append subtokens
            for (let j=0;j<subTokens.length;j++){
                tokens.push(subTokens[j]);
            }

        // default -> use token directly
        }else{
            // push current token to list
            tokens.push(rawTokens[i]);
        }

        // store last token position
        lastTokenEnd = rawTokens[i].end;

        // find next, non overlapping token
        let nextTokenFound = false;
        for (let j = i + 1; j < rawTokens.length; j++){
            if (rawTokens[j].index >= lastTokenEnd){
                // the "current" token -> i will be incremented in the next loop => j-1
                i = j-1;
                nextTokenFound = true;
                break;
            }
        }

        // final position reached ?
        if (nextTokenFound===false){
            break;
        }
    }

    // text fragments complete ? or is the final one missing ?
    if (lastTokenEnd < code.length){
        tokens.push(_token(code.substring(lastTokenEnd), defaultTokenType, null, lastTokenEnd));
    }

    return tokens;
}
