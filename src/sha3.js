/*
 A JavaScript implementation of the SHA family of hashes, as
 defined in FIPS PUB 180-4 and FIPS PUB 202, as well as the corresponding
 HMAC implementation as defined in FIPS PUB 198a

 Copyright 2008-2020 Brian Turek, 1998-2009 Paul Johnston & Contributors
 Distributed under the BSD License
 See http://caligatio.github.com/jsSHA/ for more information
*/
'use strict';(function(N){function w(d,b,h){var a=[],c=0,l,k,f,g,m,e,n,p,q=!1,r=[],v=[],x,w=!1,y=!1,u=-1;h=h||{};l=h.encoding||"UTF8";x=h.numRounds||1;if(x!==parseInt(x,10)||1>x)throw Error("numRounds must a integer >= 1");if(0===d.lastIndexOf("SHA3-",0)||0===d.lastIndexOf("SHAKE",0)){var B=6;e=A;p=function(a){var c=[],b;for(b=0;5>b;b+=1)c[b]=a[b].slice();return c};u=1;if("SHA3-224"===d)m=1152,g=224;else if("SHA3-256"===d)m=1088,g=256;else if("SHA3-384"===d)m=832,g=384;else if("SHA3-512"===d)m=576,
g=512;else if("SHAKE128"===d)m=1344,g=-1,B=31,y=!0;else if("SHAKE256"===d)m=1088,g=-1,B=31,y=!0;else throw Error("Chosen SHA variant is not supported");n=function(a,c,b,d,k){b=m;var g=B,l,f=[],h=b>>>5,e=0,n=c>>>5;for(l=0;l<n&&c>=b;l+=h)d=A(a.slice(l,l+h),d),c-=b;a=a.slice(l);for(c%=b;a.length<h;)a.push(0);l=c>>>3;a[l>>2]^=g<<l%4*8;a[h-1]^=2147483648;for(d=A(a,d);32*f.length<k;){a=d[e%5][e/5|0];f.push(a.b);if(32*f.length>=k)break;f.push(a.a);e+=1;0===64*e%b&&A(null,d)}return f}}else throw Error("Chosen SHA variant is not supported");
f=C(b,l,u);k=z(d);this.setHMACKey=function(a,c,b){var f;if(!0===q)throw Error("HMAC key already set");if(!0===w)throw Error("Cannot set HMAC key after calling update");if(!0===y)throw Error("SHAKE is not supported for HMAC");l=(b||{}).encoding||"UTF8";c=C(c,l,u)(a);a=c.binLen;c=c.value;f=m>>>3;b=f/4-1;for(f<a/8&&(c=n(c,a,0,z(d),g));c.length<=b;)c.push(0);for(a=0;a<=b;a+=1)r[a]=c[a]^909522486,v[a]=c[a]^1549556828;k=e(r,k);q=!0};this.update=function(b){var d,l,g,h=0,n=m>>>5;d=f(b,a,c);b=d.binLen;l=
d.value;d=b>>>5;for(g=0;g<d;g+=n)h+m<=b&&(k=e(l.slice(g,g+n),k),h+=m);a=l.slice(h>>>5);c=b%m;w=!0};this.getHash=function(b,l){var f,h,m,e;if(!0===q)throw Error("Cannot call getHash after setting HMAC key");m=D(l);if(!0===y){if(-1===m.shakeLen)throw Error("shakeLen must be specified in options");g=m.shakeLen}switch(b){case "HEX":f=function(a){return E(a,g,u,m)};break;case "B64":f=function(a){return F(a,g,u,m)};break;case "BYTES":f=function(a){return G(a,g,u)};break;case "ARRAYBUFFER":try{h=new ArrayBuffer(0)}catch(t){throw Error("ARRAYBUFFER not supported by this environment");
}f=function(a){return H(a,g,u)};break;case "UINT8ARRAY":try{h=new Uint8Array(0)}catch(t){throw Error("UINT8ARRAY not supported by this environment");}f=function(a){return I(a,g,u)};break;default:throw Error("format must be HEX, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");}e=n(a.slice(),c,0,p(k),g);for(h=1;h<x;h+=1)!0===y&&0!==g%32&&(e[e.length-1]&=16777215>>>24-g%32),e=n(e,g,0,z(d),g);return f(e)};this.getHMAC=function(b,l){var f,h,m,r;if(!1===q)throw Error("Cannot call getHMAC without first setting HMAC key");
m=D(l);switch(b){case "HEX":f=function(a){return E(a,g,u,m)};break;case "B64":f=function(a){return F(a,g,u,m)};break;case "BYTES":f=function(a){return G(a,g,u)};break;case "ARRAYBUFFER":try{f=new ArrayBuffer(0)}catch(O){throw Error("ARRAYBUFFER not supported by this environment");}f=function(a){return H(a,g,u)};break;case "UINT8ARRAY":try{f=new Uint8Array(0)}catch(O){throw Error("UINT8ARRAY not supported by this environment");}f=function(a){return I(a,g,u)};break;default:throw Error("outputFormat must be HEX, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
}h=n(a.slice(),c,0,p(k),g);r=e(v,z(d));r=n(h,g,0,r,g);return f(r)}}function e(d,b){this.a=d;this.b=b}function J(d,b,h,a){var c,l,k,f,g;b=b||[0];h=h||0;l=h>>>3;g=-1===a?3:0;for(c=0;c<d.length;c+=1)f=c+l,k=f>>>2,b.length<=k&&b.push(0),b[k]|=d[c]<<8*(g+f%4*a);return{value:b,binLen:8*d.length+h}}function E(d,b,h,a){var c="";b/=8;var l,k,f;f=-1===h?3:0;for(l=0;l<b;l+=1)k=d[l>>>2]>>>8*(f+l%4*h),c+="0123456789abcdef".charAt(k>>>4&15)+"0123456789abcdef".charAt(k&15);return a.outputUpper?c.toUpperCase():c}
function F(d,b,h,a){var c="",l=b/8,k,f,g,m;m=-1===h?3:0;for(k=0;k<l;k+=3)for(f=k+1<l?d[k+1>>>2]:0,g=k+2<l?d[k+2>>>2]:0,g=(d[k>>>2]>>>8*(m+k%4*h)&255)<<16|(f>>>8*(m+(k+1)%4*h)&255)<<8|g>>>8*(m+(k+2)%4*h)&255,f=0;4>f;f+=1)8*k+6*f<=b?c+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(g>>>6*(3-f)&63):c+=a.b64Pad;return c}function G(d,b,h){var a="";b/=8;var c,l,k;k=-1===h?3:0;for(c=0;c<b;c+=1)l=d[c>>>2]>>>8*(k+c%4*h)&255,a+=String.fromCharCode(l);return a}function H(d,b,h){b/=
8;var a,c=new ArrayBuffer(b),l,k;k=new Uint8Array(c);l=-1===h?3:0;for(a=0;a<b;a+=1)k[a]=d[a>>>2]>>>8*(l+a%4*h)&255;return c}function I(d,b,h){b/=8;var a,c=new Uint8Array(b),l;l=-1===h?3:0;for(a=0;a<b;a+=1)c[a]=d[a>>>2]>>>8*(l+a%4*h)&255;return c}function D(d){var b={outputUpper:!1,b64Pad:"=",shakeLen:-1};d=d||{};b.outputUpper=d.outputUpper||!1;!0===d.hasOwnProperty("b64Pad")&&(b.b64Pad=d.b64Pad);if(!0===d.hasOwnProperty("shakeLen")){if(0!==d.shakeLen%8)throw Error("shakeLen must be a multiple of 8");
b.shakeLen=d.shakeLen}if("boolean"!==typeof b.outputUpper)throw Error("Invalid outputUpper formatting option");if("string"!==typeof b.b64Pad)throw Error("Invalid b64Pad formatting option");return b}function C(d,b,h){switch(b){case "UTF8":case "UTF16BE":case "UTF16LE":break;default:throw Error("encoding must be UTF8, UTF16BE, or UTF16LE");}switch(d){case "HEX":d=function(a,c,b){var d=a.length,f,g,m,e,n,p;if(0!==d%2)throw Error("String of HEX type must be in byte increments");c=c||[0];b=b||0;n=b>>>
3;p=-1===h?3:0;for(f=0;f<d;f+=2){g=parseInt(a.substr(f,2),16);if(isNaN(g))throw Error("String of HEX type contains invalid characters");e=(f>>>1)+n;for(m=e>>>2;c.length<=m;)c.push(0);c[m]|=g<<8*(p+e%4*h)}return{value:c,binLen:4*d+b}};break;case "TEXT":d=function(a,c,d){var k,f,g=0,m,e,n,p,q,r;c=c||[0];d=d||0;n=d>>>3;if("UTF8"===b)for(r=-1===h?3:0,m=0;m<a.length;m+=1)for(k=a.charCodeAt(m),f=[],128>k?f.push(k):2048>k?(f.push(192|k>>>6),f.push(128|k&63)):55296>k||57344<=k?f.push(224|k>>>12,128|k>>>6&
63,128|k&63):(m+=1,k=65536+((k&1023)<<10|a.charCodeAt(m)&1023),f.push(240|k>>>18,128|k>>>12&63,128|k>>>6&63,128|k&63)),e=0;e<f.length;e+=1){q=g+n;for(p=q>>>2;c.length<=p;)c.push(0);c[p]|=f[e]<<8*(r+q%4*h);g+=1}else if("UTF16BE"===b||"UTF16LE"===b)for(r=-1===h?2:0,f="UTF16LE"===b&&1!==h||"UTF16LE"!==b&&1===h,m=0;m<a.length;m+=1){k=a.charCodeAt(m);!0===f&&(e=k&255,k=e<<8|k>>>8);q=g+n;for(p=q>>>2;c.length<=p;)c.push(0);c[p]|=k<<8*(r+q%4*h);g+=2}return{value:c,binLen:8*g+d}};break;case "B64":d=function(a,
c,b){var d=0,f,g,e,t,n,p,q,r;if(-1===a.search(/^[a-zA-Z0-9=+\/]+$/))throw Error("Invalid character in base-64 string");g=a.indexOf("=");a=a.replace(/\=/g,"");if(-1!==g&&g<a.length)throw Error("Invalid '=' found in base-64 string");c=c||[0];b=b||0;p=b>>>3;r=-1===h?3:0;for(g=0;g<a.length;g+=4){n=a.substr(g,4);for(e=t=0;e<n.length;e+=1)f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(n.charAt(e)),t|=f<<18-6*e;for(e=0;e<n.length-1;e+=1){q=d+p;for(f=q>>>2;c.length<=f;)c.push(0);
c[f]|=(t>>>16-8*e&255)<<8*(r+q%4*h);d+=1}}return{value:c,binLen:8*d+b}};break;case "BYTES":d=function(a,c,b){var d,e,g,m,t,n;c=c||[0];b=b||0;g=b>>>3;n=-1===h?3:0;for(e=0;e<a.length;e+=1)d=a.charCodeAt(e),t=e+g,m=t>>>2,c.length<=m&&c.push(0),c[m]|=d<<8*(n+t%4*h);return{value:c,binLen:8*a.length+b}};break;case "ARRAYBUFFER":try{d=new ArrayBuffer(0)}catch(a){throw Error("ARRAYBUFFER not supported by this environment");}d=function(a,c,b){return J(new Uint8Array(a),c,b,h)};break;case "UINT8ARRAY":try{d=
new Uint8Array(0)}catch(a){throw Error("UINT8ARRAY not supported by this environment");}d=function(a,b,d){return J(a,b,d,h)};break;default:throw Error("format must be HEX, TEXT, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");}return d}function K(d,b){return 32<b?(b-=32,new e(d.b<<b|d.a>>>32-b,d.a<<b|d.b>>>32-b)):0!==b?new e(d.a<<b|d.b>>>32-b,d.b<<b|d.a>>>32-b):d}function v(d,b){return new e(d.a^b.a,d.b^b.b)}function z(d){var b=[];if(0===d.lastIndexOf("SHA3-",0)||0===d.lastIndexOf("SHAKE",0))for(d=0;5>d;d+=
1)b[d]=[new e(0,0),new e(0,0),new e(0,0),new e(0,0),new e(0,0)];else throw Error("No SHA variants supported");return b}function A(d,b){var h,a,c,l,k=[],f=[];if(null!==d)for(a=0;a<d.length;a+=2)b[(a>>>1)%5][(a>>>1)/5|0]=v(b[(a>>>1)%5][(a>>>1)/5|0],new e(d[a+1],d[a]));for(h=0;24>h;h+=1){l=z("SHA3-");for(a=0;5>a;a+=1){c=b[a][0];var g=b[a][1],m=b[a][2],t=b[a][3],n=b[a][4];k[a]=new e(c.a^g.a^m.a^t.a^n.a,c.b^g.b^m.b^t.b^n.b)}for(a=0;5>a;a+=1)f[a]=v(k[(a+4)%5],K(k[(a+1)%5],1));for(a=0;5>a;a+=1)for(c=0;5>
c;c+=1)b[a][c]=v(b[a][c],f[a]);for(a=0;5>a;a+=1)for(c=0;5>c;c+=1)l[c][(2*a+3*c)%5]=K(b[a][c],L[a][c]);for(a=0;5>a;a+=1)for(c=0;5>c;c+=1)b[a][c]=v(l[a][c],new e(~l[(a+1)%5][c].a&l[(a+2)%5][c].a,~l[(a+1)%5][c].b&l[(a+2)%5][c].b));b[0][0]=v(b[0][0],M[h])}return b}var L,M;M=[new e(0,1),new e(0,32898),new e(2147483648,32906),new e(2147483648,2147516416),new e(0,32907),new e(0,2147483649),new e(2147483648,2147516545),new e(2147483648,32777),new e(0,138),new e(0,136),new e(0,2147516425),new e(0,2147483658),
new e(0,2147516555),new e(2147483648,139),new e(2147483648,32905),new e(2147483648,32771),new e(2147483648,32770),new e(2147483648,128),new e(0,32778),new e(2147483648,2147483658),new e(2147483648,2147516545),new e(2147483648,32896),new e(0,2147483649),new e(2147483648,2147516424)];L=[[0,36,3,41,18],[1,44,10,45,2],[62,6,43,15,61],[28,55,25,21,56],[27,20,39,8,14]];"function"===typeof define&&define.amd?define(function(){return w}):"undefined"!==typeof exports?("undefined"!==typeof module&&module.exports&&
(module.exports=w),exports=w):N.jsSHA=w})(this);
