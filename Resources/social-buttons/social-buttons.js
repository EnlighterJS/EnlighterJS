(function(_w){

    var defaultOptions = {
        // large or small button ?
        large: false,

        // Button type github-(star, fork, watch, follow), twitter-(follow, tweets)
        type: 'github-star',

        // custom button text
        text: null,

        // github/twitter username
        username: '',

        // github repository name
        repo: '',

        // wordpress plugin name
        plugin: ''
    };

    // global "socialbutton" function
    _w.SocialButton = (function(target, opt){
        var options = Object.merge({}, defaultOptions, opt || {});

        // data source
        var data = _w._social;

        // valid data object ?
        if (!data){
            return;
        }

        // urls
        var textUrl = '';
        var counterUrl = '';

        // website urls
        var githubUserUrl = 'https://github.com/' + options.username + '/';
        var githubRepoUrl = githubUserUrl + options.repo + '/';
        var githubGistUrl = 'https://gist.github.com/' + options.username + '/';
        var twitterUserUrl = 'https://twitter.com/' + options.username + '/'
        var twitterFollowerUrl = twitterUserUrl + 'followers';
        var wordpressUserUrl = 'https://profiles.wordpress.org/' + options.username + '/';
        var wordpressPluginUrl = 'https://wordpress.org/plugins/' + options.plugin.toLowerCase() + '/';

        // text to display
        var text = '-';

        // counter value
        var count = 0;

        // icon type
        var iconType = 'twitter';

        // star, fork, follow, watch are supported
        switch (options.type){
            case 'github-star':
                text = 'Star #' + options.repo;
                textUrl = githubRepoUrl;
                counterUrl = githubRepoUrl + 'stargazers';
                count = data.github.repos[options.repo].stargazers;
                iconType = 'github';
                break;

            case 'github-fork':
                text = 'Fork #' + options.repo;
                textUrl = githubRepoUrl;
                counterUrl = githubRepoUrl + 'network';
                count = data.github.repos[options.repo].forks;
                iconType = 'github';
                break;

            case 'github-followers':
                text = 'Follow @' + options.username;
                textUrl = githubUserUrl;
                counterUrl = githubUserUrl + 'followers';
                count = data.github.followers;
                iconType = 'github';
                break;

            case 'github-opensource':
                text = 'OpenSource';
                textUrl = githubUserUrl;
                counterUrl = githubUserUrl + '?tab=repositories';
                count = Object.keys(data.github.repos).length;
                iconType = 'github';
                break;

            case 'github-gist':
                text = 'Code Snippets';
                textUrl = githubGistUrl;
                counterUrl = githubGistUrl;
                count = data.github.gists;
                iconType = 'github';
                break;

            case 'twitter-followers':
                text = 'Follow @' + options.username;
                textUrl = twitterUserUrl;
                counterUrl = twitterFollowerUrl;
                count = data.twitter.followers;
                iconType = 'twitter';
                break;

            case 'twitter-tweets':
                text = 'Tweets';
                textUrl = twitterUserUrl;
                counterUrl = twitterUserUrl;
                count = data.twitter.tweets;
                iconType = 'twitter';
                break;

            case 'wordpress-user':
                text = 'WordPress Plugins';
                textUrl = wordpressUserUrl;
                counterUrl = wordpressUserUrl + '#content-plugins';
                count = Object.keys(data.wordpress.plugins).length;
                iconType = 'wordpress';
                break;

            case 'wordpress-plugin':
                text = options.plugin;
                textUrl = wordpressPluginUrl;
                counterUrl = wordpressPluginUrl + 'stats/';
                count = data.wordpress.plugins[options.plugin.toLowerCase()].downloads;
                iconType = 'wordpress';
                break;
        }

        // text override ?
        if (options.text !== null){
            text = options.text;
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
        var buttonContainer = new Element('div', {
            'class': 'social-button ' + (options.large ? 'social-btn-large' : '')
        });
        var counter = new Element('a', {
            'class': 'social-count',
            href: counterUrl,
            target: '_blank',
            text: count
        });
        var ico = new Element('span', {
            'class': iconType + '-ico'
        });
        var txt = new Element('span', {
            'class': 'social-text',
            text: text
        });
        var button = new Element('a', {
            'class': 'social-btn',
            href: textUrl,
            target: '_blank'
        });

        // create structure
        button.grab(ico).grab(txt);
        buttonContainer.grab(button);

        // count set ?
        if (count != null){
            buttonContainer.grab(counter);
        }

        target.grab(buttonContainer);
    });

})(window);