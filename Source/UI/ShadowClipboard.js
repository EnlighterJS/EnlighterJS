/*
---
description: opens a new window with the "raw"-code to copy it

license: MIT-style

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.UI.CodeWindow]
...
*/
EnlighterJS.UI.ShadowClipboard = new Class({
	
	shadowContainer: null,
	shadowTextarea: null,
	outputContainer: null,
	
	initialize : function(outputContainer, rawContent){
		this.outputContainer = outputContainer;
		this.shadowContainer = new Element('div', {
			'class': 'shadowClipContainer'
		});
		this.shadowTextarea = new Element('textarea', {
			text: rawContent
		});
		this.shadowContainer.grab(this.shadowTextarea);
		
		
		outputContainer.grab(this.shadowContainer);
		
		outputContainer.addEvent('mousedown', this.handleMousedownEvent.bind(this));
		outputContainer.addEvent('mouseup', this.handleMouseupEvent.bind(this));
	},
	
	handleMousedownEvent: function(event){
		this.shadowContainer.setStyle('display', 'block');
	},
	
	handleMouseupEvent: function(event){
		console.log(this.outputContainer.getSelectedRange());

	}
	
	
});

// handle keydown
window.addEvent('domready', function(){
	// handle keydown events
	window.addEvent('keydown', function(event){
		// ctrl key press/meta key press ?
		if (event.code != 17){
			return;
		}
		
		console.log("tst", event.target);
	});
	window.addEvent('keyup', function(event){
		
	});
});
