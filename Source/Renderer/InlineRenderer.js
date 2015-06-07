/*
---
description: Compiles an array of tokens into inline elements, grabbed into a outer container.

license: MIT-style X11

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Renderer.InlineRenderer]
...
*/
EJS.Renderer.InlineRenderer = new Class({
	Implements: Options,
	
	options : {
		inlineContainerTag : 'span'
	},

    textFilter: null,

	initialize : function(options, textFilter){
		this.setOptions(options);
        this.textFilter = textFilter;
	},

	/**
	 * Renders the generated Tokens
	 * 
	 * @param {Language} language The Language used when parsing.
	 * @param {SpecialLineHighlighter} specialLines Instance to define the lines to highlight           
	 * @return {Element} The renderer output
	 */
	render : function(language, specialLines, localOptions){
		// create output container element
		var container = new EJS.Dom.Element(this.options.inlineContainerTag);

		// generate output based on ordered list of tokens
		language.getTokens().each(function(token, index){
			// create new inline element which contains the token - htmlspecialchars get escaped by mootools setText !
			container.grab(new EJS.Dom.Element('span', {
				'class': token.alias,
				'text': this.textFilter.filterOutput(token.text)
			}));
		}, this);

		return container;
	}
});
