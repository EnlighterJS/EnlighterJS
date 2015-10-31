/*
---
description: Cython language

license: MIT-style

authors:
  - Andi Dittrich
  - Devyn Collier Johnson

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.cython]
...
*/
EJS.Language.cython = new Class({
    
    Extends: EJS.Language.python,
    
    setupLanguage: function() {
        // run origin language setup
        this.parent();

        // append cython extension keywords
        this.keywords.reserved.csv += ', __all__, include, cimport, pyximport, cythonize, cdef, cpdef, ctypedef, property, IF, ELIF, ELSE, DEF';
        this.keywords.functions.csv += ', __dealloc__, __get__, __init__, fopen';
        this.keywords.classes.csv += ', PyErr_Fetch, PyErr_Occurred, PyErr_WarnEx, char, double, extern, namespace, public, struct, void, union, unsigned, enum';
    }
});
