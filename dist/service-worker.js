if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return s[e]||(r=new Promise(async r=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=r}else importScripts(e),r()})),r.then(()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]})},r=(r,s)=>{Promise.all(r.map(e)).then(e=>s(1===e.length?e[0]:e))},s={require:Promise.resolve(r)};self.define=(r,i,d)=>{s[r]||(s[r]=Promise.resolve().then(()=>{let s={};const n={uri:location.origin+r.slice(1)};return Promise.all(i.map(r=>{switch(r){case"exports":return s;case"module":return n;default:return e(r)}})).then(e=>{const r=d(...e);return s.default||(s.default=r),s})}))}}define("./service-worker.js",["./workbox-8a0bbd41"],(function(e){"use strict";self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),e.precacheAndRoute([{url:"c188dadf92deb15d4a217ed6a74faf14.png",revision:"c188dadf92deb15d4a217ed6a74faf14"},{url:"index.html",revision:"023ef0522a6d307a179dada593520d1d"},{url:"main.css",revision:"19993058e9b7703fb7b01a66930ef8fe"},{url:"main.js",revision:"49dc65ea4e3d8239fd9827ee3bfee6d3"},{url:"main.js.LICENSE.txt",revision:"d2515f99ecca6a2a93d42551bdfdcaab"}],{})}));
