/*
---
description: Compiles an array of Tokens into an Element.

license: MIT-style

authors:
  - Jose Prado
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Compiler]
...
*/
EnlighterJS.Compiler = new Class({

	Implements : Options,

	options : {
		editable : false
	},

	/**
	 * @constructs
	 * @param {Object}
	 *            [options] The options object to use.
	 * @return {Compiler} The current Compiler instance.
	 */
	initialize : function(options){
		this.setOptions(options);

		return this;
	},

	/**
	 * Compiles an array of tokens into a highlighted element using a language and a theme.
	 * 
	 * @param {Language}
	 *            language The Language used when parsing.
	 * @param {String}
	 *            theme The Theme to use.
	 * @return {Element} The generated Element.
	 */
	compile : function(language, theme){
		var container = this._compile(language, theme);

		// set class and id attributes.
		container.addClass(theme + 'EnlighterJS');		
		container.addClass('EnlighterJSRendered');		
		container.set('id', 'EnlighterJS_' + String.uniqueID());

		// enable the html5 editable option ?
		if (this.options.editable){
			container.set('contenteditable', 'true');
		}

		return container;
	},

	/**
	 * Extending classes must override this method and return a highlighted Element using the language and theme that were passed in.
	 */
	_compile : function(language, theme){
		throw new Error('Extending classes must override the _compile method.');
	}
});
