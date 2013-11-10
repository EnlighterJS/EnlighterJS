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
		containerTag : 'ol',
		oddClassname: 'odd',
		evenClassname: 'even'
	},

	initialize : function(options){
		this.parent(options);
	},

	/**
	 * Compiles an array of tokens into a highlighted element using a language and a theme.
	 * 
	 * @param {Language}
	 *            language The Language used when parsing.
	 * @param {String}
	 *            theme The Theme to use.
	 * @param {SpecialLineHighlighter}
	 * 			  lines to highlight           
	 * @return {Element} The generated Element.
	 */
	_compile : function(language, theme, specialLines){
		// create new outer container element
		var container = new Element(this.options.containerTag);
		
		// line number count
		var lineCounter = 1;
		
		// current line element
		var currentLine = new Element('li', {
			'class': (specialLines.isSpecialLine(lineCounter) ? 'specialline' : '')
		});
				
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
					
					// new line
					lineCounter++;
					
					// create new line, add special line classes
					currentLine = new Element('li', {
						'class': (specialLines.isSpecialLine(lineCounter) ? 'specialline' : '')
					});
										
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
		
		// add odd/even classes
		if (this.options.evenClassname){
			container.getElements('li:even').addClass(this.options.evenClassname);
		}
		if (this.options.oddClassname){
			container.getElements('li:odd').addClass(this.options.oddClassname);
		}

		// highlight alt lines ?
		if (this.options.altLines){
			// add hover enable class
			container.getChildren().addClass(this.options.altLines);
		}

		return container;
	}
});
