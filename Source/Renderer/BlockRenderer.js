/*
---
description: Renders the generated Tokens into li-elements, grabbed into a outer ul/ol-container.

license: MIT-style X11

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Renderer.BlockRenderer]
...
*/
EJS.Renderer.BlockRenderer = new Class({
	Implements: Options,
	
	options : {
		hover : 'hoverEnabled',
		oddClassname: 'odd',
		evenClassname: 'even',
		showLinenumbers: true
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
		// create new outer container element - use ol tag if lineNumbers are enabled. element attribute settings are priorized
		var container = null;
		if (localOptions.lineNumbers != null){
			container = new EJS.Dom.Element((localOptions.lineNumbers.toLowerCase() === 'true') ? 'ol' : 'ul');
		}else{
			container = new EJS.Dom.Element(this.options.showLinenumbers ? 'ol' : 'ul');
		}
		
		// add "start" attribute ?
		if ((localOptions.lineNumbers || this.options.showLinenumbers) && localOptions.lineOffset && localOptions.lineOffset.toInt() > 1){
			container.set('start', localOptions.lineOffset);
		}
		
		// line number count
		var lineCounter = 1;
		
		// current line element
		var currentLine = new EJS.Dom.Element('li', {
			'class': (specialLines.isSpecialLine(lineCounter) ? 'specialline' : '')
		});

        // output filter
        var _F = (function(t){
            return this.textFilter.filterOutput(t);
        }.bind(this));
		
		// generate output based on ordered list of tokens
		language.getTokens().each(function(token, index){
			// get classname
			var className = token.type ? (language.aliases[token.type] || token.type) : '';
			
			// split the token into lines
			var lines = token.text.split('\n');
			
			// linebreaks found ?
			if (lines.length > 1){
				// just add the first line
				currentLine.grab(new EJS.Dom.Element('span', {
					'class': className,
					'text': _F(lines.shift())
				}));
				
				// generate element for each line
				lines.each(function(line, lineNumber){
					// grab old line into output container
					container.grab(currentLine);
					
					// new line
					lineCounter++;
					
					// create new line, add special line classes
					currentLine = new EJS.Dom.Element('li', {
						'class': (specialLines.isSpecialLine(lineCounter) ? 'specialline' : '')
					});
										
					// create new token-element
					currentLine.grab(new EJS.Dom.Element('span', {
						'class': className,
						'text': _F(line)
					}));
				});				
			}else{
				// just add the token
				currentLine.grab(new EJS.Dom.Element('span', {
					'class': className,
					'text': _F(token.text)
				}));	
			}			
		});
		
		// grab last line into container
		container.grab(currentLine);

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
