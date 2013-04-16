/*
---
name: Helper
description: Helper to initialize multiple enlighter instances on your page as well as code-groups

license: MIT-style X11 License

authors:
  - Andi Dittrich
  
requires:
  - Core/1.4.5

provides: [EnlighterJS.Helper]
...
 */

EnlighterJS.Helper = new Class({
	
	Implements: Options,

	options: {
		grouping: true,
		theme: 'standard',
		language: 'standard'
	},
		
	/**
	 * @constructs
	 * @param {Object} options The options object.
	 */
	initialize : function(elements, options) {
		this.setOptions(options);
	
		// element grouping enabled ?
		if (this.options.grouping){
			// get seperated groups and single elements
			var seperated = this.getGroups(elements);
			
			// highlight single elements (non grouped)
			seperated.single.each(function(el){
				el.light(options);
			});
			
			// force theme defined within options (all group members should have the same theme as group-leader)
			this.options.forceTheme = true;
			
			// create & highlight groups
			Object.each(seperated.groups, function(obj){
				// create new tab pane
				var tabpane = new EnlighterJS.TabPane();
				
				// copy options
				var localoptions = this.options;
								
				// get group-leader theme
				localoptions.theme = obj[0].get('data-enlighter-theme') || this.options.theme;
			
				// put enlighted objects into the tabpane
				obj.each(function(el, index){
					// create new tab - set title with fallbacl
					var container = tabpane.addTab(el.get('data-enlighter-title') || el.get('data-enlighter-language') || localoptions.language);
															
					// run enlighter
					(new EnlighterJS(el, localoptions, container)).light();
					
				}.bind(this));
				
				// add css class based on theme which is used by the groupleader
				tabpane.getContainer().addClass(localoptions.theme + "EnlighterJSTabPane");
				
				// select first tab (group-leader)
				tabpane.getContainer().inject(obj[0], 'before');
				tabpane.selectTab(0);
				
			}.bind(this));
			
		}else{
			// highlight all elements
			elements.light(options);
		}		
	},
	
	/**
	 * Get an object with arrays of elements identified by their group-names
	 * @param {Array} elements Array of elements to parse
	 * @returns {Object} 
	 */
	getGroups: function(elements){
		var groups = {};
		var ungrouped = [];
		
		// group elements
		elements.each(function(el){
			// extract group name
			var groupName = el.get('data-enlighter-group');
			
			// build element tree
			if (groupName){
				if (groups[groupName]){
					groups[groupName].push(el);
				}else{
					groups[groupName] = [el];
				}
			}else{
				ungrouped.push(el);
			}
		});
		
		return {
			groups: groups,
			single: ungrouped
		};
	}	
	
});
