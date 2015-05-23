/*
---
name: Special Line Highlighter
description: Highlights special lines

license: MIT-style X11 License

authors:
  - Andi Dittrich
  
requires:
  - Core/1.4.5

provides: [EnlighterJS.SpecialLineHighlighter]
...
*/
EJS.SpecialLineHighlighter = new Class({
		
	// storage of line numbers to highlight
	specialLines: {},
	
	/**
	 * @constructs
	 * @param {String} html attribute content "highlight" - scheme 4,5,6,10-12,19
	 */
	initialize : function(lineNumberString, lineOffsetString){
		// special lines given ?
		if (lineNumberString == null || lineNumberString.length == 0){
			return;
		}
		
		// line offset available ?
		var lineOffset = (lineOffsetString != null && lineOffsetString.toInt() > 1 ? lineOffsetString.toInt()-1 : 0);
		
		// split attribute string into segments
		var segments = lineNumberString.split(',');
				
		// iterate over segments
		segments.each(function(item, index){
			// pattern xxxx-yyyy
			var parts = item.match(/([0-9]+)-([0-9]+)/);
			
			// single line or line-range
			if (parts!=null){				
				// 2 items required
				var start = parts[1].toInt()-lineOffset;
				var stop = parts[2].toInt()-lineOffset;
				
				// valid range ?
				if (stop > start){
					// add lines to storage
					for (var i=start;i<=stop;i++){
						this.specialLines['l' + i] = true;
					}
				}
			}else{
				// add line to storage
				this.specialLines['l' + (item.toInt()-lineOffset)] = true;
			}
		}.bind(this));
	},
	
	/**
	 * Check if the given linenumber is a special line
	 * @param Integer lineNumber
	 * @returns {Boolean}
	 */
	isSpecialLine: function(lineNumber){
		return (this.specialLines['l' + lineNumber] || false);
	}
	
});
