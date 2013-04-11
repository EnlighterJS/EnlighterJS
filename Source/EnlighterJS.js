/*
---
description: Builds and displays an element containing highlighted code bits.

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

	var EnlighterJS = this.EnlighterJS = new Class({

		Implements : Options,

		options : {
			language : 'standard',
			theme : 'standard',
			indent : -1
		},

		compiler : null,

		/**
		 * @constructs
		 * @param {Object}
		 *            options The options object.
		 * @return {EnlighterJS} The current EnlighterJS instance.
		 */
		initialize : function(options) {
			this.setOptions(options);
			
			// valid language selected ?
			if (!Language[this.options.language]){
				this.options.language = 'standard';
			}
			
			// initialize compiler & parser
			this.compiler = new Compiler.Inline();

			return this;
		},

		/**
		 * Takes a codeblock and highlights the code inside of it using the
		 * stored parser/compilers. It reads the class name to figure out what
		 * language and theme to use for highlighting.
		 * 
		 * @param {String|Element} codeblock The codeblock to highlight.
		 * @param {String|Element} [container] Optional container to inject the highlighted element into.
		 * @return {EnlighterJS} The current EnlighterJS instance.
		 */
		light : function(codeblock, container){
			// get elements
			var codeblock = document.id(codeblock);
			var container = document.id(container);
			
			// extract code to highlight
			var code = this.getCode(codeblock);

			// extract options from css class
			var inlineOptions = this.parseClass(codeblock.get('class'));

			// enlighter object available ?
			var enlighter = codeblock.retrieve('enlighter');
						
			// EnlighterJS exists so just toggle display.
			if (enlighter !== null) {
				codeblock.setStyle('display', 'none');
				enlighter.setStyle('display', 'inherit');
				return this;
			}			

			// Load language parser
			language = new Language[inlineOptions.language](code, {});

			// parse/tokenize the code
			var tokens = language.getTokens();
			
			// compile tokens -> generate output
			var output = this.compiler.compile(language, inlineOptions.theme, tokens);

			//output.store('codeblock', codeblock);
			//output.store('plaintext', code);

			// grab content into specific container or after original code block ?
			if (container) {
				container.empty();
				container.grab(output);
			} else {
				codeblock.setStyle('display', 'none');
				output.inject(codeblock, 'after');
			}

			// store generated element into original one
			codeblock.store('enlighter', this);

			return this;
		},

		/**
		 * Unlights a codeblock by hiding the enlighter element if present and
		 * re-displaying the original code.
		 * 
		 * @param {String|Element}
		 *            codeblock The element to unlight.
		 * @return {EnlighterJS} The current EnlighterJS instance.
		 */
		unlight : function(codeblock) {
			// get element
			codeblock = document.id(codeblock);

			var enlighter = codeblock.retrieve('enlighter');

			// hide enlighted element, display original
			if (enlighter !== null) {
				codeblock.setStyle('display', 'inherit');
				enlighter.setStyle('display', 'none');
			}

			return this;
		},

		/**
		 * Extracts the code from a codeblock.
		 * 
		 * @param {Element}
		 *            codeblock The codeblock that contains the code.
		 * @return {String} The plain-text code.
		 */
		getCode : function(codeblock) {
			var code = codeblock.get('html')
					.replace(/(^\s*\n|\n\s*$)/gi, '')
					.replace(/&lt;/gim, '<')
					.replace(/&gt;/gim, '>')
					.replace(/&amp;/gim, '&');

			// Re-indent code if user option is set.
			if (this.options.indent > -1) {
				code = code.replace(/\t/g, new Array(this.options.indent + 1)
						.join(' '));
			}

			return code;
		},

		/**
		 * Parses a class name for a language:theme combo.
		 * 
		 * @param {String} className The html class-name attribute to parse.
		 * @return {Object} A object containing the found language and theme.
		 */
		parseClass : function(className){
			// extract classname list
			var classNames = className.split(' ');
			
			// parsed params
			var language = null;
			var theme = null;
			
			// iterate over classes
			classNames.each(function(item, index){
				// language already found ? break
				if (language != null){
					return;
				}
				
				// extract attribute patterns
				var attb = item.split(':');
				
				// parsed language available ?
				if (Language[attb[0]]){
					language = attb[0];
				}
				
				// language:theme pair found ?
				if (attb.length == 2){
					theme = attb[1];					
				}			
			});

			// fallback - default options:
			return {
				language: language || this.options.language,
				theme:	  theme || this.options.theme
			};
		}
	});

})();
