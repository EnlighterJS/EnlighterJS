/*
---
description: Shell language fuel.

license: MIT-style

authors:
  - Jose Prado

requires:
  - Core/1.3
  - Fuel

provides: [Fuel.shell]
...
*/
Fuel.shell = new Class ({
    
    Extends: Fuel,
    language: 'shell',
    
    initialize: function(options)
    {
        this.keywords = {
            keywords: {
                csv: 'if, fi, then, elif, else, for, do, done, until, while, break, continue, case, function, return, in, eq, ne, gt, lt, ge, le',
                alias: 'kw0'
            },
            commands: {
                csv: 'alias, apropos, awk, bash, bc, bg, builtin, bzip2, cal, cat, cd, cfdisk, chgrp, chmod, chown, chrootcksum, clear, cmp, comm, command, cp, cron, crontab, csplit, cut, date, dc, dd, ddrescue, declare, df, diff, diff3, dig, dir, dircolors, dirname, dirs, du, echo, egrep, eject, enable, env, ethtool, eval, exec, exit, expand, export, expr, false, fdformat, fdisk, fg, fgrep, file, find, fmt, fold, format, free, fsck, ftp, gawk, getopts, grep, groups, gzip, hash, head, history, hostname, id, ifconfig, import, install, join, kill, less, let, ln, local, locate, logname, logout, look, lpc, lpr, lprint, lprintd, lprintq, lprm, ls, lsof, make, man, mkdir, mkfifo, mkisofs, mknod, more, mount, mtools, mv, netstat, nice, nl, nohup, nslookup, open, op, passwd, paste, pathchk, ping, popd, pr, printcap, printenv, printf, ps, pushd, pwd, quota, quotacheck, quotactl, ram, rcp, read, readonly, renice, remsync, rm, rmdir, rsync, screen, scp, sdiff, sed, select, seq, set, sftp, shift, shopt, shutdown, sleep, sort, source, split, ssh, strace, su, sudo, sum, symlink, sync, tail, tar, tee, test, time, times, touch, top, traceroute, trap, tr, true, tsort, tty, type, ulimit, umask, umount, unalias, uname, unexpand, uniq, units, unset, unshar, useradd, usermod, users, uuencode, uudecode, v, vdir, vi, watch, wc, whereis, which, who, whoami, wget, xargs, yes',
                alias: 'kw1'
            }
        },
        
        this.patterns = {
            'poundComments': {
                pattern: this.common.poundComments,
                alias:   'co1'
            },
            'strings': {
                pattern: this.common.strings,
                alias:   'st0'
            }
        };
        
        this.parent(options);
    }
});
