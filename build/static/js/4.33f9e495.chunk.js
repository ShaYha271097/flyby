(this["webpackJsonp@flyby-auction/interface"]=this["webpackJsonp@flyby-auction/interface"]||[]).push([[4],{1229:function(t,r){var e,n=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];r.getSymbolSize=function(t){if(!t)throw new Error('"version" cannot be null or undefined');if(t<1||t>40)throw new Error('"version" should be in range from 1 to 40');return 4*t+17},r.getSymbolTotalCodewords=function(t){return n[t]},r.getBCHDigit=function(t){for(var r=0;0!==t;)r++,t>>>=1;return r},r.setToSJISFunction=function(t){if("function"!==typeof t)throw new Error('"toSJISFunc" is not a valid function.');e=t},r.isKanjiModeEnabled=function(){return"undefined"!==typeof e},r.toSJIS=function(t){return e(t)}},1230:function(t,r,e){var n=e(1536),o=e(1537);r.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},r.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},r.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},r.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},r.MIXED={bit:-1},r.getCharCountIndicator=function(t,r){if(!t.ccBits)throw new Error("Invalid mode: "+t);if(!n.isValid(r))throw new Error("Invalid version: "+r);return r>=1&&r<10?t.ccBits[0]:r<27?t.ccBits[1]:t.ccBits[2]},r.getBestModeForData=function(t){return o.testNumeric(t)?r.NUMERIC:o.testAlphanumeric(t)?r.ALPHANUMERIC:o.testKanji(t)?r.KANJI:r.BYTE},r.toString=function(t){if(t&&t.id)return t.id;throw new Error("Invalid mode")},r.isValid=function(t){return t&&t.bit&&t.ccBits},r.from=function(t,e){if(r.isValid(t))return t;try{return function(t){if("string"!==typeof t)throw new Error("Param is not a string");switch(t.toLowerCase()){case"numeric":return r.NUMERIC;case"alphanumeric":return r.ALPHANUMERIC;case"kanji":return r.KANJI;case"byte":return r.BYTE;default:throw new Error("Unknown mode: "+t)}}(t)}catch(n){return e}}},1252:function(t,r,e){"use strict";var n=e(1398);i.TYPED_ARRAY_SUPPORT=function(){try{var t=new Uint8Array(1);return t.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===t.foo()}catch(r){return!1}}();var o=i.TYPED_ARRAY_SUPPORT?2147483647:1073741823;function i(t,r,e){return i.TYPED_ARRAY_SUPPORT||this instanceof i?"number"===typeof t?s(this,t):function(t,r,e,n){if("number"===typeof r)throw new TypeError('"value" argument must not be a number');if("undefined"!==typeof ArrayBuffer&&r instanceof ArrayBuffer)return function(t,r,e,n){if(e<0||r.byteLength<e)throw new RangeError("'offset' is out of bounds");if(r.byteLength<e+(n||0))throw new RangeError("'length' is out of bounds");var o;o=void 0===e&&void 0===n?new Uint8Array(r):void 0===n?new Uint8Array(r,e):new Uint8Array(r,e,n);i.TYPED_ARRAY_SUPPORT?o.__proto__=i.prototype:o=f(t,o);return o}(t,r,e,n);if("string"===typeof r)return function(t,r){var e=0|l(r),n=u(t,e),o=n.write(r);o!==e&&(n=n.slice(0,o));return n}(t,r);return function(t,r){if(i.isBuffer(r)){var e=0|a(r.length),n=u(t,e);return 0===n.length||r.copy(n,0,0,e),n}if(r){if("undefined"!==typeof ArrayBuffer&&r.buffer instanceof ArrayBuffer||"length"in r)return"number"!==typeof r.length||(o=r.length)!==o?u(t,0):f(t,r);if("Buffer"===r.type&&Array.isArray(r.data))return f(t,r.data)}var o;throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}(t,r)}(this,t,r,e):new i(t,r,e)}function a(t){if(t>=o)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+o.toString(16)+" bytes");return 0|t}function u(t,r){var e;return i.TYPED_ARRAY_SUPPORT?(e=new Uint8Array(r)).__proto__=i.prototype:(null===(e=t)&&(e=new i(r)),e.length=r),e}function s(t,r){var e=u(t,r<0?0:0|a(r));if(!i.TYPED_ARRAY_SUPPORT)for(var n=0;n<r;++n)e[n]=0;return e}function f(t,r){for(var e=r.length<0?0:0|a(r.length),n=u(t,e),o=0;o<e;o+=1)n[o]=255&r[o];return n}function c(t,r){var e;r=r||1/0;for(var n=t.length,o=null,i=[],a=0;a<n;++a){if((e=t.charCodeAt(a))>55295&&e<57344){if(!o){if(e>56319){(r-=3)>-1&&i.push(239,191,189);continue}if(a+1===n){(r-=3)>-1&&i.push(239,191,189);continue}o=e;continue}if(e<56320){(r-=3)>-1&&i.push(239,191,189),o=e;continue}e=65536+(o-55296<<10|e-56320)}else o&&(r-=3)>-1&&i.push(239,191,189);if(o=null,e<128){if((r-=1)<0)break;i.push(e)}else if(e<2048){if((r-=2)<0)break;i.push(e>>6|192,63&e|128)}else if(e<65536){if((r-=3)<0)break;i.push(e>>12|224,e>>6&63|128,63&e|128)}else{if(!(e<1114112))throw new Error("Invalid code point");if((r-=4)<0)break;i.push(e>>18|240,e>>12&63|128,e>>6&63|128,63&e|128)}}return i}function l(t){return i.isBuffer(t)?t.length:"undefined"!==typeof ArrayBuffer&&"function"===typeof ArrayBuffer.isView&&(ArrayBuffer.isView(t)||t instanceof ArrayBuffer)?t.byteLength:("string"!==typeof t&&(t=""+t),0===t.length?0:c(t).length)}i.TYPED_ARRAY_SUPPORT&&(i.prototype.__proto__=Uint8Array.prototype,i.__proto__=Uint8Array,"undefined"!==typeof Symbol&&Symbol.species&&i[Symbol.species]===i&&Object.defineProperty(i,Symbol.species,{value:null,configurable:!0,enumerable:!1,writable:!1})),i.prototype.write=function(t,r,e){void 0===r||void 0===e&&"string"===typeof r?(e=this.length,r=0):isFinite(r)&&(r|=0,isFinite(e)?e|=0:e=void 0);var n=this.length-r;if((void 0===e||e>n)&&(e=n),t.length>0&&(e<0||r<0)||r>this.length)throw new RangeError("Attempt to write outside buffer bounds");return function(t,r,e,n){return function(t,r,e,n){for(var o=0;o<n&&!(o+e>=r.length||o>=t.length);++o)r[o+e]=t[o];return o}(c(r,t.length-e),t,e,n)}(this,t,r,e)},i.prototype.slice=function(t,r){var e,n=this.length;if((t=~~t)<0?(t+=n)<0&&(t=0):t>n&&(t=n),(r=void 0===r?n:~~r)<0?(r+=n)<0&&(r=0):r>n&&(r=n),r<t&&(r=t),i.TYPED_ARRAY_SUPPORT)(e=this.subarray(t,r)).__proto__=i.prototype;else{var o=r-t;e=new i(o,void 0);for(var a=0;a<o;++a)e[a]=this[a+t]}return e},i.prototype.copy=function(t,r,e,n){if(e||(e=0),n||0===n||(n=this.length),r>=t.length&&(r=t.length),r||(r=0),n>0&&n<e&&(n=e),n===e)return 0;if(0===t.length||0===this.length)return 0;if(r<0)throw new RangeError("targetStart out of bounds");if(e<0||e>=this.length)throw new RangeError("sourceStart out of bounds");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),t.length-r<n-e&&(n=t.length-r+e);var o,a=n-e;if(this===t&&e<r&&r<n)for(o=a-1;o>=0;--o)t[o+r]=this[o+e];else if(a<1e3||!i.TYPED_ARRAY_SUPPORT)for(o=0;o<a;++o)t[o+r]=this[o+e];else Uint8Array.prototype.set.call(t,this.subarray(e,e+a),r);return a},i.prototype.fill=function(t,r,e){if("string"===typeof t){if("string"===typeof r?(r=0,e=this.length):"string"===typeof e&&(e=this.length),1===t.length){var n=t.charCodeAt(0);n<256&&(t=n)}}else"number"===typeof t&&(t&=255);if(r<0||this.length<r||this.length<e)throw new RangeError("Out of range index");if(e<=r)return this;var o;if(r>>>=0,e=void 0===e?this.length:e>>>0,t||(t=0),"number"===typeof t)for(o=r;o<e;++o)this[o]=t;else{var a=i.isBuffer(t)?t:new i(t),u=a.length;for(o=0;o<e-r;++o)this[o+r]=a[o%u]}return this},i.concat=function(t,r){if(!n(t))throw new TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return u(null,0);var e;if(void 0===r)for(r=0,e=0;e<t.length;++e)r+=t[e].length;var o=s(null,r),a=0;for(e=0;e<t.length;++e){var f=t[e];if(!i.isBuffer(f))throw new TypeError('"list" argument must be an Array of Buffers');f.copy(o,a),a+=f.length}return o},i.byteLength=l,i.prototype._isBuffer=!0,i.isBuffer=function(t){return!(null==t||!t._isBuffer)},t.exports.alloc=function(t){var r=new i(t);return r.fill(0),r},t.exports.from=function(t){return new i(t)}},1398:function(t,r){var e={}.toString;t.exports=Array.isArray||function(t){return"[object Array]"==e.call(t)}},1399:function(t,r){r.L={bit:1},r.M={bit:0},r.Q={bit:3},r.H={bit:2},r.isValid=function(t){return t&&"undefined"!==typeof t.bit&&t.bit>=0&&t.bit<4},r.from=function(t,e){if(r.isValid(t))return t;try{return function(t){if("string"!==typeof t)throw new Error("Param is not a string");switch(t.toLowerCase()){case"l":case"low":return r.L;case"m":case"medium":return r.M;case"q":case"quartile":return r.Q;case"h":case"high":return r.H;default:throw new Error("Unknown EC Level: "+t)}}(t)}catch(n){return e}}},1525:function(t,r,e){"use strict";var n=e(109),o=e(72),i=e(221),a=e(1767),u=e(549),s=e(1768);function f(t){if("string"!==typeof t||1!==t.length)throw new TypeError("arrayFormatSeparator must be single character string")}function c(t,r){return r.encode?r.strict?a(t):encodeURIComponent(t):t}function l(t,r){return r.decode?u(t):t}function h(t){var r=t.indexOf("#");return-1!==r&&(t=t.slice(0,r)),t}function g(t){var r=(t=h(t)).indexOf("?");return-1===r?"":t.slice(r+1)}function d(t,r){return r.parseNumbers&&!Number.isNaN(Number(t))&&"string"===typeof t&&""!==t.trim()?t=Number(t):!r.parseBooleans||null===t||"true"!==t.toLowerCase()&&"false"!==t.toLowerCase()||(t="true"===t.toLowerCase()),t}function p(t,r){f((r=Object.assign({decode:!0,sort:!0,arrayFormat:"none",arrayFormatSeparator:",",parseNumbers:!1,parseBooleans:!1},r)).arrayFormatSeparator);var e=function(t){var r;switch(t.arrayFormat){case"index":return function(t,e,n){r=/\[(\d*)\]$/.exec(t),t=t.replace(/\[\d*\]$/,""),r?(void 0===n[t]&&(n[t]={}),n[t][r[1]]=e):n[t]=e};case"bracket":return function(t,e,n){r=/(\[\])$/.exec(t),t=t.replace(/\[\]$/,""),r?void 0!==n[t]?n[t]=[].concat(n[t],e):n[t]=[e]:n[t]=e};case"comma":case"separator":return function(r,e,n){var o="string"===typeof e&&e.split("").indexOf(t.arrayFormatSeparator)>-1?e.split(t.arrayFormatSeparator).map((function(r){return l(r,t)})):null===e?e:l(e,t);n[r]=o};default:return function(t,r,e){void 0!==e[t]?e[t]=[].concat(e[t],r):e[t]=r}}}(r),i=Object.create(null);if("string"!==typeof t)return i;if(!(t=t.trim().replace(/^[?#&]/,"")))return i;var a,u=o(t.split("&"));try{for(u.s();!(a=u.n()).done;){var c=a.value,h=s(r.decode?c.replace(/\+/g," "):c,"="),g=n(h,2),p=g[0],v=g[1];v=void 0===v?null:["comma","separator"].includes(r.arrayFormat)?v:l(v,r),e(l(p,r),v,i)}}catch(R){u.e(R)}finally{u.f()}for(var y=0,m=Object.keys(i);y<m.length;y++){var w=m[y],E=i[w];if("object"===typeof E&&null!==E)for(var b=0,A=Object.keys(E);b<A.length;b++){var B=A[b];E[B]=d(E[B],r)}else i[w]=d(E,r)}return!1===r.sort?i:(!0===r.sort?Object.keys(i).sort():Object.keys(i).sort(r.sort)).reduce((function(t,r){var e=i[r];return Boolean(e)&&"object"===typeof e&&!Array.isArray(e)?t[r]=function t(r){return Array.isArray(r)?r.sort():"object"===typeof r?t(Object.keys(r)).sort((function(t,r){return Number(t)-Number(r)})).map((function(t){return r[t]})):r}(e):t[r]=e,t}),Object.create(null))}r.extract=g,r.parse=p,r.stringify=function(t,r){if(!t)return"";f((r=Object.assign({encode:!0,strict:!0,arrayFormat:"none",arrayFormatSeparator:","},r)).arrayFormatSeparator);for(var e=function(e){return r.skipNull&&(null===(n=t[e])||void 0===n)||r.skipEmptyString&&""===t[e];var n},n=function(t){switch(t.arrayFormat){case"index":return function(r){return function(e,n){var o=e.length;return void 0===n||t.skipNull&&null===n||t.skipEmptyString&&""===n?e:[].concat(i(e),null===n?[[c(r,t),"[",o,"]"].join("")]:[[c(r,t),"[",c(o,t),"]=",c(n,t)].join("")])}};case"bracket":return function(r){return function(e,n){return void 0===n||t.skipNull&&null===n||t.skipEmptyString&&""===n?e:[].concat(i(e),null===n?[[c(r,t),"[]"].join("")]:[[c(r,t),"[]=",c(n,t)].join("")])}};case"comma":case"separator":return function(r){return function(e,n){return null===n||void 0===n||0===n.length?e:0===e.length?[[c(r,t),"=",c(n,t)].join("")]:[[e,c(n,t)].join(t.arrayFormatSeparator)]}};default:return function(r){return function(e,n){return void 0===n||t.skipNull&&null===n||t.skipEmptyString&&""===n?e:[].concat(i(e),null===n?[c(r,t)]:[[c(r,t),"=",c(n,t)].join("")])}}}}(r),o={},a=0,u=Object.keys(t);a<u.length;a++){var s=u[a];e(s)||(o[s]=t[s])}var l=Object.keys(o);return!1!==r.sort&&l.sort(r.sort),l.map((function(e){var o=t[e];return void 0===o?"":null===o?c(e,r):Array.isArray(o)?o.reduce(n(e),[]).join("&"):c(e,r)+"="+c(o,r)})).filter((function(t){return t.length>0})).join("&")},r.parseUrl=function(t,r){r=Object.assign({decode:!0},r);var e=s(t,"#"),o=n(e,2),i=o[0],a=o[1];return Object.assign({url:i.split("?")[0]||"",query:p(g(t),r)},r&&r.parseFragmentIdentifier&&a?{fragmentIdentifier:l(a,r)}:{})},r.stringifyUrl=function(t,e){e=Object.assign({encode:!0,strict:!0},e);var n=h(t.url).split("?")[0]||"",o=r.extract(t.url),i=r.parse(o,{sort:!1}),a=Object.assign(i,t.query),u=r.stringify(a,e);u&&(u="?".concat(u));var s=function(t){var r="",e=t.indexOf("#");return-1!==e&&(r=t.slice(e)),r}(t.url);return t.fragmentIdentifier&&(s="#".concat(c(t.fragmentIdentifier,e))),"".concat(n).concat(u).concat(s)}},1534:function(t,r,e){var n=e(1774),o=e(1775),i=e(1792),a=e(1793);function u(t,r,e,i,a){var u=[].slice.call(arguments,1),s=u.length,f="function"===typeof u[s-1];if(!f&&!n())throw new Error("Callback required as last argument");if(!f){if(s<1)throw new Error("Too few arguments provided");return 1===s?(e=r,r=i=void 0):2!==s||r.getContext||(i=e,e=r,r=void 0),new Promise((function(n,a){try{var u=o.create(e,i);n(t(u,r,i))}catch(s){a(s)}}))}if(s<2)throw new Error("Too few arguments provided");2===s?(a=e,e=r,r=i=void 0):3===s&&(r.getContext&&"undefined"===typeof a?(a=i,i=void 0):(a=i,i=e,e=r,r=void 0));try{var c=o.create(e,i);a(null,t(c,r,i))}catch(l){a(l)}}r.create=o.create,r.toCanvas=u.bind(null,i.render),r.toDataURL=u.bind(null,i.renderToDataURL),r.toString=u.bind(null,(function(t,r,e){return a.render(t,e)}))},1535:function(t,r,e){var n=e(1399),o=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],i=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];r.getBlocksCount=function(t,r){switch(r){case n.L:return o[4*(t-1)+0];case n.M:return o[4*(t-1)+1];case n.Q:return o[4*(t-1)+2];case n.H:return o[4*(t-1)+3];default:return}},r.getTotalCodewordsCount=function(t,r){switch(r){case n.L:return i[4*(t-1)+0];case n.M:return i[4*(t-1)+1];case n.Q:return i[4*(t-1)+2];case n.H:return i[4*(t-1)+3];default:return}}},1536:function(t,r){r.isValid=function(t){return!isNaN(t)&&t>=1&&t<=40}},1537:function(t,r){var e="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+",n="(?:(?![A-Z0-9 $%*+\\-./:]|"+(e=e.replace(/u/g,"\\u"))+")(?:.|[\r\n]))+";r.KANJI=new RegExp(e,"g"),r.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),r.BYTE=new RegExp(n,"g"),r.NUMERIC=new RegExp("[0-9]+","g"),r.ALPHANUMERIC=new RegExp("[A-Z $%*+\\-./:]+","g");var o=new RegExp("^"+e+"$"),i=new RegExp("^[0-9]+$"),a=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");r.testKanji=function(t){return o.test(t)},r.testNumeric=function(t){return i.test(t)},r.testAlphanumeric=function(t){return a.test(t)}},1538:function(t,r){function e(t){if("number"===typeof t&&(t=t.toString()),"string"!==typeof t)throw new Error("Color should be defined as hex string");var r=t.slice().replace("#","").split("");if(r.length<3||5===r.length||r.length>8)throw new Error("Invalid hex color: "+t);3!==r.length&&4!==r.length||(r=Array.prototype.concat.apply([],r.map((function(t){return[t,t]})))),6===r.length&&r.push("F","F");var e=parseInt(r.join(""),16);return{r:e>>24&255,g:e>>16&255,b:e>>8&255,a:255&e,hex:"#"+r.slice(0,6).join("")}}r.getOptions=function(t){t||(t={}),t.color||(t.color={});var r="undefined"===typeof t.margin||null===t.margin||t.margin<0?4:t.margin,n=t.width&&t.width>=21?t.width:void 0,o=t.scale||4;return{width:n,scale:n?4:o,margin:r,color:{dark:e(t.color.dark||"#000000ff"),light:e(t.color.light||"#ffffffff")},type:t.type,rendererOpts:t.rendererOpts||{}}},r.getScale=function(t,r){return r.width&&r.width>=t+2*r.margin?r.width/(t+2*r.margin):r.scale},r.getImageWidth=function(t,e){var n=r.getScale(t,e);return Math.floor((t+2*e.margin)*n)},r.qrToImageData=function(t,e,n){for(var o=e.modules.size,i=e.modules.data,a=r.getScale(o,n),u=Math.floor((o+2*n.margin)*a),s=n.margin*a,f=[n.color.light,n.color.dark],c=0;c<u;c++)for(var l=0;l<u;l++){var h=4*(c*u+l),g=n.color.light;if(c>=s&&l>=s&&c<u-s&&l<u-s)g=f[i[Math.floor((c-s)/a)*o+Math.floor((l-s)/a)]?1:0];t[h++]=g.r,t[h++]=g.g,t[h++]=g.b,t[h]=g.a}}},1767:function(t,r,e){"use strict";t.exports=function(t){return encodeURIComponent(t).replace(/[!'()*]/g,(function(t){return"%".concat(t.charCodeAt(0).toString(16).toUpperCase())}))}},1768:function(t,r,e){"use strict";t.exports=function(t,r){if("string"!==typeof t||"string"!==typeof r)throw new TypeError("Expected the arguments to be of type `string`");if(""===r)return[t];var e=t.indexOf(r);return-1===e?[t]:[t.slice(0,e),t.slice(e+r.length)]}},1774:function(t,r){t.exports=function(){return"function"===typeof Promise&&Promise.prototype&&Promise.prototype.then}},1775:function(t,r,e){var n=e(1252),o=e(1229),i=e(1399),a=e(1776),u=e(1777),s=e(1778),f=e(1779),c=e(1780),l=e(1535),h=e(1781),g=e(1784),d=e(1785),p=e(1230),v=e(1786),y=e(1398);function m(t,r,e){var n,o,i=t.size,a=d.getEncodedBits(r,e);for(n=0;n<15;n++)o=1===(a>>n&1),n<6?t.set(n,8,o,!0):n<8?t.set(n+1,8,o,!0):t.set(i-15+n,8,o,!0),n<8?t.set(8,i-n-1,o,!0):n<9?t.set(8,15-n-1+1,o,!0):t.set(8,15-n-1,o,!0);t.set(i-8,8,1,!0)}function w(t,r,e){var i=new a;e.forEach((function(r){i.put(r.mode.bit,4),i.put(r.getLength(),p.getCharCountIndicator(r.mode,t)),r.write(i)}));var u=8*(o.getSymbolTotalCodewords(t)-l.getTotalCodewordsCount(t,r));for(i.getLengthInBits()+4<=u&&i.put(0,4);i.getLengthInBits()%8!==0;)i.putBit(0);for(var s=(u-i.getLengthInBits())/8,f=0;f<s;f++)i.put(f%2?17:236,8);return function(t,r,e){for(var i=o.getSymbolTotalCodewords(r),a=l.getTotalCodewordsCount(r,e),u=i-a,s=l.getBlocksCount(r,e),f=s-i%s,c=Math.floor(i/s),g=Math.floor(u/s),d=g+1,p=c-g,v=new h(p),y=0,m=new Array(s),w=new Array(s),E=0,b=n.from(t.buffer),A=0;A<s;A++){var B=A<f?g:d;m[A]=b.slice(y,y+B),w[A]=v.encode(m[A]),y+=B,E=Math.max(E,B)}var R,P,T=n.alloc(i),C=0;for(R=0;R<E;R++)for(P=0;P<s;P++)R<m[P].length&&(T[C++]=m[P][R]);for(R=0;R<p;R++)for(P=0;P<s;P++)T[C++]=w[P][R];return T}(i,t,r)}function E(t,r,e,n){var i;if(y(t))i=v.fromArray(t);else{if("string"!==typeof t)throw new Error("Invalid data");var a=r;if(!a){var l=v.rawSplit(t);a=g.getBestVersionForData(l,e)}i=v.fromString(t,a||40)}var h=g.getBestVersionForData(i,e);if(!h)throw new Error("The amount of data is too big to be stored in a QR Code");if(r){if(r<h)throw new Error("\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: "+h+".\n")}else r=h;var d=w(r,e,i),p=o.getSymbolSize(r),E=new u(p);return function(t,r){for(var e=t.size,n=f.getPositions(r),o=0;o<n.length;o++)for(var i=n[o][0],a=n[o][1],u=-1;u<=7;u++)if(!(i+u<=-1||e<=i+u))for(var s=-1;s<=7;s++)a+s<=-1||e<=a+s||(u>=0&&u<=6&&(0===s||6===s)||s>=0&&s<=6&&(0===u||6===u)||u>=2&&u<=4&&s>=2&&s<=4?t.set(i+u,a+s,!0,!0):t.set(i+u,a+s,!1,!0))}(E,r),function(t){for(var r=t.size,e=8;e<r-8;e++){var n=e%2===0;t.set(e,6,n,!0),t.set(6,e,n,!0)}}(E),function(t,r){for(var e=s.getPositions(r),n=0;n<e.length;n++)for(var o=e[n][0],i=e[n][1],a=-2;a<=2;a++)for(var u=-2;u<=2;u++)-2===a||2===a||-2===u||2===u||0===a&&0===u?t.set(o+a,i+u,!0,!0):t.set(o+a,i+u,!1,!0)}(E,r),m(E,e,0),r>=7&&function(t,r){for(var e,n,o,i=t.size,a=g.getEncodedBits(r),u=0;u<18;u++)e=Math.floor(u/3),n=u%3+i-8-3,o=1===(a>>u&1),t.set(e,n,o,!0),t.set(n,e,o,!0)}(E,r),function(t,r){for(var e=t.size,n=-1,o=e-1,i=7,a=0,u=e-1;u>0;u-=2)for(6===u&&u--;;){for(var s=0;s<2;s++)if(!t.isReserved(o,u-s)){var f=!1;a<r.length&&(f=1===(r[a]>>>i&1)),t.set(o,u-s,f),-1===--i&&(a++,i=7)}if((o+=n)<0||e<=o){o-=n,n=-n;break}}}(E,d),isNaN(n)&&(n=c.getBestMask(E,m.bind(null,E,e))),c.applyMask(n,E),m(E,e,n),{modules:E,version:r,errorCorrectionLevel:e,maskPattern:n,segments:i}}r.create=function(t,r){if("undefined"===typeof t||""===t)throw new Error("No input text");var e,n,a=i.M;return"undefined"!==typeof r&&(a=i.from(r.errorCorrectionLevel,i.M),e=g.from(r.version),n=c.from(r.maskPattern),r.toSJISFunc&&o.setToSJISFunction(r.toSJISFunc)),E(t,e,a,n)}},1776:function(t,r){function e(){this.buffer=[],this.length=0}e.prototype={get:function(t){var r=Math.floor(t/8);return 1===(this.buffer[r]>>>7-t%8&1)},put:function(t,r){for(var e=0;e<r;e++)this.putBit(1===(t>>>r-e-1&1))},getLengthInBits:function(){return this.length},putBit:function(t){var r=Math.floor(this.length/8);this.buffer.length<=r&&this.buffer.push(0),t&&(this.buffer[r]|=128>>>this.length%8),this.length++}},t.exports=e},1777:function(t,r,e){var n=e(1252);function o(t){if(!t||t<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=t,this.data=n.alloc(t*t),this.reservedBit=n.alloc(t*t)}o.prototype.set=function(t,r,e,n){var o=t*this.size+r;this.data[o]=e,n&&(this.reservedBit[o]=!0)},o.prototype.get=function(t,r){return this.data[t*this.size+r]},o.prototype.xor=function(t,r,e){this.data[t*this.size+r]^=e},o.prototype.isReserved=function(t,r){return this.reservedBit[t*this.size+r]},t.exports=o},1778:function(t,r,e){var n=e(1229).getSymbolSize;r.getRowColCoords=function(t){if(1===t)return[];for(var r=Math.floor(t/7)+2,e=n(t),o=145===e?26:2*Math.ceil((e-13)/(2*r-2)),i=[e-7],a=1;a<r-1;a++)i[a]=i[a-1]-o;return i.push(6),i.reverse()},r.getPositions=function(t){for(var e=[],n=r.getRowColCoords(t),o=n.length,i=0;i<o;i++)for(var a=0;a<o;a++)0===i&&0===a||0===i&&a===o-1||i===o-1&&0===a||e.push([n[i],n[a]]);return e}},1779:function(t,r,e){var n=e(1229).getSymbolSize;r.getPositions=function(t){var r=n(t);return[[0,0],[r-7,0],[0,r-7]]}},1780:function(t,r){r.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};var e=3,n=3,o=40,i=10;function a(t,e,n){switch(t){case r.Patterns.PATTERN000:return(e+n)%2===0;case r.Patterns.PATTERN001:return e%2===0;case r.Patterns.PATTERN010:return n%3===0;case r.Patterns.PATTERN011:return(e+n)%3===0;case r.Patterns.PATTERN100:return(Math.floor(e/2)+Math.floor(n/3))%2===0;case r.Patterns.PATTERN101:return e*n%2+e*n%3===0;case r.Patterns.PATTERN110:return(e*n%2+e*n%3)%2===0;case r.Patterns.PATTERN111:return(e*n%3+(e+n)%2)%2===0;default:throw new Error("bad maskPattern:"+t)}}r.isValid=function(t){return null!=t&&""!==t&&!isNaN(t)&&t>=0&&t<=7},r.from=function(t){return r.isValid(t)?parseInt(t,10):void 0},r.getPenaltyN1=function(t){for(var r=t.size,n=0,o=0,i=0,a=null,u=null,s=0;s<r;s++){o=i=0,a=u=null;for(var f=0;f<r;f++){var c=t.get(s,f);c===a?o++:(o>=5&&(n+=e+(o-5)),a=c,o=1),(c=t.get(f,s))===u?i++:(i>=5&&(n+=e+(i-5)),u=c,i=1)}o>=5&&(n+=e+(o-5)),i>=5&&(n+=e+(i-5))}return n},r.getPenaltyN2=function(t){for(var r=t.size,e=0,o=0;o<r-1;o++)for(var i=0;i<r-1;i++){var a=t.get(o,i)+t.get(o,i+1)+t.get(o+1,i)+t.get(o+1,i+1);4!==a&&0!==a||e++}return e*n},r.getPenaltyN3=function(t){for(var r=t.size,e=0,n=0,i=0,a=0;a<r;a++){n=i=0;for(var u=0;u<r;u++)n=n<<1&2047|t.get(a,u),u>=10&&(1488===n||93===n)&&e++,i=i<<1&2047|t.get(u,a),u>=10&&(1488===i||93===i)&&e++}return e*o},r.getPenaltyN4=function(t){for(var r=0,e=t.data.length,n=0;n<e;n++)r+=t.data[n];return Math.abs(Math.ceil(100*r/e/5)-10)*i},r.applyMask=function(t,r){for(var e=r.size,n=0;n<e;n++)for(var o=0;o<e;o++)r.isReserved(o,n)||r.xor(o,n,a(t,o,n))},r.getBestMask=function(t,e){for(var n=Object.keys(r.Patterns).length,o=0,i=1/0,a=0;a<n;a++){e(a),r.applyMask(a,t);var u=r.getPenaltyN1(t)+r.getPenaltyN2(t)+r.getPenaltyN3(t)+r.getPenaltyN4(t);r.applyMask(a,t),u<i&&(i=u,o=a)}return o}},1781:function(t,r,e){var n=e(1252),o=e(1782),i=e(12).Buffer;function a(t){this.genPoly=void 0,this.degree=t,this.degree&&this.initialize(this.degree)}a.prototype.initialize=function(t){this.degree=t,this.genPoly=o.generateECPolynomial(this.degree)},a.prototype.encode=function(t){if(!this.genPoly)throw new Error("Encoder not initialized");var r=n.alloc(this.degree),e=i.concat([t,r],t.length+this.degree),a=o.mod(e,this.genPoly),u=this.degree-a.length;if(u>0){var s=n.alloc(this.degree);return a.copy(s,u),s}return a},t.exports=a},1782:function(t,r,e){var n=e(1252),o=e(1783);r.mul=function(t,r){for(var e=n.alloc(t.length+r.length-1),i=0;i<t.length;i++)for(var a=0;a<r.length;a++)e[i+a]^=o.mul(t[i],r[a]);return e},r.mod=function(t,r){for(var e=n.from(t);e.length-r.length>=0;){for(var i=e[0],a=0;a<r.length;a++)e[a]^=o.mul(r[a],i);for(var u=0;u<e.length&&0===e[u];)u++;e=e.slice(u)}return e},r.generateECPolynomial=function(t){for(var e=n.from([1]),i=0;i<t;i++)e=r.mul(e,[1,o.exp(i)]);return e}},1783:function(t,r,e){var n=e(1252),o=n.alloc(512),i=n.alloc(256);!function(){for(var t=1,r=0;r<255;r++)o[r]=t,i[t]=r,256&(t<<=1)&&(t^=285);for(r=255;r<512;r++)o[r]=o[r-255]}(),r.log=function(t){if(t<1)throw new Error("log("+t+")");return i[t]},r.exp=function(t){return o[t]},r.mul=function(t,r){return 0===t||0===r?0:o[i[t]+i[r]]}},1784:function(t,r,e){var n=e(1229),o=e(1535),i=e(1399),a=e(1230),u=e(1536),s=e(1398),f=n.getBCHDigit(7973);function c(t,r){return a.getCharCountIndicator(t,r)+4}function l(t,r){var e=0;return t.forEach((function(t){var n=c(t.mode,r);e+=n+t.getBitsLength()})),e}r.from=function(t,r){return u.isValid(t)?parseInt(t,10):r},r.getCapacity=function(t,r,e){if(!u.isValid(t))throw new Error("Invalid QR Code version");"undefined"===typeof e&&(e=a.BYTE);var i=8*(n.getSymbolTotalCodewords(t)-o.getTotalCodewordsCount(t,r));if(e===a.MIXED)return i;var s=i-c(e,t);switch(e){case a.NUMERIC:return Math.floor(s/10*3);case a.ALPHANUMERIC:return Math.floor(s/11*2);case a.KANJI:return Math.floor(s/13);case a.BYTE:default:return Math.floor(s/8)}},r.getBestVersionForData=function(t,e){var n,o=i.from(e,i.M);if(s(t)){if(t.length>1)return function(t,e){for(var n=1;n<=40;n++){if(l(t,n)<=r.getCapacity(n,e,a.MIXED))return n}}(t,o);if(0===t.length)return 1;n=t[0]}else n=t;return function(t,e,n){for(var o=1;o<=40;o++)if(e<=r.getCapacity(o,n,t))return o}(n.mode,n.getLength(),o)},r.getEncodedBits=function(t){if(!u.isValid(t)||t<7)throw new Error("Invalid QR Code version");for(var r=t<<12;n.getBCHDigit(r)-f>=0;)r^=7973<<n.getBCHDigit(r)-f;return t<<12|r}},1785:function(t,r,e){var n=e(1229),o=n.getBCHDigit(1335);r.getEncodedBits=function(t,r){for(var e=t.bit<<3|r,i=e<<10;n.getBCHDigit(i)-o>=0;)i^=1335<<n.getBCHDigit(i)-o;return 21522^(e<<10|i)}},1786:function(t,r,e){var n=e(1230),o=e(1787),i=e(1788),a=e(1789),u=e(1790),s=e(1537),f=e(1229),c=e(1791);function l(t){return unescape(encodeURIComponent(t)).length}function h(t,r,e){for(var n,o=[];null!==(n=t.exec(e));)o.push({data:n[0],index:n.index,mode:r,length:n[0].length});return o}function g(t){var r,e,o=h(s.NUMERIC,n.NUMERIC,t),i=h(s.ALPHANUMERIC,n.ALPHANUMERIC,t);return f.isKanjiModeEnabled()?(r=h(s.BYTE,n.BYTE,t),e=h(s.KANJI,n.KANJI,t)):(r=h(s.BYTE_KANJI,n.BYTE,t),e=[]),o.concat(i,r,e).sort((function(t,r){return t.index-r.index})).map((function(t){return{data:t.data,mode:t.mode,length:t.length}}))}function d(t,r){switch(r){case n.NUMERIC:return o.getBitsLength(t);case n.ALPHANUMERIC:return i.getBitsLength(t);case n.KANJI:return u.getBitsLength(t);case n.BYTE:return a.getBitsLength(t)}}function p(t,r){var e,s=n.getBestModeForData(t);if((e=n.from(r,s))!==n.BYTE&&e.bit<s.bit)throw new Error('"'+t+'" cannot be encoded with mode '+n.toString(e)+".\n Suggested mode is: "+n.toString(s));switch(e!==n.KANJI||f.isKanjiModeEnabled()||(e=n.BYTE),e){case n.NUMERIC:return new o(t);case n.ALPHANUMERIC:return new i(t);case n.KANJI:return new u(t);case n.BYTE:return new a(t)}}r.fromArray=function(t){return t.reduce((function(t,r){return"string"===typeof r?t.push(p(r,null)):r.data&&t.push(p(r.data,r.mode)),t}),[])},r.fromString=function(t,e){for(var o=function(t,r){for(var e={},o={start:{}},i=["start"],a=0;a<t.length;a++){for(var u=t[a],s=[],f=0;f<u.length;f++){var c=u[f],l=""+a+f;s.push(l),e[l]={node:c,lastCount:0},o[l]={};for(var h=0;h<i.length;h++){var g=i[h];e[g]&&e[g].node.mode===c.mode?(o[g][l]=d(e[g].lastCount+c.length,c.mode)-d(e[g].lastCount,c.mode),e[g].lastCount+=c.length):(e[g]&&(e[g].lastCount=c.length),o[g][l]=d(c.length,c.mode)+4+n.getCharCountIndicator(c.mode,r))}}i=s}for(h=0;h<i.length;h++)o[i[h]].end=0;return{map:o,table:e}}(function(t){for(var r=[],e=0;e<t.length;e++){var o=t[e];switch(o.mode){case n.NUMERIC:r.push([o,{data:o.data,mode:n.ALPHANUMERIC,length:o.length},{data:o.data,mode:n.BYTE,length:o.length}]);break;case n.ALPHANUMERIC:r.push([o,{data:o.data,mode:n.BYTE,length:o.length}]);break;case n.KANJI:r.push([o,{data:o.data,mode:n.BYTE,length:l(o.data)}]);break;case n.BYTE:r.push([{data:o.data,mode:n.BYTE,length:l(o.data)}])}}return r}(g(t,f.isKanjiModeEnabled())),e),i=c.find_path(o.map,"start","end"),a=[],u=1;u<i.length-1;u++)a.push(o.table[i[u]].node);return r.fromArray(function(t){return t.reduce((function(t,r){var e=t.length-1>=0?t[t.length-1]:null;return e&&e.mode===r.mode?(t[t.length-1].data+=r.data,t):(t.push(r),t)}),[])}(a))},r.rawSplit=function(t){return r.fromArray(g(t,f.isKanjiModeEnabled()))}},1787:function(t,r,e){var n=e(1230);function o(t){this.mode=n.NUMERIC,this.data=t.toString()}o.getBitsLength=function(t){return 10*Math.floor(t/3)+(t%3?t%3*3+1:0)},o.prototype.getLength=function(){return this.data.length},o.prototype.getBitsLength=function(){return o.getBitsLength(this.data.length)},o.prototype.write=function(t){var r,e,n;for(r=0;r+3<=this.data.length;r+=3)e=this.data.substr(r,3),n=parseInt(e,10),t.put(n,10);var o=this.data.length-r;o>0&&(e=this.data.substr(r),n=parseInt(e,10),t.put(n,3*o+1))},t.exports=o},1788:function(t,r,e){var n=e(1230),o=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function i(t){this.mode=n.ALPHANUMERIC,this.data=t}i.getBitsLength=function(t){return 11*Math.floor(t/2)+t%2*6},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(t){var r;for(r=0;r+2<=this.data.length;r+=2){var e=45*o.indexOf(this.data[r]);e+=o.indexOf(this.data[r+1]),t.put(e,11)}this.data.length%2&&t.put(o.indexOf(this.data[r]),6)},t.exports=i},1789:function(t,r,e){var n=e(1252),o=e(1230);function i(t){this.mode=o.BYTE,this.data=n.from(t)}i.getBitsLength=function(t){return 8*t},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(t){for(var r=0,e=this.data.length;r<e;r++)t.put(this.data[r],8)},t.exports=i},1790:function(t,r,e){var n=e(1230),o=e(1229);function i(t){this.mode=n.KANJI,this.data=t}i.getBitsLength=function(t){return 13*t},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(t){var r;for(r=0;r<this.data.length;r++){var e=o.toSJIS(this.data[r]);if(e>=33088&&e<=40956)e-=33088;else{if(!(e>=57408&&e<=60351))throw new Error("Invalid SJIS character: "+this.data[r]+"\nMake sure your charset is UTF-8");e-=49472}e=192*(e>>>8&255)+(255&e),t.put(e,13)}},t.exports=i},1791:function(t,r,e){"use strict";var n={single_source_shortest_paths:function(t,r,e){var o={},i={};i[r]=0;var a,u,s,f,c,l,h,g=n.PriorityQueue.make();for(g.push(r,0);!g.empty();)for(s in u=(a=g.pop()).value,f=a.cost,c=t[u]||{})c.hasOwnProperty(s)&&(l=f+c[s],h=i[s],("undefined"===typeof i[s]||h>l)&&(i[s]=l,g.push(s,l),o[s]=u));if("undefined"!==typeof e&&"undefined"===typeof i[e]){var d=["Could not find a path from ",r," to ",e,"."].join("");throw new Error(d)}return o},extract_shortest_path_from_predecessor_list:function(t,r){for(var e=[],n=r;n;)e.push(n),t[n],n=t[n];return e.reverse(),e},find_path:function(t,r,e){var o=n.single_source_shortest_paths(t,r,e);return n.extract_shortest_path_from_predecessor_list(o,e)},PriorityQueue:{make:function(t){var r,e=n.PriorityQueue,o={};for(r in t=t||{},e)e.hasOwnProperty(r)&&(o[r]=e[r]);return o.queue=[],o.sorter=t.sorter||e.default_sorter,o},default_sorter:function(t,r){return t.cost-r.cost},push:function(t,r){var e={value:t,cost:r};this.queue.push(e),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return 0===this.queue.length}}};t.exports=n},1792:function(t,r,e){var n=e(1538);r.render=function(t,r,e){var o=e,i=r;"undefined"!==typeof o||r&&r.getContext||(o=r,r=void 0),r||(i=function(){try{return document.createElement("canvas")}catch(t){throw new Error("You need to specify a canvas element")}}()),o=n.getOptions(o);var a=n.getImageWidth(t.modules.size,o),u=i.getContext("2d"),s=u.createImageData(a,a);return n.qrToImageData(s.data,t,o),function(t,r,e){t.clearRect(0,0,r.width,r.height),r.style||(r.style={}),r.height=e,r.width=e,r.style.height=e+"px",r.style.width=e+"px"}(u,i,a),u.putImageData(s,0,0),i},r.renderToDataURL=function(t,e,n){var o=n;"undefined"!==typeof o||e&&e.getContext||(o=e,e=void 0),o||(o={});var i=r.render(t,e,o),a=o.type||"image/png",u=o.rendererOpts||{};return i.toDataURL(a,u.quality)}},1793:function(t,r,e){var n=e(1538);function o(t,r){var e=t.a/255,n=r+'="'+t.hex+'"';return e<1?n+" "+r+'-opacity="'+e.toFixed(2).slice(1)+'"':n}function i(t,r,e){var n=t+r;return"undefined"!==typeof e&&(n+=" "+e),n}r.render=function(t,r,e){var a=n.getOptions(r),u=t.modules.size,s=t.modules.data,f=u+2*a.margin,c=a.color.light.a?"<path "+o(a.color.light,"fill")+' d="M0 0h'+f+"v"+f+'H0z"/>':"",l="<path "+o(a.color.dark,"stroke")+' d="'+function(t,r,e){for(var n="",o=0,a=!1,u=0,s=0;s<t.length;s++){var f=Math.floor(s%r),c=Math.floor(s/r);f||a||(a=!0),t[s]?(u++,s>0&&f>0&&t[s-1]||(n+=a?i("M",f+e,.5+c+e):i("m",o,0),o=0,a=!1),f+1<r&&t[s+1]||(n+=i("h",u),u=0)):o++}return n}(s,u,a.margin)+'"/>',h='viewBox="0 0 '+f+" "+f+'"',g='<svg xmlns="http://www.w3.org/2000/svg" '+(a.width?'width="'+a.width+'" height="'+a.width+'" ':"")+h+' shape-rendering="crispEdges">'+c+l+"</svg>\n";return"function"===typeof e&&e(null,g),g}}}]);
//# sourceMappingURL=4.33f9e495.chunk.js.map