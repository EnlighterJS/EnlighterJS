
					
/*!
---
name: GitHub-Buttons
description: Unofficial GitHub Buttons based on https://github.com/mdo/github-buttons

license: Apache 2.0 License
version: 2.0
build: d93879285606e9092dfd67706e97582b/June 1 2014

authors:
  - Andi Dittrich (author of MooTools based Fork)
  - Mark Otto (author of original github-buttons)
  
download: https://github.com/AndiDittrich/MooTools.GitHub-Buttons
website: http://github-buttons.andidittrich.de
demo: http://github-buttons.andidittrich.de
  
requires:
  - Core/1.4.5
  - More/Number.Format
  - More/Request.JSONP

provides: [GitHubButtons]
...
*/
;
var GitHubButton=new Class({Implements:Options,buttonContainer:null,options:{large:false,owner:null,repo:null,type:"star",text:null},initialize:function(i){this.setOptions(i);var a="https://api.github.com";var c="https://github.com/"+this.options.owner+"/"+this.options.repo+"/";var b="https://github.com/"+this.options.owner+"/";var h="-";switch(this.options.type){case"star":a+="/repos/"+this.options.owner+"/"+this.options.repo+"/stargazers";
h="Star";b=c+"stargazers";break;case"fork":a+="/repos/"+this.options.owner+"/"+this.options.repo+"/forks";h="Fork";b=c+"network";break;case"watch":a+="/repos/"+this.options.owner+"/"+this.options.repo+"/subscribers";b+=this.options.repo+"/watchers";h="Watchers";break;case"follow":a+="/users/"+this.options.owner+"/followers";h="Follow @"+this.options.owner;c=b;b+="followers";break}this.buttonContainer=new Element("div",{"class":"github-btn "+(this.options.large?"github-btn-large":"")});
var g=new Element("a",{"class":"gh-count",href:b,target:"_blank"});var f=new Element("span",{"class":"gh-ico"});var d=new Element("span",{"class":"gh-text",text:(this.options.text?this.options.text:h)});var e=new Element("a",{"class":"gh-btn",href:c,target:"_blank"});e.grab(f).grab(d);this.buttonContainer.grab(e).grab(g);new Request.JSONP({url:a,callbackKey:"callback",onComplete:function(j){g.set("text",j.data.length.format({group:"."}))
}.bind(this)}).send()},toElement:function(){return this.buttonContainer}});