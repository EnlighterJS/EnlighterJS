/*!
---
name: GitHub-Buttons for MooTools, jQuery and PHP
description: Unofficial GitHub Buttons based on https://github.com/mdo/github-buttons

license: Apache 2.0 License
version: 2.5.0
build: 54ff1b657e537f8107ee7373e0bfeeeb/May 6 2015

authors:
  - Andi Dittrich (author of MooTools/jQuery/PHP based versions)
  - Mark Otto (author of original github-buttons styles)
  
download: https://github.com/AndiDittrich/MooTools.GitHub-Buttons
website: http://github-buttons.andidittrich.de
demo: http://github-buttons.andidittrich.de
  
requires:
  - Core/1.4.5
  - More/Number.Format
  - More/Request.JSONP

provides: [GitHubButton]
...
*//*
---
name: GitHub-Buttons
description: Unofficial GitHub Buttons inspired by https://github.com/mdo/github-buttons

license: Dual-Licensed under "The MIT License (X11)" and "Apache 2.0 License"

authors:
  - Andi Dittrich
  
requires:
  - Core/1.4.5
  - More/Number.Format
  - More/Request.JSONP

provides: [GitHubButton]
...
 */
var GitHubButton = new Class({
	Implements: Options,
	
	// contains the required html structure
	buttonContainer: null,

	options: {
		// large or small button ?
		large: false,
		
		// GitHub username
		owner: null,
		
		// GitHub repository name
		repo: null,
		
		// Button type (star, fork, watch, follow)
		type: 'star',
		
		// custom button text
		text: null,
		
		// enabled/disable counter - manual set the value
		count: true,
		
		// enable/disable caching
		cache: true,
		
		// cache lifetime in seconds (2h default)
		cacheLifetime: 7200,
		
		// error text/count
		errorText: 'NA'
	},	
	
	initialize: function(options){
		this.setOptions(options);

		// jsonp rest service url
		var url = 'https://api.github.com';
		
		// create repo url
		var repoUrl = 'https://github.com/' + this.options.owner + '/' + this.options.repo + '/';
		var actionUrl = 'https://github.com/' + this.options.owner + '/';
		
		// text to display
		var text = '-';

        // response object selector
        var responseSelector = '';
		
		// star, fork, follow, watch are supported
		switch (this.options.type){
			case 'star':
				url += '/repos/' + this.options.owner + '/' + this.options.repo;
				text = 'Star';
				actionUrl = repoUrl + 'stargazers';
                responseSelector = 'stargazers_count';
				break;
				
			case 'fork':
				url += '/repos/' + this.options.owner + '/' + this.options.repo;
				text = 'Fork';
				actionUrl = repoUrl + 'network';
                responseSelector = 'forks_count';
				break;
				
			case 'watch':
				url += '/repos/' + this.options.owner + '/' + this.options.repo;
				actionUrl += this.options.repo + '/watchers';
				text = 'Watchers';
                responseSelector = 'subscribers_count';
				break;
				
			case 'follow':
				url += '/users/' + this.options.owner;
				text = 'Follow @' + this.options.owner;
				repoUrl = actionUrl;
				actionUrl += 'followers';
                responseSelector = 'followers';
				break;
		}
		
		// create html structure
		// @see https://github.com/mdo/github-buttons/blob/master/github-btn.source.html
		// <span class="github-btn" id="github-btn">
		//  <a class="gh-btn" id="gh-btn" href="#" target="_blank">
		//    <span class="gh-ico"></span>
		//    <span class="gh-text" id="gh-text"></span>
		//  </a>
		//  <a class="gh-count" id="gh-count" href="#" target="_blank"></a>
		// </span>
		
		// create elements
		this.buttonContainer = new Element('div', {
			'class': 'github-btn ' + (this.options.large ? 'github-btn-large' : '')
		});
		var count = new Element('a', {
			'class': 'gh-count',
			href: actionUrl,
			target: '_blank'
		});
		var ico = new Element('span', {
			'class': 'gh-ico'
		});
		var txt = new Element('span', {
			'class': 'gh-text',
			text: (this.options.text ? this.options.text : text)
		});
		var button = new Element('a', {
			'class': 'gh-btn',
			href: repoUrl,
			target: '_blank'
		});
		
		// create structure
		button.grab(ico).grab(txt);
		this.buttonContainer.grab(button).grab(count);
			
		// which "count"-mode should be used ?
		if (typeof this.options.count == 'boolean'){
			// show count and request the data via JSONP ?
			if (this.options.count){
				// cache instance name
				var cacheName = 'GHB_' + this.options.type + '_' + this.options.owner + '_' + this.options.repo + '_' + responseSelector;
				
				// cache version available ?
				if (this.options.cache === true){
					var cdata = this.retrieveItem(cacheName, this.options.cacheLifetime);
					
					if (cdata){
						// update text
						count.set('text', cdata.format({group: '.'}));
						return;
					}
				}
				
				// request data
				new Request.JSONP({
					// the rest service url
				    url: url,
				    
				    // jsonp callback get parameter
				    // @see https://developer.github.com/v3/#json-p-callbacks
				    callbackKey: 'callback',
				    
				    // request complete handler
				    onComplete: function(response){
				    	// valid reponse ? request limit not exceeeded ?
				    	if (response.data && response.data[responseSelector]){
                            // extract count
                            var cnt = response.data[responseSelector];

				    		// update text
							count.set('text', cnt.format({group: '.'}));
							
							// update cache
							if (this.options.cache === true){
								this.storeItem(cacheName, cnt);
							}
							
						// set error text	
				    	}else{
				    		count.set('text', this.options.errorText);
				    	}
				    }.bind(this)
				}).send();
			}else{
				// hide counter
				count.setStyle('display', 'none');
			}
			
		}else{
			// manually set the value
			count.set('text', this.options.count.format({group: '.'}));
		}		
	},
	
	// magic method to use class instance as element
	toElement: function(){
		return this.buttonContainer;
	},
	
	// use local storage as cache
	storeItem: function(name, data){
		// generate storage data
		var d = JSON.encode({
			time: (new Date().getTime()),
			payload: data
		});
		
		// try to use html5 features
		if (typeof(Storage) !== "undefined"){
			localStorage.setItem(name, d);
		}
	},
	
	// use local storage as cache
	retrieveItem: function(name, cacheLifetime){
		// try to use html5 features
		if (typeof(Storage) !== "undefined"){
			// get item
			var ls = localStorage.getItem(name);
			
			// available ?
			if (!ls){
				return null;
			}
			
			// decode json serialized data
			ls = JSON.decode(ls);
			
			// lifetime expired ?
			if (!ls.time || (ls.time + (cacheLifetime*1000)) < (new Date().getTime())){
				return null;
			}
			
			// valid payload ?
			return (ls.payload ? ls.payload : null);
		}else{
			return null;
		}
	}
});

// Native Element extension - jQuery like usage
(function(){
	Element.implement({
		GitHubButton: function(options){
			this.grab(new GitHubButton(options));
		}
	});
})();