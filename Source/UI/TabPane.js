/*
---
name: TapPane
description: Displays multiple code-blocks within a group

license: MIT-style X11 License

authors:
  - Andi Dittrich
  
requires:
  - Core/1.4.5

provides: [EnlighterJS.UI.TabPane]
...
*/
EJS.UI.TabPane = new Class({
		
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
		this.container = new EJS.Dom.Element('div', {
			'class': 'EnlighterJSTabPane ' + cssClassname.toLowerCase() + 'EnlighterJSTabPane'
		});
		
		// create container structure
		//	<div class="EnlighterJSTabPane ...">
		//    <div class="controls">
		//       <ul> <li>Tab1</li> .... </ul>
		//    </div>
		//    <div class="pane">
		//      <div>Enlighter Tab1</div>
		//      <div>Enlighter Tab2</div>
		//    </div>
		//  </div>
		this.controlContainer = new EJS.Dom.Element('ul');
		this.paneContainer = new EJS.Dom.Element('div', {
			'class': 'pane'
		});		
		var controlWrapper = new EJS.Dom.Element('div', {
			'class': 'controls'
		});
		controlWrapper.grab(this.controlContainer);

		this.container.grab(controlWrapper);
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
		var ctrl = new EJS.Dom.Element('li', {
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
		var tab = new EJS.Dom.Element('div', {
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
