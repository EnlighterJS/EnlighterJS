/*
---
description: Extends MooTools.Element with the `enlight()` shortcut. Also adds `light()` and `unlight()` for backward compatibility with Lighter.js

license: MIT-style X11 License

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [Element.enlight]
...
 */

Element.implement({
    /**
     * Highlights an element/Removes Element highlighting
     *
     * @param {Object, Boolean} [options] EnlighterJS options Object or Boolean value to enable/disable highlighting
     * @returns {Element} The current Element instance.
     */
    enlight: function(options){
        // mixed input check - options available ?
        options = (typeof(options) == "undefined") ? {} : options;

        // convert "true" to empty Object!
        options = (options===true) ? {} : options;

        // enlighter instance already available ?
        var enlighter = this.retrieve('EnlighterInstance');

        // dispose element ?
        if (options === 'dispose' && enlighter){
            enlighter.dispose();
            this.eliminate('EnligterInstance');
            return this;
        }

        // hide highlighted sourcecode ?
        if (options === false){
            if (enlighter !== null) {
                enlighter.enlight(false);
            }
        // highlight sourcecode and use options
        }else{
            // create new enlighter instance
            if (enlighter === null) {
                enlighter = new EJS(this, options, null);
                this.store('EnlighterInstance', enlighter);
            }
            enlighter.enlight(options);
        }

        // element instance
        return this;
    },

    /**
     * Highlights an element
     * @DEPRECATED since v2.0 - this method will be removed in the future
     * @param {Object} [options] EnlighterJS Options Object
     * @returns {Element} The current Element instance.
     */
    light : function(options) {
        return this.enlight(options);
    },

    /**
     * Removes/hides Element highlighting
     * @DEPRECATED since v2.0 - this method will be removed in the future
     * @returns {Element} The current Element instance.
     */
    unlight : function(){
        return this.enlight(false);
    }
});

