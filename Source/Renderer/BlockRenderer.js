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
        // elememt shortcut
        var _el = EJS.Dom.Element;

        // create new outer container element - use ol tag if lineNumbers are enabled. element attribute settings are priorized
		var container = null;
		if (localOptions.lineNumbers != null){
			container = new _el((localOptions.lineNumbers.toLowerCase() === 'true') ? 'ol' : 'ul');
		}else{
			container = new _el(this.options.showLinenumbers ? 'ol' : 'ul');
		}
		
		// add "start" attribute ?
		if ((localOptions.lineNumbers || this.options.showLinenumbers) && localOptions.lineOffset && localOptions.lineOffset.toInt() > 1){
			container.set('start', localOptions.lineOffset);
		}
		
		// line number count
		var lineCounter = 1;

        var tokens = language.getTokens();

        var odd = ' ' + this.options.oddClassname || '';
        var even = ' ' + this.options.evenClassname || '';

        // current line element
        var currentLine = new _el('li', {
            'class': (specialLines.isSpecialLine(lineCounter) ? 'specialline' : '') + odd
        });

        // output filter
        var addFragment = (function(className, text){
            currentLine.grab(new _el('span', {
                'class': className,
                'text': this.textFilter.filterOutput(text)
            }));
        }.bind(this));

        // generate output based on ordered list of tokens
        Array.each(tokens, function(token){
            // split the token into lines
            var lines = token.text.split('\n');

            // linebreaks found ?
            if (lines.length > 1){
                // just add the first line
                addFragment(token.alias, lines.shift());

                // generate element for each line
                Array.each(lines, function(line, lineNumber){
                    // grab old line into output container
                    container.grab(currentLine);

                    // new line
                    lineCounter++;

                    // create new line, add special line classes; add odd/even classes
                    currentLine = new _el('li', {
                        'class': (specialLines.isSpecialLine(lineCounter) ? 'specialline' : '') + (lineCounter%2==0 ? even: odd)
                    });

                    // create new token-element
                    addFragment(token.alias, line);
                });
            }else{
                addFragment(token.alias, token.text);
            }
        });

		// grab last line into container
		container.grab(currentLine);

		// highlight lines ?
		if (this.options.hover && this.options.hover != "NULL"){
			// add hover enable class
			container.addClass(this.options.hover);
		}

		return container;
	}
});
