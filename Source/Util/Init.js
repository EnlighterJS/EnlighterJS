/*
---
description: Simple global-initialization of inline+block codeblocks

license: MIT-style X11 License

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Util.Init]
...
*/
EJS.Util.Init = (function(blockSelector, inlineSelector, options){
    // defaults
    options = options || {};

    // highlight all matching block tags
    if (blockSelector){
        options.renderer = 'Block';
        EJS.Util.Helper(EJS.Dom.getElements(blockSelector), options);
    }

    // highlight all matching inline tags
    if (inlineSelector){
        options.renderer = 'Inline';
        options.grouping = false;
        EJS.Util.Helper(EJS.Dom.getElements(inlineSelector), options);
    }
});