/*
---
name: EnlighterJS
description: Syntax Highlighter based on the famous Lighter.js

license: MIT-style X11 License

authors:
  - Andi Dittrich
  
requires:
  - Core/1.4.5

provides: [EnlighterJS]
...
 */
var EJS = window.EnlighterJS = new Class({

	Implements : Options,

	options : {
		language : 'generic',
		theme : 'Enlighter',
		renderer: 'Block',
		indent : -1,
		forceTheme: false,
		rawButton: true,
		windowButton: true,
		infoButton: true,
		ampersandCleanup: true,
		rawcodeDoubleclick: false
	},

	// used renderer instance
	renderer: null,
	
	// used codeblock to highlight
	originalCodeblock: null,
	
	// used container to store highlighted code
	container: null,
	
	// lightning active ?
	isRendered: false,
	
	// language alias manager
	languageManager: null,

	// toggle raw code
	rawContentContainer: null,
	
	// rendered output span/ou/ul container
	output: null,

    // input/output filter
	textFilter: null,

    // cached code input
    rawCode: null,

	/**
	 * @constructs
	 * @param {Element} originalCodeblock An Element containing code to highlight
	 * @param {Object} options The options object.
	 * @param {Element} container (optional) The output container - if not defined, the output will be injected after the originalCodeblock
	 */
	initialize : function(originalCodeblock, opt, container) {
		this.setOptions(opt);
		
		// create new language alias manager instance
		this.languageManager = new EJS.LanguageManager(this.options);

        // create new coe filter instance
        this.textFilter = new EJS.TextFilter(this.options);
				
		// initialize renderer
		if (this.options.renderer == 'Inline'){
			this.renderer = new EJS.Renderer.InlineRenderer(this.options, this.textFilter);
		}else{
			this.renderer = new EJS.Renderer.BlockRenderer(this.options, this.textFilter);
		}
				
		// store codeblock element
		this.originalCodeblock = EJS.Dom.id(originalCodeblock);
		
		// store/create container
		if (container){
			this.container = EJS.Dom.id(container);
		}
	},

	/**
	 * Takes a codeblock and highlights the code inside of it using the
	 * stored parser/compilers. It reads the class name to figure out what
	 * language and theme to use for highlighting.
	 * 
	 * @return {EnlighterJS} The current EnlighterJS instance.
	 */
	enlight : function(enabled){
		// show highlighted sourcecode ?
		if (enabled){
			// get element language
			var rawLanguageName = this.originalCodeblock.get('data-enlighter-language');
			
			// ignore higlighting ?
			if (rawLanguageName == 'no-highlight'){
				return;
			}
			
			// hide original codeblock
			this.originalCodeblock.setStyle('display', 'none');
			
			// EnlighterJS exists so just toggle display.
			if (this.isRendered) {				
				this.container.setStyle('display', 'inherit');
				return this;
			}
			
			// get language name - use alias manager to check language string and validate
			var languageName = this.languageManager.getLanguage(rawLanguageName);
			
			// get theme name - use options as fallback
			var themeName = (this.options.forceTheme ? null : this.originalCodeblock.get('data-enlighter-theme')) || this.options.theme || 'Enlighter';
			
			// special lines to highlight ?
			var specialLines = new EJS.SpecialLineHighlighter(this.originalCodeblock.get('data-enlighter-highlight'), this.originalCodeblock.get('data-enlighter-lineoffset'));
			
			// Load language parser
			var language = new EJS.Language[languageName](this.getRawCode(true));
			
			// compile tokens -> generate output
			this.output = this.renderer.render(language, specialLines, {
				lineOffset: (this.originalCodeblock.get('data-enlighter-lineoffset') || null),
				lineNumbers: this.originalCodeblock.get('data-enlighter-linenumbers')
			});
			
			// set class and id attributes.
			this.output.addClass(themeName.toLowerCase() + 'EnlighterJS').addClass('EnlighterJS');		
	
			// add wrapper ?
			if (this.options.renderer == 'Block'){
				// grab content into specific container or after original code block ?
				if (!this.container) {
					this.container = new EJS.Dom.Element('div');
					
					// put the highlighted code wrapper behind the original	
					this.container.inject(this.originalCodeblock, 'after');
				}
				
				// add wrapper class
				this.container.addClass('EnlighterJSWrapper').addClass(themeName.toLowerCase() + 'EnlighterJSWrapper');
				
				// add the highlighted code
				this.container.grab(this.output);
				
				// create raw content container
				this.rawContentContainer = new EJS.Dom.Element('pre', {
					text: this.getRawCode(false),
					styles: {
						'display': 'none'
					}
				});
				
				// add raw content container
				this.container.grab(this.rawContentContainer);
				
				// show raw code on double-click ?
				if (this.options.rawcodeDoubleclick){
					this.container.addEvent('dblclick', function(){
						this.toggleRawCode();
					}.bind(this));
				}
				
				// toolbar ?
				if (this.options.rawButton || this.options.windowButton || this.options.infoButton){
					this.container.grab(new EJS.UI.Toolbar(this));
				}

			// normal handling
			}else{
				// grab content into specific container or after original code block ?
				if (this.container) {
					this.container.grab(this.output);
					
				// just put the highlighted code behind the original	
				}else{
					this.output.inject(this.originalCodeblock, 'after');
					this.container = this.output;
				}
			}
			
			// set render flag
			this.isRendered = true;
			
		// disable highlighting	
		}else{
			// already highlighted ?
			if (this.isRendered) {
				this.originalCodeblock.setStyle('display', 'inherit');
				this.container.setStyle('display', 'none');
			}
		}

		return this;
	},

    /**
     * Disable highlighting and remove generated DOM
     */
    dispose: function(){
        // already highlighted ?
        if (!this.isRendered) {
            return;
        }

        // restore original codeblock
        this.originalCodeblock.setStyle('display', null);

        // hide highlighted code
        this.container.setStyle('display', 'none');
        this.rawContentContainer.setStyle('display', 'none');

        // drop dom
        this.container.dispose();
        this.rawContentContainer.dispose();
        this.container = null;
        this.rawContentContainer = null;

        // reset flag
        this.isRendered = false;
    },
	
	/**
	 * Extracts the raw code from given codeblock
	 * @return {String} The plain-text code (raw)
	 */
	getRawCode: function(reindent){

        // cached version available ?
        var code = this.rawCode;

        if (code==null) {
            // get the raw content
            code = this.originalCodeblock.get('html');

            // remove empty lines at the beginning+end of the codeblock
            code = code.replace(/(^\s*\n|\n\s*$)/gi, '');

            // apply input filter
            code = this.textFilter.filterInput(code);

            // cleanup ampersand ?
            if (this.options.ampersandCleanup === true) {
                code = code.replace(/&amp;/gim, '&');
            }

            // replace html escaped chars
            code = code.replace(/&lt;/gim, '<').replace(/&gt;/gim, '>').replace(/&nbsp;/gim, ' ');

            // cache it
            this.rawCode = code;
        }

		// replace tabs with spaces ?
		if (reindent === true){
			// get indent option value
			var newIndent = this.options.indent.toInt();
			
			// re-indent code if specified
			if (newIndent > -1){
				// match all tabs
				code = code.replace(/(\t*)/gim, function(match, p1, offset, string){
					// replace n tabs with n*newIndent spaces
					return (new Array(newIndent * p1.length + 1)).join(' ');
				});
			}
		}
		
		return code;
	},
	
	/**
	 * Hide/Show the RAW Code Container/Toggle Highlighted Code
	 */
	toggleRawCode: function(show){
		// initialization required!
		if (this.output == null){
			return;
		}
		
		// argument set ?
		if (typeof(show)!='boolean'){
			show = (this.rawContentContainer.getStyle('display') == 'none');
		}
		
		// toggle container visibility
		if (show){
			this.output.setStyle('display', 'none');
			this.rawContentContainer.setStyle('display', 'block');
		}else{
			this.output.setStyle('display', 'block');
			this.rawContentContainer.setStyle('display', 'none');
		}
	},

    /**
     * Takes a codeblock and highlights the code inside. The original codeblock is set to invisible
     * @DEPRECATED since v2.0 - this method will be removed in the future
     *
     * @return {EnlighterJS} The current EnlighterJS instance.
     */
    light : function(){
        return this.enlight(true);
    },

    /**
     * Unlights a codeblock by hiding the enlighter element if present and re-displaying the original code.
     * @DEPRECATED since v2.0 - this method will be removed in the future
     *
     * @return {EnlighterJS} The current EnlighterJS instance.
     */
    unlight : function() {
        return this.enlight(false);
    }
});

// register namespaces
EJS.Language = {};
EJS.Tokenizer = {};
EJS.Renderer = {};
EJS.Util = {};
EJS.UI = {};

