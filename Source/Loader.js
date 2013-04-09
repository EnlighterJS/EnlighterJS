/*
---
description: File loading engine for Lighter.

license: MIT-style

authors:
  - Jose Prado

requires:
  - Core/1.3

provides: [Loader]
...
*/
(function() {
    
var Loader = this.Loader = new Class({
    
    Implements: Options,
    
    options: {
        stylesheets: null,
        scripts:     null
    },
    
    initialize: function(options)
    {
        this.setOptions(options);
        this.stylesheets = {};
        this.scripts     = {};
        
        // Figure out path based on script location of Lighter.js or option passed in.
        $$('head script').each(function(el) {
            var script = el.src.split('?', 1),
                pattern = /(?:Loader|Lighter)\.js$/gi;
            if (pattern.test(script[0])) {
                this.basePath = script[0].replace(pattern, '');
            }
        }, this);
        
        if (this.options.stylesheets === null) {
            this.options.stylesheets = this.basePath;
        }
        
        if (this.options.scripts === null) {
            this.options.scripts = this.basePath;
        }
        
        return this;
    },
    
    loadFlame: function(flame)
    {
        var fileName = 'Flame.' + flame + '.css?' + Date.now();
        this.loadStylesheet(fileName, flame);
        
        return this;
    },

    loadFuel: function(fuel, onLoad, onError)
    {
        if (typeof(Fuel[fuel]) == 'function' && typeof(Fuel[fuel].prototype) == 'object') {
            return onLoad();
        }
        
        var fileName = 'Fuel.' + fuel + '.js?' + Date.now();
        this.loadScript(fileName, fuel, onLoad, onError);
        
        return this;
    },
    
    loadStylesheet: function(fileName, hash)
    {
        if (this.stylesheets[hash] === undefined) {
            this.stylesheets[hash] = new Element('link', {
                rel:   'stylesheet',
                type:  'text/css',
                media: 'screen',
                href:  this.options.stylesheets + fileName
            }).inject(document.head);
        }
        
        return this;
    },
    
    loadScript: function(fileName, hash, onLoad, onError)
    {
        onLoad  = onLoad  || function(){};
        onError = onError || function(){};
        
        var script = this.scripts[hash] || new Element('script', {
            src:  this.options.scripts + fileName,
            type: 'text/javascript'
        });
        
        script.addEvents({
            load:  onLoad,
            error: onError,
            readystatechange: function() {
                if (['loaded', 'complete'].contains(this.readyState)) {
                    onLoad();
                }
            }
        });
        
        if (this.scripts[hash] == undefined) {
            this.scripts[hash] = script.inject(document.head);
        }
        
        return this;
    }
});

})();
