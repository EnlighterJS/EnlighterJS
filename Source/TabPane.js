/*
---
name: TapPane
description: Displays multiple code-blocks within a group

license: MIT-style X11 License

authors:
  - Andi Dittrich
  
requires:
  - Core/1.4.5

provides: [EnlighterJS.TabPane]
...
 */

EnlighterJS.TabPane = new Class({
		
	// wrapper container which contains the controls + panes
	container: null,
	
	// control container - contains the tab names
	controlContainer: null,
	
	// pane container - contains the tab panes
	paneContainer: null,
	
	// array of tab objects
	tabs: [],
	
	// current active tab
	selectedTabIndex: 0,
	
	/**
	 * @constructs
	 * @param {String} cssClassname The class-name of the outer container
	 */
	initialize : function(cssClassname) {
		// create container
		this.container = new Element('div', {
			'class': 'EnlighterJSTabPane'
		});
		
		// add theme based classname
		this.container.addClass(cssClassname);
		
		// create container structure
		this.controlContainer = new Element('ul', {
			'class': 'controls'
		});
		this.paneContainer = new Element('div', {
			'class': 'pane'
		});
		
		this.container.grab(this.controlContainer);
		this.container.grab(this.paneContainer);
	},
	
	selectTab: function(index){
		if (index < this.tabs.length){
			// hide current tab
			this.tabs[this.selectedTabIndex].pane.setStyle('display', 'none');
			this.tabs[this.selectedTabIndex].control.removeClass('selected');
			
			// show selected tab
			this.tabs[index].pane.setStyle('display', 'block');
			this.tabs[index].control.addClass('selected');
			
			// store selected index
			this.selectedTabIndex = index;
		}
	},
	
	addTab: function(name){
		// create new control element
		var ctrl = new Element('li', {
			text: name
		});
		this.controlContainer.grab(ctrl);
		
		// get new tab position
		var tabIndex = this.tabs.length;
		
		// select event - display tab
		ctrl.addEvent('click', function(){
			this.selectTab(tabIndex);
		}.bind(this));
		
		// create new tab element
		var tab = new Element('div', {
			'styles': {
				'display': 'none'
			}
		});
		this.paneContainer.grab(tab);
		
		// store new tab
		this.tabs.push({
			control: ctrl,
			pane: tab
		});
		
		// return created tab element
		return tab;
	},
	
	getContainer: function(){
		return this.container;
	}

	
});
