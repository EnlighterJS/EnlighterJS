
Code-Groups
-----------

This example shows how to use code-groups. You can define a new code-group by adding a `data-enlighter-group` attribute to your code tags you want to group. The value is used as an internal identifier and is not shown anywhere (e.g. use numerical identifiers).
The name/title of the tab is defined by a `data-enlighter-title` attribute. To use a corporate style within all code-blocks grouped together, the theme definition of the first code-block defined in your document (the group leader) is used as theme of the complete group - other theme definitions will be ignored. if no theme is specified, the default theme (defined in the options) will be used, which is recommended.

### Define a Code-Group ###

```html
<!-- the following 3 code-blocks will be grouped togehter - the theme will be "enlighter" (global theme definition of the group-leader) !-->
<pre data-enlighter-language="js" data-enlighter-group="group0001" data-enlighter-title="Javascript">
this.tokens = tokens || [];
options = this.options;
</pre>

<!-- Theme definition will be ignored !-->
<pre data-enlighter-language="java" data-enlighter-theme="panic" data-enlighter-group="group0001" data-enlighter-title="pure Java">
import javax.swing.JOptionPane;

public class OddEven {
/**
 * "input" is the number that the user gives to the computer
 */
private int input; // a whole number("int" means integer)
</pre>

<!-- Theme definition will be ignored !-->
<pre data-enlighter-language="php" data-enlighter-theme="twilight" data-enlighter-group="group0001" data-enlighter-title="PHP Script">
/** Test Snippet */
$mysqli = new mysqli("localhost", "my_user", "my_password", "world");
   
/* check connection */
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}
</pre>
```
	
### Initialize Code-Groups ###
The initialization of code-groups differs from the standard. You have to use the `EnlighterJS.Util.Helper` utility function (triggered by Metainit and EnlighterJS.Util.Init) - it does the complete initialization and grouping for you!
* JS-Initialization Chain: EnlighterJS.Util.Init -> **EnlighterJS.Util.Helper** -> EnlighterJS
* Metainit-Initialization Chain: EnlighterJS.Util.Metainit -> **EnlighterJS.Util.Helper** -> EnlighterJS

Finally, use the following JavaScript code inside of a `domready` or `onload` event to create the highlighted elements. 
Check out the options section to see the various options you can use. 

**Notice:** `grouping` has to set to `true` when using the javascript based initialization

```js
// highlight all pre tags; no inline-highlighting
EnlighterJS.Util.Init('pre', null, {
    indent: 4,
    language: 'js',
    theme: 'enlighter',
    grouping: true,
    rawButton: true
});
```