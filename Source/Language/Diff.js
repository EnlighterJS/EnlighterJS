/*
---
description: DIFF Highlighting

license: MIT-style

authors:
  - Andi Dittrich

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.diff]
...
*/
EJS.Language.diff = new Class({
	Extends : EJS.Language.generic,

	setupLanguage: function(){
		this.keywords = {
		};

		this.patterns = {
			
			'comments' : {
				pattern : /^((---|\+\+\+) .*)/gm,
				alias : 'co1'
			},
			
			'stats' : {
				pattern : /^(@@.*@@\s*)/gm,
				alias : 'nu0'
			},
			
			'add' : {
				pattern : /^(\+.*)/gm,
				alias : 're0'
			},
			
			'del'  : {
				pattern : /^(-.*)/gm,
				alias : 'st0'
			}
		};
	}
});
