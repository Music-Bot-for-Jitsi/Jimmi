var te=(i,e,t)=>{if(!e.has(i))throw TypeError("Cannot "+t)};var T=(i,e,t)=>(te(i,e,"read from private field"),t?t.call(i):e.get(i)),P=(i,e,t)=>{if(e.has(i))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(i):e.set(i,t)},q=(i,e,t,s)=>(te(i,e,"write to private field"),s?s.call(i,t):e.set(i,t),t);import{S as I,i as J,s as $,e as w,E as Y,a as h,b as j,l as Q,n as L,f as x,r as _e,F as ne,G as B,g as A,t as F,c as b,d as K,u as H,v as V,w as N,x as M,z as U,C as ie,A as se,H as ve,j as Z,X as ee,J as Ee,K as be,L as oe,q as we,M as re,N as ae,O as ce}from"./vendor.cdcc11b8.js";import{c as W}from"./index.c3ad1421.js";function Ce(i){let e,t,s,o;return{c(){var r;e=w("audio"),Y(e.src,t=((r=i[2])==null?void 0:r.source)||void 0)||h(e,"src",t),h(e,"crossorigin","anonymous"),e.controls=!0},m(r,f){j(r,e,f),i[10](e),s||(o=[Q(e,"canplaythrough",i[9]),Q(e,"ended",i[3])],s=!0)},p(r,[f]){var m;f&4&&!Y(e.src,t=((m=r[2])==null?void 0:m.source)||void 0)&&h(e,"src",t)},i:L,o:L,d(r){r&&x(e),i[10](null),s=!1,_e(o)}}}function Ne(i,e,t){let s,o,r;const f=[];function m(){return Math.floor(o.gain.value*100)}function p(g){o.gain.value=[0,g/100,1].sort()[1]}function c(){const g=new AudioContext,E=g.createMediaElementSource(r);o=g.createGain();const y=g.createMediaStreamDestination();p(W.default.initialVolume),E.connect(o).connect(y),navigator.mediaDevices.getUserMedia=async function(){return await g.resume(),y.stream}}async function l(g){g?t(2,s=g):await r.play()}function v(){return s}function d(g){t(1,r.currentTime+=g,r)}function n(){f.length>0?l(f.shift()):t(2,s=null)}ne(c);const a=()=>l();function u(g){B[g?"unshift":"push"](()=>{r=g,t(1,r)})}return t(2,s=null),[l,r,s,n,f,m,p,v,d,a,u]}class ye extends I{constructor(e){super();J(this,e,Ne,Ce,$,{queue:4,getGain:5,setGain:6,play:0,getCurrentTrack:7,forward:8})}get queue(){return this.$$.ctx[4]}get getGain(){return this.$$.ctx[5]}get setGain(){return this.$$.ctx[6]}get play(){return this.$$.ctx[0]}get getCurrentTrack(){return this.$$.ctx[7]}get forward(){return this.$$.ctx[8]}}function je(i){let e,t,s,o,r=i[0].getDisplayName()+"",f;return{c(){e=w("div"),t=w("div"),t.innerHTML='<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-6 h-6" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',s=A(),o=w("h2"),f=F(r),h(t,"class","w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0"),h(o,"class","text-gray-900 break-words text-lg title-font font-medium"),h(e,"class","flex items-center mb-3")},m(m,p){j(m,e,p),b(e,t),b(e,s),b(e,o),b(o,f)},p(m,[p]){p&1&&r!==(r=m[0].getDisplayName()+"")&&K(f,r)},i:L,o:L,d(m){m&&x(e)}}}function xe(i,e,t){let{participant:s}=e;return i.$$set=o=>{"participant"in o&&t(0,s=o.participant)},[s]}class Ae extends I{constructor(e){super();J(this,e,xe,je,$,{participant:0})}}var O,G,R,z;class ke{constructor(e,t,s,o){P(this,O,void 0);P(this,G,void 0);P(this,R,void 0);P(this,z,void 0);q(this,O,e),q(this,G,t),q(this,z,s),q(this,R,o)}get text(){return T(this,O)}get params(){const[,...e]=T(this,O).split(" ");return e}get participant(){return T(this,G)}respond(e){T(this,z)?T(this,R).call(this,e,T(this,G).getId()):T(this,R).call(this,e)}}O=new WeakMap,G=new WeakMap,R=new WeakMap,z=new WeakMap;class Le{constructor(e,t){this.audio=e,this.jitsi=t,this.play.bind(this),this.mute.bind(this),this.unmute.bind(this)}async play(){await this.audio.play(),this.unmute()}mute(){}unmute(){}sendMessage(e){this.jitsi.sendMessage(e)}get queue(){return this.audio.queue}get currentTrack(){return this.audio.getCurrentTrack()}set currentTrack(e){this.audio.play(e)}forward(e){this.audio.forward(e)}get volume(){return this.audio.getGain()}set volume(e){this.audio.setGain(e),e&&this.unmute()}}function le(i,e,t){const s=i.slice();return s[21]=e[t],s}function ue(i){let e,t=i[2]("general.participants")+"",s;return{c(){e=w("h1"),s=F(t),h(e,"class","text-gray-900 text-3xl title-font font-medium mb-4")},m(o,r){j(o,e,r),b(e,s)},p(o,r){r&4&&t!==(t=o[2]("general.participants")+"")&&K(s,t)},d(o){o&&x(e)}}}function fe(i){let e,t;return e=new Ae({props:{participant:i[21]}}),{c(){H(e.$$.fragment)},m(s,o){V(e,s,o),t=!0},p(s,o){const r={};o&2&&(r.participant=s[21]),e.$set(r)},i(s){t||(N(e.$$.fragment,s),t=!0)},o(s){M(e.$$.fragment,s),t=!1},d(s){U(e,s)}}}function Me(i){let e,t,s,o,r,f,m,p,c={};o=new ye({props:c}),i[8](o);let l=i[1].length&&ue(i),v=i[1],d=[];for(let a=0;a<v.length;a+=1)d[a]=fe(le(i,v,a));const n=a=>M(d[a],1,1,()=>{d[a]=null});return{c(){e=w("div"),t=w("div"),s=w("div"),H(o.$$.fragment),r=A(),f=w("div"),l&&l.c(),m=A();for(let a=0;a<d.length;a+=1)d[a].c();h(s,"class","w-full sm:w-2/3 md:w-3/4 pt-1 px-2"),h(f,"class","w-full sm:w-1/3 md:w-1/4 px-2"),h(t,"class","flex flex-row flex-wrap py-4"),h(e,"class","container mx-auto")},m(a,u){j(a,e,u),b(e,t),b(t,s),V(o,s,null),b(t,r),b(t,f),l&&l.m(f,null),b(f,m);for(let g=0;g<d.length;g+=1)d[g].m(f,null);p=!0},p(a,[u]){const g={};if(o.$set(g),a[1].length?l?l.p(a,u):(l=ue(a),l.c(),l.m(f,m)):l&&(l.d(1),l=null),u&2){v=a[1];let E;for(E=0;E<v.length;E+=1){const y=le(a,v,E);d[E]?(d[E].p(y,u),N(d[E],1)):(d[E]=fe(y),d[E].c(),N(d[E],1),d[E].m(f,null))}for(ie(),E=v.length;E<d.length;E+=1)n(E);se()}},i(a){if(!p){N(o.$$.fragment,a);for(let u=0;u<v.length;u+=1)N(d[u]);p=!0}},o(a){M(o.$$.fragment,a),d=d.filter(Boolean);for(let u=0;u<d.length;u+=1)M(d[u]);p=!1},d(a){a&&x(e),i[8](null),U(o),l&&l.d(),ve(d,a)}}}function de(){alert("Connection failed! Please report this issue"),console.error("Connection Failed!")}function Se(i,e,t){let s,o;Z(i,ee,_=>t(2,o=_));let{isJoined:r=!1}=e,{roomName:f}=e,{jimmiApi:m}=e,p,c,l,v=[];const d=Ee(),n=window.JitsiMeetJS;n.setLogLevel(n.logLevels.WARN);function a(){t(1,s=l.getParticipants())}function u(){for(let _=0;_<v.length;_++)v[_].dispose();l&&l.leave(),c&&c.disconnect()}function g(_){if(_&&(v=_),!!r)for(let C=0;C<v.length;C++)l.addTrack(v[C])}function E(){const _=(C,k,X)=>d("message",new ke(k,l.getParticipantById(C),X,l.sendMessage.bind(l)));l.addEventListener(n.events.conference.PRIVATE_MESSAGE_RECEIVED,(C,k)=>_(C,k,!0)),l.addEventListener(n.events.conference.MESSAGE_RECEIVED,(C,k)=>_(C,k,!1))}async function y(){console.info("Successfully joined conference!"),t(3,r=!0),g();const _=()=>{};l.addEventListener(n.events.conference.MESSAGE_RECEIVED,_),await(k=>new Promise(X=>setTimeout(X,k)))(1e3),l.removeEventListener(n.events.conference.MESSAGE_RECEIVED,_),E()}function S(){console.info("Connection established successfully");const _={startAudioMuted:!1};l=c.initJitsiConference(f.toLowerCase(),_),l.setDisplayName(W.default.jitsiDisplayName),l.on(n.events.conference.CONFERENCE_JOINED,y),l.on(n.events.conference.USER_JOINED,a),l.on(n.events.conference.USER_LEFT,a),l.on(n.events.conference.DISPLAY_NAME_CHANGED,a),l.join("")}function D(){console.info("disconnecting!"),c.removeEventListener(n.events.connection.CONNECTION_ESTABLISHED,S),c.removeEventListener(n.events.connection.CONNECTION_FAILED,de),c.removeEventListener(n.events.connection.CONNECTION_DISCONNECTED,D)}function pe(_){window.addEventListener("beforeunload",u),window.addEventListener("unload",u);const C={disableAudioLevels:!0,disableThirdPartyRequests:!0,enableAnalyticsLogging:!1};n.init(C),c=new n.JitsiConnection(void 0,null,_),c.addEventListener(n.events.connection.CONNECTION_ESTABLISHED,S),c.addEventListener(n.events.connection.CONNECTION_FAILED,de),c.addEventListener(n.events.connection.CONNECTION_DISCONNECTED,D),c.connect(),n.createLocalTracks({devices:["audio"]}).then(g).catch(k=>{throw k}),t(4,m=new Le(p,this))}function ge(_){l.sendMessage(_)}be(()=>{u()});function he(_){B[_?"unshift":"push"](()=>{p=_,t(0,p)})}return i.$$set=_=>{"isJoined"in _&&t(3,r=_.isJoined),"roomName"in _&&t(5,f=_.roomName),"jimmiApi"in _&&t(4,m=_.jimmiApi)},t(1,s=[]),[p,s,o,r,m,f,pe,ge,he]}class Te extends I{constructor(e){super();J(this,e,Se,Me,$,{isJoined:3,roomName:5,jimmiApi:4,joinConference:6,sendMessage:7})}get joinConference(){return this.$$.ctx[6]}get sendMessage(){return this.$$.ctx[7]}}function De(i){let e,t,s,o,r,f,m,p,c,l,v,d=i[0]("general.leave")+"",n,a,u,g,E,y;return{c(){e=w("header"),t=w("div"),s=w("a"),o=w("img"),f=A(),m=w("span"),m.textContent="JIMMI",p=A(),c=w("nav"),l=A(),v=w("button"),n=F(d),a=A(),u=oe("svg"),g=oe("path"),Y(o.src,r=W.logo)||h(o,"src",r),h(o,"alt","Logo"),h(o,"class","w-16 h-16"),h(m,"class","ml-3 text-white text-xl font-mono"),h(s,"href",W.url),h(s,"class","flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"),h(c,"class","md:ml-auto flex flex-wrap items-center text-base justify-center"),h(g,"d","M5 12h14M12 5l7 7-7 7"),h(u,"fill","none"),h(u,"stroke","currentColor"),h(u,"stroke-linecap","round"),h(u,"stroke-linejoin","round"),h(u,"stroke-width","2"),h(u,"class","w-4 h-4 ml-1"),h(u,"viewBox","0 0 24 24"),h(v,"class","inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"),h(t,"class","container p-2 mx-auto flex flex-wrap p-1 flex-col md:flex-row items-center"),h(e,"class","bg-indigo-500 text-lightgray-600 body-font")},m(S,D){j(S,e,D),b(e,t),b(t,s),b(s,o),b(s,f),b(s,m),b(t,p),b(t,c),b(t,l),b(t,v),b(v,n),b(v,a),b(v,u),b(u,g),E||(y=Q(v,"click",i[1]),E=!0)},p(S,[D]){D&1&&d!==(d=S[0]("general.leave")+"")&&K(n,d)},i:L,o:L,d(S){S&&x(e),E=!1,y()}}}function Ie(i,e,t){let s;Z(i,ee,r=>t(0,s=r));function o(){we("/")}return[s,o]}class Je extends I{constructor(e){super();J(this,e,Ie,De,$,{})}}function $e(i){let e;return{c(){e=w("div"),h(e,"class","w-20 h-20 center border-4 border-indigo-600 rounded-full loader svelte-1mrbjhb")},m(t,s){j(t,e,s)},p:L,i:L,o:L,d(t){t&&x(e)}}}class Oe extends I{constructor(e){super();J(this,e,null,$e,$,{})}}function me(i){let e,t,s,o,r=i[4]("general.connecting")+"",f,m,p;return t=new Oe({}),{c(){e=w("div"),H(t.$$.fragment),s=A(),o=w("p"),f=F(r),m=F("..."),h(o,"class","p-5"),h(e,"class","flex flex-col items-center justify-center h-full")},m(c,l){j(c,e,l),V(t,e,null),b(e,s),b(e,o),b(o,f),b(o,m),p=!0},p(c,l){(!p||l&16)&&r!==(r=c[4]("general.connecting")+"")&&K(f,r)},i(c){p||(N(t.$$.fragment,c),p=!0)},o(c){M(t.$$.fragment,c),p=!1},d(c){c&&x(e),U(t)}}}function Ge(i){let e,t,s,o,r,f,m,p;e=new Je({});let c=!i[2]&&me(i);function l(n){i[7](n)}function v(n){i[8](n)}let d={roomName:i[0].room};return i[2]!==void 0&&(d.isJoined=i[2]),i[3]!==void 0&&(d.jimmiApi=i[3]),r=new Te({props:d}),i[6](r),B.push(()=>re(r,"isJoined",l)),B.push(()=>re(r,"jimmiApi",v)),r.$on("message",i[5]),{c(){H(e.$$.fragment),t=A(),c&&c.c(),s=A(),o=w("div"),H(r.$$.fragment),ae(o,"hidden",!i[2])},m(n,a){V(e,n,a),j(n,t,a),c&&c.m(n,a),j(n,s,a),j(n,o,a),V(r,o,null),p=!0},p(n,[a]){n[2]?c&&(ie(),M(c,1,1,()=>{c=null}),se()):c?(c.p(n,a),a&4&&N(c,1)):(c=me(n),c.c(),N(c,1),c.m(s.parentNode,s));const u={};a&1&&(u.roomName=n[0].room),!f&&a&4&&(f=!0,u.isJoined=n[2],ce(()=>f=!1)),!m&&a&8&&(m=!0,u.jimmiApi=n[3],ce(()=>m=!1)),r.$set(u),a&4&&ae(o,"hidden",!n[2])},i(n){p||(N(e.$$.fragment,n),N(c),N(r.$$.fragment,n),p=!0)},o(n){M(e.$$.fragment,n),M(c),M(r.$$.fragment,n),p=!1},d(n){U(e,n),n&&x(t),c&&c.d(n),n&&x(s),n&&x(o),i[6](null),U(r)}}}function Re(i,e,t){let s;Z(i,ee,n=>t(4,s=n));let{params:o}=e,r,f,m;const p={};function c(n){if(n.detail.text.startsWith("!")){const[a]=n.detail.text.split(" ");a in p&&p[a](n.detail)}}ne(()=>{const n={hosts:{domain:o.instance,muc:`conference.${o.instance}`},bosh:`https://${o.instance}/http-bind?room=${o.room}`};r.joinConference(n);const a=new RegExp(/^\w+$/);W.plugins.map(u=>new u(m)).forEach(u=>{Object.keys(u.commands||{}).forEach(g=>{const E=`!${g}`;a.test(g)?E in p?console.warn(`Duplicate command: "${E}" provided by plugin "${u.meta.name}" is already used!`):p[E]=u.commands[g]:console.error(`Invalid command: "${g}" provided by plugin "${u.meta.name}" is not a valid command name!`)})})});function l(n){B[n?"unshift":"push"](()=>{r=n,t(1,r)})}function v(n){f=n,t(2,f)}function d(n){m=n,t(3,m)}return i.$$set=n=>{"params"in n&&t(0,o=n.params)},[o,r,f,m,s,c,l,v,d]}class Fe extends I{constructor(e){super();J(this,e,Re,Ge,$,{params:0})}}export{Fe as default};
