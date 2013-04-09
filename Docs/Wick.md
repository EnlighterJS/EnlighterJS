Wicks.js Documentation
<div id="docs" markdown="1">

Class: Wick {#Wick}
===================

[Lighter.js]() helper class. Creates a new Wick instance which stores relevant info about matched RegEx bits.


Wick Method: constructor {#Wick:constructor}
--------------------------------------------

### Syntax:

	var myWick = new Wick(match, type, index);

### Arguments:

1. match - (*array*) Result of an exec() call.
2. type  - (*string*) The type/category of the match. 
3. index - (*integer*) Start position of the match.

### Returns:

* (*object*) A new Wick instance.



Wick Method: contains {#Wick:contains}
--------------------------------------

Checks if a Wick is contained within another wick. E.g. The index property is located within the start and end indexes of the other Wick. 

### Syntax:

	wick1.contains(wick2);

### Arguments:

1. wick - (*Wick*) The Wick object to find.

### Returns:

* (*boolean*) Whether or not Wick2 begins within Wick1.



Wick Method: isBeyond {#Wick:isBeyond}
--------------------------------------

Checks if a Wick is located past another Wick. E.g. The index property is located past the index+length properties of the other Wick.

### Syntax:

	wick1.isBeyond(wick2);

### Arguments:

1. wick - (*Wick*) The Wick object to compare with.

### Returns:

* (*boolean*) Whether or not wick1 is located past wick2.



Wick Method: overlaps {#Wick:overlaps}
---------------------------------------

Checks if a Wick overlaps another Wick if they begin at the same index. E.g. The index properties are the same and the length is longer than the length of the other Wick.

### Syntax:

	wick1.overlaps(wick2);

### Arguments:

1. wick - (*Wick*) The Wick object to compare with.

### Returns:

* (*boolean*) Whether or not wick1 overlaps wick2.

</div>

<div id="menu" markdown="1">

#### [Wick](#Wick) ####
[constructor](#Wick:constructor)
[contains](#Wick:contains)
[isBeyond](#Wick:isBeyond)
[overlaps](#Wick:overlaps)

</div>