/*
 AngularJS v1.7.6
 (c) 2010-2018 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(t,l){'use strict';var c="BUTTON A INPUT TEXTAREA SELECT DETAILS SUMMARY".split(" "),m=function(a,e){if(-1!==e.indexOf(a[0].nodeName))return!0};l.module("ngAria",["ng"]).info({angularVersion:"1.7.6"}).provider("$aria",function(){function a(a,c,n,g){return function(d,f,b){if(!b.hasOwnProperty("ngAriaDisable")){var p=b.$normalize(c);!e[p]||m(f,n)||b[p]||d.$watch(b[a],function(b){b=g?!b:!!b;f.attr(c,b)})}}}var e={ariaHidden:!0,ariaChecked:!0,ariaReadonly:!0,ariaDisabled:!0,ariaRequired:!0,ariaInvalid:!0,
ariaValue:!0,tabindex:!0,bindKeydown:!0,bindRoleForClick:!0};this.config=function(a){e=l.extend(e,a)};this.$get=function(){return{config:function(a){return e[a]},$$watchExpr:a}}}).directive("ngShow",["$aria",function(a){return a.$$watchExpr("ngShow","aria-hidden",[],!0)}]).directive("ngHide",["$aria",function(a){return a.$$watchExpr("ngHide","aria-hidden",[],!1)}]).directive("ngValue",["$aria",function(a){return a.$$watchExpr("ngValue","aria-checked",c,!1)}]).directive("ngChecked",["$aria",function(a){return a.$$watchExpr("ngChecked",
"aria-checked",c,!1)}]).directive("ngReadonly",["$aria",function(a){return a.$$watchExpr("ngReadonly","aria-readonly",c,!1)}]).directive("ngRequired",["$aria",function(a){return a.$$watchExpr("ngRequired","aria-required",c,!1)}]).directive("ngModel",["$aria",function(a){function e(e,g,d,f){return a.config(g)&&!d.attr(e)&&(f||!m(d,c))&&("hidden"!==d.attr("type")||"INPUT"!==d[0].nodeName)}function k(a,e){return!e.attr("role")&&e.attr("type")===a&&!m(e,c)}function h(a,e){var d=a.type,f=a.role;return"checkbox"===
(d||f)||"menuitemcheckbox"===f?"checkbox":"radio"===(d||f)||"menuitemradio"===f?"radio":"range"===d||"progressbar"===f||"slider"===f?"range":""}return{restrict:"A",require:"ngModel",priority:200,compile:function(c,g){if(!g.hasOwnProperty("ngAriaDisable")){var d=h(g,c);return{post:function(f,b,c,g){function h(){return g.$modelValue}function m(a){b.attr("aria-checked",c.value==g.$viewValue)}function n(){b.attr("aria-checked",!g.$isEmpty(g.$viewValue))}var l=e("tabindex","tabindex",b,!1);switch(d){case "radio":case "checkbox":k(d,
b)&&b.attr("role",d);e("aria-checked","ariaChecked",b,!1)&&f.$watch(h,"radio"===d?m:n);l&&b.attr("tabindex",0);break;case "range":k(d,b)&&b.attr("role","slider");if(a.config("ariaValue")){var q=!b.attr("aria-valuemin")&&(c.hasOwnProperty("min")||c.hasOwnProperty("ngMin")),r=!b.attr("aria-valuemax")&&(c.hasOwnProperty("max")||c.hasOwnProperty("ngMax")),s=!b.attr("aria-valuenow");q&&c.$observe("min",function(a){b.attr("aria-valuemin",a)});r&&c.$observe("max",function(a){b.attr("aria-valuemax",a)});
s&&f.$watch(h,function(a){b.attr("aria-valuenow",a)})}l&&b.attr("tabindex",0)}!c.hasOwnProperty("ngRequired")&&g.$validators.required&&e("aria-required","ariaRequired",b,!1)&&c.$observe("required",function(){b.attr("aria-required",!!c.required)});e("aria-invalid","ariaInvalid",b,!0)&&f.$watch(function(){return g.$invalid},function(a){b.attr("aria-invalid",!!a)})}}}}}}]).directive("ngDisabled",["$aria",function(a){return a.$$watchExpr("ngDisabled","aria-disabled",c,!1)}]).directive("ngMessages",function(){return{restrict:"A",
require:"?ngMessages",link:function(a,c,k,h){k.hasOwnProperty("ngAriaDisable")||c.attr("aria-live")||c.attr("aria-live","assertive")}}}).directive("ngClick",["$aria","$parse",function(a,e){return{restrict:"A",compile:function(k,h){if(!h.hasOwnProperty("ngAriaDisable")){var l=e(h.ngClick);return function(e,d,f){if(!m(d,c)&&(a.config("bindRoleForClick")&&!d.attr("role")&&d.attr("role","button"),a.config("tabindex")&&!d.attr("tabindex")&&d.attr("tabindex",0),a.config("bindKeydown")&&!f.ngKeydown&&!f.ngKeypress&&
!f.ngKeyup))d.on("keydown",function(a){function d(){l(e,{$event:a})}var f=a.which||a.keyCode;if(13===f||32===f)-1!==c.indexOf(a.target.nodeName)||a.target.isContentEditable||a.preventDefault(),e.$apply(d)})}}}}}]).directive("ngDblclick",["$aria",function(a){return function(e,k,h){h.hasOwnProperty("ngAriaDisable")||!a.config("tabindex")||k.attr("tabindex")||m(k,c)||k.attr("tabindex",0)}}])})(window,window.angular);
//# sourceMappingURL=angular-aria.min.js.map
