/*
---
description: Ruby language

license: MIT-style

authors:
  - Jose Prado

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.ruby]
...
*/
EJS.Language.ruby = new Class ({
    
    Extends: EJS.Language.generic,
    
    setupLanguage: function()
    {
        this.keywords = {
            reserved: {
                csv: "__FILE__, __LINE__, alias, and, BEGIN, begin, break, case, class, def, defined, do, else, elsif, END, end, ensure, false, for, if, in, module, next, nil, not, or, redo, rescue, retry, return, self, super, then, true, undef, unless, until, when, while, yield",
                alias: 'kw1'
            },
            functions: {
                csv: "abort, at_exit, autoload, binding, block_given, callcc, caller, catch, chomp, chop, eval, exec, exit, exit!, fail, fork, format, gets, global_variables, gsub, lambda, proc, load, local_variables, loop, open, p, print, proc, putc, puts, raise, fail, rand, readline, readlines, require, scan, select, set_trace_func, sleep, split, sprintf, format, srand, syscall, system, sub, test, throw, trace_var, trap, untrace_var",
                alias: 'kw2'
            },
            classes: {
                csv: "Abbrev, ArgumentError, Array, Base64, Benchmark, Benchmark::Tms, Bignum, Binding, CGI, Cookie, HtmlExtension, QueryExtension, Session, FileStore, MemoryStore, Class, Comparable, Complex, ConditionVariable, Continuation, Data, Date, DateTime, Dir, EOFError, Enumerable, Errno, Exception, FalseClass, File, Constants, Stat, FileTest, FileUtils, CopyContext_, DryRun, NoWrite, Verbose, Find, Fixnum, Float, FloatDomainError, GC, Generator, Hash, IO, IOError, Iconv, Failure, IllegalSequence, InvalidCharacter, OutOfRange, IndexError, Integer, Interrupt, Kernel, LoadError, LocalJumpError, Logger, Application, LogDevice, Severity, ShiftingError, Marshal, MatchData, Math, Matrix, Method, Module, Mutex, NameError, NilClass, NoMemoryError, NoMethodError, NotImplementedError, Numeric, Object, ObjectSpace, Observable, Pathname, Precision, Proc, Process, GID, Status, Sys, UID, Queue, Range, RangeError, Regexp, RegexpError, RuntimeError, ScriptError, SecurityError, Set, Shellwords, Signal, SignalException, Singleton, SingletonClassMethods, SizedQueue, SortedSet, StandardError, String, StringScanner, StringScanner::Error, Struct, Symbol, SyncEnumerator, SyntaxError, SystemCallError, SystemExit, SystemStackError, Tempfile, Test, Unit, Thread, ThreadError, ThreadGroup, ThreadsWait, Time, TrueClass, TypeError, UnboundMethod, Vector, YAML, ZeroDivisionError, Zlib, BufError, DataError, Deflate, Error, GzipFile, CRCError, Error, LengthError, NoFooter, GzipReader, GzipWriter, Inflate, MemError, NeedDict, StreamEnd, StreamError, VersionError, ZStream, fatal",
                alias: 'kw2'
            }
        },
        
        this.patterns = {
            'poundComments': { pattern: this.common.poundComments, alias: 'co1' },
            'multiComments': { pattern: /^=begin[\s\S]*?^=end/gm,  alias: 'co2' },
            
            'strings':     { pattern: this.common.strings,                                        alias: 'st0' },
            'tickStrings': { pattern: this.delimToRegExp("`", "\\", "`", "gm"),                   alias: 'st0' },
            'delimString': { pattern: /(%[q|Q|x]?(\W)[^\2\\\n]*(?:\\.[^\2\\]*)*(\2|\)|\]|\}))/gm, alias: 'st1' },
            'heredoc':     { pattern: /(<<(\'?)([A-Z0-9]+)\2[^\n]*?\n[\s\S]*\n\3(?![\w]))/gim,    alias: 'st2' },
            
            //'instanceVar': { pattern: /@[A-Z_][\w]*/gi,       alias: 'kw3' },
            //'classVar':    { pattern: /@@[A-Z_][\w]*/gi,      alias: 'kw3' },
            //'globalVar':   { pattern: /\$(?:\-[\S]|[\w]+)/gi, alias: 'kw3' },
            'variables':   { pattern: /(@[A-Za-z_][\w]*|@@[A-Za-z_][\w]*|\$(?:\-[\S]|[\w]+)|\b[A-Z][\w]*)/g, alias: 'kw3' },
            'rubySymbols': { pattern: /[^:](:[\w]+)/g, alias: 'kw4' },
            'constants':   { pattern: /\b[A-Z][\w]*/g, alias: 'kw3' },
            
            'numbers':    { pattern: /\b((([0-9]+)?\.)?[0-9_]+([e][-+]?[0-9]+)?|0x[A-F0-9]+|0b[0-1_]+)\b/gim, alias: 'nu0' },
            'properties': { pattern: this.common.properties, alias: 'me0' },
            'brackets':   { pattern: this.common.brackets,   alias: 'br0' },
            
            'delimRegex':   { pattern: /(%r(\W)[^\2\\\n]*(?:\\.[^\2\\\n]*?)*(\2|\)|\]|\})[iomx]*)/gm, alias: 're0' },
            'literalRegex': { pattern: this.delimToRegExp("/", "\\", "/", "g", "[iomx]*"),           alias: 're0' }
        };
        
    }
});
