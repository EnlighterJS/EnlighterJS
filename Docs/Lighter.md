Lighter.js Documentation
<div id="docs" markdown="1">

Class: Lighter {#Lighter}
=========================

Creates and returns an Element with syntax-highlighted source code using the supplied parameters.

### Implements:

Options


Lighter Method: constructor {#Lighter:constructor}
---------------------------------------------------

### Syntax:
~~~	
// Lighter Object syntax.
var myLighter = new Lighter(codeblock[, options]);
~~~

<pre><code class="html">
<!-- Source code element syntax -->
<pre class="fuel[:flame]">Source code goes here</pre>
</code></pre>

### Arguments:

1. codeblock - (*element*) The element which contains the source code.
2. options   - (*object*, optional) The options object.

### Options:

* altLines  - (*string*: defaults to empty) Set to 'hover' for alternate line styling on mouse-over or use any of the MooTools selectors pseudo-classes to style a specific set of lines (e.g. odd, even, first-child).
* clipboard - (*element*: defaults to null) The element to attach the copy-to-clipboard function.
* container - (*string*: defaults to null) Id of the container to inject the Lighter element into.
* editable  - (*boolean*: defaults to false) Whether or not to allow editing of the element.
* flame     - (*string*, defaults to standard) The Flame to use. Can be overridden in the element class.
* fuel      - (*string*, defaults to standard) The Fuel to use. Can be overridden in the element class.
* id        - (*string*: defaults to 'Lighter_' + unique id) The id of the Lighter instance.
* indent    - (*integer*: defaults to -1) Number of spaces to replace tabs with. Leave blank or set to -1 to keep tabs intact.
* matchType - (*string*, defaults to standard) Whether to use the standard or the lazy match finder.
* mode      - (*string*, defaults to pre) Which type of Lighter to output. Can be set to inline, pre, ol, div, and table.
* path        - (*string*, defaults to Lighter.js path) Path to use when dynamically including scripts/stylesheets. No need to change unless files are moved outside of the default folder.
* strict - (*boolean*: defaults to false) Whether to find matches everywhere or only in segments delimited by code like &lt;?php ?&gt; 

### Returns:

* (*object*) A new Lighter instance.

### Examples:

	var myLighter = new Lighter('sourceCode', {
		indent: 2,
		mode: "ol"
	});
	
	// Using Native method
	$$('pre').light({
		altLines: 'hover',
		indent: 4,
		mode: "table"
	});

<pre><code class="html">
<!-- Element syntax using default Flame -->
<pre class="js">Source code</pre>

<!-- Element syntax using alternate Flame -->
<pre class="js:panic">Source code</pre>
</code></pre>

### See Also:
[Pseudo-classes]()



Lighter Instance Variable: name {#Lighter:name}
-----------------------------------------------

* (*string*, defaults to "Lighter") Suffix used when applying class names to the Lighter element (e.g. standard Lighter Elements will have class "standardLighter").




Lighter Method: createLighterNoLines {#Lighter:createLighterNoLines}
--------------------------------------------------------------------

Private: Creates syntax highlighted source code by traversing the source code and adding SPAN elements with corresponding class names for each match.

### Returns:

* (*Element*) PRE Element with highlighted source code. 



Lighter Method: createLighterWithLines {#Lighter:createLighterWithLines}
------------------------------------------------------------------------

Private: Creates syntax highlighted source code by traversing the source code and adding SPAN elements with corresponding class names for each match and creating wrapper LI elements when needed.

### Returns:

* (*Element*) OL with line numbers and highlighted source code.



Lighter Method: insertAndKeepLine {#Lighter:insertAndKeepLine}
---------------------------------------------------------------

Private: Helper function to insert new code segment into existing line.

### Syntax:

	this.insertAndKeepLine(line, text[, type]);

### Arguments:

1. line - (*element*) Reference to current line.
2. text - (*string*) Text to add to current line.
3. type - (*string*) Type of match to assign correct class.



Lighter Method: insertAndMakeLine {#Lighter:insertAndMakeLine}
---------------------------------------------------------------

Helper function to insert new code segment into existing line and create new line.

### Syntax:

	var newLine = this.insertAndMakeLine(line, lines, text[, type]);

### Arguments:

1. line  - (*element*) Reference to current line.
2. lines - (*element*) OL element to add line to.
3. text  - (*string*) Text to add to current line.
4. type  - (*string*) Type of match to assign correct class.

### Returns:

* (*Element*) A new li Element.



Lighter Method: light {#Lighter:light}
---------------------------------------

Shows Lighter element and hides original code block.

### Syntax:

	myLighter.light();

### Returns:

* (*Lighter*) This Lighter instance.



Lighter Method: unlight {#Lighter:unlight}
------------------------------------------

Hides Lighter element and redisplays original code block.

### Syntax:

	myLighter.unlight();
	
### Returns:

* (*Lighter*) This Lighter instance.



Lighter Method: toggleComments {#Lighter:toggleComments}
--------------------------------------------------------

Toggles comment symbol visibility within Lighter element. Finds elements with class name "comments". Make sure your own comment rules are aliased to "comments" for this functionality.

### Syntax:

	myLighter.toggleComments();
	
### Returns:

* (*Lighter*) This Lighter instance.



Lighter Method: hideSymbols {#Lighter:hideSymbols}
--------------------------------------------------

Hides passed Elements and collapses the white-space in the Element preceding each symbol to get rid of unwanted whitespace. If in showLines mode, will also hide appropriate lines.

### Arguments:

1. symbols - (*array*) Elements to be hidden.
	
### Returns:

* (*Lighter*) This Lighter instance.



Lighter Method: showSymbols {#Lighter:showSymbols}
--------------------------------------------------

Re-displays passed Elements and un-collapses the white-space in the Element preceding each symbol to preserve original whitespace. If in showLines mode, will also re-display appropriate lines.

### Arguments:

1. symbols - (*array*) Elements to be re-displayed.
	
### Returns:

* (*Lighter*) This Lighter instance.



Lighter Method: toElement {#Lighter:toElement}
----------------------------------------------

Returns the DOM Element representation of the Lighter Object. Let's you access the highlighted code via the $ function.

### Syntax:

	$(myLighter);
	
### Returns:

* (*element*) Lighter's HTML representation.




Native: Element {#Element}
==========================

Custom Native to allow all of its methods to be used with any DOM element via the dollar function.


Element Method: light {#Element:light}
------------------------------------------------------

Highlights the source code in the Element using supplied options.

### Syntax:

	myElement.light([options]);

### Arguments:

1. options - (*object*, optional) See [Lighter.js]() for acceptable options.

### Returns:

* (*object*) The Lighter instance that was created.

### Examples:

	$('myElement').light({
		indentation: 2,
		showLines: true
	});

	

	
String Functions {#String}
========================

Custom functions to clean string white-space in various ways.


Chop Method: {#String:chop}
---------------------------

Chops the leading/trailing lines (\n) from the string. Leaves valid first line white-space intact.

### Syntax:

	chop(myString);

### Returns:

* (*string*) The chopped string.

### Examples:

	chop("\n\n    i like cookies     \n\n"); // "    i like cookies     "



tabToSpaces Method: {#String:tabToSpaces}
-----------------------------------------

Converts tabs into spaces.

### Syntax:

	tabToSpaces(myString, spaces);

### Arguments:

1. spaces - (*integer*) Amount of spaces to replaces tabs with.
	
### Returns:

* (*string*) The string with tabs replaced.

### Examples:

	tabToSpaces("\ti like cookies\t", 4); // "    i like cookies    "

</div>

<div id="menu" markdown="1">

#### [Lighter](#Lighter) ####
[constructor](#Lighter:constructor)
[name](#Lighter:name)
[createLighterNoLines](#Lighter:createLighterNoLines)
[createLighterWithLines](#Lighter:createLighterWithLines)
[insertAndKeepLine](#Lighter:insertAndKeepLine)
[insertAndMakeLine](#Lighter:insertAndMakeLine)
[light](#Lighter:light)
[unlight](#Lighter:unlight)
[toElement](#Lighter:toElement)
[replaces](#Lighter:replaces)

#### [Element](#Element) ####
[light](#Element:light)

#### [String](#String) ####
[chop](#String:chop)
[tabToSpaces](#String:tabToSpaces)

</div>