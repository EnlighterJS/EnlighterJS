Fuel.js Documentation
<div id="docs" markdown="1">

Class: Fuel {#Fuel}
===================

Helper class for Lighter.js which builds an array of matches from source code based on a set of RegEx patterns.


Fuel Method: constructor {#Fuel:constructor}
--------------------------------------------

### Syntax:

	var myFuel = new Fuel(code[, options[, wicks]]);

### Arguments:

1. code - (*string*) The source code to match rules against.
2. options - (*object*, optional) The options object.
3. wicks   - (*array*, optional) Array containing an initial set of Wicks to work from.

### Returns:

* (*Fuel*) A new Fuel instance.



Fuel Instance Variable: language {#Fuel:language}
-------------------------------------------------

* (*string*, defaults to "") Name of the programming language this Fuel best suits. Placeholder for now, might add future functionality later on.



Fuel Instance Variable: aliases {#Fuel:aliases}
-----------------------------------------------

* (*Hash*) Holds the set of rule names to aliases to get the correct CSS classes from.



Fuel Instance Variable: patterns {#Fuel:patterns}
-------------------------------------------------

* (*Hash*) Hash to fill with your own set of RegEx patterns which will be added to the rules Hash once the parent constructor is called. Note: Must override *within* the extending Fuel's constructor to use the properties defined in the common object.

### Example:

	this.patterns = new Hash({
		'strings': {pattern: this.common.strings} // References a predefined RegEx rule.
		'integers': {pattern: /[0-9]+/g, alias: 'numbers'} // Optional alias to assign different class name.
	});



Fuel Instance Variable: keywords {#Fuel:keywords}
-------------------------------------------------

* (*Hash*) Hash to fill with a set of language keywords in comma separated values (CSV) form. Converted from CSV to a RegEx pattern and added to the rules Hash once the parent constructor is called. Can add multiple sets of keywords to style each set individually. Not necessary, but provides an easy way to create a rule out of a CSV set of words.

### Example:

	this.keywords = new Hash({
		'languageKeywords': {csv: "keyword1, keyword2, keyword3", alias: "keywords1"},
		'otherKeywords':    {csv: "other1, other2, other3",       alias: "keywords2"}
	})



Fuel Instance Variable: rules {#Fuel:rules}
-------------------------------------------

* (*Hash*) Holds the set of rules which will be applied to the source code. Filled automatically with rules from the patterns and keywords hashes.
	


Fuel Instance Variable: common {#Fuel:common}
---------------------------------------------

Common RegEx patterns for use in extending fuels.

### Properties:

* slashComments     - (*RegExp*) Matches a C style single-line comment.
* poundComments     - (*RegExp*) Matches a Perl style single-line comment.
* multiLineComments - (*RegExp*) Matches a C style multi-line comment.
* strings           - (*RegExp*) Matches a string enclosed by either single/double quotes.
* aposStrings       - (*RegExp*) Matches a string enclosed by single quotes.
* quotedStrings     - (*RegExp*) Matches a string enclosed by double quotes.
* properties        - (*RegExp*) Matches a property: .property style.
* methodCalls       - (*RegExp*) Matches a method call: .methodName() style.
* functionCalls     - (*RegExp*) Matches a function call: functionName() style.
* numbers           - (*RegExp*) Matches integers, decimals, hexadecimals.



Fuel Method: addFuel {#Fuel:addFuel}
------------------------------------

Adds a RegExp pattern to the rules object and adds an alias to the aliases object. Optional className argument let's you set the class independently from a descriptive rule name (e.g. fuelName "multiLineComments" can have a className "comments" or "co1").

### Syntax:

	this.addFuel(fuelName, RegEx[, className]);

### Arguments:

1. fuelName  - (*string*) Name for the RegEx/Class pair.
2. RegEx     - (*RegExp*) RegEx rule to apply to source code.
3. className - (*Hash*, optional) Class name to apply to matched bits.



Fuel Method: addAlias {#Fuel:addAlias}
--------------------------------------

Adds an alias into the aliases object to map from rule names to class names.

### Syntax:

	this.addAlias(key, alias);
	
### Arguments:

1. key   - (*string*) The alias key.
2. alias - (*string*) The class name the key maps to.



Fuel Method: csvToRegex {#Fuel:csvToRegex}
------------------------------------------

RegExp helper: Converts a list of comma separated words into a RegExp ready pattern. Adds word boundaries and capturing parentheses.

### Syntax:

	this.csvToRegex(csv)

### Arguments:

1. csv - (*string*) Comma separated set of words.

### Returns:

* (*string*) Formatted string ready for RegExp use.

### Example:

	var keywords = this.csvToRegex("keyword1, keyword2, keyword3");
	// keywords is now = \b(keyword1|keyword2|keyword3)\b



Fuel Method: delimToRegExp {#Fuel:delimToRegExp}
------------------------------------------------

RegExp helper: Creates a RegEx pattern which matches a delimited section based on the passed arguments. Outputs pattern in the form b[^e\n]*e if no escaped delmiter is allowed or b[^ex\n]*(?:x.[^ex\n]*)*e where b and e are the delimiters and x is an escape character.

### Syntax:

	this.delimToRegExp(beg[, esc[, end]]);
	
### Arguments:

1. beg - (*string*) Beginning delimiter. Used as the end delimiter as well unless different.
2. esc - (*string*, optional) Escape character if the end delimiter can be found in the 
3. end - (*string*, optional) Ending delimiter if different from beginning delimiter.

### Returns:

* (*RegExp*) RegExp object with "gm" flags which matches a section marked by the delimiters.

### Example:

	var pattern = this.delimToRegExp("'", "\\");
	// pattern is now /'[^'\\\n]*(?:\\.[^'\\\n]*)*'/gm



Fuel Method: findMatches {#Fuel:findMatches}
--------------------------------------------

Finds matching symbols within source code by applying RegEx rules and creates Wicks out of matches. Adds in order and without inner matches (Eg. strings within comments). More robust and stringent than the lazy search at the expense of performance.

### Syntax:

	var wicks = this.findMatchesStrict(code[, offset]);

### Arguments:

1. code   - (*string*) Source code.
2. offset - (*integer*) Position to start searching from.

### Returns:

* (*array*) Array of Wicks representing the matches.



Fuel Method: findMatchesLazy {#Fuel:findMatchesLazy}
----------------------------------------------------

Finds matching symbols within source code by applying RegEx rules and creates Wicks out of matches. Adds all matching symbols, sorts them by the index at which they were found, and finally removes overlapping matches. Much faster than normal mode at the expense of accuracy.

### Syntax:

	var wicks = this.findMatchesLazy(code[, offset]);

### Arguments:

1. code - (*string*) Source code.
2. offset - (*integer*) Position to start searching from.

### Returns:

* (*array*) Array of Wicks representing the matches.



Fuel Method: purgeWicks {#Fuel:purgeWicks}
------------------------------------------

Private: Sorts and cleans array of Wicks from overlapping matches.

### Returns:

* (*array*) Purged array of Wicks.



Fuel Method: compareWicks {#Fuel:compareWicks}
----------------------------------------------

Private: Callback function to sort array by Wick indexes.

</div>

<div id="menu" markdown="1">

#### [Fuel](#Fuel) ####
[constructor](#Fuel:constructor)
[language](#Fuel:language)
[defaultFlame](#Fuel:defaultFlame)
[patterns](#Fuel:patterns)
[keywords](#Fuel:keywords)
[rules](#Fuel:rules)
[common](#Fuel:common)
[addFuel](#Fuel:addFuel)
[csvToRegex](#Fuel:csvToRegex)
[findMatchesStrict](#Fuel:findMatchesStrict)
[findMatches](#Fuel:findMatches)
[purgeWicks](#Fuel:purgeWicks)
[compareWicks](#Fuel:compareWicks)

</div>