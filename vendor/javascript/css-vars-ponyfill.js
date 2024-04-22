function _extends(){_extends=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e};return _extends.apply(this,arguments)}function getUrls(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};var r={mimeType:t.mimeType||null,onBeforeSend:t.onBeforeSend||Function.prototype,onSuccess:t.onSuccess||Function.prototype,onError:t.onError||Function.prototype,onComplete:t.onComplete||Function.prototype};var n=Array.isArray(e)?e:[e];var a=Array.apply(null,Array(n.length)).map((function(e){return null}));function isValidCss(e){var t=typeof e==="string";var r=t&&e.trim().charAt(0)==="<";return t&&!r}function onError(e,t){r.onError(e,n[t],t)}function onSuccess(e,t){var s=r.onSuccess(e,n[t],t);e=s===false?"":s||e;a[t]=e;a.indexOf(null)===-1&&r.onComplete(a)}var s=document.createElement("a");n.forEach((function(e,t){s.setAttribute("href",e);s.href=String(s.href);var n=Boolean(document.all&&!window.atob);var a=n&&s.host.split(":")[0]!==location.host.split(":")[0];if(a){var o=s.protocol===location.protocol;if(o){var i=new XDomainRequest;i.open("GET",e);i.timeout=0;i.onprogress=Function.prototype;i.ontimeout=Function.prototype;i.onload=function(){var e=i.responseText;isValidCss(e)?onSuccess(e,t):onError(i,t)};i.onerror=function(e){onError(i,t)};setTimeout((function(){i.send()}),0)}else{console.warn("Internet Explorer 9 Cross-Origin (CORS) requests must use the same protocol (".concat(e,")"));onError(null,t)}}else{var c=new XMLHttpRequest;c.open("GET",e);r.mimeType&&c.overrideMimeType&&c.overrideMimeType(r.mimeType);r.onBeforeSend(c,e,t);c.onreadystatechange=function(){if(c.readyState===4){var e=c.responseText;c.status<400&&isValidCss(e)||c.status===0&&isValidCss(e)?onSuccess(e,t):onError(c,t)}};c.send()}}))}
/**
 * Gets CSS data from <style> and <link> nodes (including @imports), then
 * returns data in order processed by DOM. Allows specifying nodes to
 * include/exclude and filtering CSS data using RegEx.
 *
 * @preserve
 * @param {object}   [options] The options object
 * @param {object}   [options.rootElement=document] Root element to traverse for
 *                   <link> and <style> nodes.
 * @param {string}   [options.include] CSS selector matching <link> and <style>
 *                   nodes to include
 * @param {string}   [options.exclude] CSS selector matching <link> and <style>
 *                   nodes to exclude
 * @param {object}   [options.filter] Regular expression used to filter node CSS
 *                   data. Each block of CSS data is tested against the filter,
 *                   and only matching data is included.
 * @param {boolean}  [options.skipDisabled=true] Determines if disabled
 *                   stylesheets will be skipped while collecting CSS data.
 * @param {boolean}  [options.useCSSOM=false] Determines if CSS data will be
 *                   collected from a stylesheet's runtime values instead of its
 *                   text content. This is required to get accurate CSS data
 *                   when a stylesheet has been modified using the deleteRule()
 *                   or insertRule() methods because these modifications will
 *                   not be reflected in the stylesheet's text content.
 * @param {function} [options.onBeforeSend] Callback before XHR is sent. Passes
 *                   1) the XHR object, 2) source node reference, and 3) the
 *                   source URL as arguments.
 * @param {function} [options.onSuccess] Callback on each CSS node read. Passes
 *                   1) CSS text, 2) source node reference, and 3) the source
 *                   URL as arguments.
 * @param {function} [options.onError] Callback on each error. Passes 1) the XHR
 *                   object for inspection, 2) soure node reference, and 3) the
 *                   source URL that failed (either a <link> href or an @import)
 *                   as arguments
 * @param {function} [options.onComplete] Callback after all nodes have been
 *                   processed. Passes 1) concatenated CSS text, 2) an array of
 *                   CSS text in DOM order, and 3) an array of nodes in DOM
 *                   order as arguments.
 *
 * @example
 *
 *   getCssData({
 *     rootElement : document,
 *     include     : 'style,link[rel="stylesheet"]',
 *     exclude     : '[href="skip.css"]',
 *     filter      : /red/,
 *     skipDisabled: true,
 *     useCSSOM    : false,
 *     onBeforeSend(xhr, node, url) {
 *       // ...
 *     }
 *     onSuccess(cssText, node, url) {
 *       // ...
 *     }
 *     onError(xhr, node, url) {
 *       // ...
 *     },
 *     onComplete(cssText, cssArray, nodeArray) {
 *       // ...
 *     }
 *   });
 */function getCssData(e){var t={cssComments:/\/\*[\s\S]+?\*\//g,cssImports:/(?:@import\s*)(?:url\(\s*)?(?:['"])([^'"]*)(?:['"])(?:\s*\))?(?:[^;]*;)/g};var r={rootElement:e.rootElement||document,include:e.include||'style,link[rel="stylesheet"]',exclude:e.exclude||null,filter:e.filter||null,skipDisabled:e.skipDisabled!==false,useCSSOM:e.useCSSOM||false,onBeforeSend:e.onBeforeSend||Function.prototype,onSuccess:e.onSuccess||Function.prototype,onError:e.onError||Function.prototype,onComplete:e.onComplete||Function.prototype};var n=Array.apply(null,r.rootElement.querySelectorAll(r.include)).filter((function(e){return!matchesSelector(e,r.exclude)}));var a=Array.apply(null,Array(n.length)).map((function(e){return null}));function handleComplete(){var e=a.indexOf(null)===-1;if(e){a.reduce((function(e,t,r){t===""&&e.push(r);return e}),[]).reverse().forEach((function(e){return[n,a].forEach((function(t){return t.splice(e,1)}))}));var t=a.join("");r.onComplete(t,a,n)}}function handleSuccess(e,t,n,s){var o=r.onSuccess(e,n,s);e=o!==void 0&&Boolean(o)===false?"":o||e;resolveImports(e,n,s,(function(e,s){if(a[t]===null){s.forEach((function(e){return r.onError(e.xhr,n,e.url)}));!r.filter||r.filter.test(e)?a[t]=e:a[t]="";handleComplete()}}))}function parseImportData(e,r){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:[];var a={};a.rules=(e.replace(t.cssComments,"").match(t.cssImports)||[]).filter((function(e){return n.indexOf(e)===-1}));a.urls=a.rules.map((function(e){return e.replace(t.cssImports,"$1")}));a.absoluteUrls=a.urls.map((function(e){return getFullUrl$1(e,r)}));a.absoluteRules=a.rules.map((function(e,t){var n=a.urls[t];var s=getFullUrl$1(a.absoluteUrls[t],r);return e.replace(n,s)}));return a}function resolveImports(e,t,n,a){var s=arguments.length>4&&arguments[4]!==void 0?arguments[4]:[];var o=arguments.length>5&&arguments[5]!==void 0?arguments[5]:[];var i=parseImportData(e,n,o);i.rules.length?getUrls(i.absoluteUrls,{onBeforeSend:function onBeforeSend(e,n,a){r.onBeforeSend(e,t,n)},onSuccess:function onSuccess(e,n,a){var s=r.onSuccess(e,t,n);e=s===false?"":s||e;var i=parseImportData(e,n,o);i.rules.forEach((function(t,r){e=e.replace(t,i.absoluteRules[r])}));return e},onError:function onError(r,c,l){s.push({xhr:r,url:c});o.push(i.rules[l]);resolveImports(e,t,n,a,s,o)},onComplete:function onComplete(r){r.forEach((function(t,r){e=e.replace(i.rules[r],t)}));resolveImports(e,t,n,a,s,o)}}):a(e,s)}n.length?n.forEach((function(e,t){var n=e.getAttribute("href");var s=e.getAttribute("rel");var o=e.nodeName.toLowerCase()==="link"&&n&&s&&s.toLowerCase().indexOf("stylesheet")!==-1;var i=r.skipDisabled!==false&&e.disabled;var c=e.nodeName.toLowerCase()==="style";if(o&&!i){var l=n.indexOf("data:text/css")!==-1;if(l){var u=decodeURIComponent(n.substring(n.indexOf(",")+1));r.useCSSOM&&(u=Array.apply(null,e.sheet.cssRules).map((function(e){return e.cssText})).join(""));handleSuccess(u,t,e,location.href)}else getUrls(n,{mimeType:"text/css",onBeforeSend:function onBeforeSend(t,n,a){r.onBeforeSend(t,e,n)},onSuccess:function onSuccess(r,a,s){var o=getFullUrl$1(n);handleSuccess(r,t,e,o)},onError:function onError(n,s,o){a[t]="";r.onError(n,e,s);handleComplete()}})}else if(c&&!i){var f=e.textContent;r.useCSSOM&&(f=Array.apply(null,e.sheet.cssRules).map((function(e){return e.cssText})).join(""));handleSuccess(f,t,e,location.href)}else{a[t]="";handleComplete()}})):r.onComplete("",[])}function getFullUrl$1(e,t){var r=document.implementation.createHTMLDocument("");var n=r.createElement("base");var a=r.createElement("a");r.head.appendChild(n);r.body.appendChild(a);n.href=t||document.baseURI||(document.querySelector("base")||{}).href||location.href;a.href=e;return a.href}function matchesSelector(e,t){var r=e.matches||e.matchesSelector||e.webkitMatchesSelector||e.mozMatchesSelector||e.msMatchesSelector||e.oMatchesSelector;return r.call(e,t)}var e=balanced;function balanced(e,t,r){e instanceof RegExp&&(e=maybeMatch(e,r));t instanceof RegExp&&(t=maybeMatch(t,r));var n=range(e,t,r);return n&&{start:n[0],end:n[1],pre:r.slice(0,n[0]),body:r.slice(n[0]+e.length,n[1]),post:r.slice(n[1]+t.length)}}function maybeMatch(e,t){var r=t.match(e);return r?r[0]:null}balanced.range=range;function range(e,t,r){var n,a,s,o,i;var c=r.indexOf(e);var l=r.indexOf(t,c+1);var u=c;if(c>=0&&l>0){if(e===t)return[c,l];n=[];s=r.length;while(u>=0&&!i){if(u==c){n.push(u);c=r.indexOf(e,u+1)}else if(n.length==1)i=[n.pop(),l];else{a=n.pop();if(a<s){s=a;o=l}l=r.indexOf(t,u+1)}u=c<l&&c>=0?c:l}n.length&&(i=[s,o])}return i}function parseCss(t){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};var n={preserveStatic:true,removeComments:false};var a=_extends({},n,r);var s=[];function error(e){throw new Error("CSS parse error: ".concat(e))}function match(e){var r=e.exec(t);if(r){t=t.slice(r[0].length);return r}}function open(){return match(/^{\s*/)}function close(){return match(/^}/)}function whitespace(){match(/^\s*/)}function comment(){whitespace();if(t[0]==="/"&&t[1]==="*"){var e=2;while(t[e]&&(t[e]!=="*"||t[e+1]!=="/"))e++;if(!t[e])return error("end of comment is missing");var r=t.slice(2,e);t=t.slice(e+2);return{type:"comment",comment:r}}}function comments(){var e=[];var t;while(t=comment())e.push(t);return a.removeComments?[]:e}function selector(){whitespace();while(t[0]==="}")error("extra closing bracket");var e=match(/^(("(?:\\"|[^"])*"|'(?:\\'|[^'])*'|[^{])+)/);if(e){var r=e[0].trim();var n;var a=/\/\*/.test(r);a&&(r=r.replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\/+/g,""));var s=/["']\w*,\w*["']/.test(r);s&&(r=r.replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g,(function(e){return e.replace(/,/g,"‌")})));var o=/,/.test(r);n=o?r.split(/\s*(?![^(]*\)),\s*/):[r];s&&(n=n.map((function(e){return e.replace(/\u200C/g,",")})));return n}}function declaration(){if(t[0]==="@")return at_rule();match(/^([;\s]*)+/);var e=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;var r=match(/^(\*?[-#/*\\\w.]+(\[[0-9a-z_-]+\])?)\s*/);if(r){r=r[0].trim();if(!match(/^:\s*/))return error("property missing ':'");var n=match(/^((?:\/\*.*?\*\/|'(?:\\'|.)*?'|"(?:\\"|.)*?"|\((\s*'(?:\\'|.)*?'|"(?:\\"|.)*?"|[^)]*?)\s*\)|[^};])+)/);var a={type:"declaration",property:r.replace(e,""),value:n?n[0].replace(e,"").trim():""};match(/^[;\s]*/);return a}}function declarations(){if(!open())return error("missing '{'");var e;var t=comments();while(e=declaration()){t.push(e);t=t.concat(comments())}return close()?t:error("missing '}'")}function keyframe(){whitespace();var e=[];var t;while(t=match(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/)){e.push(t[1]);match(/^,\s*/)}if(e.length)return{type:"keyframe",values:e,declarations:declarations()}}function at_keyframes(){var e=match(/^@([-\w]+)?keyframes\s*/);if(e){var t=e[1];e=match(/^([-\w]+)\s*/);if(!e)return error("@keyframes missing name");var r=e[1];if(!open())return error("@keyframes missing '{'");var n;var a=comments();while(n=keyframe()){a.push(n);a=a.concat(comments())}return close()?{type:"keyframes",name:r,vendor:t,keyframes:a}:error("@keyframes missing '}'")}}function at_page(){var e=match(/^@page */);if(e){var t=selector()||[];return{type:"page",selectors:t,declarations:declarations()}}}function at_page_margin_box(){var e=match(/@(top|bottom|left|right)-(left|center|right|top|middle|bottom)-?(corner)?\s*/);if(e){var t="".concat(e[1],"-").concat(e[2])+(e[3]?"-".concat(e[3]):"");return{type:"page-margin-box",name:t,declarations:declarations()}}}function at_fontface(){var e=match(/^@font-face\s*/);if(e)return{type:"font-face",declarations:declarations()}}function at_supports(){var e=match(/^@supports *([^{]+)/);if(e)return{type:"supports",supports:e[1].trim(),rules:rules()}}function at_host(){var e=match(/^@host\s*/);if(e)return{type:"host",rules:rules()}}function at_media(){var e=match(/^@media([^{]+)*/);if(e)return{type:"media",media:(e[1]||"").trim(),rules:rules()}}function at_custom_m(){var e=match(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/);if(e)return{type:"custom-media",name:e[1].trim(),media:e[2].trim()}}function at_document(){var e=match(/^@([-\w]+)?document *([^{]+)/);if(e)return{type:"document",document:e[2].trim(),vendor:e[1]?e[1].trim():null,rules:rules()}}function at_x(){var e=match(/^@(import|charset|namespace)\s*([^;]+);/);if(e)return{type:e[1],name:e[2].trim()}}function at_rule(){whitespace();if(t[0]==="@"){var e=at_x()||at_fontface()||at_media()||at_keyframes()||at_supports()||at_document()||at_custom_m()||at_host()||at_page()||at_page_margin_box();if(e&&!a.preserveStatic){var r=false;if(e.declarations)r=e.declarations.some((function(e){return/var\(/.test(e.value)}));else{var n=e.keyframes||e.rules||[];r=n.some((function(e){return(e.declarations||[]).some((function(e){return/var\(/.test(e.value)}))}))}return r?e:{}}return e}}function rule(){if(!a.preserveStatic){var r=e("{","}",t);if(r){var n=/:(?:root|host)(?![.:#(])/.test(r.pre)&&/--\S*\s*:/.test(r.body);var s=/var\(/.test(r.body);if(!n&&!s){t=t.slice(r.end+1);return{}}}}var o=selector()||[];var i=a.preserveStatic?declarations():declarations().filter((function(e){var t=o.some((function(e){return/:(?:root|host)(?![.:#(])/.test(e)}))&&/^--\S/.test(e.property);var r=/var\(/.test(e.value);return t||r}));o.length||error("selector missing");return{type:"rule",selectors:o,declarations:i}}function rules(e){if(!e&&!open())return error("missing '{'");var r;var n=comments();while(t.length&&(e||t[0]!=="}")&&(r=at_rule()||rule())){r.type&&n.push(r);n=n.concat(comments())}return e||close()?n:error("missing '}'")}return{type:"stylesheet",stylesheet:{rules:rules(true),errors:s}}}function parseVars(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};var r={parseHost:false,store:{},onWarning:function onWarning(){}};var n=_extends({},r,t);var a=new RegExp(":".concat(n.parseHost?"host":"root","$"));typeof e==="string"&&(e=parseCss(e,n));e.stylesheet.rules.forEach((function(e){e.type==="rule"&&e.selectors.some((function(e){return a.test(e)}))&&e.declarations.forEach((function(e,t){var r=e.property;var a=e.value;r&&r.indexOf("--")===0&&(n.store[r]=a)}))}));return n.store}function stringifyCss(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"";var r=arguments.length>2?arguments[2]:void 0;var n={charset:function charset(e){return"@charset "+e.name+";"},comment:function comment(e){return e.comment.indexOf("__CSSVARSPONYFILL")===0?"/*"+e.comment+"*/":""},"custom-media":function customMedia(e){return"@custom-media "+e.name+" "+e.media+";"},declaration:function declaration(e){return e.property+":"+e.value+";"},document:function document(e){return"@"+(e.vendor||"")+"document "+e.document+"{"+visit(e.rules)+"}"},"font-face":function fontFace(e){return"@font-face{"+visit(e.declarations)+"}"},host:function host(e){return"@host{"+visit(e.rules)+"}"},import:function _import(e){return"@import "+e.name+";"},keyframe:function keyframe(e){return e.values.join(",")+"{"+visit(e.declarations)+"}"},keyframes:function keyframes(e){return"@"+(e.vendor||"")+"keyframes "+e.name+"{"+visit(e.keyframes)+"}"},media:function media(e){return"@media "+e.media+"{"+visit(e.rules)+"}"},namespace:function namespace(e){return"@namespace "+e.name+";"},page:function page(e){return"@page "+(e.selectors.length?e.selectors.join(", "):"")+"{"+visit(e.declarations)+"}"},"page-margin-box":function pageMarginBox(e){return"@"+e.name+"{"+visit(e.declarations)+"}"},rule:function rule(e){var t=e.declarations;if(t.length)return e.selectors.join(",")+"{"+visit(t)+"}"},supports:function supports(e){return"@supports "+e.supports+"{"+visit(e.rules)+"}"}};function visit(e){var a="";for(var s=0;s<e.length;s++){var o=e[s];r&&r(o);var i=n[o.type](o);if(i){a+=i;i.length&&o.selectors&&(a+=t)}}return a}return visit(e.stylesheet.rules)}function walkCss(e,t){e.rules.forEach((function(r){r.rules?walkCss(r,t):r.keyframes?r.keyframes.forEach((function(e){e.type==="keyframe"&&t(e.declarations,r)})):r.declarations&&t(r.declarations,e)}))}var t="--";var r="var";function transformCss(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};var a={preserveStatic:true,preserveVars:false,variables:{},onWarning:function onWarning(){}};var s=_extends({},a,n);typeof e==="string"&&(e=parseCss(e,s));walkCss(e.stylesheet,(function(e,n){for(var a=0;a<e.length;a++){var o=e[a];var i=o.type;var c=o.property;var l=o.value;if(i==="declaration")if(s.preserveVars||!c||c.indexOf(t)!==0){if(l.indexOf(r+"(")!==-1){var u=resolveValue(l,s);if(u!==o.value){u=fixNestedCalc(u);if(s.preserveVars){e.splice(a,0,{type:i,property:c,value:u});a++}else o.value=u}}}else{e.splice(a,1);a--}}}));return stringifyCss(e)}function fixNestedCalc(e){var t=/calc\(([^)]+)\)/g;(e.match(t)||[]).forEach((function(t){var r="calc".concat(t.split("calc").join(""));e=e.replace(t,r)}));return e}function resolveValue(t){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};var n=arguments.length>2?arguments[2]:void 0;if(t.indexOf("var(")===-1)return t;var a=e("(",")",t);function resolveFunc(e){var t=e.split(",")[0].replace(/[\s\n\t]/g,"");var a=(e.match(/(?:\s*,\s*){1}(.*)?/)||[])[1];var s=Object.prototype.hasOwnProperty.call(r.variables,t)?String(r.variables[t]):void 0;var o=s||(a?String(a):void 0);var i=n||e;s||r.onWarning('variable "'.concat(t,'" is undefined'));return o&&o!=="undefined"&&o.length>0?resolveValue(o,r,i):"var(".concat(i,")")}if(a){if(a.pre.slice(-3)==="var"){var s=a.body.trim().length===0;if(s){r.onWarning("var() must contain a non-whitespace string");return t}return a.pre.slice(0,-3)+resolveFunc(a.body)+resolveValue(a.post,r)}return a.pre+"(".concat(resolveValue(a.body,r),")")+resolveValue(a.post,r)}t.indexOf("var(")!==-1&&r.onWarning('missing closing ")" in the value "'.concat(t,'"'));return t}var n=typeof window!=="undefined";var a=n&&window.CSS&&window.CSS.supports&&window.CSS.supports("(--a: 0)");var s={group:0,job:0};var o={rootElement:n?document:null,shadowDOM:false,include:"style,link[rel=stylesheet]",exclude:"",variables:{},onlyLegacy:true,preserveStatic:true,preserveVars:false,silent:false,updateDOM:true,updateURLs:true,watch:null,onBeforeSend:function onBeforeSend(){},onError:function onError(){},onWarning:function onWarning(){},onSuccess:function onSuccess(){},onComplete:function onComplete(){},onFinally:function onFinally(){}};var i={cssComments:/\/\*[\s\S]+?\*\//g,cssKeyframes:/@(?:-\w*-)?keyframes/,cssMediaQueries:/@media[^{]+\{([\s\S]+?})\s*}/g,cssUrls:/url\((?!['"]?(?:data|http|\/\/):)['"]?([^'")]*)['"]?\)/g,cssVarDeclRules:/(?::(?:root|host)(?![.:#(])[\s,]*[^{]*{\s*[^}]*})/g,cssVarDecls:/(?:[\s;]*)(-{2}\w[\w-]*)(?:\s*:\s*)([^;]*);/g,cssVarFunc:/var\(\s*--[\w-]/,cssVars:/(?:(?::(?:root|host)(?![.:#(])[\s,]*[^{]*{\s*[^;]*;*\s*)|(?:var\(\s*))(--[^:)]+)(?:\s*[:)])/};var c={dom:{},job:{},user:{}};var l=false;var u=null;var f=0;var d=null;var v=false;
/**
 * Fetches, parses, and transforms CSS custom properties from specified
 * <style> and <link> elements into static values, then appends a new <style>
 * element with static values to the DOM to provide CSS custom property
 * compatibility for legacy browsers. Also provides a single interface for
 * live updates of runtime values in both modern and legacy browsers.
 *
 * @preserve
 * @param {object}   [options] Options object
 * @param {object}   [options.rootElement=document] Root element to traverse for
 *                   <link> and <style> nodes
 * @param {boolean}  [options.shadowDOM=false] Determines if shadow DOM <link>
 *                   and <style> nodes will be processed.
 * @param {string}   [options.include="style,link[rel=stylesheet]"] CSS selector
 *                   matching <link re="stylesheet"> and <style> nodes to
 *                   process
 * @param {string}   [options.exclude] CSS selector matching <link
 *                   rel="stylehseet"> and <style> nodes to exclude from those
 *                   matches by options.include
 * @param {object}   [options.variables] A map of custom property name/value
 *                   pairs. Property names can omit or include the leading
 *                   double-hyphen (—), and values specified will override
 *                   previous values
 * @param {boolean}  [options.onlyLegacy=true] Determines if the ponyfill will
 *                   only generate legacy-compatible CSS in browsers that lack
 *                   native support (i.e., legacy browsers)
 * @param {boolean}  [options.preserveStatic=true] Determines if CSS
 *                   declarations that do not reference a custom property will
 *                   be preserved in the transformed CSS
 * @param {boolean}  [options.preserveVars=false] Determines if CSS custom
 *                   property declarations will be preserved in the transformed
 *                   CSS
 * @param {boolean}  [options.silent=false] Determines if warning and error
 *                   messages will be displayed on the console
 * @param {boolean}  [options.updateDOM=true] Determines if the ponyfill will
 *                   update the DOM after processing CSS custom properties
 * @param {boolean}  [options.updateURLs=true] Determines if relative url()
 *                   paths will be converted to absolute urls in external CSS
 * @param {boolean}  [options.watch=false] Determines if a MutationObserver will
 *                   be created that will execute the ponyfill when a <link> or
 *                   <style> DOM mutation is observed
 * @param {function} [options.onBeforeSend] Callback before XHR is sent. Passes
 *                   1) the XHR object, 2) source node reference, and 3) the
 *                   source URL as arguments
 * @param {function} [options.onError] Callback after a CSS parsing error has
 *                   occurred or an XHR request has failed. Passes 1) an error
 *                   message, and 2) source node reference, 3) xhr, and 4 url as
 *                   arguments.
 * @param {function} [options.onWarning] Callback after each CSS parsing warning
 *                   has occurred. Passes 1) a warning message as an argument.
 * @param {function} [options.onSuccess] Callback after CSS data has been
 *                   collected from each node and before CSS custom properties
 *                   have been transformed. Allows modifying the CSS data before
 *                   it is transformed by returning any string value (or false
 *                   to skip). Passes 1) CSS text, 2) source node reference, and
 *                   3) the source URL as arguments.
 * @param {function} [options.onComplete] Callback after all CSS has been
 *                   processed, legacy-compatible CSS has been generated, and
 *                   (optionally) the DOM has been updated. Passes 1) a CSS
 *                   string with CSS variable values resolved, 2) an array of
 *                   output <style> node references that have been appended to
 *                   the DOM, 3) an object containing all custom properies names
 *                   and values, and 4) the ponyfill execution time in
 *                   milliseconds.
 * @param {function} [options.onFinally] Callback in modern and legacy browsers
 *                   after the ponyfill has finished all tasks. Passes 1) a
 *                   boolean indicating if the last ponyfill call resulted in a
 *                   style change, 2) a boolean indicating if the current
 *                   browser provides native support for CSS custom properties,
 *                   and 3) the ponyfill execution time in milliseconds.
 * @example
 *
 *   cssVars({
 *     rootElement   : document,
 *     shadowDOM     : false,
 *     include       : 'style,link[rel="stylesheet"]',
 *     exclude       : '',
 *     variables     : {},
 *     onlyLegacy    : true,
 *     preserveStatic: true,
 *     preserveVars  : false,
 *     silent        : false,
 *     updateDOM     : true,
 *     updateURLs    : true,
 *     watch         : false,
 *     onBeforeSend(xhr, node, url) {},
 *     onError(message, node, xhr, url) {},
 *     onWarning(message) {},
 *     onSuccess(cssText, node, url) {},
 *     onComplete(cssText, styleNode, cssVariables, benchmark) {},
 *     onFinally(hasChanged, hasNativeSupport, benchmark)
 *   });
 */function cssVars(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};var t="cssVars(): ";var r=_extends({},o,e);function handleError(e,n,a,s){!r.silent&&window.console&&console.error("".concat(t).concat(e,"\n"),n);r.onError(e,n,a,s)}function handleWarning(e){!r.silent&&window.console&&console.warn("".concat(t).concat(e));r.onWarning(e)}function handleFinally(e){r.onFinally(Boolean(e),a,getTimeStamp()-r.__benchmark)}if(n)if(r.watch){r.watch=o.watch;addMutationObserver(r);cssVars(r)}else{if(r.watch===false&&u){u.disconnect();u=null}if(!r.__benchmark){if(l===r.rootElement){cssVarsDebounced(e);return}var d=[].slice.call(r.rootElement.querySelectorAll('[data-cssvars]:not([data-cssvars="out"])'));r.__benchmark=getTimeStamp();r.exclude=[u?'[data-cssvars]:not([data-cssvars=""])':'[data-cssvars="out"]',"link[disabled]:not([data-cssvars])",r.exclude].filter((function(e){return e})).join(",");r.variables=fixVarNames(r.variables);d.forEach((function(e){var t=e.nodeName.toLowerCase()==="style"&&e.__cssVars.text;var r=t&&e.textContent!==e.__cssVars.text;if(t&&r){e.sheet&&(e.sheet.disabled=false);e.setAttribute("data-cssvars","")}}));if(!u){var m=[].slice.call(r.rootElement.querySelectorAll('[data-cssvars="out"]'));m.forEach((function(e){var t=e.getAttribute("data-cssvars-group");var n=t?r.rootElement.querySelector('[data-cssvars="src"][data-cssvars-group="'.concat(t,'"]')):null;n||e.parentNode.removeChild(e)}));if(f&&d.length<f){f=d.length;c.dom={}}}}if(document.readyState!=="loading")if(a&&r.onlyLegacy){var p=false;if(r.updateDOM){var h=r.rootElement.host||(r.rootElement===document?document.documentElement:r.rootElement);Object.keys(r.variables).forEach((function(e){var t=r.variables[e];p=p||t!==getComputedStyle(h).getPropertyValue(e);h.style.setProperty(e,t)}))}handleFinally(p)}else if(!v&&(r.shadowDOM||r.rootElement.shadowRoot||r.rootElement.host))getCssData({rootElement:o.rootElement,include:o.include,exclude:r.exclude,skipDisabled:false,onSuccess:function onSuccess(e,t,r){var n=(t.sheet||{}).disabled&&!t.__cssVars;if(n)return false;e=e.replace(i.cssComments,"").replace(i.cssMediaQueries,"");e=(e.match(i.cssVarDeclRules)||[]).join("");return e||false},onComplete:function onComplete(e,t,n){parseVars(e,{store:c.dom,onWarning:handleWarning});v=true;cssVars(r)}});else{l=r.rootElement;getCssData({rootElement:r.rootElement,include:r.include,exclude:r.exclude,skipDisabled:false,onBeforeSend:r.onBeforeSend,onError:function onError(e,t,r){var n=e.responseURL||getFullUrl(r,location.href);var a=e.statusText?"(".concat(e.statusText,")"):"Unspecified Error"+(e.status===0?" (possibly CORS related)":"");var s="CSS XHR Error: ".concat(n," ").concat(e.status," ").concat(a);handleError(s,t,e,n)},onSuccess:function onSuccess(e,t,n){var a=(t.sheet||{}).disabled&&!t.__cssVars;if(a)return false;var s=t.nodeName.toLowerCase()==="link";var o=t.nodeName.toLowerCase()==="style"&&e!==t.textContent;var i=r.onSuccess(e,t,n);e=i!==void 0&&Boolean(i)===false?"":i||e;r.updateURLs&&(s||o)&&(e=fixRelativeCssUrls(e,n));return e},onComplete:function onComplete(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:[];var a=_extends({},c.dom,c.user);var o=false;c.job={};n.forEach((function(e,n){var a=t[n];e.__cssVars=e.__cssVars||{};e.__cssVars.text=a;if(i.cssVars.test(a))try{var s=parseCss(a,{preserveStatic:r.preserveStatic,removeComments:true});parseVars(s,{parseHost:Boolean(r.rootElement.host),store:c.dom,onWarning:handleWarning});e.__cssVars.tree=s}catch(t){handleError(t.message,e)}}));_extends(c.job,c.dom);if(r.updateDOM){_extends(c.user,r.variables);_extends(c.job,c.user)}else{_extends(c.job,c.user,r.variables);_extends(a,r.variables)}o=s.job>0&&Boolean(Object.keys(c.job).length>Object.keys(a).length||Boolean(Object.keys(a).length&&Object.keys(c.job).some((function(e){return c.job[e]!==a[e]}))));if(o){resetCssNodes(r.rootElement);cssVars(r)}else{var u=[];var d=[];var v=false;r.updateDOM&&s.job++;n.forEach((function(e,n){var a=!e.__cssVars.tree;if(e.__cssVars.tree)try{transformCss(e.__cssVars.tree,_extends({},r,{variables:c.job,onWarning:handleWarning}));var o=stringifyCss(e.__cssVars.tree);if(r.updateDOM){var l=t[n];var f=i.cssVarFunc.test(l);e.getAttribute("data-cssvars")||e.setAttribute("data-cssvars","src");if(o.length&&f){var m=e.getAttribute("data-cssvars-group")||++s.group;var p=o.replace(/\s/g,"");var h=r.rootElement.querySelector('[data-cssvars="out"][data-cssvars-group="'.concat(m,'"]'))||document.createElement("style");v=v||i.cssKeyframes.test(o);r.preserveStatic&&e.sheet&&(e.sheet.disabled=true);h.hasAttribute("data-cssvars")||h.setAttribute("data-cssvars","out");if(p===e.textContent.replace(/\s/g,"")){a=true;if(h&&h.parentNode){e.removeAttribute("data-cssvars-group");h.parentNode.removeChild(h)}}else if(p!==h.textContent.replace(/\s/g,"")){[e,h].forEach((function(e){e.setAttribute("data-cssvars-job",s.job);e.setAttribute("data-cssvars-group",m)}));h.textContent=o;u.push(o);d.push(h);h.parentNode||e.parentNode.insertBefore(h,e.nextSibling)}}}else e.textContent.replace(/\s/g,"")!==o&&u.push(o)}catch(t){handleError(t.message,e)}a&&e.setAttribute("data-cssvars","skip");e.hasAttribute("data-cssvars-job")||e.setAttribute("data-cssvars-job",s.job)}));f=r.rootElement.querySelectorAll('[data-cssvars]:not([data-cssvars="out"])').length;if(r.shadowDOM){var m=[].concat(r.rootElement).concat([].slice.call(r.rootElement.querySelectorAll("*")));for(var p,h=0;p=m[h];++h)if(p.shadowRoot&&p.shadowRoot.querySelector("style")){var g=_extends({},r,{rootElement:p.shadowRoot});cssVars(g)}}r.updateDOM&&v&&fixKeyframes(r.rootElement);l=false;r.onComplete(u.join(""),d,JSON.parse(JSON.stringify(c.job)),getTimeStamp()-r.__benchmark);handleFinally(d.length)}}})}else document.addEventListener("DOMContentLoaded",(function init(t){cssVars(e);document.removeEventListener("DOMContentLoaded",init)}))}}cssVars.reset=function(){s.job=0;s.group=0;l=false;if(u){u.disconnect();u=null}f=0;d=null;v=false;for(var e in c)c[e]={}};function addMutationObserver(e){function isDisabled(e){var t=isLink(e)&&e.hasAttribute("disabled");var r=(e.sheet||{}).disabled;return t||r}function isLink(e){var t=e.nodeName.toLowerCase()==="link"&&(e.getAttribute("rel")||"").indexOf("stylesheet")!==-1;return t}function isStyle(e){return e.nodeName.toLowerCase()==="style"}function isValidAttributeMutation(t){var r=false;if(t.type==="attributes"&&isLink(t.target)&&!isDisabled(t.target)){var n=t.attributeName==="disabled";var a=t.attributeName==="href";var s=t.target.getAttribute("data-cssvars")==="skip";var o=t.target.getAttribute("data-cssvars")==="src";if(n)r=!s&&!o;else if(a){s?t.target.setAttribute("data-cssvars",""):o&&resetCssNodes(e.rootElement,true);r=true}}return r}function isValidStyleTextMutation(e){var t=false;if(e.type==="childList"){var r=isStyle(e.target);var n=e.target.getAttribute("data-cssvars")==="out";t=r&&!n}return t}function isValidAddMutation(e){var t=false;e.type==="childList"&&(t=[].slice.call(e.addedNodes).some((function(e){var t=e.nodeType===1;var r=t&&e.hasAttribute("data-cssvars");var n=isStyle(e)&&i.cssVars.test(e.textContent);var a=!r&&(isLink(e)||n);return a&&!isDisabled(e)})));return t}function isValidRemoveMutation(t){var r=false;t.type==="childList"&&(r=[].slice.call(t.removedNodes).some((function(t){var r=t.nodeType===1;var n=r&&t.getAttribute("data-cssvars")==="out";var a=r&&t.getAttribute("data-cssvars")==="src";var s=a;if(a||n){var o=t.getAttribute("data-cssvars-group");var i=e.rootElement.querySelector('[data-cssvars-group="'.concat(o,'"]'));a&&resetCssNodes(e.rootElement,true);i&&i.parentNode.removeChild(i)}return s})));return r}if(window.MutationObserver){if(u){u.disconnect();u=null}u=new MutationObserver((function(t){var r=t.some((function(e){return isValidAttributeMutation(e)||isValidStyleTextMutation(e)||isValidAddMutation(e)||isValidRemoveMutation(e)}));r&&cssVars(e)}));u.observe(document.documentElement,{attributes:true,attributeFilter:["disabled","href"],childList:true,subtree:true})}}function cssVarsDebounced(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:100;clearTimeout(d);d=setTimeout((function(){e.__benchmark=null;cssVars(e)}),t)}function fixKeyframes(e){var t=["animation-name","-moz-animation-name","-webkit-animation-name"].filter((function(e){return getComputedStyle(document.body)[e]}))[0];if(t){var r=[].slice.call(e.querySelectorAll("*"));var n=[];var a="__CSSVARSPONYFILL-KEYFRAMES__";for(var s=0,o=r.length;s<o;s++){var i=r[s];var c=getComputedStyle(i)[t];if(c!=="none"){i.style[t]+=a;n.push(i)}}void document.body.offsetHeight;for(var l=0,u=n.length;l<u;l++){var f=n[l].style;f[t]=f[t].replace(a,"")}}}function fixRelativeCssUrls(e,t){var r=e.replace(i.cssComments,"").match(i.cssUrls)||[];r.forEach((function(r){var n=r.replace(i.cssUrls,"$1");var a=getFullUrl(n,t);e=e.replace(r,r.replace(n,a))}));return e}function fixVarNames(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};var t=/^-{2}/;return Object.keys(e).reduce((function(r,n){var a=t.test(n)?n:"--".concat(n.replace(/^-+/,""));r[a]=e[n];return r}),{})}function getFullUrl(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:location.href;var r=document.implementation.createHTMLDocument("");var n=r.createElement("base");var a=r.createElement("a");r.head.appendChild(n);r.body.appendChild(a);n.href=t;a.href=e;return a.href}function getTimeStamp(){return n&&(window.performance||{}).now?window.performance.now():(new Date).getTime()}function resetCssNodes(e){var t=arguments.length>1&&arguments[1]!==void 0&&arguments[1];var r=[].slice.call(e.querySelectorAll('[data-cssvars="skip"],[data-cssvars="src"]'));r.forEach((function(e){return e.setAttribute("data-cssvars","")}));t&&(c.dom={})}export{cssVars as default};

