/*
---
description: MsDos/Batch Scripting

license: MIT-style

authors:
  - Eric Derewonko

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.msdos]
...
*/
EJS.Language.msdos = new Class ({
    
    Extends: EJS.Language.generic,
    
    setupLanguage: function(){
      this.keywords = {
        keywords: {
          csv: 'if, else, goto, for, in, do, call, exit, not, exist, defined, shift, cd, dir, echo, setlocal, endlocal, pause, copy, append, assoc, at, attrib, break, cacls, cd, chcp, chdir, chkdsk, chkntfs, cls, color, date, dir, erase, fs, help, keyb, label, md, mkdir, mode, more, move, path, pause, print, popd, pushd, promt, rd, recover, rem, rename, replace, restore, rmdir, sort, start, subst, time, title, tree, type, ver, verify, vol, ren, del',
          alias: "kw1",
          mod: "gi"
        },
        reserved: {
          csv: "errorlevel, prn, nul, lpt3, lpt2, lpt1, con, com4, com3, com2, com1, aux",
          alias: "kw2",
          mod: "gi"
        },
        system: {
          csv: "cmd, comp, compact, convert, diskcomp, diskcopy, doskey, find, findstr, format, ftype, graftabl, ping, net, ipconfig, taskkill, xcopy",
          alias: "kw3",
          mod: "gi"
        },
        operators: {
          csv: "equ, neq, lss, leq, gtr, geq, ==",
          alias: "sy0",
          mod: "gi"
        }
      };
      
      this.patterns = {
        'comments': {
          pattern: /^((\s*@?rem\b|::).*)$/gm,
          alias: "co1"
        },
        'numbers': {
          'pattern': this.common.numbers,
          alias: "nu0"
        },
        'setVar': {
          pattern: /(?:^|\s+)(@?set\s+(?:\/[ap]\s+)?\w+)=/gim,
          alias: "kw2"
        },
        'variables': {
          pattern: /(%[\d\*]\b|%\w+%|%%\w\b|%~[dpnx]+\d\b|%\w+:\w+=\w+%|%\w+:~(?:\d+,)?\d+%)/gim,
          alias: "me0"
        },
        'functions': {
          pattern: /(?:^|\s+):\w+\s*?/gm,
          alias: "me1"
        }
      };
    }
});
