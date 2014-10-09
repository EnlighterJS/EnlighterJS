/*
---
description: Simple global-initialization of inline+block codeblocks

license: MIT-style X11 License

authors:
  - Andi Dittrich

requires:
  - core/1.4.5

provides: [EnlighterJS.Util.Init]
...
*/
(function(){
	EnlighterJS.Util.Init = (function(blockSelector, inlineSelector, options){
		// highlight all matching block tags
		if (blockSelector){
			options.renderer = 'Block';
			EnlighterJS.Util.Helper(document.getElements(blockSelector), options);
		}
		
		// highlight all matching inline tags
		if (inlineSelector){
			options.renderer = 'Inline';
			options.grouping = false;
			EnlighterJS.Util.Helper(document.getElements(inlineSelector), options);
		}
	});
})();