/*
---
description: PHP language fuel.

license: MIT-style

authors:
  - Jose Prado

requires:
  - Core/1.3
  - Fuel

provides: [Fuel.php]
...
*/
Fuel.php = new Class({
    
    Extends: Fuel,
    language: 'php',
    
    initialize: function(options)
    {
        this.keywords = {
            keywords: {
                csv: "abstract, and, as, break, case, catch, cfunction, class, clone, const, continue, declare, default, do, else, elseif, enddeclare, endfor, endforeach, endif, endswitch, endwhile, extends, final, for, foreach, function, global, goto, if, implements, interface, instanceof, namespace, new, old_function, or, private, protected, public, static, switch, throw, try, use, var, while, xor",
                alias: 'kw1'
            },
            langConstants: {
                csv: "__CLASS__, __DIR__, __FILE__, __FUNCTION__, __METHOD__, __NAMESPACE__, DEFAULT_INCLUDE_PATH, E_ALL, E_COMPILE_ERROR, E_COMPILE_WARNING, E_CORE_ERROR, E_CORE_WARNING, E_ERROR, E_NOTICE, E_PARSE, E_STRICT, E_USER_ERROR, E_USER_NOTICE, E_USER_WARNING, E_WARNING, PEAR_EXTENSION_DIR, PEAR_INSTALL_DIR, PHP_BINDIR, PHP_CONFIG_FILE_PATH, PHP_DATADIR, PHP_EXTENSION_DIR, PHP_LIBDIR, PHP_LOCALSTATEDIR, PHP_OS, PHP_OUTPUT_HANDLER_CONT, PHP_OUTPUT_HANDLER_END, PHP_OUTPUT_HANDLER_START, PHP_SYSCONFDIR, PHP_VERSION",
                alias: 'kw1'
            },
            constructs: {
                csv: "array, die, echo, empty, exit, eval, include, include_once, isset, list, require, require_once, return, print, unset",
                alias: 'kw1'
            },
            commonFuncs: {
                csv: "abs, addcslashes, addslashes, aggregate, apache_child_terminate, apache_get_version, apache_lookup_uri, apache_note, apache_request_headers, apache_response_headers, apache_setenv, array_change_key_case, array_chunk, array_count_values, array_diff, array_diff_assoc, array_fill, array_filter, array_flip, array_intersect, array_intersect_assoc, array_key_exists, array_keys, array_map, array_merge, array_merge_recursive, array_multisort, array_pad, array_pop, array_push, array_rand, array_reduce, array_reverse, array_search, array_shift, array_slice, array_splice, array_sum, array_unique, array_unshift, array_values, array_walk, arsort, asort, assert, assert_options, base64_decode, base64_encode, base_convert, basename, bin2hex, bindec, ceil, chdir, checkdate, chop, chown, chunk_split, clearstatcache, closedir, compact, connection_aborted, connection_status, constant, copy, count, count_chars, crc32, crypt, ctype_alnum, ctype_alpha, ctype_cntrl, ctype_digit, ctype_graph, ctype_lower, ctype_print, ctype_punct, ctype_space, ctype_upper, ctype_xdigit, current, date, debug_backtrace, debug_zval_dump, decbin, dechex, decoct, define, defined, dir, dirname, dl, doubleval, each, end, ereg, ereg_replace, eregi, eregi_replace, error_log, error_reporting, escapeshellarg, escapeshellcmd, exec, explode, extension_loaded, extract, fclose, feof, fflush, fgetc, fgetcsv, fgets, fgetss, file, file_exists, file_get_contents, fileatime, filectime, filegroup, fileinode, filemtime, fileowner, fileperms, filesize, filetype, floatval, flock, floor, flush, fmod, fnmatch, fopen, fpassthru, fputs, fread, fscanf, fseek, fsockopen, fstat, ftell, ftok, ftruncate, func_get_arg, func_get_args, func_num_args, fwrite, get_browser, get_cfg_var, get_declared_classes, get_extension_funcs, get_include_path, get_loaded_extensions, get_magic_quotes_gpc, get_magic_quotes_runtime, get_meta_tags, getallheaders, getcwd, getdate, getenv, getimagesize, getopt, getrandmax, getrusage, gettimeofday, gettype, glob, global, gmdate, gmmktime, gmstrftime, header, headers_sent, hebrev, hebrevc, hexdec, highlight_file, highlight_string, html_entity_decode, htmlentities, htmlspecialchars, ignore_user_abort, image_type_to_mime_type, implode, import_request_variables, in_array, ini_alter, ini_get, ini_get_all, ini_restore, ini_set, intval, ip2long, is_array, is_bool, is_dir, is_double, is_executable, is_file, is_finite, is_float, is_infinite, is_int, is_integer, is_link, is_long, is_nan, is_null, is_numeric, is_object, is_readable, is_real, is_resource, is_scalar, is_string, is_uploaded_file, is_writable, is_writeable, join, key, key_exists, krsort, ksort, link, linkinfo, localeconv, localtime, long2ip, lstat, ltrim, magic_quotes_runtime, mail, max, md5, md5_file, memory_get_usage, microtime, min, mkdir, mktime, move_uploaded_file, mt_getrandmax, mt_rand, mt_srand, natcasesort, natsort, next, nl2br, number_format, ob_clean, ob_end_clean, ob_end_flush, ob_flush, ob_get_clean, ob_get_contents, ob_get_flush, ob_get_length, ob_get_level, ob_get_status, ob_implicit_flush, ob_list_handlers, ob_start, octdec, opendir, overload, pack, parse_ini_file, parse_str, parse_url, passthru, pathinfo, pclose, pfsockopen, pg_affected_rows, pg_cancel_query, pg_client_encoding, pg_close, pg_cmdtuples, pg_connect, pg_connection_busy, pg_connection_reset, pg_connection_status, pg_convert, pg_copy_from, pg_copy_to, pg_dbname, pg_delete, pg_end_copy, pg_errormessage, pg_escape_bytea, pg_escape_string, pg_exec, pg_fetch_all, pg_fetch_array, pg_fetch_assoc, pg_fetch_object, pg_fetch_result, pg_fetch_row, pg_field_is_null, pg_field_name, pg_field_num, pg_field_prtlen, pg_field_size, pg_field_type, pg_fieldisnull, pg_fieldname, pg_fieldnum, pg_fieldprtlen, pg_fieldsize, pg_fieldtype, pg_free_result, pg_freeresult, pg_get_notify, pg_get_pid, pg_get_result, pg_getlastoid, pg_host, pg_insert, pg_last_error, pg_last_notice, pg_last_oid, pg_lo_close, pg_lo_create, pg_lo_export, pg_lo_import, pg_lo_open, pg_lo_read, pg_lo_read_all, pg_lo_seek, pg_lo_tell, pg_lo_unlink, pg_lo_write, pg_loclose, pg_locreate, pg_loexport, pg_loimport, pg_loopen, pg_loread, pg_loreadall, pg_lounlink, pg_lowrite, pg_meta_data, pg_num_fields, pg_num_rows, pg_numfields, pg_numrows, pg_options, pg_pconnect, pg_ping, pg_port, pg_put_line, pg_query, pg_result, pg_result_error, pg_result_seek, pg_result_status, pg_select, pg_send_query, pg_set_client_encoding, pg_trace, pg_tty, pg_unescape_bytea, pg_untrace, pg_update, phpcredits, phpinfo, phpversion, popen, pos, preg_grep, preg_match, preg_match_all, preg_quote, preg_replace, preg_replace_callback, preg_split, prev, print_r, printf, proc_close, proc_open, putenv, quoted_printable_decode, quotemeta, rand, range, rawurldecode, rawurlencode, readdir, readfile, readlink, realpath, rename, reset, restore_error_handler, restore_include_path, rewind, rewinddir, rmdir, round, rsort, rtrim, serialize, session_cache_expire, session_cache_limiter, session_decode, session_destroy, session_encode, session_get_cookie_params, session_id, session_is_registered, session_module_name, session_name, session_regenerate_id, session_register, session_save_path, session_set_cookie_params, session_set_save_handler, session_start, session_unregister, session_unset, session_write_close, set_error_handler, set_file_buffer, set_include_path, set_magic_quotes_runtime, set_socket_blocking, set_time_limit, setcookie, setlocale, settype, shell_exec, show_source, shuffle, similar_text, sizeof, sleep, socket_get_status, socket_set_blocking, socket_set_timeout, sort, split, spliti, sprintf, sql_regcase, srand, sscanf, stat, static, str_pad, str_repeat, str_replace, str_rot13, str_shuffle, str_word_count, strcasecmp, strchr, strcmp, strcoll, strcspn, stream_context_create, stream_context_get_options, stream_context_set_option, stream_context_set_params, stream_filter_append, stream_filter_prepend, stream_get_meta_data, stream_register_wrapper, stream_select, stream_set_blocking, stream_set_timeout, stream_set_write_buffer, stream_wrapper_register, strftime, strip_tags, stripcslashes, stripslashes, stristr, strlen, strnatcasecmp, strnatcmp, strncasecmp, strncmp, strpos, strrchr, strrev, strrpos, strspn, strstr, strtok, strtolower, strtotime, strtoupper, strtr, strval, substr, substr_count, substr_replace, system, tempnam, time, tmpfile, touch, trigger_error, trim, uasort, ucfirst, ucwords, uksort, umask, uniqid, unlink, unpack, unserialize, urldecode, urlencode, user_error, usleep, usort, var_dump, var_export, version_compare, virtual, vprintf, vsprintf, wordwrap",
                alias: 'kw2'
            },
            database: {
                csv: "mysql, mysql_affected_rows, mysql_client_encoding, mysql_close, mysql_connect, mysql_create_db, mysql_createdb, mysql_data_seek, mysql_db_name, mysql_db_query, mysql_dbname, mysql_drop_db, mysql_dropdb, mysql_errno, mysql_error, mysql_escape_string, mysql_fetch_array, mysql_fetch_assoc, mysql_fetch_field, mysql_fetch_lengths, mysql_fetch_object, mysql_fetch_row, mysql_field_flags, mysql_field_len, mysql_field_name, mysql_field_seek, mysql_field_table, mysql_field_type, mysql_fieldflags, mysql_fieldlen, mysql_fieldname, mysql_fieldtable, mysql_fieldtype, mysql_free_result, mysql_freeresult, mysql_get_client_info, mysql_get_host_info, mysql_get_proto_info, mysql_get_server_info, mysql_info, mysql_insert_id, mysql_list_dbs, mysql_list_fields, mysql_list_processes, mysql_list_tables, mysql_listdbs, mysql_listfields, mysql_listtables, mysql_num_fields, mysql_num_rows, mysql_numfields, mysql_numrows, mysql_pconnect, mysql_query, mysql_real_escape_string, mysql_result, mysql_select_db, mysql_selectdb, mysql_stat, mysql_table_name, mysql_tablename, mysql_thread_id, mysql_unbuffered_query, mysqli, mysqli_affected_rows, mysqli_autocommit, mysqli_bind_param, mysqli_bind_result, mysqli_change_user, mysqli_character_set_name, mysqli_client_encoding, mysqli_close, mysqli_commit, mysqli_connect, mysqli_data_seek, mysqli_debug, mysqli_disable_reads_from_master, mysqli_disable_rpl_parse, mysqli_dump_debug_info, mysqli_enable_reads_from_master, mysqli_enable_rpl_parse, mysqli_errno, mysqli_error, mysqli_escape_string, mysqli_execute, mysqli_fetch, mysqli_fetch_array, mysqli_fetch_assoc, mysqli_fetch_field, mysqli_fetch_field_direct, mysqli_fetch_fields, mysqli_fetch_lengths, mysqli_fetch_object, mysqli_fetch_row, mysqli_field_count, mysqli_field_seek, mysqli_field_tell, mysqli_free_result, mysqli_get_client_info, mysqli_get_host_info, mysqli_get_proto_info, mysqli_get_server_info, mysqli_get_server_version, mysqli_info, mysqli_init, mysqli_insert_id, mysqli_kill, mysqli_master_query, mysqli_num_fields, mysqli_num_rows, mysqli_options, mysqli_param_count, mysqli_ping, mysqli_prepare, mysqli_prepare_result, mysqli_profiler, mysqli_query, mysqli_read_query_result, mysqli_real_connect, mysqli_real_escape_string, mysqli_real_query, mysqli_reload, mysqli_rollback, mysqli_rpl_parse_enabled, mysqli_rpl_probe, mysqli_rpl_query_type, mysqli_select_db, mysqli_send_long_data, mysqli_send_query, mysqli_set_opt, mysqli_slave_query, mysqli_ssl_set, mysqli_stat, mysqli_stmt_affected_rows, mysqli_stmt_close, mysqli_stmt_errno, mysqli_stmt_error, mysqli_stmt_store_result, mysqli_store_result, mysqli_thread_id, mysqli_thread_safe, mysqli_use_result, mysqli_warning_count",
                alias: 'kw2'
            }
        };
        
        this.patterns = {
            'slashComments': { pattern: this.common.slashComments, alias: 'co1' },
            'multiComments': { pattern: this.common.multiComments, alias: 'co2' },
            'strings':       { pattern: this.common.strings,       alias: 'st0' },
            'heredocs':      { pattern: /(<<<\s*?(\'?)([A-Z0-9]+)\2[^\n]*?\n[\s\S]*?\n\3(?![A-Z0-9\s]))/gim, alias: 'st1' },
            'numbers':       { pattern: /\b((([0-9]+)?\.)?[0-9_]+([e][\-+]?[0-9]+)?|0x[A-F0-9]+)\b/gi,       alias: 'nu0' },
            'variables':     { pattern: /[\$]{1,2}[A-Z_][\w]*/gim, alias: 'kw3' },
            'functions':     { pattern: this.common.functionCalls, alias: 'me1' },
            'constants':     { pattern: /\b[A-Za-z_][\w]*\b/g,     alias: 'kw4' },
            'methods':       { pattern: /->([\w]+)/gim,            alias: 'kw3' },
            'brackets':      { pattern: this.common.brackets,      alias: 'br0' }
            //'symbols':     { pattern: /!|@|%|&|\||\/|<|>|=|-|\+|\*|\.|:|,|;/g, alias: 'sy0' }
        };
        
        // Delimiters
        this.delimiters = {
            start: this.strictRegExp('<?php', '<?=', '<%'),
            end:   this.strictRegExp('?>', '%>')
        };
        
        this.parent(options);
    }
});
