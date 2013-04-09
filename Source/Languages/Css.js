/*
---
description: CSS language fuel.

license: MIT-style

authors:
  - Jose Prado

requires:
  - Core/1.3
  - Fuel

provides: [Fuel.css]
...
*/
Fuel.css = new Class({
    
    Extends: Fuel,
    language: 'css',
        
    initialize: function(options) {
        
        this.keywords = {
            css1: {
                csv: "background-attachment, background-color, background-image, background-position, background-repeat, background, border-bottom, border-bottom-width, border-color, border-left, border-left-width, border-right, border-right-width, border-style, border-top, border-top-width, border-width, border, clear, color, display, float, font-family, font-size, font-style, font-variant, font-weight, font, height, letter-spacing, line-height, list-style-image, list-style-position, list-style-type, list-style, margin-bottom, margin-left, margin-right, margin-top, margin, padding-bottom, padding-left, padding-right, padding-top, padding, text-align, text-decoration, text-indent, text-transform, vertical-align, white-space, width, word-spacing",
                alias: 'kw1'
            },
            css2: {
                csv: "azimuth, border-bottom-color, border-bottom-style, border-collapse, border-left-color, border-left-style, border-right-color, border-right-style, border-spacing, border-top-color, border-top-style, bottom, caption-side, clip, content, counter-increment, counter-reset, cue, cue-after, cue-before, cursor, direction, elevation, empty-cells, left, max-height, max-width, min-height, min-width, orphans, outline, outline-color, outline-style, outline-width, overflow, page-break-after, page-break-before, page-break-inside, pause, pause-after, pause-before, pitch, pitch-range, play-during, position, quotes, richness, right, speak, speak-header, speak-numeral, speak-punctuation, speech-rate, stress, table-layout, top, unicode-bidi, visibility, voice-family, volume, widows, z-index",
                alias: 'kw1'
            },
            css3: {
                csv: "alignment-adjust, alignment-baseline, appearance, background-break, background-clip, background-origin, background-size, baseline-shift, binding, bookmark-label, bookmark-level, bookmark-target, border-bottom-left-radius, border-bottom-right-radius, border-break, border-image, border-length, border-radius, border-top-left-radius, border-top-right-radius, box-align, box-direction, box-flex, box-flex-group, box-lines, box-orient, box-pack, box-shadow, box-sizing, color-profile, column-break-after, column-break-before, column-count, column-fill, column-gap, column-rule, column-rule-color, column-rule-style, column-rule-width, column-span, column-width, columns, crop, display-model, display-role, dominant-baseline, drop-initial-after-adjust, drop-initial-after-align, drop-initial-before-adjust, drop-initial-before-align, drop-initial-size, drop-initial-value, fit, fit-position, float-offset, font-effect, font-emphasize, font-emphasize-position, font-emphasize-style, font-size-adjust, font-smooth, font-stretch, grid-columns, grid-rows, hanging-punctuation, hyphenate-after, hyphenate-before, hyphenate-character, hyphenate-lines, hyphenate-resource, hyphens, icon, image-orientation, image-resolution, inline-box-align, line-stacking, line-stacking-ruby, line-stacking-shift, line-stacking-strategy, mark, mark-after, mark-before, marker-offset, marks, marquee-direction, marquee-play-count, marquee-speed, marquee-style, move-to, nav-down, nav-index, nav-left, nav-right, nav-up, opacity, outline-offset, overflow-style, overflow-x, overflow-y, page, page-policy, phonemes, presentation-level, punctuation-trim, rendering-intent, resize, rest, rest-after, rest-before, rotation, rotation-point, ruby-align, ruby-overhang, ruby-position, ruby-span, size, string-set, tab-side, target, target-name, target-new, target-position, text-align-last, text-emphasis, text-height, text-justify, text-outline, text-replace, text-shadow, text-wrap, voice-balance, voice-duration, voice-pitch, voice-pitch-range, voice-rate, voice-stress, voice-volume, white-space-collapse, word-break, word-wrap",
                alias: 'kw2'
            },
            values: {
                csv: "100, 200, 300, 400, 500, 600, 700, 800, 900, above, absolute, always, aqua, armenian, auto, avoid, baseline, below, bidi-override, black, blink, block, blue, bold, bolder, both, bottom, break-all, break-strict, break-word, break, capitalize, caption, center, circle, cjk-ideographic, close-quote, collapse, compact, condensed, crop, cross, crosshair, dashed, decimal-leading-zero, decimal, default, disc, dotted, double, e-resize, embed, expanded, extra-condensed, extra-expanded, fixed, fuchsia, georgian, gray, green, groove, hand, hebrew, help, hidden, hide, higher, hiragana-iroha, hiragana, icon, inherit, inline-table, inline, inset, inside, invert, italic, justify, katakana-iroha, katakana, keep-all, konq-center, landscape, large, larger, left, level, light, lighter, lime, line-through, list-item, loose, loud, lower-alpha, lower-greek, lower-latin, lower-roman, lowercase, lower, ltr, marker, maroon, medium, menu, message-box, middle, mix, move, n-resize, narrower, navy, ne-resize, never, no-close-quote, no-open-quote, no-repeat, none, normal, nowrap, nw-resize, oblique, olive, open-quote, outset, outside, overline, pointer, portrait, pre-wrap, pre, purple, red, relative, repeat, repeat-x, repeat-y, ridge, right, rtl, run-in, s-resize, scroll, se-resize, semi-condensed, semi-expanded, separate, show, silver, small-caps, small-caption, smaller, small, solid, square, static-position, static, status-bar, sub, super, sw-resize, table-caption, table-cell, table-column-group, table-column, table-footer-group, table-header-group, table-row, table-row-group, table, teal, text-bottom, text-top, text, thick, thin, top, transparent, ultra-condensed, ultra-expanded, underline, upper-alpha, upper-latin, upper-roman, uppercase, visible, w-resize, wait, white, wider, x-large, x-small, xx-large, xx-small, yellow",
                alias: 'kw3'
            }
        };
        
        this.patterns = {
            'multiComments': { pattern: this.common.multiComments, alias: 'co1' },
            'strings':       { pattern: this.common.strings,       alias: 'st0' },
            'selectors':     { pattern: /([^\}\n]+)\{/gi,          alias: 'se0' },
            'uri':           { pattern: /url\s*\([^\)]*\)/gi,      alias: 'kw4' },
            'units':         { pattern: /\b(\d+[\.\d+]?\s*(px|pt|em|ex|cm|in|mm|pc|%)?)/gi, alias: 'nu0' },
            'hexColors':     { pattern: /(#[A-F0-9]{3}([A-F0-9]{3})?)\b/gi,                 alias: 'kw3' },
            'rgbColors':     { pattern: /(rgb\s*\(([1-2]?[0-9]{2}(\,\s*)?){3}\))/g,         alias: 'kw3' }
        };
        
        this.delimiters = {
            start: this.strictRegExp('<style type="text/css">'),
            end:   this.strictRegExp('</style>')
        };
        
        this.parent(options);
    }
});
