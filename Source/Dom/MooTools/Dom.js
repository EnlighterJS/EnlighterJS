/*
---
description: EnlighterJS DOM Abstraction Layer (MooTools)

license: MIT-style X11 License

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Dom]
...
 */
EJS.Dom = {
	/**
	 * Selects a single DOM Eement by given css selector
	 * @param sel
	 * @returns
	 */	
	getElement: function(sel){
		return document.getElement(sel);
	},
	
	/**
	 * Selects a collection of DOM Eöements by given css selector
	 * @param sel
	 * @returns
	 */	
	getElements: function(sel){
		return document.getElements(sel);
	},	
		
	/**
	 * Selects an Element by it's ID
	 * @param elementID
	 * @returns DOM Element
	 */	
	id: function(elementID){
		return document.id(elementID);
	}	
};