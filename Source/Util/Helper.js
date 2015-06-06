/*
---
name: Helper
description: Helper to initialize multiple Enlighter instances on your page as well as code-groups

license: MIT-style X11 License

authors:
  - Andi Dittrich
  
requires:
  - Core/1.4.5

provides: [EnlighterJS.Util.Helper]
...
*/
EJS.Util.Helper = (function(elements, options){
    // break if no elements are selected/found
    if (elements == null || (elements.length && elements.length == 0)){
        return;
    }

    // defaults
    options = options || {};

    // element grouping disabled?
    if (options.grouping && options.grouping===false){
        // highlight all elements
        elements.enlight(options);

    // use grouping
    }else{
        // get separated groups and single elements
        var groups = {};
        var ungrouped = [];

        // group elements
        Array.each(elements, function(el){
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

        // highlight single elements (non grouped)
        ungrouped.each(function(el){
            el.enlight(options);
        });

        // create & highlight groups
        Object.each(groups, function(obj){
            // copy options
            var localoptions = Object.clone(options);

            // force theme defined within options (all group members should have the same theme as group-leader)
            localoptions.forceTheme = true;

            // get group-leader theme
            localoptions.theme = obj[0].get('data-enlighter-theme') || options.theme || 'Enlighter';

            // create new tab pane
            var tabpane = new EJS.UI.TabPane(localoptions.theme);

            // put enlighted objects into the tabpane
            Array.each(obj, function(el, index){
                // create new tab - set title with fallback
                var container = tabpane.addTab(el.get('data-enlighter-title') || el.get('data-enlighter-language') || localoptions.language);

                // run enlighter
                (new EJS(el, localoptions, container)).enlight(true);

            }.bind(this));

            // select first tab (group-leader)
            tabpane.getContainer().inject(obj[0], 'before');
            tabpane.selectTab(0);

        }.bind(this));
    }
});

