
Custom Builds
-------------
The EnlighterJS project is using [Apache ANT](http://ant.apache.org/) as build-system. 
[UglifyJS2](https://github.com/mishoo/UglifyJS2) and [clean-css](https://github.com/jakubpawlowicz/clean-css) are used to minify the production-ready javascript and css files.
To save bandwidth/traffic or include self-defined languages, you can easily customize your EnlighterJS build by editing the *build.xml* file (found in the root directory) and run Apache ANT (target *build*)

### Cloud/Web based builder ###

You can also use the web-based [EnlighterJS Builder](http://enlighterjs.org/Builder.html) to generate your customized package **without the need of ANT/development environment** - everything is done for you server-site!

### Software Requirements ###

* [Apache ANT 1.9](http://ant.apache.org/)
* [Ant-Contrib](http://sourceforge.net/projects/ant-contrib/files/ant-contrib/)
* [Node.js](https://nodejs.org/)
* [UglifyJS2](https://github.com/mishoo/UglifyJS2)
* [clean-css](https://github.com/jakubpawlowicz/clean-css)

### Include/Exclude Languages and Themes ###

If you want to remove some of the default theme you can edit the *include.themes* property and modify the list of css source files.
For Example: only include the modern themes

```xml
<!-- Themes to include !-->
<property name="include.themes" value="Enlighter Godzilla Beyond Classic MooTwo Eclipse Droide" />
```

Or Include only your custom themes (Note: they have to be located into `Source/Themes/`)

```xml
<!-- Themes to include !-->
<property name="include.themes" value="Custom1 Custom2" />		
```xml
			
Removing/Adding languages is also easy as this - they are defined by the *include.languages* property.
For Example: only include html+css+js syntax highlighting (be careful - html is an alias for XML!, you have to include `Xml`)

```xml
<!-- Languages to include !-->
<property name="include.languages" value="Css Javascript Xml" />
```