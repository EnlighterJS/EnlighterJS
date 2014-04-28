/*
---
description: Compiles an array of tokens into inline elements, grabbed into a outer container.

license: MIT-style X11

authors:
  - Andi Dittrich

requires:
  - core/1.4.5

provides: [EnlighterJS.Renderer.InlineRenderer]
...
*/
EnlighterJS.Renderer.InlineRenderer = new Class({
	Implements: Options,
	
	options : {
		inlineContainerTag : 'span'
	},

	initialize : function(options){
		this.setOptions(options);
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
		var container = new Element(this.options.inlineContainerTag);

		// generate output based on ordered list of tokens
		language.getTokens().each(function(token, index){
			// get classname
			var className = token.type ? (language.aliases[token.type] || token.type) : '';
			
			// create new inline element which contains the token - htmlspecialchars get escaped by mootools setText !
			container.grab(new Element('span', {
				'class': className,
				'text': token.text
			}));
		});

		return container;
	}
});
