// ----------------------------------------------------------------------
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// --
// Copyright 2016-2018 Andi Dittrich <https://andidittrich.de>
// ----------------------------------------------------------------------

/* eslint no-undef: 0 */
(function(jq){
    // jQuery available ?
    if (typeof jq !== 'function' || !jq.fn){
        return;
    }

    /**
    * Highlights an element/Removes Element highlighting
    *
    * @param {Object, Boolean} [options] EnlighterJS options Object or Boolean value to enable/disable highlighting
    * @returns {Element} The current Element instance.
    */
   jq.fn.enlight = function(options){
        // mixed input check - options available ?
        options = (typeof(options) == "undefined") ? {} : options;

        // convert "true" to empty Object!
        options = (options===true) ? {} : options;
        
        // chaining
        return this.each(function(){
            // highlight the current element
            /* eslint no-invalid-this: 0 */
            EnlighterJS.enlight(this, options);
        });
    }
}(window.jQuery));

