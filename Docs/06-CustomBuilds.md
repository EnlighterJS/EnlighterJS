
Custom Builds
-------------
The EnlighterJS project is using [Apache ANT](http://ant.apache.org/) as build-system. The [YUI Compressor](http://yui.github.io/yuicompressor/) is used minify the production-ready javascript and css files.
To save bandwith/traffic or include self-defined languages, you can easily customize your EnlighterJS build by editing the *build.xml* file (found in the root directory) and run Apache ANT Build (target *build*)

You can also use the webbased [EnlighterJS Builder](http://enlighterjs.andidittrich.de/Builder.html) to generate your customized package **without the need of ANT** - everything is done for you serverside!

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
For Example: only include html+css+js syntax highlighting (be carefull - html is an alias for XML!, you have to include `Xml.js`)

    #XML
    <!-- Languages to include !-->
    <property name="include.languages" value="Source/Languages/Css.js Source/Languages/Xml.js Source/Languages/Js.js" />
