/*
---
description: Automatical element highlighting using meta tag options

license: MIT-style X11 License

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS]
...
*/
window.addEvent('domready', function(){
	// metadata config available ? -> autoinit
	var m = $$('meta[name="EnlighterJS"]');
	
	// check length
	if (m.length != 1){
		return;
	}
	
	// create new options object
	var options = {
		language: m[0].get('data-language') || 'standard',
		theme: m[0].get('data-theme') || 'standard',
		indent: m[0].get('data-indent').toInt() || -1,
		compiler: m[0].get('data-compiler') || 'List',
		altLines: m[0].get('data-altlines') || 'hover'
	};
		
	// selector available ? if not, match all pre-tags
	var selector = m[0].get('data-selector') || 'pre';
	
	// highlight all matching tags
	new EnlighterJS.Helper($$(selector), options);
});