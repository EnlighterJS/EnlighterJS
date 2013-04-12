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
			var enlighter = this.retrieve('EnlighterInstance');

			// create new enlighter instance
			if (enlighter === null) {
				enlighter = new EnlighterJS(this, options, null);
				this.store('EnlighterInstance', enlighter);
			}

			enlighter.light();

			return this;
		},

		/**
		 * Unlights an element.
		 * 
		 * @returns {Element} The current Element instance.
		 */
		unlight : function() {
			var enlighter = this.retrieve('EnlighterInstance');

			if (enlighter !== null) {
				enlighter.unlight();
			}

			return this;
		}
	});

})();