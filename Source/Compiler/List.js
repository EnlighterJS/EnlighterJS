/*
---
description: Compiles an array of tokens into li-elements, grabbed into a outer ol-container.

license: MIT-style X11

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Compiler.List]
...
*/
EnlighterJS.Compiler.List = new Class({

	Extends : EnlighterJS.Compiler,

	options : {
		altLines : 'hoverEnabled',
		containerTag : 'ol'
	},

	initialize : function(options){
		this.parent(options);
	},


	_compile : function(language, theme){
		// create new outer container element
		var container = new Element(this.options.containerTag);
		
		// current line element
		var currentLine = new Element('li');
		
		// generate output based on ordered list of tokens
		language.getTokens().each(function(token, index){
			// get classname
			var className = token.type ? (language.aliases[token.type] || token.type) : '';
			
			// split the token into lines
			var lines = token.text.split('\n');
			
			// linebreaks found ?
			if (lines.length > 1){
				// just add the first line
				currentLine.grab(new Element('span', {
					'class': className,
					'text': lines.shift()
				}));
				
				// generate element for each line
				lines.each(function(line, lineNumber){
					// grab old line into output container
					container.grab(currentLine);
					
					// create new line
					currentLine = new Element('li');
					
					// create new token-element
					currentLine.grab(new Element('span', {
						'class': className,
						'text': line
					}));
				});				
			}else{
				// just add the token
				currentLine.grab(new Element('span', {
					'class': className,
					'text': token.text
				}));	
			}			
		});
		
		// grab last line into container
		container.grab(currentLine);

		// add line classes to elements
		container.getFirst().addClass('firstline');
		container.getLast().addClass('lastline');

		// highlight alt lines ?
		if (this.options.altLines){
			// add hover enable class
			container.getChildren().addClass(this.options.altLines);
		}

		return container;
	}
});
