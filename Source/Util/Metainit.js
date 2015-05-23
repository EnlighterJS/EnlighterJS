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
	var m = EJS.Dom.getElement('meta[name="EnlighterJS"]');
	
	// check instance
	if (!m){
		return;
	}
	
	// create new options object
	var options = {
		language: m.get('data-language') || 'generic',
		theme: m.get('data-theme') || 'Enlighter',
		indent: m.get('data-indent').toInt() || -1,
		hover: m.get('data-hover') || 'hoverEnabled',
		rawButton: (m.get('data-rawcodebutton')==='true'),
		windowButton: (m.get('data-windowbutton')==='true'),
		infoButton: (m.get('data-infobutton')==='true'),
		showLinenumbers: (m.get('data-linenumbers')!=='false')
	};

	// selector available ? if not, match all pre-tags
	var blockSelector = m.get('data-selector-block') || 'pre';
	
	// selector available ? if not, match all pre-tags
	var inlineSelector = m.get('data-selector-inline') || 'code';
	
	// highlight all matching block tags
	if (blockSelector != 'NULL'){
		options.renderer = 'Block';
        EJS.Util.Helper(EJS.Dom.getElements(blockSelector), options);
	}
	
	// highlight all matching inline tags
	if (inlineSelector != 'NULL'){
		options.renderer = 'Inline';
		options.grouping = false;
        EJS.Util.Helper(EJS.Dom.getElements(inlineSelector), options);
	}
});