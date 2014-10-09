window.addEvent('domready', function(){
	// create a new button
	document.id('githubbutton1').grab(new GitHubButton({
		owner : 'AndiDittrich',
		repo : 'EnlighterJS',
		large : false,
		type : 'star'
	}));
	// create a new button
	document.id('githubbutton2').grab(new GitHubButton({
		owner : 'AndiDittrich',
		repo : 'EnlighterJS',
		large : false,
		type : 'fork'
	}));
	
	
	// carousel
	var carousel = new BooCarousel(document.id('frontpageCarousel'));
	carousel.autoplay();
});
/*!
---
name: BooCarousel
description: Simple MooTools based Carousel Plugin for Bootstrap 

license: MIT-Style X11 License

authors:
  - Andi Dittrich
  
requires:
  - Core/1.4.5

provides: [BooCarousel]
...
*/
var BooCarousel = new Class({
	Implements: Options,
	
	options: {
		// autoplay change interval in ms
		interval: 4000,
		
		// slide change function
		changeFx: function(oldContainer, newContainer){
			oldContainer.dissolve();
			newContainer.reveal();
		}
	},
	
	linkItems: [],
	slides: [],
	currentSlideIndex: 0,
	timer: null,
	
	initialize: function(itemContainer, options){
		// container available ?
		if (!itemContainer){
			return;
		}
		
		this.setOptions(options);
		
		// get containers
		var linkContainer = itemContainer.getElement('.carousel-indicators');
		this.slides = itemContainer.getElements('.carousel-inner > .item');
		
		// create indicators
		Array.each(this.slides, function(item, i){
			var el = new Element('li', {
				events: {
					click: function(){
						this.showSlide(i);
					}.bind(this)			
				}
			});
			linkContainer.grab(el);
			this.linkItems.push(el);
		}.bind(this));
		
		// first indicator item
		this.linkItems[0].addClass('active');
		
		// previous/next buttons
		var controls = itemContainer.getElements('a.carousel-control');
		Array.each(controls, function(el){
			if (el.get('data-slide') == 'prev'){
				el.addEvent('click', this.previous.bind(this));
			}
			if (el.get('data-slide') == 'next'){
				el.addEvent('click', this.next.bind(this));
			}
		}.bind(this));
	},
	
	/**
	 * Show slide n
	 */
	showSlide: function(slideIndex){
		// stop autoplay timer
		this.stop();
		
		if (slideIndex >= this.slides.length){
			return;
		}
		
		// indicator highlight
		this.linkItems[this.currentSlideIndex].removeClass('active');
		this.linkItems[slideIndex].addClass('active');

		// show slide
		this.options.changeFx(this.slides[this.currentSlideIndex], this.slides[slideIndex]);
		
		// store index
		this.currentSlideIndex = slideIndex;
		
		// restart autplay ?
		if (this.timer){
			this.autoplay();
		}
	},
	
	/**
	 * Show next slide
	 */
	next: function(){
		// get next slides
		var i = (this.currentSlideIndex < this.slides.length-1) ? this.currentSlideIndex + 1 : 0;
		this.showSlide(i);
	},
	
	/**
	 * Show previous slide
	 */
	previous: function(){
		// get previous slides
		var i = (this.currentSlideIndex - 1 >= 0) ? this.currentSlideIndex - 1 : this.slides.length-1;
		this.showSlide(i);
	},
	
	/**
	 * Start Autoplay
	 */
	autoplay: function(){
		this.timer = this.next.delay(this.options.interval, this);
	},
	
	/**
	 * Stop the autoplaying
	 */
	stop: function(){
		// timer active ?
		if (this.timer){
			clearTimeout(this.timer);
		}		
	}
});