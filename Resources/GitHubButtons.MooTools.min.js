
					
/*!
---
name: GitHub-Buttons for MooTools, jQuery and PHP
description: Unofficial GitHub Buttons based on https://github.com/mdo/github-buttons

license: Apache 2.0 License
version: 2.5.0
build: 54ff1b657e537f8107ee7373e0bfeeeb/May 6 2015

authors:
  - Andi Dittrich (author of MooTools/jQuery/PHP based versions)
  - Mark Otto (author of original github-buttons styles)
  
download: https://github.com/AndiDittrich/MooTools.GitHub-Buttons
website: http://github-buttons.andidittrich.de
demo: http://github-buttons.andidittrich.de
  
requires:
  - Core/1.4.5
  - More/Number.Format
  - More/Request.JSONP

provides: [GitHubButton]
...
*/
;
var GitHubButton=new Class({Implements:Options,buttonContainer:null,options:{large:false,owner:null,repo:null,type:"star",text:null,count:true,cache:true,cacheLifetime:7200,errorText:"NA"},initialize:function(l){this.setOptions(l);var a="https://api.github.com";var c="https://github.com/"+this.options.owner+"/"+this.options.repo+"/";var b="https://github.com/"+this.options.owner+"/";var j="-";var k="";
switch(this.options.type){case"star":a+="/repos/"+this.options.owner+"/"+this.options.repo;j="Star";b=c+"stargazers";k="stargazers_count";break;case"fork":a+="/repos/"+this.options.owner+"/"+this.options.repo;j="Fork";b=c+"network";k="forks_count";break;case"watch":a+="/repos/"+this.options.owner+"/"+this.options.repo;b+=this.options.repo+"/watchers";j="Watchers";k="subscribers_count";break;case"follow":a+="/users/"+this.options.owner;
j="Follow @"+this.options.owner;c=b;b+="followers";k="followers";break}this.buttonContainer=new Element("div",{"class":"github-btn "+(this.options.large?"github-btn-large":"")});var g=new Element("a",{"class":"gh-count",href:b,target:"_blank"});var f=new Element("span",{"class":"gh-ico"});var d=new Element("span",{"class":"gh-text",text:(this.options.text?this.options.text:j)});var e=new Element("a",{"class":"gh-btn",href:c,target:"_blank"});
e.grab(f).grab(d);this.buttonContainer.grab(e).grab(g);if(typeof this.options.count=="boolean"){if(this.options.count){var h="GHB_"+this.options.type+"_"+this.options.owner+"_"+this.options.repo+"_"+k;if(this.options.cache===true){var i=this.retrieveItem(h,this.options.cacheLifetime);if(i){g.set("text",i.format({group:"."}));return}}new Request.JSONP({url:a,callbackKey:"callback",onComplete:function(m){if(m.data&&m.data[k]){var n=m.data[k];
g.set("text",n.format({group:"."}));if(this.options.cache===true){this.storeItem(h,n)}}else{g.set("text",this.options.errorText)}}.bind(this)}).send()}else{g.setStyle("display","none")}}else{g.set("text",this.options.count.format({group:"."}))}},toElement:function(){return this.buttonContainer},storeItem:function(a,b){var c=JSON.encode({time:(new Date().getTime()),payload:b});if(typeof(Storage)!=="undefined"){localStorage.setItem(a,c)
}},retrieveItem:function(b,c){if(typeof(Storage)!=="undefined"){var a=localStorage.getItem(b);if(!a){return null}a=JSON.decode(a);if(!a.time||(a.time+(c*1000))<(new Date().getTime())){return null}return(a.payload?a.payload:null)}else{return null}}});(function(){Element.implement({GitHubButton:function(a){this.grab(new GitHubButton(a))}})})();