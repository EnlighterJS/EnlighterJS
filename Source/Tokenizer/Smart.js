/*
---
description: Smart parsing engine for Lighter.

license: MIT-style

authors:
  - Jose Prado
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Tokenizer.Smart]
...
*/
EnlighterJS.Tokenizer.Smart = new Class({

    Extends: EnlighterJS.Tokenizer,
    
    /**
     * @constructs
     */
    initialize: function(){
    },
    
    /**
	 * @param {Language}
	 *            language The language to use for parsing.
	 * @param {String}
	 *            code The code to parse.
	 * @return {Array} The array of matches found.
     */
    parseTokens: function(language, code){
        var tokens        = [],
            startIndex   = 0,
            matchIndex   = code.length,
            match        = null,
            text         = null,
            type         = null,
            newToken      = null,
            rules        = {},
            currentMatch = null,
            futureMatch  = null;
        
        // Create assosciative array of rules for faster access via for...in loop instead of .each().
        Object.each(language.getRules(), function(regex, rule) {
            rules[rule] = { pattern: regex, nextIndex: 0 };
        }, this);
        
        /**
         * Step through the source code sequentially finding the left-most/earliest matches and then
         * continuing beyond the end of that match to prevent parser from adding inner matches.
         */
        while(startIndex < code.length) {
            matchIndex = code.length;
            match      = null;
            
            // Apply each rule at the current startIndex.
            for (var rule in rules) {
                rules[rule].pattern.lastIndex = startIndex;
                currentMatch = rules[rule].pattern.exec(code);
                if (currentMatch === null) {
                    // Delete rule if there's no matches.
                    delete rules[rule];
                } else {
                    // Find earliest and longest match, then store relevant info.
                    if (currentMatch.index < matchIndex || (currentMatch.index == matchIndex && match[0].length < currentMatch[0].length)) {
                        match      = currentMatch;
                        type       = rule;
                        matchIndex = currentMatch.index;
                    }
                    // Store index of rules' next match in nextIndex property.
                    rules[rule].nextIndex = rules[rule].pattern.lastIndex - currentMatch[0].length;
                }
            }
            
            /* Create a new Token out of found match. Otherwise break out of loop since no
               matches are left. */
            if (match !== null) {
            
                // If $1 capture group exists, use $1 instead of full match.
                index = (match[1] && match[0].contains(match[1])) ? match.index + match[0].indexOf(match[1]) : match.index;
                text  = match[1] || match[0];
                newToken = new EnlighterJS.Token(text, type, index);
                tokens.push(newToken);
                
                /* Find the next match of current rule and store its index. If not done, the nextIndex
                   would be at the start of current match, thus creating an infinite loop*/
                futureMatch = rules[type].pattern.exec(code);
                if (!futureMatch) {
                    rules[type].nextIndex = code.length;
                } else {
                    rules[type].nextIndex = rules[type].pattern.lastIndex - futureMatch[0].length;
                }
                
                // Cycle through "nextIndex" properties and store earliest position in min variable.
                var min = code.length;
                for (rule in rules) {
                    if (rules[rule].nextIndex < min) {
                        min = rules[rule].nextIndex;
                    }
                }
                
                /* Set startIndex to the end of current match if min is located behind it. Normally this
                   would signal an inner match. Future upgrades should do this test in the min loop
                   in order to find the actual earliest match. */
                startIndex = Math.max(min, newToken.end);
            } else {
                break;
            }
        }
        
        return tokens;
    }
});
