
Custom Builds
-------------
The EnlighterJS project is using [Apache ANT](http://ant.apache.org/) as build-system. 
[UglifyJS2](https://github.com/mishoo/UglifyJS2) and [clean-css](https://github.com/jakubpawlowicz/clean-css) are used to minify the production-ready javascript and css files.
To save bandwidth/traffic or include self-defined languages, you can easily customize your EnlighterJS build by editing the *build.xml* file (found in the root directory) and run Apache ANT (target *build*)

You can also use the web-based [EnlighterJS Builder](http://enlighterjs.andidittrich.de/Builder.html) to generate your customized package **without the need of ANT** - everything is done for you serverside!

### Software Requirements ###

* [Apache ANT 1.9](http://ant.apache.org/)
* [Ant-Contrib](http://sourceforge.net/projects/ant-contrib/files/ant-contrib/)
* [Node.js](https://nodejs.org/)
* [UglifyJS2](https://github.com/mishoo/UglifyJS2)
* [clean-css](https://github.com/jakubpawlowicz/clean-css)

### Include/Exclude Languages and Themes ###

If you want to remove some of the default theme you can edit the *include.themes* property and modify the list of css source files.
For Example: only include the Git and Mocha themes

    #XML
    <!-- Themes to include !-->
    <property name="include.themes" value="Source/Themes/Git.css Source/Themes/Mocha.css" />

Or Include only your custom themes

    #XML
    <!-- Themes to include !-->
    <property name="include.themes" value="Source/Themes/Custom1.css Source/Themes/Custom2.css" />		
		
Removing/Adding languages is also easy as this - they are defined by the *include.languages* property.
For Example: only include html+css+js syntax highlighting (be careful - html is an alias for XML!, you have to include `Xml.js`)

    #XML
    <!-- Languages to include !-->
    <property name="include.languages" value="Source/Languages/Css.js Source/Languages/Xml.js Source/Languages/Js.js" />
