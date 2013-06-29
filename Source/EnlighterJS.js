/*
---
name: EnlighterJS
description: Syntax Highlighter based on the famous Lighter.js from Jose Prado

license: MIT-style X11 License

authors:
  - Andi Dittrich
  
requires:
  - Core/1.4.5

provides: [EnlighterJS]
...
 */
var EnlighterJS = new Class({

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
	 * @param {Object} options The options object.
	 * @return {EnlighterJS} The current EnlighterJS instance.
	 */
	initialize : function(codeblock, options, container) {
		this.setOptions(options);
							
		// valid language selected ?
		if (!EnlighterJS.Language[this.options.language.toLowerCase()]){
			this.options.language = 'standard';
		}
		
		// initialize compiler
		if (EnlighterJS.Compiler[this.options.compiler]){
			this.compiler = new EnlighterJS.Compiler[this.options.compiler](options);
		}else{
			this.compiler = new EnlighterJS.Compiler.List(options);
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
		
		// get language name - use options as fallback  
		var languageName = this.codeblock.get('data-enlighter-language').toLowerCase();
		
		// valid language selected ?
		if (!EnlighterJS.Language[languageName]){
			languageName = this.options.language.toLowerCase();
		}
		
		// get theme name - use options as fallback
		var themeName = (this.options.forceTheme ? null : this.codeblock.get('data-enlighter-theme')) || this.options.theme;
			
		// Load language parser
		language = new EnlighterJS.Language[languageName](code, {});
		
		// compile tokens -> generate output
		var output = this.compiler.compile(language, themeName.toLowerCase());

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
	}
});

