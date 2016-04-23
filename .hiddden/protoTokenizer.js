
 var rules = language.getRules();

 var currentIndex = 0;

 // apply regex rules as long as the text-end is reached
 while (currentIndex < code.length){

 var currentMatch = null;
 var currentAlias = null;

 // apply each rule to given sourcecode string
 for (var i=0;i<rules.length;i++){
 var rule = rules[i];

 // overrides the usual regex behaviour of using string offset to continue
 rule.pattern.lastIndex = currentIndex;

 // try to match the rule
 var match = rule.pattern.exec(code);

 // match found ?
 if (match){

 // first matched pattern ?
 if (currentMatch == null){
 currentMatch = match;
 currentAlias = rule.alias;

 // otherwise compare start indexes
 }else{
 if (match.index < currentMatch.index){
 currentMatch = match;
 currentAlias = rule.alias;
 }
 }

 }
 }

 // match found ?
 if (currentMatch != null){
 // create filling text token
 tokens.push(token(code.substring(currentIndex, currentMatch.index), '', currentIndex));

 // create token
 tokens.push(token(currentMatch[0], currentAlias, currentMatch.index));

 // store next index
 currentIndex = currentMatch.index + currentMatch[0].length;

 // eset current match
 currentMatch = null;
 currentAlias = null;
 }else{
 // no match found ? -> final text fragment
 tokens.push(token(code.substring(currentIndex), '', currentIndex));

 // stop further processing
 break;
 }
 }

