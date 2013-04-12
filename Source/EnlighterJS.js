/*!
---
name: EnlighterJS
description: Syntax Highlighter based on the famous Lighter.js from Jose Prado

license: MIT-style X11 License

authors:
  - Andi Dittrich (author of EnlighterJS fork)
  - Jose Prado (author of Ligther.js)
  
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
			compiler: 'List',
			indent : -1,
			forceTheme: false
		},

		// used compiler instance
		compiler: null,
		
		// used codeblock to highlight
		codeblock: null,
		
		// used container to store highlighted code
		container: null,
		
		// lightning active ?
		isRendered: false,

		/**
		 * @constructs
		 * @param {Object}
		 *            options The options object.
		 * @return {EnlighterJS} The current EnlighterJS instance.
		 */
		initialize : function(codeblock, options, container) {
			this.setOptions(options);
								
			// valid language selected ?
			if (!Language[this.options.language]){
				this.options.language = 'standard';
			}
			
			// initialize compiler
			if (Compiler[this.options.compiler]){
				this.compiler = new Compiler[this.options.compiler](options);
			}else{
				this.compiler = new Compiler.List(options);
			}
			
			// store codeblock
			this.codeblock = document.id(codeblock);
			
			// store/create container
			if (container){
				this.container = document.id(container);
			}
			
			return this;
		},

		/**
		 * Takes a codeblock and highlights the code inside of it using the
		 * stored parser/compilers. It reads the class name to figure out what
		 * language and theme to use for highlighting.
		 * 
		 * @return {EnlighterJS} The current EnlighterJS instance.
		 */
		light : function(){
			// hide original codeblock
			this.codeblock.setStyle('display', 'none');
			
			// EnlighterJS exists so just toggle display.
			if (this.isRendered) {				
				this.container.setStyle('display', 'inherit');
				return this;
			}			

			// extract code to highlight
			var code = this.getCode();

			// extract options from css class
			var inlineOptions = this.parseClass(this.codeblock.get('class'));
			
			// Load language parser
			language = new Language[inlineOptions.language](code, {});

			// parse/tokenize the code
			var tokens = language.getTokens();
			
			// compile tokens -> generate output
			var output = this.compiler.compile(language, inlineOptions.theme, tokens);

			// grab content into specific container or after original code block ?
			if (this.container) {
				this.container.grab(output);
			}else{
				output.inject(this.codeblock, 'after');
				this.container = output;
			}
			
			// set render flag
			this.isRendered = true;

			return this;
		},

		/**
		 * Unlights a codeblock by hiding the enlighter element if present and
		 * re-displaying the original code.
		 * 
		 * @return {EnlighterJS} The current EnlighterJS instance.
		 */
		unlight : function() {
			
			// already highlighted ?
			if (this.isRendered) {
				this.codeblock.setStyle('display', 'inherit');
				this.container.setStyle('display', 'none');
			}

			return this;
		},

		/**
		 * Extracts the code from a codeblock.
		 * @author Jose Prado, Andi Dittrich
		 * @return {String} The plain-text code.
		 */
		getCode : function() {
			var code = this.codeblock.get('html')
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
			// extract class-name list - ignore empty class-names!
			var classNames = (className != null ? className.split(' ') : []);
			
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
			
			// force theme defined within options ? (required for grouping)
			if (this.options.forceTheme){
				theme = null;
			}

			// fallback - default options:
			return {
				language: (language || this.options.language),
				theme:	  (theme || this.options.theme)
			};
		}
	});

})();
