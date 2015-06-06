/*
---
description: Filters the RAW Code from given pre tags

license: MIT-style

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.TextFilter]
...
*/
EJS.TextFilter = new Class({

    Implements: Options,

    options: {
        cryptex: {
            enabled: false,
            email: 'protected.email@example.tld'
        }
    },

    initialize: function (options) {
        this.setOptions(options);
    },
    /**
     * Apply Filter to text fragments output)
     * @param textFragment
     */
    filterOutput: function(textFragment){
        return textFragment;
    },

    /**
     * Apply filter to the input chain (text block)
     * @param text
     * @returns {*}
     */
    filterInput: function(text){

        // apply cryptex email address filter ?
        if (this.options.cryptex.enabled===true){
            text = text.replace(/<!--CTX!--><span (rel="([a-f0-9]+)")?[\s\S]*?<!--\/CTX!-->/gim, function(match, m1, m2, offset, string){
                if (m2 && m2.length>2 && typeof window.Cryptex != 'undefined') {
                    return window.Cryptex.decode(m2);
                }else{
                    return this.options.cryptex.email;
                }
            }.bind(this));
        }

        return text;
    }
});