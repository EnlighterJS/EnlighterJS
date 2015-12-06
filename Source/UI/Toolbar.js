/*
---
name: Toolbar
description: Container which contains various buttons

license: MIT-style X11 License

authors:
  - Andi Dittrich
  
requires:
  - Core/1.4.5

provides: [EnlighterJS.UI.Toolbar]
...
*/
EJS.UI.Toolbar = new Class({
	Implements: Options,
	
	options: {
		toolbar: {
			rawTitle: 'Toggle RAW Code',
			windowTitle: 'Open Code in new Window',
			infoTitle: 'EnlighterJS Syntax Highlighter'
		}
	},

	// toolbar container
	container: null,
	
	initialize : function(enlighterInstance){
		// get options
		this.setOptions(enlighterInstance.options);
		
		// create outer container
		this.container = new EJS.Dom.Element('div', {
			'class': 'EnlighterJSToolbar'
		});
		
		// info button ?
		if (this.options.infoButton){
			// create window "button"
			this.container.grab(new EJS.Dom.Element('a', {
				'class': 'EnlighterJSInfoButton',
				title: this.options.toolbar.infoTitle,
				events: {
					// open new window on click
					click: function(){
						window.open('http://enlighterjs.org');
					}.bind(this)
				 }
			}));
		}
		
		// toggle button ?
		if (this.options.rawButton){
			// create toggle "button"
			this.container.grab(new EJS.Dom.Element('a', {
				'class': 'EnlighterJSRawButton',
				title: this.options.toolbar.rawTitle,
				events: {
					 click: function(){
						 // trigger toggle
						 enlighterInstance.toggleRawCode();
					 }.bind(this)
				 }
			}));		
		}
		
		// code window button ?
		if (this.options.windowButton){
			// create window "button"
			this.container.grab(new EJS.Dom.Element('a', {
				'class': 'EnlighterJSWindowButton',
				title: this.options.toolbar.windowTitle,
				events: {
					// open new window on click
					click: function(){
                        EJS.UI.CodeWindow(enlighterInstance.getRawCode(false));
					}.bind(this)
				 }
			}));
		}		
		
		// clearfix
		this.container.grab(new EJS.Dom.Element('span', {
			'class': 'clear'
		}));
	},
	
	toElement: function(){
		return this.container;
	}	
});
