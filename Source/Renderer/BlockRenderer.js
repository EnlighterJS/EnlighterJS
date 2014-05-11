/*
---
description: Renders the generated Tokens into li-elements, grabbed into a outer ul/ol-container.

license: MIT-style X11

authors:
  - Andi Dittrich

requires:
  - core/1.4.5

provides: [EnlighterJS.Renderer.BlockRenderer]
...
*/
EnlighterJS.Renderer.BlockRenderer = new Class({
	Implements: Options,
	
	options : {
		hover : 'hoverEnabled',
		oddClassname: 'odd',
		evenClassname: 'even',
		showLinenumbers: true
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
		// create new outer container element - use ol tag if lineNumbers are enabled. element attribute settings are priorized
		var container = null;
		if (localOptions.lineNumbers != null){
			container = new Element((localOptions.lineNumbers.toLowerCase() === 'true') ? 'ol' : 'ul');
		}else{
			container = new Element(this.options.showLinenumbers ? 'ol' : 'ul');
		}
		
		// add "start" attribute ?
		if ((localOptions.lineNumbers || this.options.showLinenumbers) && localOptions.lineOffset && localOptions.lineOffset.toInt() > 1){
			container.set('start', localOptions.lineOffset);
		}
		
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

		// highlight lines ?
		if (this.options.hover && this.options.hover != "NULL"){
			// add hover enable class
			container.getChildren().addClass(this.options.hover);
		}

		return container;
	}
});
