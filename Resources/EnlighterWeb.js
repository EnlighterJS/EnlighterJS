
function ContentNavigation(contentContainerSelector, navContainerSelector){
    // content navi
    var nav = document.getElement(navContainerSelector);

    if (!nav || nav.get('data-autogen') !== 'true'){
        return;
    }

    // get the content container
    var contentContainer = document.getElement(contentContainerSelector);

    // container offset (absolute position)
    var containerOffset = contentContainer.getPosition().y;

    // the current subsection
    var currentSection = null;

    // unique heading id
    var headingID = 1;

    // scroll spy observer
    var h2Observer = {
        elements : [],
        currentAnchor : null,
        currentItem : null
    };

    var h3Observer = {
        elements : [],
        currentAnchor : null,
        currentItem : null
    };

    // get all h2, h3 elements
    contentContainer.getElements('h2, h3').each(function(el){
        // create anchor name
        var anchorName = el.get('text').replace(/\s+?/gi, '_').replace(/[^a-z0-9_ -]/gi, '') + '_' + headingID;

        // add invisible anchor
        var anchor = new Element('span', {
            'class': 'anchor',
            'id': anchorName
        });
        el.grab(anchor, 'before');

        // generate navigation
        if (el.tagName == 'H3' && currentSection){
            var h3 = new Element('li');
            h3.grab(new Element('a', {
                text: el.get('text'),
                href: '#' + anchorName
            }));
            currentSection.grab(h3);



        }else if (el.tagName == 'H2'){
            var h2 = new Element('li');
            h2.grab(new Element('a', {
                text: el.get('text'),
                href: '#' + anchorName
            }));

            // open new section
            currentSection = new Element('ul');
            h2.grab(currentSection);
            nav.grab(h2);
        }

        // scroll spy observer
        (el.tagName == 'H3' ? h3Observer : h2Observer).elements.push({
            id: anchorName,
            position: el.getPosition()
        });

        // increment id
        headingID++;
    });

    // sort observers by position
    h2Observer.elements.sort(function(a, b){
        return (a.position.y - b.position.y);
    });
    h3Observer.elements.sort(function(a, b){
        return (a.position.y - b.position.y);
    });

    // add dummy elements (max position)
    h2Observer.elements.push({position: {y: 9999999, x: 999999}});
    h3Observer.elements.push({position: {y: 9999999, x: 999999}});

    window.addEvent('scroll', function(){
        // current scroll with calculated offset
        var currentWindowScroll = window.getScroll().y + containerOffset;

        // update h2 & h3 elements
        Array.each([h2Observer, h3Observer], function(observer){
            // find currently visible element
            for (var i = 0; i < observer.elements.length; i++){

                // element visible ?
                if (observer.elements[i].position.y > currentWindowScroll){
                    // the n-1th element is the currently active one
                    if (i>0){
                        i = i-1;
                    }

                    // element changed ?
                    if (observer.currentAnchor != observer.elements[i].id){
                        // store current anchorID
                        observer.currentAnchor = observer.elements[i].id;

                        // old highlighted menu item available ?
                        if (observer.currentItem){
                            observer.currentItem.removeClass('spyActive');
                        }

                        // get new menu item to highlight by it's anchor link (get it's parent li container !)
                        observer.currentItem = nav.getElement('a[href="#' + observer.currentAnchor + '"]').getParent();

                        // highlight element
                        if (observer.currentItem){
                            observer.currentItem.addClass('spyActive');
                        }
                    }
                    break;
                }
            }
        });
    }).fireEvent('scroll');
};


function ScrollSpyNavigation(navContainerSelector, contentContainerSelector){

};

function StickyNavigation(navContainerSelector){
    // navi container element
    var naviContainer = document.getElement(navContainerSelector);

    // container available ?
    if (!naviContainer || naviContainer.get('data-nav-static')){
        return;
    }

    // initial scroll offset
    // get absolute container position
    var scrollLimit = naviContainer.getPosition().y;

    // get fixed position and use this value as offset
    naviContainer.addClass('fixedPosition');
    scrollLimit = scrollLimit - naviContainer.getStyle('top').toInt();
    naviContainer.removeClass('fixedPosition');

    // fixed sidebar
    window.addEvent('scroll', function(){
        if (this.getScroll().y > scrollLimit){
            naviContainer.addClass('fixedPosition');
        }else{
            naviContainer.removeClass('fixedPosition');
        }
    });
};

window.addEvent('domready', function(){
    /*
    var repo = window._github_profile.repos.EnlighterJS;
    var user = window._github_profile.user;

    // create github buttons
	document.id('ghb').grab(new GitHubButton({
		owner : 'AndiDittrich',
		repo : 'EnlighterJS',
		large : false,
		type : 'star',
        cache: false,
        count: repo.stargazers
	})).grab(new GitHubButton({
		owner : 'AndiDittrich',
		repo : 'EnlighterJS',
		large : false,
		type : 'fork',
        cache: false,
        count: repo.forks
	})).grab(new GitHubButton({
        owner : 'AndiDittrich',
        repo : 'EnlighterJS',
        large : false,
        type : 'follow',
        cache: false,
        count: user.followers
    }));*/

    // social buttons
    var out = document.id('ghb');

    SocialButton(out, {
        type: 'github-star',
        username: 'AndiDittrich',
        repo: 'EnlighterJS',
        large: false,
        text: 'Star'
    });

    SocialButton(out, {
        type: 'github-fork',
        username: 'AndiDittrich',
        repo: 'EnlighterJS',
        large: false,
        text: 'Fork'
    });

    SocialButton(out, {
        type: 'github-followers',
        username: 'AndiDittrich',
        large: false
    });

    SocialButton(out, {
        type: 'github-opensource',
        username: 'AndiDittrich',
        large: false
    });

    SocialButton(out, {
        type: 'twitter-followers',
        username: 'andidittrich',
        large: false
    });

    SocialButton(out, {
        type: 'wordpress-plugin',
        username: 'Andi Dittrich',
        plugin: 'Enlighter',
        large: false
    });


    // initialize content navigation
    ContentNavigation('article', '#content-nav');

    // initialize sticky nav
    StickyNavigation('#content-nav');
});