/*
---
description: Extends MooTools.Element with light(), unlight() shortcuts

license: MIT-style X11 License

authors:
  - Jose Prado
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS]
...
 */
(function() {

	Element.implement({
		/**
		 * Lights an element.
		 * 
		 * @param {Object}
		 *            [options] The options object to use.
		 * @returns {Element} The current Element instance.
		 */
		light : function(options) {
			var enlighter = this.retrieve('enlighter');

			// create new enlighter instance
			if (enlighter === null) {
				enlighter = new EnlighterJS(options);
			}

			enlighter.light(this);

			return this;
		},

		/**
		 * Unlights an element.
		 * 
		 * @returns {Element} The current Element instance.
		 */
		unlight : function() {
			var enlighter = this.retrieve('enlighter');

			if (enlighter !== null) {
				enlighter.unlight(this);
			}

			return this;
		}
	});

})();