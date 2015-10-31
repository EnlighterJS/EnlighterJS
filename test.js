var python_keywords = {
    reserved:{
        csv:"and, del, from, not, while, as, elif, global, or, with, assert, else, if, pass, yield, break, except, import, print, class, exec, in, raise, continue, finally, is, return, def, for, lambda, try",
        alias:'kw1'
    },
    functions:{
        csv:"__import__, abs, all, any, apply, bin, callable, chr, cmp, coerce, compile, delattr, dir, divmod, eval, execfile, filter, format, getattr, globals, hasattr, hash, hex, id, input, intern, isinstance, issubclass, iter, len, locals, map, max, min, next, oct, open, ord, pow, print, range, raw_input, reduce, reload, repr, round, setattr, sorted, sum, unichr, vars, zip",
        alias:'kw2'
    },
    classes:{
        csv:"ArithmeticError, AssertionError, AttributeError, BaseException, BufferError, BytesWarning, DeprecationWarning, EOFError, EnvironmentError, Exception, FloatingPointError, FutureWarning, GeneratorExit, IOError, ImportError, ImportWarning, IndentationError, IndexError, KeyError, KeyboardInterrupt, LookupError, MemoryError, NameError, NotImplementedError, OSError, OverflowError, PendingDeprecationWarning, ReferenceError, RuntimeError, RuntimeWarning, StandardError, StopIteration, SyntaxError, SyntaxWarning, SystemError, SystemExit, TabError, TypeError, UnboundLocalError, UnicodeDecodeError, UnicodeEncodeError, UnicodeError, UnicodeTranslateError, UnicodeWarning, UserWarning, ValueError, Warning, ZeroDivisionError, basestring, bool, buffer, bytearray, bytes, classmethod, complex, dict, enumerate, file, float, frozenset, int, list, long, object, property, reversed, set, slice, staticmethod, str, super, tuple, type, unicode, xrange",
        alias:'kw2'
    }
};


var cython_keywords = {
    reserved:{
        csv:"__all__, and, del, from, not, while, as, ELIF, elif, global, or, with, assert, ELSE, else, IF, if, pass, yield, break, except, include, cimport, import, pyximport, cythonize, print, class, exec, in, raise, continue, finally, is, return, DEF, def, cdef, cpdef, for, lambda, try, ctypedef, property",
        alias:'kw1'
    },
    functions:{
        csv:"__dealloc__, __get__, __import__, __init__, abs, all, any, apply, bin, callable, chr, cmp, coerce, compile, delattr, dir, divmod, eval, execfile, filter, fopen, format, getattr, globals, hasattr, hash, hex, id, input, intern, isinstance, issubclass, iter, len, locals, map, max, min, next, oct, open, ord, pow, print, range, raw_input, reduce, reload, repr, round, setattr, sorted, sum, unichr, vars, zip",
        alias:'kw2'
    },
    classes:{
        csv:"ArithmeticError, AssertionError, AttributeError, BaseException, BufferError, BytesWarning, DeprecationWarning, EOFError, EnvironmentError, Exception, FloatingPointError, FutureWarning, GeneratorExit, IOError, ImportError, ImportWarning, IndentationError, IndexError, KeyError, KeyboardInterrupt, LookupError, MemoryError, NameError, NotImplementedError, OSError, OverflowError, PendingDeprecationWarning, PyErr_Fetch, PyErr_Occurred, PyErr_WarnEx, ReferenceError, RuntimeError, RuntimeWarning, StandardError, StopIteration, SyntaxError, SyntaxWarning, SystemError, SystemExit, TabError, TypeError, UnboundLocalError, UnicodeDecodeError, UnicodeEncodeError, UnicodeError, UnicodeTranslateError, UnicodeWarning, UserWarning, ValueError, Warning, ZeroDivisionError, basestring, bool, buffer, bytearray, bytes, char, classmethod, complex, dict, double, enumerate, extern, file, float, frozenset, int, list, long, namespace, object, property, public, reversed, set, slice, staticmethod, str, struct, super, tuple, type, void, unicode, union, unsigned, xrange",
        alias:'kw2'
    }
};


function isInArray(value, array) {
    return array.indexOf(value) > -1;
}

var compare = function(key){

    var py = python_keywords[key].csv.replace(/\s/g, '').split(',');
    var cy = cython_keywords[key].csv.replace(/\s/g, '').split(',');


    cy.forEach(function(el){

        if (isInArray(el, py)){
            //console.log('Found [' + el + ']')
        }else{
            process.stdout.write(el + ', ');
            //console.log('NEW [' + el + ']')
        }

    });
};



compare('functions');