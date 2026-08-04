"use strict";var zo=Object.create;var zt=Object.defineProperty;var Po=Object.getOwnPropertyDescriptor;var Ro=Object.getOwnPropertyNames;var Oo=Object.getPrototypeOf,No=Object.prototype.hasOwnProperty;var In=(t,e)=>()=>(t&&(e=t(t=0)),e);var ge=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),Dr=(t,e)=>{for(var n in e)zt(t,n,{get:e[n],enumerable:!0})},Ir=(t,e,n,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of Ro(e))!No.call(t,i)&&i!==n&&zt(t,i,{get:()=>e[i],enumerable:!(r=Po(e,i))||r.enumerable});return t};var Ce=(t,e,n)=>(n=t!=null?zo(Oo(t)):{},Ir(e||!t||!t.__esModule?zt(n,"default",{value:t,enumerable:!0}):n,t)),Ho=t=>Ir(zt({},"__esModule",{value:!0}),t);function ra(t,e){return na(t,e||{},0,0)}function ia(t,e){return Ko(t,{i:2},e&&e.out,e&&e.dictionary)}function _r(t,e){if(e){for(var n=new N(t.length),r=0;r<t.length;++r)n[r]=t.charCodeAt(r);return n}if(Ur)return Ur.encode(t);for(var i=t.length,o=new N(t.length+(t.length>>1)),a=0,s=function(c){o[a++]=c},r=0;r<i;++r){if(a+5>o.length){var l=new N(a+8+(i-r<<1));l.set(o),o=l}var d=t.charCodeAt(r);d<128||e?s(d):d<2048?(s(192|d>>6),s(128|d&63)):d>55295&&d<57344?(d=65536+(d&1047552)|t.charCodeAt(++r)&1023,s(240|d>>18),s(128|d>>12&63),s(128|d>>6&63),s(128|d&63)):(s(224|d>>12),s(128|d>>6&63),s(128|d&63))}return vt(o,0,a)}function sa(t,e){if(e){for(var n="",r=0;r<t.length;r+=16384)n+=String.fromCharCode.apply(null,t.subarray(r,r+16384));return n}else{if(Pn)return Pn.decode(t);var i=aa(t),o=i.s,n=i.r;return n.length&&te(8),o}}function Gr(t,e){e||(e={});var n={},r=[];jr(t,"",n,e);var i=0,o=0;for(var a in n){var s=n[a],l=s[0],d=s[1],c=d.level==0?0:8,f=_r(a),u=f.length,p=d.comment,m=p&&_r(p),g=m&&m.length,h=Rn(d.extra);u>65535&&te(11);var v=c?ra(l,d):l,y=v.length,w=ta();w.p(l),r.push(Zr(d,{size:l.length,crc:w.d(),c:v,f,m,u:u!=a.length||m&&p.length!=g,o:i,compression:c})),i+=30+u+h+y,o+=76+2*(u+h)+(g||0)+y}for(var x=new N(o+22),E=i,k=o-i,I=0;I<r.length;++I){var f=r[I];Fr(x,f.o,f,f.f,f.u,f.c.length);var C=30+f.f.length+Rn(f.extra);x.set(f.c,f.o+C),Fr(x,i,f,f.f,f.u,f.c.length,f.o,f.m),i+=16+C+(f.m?f.m.length:0)}return ua(x,i,r.length,k,E),x}function qr(t,e){for(var n={},r=t.length-22;we(t,r)!=101010256;--r)(!r||t.length-r>65558)&&te(13);var i=be(t,r+8);if(!i)return{};var o=we(t,r+16),a=o==4294967295||i==65535;if(a){var s=we(t,r-12);a=we(t,s)==101075792,a&&(i=we(t,s+32),o=we(t,s+48))}for(var l=e&&e.filter,d=0;d<i;++d){var c=ca(t,o,a),f=c[0],u=c[1],p=c[2],m=c[3],g=c[4],h=c[5],v=la(t,h);o=g,(!l||l({name:m,size:u,originalSize:p,compression:f}))&&(f?f==8?n[m]=ia(t.subarray(v,v+u),{out:new N(p)}):te(14,"unknown compression type "+f):n[m]=vt(t,v,v+u))}return n}var Br,Zo,jo,N,le,On,Pt,Rt,_n,zr,Pr,Rr,Fn,Or,Go,$r,Bn,De,_,xe,Be,_,_,_,_,gt,_,qo,Wo,Xo,Vo,$n,ve,Ln,Nn,vt,Qo,te,Ko,Ie,ht,An,zn,Lr,mt,Nr,Ar,Jo,Hr,Yo,ea,ta,na,Zr,be,we,Un,Q,jr,Ur,Pn,oa,aa,la,ca,da,Rn,Fr,ua,Wr=In(()=>{Br=require("module"),Zo=(0,Br.createRequire)("/");try{jo=Zo("worker_threads").Worker}catch{}N=Uint8Array,le=Uint16Array,On=Int32Array,Pt=new N([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Rt=new N([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),_n=new N([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),zr=function(t,e){for(var n=new le(31),r=0;r<31;++r)n[r]=e+=1<<t[r-1];for(var i=new On(n[30]),r=1;r<30;++r)for(var o=n[r];o<n[r+1];++o)i[o]=o-n[r]<<5|r;return{b:n,r:i}},Pr=zr(Pt,2),Rr=Pr.b,Fn=Pr.r;Rr[28]=258,Fn[258]=28;Or=zr(Rt,0),Go=Or.b,$r=Or.r,Bn=new le(32768);for(_=0;_<32768;++_)De=(_&43690)>>1|(_&21845)<<1,De=(De&52428)>>2|(De&13107)<<2,De=(De&61680)>>4|(De&3855)<<4,Bn[_]=((De&65280)>>8|(De&255)<<8)>>1;xe=function(t,e,n){for(var r=t.length,i=0,o=new le(e);i<r;++i)t[i]&&++o[t[i]-1];var a=new le(e);for(i=1;i<e;++i)a[i]=a[i-1]+o[i-1]<<1;var s;if(n){s=new le(1<<e);var l=15-e;for(i=0;i<r;++i)if(t[i])for(var d=i<<4|t[i],c=e-t[i],f=a[t[i]-1]++<<c,u=f|(1<<c)-1;f<=u;++f)s[Bn[f]>>l]=d}else for(s=new le(r),i=0;i<r;++i)t[i]&&(s[i]=Bn[a[t[i]-1]++]>>15-t[i]);return s},Be=new N(288);for(_=0;_<144;++_)Be[_]=8;for(_=144;_<256;++_)Be[_]=9;for(_=256;_<280;++_)Be[_]=7;for(_=280;_<288;++_)Be[_]=8;gt=new N(32);for(_=0;_<32;++_)gt[_]=5;qo=xe(Be,9,0),Wo=xe(Be,9,1),Xo=xe(gt,5,0),Vo=xe(gt,5,1),$n=function(t){for(var e=t[0],n=1;n<t.length;++n)t[n]>e&&(e=t[n]);return e},ve=function(t,e,n){var r=e/8|0;return(t[r]|t[r+1]<<8)>>(e&7)&n},Ln=function(t,e){var n=e/8|0;return(t[n]|t[n+1]<<8|t[n+2]<<16)>>(e&7)},Nn=function(t){return(t+7)/8|0},vt=function(t,e,n){return(e==null||e<0)&&(e=0),(n==null||n>t.length)&&(n=t.length),new N(t.subarray(e,n))},Qo=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],te=function(t,e,n){var r=new Error(e||Qo[t]);if(r.code=t,Error.captureStackTrace&&Error.captureStackTrace(r,te),!n)throw r;return r},Ko=function(t,e,n,r){var i=t.length,o=r?r.length:0;if(!i||e.f&&!e.l)return n||new N(0);var a=!n,s=a||e.i!=2,l=e.i;a&&(n=new N(i*3));var d=function(he){var me=n.length;if(he>me){var Fe=new N(Math.max(me*2,he));Fe.set(n),n=Fe}},c=e.f||0,f=e.p||0,u=e.b||0,p=e.l,m=e.d,g=e.m,h=e.n,v=i*8;do{if(!p){c=ve(t,f,1);var y=ve(t,f+1,3);if(f+=3,y)if(y==1)p=Wo,m=Vo,g=9,h=5;else if(y==2){var k=ve(t,f,31)+257,I=ve(t,f+10,15)+4,C=k+ve(t,f+5,31)+1;f+=14;for(var T=new N(C),L=new N(19),F=0;F<I;++F)L[_n[F]]=ve(t,f+F*3,7);f+=I*3;for(var P=$n(L),j=(1<<P)-1,D=xe(L,P,1),F=0;F<C;){var S=D[ve(t,f,j)];f+=S&15;var w=S>>4;if(w<16)T[F++]=w;else{var A=0,R=0;for(w==16?(R=3+ve(t,f,3),f+=2,A=T[F-1]):w==17?(R=3+ve(t,f,7),f+=3):w==18&&(R=11+ve(t,f,127),f+=7);R--;)T[F++]=A}}var q=T.subarray(0,k),H=T.subarray(k);g=$n(q),h=$n(H),p=xe(q,g,1),m=xe(H,h,1)}else te(1);else{var w=Nn(f)+4,x=t[w-4]|t[w-3]<<8,E=w+x;if(E>i){l&&te(0);break}s&&d(u+x),n.set(t.subarray(w,E),u),e.b=u+=x,e.p=f=E*8,e.f=c;continue}if(f>v){l&&te(0);break}}s&&d(u+131072);for(var Ee=(1<<g)-1,ee=(1<<h)-1,ae=f;;ae=f){var A=p[Ln(t,f)&Ee],K=A>>4;if(f+=A&15,f>v){l&&te(0);break}if(A||te(2),K<256)n[u++]=K;else if(K==256){ae=f,p=null;break}else{var J=K-254;if(K>264){var F=K-257,O=Pt[F];J=ve(t,f,(1<<O)-1)+Rr[F],f+=O}var se=m[Ln(t,f)&ee],ne=se>>4;se||te(3),f+=se&15;var H=Go[ne];if(ne>3){var O=Rt[ne];H+=Ln(t,f)&(1<<O)-1,f+=O}if(f>v){l&&te(0);break}s&&d(u+131072);var fe=u+J;if(u<H){var Te=o-H,Se=Math.min(H,fe);for(Te+u<0&&te(3);u<Se;++u)n[u]=r[Te+u]}for(;u<fe;++u)n[u]=n[u-H]}}e.l=p,e.p=ae,e.b=u,e.f=c,p&&(c=1,e.m=g,e.d=m,e.n=h)}while(!c);return u!=n.length&&a?vt(n,0,u):n.subarray(0,u)},Ie=function(t,e,n){n<<=e&7;var r=e/8|0;t[r]|=n,t[r+1]|=n>>8},ht=function(t,e,n){n<<=e&7;var r=e/8|0;t[r]|=n,t[r+1]|=n>>8,t[r+2]|=n>>16},An=function(t,e){for(var n=[],r=0;r<t.length;++r)t[r]&&n.push({s:r,f:t[r]});var i=n.length,o=n.slice();if(!i)return{t:Hr,l:0};if(i==1){var a=new N(n[0].s+1);return a[n[0].s]=1,{t:a,l:1}}n.sort(function(E,k){return E.f-k.f}),n.push({s:-1,f:25001});var s=n[0],l=n[1],d=0,c=1,f=2;for(n[0]={s:-1,f:s.f+l.f,l:s,r:l};c!=i-1;)s=n[n[d].f<n[f].f?d++:f++],l=n[d!=c&&n[d].f<n[f].f?d++:f++],n[c++]={s:-1,f:s.f+l.f,l:s,r:l};for(var u=o[0].s,r=1;r<i;++r)o[r].s>u&&(u=o[r].s);var p=new le(u+1),m=zn(n[c-1],p,0);if(m>e){var r=0,g=0,h=m-e,v=1<<h;for(o.sort(function(k,I){return p[I.s]-p[k.s]||k.f-I.f});r<i;++r){var y=o[r].s;if(p[y]>e)g+=v-(1<<m-p[y]),p[y]=e;else break}for(g>>=h;g>0;){var w=o[r].s;p[w]<e?g-=1<<e-p[w]++-1:++r}for(;r>=0&&g;--r){var x=o[r].s;p[x]==e&&(--p[x],++g)}m=e}return{t:new N(p),l:m}},zn=function(t,e,n){return t.s==-1?Math.max(zn(t.l,e,n+1),zn(t.r,e,n+1)):e[t.s]=n},Lr=function(t){for(var e=t.length;e&&!t[--e];);for(var n=new le(++e),r=0,i=t[0],o=1,a=function(l){n[r++]=l},s=1;s<=e;++s)if(t[s]==i&&s!=e)++o;else{if(!i&&o>2){for(;o>138;o-=138)a(32754);o>2&&(a(o>10?o-11<<5|28690:o-3<<5|12305),o=0)}else if(o>3){for(a(i),--o;o>6;o-=6)a(8304);o>2&&(a(o-3<<5|8208),o=0)}for(;o--;)a(i);o=1,i=t[s]}return{c:n.subarray(0,r),n:e}},mt=function(t,e){for(var n=0,r=0;r<e.length;++r)n+=t[r]*e[r];return n},Nr=function(t,e,n){var r=n.length,i=Nn(e+2);t[i]=r&255,t[i+1]=r>>8,t[i+2]=t[i]^255,t[i+3]=t[i+1]^255;for(var o=0;o<r;++o)t[i+o+4]=n[o];return(i+4+r)*8},Ar=function(t,e,n,r,i,o,a,s,l,d,c){Ie(e,c++,n),++i[256];for(var f=An(i,15),u=f.t,p=f.l,m=An(o,15),g=m.t,h=m.l,v=Lr(u),y=v.c,w=v.n,x=Lr(g),E=x.c,k=x.n,I=new le(19),C=0;C<y.length;++C)++I[y[C]&31];for(var C=0;C<E.length;++C)++I[E[C]&31];for(var T=An(I,7),L=T.t,F=T.l,P=19;P>4&&!L[_n[P-1]];--P);var j=d+5<<3,D=mt(i,Be)+mt(o,gt)+a,S=mt(i,u)+mt(o,g)+a+14+3*P+mt(I,L)+2*I[16]+3*I[17]+7*I[18];if(l>=0&&j<=D&&j<=S)return Nr(e,c,t.subarray(l,l+d));var A,R,q,H;if(Ie(e,c,1+(S<D)),c+=2,S<D){A=xe(u,p,0),R=u,q=xe(g,h,0),H=g;var Ee=xe(L,F,0);Ie(e,c,w-257),Ie(e,c+5,k-1),Ie(e,c+10,P-4),c+=14;for(var C=0;C<P;++C)Ie(e,c+3*C,L[_n[C]]);c+=3*P;for(var ee=[y,E],ae=0;ae<2;++ae)for(var K=ee[ae],C=0;C<K.length;++C){var J=K[C]&31;Ie(e,c,Ee[J]),c+=L[J],J>15&&(Ie(e,c,K[C]>>5&127),c+=K[C]>>12)}}else A=qo,R=Be,q=Xo,H=gt;for(var C=0;C<s;++C){var O=r[C];if(O>255){var J=O>>18&31;ht(e,c,A[J+257]),c+=R[J+257],J>7&&(Ie(e,c,O>>23&31),c+=Pt[J]);var se=O&31;ht(e,c,q[se]),c+=H[se],se>3&&(ht(e,c,O>>5&8191),c+=Rt[se])}else ht(e,c,A[O]),c+=R[O]}return ht(e,c,A[256]),c+R[256]},Jo=new On([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),Hr=new N(0),Yo=function(t,e,n,r,i,o){var a=o.z||t.length,s=new N(r+a+5*(1+Math.ceil(a/7e3))+i),l=s.subarray(r,s.length-i),d=o.l,c=(o.r||0)&7;if(e){c&&(l[0]=o.r>>3);for(var f=Jo[e-1],u=f>>13,p=f&8191,m=(1<<n)-1,g=o.p||new le(32768),h=o.h||new le(m+1),v=Math.ceil(n/3),y=2*v,w=function(Dn){return(t[Dn]^t[Dn+1]<<v^t[Dn+2]<<y)&m},x=new On(25e3),E=new le(288),k=new le(32),I=0,C=0,T=o.i||0,L=0,F=o.w||0,P=0;T+2<a;++T){var j=w(T),D=T&32767,S=h[j];if(g[D]=S,h[j]=D,F<=T){var A=a-T;if((I>7e3||L>24576)&&(A>423||!d)){c=Ar(t,l,0,x,E,k,C,L,P,T-P,c),L=I=C=0,P=T;for(var R=0;R<286;++R)E[R]=0;for(var R=0;R<30;++R)k[R]=0}var q=2,H=0,Ee=p,ee=D-S&32767;if(A>2&&j==w(T-ee))for(var ae=Math.min(u,A)-1,K=Math.min(32767,T),J=Math.min(258,A);ee<=K&&--Ee&&D!=S;){if(t[T+q]==t[T+q-ee]){for(var O=0;O<J&&t[T+O]==t[T+O-ee];++O);if(O>q){if(q=O,H=ee,O>ae)break;for(var se=Math.min(ee,O-2),ne=0,R=0;R<se;++R){var fe=T-ee+R&32767,Te=g[fe],Se=fe-Te&32767;Se>ne&&(ne=Se,S=fe)}}}D=S,S=g[D],ee+=D-S&32767}if(H){x[L++]=268435456|Fn[q]<<18|$r[H];var he=Fn[q]&31,me=$r[H]&31;C+=Pt[he]+Rt[me],++E[257+he],++k[me],F=T+q,++I}else x[L++]=t[T],++E[t[T]]}}for(T=Math.max(T,F);T<a;++T)x[L++]=t[T],++E[t[T]];c=Ar(t,l,d,x,E,k,C,L,P,T-P,c),d||(o.r=c&7|l[c/8|0]<<3,c-=7,o.h=h,o.p=g,o.i=T,o.w=F)}else{for(var T=o.w||0;T<a+d;T+=65535){var Fe=T+65535;Fe>=a&&(l[c/8|0]=d,Fe=a),c=Nr(l,c+1,t.subarray(T,Fe))}o.i=a}return vt(s,0,r+Nn(c)+i)},ea=function(){for(var t=new Int32Array(256),e=0;e<256;++e){for(var n=e,r=9;--r;)n=(n&1&&-306674912)^n>>>1;t[e]=n}return t}(),ta=function(){var t=-1;return{p:function(e){for(var n=t,r=0;r<e.length;++r)n=ea[n&255^e[r]]^n>>>8;t=n},d:function(){return~t}}},na=function(t,e,n,r,i){if(!i&&(i={l:1},e.dictionary)){var o=e.dictionary.subarray(-32768),a=new N(o.length+t.length);a.set(o),a.set(t,o.length),t=a,i.w=o.length}return Yo(t,e.level==null?6:e.level,e.mem==null?i.l?Math.ceil(Math.max(8,Math.min(13,Math.log(t.length)))*1.5):20:12+e.mem,n,r,i)},Zr=function(t,e){var n={};for(var r in t)n[r]=t[r];for(var r in e)n[r]=e[r];return n},be=function(t,e){return t[e]|t[e+1]<<8},we=function(t,e){return(t[e]|t[e+1]<<8|t[e+2]<<16|t[e+3]<<24)>>>0},Un=function(t,e){return we(t,e)+we(t,e+4)*4294967296},Q=function(t,e,n){for(;n;++e)t[e]=n,n>>>=8};jr=function(t,e,n,r){for(var i in t){var o=t[i],a=e+i,s=r;Array.isArray(o)&&(s=Zr(r,o[1]),o=o[0]),o instanceof N?n[a]=[o,s]:(n[a+="/"]=[new N(0),s],jr(o,a,n,r))}},Ur=typeof TextEncoder<"u"&&new TextEncoder,Pn=typeof TextDecoder<"u"&&new TextDecoder,oa=0;try{Pn.decode(Hr,{stream:!0}),oa=1}catch{}aa=function(t){for(var e="",n=0;;){var r=t[n++],i=(r>127)+(r>223)+(r>239);if(n+i>t.length)return{s:e,r:vt(t,n-1)};i?i==3?(r=((r&15)<<18|(t[n++]&63)<<12|(t[n++]&63)<<6|t[n++]&63)-65536,e+=String.fromCharCode(55296|r>>10,56320|r&1023)):i&1?e+=String.fromCharCode((r&31)<<6|t[n++]&63):e+=String.fromCharCode((r&15)<<12|(t[n++]&63)<<6|t[n++]&63):e+=String.fromCharCode(r)}};la=function(t,e){return e+30+be(t,e+26)+be(t,e+28)},ca=function(t,e,n){var r=be(t,e+28),i=sa(t.subarray(e+46,e+46+r),!(be(t,e+8)&2048)),o=e+46+r,a=we(t,e+20),s=n&&a==4294967295?da(t,o):[a,we(t,e+24),we(t,e+42)],l=s[0],d=s[1],c=s[2];return[be(t,e+10),l,d,i,o+be(t,e+30)+be(t,e+32),c]},da=function(t,e){for(;be(t,e)!=1;e+=4+be(t,e+2));return[Un(t,e+12),Un(t,e+4),Un(t,e+20)]},Rn=function(t){var e=0;if(t)for(var n in t){var r=t[n].length;r>65535&&te(9),e+=r+4}return e},Fr=function(t,e,n,r,i,o,a,s){var l=r.length,d=n.extra,c=s&&s.length,f=Rn(d);Q(t,e,a!=null?33639248:67324752),e+=4,a!=null&&(t[e++]=20,t[e++]=n.os),t[e]=20,e+=2,t[e++]=n.flag<<1|(o<0&&8),t[e++]=i&&8,t[e++]=n.compression&255,t[e++]=n.compression>>8;var u=new Date(n.mtime==null?Date.now():n.mtime),p=u.getFullYear()-1980;if((p<0||p>119)&&te(10),Q(t,e,p<<25|u.getMonth()+1<<21|u.getDate()<<16|u.getHours()<<11|u.getMinutes()<<5|u.getSeconds()>>1),e+=4,o!=-1&&(Q(t,e,n.crc),Q(t,e+4,o<0?-o-2:o),Q(t,e+8,n.size)),Q(t,e+12,l),Q(t,e+14,f),e+=16,a!=null&&(Q(t,e,c),Q(t,e+6,n.attrs),Q(t,e+10,a),e+=14),t.set(r,e),e+=l,f)for(var m in d){var g=d[m],h=g.length;Q(t,e,+m),Q(t,e+2,h),t.set(g,e+4),e+=4+h}return c&&(t.set(s,e),e+=c),e},ua=function(t,e,n,r,i){Q(t,e,101010256),Q(t,e+8,n),Q(t,e+10,n),Q(t,e+12,r),Q(t,e+16,i)}});function Qr(t,e){for(var n=[],r=+!e,i=0,o=0;t.length;){var a=va(t,r||e);if(typeof a=="object"){for(r?(e=null,a.w.length==a.u&&(n.push(e=a.w),o+=a.u)):(n.push(e),a.e=0);!a.l;){var s=Ta(t,a,e);s||G(5),e?a.e=a.y:(n.push(s),o+=s.length,ha(a.w,0,s.length),a.w.set(s,a.w.length-s.length))}i=a.b+a.c*4}else i=a;t=t.subarray(i)}return Sa(n,o)}var fa,Z,Ot,pa,Nt,Hn,yt,ha,ma,G,Xr,ga,va,je,bt,wa,ya,ba,xa,Vr,Zn,ka,jn,Ma,wt,Ea,Ta,Sa,Kr=In(()=>{fa=ArrayBuffer,Z=Uint8Array,Ot=Uint16Array,pa=Int16Array,Nt=Int32Array,Hn=function(t,e,n){if(Z.prototype.slice)return Z.prototype.slice.call(t,e,n);(e==null||e<0)&&(e=0),(n==null||n>t.length)&&(n=t.length);var r=new Z(n-e);return r.set(t.subarray(e,n)),r},yt=function(t,e,n,r){if(Z.prototype.fill)return Z.prototype.fill.call(t,e,n,r);for((n==null||n<0)&&(n=0),(r==null||r>t.length)&&(r=t.length);n<r;++n)t[n]=e;return t},ha=function(t,e,n,r){if(Z.prototype.copyWithin)return Z.prototype.copyWithin.call(t,e,n,r);for((n==null||n<0)&&(n=0),(r==null||r>t.length)&&(r=t.length);n<r;)t[e++]=t[n++]},ma=["invalid zstd data","window size too large (>2046MB)","invalid block type","FSE accuracy too high","match distance too far back","unexpected EOF"],G=function(t,e,n){var r=new Error(e||ma[t]);if(r.code=t,Error.captureStackTrace&&Error.captureStackTrace(r,G),!n)throw r;return r},Xr=function(t,e,n){for(var r=0,i=0;r<n;++r)i|=t[e++]<<(r<<3);return i},ga=function(t,e){return(t[e]|t[e+1]<<8|t[e+2]<<16|t[e+3]<<24)>>>0},va=function(t,e){var n=t[0]|t[1]<<8|t[2]<<16;if(n==3126568&&t[3]==253){var r=t[4],i=r>>5&1,o=r>>2&1,a=r&3,s=r>>6;r&8&&G(0);var l=6-i,d=a==3?4:a,c=Xr(t,l,d);l+=d;var f=s?1<<s:i,u=Xr(t,l,f)+(s==1&&256),p=u;if(!i){var m=1<<10+(t[5]>>3);p=m+(m>>3)*(t[5]&7)}p>2145386496&&G(1);var g=new Z((e==1?u||p:e?0:p)+12);return g[0]=1,g[4]=4,g[8]=8,{b:l+f,y:0,l:0,d:c,w:e&&e!=1?e:g.subarray(12),e:p,o:new Nt(g.buffer,0,3),u,c:o,m:Math.min(131072,p)}}else if((n>>4|t[3]<<20)==25481893)return ga(t,4)+8;G(0)},je=function(t){for(var e=0;1<<e<=t;++e);return e-1},bt=function(t,e,n){var r=(e<<3)+4,i=(t[e]&15)+5;i>n&&G(3);for(var o=1<<i,a=o,s=-1,l=-1,d=-1,c=o,f=new fa(512+(o<<2)),u=new pa(f,0,256),p=new Ot(f,0,256),m=new Ot(f,512,o),g=512+(o<<1),h=new Z(f,g,o),v=new Z(f,g+o);s<255&&a>0;){var y=je(a+1),w=r>>3,x=(1<<y+1)-1,E=(t[w]|t[w+1]<<8|t[w+2]<<16)>>(r&7)&x,k=(1<<y)-1,I=x-a-1,C=E&k;if(C<I?(r+=y,E=C):(r+=y+1,E>k&&(E-=I)),u[++s]=--E,E==-1?(a+=E,h[--c]=s):a-=E,!E)do{var T=r>>3;l=(t[T]|t[T+1]<<8)>>(r&7)&3,r+=2,s+=l}while(l==3)}(s>255||a)&&G(0);for(var L=0,F=(o>>1)+(o>>3)+3,P=o-1,j=0;j<=s;++j){var D=u[j];if(D<1){p[j]=-D;continue}for(d=0;d<D;++d){h[L]=j;do L=L+F&P;while(L>=c)}}for(L&&G(0),d=0;d<o;++d){var S=p[h[d]]++,A=v[d]=i-je(S);m[d]=(S<<A)-o}return[r+7>>3,{b:i,s:h,n:v,t:m}]},wa=function(t,e){var n=0,r=-1,i=new Z(292),o=t[e],a=i.subarray(0,256),s=i.subarray(256,268),l=new Ot(i.buffer,268);if(o<128){var d=bt(t,e+1,6),c=d[0],f=d[1];e+=o;var u=c<<3,p=t[e];p||G(0);for(var m=0,g=0,h=f.b,v=h,y=(++e<<3)-8+je(p);y-=h,!(y<u);){var w=y>>3;if(m+=(t[w]|t[w+1]<<8)>>(y&7)&(1<<h)-1,a[++r]=f.s[m],y-=v,y<u)break;w=y>>3,g+=(t[w]|t[w+1]<<8)>>(y&7)&(1<<v)-1,a[++r]=f.s[g],h=f.n[m],m=f.t[m],v=f.n[g],g=f.t[g]}++r>255&&G(0)}else{for(r=o-127;n<r;n+=2){var x=t[++e];a[n]=x>>4,a[n+1]=x&15}++e}var E=0;for(n=0;n<r;++n){var k=a[n];k>11&&G(0),E+=k&&1<<k-1}var I=je(E)+1,C=1<<I,T=C-E;for(T&T-1&&G(0),a[r++]=je(T)+1,n=0;n<r;++n){var k=a[n];++s[a[n]=k&&I+1-k]}var L=new Z(C<<1),F=L.subarray(0,C),P=L.subarray(C);for(l[I]=0,n=I;n>0;--n){var j=l[n];yt(P,n,j,l[n-1]=j+s[n]*(1<<I-n))}for(l[0]!=C&&G(0),n=0;n<r;++n){var D=a[n];if(D){var S=l[D];yt(F,n,S,l[D]=S+(1<<I-D))}}return[e,{n:P,b:I,s:F}]},ya=bt(new Z([81,16,99,140,49,198,24,99,12,33,196,24,99,102,102,134,70,146,4]),0,6)[1],ba=bt(new Z([33,20,196,24,99,140,33,132,16,66,8,33,132,16,66,8,33,68,68,68,68,68,68,68,68,36,9]),0,6)[1],xa=bt(new Z([32,132,16,66,102,70,68,68,68,68,36,73,2]),0,5)[1],Vr=function(t,e){for(var n=t.length,r=new Nt(n),i=0;i<n;++i)r[i]=e,e+=1<<t[i];return r},Zn=new Z(new Nt([0,0,0,0,16843009,50528770,134678020,202050057,269422093]).buffer,0,36),ka=Vr(Zn,0),jn=new Z(new Nt([0,0,0,0,0,0,0,0,16843009,50528770,117769220,185207048,252579084,16]).buffer,0,53),Ma=Vr(jn,3),wt=function(t,e,n){var r=t.length,i=e.length,o=t[r-1],a=(1<<n.b)-1,s=-n.b;o||G(0);for(var l=0,d=n.b,c=(r<<3)-8+je(o)-d,f=-1;c>s&&f<i;){var u=c>>3,p=(t[u]|t[u+1]<<8|t[u+2]<<16)>>(c&7);l=(l<<d|p)&a,e[++f]=n.s[l],c-=d=n.n[l]}(c!=s||f+1!=i)&&G(0)},Ea=function(t,e,n){var r=6,i=e.length,o=i+3>>2,a=o<<1,s=o+a;wt(t.subarray(r,r+=t[0]|t[1]<<8),e.subarray(0,o),n),wt(t.subarray(r,r+=t[2]|t[3]<<8),e.subarray(o,a),n),wt(t.subarray(r,r+=t[4]|t[5]<<8),e.subarray(a,s),n),wt(t.subarray(r),e.subarray(s),n)},Ta=function(t,e,n){var r,i=e.b,o=t[i],a=o>>1&3;e.l=o&1;var s=o>>3|t[i+1]<<5|t[i+2]<<13,l=(i+=3)+s;if(a==1)return i>=t.length?void 0:(e.b=i+1,n?(yt(n,t[i],e.y,e.y+=s),n):yt(new Z(s),t[i]));if(!(l>t.length)){if(a==0)return e.b=l,n?(n.set(t.subarray(i,l),e.y),e.y+=s,n):Hn(t,i,l);if(a==2){var d=t[i],c=d&3,f=d>>2&3,u=d>>4,p=0,m=0;c<2?f&1?u|=t[++i]<<4|(f&2&&t[++i]<<12):u=d>>3:(m=f,f<2?(u|=(t[++i]&63)<<4,p=t[i]>>6|t[++i]<<2):f==2?(u|=t[++i]<<4|(t[++i]&3)<<12,p=t[i]>>2|t[++i]<<6):(u|=t[++i]<<4|(t[++i]&63)<<12,p=t[i]>>6|t[++i]<<2|t[++i]<<10)),++i;var g=n?n.subarray(e.y,e.y+e.m):new Z(e.m),h=g.length-u;if(c==0)g.set(t.subarray(i,i+=u),h);else if(c==1)yt(g,t[i++],h);else{var v=e.h;if(c==2){var y=wa(t,i);p+=i-(i=y[0]),e.h=v=y[1]}else v||G(0);(m?Ea:wt)(t.subarray(i,i+=p),g.subarray(h),v)}var w=t[i++];if(w){w==255?w=(t[i++]|t[i++]<<8)+32512:w>127&&(w=w-128<<8|t[i++]);var x=t[i++];x&3&&G(0);for(var E=[ba,xa,ya],k=2;k>-1;--k){var I=x>>(k<<1)+2&3;if(I==1){var C=new Z([0,0,t[i++]]);E[k]={s:C.subarray(2,3),n:C.subarray(0,1),t:new Ot(C.buffer,0,1),b:0}}else I==2?(r=bt(t,i,9-(k&1)),i=r[0],E[k]=r[1]):I==3&&(e.t||G(0),E[k]=e.t[k])}var T=e.t=E,L=T[0],F=T[1],P=T[2],j=t[l-1];j||G(0);var D=(l<<3)-8+je(j)-P.b,S=D>>3,A=0,R=(t[S]|t[S+1]<<8)>>(D&7)&(1<<P.b)-1;S=(D-=F.b)>>3;var q=(t[S]|t[S+1]<<8)>>(D&7)&(1<<F.b)-1;S=(D-=L.b)>>3;var H=(t[S]|t[S+1]<<8)>>(D&7)&(1<<L.b)-1;for(++w;--w;){var Ee=P.s[R],ee=P.n[R],ae=L.s[H],K=L.n[H],J=F.s[q],O=F.n[q];S=(D-=J)>>3;var se=1<<J,ne=se+((t[S]|t[S+1]<<8|t[S+2]<<16|t[S+3]<<24)>>>(D&7)&se-1);S=(D-=jn[ae])>>3;var fe=Ma[ae]+((t[S]|t[S+1]<<8|t[S+2]<<16)>>(D&7)&(1<<jn[ae])-1);S=(D-=Zn[Ee])>>3;var Te=ka[Ee]+((t[S]|t[S+1]<<8|t[S+2]<<16)>>(D&7)&(1<<Zn[Ee])-1);if(S=(D-=ee)>>3,R=P.t[R]+((t[S]|t[S+1]<<8)>>(D&7)&(1<<ee)-1),S=(D-=K)>>3,H=L.t[H]+((t[S]|t[S+1]<<8)>>(D&7)&(1<<K)-1),S=(D-=O)>>3,q=F.t[q]+((t[S]|t[S+1]<<8)>>(D&7)&(1<<O)-1),ne>3)e.o[2]=e.o[1],e.o[1]=e.o[0],e.o[0]=ne-=3;else{var Se=ne-(Te!=0);Se?(ne=Se==3?e.o[0]-1:e.o[Se],Se>1&&(e.o[2]=e.o[1]),e.o[1]=e.o[0],e.o[0]=ne):ne=e.o[0]}for(var k=0;k<Te;++k)g[A+k]=g[h+k];A+=Te,h+=Te;var he=A-ne;if(he<0){var me=-he,Fe=e.e+he;me>fe&&(me=fe);for(var k=0;k<me;++k)g[A+k]=e.w[Fe+k];A+=me,fe-=me,he=0}for(var k=0;k<fe;++k)g[A+k]=g[he+k];A+=fe}if(A!=h)for(;h<g.length;)g[A++]=g[h++];else A=g.length;n?e.y+=A:g=Hn(g,0,A)}else if(n){if(e.y+=u,h)for(var k=0;k<u;++k)g[k]=g[h+k]}else h&&(g=Hn(g,h));return e.b=l,g}G(2)}},Sa=function(t,e){if(t.length==1)return t[0];for(var n=new Z(e),r=0,i=0;r<t.length;++r){var o=t[r];n.set(o,i),i+=o.length}return n}});var di=ge(Wt=>{"use strict";Object.defineProperty(Wt,"__esModule",{value:!0});Wt.Module=void 0;var b=typeof b<"u"?b:{};Wt.Module=b;var kt={},ze;for(ze in b)b.hasOwnProperty(ze)&&(kt[ze]=b[ze]);var Ca=[],nt=b.printErr||console.warn.bind(console);for(ze in kt)kt.hasOwnProperty(ze)&&(b[ze]=kt[ze]);var Gn=(t,e)=>{throw e};kt=null;b.arguments&&(Ca=b.arguments);b.thisProgram&&(thisProgram=b.thisProgram);b.quit&&(Gn=b.quit);typeof WebAssembly!="object"&&qn("no native wasm support detected");var Ht,Gt=!1,qt,Jr,Da;function Yr(){var t=Ht.buffer;b.HEAP8=Da=new Int8Array(t),b.HEAPU8=Jr=new Uint8Array(t)}var ei=[],ti=[],ni=[],Ia=!1;function $a(){if(b.preRun)for(typeof b.preRun=="function"&&(b.preRun=[b.preRun]);b.preRun.length;)Ua(b.preRun.shift());Wn(ei)}function La(){Ia=!0,Wn(ti)}function Aa(){if(b.postRun)for(typeof b.postRun=="function"&&(b.postRun=[b.postRun]);b.postRun.length;)Fa(b.postRun.shift());Wn(ni)}function Ua(t){ei.unshift(t)}function _a(t){ti.unshift(t)}function Fa(t){ni.unshift(t)}var Ge=0,Mt=null;function Ba(t){var e;Ge++,(e=b.monitorRunDependencies)===null||e===void 0||e.call(b,Ge)}function za(t){var e;if(Ge--,(e=b.monitorRunDependencies)===null||e===void 0||e.call(b,Ge),Ge==0&&Mt){var n=Mt;Mt=null,n()}}function qn(t){var e;(e=b.onAbort)===null||e===void 0||e.call(b,t),t="Aborted("+t+")",nt(t),Gt=!0,t+=". Build with -sASSERTIONS for more info.";var n=new WebAssembly.RuntimeError(t);throw n}function Pa(){return{a:Ya}}function Ra(t){return fetch(t,{credentials:"same-origin"}).then(function(e){if(!e.ok)throw"failed to load wasm binary file at '"+t+"'";return e.arrayBuffer()})}function Oa(t){var e=Pa();function n(s,l){return X=s.exports,Ht=X.f,Yr(),_a(X.g),za("wasm-instantiate"),X}Ba("wasm-instantiate");function r(s){n(s.instance)}function i(s){return Ra(t).then(function(l){var d=WebAssembly.instantiate(l,e);return d}).then(s,function(l){nt("failed to asynchronously prepare wasm: "+l),qn(l)})}function o(){return t&&t.byteLength>0?WebAssembly.instantiate(t,e).then(r,function(s){nt("wasm compile failed: "+s)}):typeof WebAssembly.instantiateStreaming=="function"&&typeof t=="string"&&typeof fetch=="function"?fetch(t,{credentials:"same-origin"}).then(function(s){var l=WebAssembly.instantiateStreaming(s,e);return l.then(r,function(d){return nt("wasm streaming compile failed: "+d),nt("falling back to ArrayBuffer instantiation"),i(r)})}):i(r)}if(b.instantiateWasm)try{var a=b.instantiateWasm(e,n);return a}catch(s){return nt("Module.instantiateWasm callback failed with error: "+s),!1}return o(),{}}var Zt=class{constructor(e){this.name="ExitStatus",this.message=`Program terminated with exit(${e})`,this.status=e}},Wn=t=>{for(;t.length>0;)t.shift()(b)},ri=b.noExitRuntime||!0,Na=()=>qn(""),ii=0,Ha=()=>{ri=!1,ii=0},xt={},oi=t=>{if(t instanceof Zt||t=="unwind")return qt;Gn(1,t)},ai=()=>ri||ii>0,si=t=>{var e;qt=t,ai()||((e=b.onExit)===null||e===void 0||e.call(b,t),Gt=!0),Gn(t,new Zt(t))},Za=(t,e)=>{qt=t,si(t)},ja=Za,Ga=()=>{if(!ai())try{ja(qt)}catch(t){oi(t)}},qa=t=>{if(!Gt)try{t(),Ga()}catch(e){oi(e)}},Wa=()=>performance.now(),Xa=(t,e)=>{if(xt[t]&&(clearTimeout(xt[t].id),delete xt[t]),!e)return 0;var n=setTimeout(()=>{delete xt[t],qa(()=>li(t,Wa()))},e);return xt[t]={id:n,timeout_ms:e},0},Va=()=>2147483648,Qa=(t,e)=>Math.ceil(t/e)*e,Ka=t=>{var e=Ht.buffer,n=(t-e.byteLength+65535)/65536|0;try{return Ht.grow(n),Yr(),1}catch{}},Ja=t=>{var e=Jr.length;t>>>=0;var n=Va();if(t>n)return!1;for(var r=1;r<=4;r*=2){var i=e*(1+.2/r);i=Math.min(i,t+100663296);var o=Math.min(n,Qa(Math.max(t,i),65536)),a=Ka(o);if(a)return!0}return!1},Ya={c:Na,b:Ha,d:Xa,e:Ja,a:si},X,es=b._ZSTD_isError=t=>(es=b._ZSTD_isError=X.h)(t),ts=b._ZSTD_compressBound=t=>(ts=b._ZSTD_compressBound=X.i)(t),ns=b._ZSTD_createCCtx=()=>(ns=b._ZSTD_createCCtx=X.j)(),rs=b._ZSTD_freeCCtx=t=>(rs=b._ZSTD_freeCCtx=X.k)(t),is=b._ZSTD_compress_usingDict=(t,e,n,r,i,o,a,s)=>(is=b._ZSTD_compress_usingDict=X.l)(t,e,n,r,i,o,a,s),os=b._ZSTD_compress=(t,e,n,r,i)=>(os=b._ZSTD_compress=X.m)(t,e,n,r,i),as=b._ZSTD_createDCtx=()=>(as=b._ZSTD_createDCtx=X.n)(),ss=b._ZSTD_freeDCtx=t=>(ss=b._ZSTD_freeDCtx=X.o)(t),ls=b._ZSTD_getFrameContentSize=(t,e)=>(ls=b._ZSTD_getFrameContentSize=X.p)(t,e),cs=b._ZSTD_decompress_usingDict=(t,e,n,r,i,o,a)=>(cs=b._ZSTD_decompress_usingDict=X.q)(t,e,n,r,i,o,a),ds=b._ZSTD_decompress=(t,e,n,r)=>(ds=b._ZSTD_decompress=X.r)(t,e,n,r),us=b._malloc=t=>(us=b._malloc=X.s)(t),fs=b._free=t=>(fs=b._free=X.t)(t),li=(t,e)=>(li=X.v)(t,e),jt;Mt=function t(){jt||ci(),jt||(Mt=t)};function ci(){if(Ge>0||($a(),Ge>0))return;function t(){var e;jt||(jt=!0,b.calledRun=!0,!Gt&&(La(),(e=b.onRuntimeInitialized)===null||e===void 0||e.call(b),Aa()))}b.setStatus?(b.setStatus("Running..."),setTimeout(()=>{setTimeout(()=>b.setStatus(""),1),t()},1)):t()}b.run=ci;if(b.preInit)for(typeof b.preInit=="function"&&(b.preInit=[b.preInit]);b.preInit.length>0;)b.preInit.pop()();b.init=Oa});var qe=ge(Pe=>{"use strict";var ps=Pe&&Pe.__awaiter||function(t,e,n,r){function i(o){return o instanceof n?o:new n(function(a){a(o)})}return new(n||(n=Promise))(function(o,a){function s(c){try{d(r.next(c))}catch(f){a(f)}}function l(c){try{d(r.throw(c))}catch(f){a(f)}}function d(c){c.done?o(c.value):i(c.value).then(s,l)}d((r=r.apply(t,e||[])).next())})};Object.defineProperty(Pe,"__esModule",{value:!0});Pe.Module=Pe.waitInitialized=void 0;var ui=di();Object.defineProperty(Pe,"Module",{enumerable:!0,get:function(){return ui.Module}});var hs=new Promise(t=>{ui.Module.onRuntimeInitialized=t}),ms=()=>ps(void 0,void 0,void 0,function*(){yield hs});Pe.waitInitialized=ms});var Et=ge(Xt=>{"use strict";Object.defineProperty(Xt,"__esModule",{value:!0});Xt.isError=void 0;var gs=qe(),vs=t=>{let e=gs.Module._ZSTD_isError;return e(t)};Xt.isError=vs});var fi=ge(Vt=>{"use strict";Object.defineProperty(Vt,"__esModule",{value:!0});Vt.decompress=void 0;var rt=qe(),ws=Et(),ys=(t,e)=>{let n=rt.Module._ZSTD_getFrameContentSize;return n(t,e)},bs=(t,e={defaultHeapSize:1024*1024})=>{let n=rt.Module._malloc,r=n(t.byteLength);rt.Module.HEAP8.set(t,r);let i=ys(r,t.byteLength),o=i===-1?e.defaultHeapSize:i,a=rt.Module._free,s=n(o);try{let l=rt.Module._ZSTD_decompress,d=l(s,o,r,t.byteLength);if((0,ws.isError)(d))throw new Error(`Failed to compress with code ${d}`);let c=new Uint8Array(rt.Module.HEAPU8.buffer,s,d).slice();return a(s,o),a(r,t.byteLength),c}catch(l){throw a(s,o),a(r,t.byteLength),l}};Vt.decompress=bs});var pi=ge(Qt=>{"use strict";Object.defineProperty(Qt,"__esModule",{value:!0});Qt.compress=void 0;var it=qe(),xs=Et(),ks=t=>{let e=it.Module._ZSTD_compressBound;return e(t)},Ms=(t,e)=>{let n=ks(t.byteLength),r=it.Module._malloc,i=r(n),o=r(t.byteLength);it.Module.HEAP8.set(t,o);let a=it.Module._free;try{let s=it.Module._ZSTD_compress,l=s(i,n,o,t.byteLength,e??3);if((0,xs.isError)(l))throw new Error(`Failed to compress with code ${l}`);let d=new Uint8Array(it.Module.HEAPU8.buffer,i,l).slice();return a(i,n),a(o,t.byteLength),d}catch(s){throw a(i,n),a(o,t.byteLength),s}};Qt.compress=Ms});var hi=ge(Re=>{"use strict";Object.defineProperty(Re,"__esModule",{value:!0});Re.decompressUsingDict=Re.freeDCtx=Re.createDCtx=void 0;var $e=qe(),Es=Et(),Ts=(t,e)=>{let n=$e.Module._ZSTD_getFrameContentSize;return n(t,e)},Ss=()=>$e.Module._ZSTD_createDCtx();Re.createDCtx=Ss;var Cs=t=>$e.Module._ZSTD_freeDCtx(t);Re.freeDCtx=Cs;var Ds=(t,e,n,r={defaultHeapSize:1024*1024})=>{let i=$e.Module._malloc,o=i(e.byteLength);$e.Module.HEAP8.set(e,o);let a=i(n.byteLength);$e.Module.HEAP8.set(n,a);let s=Ts(o,e.byteLength),l=s===-1?r.defaultHeapSize:s,d=$e.Module._free,c=i(l);try{let f=$e.Module._ZSTD_decompress_usingDict,u=f(t,c,l,o,e.byteLength,a,n.byteLength);if((0,Es.isError)(u))throw new Error(`Failed to compress with code ${u}`);let p=new Uint8Array($e.Module.HEAPU8.buffer,c,u).slice();return d(c,l),d(o,e.byteLength),d(a,n.byteLength),p}catch(f){throw d(c,l),d(o,e.byteLength),d(a,n.byteLength),f}};Re.decompressUsingDict=Ds});var mi=ge(Oe=>{"use strict";Object.defineProperty(Oe,"__esModule",{value:!0});Oe.compressUsingDict=Oe.freeCCtx=Oe.createCCtx=void 0;var Le=qe(),Is=Et(),$s=t=>{let e=Le.Module._ZSTD_compressBound;return e(t)},Ls=()=>Le.Module._ZSTD_createCCtx();Oe.createCCtx=Ls;var As=t=>Le.Module._ZSTD_freeCCtx(t);Oe.freeCCtx=As;var Us=(t,e,n,r)=>{let i=$s(e.byteLength),o=Le.Module._malloc,a=o(i),s=o(e.byteLength);Le.Module.HEAP8.set(e,s);let l=o(n.byteLength);Le.Module.HEAP8.set(n,l);let d=Le.Module._free;try{let c=Le.Module._ZSTD_compress_usingDict,f=c(t,a,i,s,e.byteLength,l,n.byteLength,r??3);if((0,Is.isError)(f))throw new Error(`Failed to compress with code ${f}`);let u=new Uint8Array(Le.Module.HEAPU8.buffer,a,f).slice();return d(a,i),d(s,e.byteLength),d(l,n.byteLength),u}catch(c){throw d(a,i),d(s,e.byteLength),d(l,n.byteLength),c}};Oe.compressUsingDict=Us});var vi=ge(re=>{"use strict";var _s=re&&re.__createBinding||(Object.create?function(t,e,n,r){r===void 0&&(r=n);var i=Object.getOwnPropertyDescriptor(e,n);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(t,r,i)}:function(t,e,n,r){r===void 0&&(r=n),t[r]=e[n]}),Kt=re&&re.__exportStar||function(t,e){for(var n in t)n!=="default"&&!Object.prototype.hasOwnProperty.call(e,n)&&_s(e,t,n)},Fs=re&&re.__awaiter||function(t,e,n,r){function i(o){return o instanceof n?o:new n(function(a){a(o)})}return new(n||(n=Promise))(function(o,a){function s(c){try{d(r.next(c))}catch(f){a(f)}}function l(c){try{d(r.throw(c))}catch(f){a(f)}}function d(c){c.done?o(c.value):i(c.value).then(s,l)}d((r=r.apply(t,e||[])).next())})};Object.defineProperty(re,"__esModule",{value:!0});re.init=void 0;var gi=qe(),Bs=()=>Fs(void 0,void 0,void 0,function*(){let{readFile:t}=require("fs/promises"),{resolve:e}=require("path"),n=yield t(e(__dirname,"./zstd.wasm"));gi.Module.init(n),yield(0,gi.waitInitialized)()});re.init=Bs;Kt(fi(),re);Kt(pi(),re);Kt(hi(),re);Kt(mi(),re)});var Xn=ge(ot=>{ot.hashU32=function(e){return e=e|0,e=e+2127912214+(e<<12)|0,e=e^-949894596^e>>>19,e=e+374761393+(e<<5)|0,e=e+-744332180^e<<9,e=e+-42973499+(e<<3)|0,e^-1252372727^e>>>16|0};ot.readU64=function(e,n){var r=0;return r|=e[n++]<<0,r|=e[n++]<<8,r|=e[n++]<<16,r|=e[n++]<<24,r|=e[n++]<<32,r|=e[n++]<<40,r|=e[n++]<<48,r|=e[n++]<<56,r};ot.readU32=function(e,n){var r=0;return r|=e[n++]<<0,r|=e[n++]<<8,r|=e[n++]<<16,r|=e[n++]<<24,r};ot.writeU32=function(e,n,r){e[n++]=r>>0&255,e[n++]=r>>8&255,e[n++]=r>>16&255,e[n++]=r>>24&255};ot.imul=function(e,n){var r=e>>>16,i=e&65535,o=n>>>16,a=n&65535;return i*a+(r*a+i*o<<16)|0}});var ki=ge(xi=>{var ke=Xn(),We=2654435761,Xe=2246822519,wi=3266489917,zs=668265263,yi=374761393;function Jt(t,e){return t=t|0,e=e|0,t>>>(32-e|0)|t<<e|0}function bi(t,e,n){return t=t|0,e=e|0,n=n|0,ke.imul(t>>>(32-e|0)|t<<e,n)|0}function Vn(t,e){return t=t|0,e=e|0,t>>>e^t|0}function Tt(t,e,n,r,i){return bi(ke.imul(e,n)+t,r,i)}function Ps(t,e,n){return bi(t+ke.imul(e[n],yi),11,We)}function Rs(t,e,n){return Tt(t,ke.readU32(e,n),wi,17,zs)}function Os(t,e,n){return[Tt(t[0],ke.readU32(e,n+0),Xe,13,We),Tt(t[1],ke.readU32(e,n+4),Xe,13,We),Tt(t[2],ke.readU32(e,n+8),Xe,13,We),Tt(t[3],ke.readU32(e,n+12),Xe,13,We)]}function Ns(t,e,n,r){var i,o;if(o=r,r>=16){for(i=[t+We+Xe,t+Xe,t,t-We];r>=16;)i=Os(i,e,n),n+=16,r-=16;i=Jt(i[0],1)+Jt(i[1],7)+Jt(i[2],12)+Jt(i[3],18)+o}else i=t+yi+r>>>0;for(;r>=4;)i=Rs(i,e,n),n+=4,r-=4;for(;r>0;)i=Ps(i,e,n),n++,r--;return i=Vn(ke.imul(Vn(ke.imul(Vn(i,15),Xe),13),wi),16),i>>>0}xi.hash=Ns});var Li=ge(V=>{var Hs=ki(),pe=Xn(),en=4,Zs=13,Mi=5,Qn=6,tn=65536,St=4,Yt=(1<<St)-1,js=4,at=(1<<js)-1,Ei=Ii(5<<20),Kn=qs(),Yn=407708164,Gs=4,Si=8,Ci=16,er=64,Jn=192,nn=2147483648,Ti=7,tr=4,Di=7,rn={4:65536,5:262144,6:1048576,7:4194304};function qs(){try{return new Uint32Array(tn)}catch{for(var t=new Array(tn),e=0;e<tn;e++)t[e]=0;return t}}function Ws(t){for(var e=0;e<tn;e++)Kn[e]=0}function Ii(t){try{return new Uint8Array(t)}catch{for(var e=new Array(t),n=0;n<t;n++)e[n]=0;return e}}function $i(t,e,n){if(typeof t.buffer!==void 0){if(Uint8Array.prototype.slice)return t.slice(e,n);var r=t.length;e=e|0,e=e<0?Math.max(r+e,0):Math.min(e,r),n=n===void 0?r:n|0,n=n<0?Math.max(r+n,0):Math.min(n,r);for(var i=new Uint8Array(n-e),o=e,a=0;o<n;)i[a++]=t[o++];return i}else return t.slice(e,n)}V.compressBound=function(e){return e+e/255+16|0};V.decompressBound=function(e){var n=0;if(pe.readU32(e,n)!==Yn)throw new Error("invalid magic number");n+=4;var r=e[n++];if((r&Jn)!==er)throw new Error("incompatible descriptor version "+(r&Jn));var i=(r&Ci)!==0,o=(r&Si)!==0,a=e[n++]>>tr&Di;if(rn[a]===void 0)throw new Error("invalid block size "+a);var s=rn[a];if(o)return pe.readU64(e,n);n++;for(var l=0;;){var d=pe.readU32(e,n);if(n+=4,d&nn?(d&=~nn,l+=d):l+=s,d===0)return l;i&&(n+=4),n+=d}};V.makeBuffer=Ii;V.decompressBlock=function(e,n,r,i,o){var a,s,l,d,c;for(l=r+i;r<l;){var f=e[r++],u=f>>4;if(u>0){if(u===15)for(;u+=e[r],e[r++]===255;);for(d=r+u;r<d;)n[o++]=e[r++]}if(r>=l)break;if(a=f&15,s=e[r++]|e[r++]<<8,a===15)for(;a+=e[r],e[r++]===255;);for(a+=en,c=o-s,d=c+a;c<d;)n[o++]=n[c++]|0}return o};V.compressBlock=function(e,n,r,i,o){var a,s,l,d,c,f,u,p,m;if(u=0,p=i+r,s=r,i>=Zs)for(var g=(1<<Qn)+3;r+en<p-Mi;){var h=pe.readU32(e,r),v=pe.hashU32(h)>>>0;if(v=(v>>16^v)>>>0&65535,a=o[v]-1,o[v]=r+1,a<0||r-a>>>16>0||pe.readU32(e,a)!==h){c=g++>>Qn,r+=c;continue}for(g=(1<<Qn)+3,f=r-s,d=r-a,r+=en,a+=en,l=r;r<p-Mi&&e[r]===e[a];)r++,a++;l=r-l;var y=l<Yt?l:Yt;if(f>=at){for(n[u++]=(at<<St)+y,m=f-at;m>=255;m-=255)n[u++]=255;n[u++]=m}else n[u++]=(f<<St)+y;for(var w=0;w<f;w++)n[u++]=e[s+w];if(n[u++]=d,n[u++]=d>>8,l>=Yt){for(m=l-Yt;m>=255;m-=255)n[u++]=255;n[u++]=m}s=r}if(s===0)return 0;if(f=p-s,f>=at){for(n[u++]=at<<St,m=f-at;m>=255;m-=255)n[u++]=255;n[u++]=m}else n[u++]=f<<St;for(r=s;r<p;)n[u++]=e[r++];return u};V.decompressFrame=function(e,n){var r,i,o,a,s=0,l=0;if(pe.readU32(e,s)!==Yn)throw new Error("invalid magic number");if(s+=4,a=e[s++],(a&Jn)!==er)throw new Error("incompatible descriptor version");r=(a&Ci)!==0,i=(a&Gs)!==0,o=(a&Si)!==0;var d=e[s++]>>tr&Di;if(rn[d]===void 0)throw new Error("invalid block size");for(o&&(s+=8),s++;;){var c;if(c=pe.readU32(e,s),s+=4,c===0)break;if(r&&(s+=4),c&nn){c&=~nn;for(var f=0;f<c;f++)n[l++]=e[s++]}else l=V.decompressBlock(e,n,s,c,l),s+=c}return i&&(s+=4),l};V.compressFrame=function(e,n){var r=0;pe.writeU32(n,r,Yn),r+=4,n[r++]=er,n[r++]=Ti<<tr,n[r]=Hs.hash(0,n,4,r-4)>>8,r++;var i=rn[Ti],o=e.length,a=0;for(Ws(Kn);o>0;){var s=0,l=o>i?i:o;if(s=V.compressBlock(e,Ei,a,l,Kn),s>l||s===0){pe.writeU32(n,r,2147483648|l),r+=4;for(var d=a+l;a<d;)n[r++]=e[a++];o-=l}else{pe.writeU32(n,r,s),r+=4;for(var c=0;c<s;)n[r++]=Ei[c++];a+=l,o-=l}}return pe.writeU32(n,r,0),r+=4,r};V.decompress=function(e,n){var r,i;return n===void 0&&(n=V.decompressBound(e)),r=V.makeBuffer(n),i=V.decompressFrame(e,r),i!==n&&(r=$i(r,0,i)),r};V.compress=function(e,n){var r,i;return n===void 0&&(n=V.compressBound(e.length)),r=V.makeBuffer(n),i=V.compressFrame(e,r),i!==n&&(r=$i(r,0,i)),r}});var Qe={};Dr(Qe,{COMP_BR:()=>pr,COMP_LZ4:()=>fr,COMP_NONE:()=>Ct,COMP_ZIP:()=>dr,COMP_ZSTD:()=>ur,FIXED_HEADER_SIZE_V1:()=>st,MDOCX_MAGIC:()=>mn,MDOCX_MEDIA_URI_PREFIX:()=>sn,MarkdownBundleBuilder:()=>fo,MdocxBuilder:()=>vr,MediaBundleBuilder:()=>po,MediaResolver:()=>bl,SECTION_TYPE_MARKDOWN:()=>gn,SECTION_TYPE_MEDIA:()=>He,createBuilder:()=>Cl,createMediaIdRef:()=>yl,createSimpleDocument:()=>Sl,defaultReadLimits:()=>Yi,documentToMdocxBytes:()=>ml,documentToMdocxBytesAsync:()=>gl,extractMediaReferences:()=>uo,findUnresolvedReferences:()=>xl,initZstd:()=>to,isValidMdocx:()=>wl,isZstdCompressionAvailable:()=>Js,parseMediaReference:()=>ln,readMdocx:()=>pl,resolveMediaReference:()=>gr,validateMdocx:()=>vl,validateMdocxDetailed:()=>mr,writeMdocx:()=>sr,writeMdocxAsync:()=>lr});function Vs(t,e){if(t.byteLength!==e.byteLength)return!1;for(let n=0;n<t.byteLength;n++)if(t[n]!==e[n])return!1;return!0}function Qs(t){return new TextDecoder("utf-8",{fatal:!1}).decode(t)}function eo(t){return new TextEncoder().encode(t)}async function to(){an||(await(0,un.init)(),an=!0)}function Js(){return an}function Ys(t,e,n){if(n<0)throw new Error("expectedSize < 0");switch(t){case"none":return e.byteLength,e;case"br":{let r=(0,dn.brotliDecompressSync)(e);if(r.byteLength!==n)throw new Error(`Brotli size mismatch (got ${r.byteLength}, expected ${n})`);return r}case"zstd":{let r=Qr(e);if(r.byteLength!==n)throw new Error(`ZSTD size mismatch (got ${r.byteLength}, expected ${n})`);return r}case"lz4":{let r=(0,fn.decompress)(e);if(r.byteLength!==n)throw new Error(`LZ4 size mismatch (got ${r.byteLength}, expected ${n})`);return r}case"zip":{let r=qr(e),i=Object.keys(r);if(i.length!==1||i[0]!=="payload.gob")throw new Error("ZIP must contain exactly one file named payload.gob");let o=r["payload.gob"];if(!o)throw new Error("ZIP missing payload.gob");if(o.byteLength!==n)throw new Error(`ZIP size mismatch (got ${o.byteLength}, expected ${n})`);return o}}}function no(t,e){switch(t){case"none":return e;case"br":return(0,dn.brotliCompressSync)(e);case"zstd":{if(!an)throw new Error("ZSTD compression requires initialization. Call `await initZstd()` first, or use `compressPayloadAsync`.");return(0,un.compress)(e,Ks)}case"lz4":return(0,fn.compress)(e);case"zip":return Gr({"payload.gob":e})}}async function el(t,e){return t==="zstd"&&await to(),no(t,e)}function ce(t,e){if(t>BigInt(Number.MAX_SAFE_INTEGER))throw new Error(`${e} exceeds MAX_SAFE_INTEGER`);if(t<BigInt(Number.MIN_SAFE_INTEGER))throw new Error(`${e} below MIN_SAFE_INTEGER`);return Number(t)}function rl(t){for(let e of t)if(e!==0)return!1;return!0}function Me(t,e,n){let r=e.get(n);switch(r.kind){case"bool":return t.readGobUint()!==0n;case"int":return ce(t.readGobInt(),"int");case"uint":return ce(t.readGobUint(),"uint");case"float":{let i=t.readGobUint();if(i>0xffffffffffffffffn)throw new Error("float bits too large");let o=new ArrayBuffer(8),a=new DataView(o);return a.setBigUint64(0,i,!1),a.getFloat64(0,!1)}case"bytes":return t.readGobBytes();case"string":return t.readGobString();case"complex":{let i=Me(t,e,4),o=Me(t,e,4);return{real:i,imag:o}}case"interface":{let i=t.readGobString();if(i==="")return null;let o=ce(t.readGobInt(),"interface concrete type id");return{name:i,value:Me(t,e,o)}}case"array":{let i=ce(t.readGobUint(),"array len");if(i!==r.len)throw new Error(`Array length mismatch: got ${i}, expected ${r.len}`);if(e.get(r.elem).kind==="uint"&&r.len>0){let s=new Uint8Array(r.len);for(let l=0;l<r.len;l++){let d=ce(t.readGobUint(),"array uint elem");if(!Number.isInteger(d)||d<0||d>255)throw new Error("uint8 out of range");s[l]=d}return s}let a=[];for(let s=0;s<r.len;s++)a.push(Me(t,e,r.elem));return a}case"slice":{let i=ce(t.readGobUint(),"slice len");if(e.get(r.elem).kind==="uint"){let s=new Uint8Array(i);for(let l=0;l<i;l++){let d=ce(t.readGobUint(),"slice uint elem");if(!Number.isInteger(d)||d<0||d>255)throw new Error("uint8 out of range");s[l]=d}return s}let a=[];for(let s=0;s<i;s++)a.push(Me(t,e,r.elem));return a}case"map":{let i=ce(t.readGobUint(),"map len"),o={};for(let a=0;a<i;a++){let s=Me(t,e,r.key),l=Me(t,e,r.elem);if(typeof s!="string")throw new Error("Only string keys supported in this decoder");o[s]=l}return o}case"struct":{let i={},o=-1;for(;;){let a=ce(t.readGobUint(),"field delta");if(a===0)break;if(o+=a,o<0||o>=r.fields.length)throw new Error(`Struct field out of range: ${o} (have ${r.fields.length})`);let s=r.fields[o];i[s.name]=Me(t,e,s.typeId)}return i}}}function Ve(t,e,n,r){let i=e.get(n);switch(i.kind){case"bool":{t.writeGobUint(r?1n:0n);return}case"int":{if(typeof r!="number"||!Number.isFinite(r)||!Number.isInteger(r))throw new Error("Expected int number");t.writeGobInt(BigInt(r));return}case"uint":{if(typeof r!="number"||!Number.isFinite(r)||!Number.isInteger(r)||r<0)throw new Error("Expected uint number");t.writeGobUint(BigInt(r));return}case"float":{if(typeof r!="number"||!Number.isFinite(r))throw new Error("Expected float number");let o=new ArrayBuffer(8),a=new DataView(o);a.setFloat64(0,r,!1),t.writeGobUint(a.getBigUint64(0,!1));return}case"bytes":{if(!(r instanceof Uint8Array))throw new Error("Expected Uint8Array for bytes");t.writeGobBytes(r);return}case"string":{if(typeof r!="string")throw new Error("Expected string");t.writeGobString(r);return}case"complex":throw new Error("complex not supported for encoding");case"interface":throw new Error("interface not supported for encoding");case"array":{if(!(r instanceof Uint8Array)&&!Array.isArray(r))throw new Error("Expected array");t.writeGobUint(BigInt(i.len));let o=e.get(i.elem);if(r instanceof Uint8Array){if(r.byteLength!==i.len)throw new Error("Array byte length mismatch");if(o.kind!=="uint")throw new Error("Uint8Array arrays only supported for uint elements");for(let a of r)t.writeGobUint(BigInt(a));return}if(r.length!==i.len)throw new Error("Array length mismatch");for(let a of r)Ve(t,e,i.elem,a);return}case"slice":{let o=e.get(i.elem);if(r instanceof Uint8Array&&o.kind==="uint"){t.writeGobUint(BigInt(r.byteLength));for(let a of r)t.writeGobUint(BigInt(a));return}if(!Array.isArray(r))throw new Error("Expected slice as JS array");t.writeGobUint(BigInt(r.length));for(let a of r)Ve(t,e,i.elem,a);return}case"map":{if(!r||typeof r!="object"||Array.isArray(r))throw new Error("Expected map object");let o=Object.entries(r);t.writeGobUint(BigInt(o.length));for(let[a,s]of o)Ve(t,e,i.key,a),Ve(t,e,i.elem,s);return}case"struct":{if(!r||typeof r!="object"||Array.isArray(r))throw new Error("Expected struct object");let o=r,a=-1;for(let s=0;s<i.fields.length;s++){let l=i.fields[s],d=o[l.name],c=e.get(l.typeId),u=c.kind==="array";if(u||(d===void 0||c.kind==="string"&&d===""||(c.kind==="int"||c.kind==="uint")&&d===0||c.kind==="bytes"&&d instanceof Uint8Array&&d.byteLength===0||c.kind==="slice"&&Array.isArray(d)&&d.length===0?u=!1:u=!0),!u)continue;let p=s-a;t.writeGobUint(BigInt(p)),Ve(t,e,l.typeId,d),a=s}t.writeGobUint(0n);return}}}function Ui(t){let e=new ar;return e.writeGobUint(BigInt(t.byteLength)),e.writeBytes(t),e.concat()}function il(t,e){let n=new or(e);return Me(n,t,16)}function ol(t){let e=a=>{let s=t[a];if(s&&typeof s=="object"&&!Array.isArray(s))return s},n=e("ArrayT");if(n){let a=n.CommonType,s=Number(n.Elem),l=Number(n.Len);return{kind:"array",name:String(a?.Name??""),elem:s,len:l}}let r=e("SliceT");if(r){let a=r.CommonType,s=Number(r.Elem);return{kind:"slice",name:String(a?.Name??""),elem:s}}let i=e("StructT");if(i){let a=i.CommonType,s=i.Field;if(!Array.isArray(s))throw new Error("structType.Field must be an array");let l=s.map(d=>{if(!d||typeof d!="object"||Array.isArray(d))throw new Error("fieldType must be object");let c=d;return{name:String(c.Name),typeId:Number(c.Id)}});return{kind:"struct",name:String(a?.Name??""),fields:l}}let o=e("MapT");if(o){let a=o.CommonType,s=Number(o.Key),l=Number(o.Elem);return{kind:"map",name:String(a?.Name??""),key:s,elem:l}}throw new Error("Unsupported wireType (no ArrayT/SliceT/StructT/MapT)")}function _i(t){let e=new ro(!0),n=new or(t);for(;n.remaining()>0;){let r=n.readGobUint(),i=ce(r,"message length"),o=n.readBytes(i),a=new or(o),s=ce(a.readGobInt(),"message type id");if(s<0){let d=-s;if(d<64)throw new Error(`Received reserved/builtin type id: ${d}`);let c=il(e,a.readBytes(a.remaining()));e.set(d,ol(c));continue}let l=Me(a,e,s);return{typeId:s,value:l}}throw new Error("No gob value found")}function Fi(t,e,n){let r=new ro(!0);for(let[c,f]of e.entries())r.set(c,f);let i=[],o=[...e.entries()].sort((c,f)=>c[0]-f[0]);for(let[c,f]of o){let u=al(c,f),p=new ar;p.writeGobInt(BigInt(-c)),Ve(p,r,16,u),i.push(Ui(p.concat()))}let a=new ar;a.writeGobInt(BigInt(t)),Ve(a,r,t,n),i.push(Ui(a.concat()));let s=i.reduce((c,f)=>c+f.byteLength,0),l=new Uint8Array(s),d=0;for(let c of i)l.set(c,d),d+=c.byteLength;return l}function al(t,e){let n=i=>({Name:i,Id:t}),r={};if(e.kind==="array")return r.ArrayT={CommonType:n(e.name??""),Elem:e.elem,Len:e.len},r;if(e.kind==="slice")return r.SliceT={CommonType:n(e.name??""),Elem:e.elem},r;if(e.kind==="map")return r.MapT={CommonType:n(e.name??""),Key:e.key,Elem:e.elem},r;if(e.kind==="struct")return r.StructT={CommonType:n(e.name??""),Field:e.fields.map(i=>({Name:i.name,Id:i.typeId}))},r;throw new Error(`Type kind ${e.kind} cannot be sent as a user type`)}function sl(t){if(t.byteLength!==32)throw new Error("sha256 must be 32 bytes");return rl(t)?void 0:t}function Bi(t,e){if(typeof t!="string")throw new Error(`${e} must be a string`);return t}function zi(t,e){if(typeof t!="number"||!Number.isFinite(t))throw new Error(`${e} must be a number`);return t}function Pi(t,e){if(!(t instanceof Uint8Array))throw new Error(`${e} must be bytes`);return t}function nr(t){if(t!==void 0){if(typeof t!="string")throw new Error("Expected optional string");return t.length?t:void 0}}function cl(t){if(t===void 0)return;if(!Array.isArray(t))throw new Error("Expected optional string array");let e=t.map(n=>{if(typeof n!="string")throw new Error("Expected string in array");return n});return e.length?e:void 0}function Ri(t){if(t===void 0)return;if(!t||typeof t!="object"||Array.isArray(t))throw new Error("Expected optional map");let e={};for(let[n,r]of Object.entries(t)){if(typeof r!="string")throw new Error("Expected string map values");e[n]=r}return Object.keys(e).length?e:void 0}function dl(t){let e=t.readBytes(8),n=t.readU16LE(),r=t.readU16LE(),i=t.readU32LE(),o=t.readU32LE(),a=t.readU32LE(),s=t.readU64LE();return{magic:e,version:n,headerFlags:r,fixedHeaderSize:i,metadataLength:o,reserved0:a,reserved1:s}}function Oi(t){let e=t.readU16LE(),n=t.readU16LE(),r=t.readU64LE(),i=t.readU32LE();return{sectionType:e,sectionFlags:n,payloadLen:r,reserved:i}}function ul(t){let e=t&15,n=(t&hr)!==0;switch(e){case Ct:return{alg:"none",hasUncompressedLen:n};case dr:return{alg:"zip",hasUncompressedLen:n};case ur:return{alg:"zstd",hasUncompressedLen:n};case fr:return{alg:"lz4",hasUncompressedLen:n};case pr:return{alg:"br",hasUncompressedLen:n};default:throw new Error(`Unknown compression value: 0x${e.toString(16)}`)}}function fl(t,e,n){if(e.metadataLength===0)return;if(e.metadataLength>n.maxMetadataLength)throw new Error(`MetadataLength too large: ${e.metadataLength}`);let r=t.readBytes(e.metadataLength);if(!(e.headerFlags&cr))return{raw:r};let i=Qs(r),o=JSON.parse(i);if(!o||typeof o!="object"||Array.isArray(o))throw new Error("Metadata JSON must be an object");return o}function Ni(t,e,n,r,i){if(e.sectionType!==r)throw new Error(`Unexpected section type: ${e.sectionType}, expected ${r}`);if(e.reserved!==0)throw new Error("Section reserved must be 0");if(e.payloadLen>BigInt(n.maxSectionPayloadLen))throw new Error(`Section payloadLen too large: ${e.payloadLen}`);let o=Number(e.payloadLen);if(!Number.isSafeInteger(o)||o<0)throw new Error("payloadLen is not a safe JS integer");let a=t.readBytes(o),{alg:s,hasUncompressedLen:l}=ul(e.sectionFlags);if(s==="none"){if(l)throw new Error("HAS_UNCOMPRESSED_LEN must be 0 for COMP_NONE");return a}if(!l)throw new Error("Compressed payloads MUST set HAS_UNCOMPRESSED_LEN");if(a.byteLength<8)throw new Error("Compressed payload missing UncompressedLen prefix");let c=new DataView(a.buffer,a.byteOffset,a.byteLength).getBigUint64(0,!0);if(c>BigInt(i))throw new Error(`UncompressedLen too large: ${c}`);let f=Number(c);if(!Number.isSafeInteger(f)||f<0)throw new Error("UncompressedLen is not a safe JS integer");let u=a.subarray(8);return Ys(s,u,f)}async function pl(t,e=Yi){let n=new Xs(t);if(n.remaining()<st)throw new Error("File too small");let r=dl(n);if(!Vs(r.magic,mn))throw new Error("Bad magic");if(r.fixedHeaderSize!==st)throw new Error(`FixedHeaderSize must be ${st}`);if(r.version!==1)throw new Error(`Unsupported version: ${r.version}`);if(r.reserved0!==0||r.reserved1!==0n)throw new Error("Reserved header fields must be 0");let i=fl(n,r,e);if(n.remaining()<Ai)throw new Error("Missing markdown section header");let o=Oi(n),a=Ni(n,o,e,gn,e.maxMarkdownUncompressed);if(n.remaining()<Ai)throw new Error("Missing media section header");let s=Oi(n),l=new Uint8Array;if(s.payloadLen===0n){if(s.sectionType!==He)throw new Error(`Unexpected section type: ${s.sectionType}, expected ${He}`);if(s.reserved!==0)throw new Error("Section reserved must be 0");l=new Uint8Array}else l=Ni(n,s,e,He,e.maxMediaUncompressed);let d=new ll,c=d.decodeMarkdownBundle(a),f=l.byteLength?d.decodeMediaBundle(l):{bundleVersion:1,items:[]};return i?{header:r,metadata:i,markdown:c,media:f}:{header:r,markdown:c,media:f}}function Vi(){let t=new Map;return t.set(Gi,{kind:"slice",name:"[]string",elem:Ne}),t.set(ir,{kind:"map",name:"map[string]string",key:Ne,elem:Ne}),t.set(Zi,{kind:"struct",name:"MarkdownFile",fields:[{name:"Path",typeId:Ne},{name:"Content",typeId:Hi},{name:"MediaRefs",typeId:Gi},{name:"Attributes",typeId:ir}]}),t.set(ji,{kind:"slice",name:"[]MarkdownFile",elem:Zi}),t.set(io,{kind:"struct",name:"MarkdownBundle",fields:[{name:"BundleVersion",typeId:rr},{name:"RootPath",typeId:Ne},{name:"Files",typeId:ji}]}),t.set(Xi,{kind:"array",name:"[32]uint8",elem:rr,len:32}),t.set(qi,{kind:"struct",name:"MediaItem",fields:[{name:"ID",typeId:Ne},{name:"Path",typeId:Ne},{name:"MimeType",typeId:Ne},{name:"Data",typeId:Hi},{name:"SHA256",typeId:Xi},{name:"Attributes",typeId:ir}]}),t.set(Wi,{kind:"slice",name:"[]MediaItem",elem:qi}),t.set(oo,{kind:"struct",name:"MediaBundle",fields:[{name:"BundleVersion",typeId:rr},{name:"Items",typeId:Wi}]}),t}function so(t){switch(t){case"none":return Ct;case"zip":return dr;case"zstd":return ur;case"lz4":return fr;case"br":return pr}}function lo(t,e,n){t.writeBytes(mn),t.writeU16LE(1),t.writeU16LE(n),t.writeU32LE(st),t.writeU32LE(e),t.writeU32LE(0),t.writeU64LE(0n)}function Qi(t,e,n,r){let o=so(n),a;if(n==="none")a=r;else{o|=hr;let s=no(n,r),l=new vn;l.writeU64LE(BigInt(r.byteLength)),l.writeBytes(s),a=l.concat()}t.writeU16LE(e),t.writeU16LE(o),t.writeU64LE(BigInt(a.byteLength)),t.writeU32LE(0),t.writeBytes(a)}async function Ki(t,e,n,r){let o=so(n),a;if(n==="none")a=r;else{o|=hr;let s=await el(n,r),l=new vn;l.writeU64LE(BigInt(r.byteLength)),l.writeBytes(s),a=l.concat()}t.writeU16LE(e),t.writeU16LE(o),t.writeU64LE(BigInt(a.byteLength)),t.writeU32LE(0),t.writeBytes(a)}function hl(t){return(0,hn.createHash)("sha256").update(t).digest()}function co(t){let e=t.items.map(n=>n.sha256?n:{...n,sha256:hl(n.data)});return{...t,items:e}}function sr(t,e,n={}){let r=new ao,i=r.encodeMarkdownBundle(t),o=n.autoPopulateSha256!==!1?co(e):e,a=o.items.length?r.encodeMediaBundle(o):new Uint8Array,s=n.metadata?eo(JSON.stringify(n.metadata)):new Uint8Array,l=n.metadata?cr:0,d=new vn;return lo(d,s.byteLength,l),s.byteLength&&d.writeBytes(s),Qi(d,gn,n.markdownCompression??"zip",i),a.byteLength===0?(d.writeU16LE(He),d.writeU16LE(Ct),d.writeU64LE(0n),d.writeU32LE(0)):Qi(d,He,n.mediaCompression??"zip",a),d.concat()}async function lr(t,e,n={}){let r=new ao,i=r.encodeMarkdownBundle(t),o=n.autoPopulateSha256!==!1?co(e):e,a=o.items.length?r.encodeMediaBundle(o):new Uint8Array,s=n.metadata?eo(JSON.stringify(n.metadata)):new Uint8Array,l=n.metadata?cr:0,d=new vn;return lo(d,s.byteLength,l),s.byteLength&&d.writeBytes(s),await Ki(d,gn,n.markdownCompression??"zip",i),a.byteLength===0?(d.writeU16LE(He),d.writeU16LE(Ct),d.writeU64LE(0n),d.writeU32LE(0)):await Ki(d,He,n.mediaCompression??"zip",a),d.concat()}function ml(t,e={}){return t.metadata?sr(t.markdown,t.media,{...e,metadata:t.metadata}):sr(t.markdown,t.media,e)}async function gl(t,e={}){return t.metadata?lr(t.markdown,t.media,{...e,metadata:t.metadata}):lr(t.markdown,t.media,e)}function Ji(t){if(!t||t.startsWith("/"))return!1;let e=t.split("/");return!(e.some(n=>n==="..")||e.some(n=>n.length===0))}function on(t){return Buffer.from(t).toString("hex")}function mr(t,e={}){let n=[],r={verifyHashes:!0,checkPaths:!0,checkDuplicates:!0,warnOnMissingOptional:!1,includeInfo:!1,...e},i=(c,f,u,p)=>{if(c==="info"&&!r.includeInfo)return;let m={severity:c,message:f};u!==void 0&&(m.path=u),p!==void 0&&(m.details=p),n.push(m)};t.markdown.bundleVersion!==1&&i("error","markdown.bundleVersion must be 1","markdown.bundleVersion"),t.markdown.files.length||i("error","markdown.files must be non-empty","markdown.files");let o=new Set;t.markdown.files.forEach((c,f)=>{let u=`markdown.files[${f}]`;r.checkPaths&&!Ji(c.path)&&i("error",`Invalid markdown path: "${c.path}"`,`${u}.path`,{path:c.path}),r.checkDuplicates&&(o.has(c.path)&&i("error",`Duplicate markdown path: "${c.path}"`,`${u}.path`),o.add(c.path)),r.warnOnMissingOptional&&(c.mediaRefs?.length||i("info","No media references",`${u}.mediaRefs`))}),t.media.bundleVersion!==1&&i("error","media.bundleVersion must be 1","media.bundleVersion");let a=new Set;t.media.items.forEach((c,f)=>{let u=`media.items[${f}]`;if(c.id||i("error","MediaItem.id must be non-empty",`${u}.id`),r.checkDuplicates&&(a.has(c.id)&&i("error",`Duplicate media ID: "${c.id}"`,`${u}.id`),a.add(c.id)),r.checkPaths&&c.path&&!Ji(c.path)&&i("error",`Invalid media path: "${c.path}"`,`${u}.path`,{path:c.path}),r.verifyHashes&&c.sha256)if(c.sha256.byteLength!==32)i("error",`MediaItem.sha256 must be 32 bytes for id="${c.id}"`,`${u}.sha256`);else{let p=(0,hn.createHash)("sha256").update(c.data).digest();on(p)!==on(c.sha256)&&i("error",`MediaItem.sha256 mismatch for id="${c.id}"`,`${u}.sha256`,{stored:on(c.sha256),computed:on(p)})}r.warnOnMissingOptional&&(c.mimeType||i("warning",`Missing MIME type for id="${c.id}"`,`${u}.mimeType`),c.sha256||i("warning",`Missing SHA256 hash for id="${c.id}"`,`${u}.sha256`))});let s={markdownFileCount:t.markdown.files.length,mediaItemCount:t.media.items.length,totalMarkdownBytes:t.markdown.files.reduce((c,f)=>c+f.content.byteLength,0),totalMediaBytes:t.media.items.reduce((c,f)=>c+f.data.byteLength,0)},l=n.filter(c=>c.severity==="error").length,d=n.filter(c=>c.severity==="warning").length;return{valid:l===0,issues:n,errorCount:l,warningCount:d,stats:s}}function vl(t){return mr(t).issues.filter(n=>n.severity==="error").map(n=>n.message)}function wl(t){return mr(t).valid}function ln(t){if(t){if(t.startsWith(sn)){let e=t.slice(sn.length);return e?{type:"id",id:e}:void 0}if(!t.includes("://"))return{type:"path",path:t}}}function yl(t){return`${sn}${t}`}function gr(t,e,n){let r=ln(t);if(!r)return;if(r.type==="id")return e.items.find(o=>o.id===r.id);let i=cn(r.path,n);return e.items.find(o=>o.path&&cn(o.path)===i)}function cn(t,e){if(e&&!t.startsWith("/")){let i=e.includes("/")?e.substring(0,e.lastIndexOf("/")):"";t=i?`${i}/${t}`:t}let n=t.split("/").filter(i=>i&&i!=="."),r=[];for(let i of n)i===".."?r.pop():r.push(i);return r.join("/")}function uo(t){let e=typeof t=="string"?t:new TextDecoder().decode(t),n=new Set,r=/!?\[([^\]]*)\]\(([^)]+)\)/g,i;for(;(i=r.exec(e))!==null;){let a=i[2];if(a){let s=a.split(/\s+/)[0];s&&ln(s)&&n.add(s)}}let o=/<img[^>]+src=["']([^"']+)["']/gi;for(;(i=o.exec(e))!==null;){let a=i[1];a&&ln(a)&&n.add(a)}return[...n]}function xl(t,e){let n=uo(t.content),r=[];for(let i of n)gr(i,e,t.path)||r.push(i);return r}function kl(t){return typeof t=="string"?new TextEncoder().encode(t):t}function Ml(t){return(0,hn.createHash)("sha256").update(t).digest()}function El(t){let e=t.split(".").pop()?.toLowerCase();return e?{png:"image/png",jpg:"image/jpeg",jpeg:"image/jpeg",gif:"image/gif",webp:"image/webp",svg:"image/svg+xml",ico:"image/x-icon",bmp:"image/bmp",mp3:"audio/mpeg",wav:"audio/wav",ogg:"audio/ogg",mp4:"video/mp4",webm:"video/webm",pdf:"application/pdf",json:"application/json",xml:"application/xml",zip:"application/zip",txt:"text/plain",css:"text/css",js:"application/javascript",html:"text/html",md:"text/markdown",markdown:"text/markdown"}[e]??"application/octet-stream":"application/octet-stream"}function Tl(t){return t.replace(/[^a-zA-Z0-9_-]/g,"_").replace(/_+/g,"_").replace(/^_|_$/g,"")}function Sl(t,e,n){let r=new vr().addMarkdown(t,e).root(t);return n&&r.setMetadata(n),r.build()}function Cl(){return new vr}var dn,un,fn,pn,hn,Yi,mn,st,cr,gn,He,Ai,Ct,dr,ur,fr,pr,hr,Xs,vn,Ks,an,tl,nl,or,ar,ro,ll,rr,Hi,Ne,io,Zi,ji,Gi,ir,oo,qi,Wi,Xi,ao,sn,bl,fo,po,vr,Ke=In(()=>{dn=require("zlib");Wr();Kr();un=Ce(vi(),1),fn=Ce(Li(),1),pn=require("util"),hn=require("crypto"),Yi={maxMetadataLength:1024*1024,maxSectionPayloadLen:1024*1024*1024,maxMarkdownUncompressed:256*1024*1024,maxMediaUncompressed:2*1024*1024*1024},mn=Uint8Array.from([77,68,79,67,88,13,10,26]),st=32,cr=1,gn=1,He=2,Ai=16,Ct=0,dr=1,ur=2,fr=3,pr=4,hr=16,Xs=class{view;buf;offset=0;constructor(t){this.buf=t,this.view=new DataView(t.buffer,t.byteOffset,t.byteLength)}remaining(){return this.buf.byteLength-this.offset}readBytes(t){if(t<0)throw new Error("readBytes: negative length");if(this.offset+t>this.buf.byteLength)throw new Error(`Unexpected EOF (need ${t}, have ${this.remaining()})`);let e=this.buf.subarray(this.offset,this.offset+t);return this.offset+=t,e}readU16LE(){let t=this.view.getUint16(this.offset,!0);return this.offset+=2,t}readU32LE(){let t=this.view.getUint32(this.offset,!0);return this.offset+=4,t}readU64LE(){let t=this.view.getBigUint64(this.offset,!0);return this.offset+=8,t}},vn=class{chunks=[];writeBytes(t){this.chunks.push(t)}writeU16LE(t){let e=new Uint8Array(2);new DataView(e.buffer).setUint16(0,t,!0),this.chunks.push(e)}writeU32LE(t){let e=new Uint8Array(4);new DataView(e.buffer).setUint32(0,t,!0),this.chunks.push(e)}writeU64LE(t){let e=new Uint8Array(8);new DataView(e.buffer).setBigUint64(0,t,!0),this.chunks.push(e)}concat(){let t=this.chunks.reduce((r,i)=>r+i.byteLength,0),e=new Uint8Array(t),n=0;for(let r of this.chunks)e.set(r,n),n+=r.byteLength;return e}};Ks=3,an=!1;tl=new pn.TextDecoder,nl=new pn.TextEncoder,or=class{constructor(t){this.bytes=t}off=0;remaining(){return this.bytes.byteLength-this.off}readByte(){if(this.off>=this.bytes.byteLength)throw new Error("Unexpected EOF");return this.bytes[this.off++]}readBytes(t){if(t<0)throw new Error("Invalid length");if(this.off+t>this.bytes.byteLength)throw new Error("Unexpected EOF");let e=this.bytes.subarray(this.off,this.off+t);return this.off+=t,e}readGobUint(){let t=this.readByte();if(t<=127)return BigInt(t);let e=256-t,n=0n;for(let r=0;r<e;r++)n=n<<8n|BigInt(this.readByte());return n}readGobInt(){let t=this.readGobUint();return(t&1n)===0n?t>>1n:~(t>>1n)}readGobString(){let t=this.readGobUint(),e=ce(t,"string length"),n=this.readBytes(e);return tl.decode(n)}readGobBytes(){let t=this.readGobUint(),e=ce(t,"bytes length");return this.readBytes(e)}},ar=class{chunks=[];writeByte(t){let e=new Uint8Array(1);e[0]=t&255,this.chunks.push(e)}writeBytes(t){this.chunks.push(t)}writeGobUint(t){if(t<0n)throw new Error("uint must be non-negative");if(t<=0x7fn){this.writeByte(Number(t));return}let e=[],n=t;for(;n>0n;)e.push(Number(n&0xffn)),n>>=8n;if(e.reverse(),e.length>255)throw new Error("uint too large");this.writeByte(256-e.length),this.writeBytes(Uint8Array.from(e))}writeGobInt(t){if(t<0n){let e=~t<<1n|1n;this.writeGobUint(e)}else{let e=t<<1n;this.writeGobUint(e)}}writeGobString(t){let e=nl.encode(t);this.writeGobUint(BigInt(e.byteLength)),this.writeBytes(e)}writeGobBytes(t){this.writeGobUint(BigInt(t.byteLength)),this.writeBytes(t)}concat(){let t=this.chunks.reduce((r,i)=>r+i.byteLength,0),e=new Uint8Array(t),n=0;for(let r of this.chunks)e.set(r,n),n+=r.byteLength;return e}};ro=class{types=new Map;constructor(t){t&&(this.types.set(1,{kind:"bool"}),this.types.set(2,{kind:"int"}),this.types.set(3,{kind:"uint"}),this.types.set(4,{kind:"float"}),this.types.set(5,{kind:"bytes"}),this.types.set(6,{kind:"string"}),this.types.set(7,{kind:"complex"}),this.types.set(8,{kind:"interface"}),this.types.set(18,{kind:"struct",name:"CommonType",fields:[{name:"Name",typeId:6},{name:"Id",typeId:2}]}),this.types.set(17,{kind:"struct",name:"arrayType",fields:[{name:"CommonType",typeId:18},{name:"Elem",typeId:2},{name:"Len",typeId:2}]}),this.types.set(19,{kind:"struct",name:"sliceType",fields:[{name:"CommonType",typeId:18},{name:"Elem",typeId:2}]}),this.types.set(21,{kind:"struct",name:"fieldType",fields:[{name:"Name",typeId:6},{name:"Id",typeId:2}]}),this.types.set(22,{kind:"slice",name:"[]fieldType",elem:21}),this.types.set(20,{kind:"struct",name:"structType",fields:[{name:"CommonType",typeId:18},{name:"Field",typeId:22}]}),this.types.set(23,{kind:"struct",name:"mapType",fields:[{name:"CommonType",typeId:18},{name:"Key",typeId:2},{name:"Elem",typeId:2}]}),this.types.set(16,{kind:"struct",name:"wireType",fields:[{name:"ArrayT",typeId:17},{name:"SliceT",typeId:19},{name:"StructT",typeId:20},{name:"MapT",typeId:23}]}))}get(t){let e=this.types.get(t);if(!e)throw new Error(`Unknown gob type id: ${t}`);return e}has(t){return this.types.has(t)}set(t,e){this.types.set(t,e)}};ll=class{decodeMarkdownBundle(t){let n=_i(t).value;if(!n||typeof n!="object"||Array.isArray(n))throw new Error("MarkdownBundle gob must decode to an object");let r=n,i=zi(r.BundleVersion,"BundleVersion"),o=nr(r.RootPath),a=r.Files;if(!Array.isArray(a))throw new Error("Files must be an array");let s=a.map((l,d)=>{if(!l||typeof l!="object"||Array.isArray(l))throw new Error(`Files[${d}] must be an object`);let c=l,f=Bi(c.Path,"Path"),u=c.Content===void 0?new Uint8Array:Pi(c.Content,"Content"),p=cl(c.MediaRefs),m=Ri(c.Attributes);return{path:f,content:u,...p?{mediaRefs:p}:{},...m?{attributes:m}:{}}});return{bundleVersion:i,...o?{rootPath:o}:{},files:s}}decodeMediaBundle(t){let n=_i(t).value;if(!n||typeof n!="object"||Array.isArray(n))throw new Error("MediaBundle gob must decode to an object");let r=n,i=zi(r.BundleVersion,"BundleVersion"),o=r.Items;if(o===void 0)return{bundleVersion:i,items:[]};if(!Array.isArray(o))throw new Error("Items must be an array");let a=o.map((s,l)=>{if(!s||typeof s!="object"||Array.isArray(s))throw new Error(`Items[${l}] must be an object`);let d=s,c=Bi(d.ID,"ID"),f=nr(d.Path),u=nr(d.MimeType??d.MIMEType),p=d.Data===void 0?new Uint8Array:Pi(d.Data,"Data"),m=d.SHA256,g=m instanceof Uint8Array?sl(m):void 0,h=Ri(d.Attributes);return{id:c,...f?{path:f}:{},...u?{mimeType:u}:{},data:p,...g?{sha256:g}:{},...h?{attributes:h}:{}}});return{bundleVersion:i,items:a}}};rr=3,Hi=5,Ne=6,io=65,Zi=66,ji=67,Gi=68,ir=69,oo=70,qi=71,Wi=72,Xi=73;ao=class{encodeMarkdownBundle(t){let e=Vi(),n={BundleVersion:t.bundleVersion,RootPath:t.rootPath??"",Files:t.files.map(r=>({Path:r.path,Content:r.content,MediaRefs:r.mediaRefs??[],...r.attributes?{Attributes:r.attributes}:{}}))};return Fi(io,e,n)}encodeMediaBundle(t){let e=Vi(),n={BundleVersion:t.bundleVersion,Items:t.items.map(r=>({ID:r.id,Path:r.path??"",MimeType:r.mimeType??"",Data:r.data,SHA256:r.sha256??new Uint8Array(32),...r.attributes?{Attributes:r.attributes}:{}}))};return Fi(oo,e,n)}};sn="mdocx://media/";bl=class{constructor(t){this.doc=t}resolve(t,e){return gr(t,this.doc.media,e?.path)}getById(t){return this.doc.media.items.find(e=>e.id===t)}getByPath(t){let e=cn(t);return this.doc.media.items.find(n=>n.path&&cn(n.path)===e)}getReferencedMedia(t){if(!t.mediaRefs)return[];let e=[];for(let n of t.mediaRefs){let r=this.getById(n);r&&e.push(r)}return e}getAllMedia(){return[...this.doc.media.items]}hasId(t){return this.doc.media.items.some(e=>e.id===t)}getMimeType(t){return t.mimeType??"application/octet-stream"}};fo=class{files=[];rootPath;root(t){return this.rootPath=t,this}addFile(t,e,n={}){return this.files.push({path:t,content:kl(e),...n.mediaRefs?.length?{mediaRefs:n.mediaRefs}:{},...n.attributes&&Object.keys(n.attributes).length?{attributes:n.attributes}:{}}),this}addFiles(t){for(let e of t)this.addFile(e.path,e.content,e);return this}build(){if(this.files.length===0)throw new Error("MarkdownBundle must contain at least one file");return{bundleVersion:1,...this.rootPath?{rootPath:this.rootPath}:{},files:this.files}}},po=class{items=[];usedIds=new Set;addItem(t,e,n={}){if(this.usedIds.has(t))throw new Error(`Duplicate media ID: ${t}`);this.usedIds.add(t);let r={id:t,data:e,...n.path?{path:n.path}:{},mimeType:n.mimeType??(n.path?El(n.path):"application/octet-stream"),...n.computeSha256!==!1?{sha256:Ml(e)}:{},...n.attributes&&Object.keys(n.attributes).length?{attributes:n.attributes}:{}};return this.items.push(r),this}addFromPath(t,e,n={}){let r=Tl(t);return this.addItem(r,e,{...n,path:t})}addItems(t){for(let e of t)this.addItem(e.id,e.data,e);return this}build(){return{bundleVersion:1,items:this.items}}static empty(){return{bundleVersion:1,items:[]}}},vr=class{markdownBuilder=new fo;mediaBuilder=new po;metadata;setMetadata(t){return this.metadata=t,this}addMetadata(t){return this.metadata={...this.metadata??{},...t},this}title(t){return this.addMetadata({title:t})}description(t){return this.addMetadata({description:t})}root(t){return this.markdownBuilder.root(t),this.addMetadata({root:t}),this}addMarkdown(t,e,n={}){return this.markdownBuilder.addFile(t,e,n),this}addMedia(t,e,n={}){return this.mediaBuilder.addItem(t,e,n),this}addMediaFromPath(t,e,n={}){return this.mediaBuilder.addFromPath(t,e,n),this}markdown(){return this.markdownBuilder}media(){return this.mediaBuilder}build(){let e={header:{magic:mn,version:1,headerFlags:this.metadata?1:0,fixedHeaderSize:st,metadataLength:0,reserved0:0,reserved1:0n},markdown:this.markdownBuilder.build(),media:this.mediaBuilder.build()};return this.metadata&&(e.metadata=this.metadata),e}}});var Mc={};Dr(Mc,{activate:()=>hc,deactivate:()=>mc});module.exports=Ho(Mc);var M=Ce(require("vscode")),ye=Ce(require("path"));var $=Ce(require("vscode")),oe=Ce(require("path"));var B=Ce(require("vscode"));var Dt=Ce(require("vscode")),It=require("util"),wn=new Map;function Dl(t){wn.delete(t.toString())}function Il(t){return t.markdown=t.markdown||{bundleVersion:1,files:[]},Array.isArray(t.markdown.files)||(t.markdown.files=[]),t.media=t.media||{bundleVersion:1,items:[]},Array.isArray(t.media.items)||(t.media.items=[]),t}async function ie(t,e){let n=t.toString(),r;try{r=await Dt.workspace.fs.stat(t)}catch{r=void 0}if(!e?.fresh&&r){let s=wn.get(n);if(s&&s.mtime===r.mtime&&s.size===r.size)return s.doc}let i=await Dt.workspace.fs.readFile(t),{readMdocx:o}=await Promise.resolve().then(()=>(Ke(),Qe)),a=Il(await o(i));return e?.fresh?wn.delete(n):r&&wn.set(n,{mtime:r.mtime,size:r.size,doc:a}),a}async function $l(t,e){let{writeMdocxAsync:n}=await Promise.resolve().then(()=>(Ke(),Qe)),r=await n(e.markdown,e.media,{metadata:e.metadata,markdownCompression:"zip",mediaCompression:"zip"});await Dt.workspace.fs.writeFile(t,r),Dl(t)}async function de(t,e){let n=await ie(t,{fresh:!0});await e(n),await $l(t,n)}function Ze(t){return new It.TextDecoder("utf-8").decode(t)}function Je(t){return new It.TextEncoder().encode(t)}function wr(t,e){let n=e??t.markdown.rootPath??(typeof t.metadata?.root=="string"?t.metadata.root:void 0)??t.markdown.files[0]?.path;return t.markdown.files.find(r=>r.path===n)??t.markdown.files[0]}function lt(t){return{".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg",".gif":"image/gif",".webp":"image/webp",".bmp":"image/bmp",".ico":"image/x-icon",".avif":"image/avif",".svg":"image/svg+xml",".mp3":"audio/mpeg",".ogg":"audio/ogg",".wav":"audio/wav",".mp4":"video/mp4",".webm":"video/webm",".pdf":"application/pdf",".json":"application/json",".txt":"text/plain",".csv":"text/csv",".zip":"application/zip"}[t.toLowerCase()]||"application/octet-stream"}var ho=[".png",".jpg",".jpeg",".gif",".webp",".bmp",".ico",".avif",".svg",".mp3",".ogg",".wav",".mp4",".webm",".pdf"];function Ye(t){if(typeof t.mimeType=="string"&&t.mimeType.length>0)return t.mimeType;let e=typeof t.path=="string"?t.path.toLowerCase():"",n=e.lastIndexOf(".");if(n>=0){let i=lt(e.slice(n));if(i!=="application/octet-stream")return i}let r=t.data;if(!r||r.length<12)return"application/octet-stream";if(r[0]===137&&r[1]===80&&r[2]===78&&r[3]===71&&r[4]===13&&r[5]===10&&r[6]===26&&r[7]===10)return"image/png";if(r[0]===255&&r[1]===216)return"image/jpeg";if(r[0]===71&&r[1]===73&&r[2]===70)return"image/gif";if(r[0]===82&&r[1]===73&&r[2]===70&&r[3]===70&&r[8]===87&&r[9]===69&&r[10]===66&&r[11]===80)return"image/webp";try{let i=new It.TextDecoder("utf-8").decode(r.slice(0,256));if(i.includes("<svg")||i.includes("<?xml"))return"image/svg+xml"}catch{}return"application/octet-stream"}function mo(){let t=Dt.workspace.getConfiguration("mdocx").get("maxInlineMediaBytes");return typeof t=="number"&&Number.isFinite(t)&&t>0?t:25*1024*1024}function yn(t,e){let n=t.replace(/\.[^.]+$/,"").replace(/[^a-zA-Z0-9_-]/g,"_")||"media";if(!e.has(n))return n;let r=2;for(;e.has(`${n}_${r}`);)r++;return`${n}_${r}`}var Ae=class t{static scheme="mdocx-md";_onDidChangeFile=new B.EventEmitter;onDidChangeFile=this._onDidChangeFile.event;static register(e){let n=new t;return B.workspace.registerFileSystemProvider(t.scheme,n,{isCaseSensitive:!0,isReadonly:!1})}static buildUri(e,n){let r=encodeURIComponent(e.fsPath),i=n.startsWith("/")?n:"/"+n;return B.Uri.parse(`${t.scheme}://${r}${i}`)}static parseUri(e){try{if(!e.authority)return null;let n=decodeURIComponent(e.authority);if(!n)return null;let r=e.path.startsWith("/")?e.path.slice(1):e.path;return r?{mdocxUri:B.Uri.file(n),embeddedPath:r}:null}catch{return null}}watch(e){return new B.Disposable(()=>{})}async stat(e){try{let n=t.parseUri(e);if(!n)throw B.FileSystemError.FileNotFound(e);let{mdocxUri:r,embeddedPath:i}=n,o=await this.findFile(r,i);if(!o)throw B.FileSystemError.FileNotFound(e);let a=await B.workspace.fs.stat(r);return{type:B.FileType.File,ctime:a.ctime,mtime:a.mtime,size:o.content.byteLength}}catch(n){throw n instanceof B.FileSystemError?n:B.FileSystemError.FileNotFound(e)}}async readDirectory(e){return[]}createDirectory(e){throw B.FileSystemError.NoPermissions("Cannot create directories in MDOCX.")}async readFile(e){try{let n=t.parseUri(e);if(!n)throw B.FileSystemError.FileNotFound(e);let{mdocxUri:r,embeddedPath:i}=n,o=await this.findFile(r,i);if(!o)throw B.FileSystemError.FileNotFound(e);return o.content}catch(n){throw n instanceof B.FileSystemError?n:B.FileSystemError.FileNotFound(e)}}async writeFile(e,n,r){let i=t.parseUri(e);if(!i)throw B.FileSystemError.FileNotFound(e);let{mdocxUri:o,embeddedPath:a}=i;await de(o,s=>{let l=s.markdown.files.find(d=>d.path===a);if(!l)throw B.FileSystemError.FileNotFound(e);l.content=n}),this._onDidChangeFile.fire([{type:B.FileChangeType.Changed,uri:e}])}delete(e,n){throw B.FileSystemError.NoPermissions("Cannot delete files from MDOCX via this provider.")}rename(e,n,r){throw B.FileSystemError.NoPermissions("Cannot rename files in MDOCX via this provider.")}async findFile(e,n){try{return(await ie(e)).markdown.files.find(i=>i.path===n)}catch{return}}};var Ao=require("buffer");function xr(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var tt=xr();function xo(t){tt=t}var ko=/[&<>"']/,Ll=new RegExp(ko.source,"g"),Mo=/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,Al=new RegExp(Mo.source,"g"),Ul={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},go=t=>Ul[t];function ue(t,e){if(e){if(ko.test(t))return t.replace(Ll,go)}else if(Mo.test(t))return t.replace(Al,go);return t}var _l=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;function Fl(t){return t.replace(_l,(e,n)=>(n=n.toLowerCase(),n==="colon"?":":n.charAt(0)==="#"?n.charAt(1)==="x"?String.fromCharCode(parseInt(n.substring(2),16)):String.fromCharCode(+n.substring(1)):""))}var Bl=/(^|[^\[])\^/g;function z(t,e){let n=typeof t=="string"?t:t.source;e=e||"";let r={replace:(i,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Bl,"$1"),n=n.replace(i,a),r},getRegex:()=>new RegExp(n,e)};return r}function vo(t){try{t=encodeURI(t).replace(/%25/g,"%")}catch{return null}return t}var Lt={exec:()=>null};function wo(t,e){let n=t.replace(/\|/g,(o,a,s)=>{let l=!1,d=a;for(;--d>=0&&s[d]==="\\";)l=!l;return l?"|":" |"}),r=n.split(/ \|/),i=0;if(r[0].trim()||r.shift(),r.length>0&&!r[r.length-1].trim()&&r.pop(),e)if(r.length>e)r.splice(e);else for(;r.length<e;)r.push("");for(;i<r.length;i++)r[i]=r[i].trim().replace(/\\\|/g,"|");return r}function bn(t,e,n){let r=t.length;if(r===0)return"";let i=0;for(;i<r;){let o=t.charAt(r-i-1);if(o===e&&!n)i++;else if(o!==e&&n)i++;else break}return t.slice(0,r-i)}function zl(t,e){if(t.indexOf(e[1])===-1)return-1;let n=0;for(let r=0;r<t.length;r++)if(t[r]==="\\")r++;else if(t[r]===e[0])n++;else if(t[r]===e[1]&&(n--,n<0))return r;return-1}function yo(t,e,n,r){let i=e.href,o=e.title?ue(e.title):null,a=t[1].replace(/\\([\[\]])/g,"$1");if(t[0].charAt(0)!=="!"){r.state.inLink=!0;let s={type:"link",raw:n,href:i,title:o,text:a,tokens:r.inlineTokens(a)};return r.state.inLink=!1,s}return{type:"image",raw:n,href:i,title:o,text:ue(a)}}function Pl(t,e){let n=t.match(/^(\s+)(?:```)/);if(n===null)return e;let r=n[1];return e.split(`
`).map(i=>{let o=i.match(/^\s+/);if(o===null)return i;let[a]=o;return a.length>=r.length?i.slice(r.length):i}).join(`
`)}var dt=class{options;rules;lexer;constructor(e){this.options=e||tt}space(e){let n=this.rules.block.newline.exec(e);if(n&&n[0].length>0)return{type:"space",raw:n[0]}}code(e){let n=this.rules.block.code.exec(e);if(n){let r=n[0].replace(/^ {1,4}/gm,"");return{type:"code",raw:n[0],codeBlockStyle:"indented",text:this.options.pedantic?r:bn(r,`
`)}}}fences(e){let n=this.rules.block.fences.exec(e);if(n){let r=n[0],i=Pl(r,n[3]||"");return{type:"code",raw:r,lang:n[2]?n[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):n[2],text:i}}}heading(e){let n=this.rules.block.heading.exec(e);if(n){let r=n[2].trim();if(/#$/.test(r)){let i=bn(r,"#");(this.options.pedantic||!i||/ $/.test(i))&&(r=i.trim())}return{type:"heading",raw:n[0],depth:n[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let n=this.rules.block.hr.exec(e);if(n)return{type:"hr",raw:n[0]}}blockquote(e){let n=this.rules.block.blockquote.exec(e);if(n){let r=n[0].replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,`
    $1`);r=bn(r.replace(/^ *>[ \t]?/gm,""),`
`);let i=this.lexer.state.top;this.lexer.state.top=!0;let o=this.lexer.blockTokens(r);return this.lexer.state.top=i,{type:"blockquote",raw:n[0],tokens:o,text:r}}}list(e){let n=this.rules.block.list.exec(e);if(n){let r=n[1].trim(),i=r.length>1,o={type:"list",raw:"",ordered:i,start:i?+r.slice(0,-1):"",loose:!1,items:[]};r=i?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=i?r:"[*+-]");let a=new RegExp(`^( {0,3}${r})((?:[	 ][^\\n]*)?(?:\\n|$))`),s="",l="",d=!1;for(;e;){let c=!1;if(!(n=a.exec(e))||this.rules.block.hr.test(e))break;s=n[0],e=e.substring(s.length);let f=n[2].split(`
`,1)[0].replace(/^\t+/,v=>" ".repeat(3*v.length)),u=e.split(`
`,1)[0],p=0;this.options.pedantic?(p=2,l=f.trimStart()):(p=n[2].search(/[^ ]/),p=p>4?1:p,l=f.slice(p),p+=n[1].length);let m=!1;if(!f&&/^ *$/.test(u)&&(s+=u+`
`,e=e.substring(u.length+1),c=!0),!c){let v=new RegExp(`^ {0,${Math.min(3,p-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),y=new RegExp(`^ {0,${Math.min(3,p-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),w=new RegExp(`^ {0,${Math.min(3,p-1)}}(?:\`\`\`|~~~)`),x=new RegExp(`^ {0,${Math.min(3,p-1)}}#`);for(;e;){let E=e.split(`
`,1)[0];if(u=E,this.options.pedantic&&(u=u.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  ")),w.test(u)||x.test(u)||v.test(u)||y.test(e))break;if(u.search(/[^ ]/)>=p||!u.trim())l+=`
`+u.slice(p);else{if(m||f.search(/[^ ]/)>=4||w.test(f)||x.test(f)||y.test(f))break;l+=`
`+u}!m&&!u.trim()&&(m=!0),s+=E+`
`,e=e.substring(E.length+1),f=u.slice(p)}}o.loose||(d?o.loose=!0:/\n *\n *$/.test(s)&&(d=!0));let g=null,h;this.options.gfm&&(g=/^\[[ xX]\] /.exec(l),g&&(h=g[0]!=="[ ] ",l=l.replace(/^\[[ xX]\] +/,""))),o.items.push({type:"list_item",raw:s,task:!!g,checked:h,loose:!1,text:l,tokens:[]}),o.raw+=s}o.items[o.items.length-1].raw=s.trimEnd(),o.items[o.items.length-1].text=l.trimEnd(),o.raw=o.raw.trimEnd();for(let c=0;c<o.items.length;c++)if(this.lexer.state.top=!1,o.items[c].tokens=this.lexer.blockTokens(o.items[c].text,[]),!o.loose){let f=o.items[c].tokens.filter(p=>p.type==="space"),u=f.length>0&&f.some(p=>/\n.*\n/.test(p.raw));o.loose=u}if(o.loose)for(let c=0;c<o.items.length;c++)o.items[c].loose=!0;return o}}html(e){let n=this.rules.block.html.exec(e);if(n)return{type:"html",block:!0,raw:n[0],pre:n[1]==="pre"||n[1]==="script"||n[1]==="style",text:n[0]}}def(e){let n=this.rules.block.def.exec(e);if(n){let r=n[1].toLowerCase().replace(/\s+/g," "),i=n[2]?n[2].replace(/^<(.*)>$/,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=n[3]?n[3].substring(1,n[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):n[3];return{type:"def",tag:r,raw:n[0],href:i,title:o}}}table(e){let n=this.rules.block.table.exec(e);if(!n||!/[:|]/.test(n[2]))return;let r=wo(n[1]),i=n[2].replace(/^\||\| *$/g,"").split("|"),o=n[3]&&n[3].trim()?n[3].replace(/\n[ \t]*$/,"").split(`
`):[],a={type:"table",raw:n[0],header:[],align:[],rows:[]};if(r.length===i.length){for(let s of i)/^ *-+: *$/.test(s)?a.align.push("right"):/^ *:-+: *$/.test(s)?a.align.push("center"):/^ *:-+ *$/.test(s)?a.align.push("left"):a.align.push(null);for(let s of r)a.header.push({text:s,tokens:this.lexer.inline(s)});for(let s of o)a.rows.push(wo(s,a.header.length).map(l=>({text:l,tokens:this.lexer.inline(l)})));return a}}lheading(e){let n=this.rules.block.lheading.exec(e);if(n)return{type:"heading",raw:n[0],depth:n[2].charAt(0)==="="?1:2,text:n[1],tokens:this.lexer.inline(n[1])}}paragraph(e){let n=this.rules.block.paragraph.exec(e);if(n){let r=n[1].charAt(n[1].length-1)===`
`?n[1].slice(0,-1):n[1];return{type:"paragraph",raw:n[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let n=this.rules.block.text.exec(e);if(n)return{type:"text",raw:n[0],text:n[0],tokens:this.lexer.inline(n[0])}}escape(e){let n=this.rules.inline.escape.exec(e);if(n)return{type:"escape",raw:n[0],text:ue(n[1])}}tag(e){let n=this.rules.inline.tag.exec(e);if(n)return!this.lexer.state.inLink&&/^<a /i.test(n[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(n[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(n[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(n[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:n[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:n[0]}}link(e){let n=this.rules.inline.link.exec(e);if(n){let r=n[2].trim();if(!this.options.pedantic&&/^</.test(r)){if(!/>$/.test(r))return;let a=bn(r.slice(0,-1),"\\");if((r.length-a.length)%2===0)return}else{let a=zl(n[2],"()");if(a>-1){let l=(n[0].indexOf("!")===0?5:4)+n[1].length+a;n[2]=n[2].substring(0,a),n[0]=n[0].substring(0,l).trim(),n[3]=""}}let i=n[2],o="";if(this.options.pedantic){let a=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(i);a&&(i=a[1],o=a[3])}else o=n[3]?n[3].slice(1,-1):"";return i=i.trim(),/^</.test(i)&&(this.options.pedantic&&!/>$/.test(r)?i=i.slice(1):i=i.slice(1,-1)),yo(n,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},n[0],this.lexer)}}reflink(e,n){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let i=(r[2]||r[1]).replace(/\s+/g," "),o=n[i.toLowerCase()];if(!o){let a=r[0].charAt(0);return{type:"text",raw:a,text:a}}return yo(r,o,r[0],this.lexer)}}emStrong(e,n,r=""){let i=this.rules.inline.emStrongLDelim.exec(e);if(!i||i[3]&&r.match(/[\p{L}\p{N}]/u))return;if(!(i[1]||i[2]||"")||!r||this.rules.inline.punctuation.exec(r)){let a=[...i[0]].length-1,s,l,d=a,c=0,f=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(f.lastIndex=0,n=n.slice(-1*e.length+a);(i=f.exec(n))!=null;){if(s=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!s)continue;if(l=[...s].length,i[3]||i[4]){d+=l;continue}else if((i[5]||i[6])&&a%3&&!((a+l)%3)){c+=l;continue}if(d-=l,d>0)continue;l=Math.min(l,l+d+c);let u=[...i[0]][0].length,p=e.slice(0,a+i.index+u+l);if(Math.min(a,l)%2){let g=p.slice(1,-1);return{type:"em",raw:p,text:g,tokens:this.lexer.inlineTokens(g)}}let m=p.slice(2,-2);return{type:"strong",raw:p,text:m,tokens:this.lexer.inlineTokens(m)}}}}codespan(e){let n=this.rules.inline.code.exec(e);if(n){let r=n[2].replace(/\n/g," "),i=/[^ ]/.test(r),o=/^ /.test(r)&&/ $/.test(r);return i&&o&&(r=r.substring(1,r.length-1)),r=ue(r,!0),{type:"codespan",raw:n[0],text:r}}}br(e){let n=this.rules.inline.br.exec(e);if(n)return{type:"br",raw:n[0]}}del(e){let n=this.rules.inline.del.exec(e);if(n)return{type:"del",raw:n[0],text:n[2],tokens:this.lexer.inlineTokens(n[2])}}autolink(e){let n=this.rules.inline.autolink.exec(e);if(n){let r,i;return n[2]==="@"?(r=ue(n[1]),i="mailto:"+r):(r=ue(n[1]),i=r),{type:"link",raw:n[0],text:r,href:i,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let n;if(n=this.rules.inline.url.exec(e)){let r,i;if(n[2]==="@")r=ue(n[0]),i="mailto:"+r;else{let o;do o=n[0],n[0]=this.rules.inline._backpedal.exec(n[0])?.[0]??"";while(o!==n[0]);r=ue(n[0]),n[1]==="www."?i="http://"+n[0]:i=n[0]}return{type:"link",raw:n[0],text:r,href:i,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let n=this.rules.inline.text.exec(e);if(n){let r;return this.lexer.state.inRawBlock?r=n[0]:r=ue(n[0]),{type:"text",raw:n[0],text:r}}}},Rl=/^(?: *(?:\n|$))+/,Ol=/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,Nl=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Ut=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Hl=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Eo=/(?:[*+-]|\d{1,9}[.)])/,To=z(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g,Eo).replace(/blockCode/g,/ {4}/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).getRegex(),kr=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Zl=/^[^\n]+/,Mr=/(?!\s*\])(?:\\.|[^\[\]\\])+/,jl=z(/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/).replace("label",Mr).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Gl=z(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Eo).getRegex(),Mn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Er=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,ql=z("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))","i").replace("comment",Er).replace("tag",Mn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),So=z(kr).replace("hr",Ut).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Mn).getRegex(),Wl=z(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",So).getRegex(),Tr={blockquote:Wl,code:Ol,def:jl,fences:Nl,heading:Hl,hr:Ut,html:ql,lheading:To,list:Gl,newline:Rl,paragraph:So,table:Lt,text:Zl},bo=z("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Ut).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Mn).getRegex(),Xl={...Tr,table:bo,paragraph:z(kr).replace("hr",Ut).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",bo).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Mn).getRegex()},Vl={...Tr,html:z(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Er).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Lt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:z(kr).replace("hr",Ut).replace("heading",` *#{1,6} *[^
]`).replace("lheading",To).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Co=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Ql=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Do=/^( {2,}|\\)\n(?!\s*$)/,Kl=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,_t="\\p{P}\\p{S}",Jl=z(/^((?![*_])[\spunctuation])/,"u").replace(/punctuation/g,_t).getRegex(),Yl=/\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g,ec=z(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,"u").replace(/punct/g,_t).getRegex(),tc=z("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])","gu").replace(/punct/g,_t).getRegex(),nc=z("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])","gu").replace(/punct/g,_t).getRegex(),rc=z(/\\([punct])/,"gu").replace(/punct/g,_t).getRegex(),ic=z(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),oc=z(Er).replace("(?:-->|$)","-->").getRegex(),ac=z("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",oc).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),kn=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,sc=z(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label",kn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Io=z(/^!?\[(label)\]\[(ref)\]/).replace("label",kn).replace("ref",Mr).getRegex(),$o=z(/^!?\[(ref)\](?:\[\])?/).replace("ref",Mr).getRegex(),lc=z("reflink|nolink(?!\\()","g").replace("reflink",Io).replace("nolink",$o).getRegex(),Sr={_backpedal:Lt,anyPunctuation:rc,autolink:ic,blockSkip:Yl,br:Do,code:Ql,del:Lt,emStrongLDelim:ec,emStrongRDelimAst:tc,emStrongRDelimUnd:nc,escape:Co,link:sc,nolink:$o,punctuation:Jl,reflink:Io,reflinkSearch:lc,tag:ac,text:Kl,url:Lt},cc={...Sr,link:z(/^!?\[(label)\]\((.*?)\)/).replace("label",kn).getRegex(),reflink:z(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",kn).getRegex()},yr={...Sr,escape:z(Co).replace("])","~|])").getRegex(),url:z(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},dc={...yr,br:z(Do).replace("{2,}","*").getRegex(),text:z(yr.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},xn={normal:Tr,gfm:Xl,pedantic:Vl},$t={normal:Sr,gfm:yr,breaks:dc,pedantic:cc},Ue=class t{tokens;options;state;tokenizer;inlineQueue;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||tt,this.options.tokenizer=this.options.tokenizer||new dt,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={block:xn.normal,inline:$t.normal};this.options.pedantic?(n.block=xn.pedantic,n.inline=$t.pedantic):this.options.gfm&&(n.block=xn.gfm,this.options.breaks?n.inline=$t.breaks:n.inline=$t.gfm),this.tokenizer.rules=n}static get rules(){return{block:xn,inline:$t}}static lex(e,n){return new t(n).lex(e)}static lexInline(e,n){return new t(n).inlineTokens(e)}lex(e){e=e.replace(/\r\n|\r/g,`
`),this.blockTokens(e,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,n=[]){this.options.pedantic?e=e.replace(/\t/g,"    ").replace(/^ +$/gm,""):e=e.replace(/^( *)(\t+)/gm,(s,l,d)=>l+"    ".repeat(d.length));let r,i,o,a;for(;e;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some(s=>(r=s.call({lexer:this},e,n))?(e=e.substring(r.raw.length),n.push(r),!0):!1))){if(r=this.tokenizer.space(e)){e=e.substring(r.raw.length),r.raw.length===1&&n.length>0?n[n.length-1].raw+=`
`:n.push(r);continue}if(r=this.tokenizer.code(e)){e=e.substring(r.raw.length),i=n[n.length-1],i&&(i.type==="paragraph"||i.type==="text")?(i.raw+=`
`+r.raw,i.text+=`
`+r.text,this.inlineQueue[this.inlineQueue.length-1].src=i.text):n.push(r);continue}if(r=this.tokenizer.fences(e)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.heading(e)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.hr(e)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.blockquote(e)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.list(e)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.html(e)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.def(e)){e=e.substring(r.raw.length),i=n[n.length-1],i&&(i.type==="paragraph"||i.type==="text")?(i.raw+=`
`+r.raw,i.text+=`
`+r.raw,this.inlineQueue[this.inlineQueue.length-1].src=i.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});continue}if(r=this.tokenizer.table(e)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.lheading(e)){e=e.substring(r.raw.length),n.push(r);continue}if(o=e,this.options.extensions&&this.options.extensions.startBlock){let s=1/0,l=e.slice(1),d;this.options.extensions.startBlock.forEach(c=>{d=c.call({lexer:this},l),typeof d=="number"&&d>=0&&(s=Math.min(s,d))}),s<1/0&&s>=0&&(o=e.substring(0,s+1))}if(this.state.top&&(r=this.tokenizer.paragraph(o))){i=n[n.length-1],a&&i.type==="paragraph"?(i.raw+=`
`+r.raw,i.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=i.text):n.push(r),a=o.length!==e.length,e=e.substring(r.raw.length);continue}if(r=this.tokenizer.text(e)){e=e.substring(r.raw.length),i=n[n.length-1],i&&i.type==="text"?(i.raw+=`
`+r.raw,i.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=i.text):n.push(r);continue}if(e){let s="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(s);break}else throw new Error(s)}}return this.state.top=!0,n}inline(e,n=[]){return this.inlineQueue.push({src:e,tokens:n}),n}inlineTokens(e,n=[]){let r,i,o,a=e,s,l,d;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(a))!=null;)c.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(a=a.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+a.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.blockSkip.exec(a))!=null;)a=a.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+a.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(a))!=null;)a=a.slice(0,s.index)+"++"+a.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;e;)if(l||(d=""),l=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some(c=>(r=c.call({lexer:this},e,n))?(e=e.substring(r.raw.length),n.push(r),!0):!1))){if(r=this.tokenizer.escape(e)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.tag(e)){e=e.substring(r.raw.length),i=n[n.length-1],i&&r.type==="text"&&i.type==="text"?(i.raw+=r.raw,i.text+=r.text):n.push(r);continue}if(r=this.tokenizer.link(e)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(r.raw.length),i=n[n.length-1],i&&r.type==="text"&&i.type==="text"?(i.raw+=r.raw,i.text+=r.text):n.push(r);continue}if(r=this.tokenizer.emStrong(e,a,d)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.codespan(e)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.br(e)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.del(e)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.autolink(e)){e=e.substring(r.raw.length),n.push(r);continue}if(!this.state.inLink&&(r=this.tokenizer.url(e))){e=e.substring(r.raw.length),n.push(r);continue}if(o=e,this.options.extensions&&this.options.extensions.startInline){let c=1/0,f=e.slice(1),u;this.options.extensions.startInline.forEach(p=>{u=p.call({lexer:this},f),typeof u=="number"&&u>=0&&(c=Math.min(c,u))}),c<1/0&&c>=0&&(o=e.substring(0,c+1))}if(r=this.tokenizer.inlineText(o)){e=e.substring(r.raw.length),r.raw.slice(-1)!=="_"&&(d=r.raw.slice(-1)),l=!0,i=n[n.length-1],i&&i.type==="text"?(i.raw+=r.raw,i.text+=r.text):n.push(r);continue}if(e){let c="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(c);break}else throw new Error(c)}}return n}},ut=class{options;constructor(e){this.options=e||tt}code(e,n,r){let i=(n||"").match(/^\S*/)?.[0];return e=e.replace(/\n$/,"")+`
`,i?'<pre><code class="language-'+ue(i)+'">'+(r?e:ue(e,!0))+`</code></pre>
`:"<pre><code>"+(r?e:ue(e,!0))+`</code></pre>
`}blockquote(e){return`<blockquote>
${e}</blockquote>
`}html(e,n){return e}heading(e,n,r){return`<h${n}>${e}</h${n}>
`}hr(){return`<hr>
`}list(e,n,r){let i=n?"ol":"ul",o=n&&r!==1?' start="'+r+'"':"";return"<"+i+o+`>
`+e+"</"+i+`>
`}listitem(e,n,r){return`<li>${e}</li>
`}checkbox(e){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph(e){return`<p>${e}</p>
`}table(e,n){return n&&(n=`<tbody>${n}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+n+`</table>
`}tablerow(e){return`<tr>
${e}</tr>
`}tablecell(e,n){let r=n.header?"th":"td";return(n.align?`<${r} align="${n.align}">`:`<${r}>`)+e+`</${r}>
`}strong(e){return`<strong>${e}</strong>`}em(e){return`<em>${e}</em>`}codespan(e){return`<code>${e}</code>`}br(){return"<br>"}del(e){return`<del>${e}</del>`}link(e,n,r){let i=vo(e);if(i===null)return r;e=i;let o='<a href="'+e+'"';return n&&(o+=' title="'+n+'"'),o+=">"+r+"</a>",o}image(e,n,r){let i=vo(e);if(i===null)return r;e=i;let o=`<img src="${e}" alt="${r}"`;return n&&(o+=` title="${n}"`),o+=">",o}text(e){return e}},At=class{strong(e){return e}em(e){return e}codespan(e){return e}del(e){return e}html(e){return e}text(e){return e}link(e,n,r){return""+r}image(e,n,r){return""+r}br(){return""}},_e=class t{options;renderer;textRenderer;constructor(e){this.options=e||tt,this.options.renderer=this.options.renderer||new ut,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new At}static parse(e,n){return new t(n).parse(e)}static parseInline(e,n){return new t(n).parseInline(e)}parse(e,n=!0){let r="";for(let i=0;i<e.length;i++){let o=e[i];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[o.type]){let a=o,s=this.options.extensions.renderers[a.type].call({parser:this},a);if(s!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(a.type)){r+=s||"";continue}}switch(o.type){case"space":continue;case"hr":{r+=this.renderer.hr();continue}case"heading":{let a=o;r+=this.renderer.heading(this.parseInline(a.tokens),a.depth,Fl(this.parseInline(a.tokens,this.textRenderer)));continue}case"code":{let a=o;r+=this.renderer.code(a.text,a.lang,!!a.escaped);continue}case"table":{let a=o,s="",l="";for(let c=0;c<a.header.length;c++)l+=this.renderer.tablecell(this.parseInline(a.header[c].tokens),{header:!0,align:a.align[c]});s+=this.renderer.tablerow(l);let d="";for(let c=0;c<a.rows.length;c++){let f=a.rows[c];l="";for(let u=0;u<f.length;u++)l+=this.renderer.tablecell(this.parseInline(f[u].tokens),{header:!1,align:a.align[u]});d+=this.renderer.tablerow(l)}r+=this.renderer.table(s,d);continue}case"blockquote":{let a=o,s=this.parse(a.tokens);r+=this.renderer.blockquote(s);continue}case"list":{let a=o,s=a.ordered,l=a.start,d=a.loose,c="";for(let f=0;f<a.items.length;f++){let u=a.items[f],p=u.checked,m=u.task,g="";if(u.task){let h=this.renderer.checkbox(!!p);d?u.tokens.length>0&&u.tokens[0].type==="paragraph"?(u.tokens[0].text=h+" "+u.tokens[0].text,u.tokens[0].tokens&&u.tokens[0].tokens.length>0&&u.tokens[0].tokens[0].type==="text"&&(u.tokens[0].tokens[0].text=h+" "+u.tokens[0].tokens[0].text)):u.tokens.unshift({type:"text",text:h+" "}):g+=h+" "}g+=this.parse(u.tokens,d),c+=this.renderer.listitem(g,m,!!p)}r+=this.renderer.list(c,s,l);continue}case"html":{let a=o;r+=this.renderer.html(a.text,a.block);continue}case"paragraph":{let a=o;r+=this.renderer.paragraph(this.parseInline(a.tokens));continue}case"text":{let a=o,s=a.tokens?this.parseInline(a.tokens):a.text;for(;i+1<e.length&&e[i+1].type==="text";)a=e[++i],s+=`
`+(a.tokens?this.parseInline(a.tokens):a.text);r+=n?this.renderer.paragraph(s):s;continue}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(e,n){n=n||this.renderer;let r="";for(let i=0;i<e.length;i++){let o=e[i];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[o.type]){let a=this.options.extensions.renderers[o.type].call({parser:this},o);if(a!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=a||"";continue}}switch(o.type){case"escape":{let a=o;r+=n.text(a.text);break}case"html":{let a=o;r+=n.html(a.text);break}case"link":{let a=o;r+=n.link(a.href,a.title,this.parseInline(a.tokens,n));break}case"image":{let a=o;r+=n.image(a.href,a.title,a.text);break}case"strong":{let a=o;r+=n.strong(this.parseInline(a.tokens,n));break}case"em":{let a=o;r+=n.em(this.parseInline(a.tokens,n));break}case"codespan":{let a=o;r+=n.codespan(a.text);break}case"br":{r+=n.br();break}case"del":{let a=o;r+=n.del(this.parseInline(a.tokens,n));break}case"text":{let a=o;r+=n.text(a.text);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}},ct=class{options;constructor(e){this.options=e||tt}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}},br=class{defaults=xr();options=this.setOptions;parse=this.#e(Ue.lex,_e.parse);parseInline=this.#e(Ue.lexInline,_e.parseInline);Parser=_e;Renderer=ut;TextRenderer=At;Lexer=Ue;Tokenizer=dt;Hooks=ct;constructor(...e){this.use(...e)}walkTokens(e,n){let r=[];for(let i of e)switch(r=r.concat(n.call(this,i)),i.type){case"table":{let o=i;for(let a of o.header)r=r.concat(this.walkTokens(a.tokens,n));for(let a of o.rows)for(let s of a)r=r.concat(this.walkTokens(s.tokens,n));break}case"list":{let o=i;r=r.concat(this.walkTokens(o.items,n));break}default:{let o=i;this.defaults.extensions?.childTokens?.[o.type]?this.defaults.extensions.childTokens[o.type].forEach(a=>{let s=o[a].flat(1/0);r=r.concat(this.walkTokens(s,n))}):o.tokens&&(r=r.concat(this.walkTokens(o.tokens,n)))}}return r}use(...e){let n=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let i={...r};if(i.async=this.defaults.async||i.async||!1,r.extensions&&(r.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let a=n.renderers[o.name];a?n.renderers[o.name]=function(...s){let l=o.renderer.apply(this,s);return l===!1&&(l=a.apply(this,s)),l}:n.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let a=n[o.level];a?a.unshift(o.tokenizer):n[o.level]=[o.tokenizer],o.start&&(o.level==="block"?n.startBlock?n.startBlock.push(o.start):n.startBlock=[o.start]:o.level==="inline"&&(n.startInline?n.startInline.push(o.start):n.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(n.childTokens[o.name]=o.childTokens)}),i.extensions=n),r.renderer){let o=this.defaults.renderer||new ut(this.defaults);for(let a in r.renderer){if(!(a in o))throw new Error(`renderer '${a}' does not exist`);if(a==="options")continue;let s=a,l=r.renderer[s],d=o[s];o[s]=(...c)=>{let f=l.apply(o,c);return f===!1&&(f=d.apply(o,c)),f||""}}i.renderer=o}if(r.tokenizer){let o=this.defaults.tokenizer||new dt(this.defaults);for(let a in r.tokenizer){if(!(a in o))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;let s=a,l=r.tokenizer[s],d=o[s];o[s]=(...c)=>{let f=l.apply(o,c);return f===!1&&(f=d.apply(o,c)),f}}i.tokenizer=o}if(r.hooks){let o=this.defaults.hooks||new ct;for(let a in r.hooks){if(!(a in o))throw new Error(`hook '${a}' does not exist`);if(a==="options")continue;let s=a,l=r.hooks[s],d=o[s];ct.passThroughHooks.has(a)?o[s]=c=>{if(this.defaults.async)return Promise.resolve(l.call(o,c)).then(u=>d.call(o,u));let f=l.call(o,c);return d.call(o,f)}:o[s]=(...c)=>{let f=l.apply(o,c);return f===!1&&(f=d.apply(o,c)),f}}i.hooks=o}if(r.walkTokens){let o=this.defaults.walkTokens,a=r.walkTokens;i.walkTokens=function(s){let l=[];return l.push(a.call(this,s)),o&&(l=l.concat(o.call(this,s))),l}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,n){return Ue.lex(e,n??this.defaults)}parser(e,n){return _e.parse(e,n??this.defaults)}#e(e,n){return(r,i)=>{let o={...i},a={...this.defaults,...o};this.defaults.async===!0&&o.async===!1&&(a.silent||console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored."),a.async=!0);let s=this.#t(!!a.silent,!!a.async);if(typeof r>"u"||r===null)return s(new Error("marked(): input parameter is undefined or null"));if(typeof r!="string")return s(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(r)+", string expected"));if(a.hooks&&(a.hooks.options=a),a.async)return Promise.resolve(a.hooks?a.hooks.preprocess(r):r).then(l=>e(l,a)).then(l=>a.hooks?a.hooks.processAllTokens(l):l).then(l=>a.walkTokens?Promise.all(this.walkTokens(l,a.walkTokens)).then(()=>l):l).then(l=>n(l,a)).then(l=>a.hooks?a.hooks.postprocess(l):l).catch(s);try{a.hooks&&(r=a.hooks.preprocess(r));let l=e(r,a);a.hooks&&(l=a.hooks.processAllTokens(l)),a.walkTokens&&this.walkTokens(l,a.walkTokens);let d=n(l,a);return a.hooks&&(d=a.hooks.postprocess(d)),d}catch(l){return s(l)}}}#t(e,n){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let i="<p>An error occurred:</p><pre>"+ue(r.message+"",!0)+"</pre>";return n?Promise.resolve(i):i}if(n)return Promise.reject(r);throw r}}},et=new br;function U(t,e){return et.parse(t,e)}U.options=U.setOptions=function(t){return et.setOptions(t),U.defaults=et.defaults,xo(U.defaults),U};U.getDefaults=xr;U.defaults=tt;U.use=function(...t){return et.use(...t),U.defaults=et.defaults,xo(U.defaults),U};U.walkTokens=function(t,e){return et.walkTokens(t,e)};U.parseInline=et.parseInline;U.Parser=_e;U.parser=_e.parse;U.Renderer=ut;U.TextRenderer=At;U.Lexer=Ue;U.lexer=Ue.lex;U.Tokenizer=dt;U.Hooks=ct;U.parse=U;var ed=U.options,td=U.setOptions,nd=U.use,rd=U.walkTokens,id=U.parseInline;var od=_e.parse,ad=Ue.lex;function Y(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function En(t){return"doc-"+t.replace(/[^a-zA-Z0-9]+/g,"-").replace(/^-|-$/g,"").toLowerCase()}function Uo(){let t=new Map;return e=>{let n=e.toLowerCase().replace(/<[^>]*>/g,"").replace(/[^\w\s-]/g,"").trim().replace(/\s+/g,"-")||"section",r=t.get(n)??0;return t.set(n,r+1),r===0?n:`${n}-${r}`}}function Cr(t,e){for(let n of t)!n||typeof n!="object"||(n.type==="heading"&&e.push(n),Array.isArray(n.tokens)&&n.type!=="heading"&&Cr(n.tokens,e),Array.isArray(n.items)&&Cr(n.items,e))}function uc(t){let e=Uo(),n=[];try{Cr(U.lexer(t),n)}catch{return[]}return n.map(r=>{let i=String(r.text??"").replace(/[*_`~]/g,"");return{level:Number(r.depth)||1,text:i,id:e(i)}})}function Lo(t){let e=(t??"").trim();return e&&(e.startsWith("#")||/^mailto:/i.test(e)||/^data:/i.test(e)||/^https?:\/\//i.test(e))?e:null}function Ft(t,e){let n=uc(t),r=0,i=Uo(),o=new U.Renderer;o.html=()=>"",o.heading=(l,d)=>{let c=n[r++],f=c?c.id:i(l);return`<h${d} id="${Y(f)}"><a class="heading-anchor" href="#${Y(f)}" aria-hidden="true">#</a>${l}</h${d}>
`},o.code=(l,d)=>{let c=(d||"").split(/\s+/)[0]??"";return`<div class="code-block"${c?` data-lang="${Y(c)}"`:""}><pre><code${c?` class="language-${Y(c)}"`:""}>${Y(l)}</code></pre></div>
`},o.link=(l,d,c)=>{let f=(l??"").trim(),u=e?.resolveFileHref?.(f),p=d?` title="${Y(d)}"`:"";if(u)return`<a href="#${En(u)}" class="internal-link" data-mdocx-file="${Y(u)}"${p}>${c}</a>`;let m=e?.resolveMediaHref?.(f),g=Lo(m??f);if(!g)return c;let v=/^https?:\/\//i.test(g)?' rel="noreferrer noopener" target="_blank"':"";return`<a href="${Y(g)}"${p}${v}>${c}</a>`},o.image=(l,d,c)=>{let f=Lo(l);if(!f)return`<span class="missing-media">${Y(c||"missing media")}</span>`;let u=d?` title="${Y(d)}"`:"";return`<img src="${Y(f)}" alt="${Y(c??"")}"${u} loading="lazy" />`};let a=l=>{if(e?.resolveMediaHref&&l?.type==="image"&&typeof l.href=="string"){let d=e.resolveMediaHref(l.href);d&&(l.href=d)}},s=U.parse(t,{renderer:o,walkTokens:a,gfm:!0,breaks:!1});return{html:typeof s=="string"?s:"",outline:n}}function ft(t){let e=t.trim().replace(/^<|>$/g,"");if(!e)return[];let r=(e.split("#")[0]?.split("?")[0]??e).replace(/\\/g,"/"),i=new Set([r]);r.startsWith("./")&&i.add(r.slice(2)),r.startsWith("/")&&i.add(r.slice(1));try{i.add(decodeURI(r))}catch{}return[...i].filter(Boolean)}function pt(t){let e=t.trim();return/^https?:\/\//i.test(e)||/^data:/i.test(e)||/^mailto:/i.test(e)||e.startsWith("#")}function Bt(t,e){return`data:${t};base64,${Ao.Buffer.from(e).toString("base64")}`}var fc="mdocx.preview",pc=900,Tn=class t{constructor(e){this._context=e}static register(e){let n=new t(e);return $.window.registerCustomEditorProvider(fc,n,{webviewOptions:{retainContextWhenHidden:!0}})}async openCustomDocument(e,n,r){return{uri:e,dispose:()=>{}}}async resolveCustomEditor(e,n,r){n.webview.options={enableScripts:!0};let i,o=!1,a=0,s=async h=>{let v=await this.renderDocument(e.uri,h??i);i=v.path||h||i,await n.webview.postMessage(v)},l=async(h,v)=>{try{return a=Date.now(),await h(),a=Date.now(),v&&$.window.showInformationMessage(v),await s(i),!0}catch(y){let w=y instanceof Error?y.message:String(y);return $.window.showErrorMessage(`MDOCX: ${w}`),!1}},d=async(h,v)=>$.workspace.getConfiguration("mdocx").get("confirmDelete",!0)?await $.window.showWarningMessage(h,{modal:!0},v)===v:!0,c=n.webview.onDidReceiveMessage(async h=>{if(!(!h||typeof h.type!="string"))switch(h.type){case"ready":{o=!0,typeof h.selectedPath=="string"&&h.selectedPath.length>0&&(i=h.selectedPath),await s(i);return}case"select":{i=h.path,await s(i);return}case"copy":{let v=h.path||i,y=await this.getMarkdownText(e.uri,v);if(!y){$.window.showWarningMessage("MDOCX: No markdown content to copy.");return}await $.env.clipboard.writeText(y),$.window.showInformationMessage("MDOCX: Markdown copied to clipboard.");return}case"editExternal":{let v=h.path||i;if(!v){$.window.showWarningMessage("MDOCX: No markdown file selected to edit.");return}let y=Ae.buildUri(e.uri,v);await $.window.showTextDocument(y,{preview:!1});return}case"getMarkdownContent":{if(!h.path)return;let v=await this.getMarkdownText(e.uri,h.path);await n.webview.postMessage({type:"markdownContent",path:h.path,content:v||""});return}case"renderPreview":{let v=await this.renderLivePreview(e.uri,h.path,h.content);await n.webview.postMessage({type:"previewHtml",path:h.path,...v});return}case"search":{let v=await this.search(e.uri,h.query);await n.webview.postMessage({type:"searchResults",query:h.query,results:v});return}case"saveContent":{if(!h.path){$.window.showWarningMessage("MDOCX: No file path specified.");return}await l(()=>de(e.uri,y=>{let w=y.markdown.files.find(x=>x.path===h.path);if(!w)throw new Error(`File "${h.path}" not found in this MDOCX`);w.content=Je(h.content)}))&&await n.webview.postMessage({type:"saved",path:h.path});return}case"saveMetadata":{await l(()=>this.saveMetadata(e.uri,h.metadata),"MDOCX: Metadata saved.");return}case"addMedia":{let v=await $.window.showOpenDialog({canSelectMany:!0,openLabel:"Add Media",filters:{Images:["png","jpg","jpeg","gif","webp","svg","avif"],Media:["mp3","wav","ogg","mp4","webm"],"All Files":["*"]}});v&&v.length>0&&await l(()=>this.addMediaFiles(e.uri,v),`MDOCX: Added ${v.length} media file(s).`);return}case"removeMedia":{if(!await d(`Remove media "${h.id}" from MDOCX?`,"Remove"))return;await l(()=>de(e.uri,v=>{let y=v.media.items.findIndex(w=>w.id===h.id);y>=0&&v.media.items.splice(y,1)}),"MDOCX: Media removed.");return}case"replaceMedia":{let v=await $.window.showOpenDialog({canSelectMany:!1,openLabel:"Replace Media",filters:{"All Files":["*"]}});v&&v.length>0&&await l(()=>this.replaceMedia(e.uri,h.id,v[0]),"MDOCX: Media replaced.");return}case"exportMedia":{await this.exportMedia(e.uri,h.id);return}case"addMarkdown":{let v=(await this.safeReadDocument(e.uri))?.markdown.files.map(x=>x.path)??[],y=await $.window.showInputBox({prompt:"Enter the path for the new markdown file",value:"new-file.md",validateInput:x=>this.validateMarkdownPath(x,v)});if(!y)return;await l(()=>de(e.uri,x=>{let E=oe.basename(y,oe.extname(y));x.markdown.files.push({path:y,content:Je(`# ${E}

Start writing here...
`)})}),`MDOCX: Added ${y}`)&&(i=y,await s(i));return}case"renameMarkdown":{let v=(await this.safeReadDocument(e.uri))?.markdown.files.map(x=>x.path)??[],y=await $.window.showInputBox({prompt:"Enter the new path for this markdown file",value:h.path,validateInput:x=>x===h.path?void 0:this.validateMarkdownPath(x,v)});if(!y||y===h.path)return;await l(()=>de(e.uri,x=>{let E=x.markdown.files.find(k=>k.path===h.path);if(!E)throw new Error(`File "${h.path}" not found in this MDOCX`);E.path=y,x.markdown.rootPath===h.path&&(x.markdown.rootPath=y),x.metadata?.root===h.path&&(x.metadata.root=y)}),`MDOCX: Renamed to ${y}`)&&i===h.path&&(i=y,await s(i));return}case"duplicateMarkdown":{await l(()=>de(e.uri,v=>{let y=v.markdown.files.find(C=>C.path===h.path);if(!y)throw new Error(`File "${h.path}" not found in this MDOCX`);let w=new Set(v.markdown.files.map(C=>C.path)),x=oe.extname(h.path),E=h.path.slice(0,h.path.length-x.length),k=`${E}-copy${x}`,I=2;for(;w.has(k);)k=`${E}-copy-${I++}${x}`;v.markdown.files.push({path:k,content:y.content.slice()})}),"MDOCX: File duplicated.");return}case"setRoot":{await l(()=>de(e.uri,v=>{v.markdown.rootPath=h.path,v.metadata=v.metadata||{},v.metadata.root=h.path}),`MDOCX: Root file set to ${h.path}`);return}case"deleteMarkdown":{if(!await d(`Delete "${h.path}" from MDOCX? This cannot be undone.`,"Delete"))return;await l(()=>de(e.uri,y=>{let w=y.markdown.files.findIndex(x=>x.path===h.path);w>=0&&y.markdown.files.splice(w,1),y.markdown.rootPath===h.path&&y.markdown.files.length>0&&(y.markdown.rootPath=y.markdown.files[0].path)}),"MDOCX: File deleted.")&&i===h.path&&(i=void 0,await s(void 0));return}case"exportHtml":{await $.commands.executeCommand("mdocx.exportHtml",e.uri);return}}}),f=new $.RelativePattern(oe.dirname(e.uri.fsPath),oe.basename(e.uri.fsPath)),u=$.workspace.createFileSystemWatcher(f),p=async()=>{Date.now()-a<pc||await s(i)},m=[u,u.onDidChange(p),u.onDidCreate(p),u.onDidDelete(async()=>{await n.webview.postMessage({type:"render",path:"",title:"MDOCX",description:void 0,html:"",fileList:[],error:"The file was deleted from disk."})})];n.webview.html=this.getWebviewHtml(n.webview);let g=setTimeout(async()=>{o||await s(i)},500);n.onDidDispose(()=>{clearTimeout(g),c.dispose(),m.forEach(h=>h.dispose())})}validateMarkdownPath(e,n){let r=(e||"").trim();if(!r)return"File name cannot be empty";if(!/\.(md|markdown)$/i.test(r))return"File must have a .md or .markdown extension";if(r.startsWith("/")||r.includes("..")||/^[a-zA-Z]:/.test(r))return'Use a relative path inside the container (no "..", no drive letters)';if(n.includes(r))return`"${r}" already exists in this MDOCX`}async safeReadDocument(e){try{return await ie(e)}catch{return}}countWords(e){let n=e.match(/[\p{L}\p{N}'-]+/gu);return n?n.length:0}async renderDocument(e,n){try{let r=await ie(e),{MediaResolver:i}=await Promise.resolve().then(()=>(Ke(),Qe)),o=r.markdown.rootPath??(typeof r.metadata?.root=="string"?r.metadata.root:void 0),a=r.markdown.files.map(w=>({path:w.path,words:this.countWords(Ze(w.content)),size:w.content.byteLength,isRoot:w.path===o})).sort((w,x)=>w.path.localeCompare(x.path)),s=wr(r,n);if(!s)return{type:"render",path:n??"",html:"",fileList:a,error:"No markdown files found in this MDOCX."};let l=Ze(s.content),d=new i(r),c=new Set(r.markdown.files.map(w=>w.path)),{html:f,outline:u}=Ft(l,{resolveMediaHref:w=>this.tryResolveMediaHrefToDataUri(d,w,s),resolveFileHref:w=>this.resolveEmbeddedFile(w,c)}),p=typeof r.metadata?.title=="string"?r.metadata.title:void 0,m=typeof r.metadata?.description=="string"?r.metadata.description:void 0,g={title:p,description:m,author:typeof r.metadata?.creator=="string"?r.metadata.creator:void 0,root:o,tags:Array.isArray(r.metadata?.tags)?r.metadata.tags:void 0},h=r.markdown.files.map(w=>Ze(w.content)).join(`
`),v=r.media.items.map(w=>{let x=Ye(w),E={id:w.id,path:w.path,mimeType:x,size:w.data?.byteLength??0,used:this.isMediaReferenced(w,h)};return x.startsWith("image/")&&w.data&&w.data.byteLength<512*1024&&(E.dataUri=Bt(x,w.data)),E}),y={files:a.length,media:v.length,words:a.reduce((w,x)=>w+x.words,0),mediaBytes:v.reduce((w,x)=>w+x.size,0)};return{type:"render",path:s.path,title:p,description:m,html:f,markdown:l,outline:u,fileList:a,metadata:g,mediaItems:v,stats:y}}catch(r){let i=r instanceof Error?r.message:String(r);return{type:"render",path:n??"",html:"",fileList:[],error:`Failed to read MDOCX: ${i}`}}}async renderLivePreview(e,n,r){try{let i=await ie(e),{MediaResolver:o}=await Promise.resolve().then(()=>(Ke(),Qe)),a=new o(i),s=new Set(i.markdown.files.map(l=>l.path));return Ft(r,{resolveMediaHref:l=>this.tryResolveMediaHrefToDataUri(a,l,{path:n}),resolveFileHref:l=>this.resolveEmbeddedFile(l,s)})}catch{return{html:"",outline:[]}}}async search(e,n){let r=(n||"").trim();if(r.length<2)return[];let i=await this.safeReadDocument(e);if(!i)return[];let o=r.toLowerCase(),a=[],s=200;for(let l of i.markdown.files){let d=Ze(l.content).split(/\r?\n/);for(let c=0;c<d.length;c++)if(d[c].toLowerCase().includes(o)&&(a.push({path:l.path,line:c+1,text:d[c].trim().slice(0,160)}),a.length>=s))return a}return a}isMediaReferenced(e,n){if(n.includes(e.id))return!0;if(e.path){if(n.includes(e.path))return!0;let r=e.path.split("/").pop();if(r&&n.includes(r))return!0}return!1}resolveEmbeddedFile(e,n){if(!(!e||pt(e))){for(let r of ft(e))if(n.has(r))return r}}async getMarkdownText(e,n){try{let r=await ie(e),i=wr(r,n);return i?Ze(i.content):void 0}catch{return}}async saveMetadata(e,n){await de(e,r=>{let i=r.metadata||{};n.title!==void 0&&(i.title=n.title),n.description!==void 0&&(i.description=n.description),n.author!==void 0&&(i.creator=n.author),n.root!==void 0&&(i.root=n.root),n.tags!==void 0&&(i.tags=n.tags),r.metadata=i,n.root!==void 0&&(r.markdown.rootPath=n.root)})}async addMediaFiles(e,n){let r=await Promise.all(n.map(async i=>({data:new Uint8Array(await $.workspace.fs.readFile(i)),fileName:oe.basename(i.fsPath)})));await de(e,i=>{let o=new Set(i.media.items.map(a=>a.id));for(let{data:a,fileName:s}of r){let l=yn(s,o);o.add(l),i.media.items.push({id:l,path:`media/${s}`,mimeType:lt(oe.extname(s)),data:a})}})}async replaceMedia(e,n,r){let i=new Uint8Array(await $.workspace.fs.readFile(r)),o=oe.basename(r.fsPath);await de(e,a=>{let s=a.media.items.find(l=>l.id===n);if(!s)throw new Error(`Media "${n}" not found in this MDOCX`);s.data=i,s.mimeType=lt(oe.extname(o)),s.path=`media/${o}`})}async exportMedia(e,n){try{let i=(await ie(e)).media.items.find(s=>s.id===n);if(!i?.data){$.window.showWarningMessage(`MDOCX: Media "${n}" has no data.`);return}let o=i.path?oe.basename(i.path):n,a=await $.window.showSaveDialog({defaultUri:$.Uri.joinPath($.Uri.file(oe.dirname(e.fsPath)),o),saveLabel:"Export Media"});if(!a)return;await $.workspace.fs.writeFile(a,i.data),$.window.showInformationMessage(`MDOCX: Exported ${o}`)}catch(r){let i=r instanceof Error?r.message:String(r);$.window.showErrorMessage(`MDOCX: ${i}`)}}tryResolveMediaHrefToDataUri(e,n,r){if(!n||pt(n))return;let i;for(let a of ft(n)){try{if(i=e.resolve(a,r),i)break}catch{}try{if(!i&&typeof e.getByPath=="function"&&(i=e.getByPath(a),i))break}catch{}try{let s=/^mdocx:\/\/media\/(.+)$/i.exec(a);if(!i&&s&&typeof e.getById=="function"&&(i=e.getById(s[1]),i))break}catch{}}if(!i||!i.data)return;let o=mo();if(!(typeof i.data.byteLength=="number"&&i.data.byteLength>o))return Bt(Ye(i),i.data)}getWebviewHtml(e){let n=String(Date.now());return`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data: https: http:; media-src data:; style-src 'unsafe-inline'; script-src 'nonce-${n}';" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MDOCX Preview</title>
  <style>
    :root {
      color-scheme: light dark;
      --border-color: var(--vscode-editorGroup-border, rgba(128,128,128,0.35));
      --panel-bg: color-mix(in srgb, var(--vscode-editor-background) 92%, black);
      --panel-hover-bg: color-mix(in srgb, var(--vscode-editor-background) 85%, black);
      --danger-bg: var(--vscode-inputValidation-errorBackground, #5a1d1d);
      --header-height: 52px;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 0;
      font-family: var(--vscode-font-family);
      color: var(--vscode-foreground);
      background: var(--vscode-editor-background);
      overflow: hidden;
    }
    header {
      height: var(--header-height);
      padding: 0 12px;
      border-bottom: 1px solid var(--border-color);
      background: var(--vscode-editor-background);
      display: flex;
      gap: 8px;
      align-items: center;
    }
    header .meta {
      flex: 1;
      min-width: 60px;
      display: flex;
      flex-direction: column;
      gap: 1px;
      overflow: hidden;
    }
    header .meta .title {
      font-weight: 600;
      font-size: 13px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    header .meta .desc {
      opacity: 0.65;
      font-size: 11px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    select, input, textarea {
      padding: 5px 8px;
      border: 1px solid var(--vscode-input-border, var(--border-color));
      background: var(--vscode-input-background);
      color: var(--vscode-input-foreground);
      border-radius: 4px;
      font-family: var(--vscode-font-family);
      font-size: 12px;
      width: 100%;
    }
    select:focus, input:focus, textarea:focus {
      outline: 1px solid var(--vscode-focusBorder);
      outline-offset: -1px;
    }
    button {
      border: 1px solid var(--vscode-button-border, transparent);
      background: var(--vscode-button-background);
      color: var(--vscode-button-foreground);
      padding: 5px 10px;
      border-radius: 4px;
      cursor: pointer;
      font-family: var(--vscode-font-family);
      font-size: 12px;
      font-weight: 500;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      white-space: nowrap;
    }
    button svg { width: 13px; height: 13px; fill: currentColor; opacity: 0.9; }
    button:hover { background: var(--vscode-button-hoverBackground); }
    button:disabled { opacity: 0.5; cursor: not-allowed; }
    button.secondary {
      background: var(--vscode-button-secondaryBackground);
      color: var(--vscode-button-secondaryForeground);
    }
    button.secondary:hover { background: var(--vscode-button-secondaryHoverBackground); }
    button.small { padding: 3px 7px; font-size: 11px; }
    button.icon {
      background: transparent;
      border: none;
      color: var(--vscode-foreground);
      padding: 2px 4px;
      opacity: 0.75;
    }
    button.icon:hover { opacity: 1; background: var(--panel-hover-bg); }

    .layout {
      display: grid;
      grid-template-columns: 280px 1fr;
      height: calc(100vh - var(--header-height));
    }
    .layout.sidebar-hidden { grid-template-columns: 1fr; }
    .layout.sidebar-hidden .sidebar { display: none; }
    @media (max-width: 760px) {
      .layout { grid-template-columns: 1fr; }
      .sidebar { border-right: none !important; border-bottom: 1px solid var(--border-color); }
    }
    .sidebar {
      border-right: 1px solid var(--border-color);
      background: var(--panel-bg);
      overflow-y: auto;
    }
    .main-content {
      overflow: hidden;
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .view-area { flex: 1; display: flex; min-height: 0; }
    .view-area > section {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .view-area.mode-preview #editorView { display: none; }
    .view-area.mode-edit #previewView { display: none; }
    .view-area.mode-split #editorView { border-left: 1px solid var(--border-color); }

    .doc-body {
      padding: 20px 26px 60px;
      overflow-y: auto;
      flex: 1;
      line-height: 1.6;
    }
    .doc-body img { max-width: 100%; border-radius: 4px; }
    .doc-body h1, .doc-body h2, .doc-body h3, .doc-body h4 { line-height: 1.3; }
    .doc-body h1:first-child { margin-top: 0; }
    .doc-body h1, .doc-body h2 { border-bottom: 1px solid var(--border-color); padding-bottom: 0.25em; }
    .doc-body .heading-anchor {
      opacity: 0;
      text-decoration: none;
      margin-left: -0.8em;
      padding-right: 0.3em;
      color: var(--vscode-textLink-foreground);
      font-weight: 400;
    }
    .doc-body h1:hover .heading-anchor,
    .doc-body h2:hover .heading-anchor,
    .doc-body h3:hover .heading-anchor,
    .doc-body h4:hover .heading-anchor { opacity: 0.6; }
    .doc-body a { color: var(--vscode-textLink-foreground); }
    .doc-body blockquote {
      margin: 1em 0;
      padding: 0.4em 1em;
      border-left: 3px solid var(--vscode-textBlockQuote-border, var(--border-color));
      background: var(--vscode-textBlockQuote-background, transparent);
    }
    .doc-body table {
      border-collapse: collapse;
      margin: 1em 0;
      display: block;
      overflow-x: auto;
      max-width: 100%;
    }
    .doc-body th, .doc-body td { border: 1px solid var(--border-color); padding: 6px 10px; text-align: left; }
    .doc-body th { background: var(--panel-bg); }
    .doc-body code {
      font-family: var(--vscode-editor-font-family);
      font-size: 0.92em;
      background: var(--panel-hover-bg);
      padding: 0.1em 0.35em;
      border-radius: 3px;
    }
    .doc-body .code-block { position: relative; margin: 1em 0; }
    .doc-body .code-block pre {
      margin: 0;
      padding: 12px;
      overflow: auto;
      background: var(--panel-bg);
      border: 1px solid var(--border-color);
      border-radius: 6px;
    }
    .doc-body .code-block pre code { background: none; padding: 0; }
    .doc-body .code-block .code-lang {
      position: absolute;
      top: 7px;
      right: 66px;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      opacity: 0.5;
    }
    .doc-body .code-block .copy-code {
      position: absolute;
      top: 4px;
      right: 6px;
      opacity: 0;
      transition: opacity 0.12s;
    }
    .doc-body .code-block:hover .copy-code { opacity: 1; }
    .doc-body input[type="checkbox"] { margin-right: 6px; }
    .doc-body .missing-media {
      display: inline-block;
      padding: 2px 6px;
      border: 1px dashed var(--vscode-errorForeground);
      border-radius: 4px;
      font-size: 11px;
      opacity: 0.8;
    }
    .doc-body hr { border: none; border-top: 1px solid var(--border-color); }

    .error {
      color: var(--vscode-errorForeground);
      padding: 10px 14px;
      border: 1px solid var(--vscode-errorForeground);
      border-radius: 6px;
      margin: 12px 24px;
      white-space: pre-wrap;
    }

    .sidebar-section { border-bottom: 1px solid var(--border-color); }
    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 9px 12px;
      cursor: pointer;
      user-select: none;
      font-weight: 600;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      opacity: 0.85;
    }
    .section-header:hover { background: var(--panel-hover-bg); }
    .section-header .chevron { width: 12px; height: 12px; fill: currentColor; transition: transform 0.15s; }
    .section-header.collapsed .chevron { transform: rotate(-90deg); }
    .section-header.collapsed + .section-body { display: none; }
    .section-body { padding: 6px 10px 12px; }
    .section-actions { display: flex; gap: 6px; margin-bottom: 8px; align-items: center; }
    .section-actions input { flex: 1; }

    .file-list, .outline-list, .search-results { list-style: none; margin: 0; padding: 0; }
    .file-item {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 5px 6px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12.5px;
    }
    .file-item:hover { background: var(--panel-hover-bg); }
    .file-item.selected {
      background: var(--vscode-list-activeSelectionBackground);
      color: var(--vscode-list-activeSelectionForeground);
    }
    .file-item .file-icon { width: 14px; height: 14px; fill: currentColor; opacity: 0.7; flex-shrink: 0; }
    .file-item .file-name { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .file-item .file-actions { display: none; gap: 1px; }
    .file-item:hover .file-actions { display: flex; }
    .file-item.root-file .file-name::after {
      content: 'root';
      margin-left: 6px;
      font-size: 9px;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      opacity: 0.6;
      border: 1px solid currentColor;
      border-radius: 6px;
      padding: 0 4px;
    }

    .outline-list li {
      padding: 3px 6px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      opacity: 0.9;
    }
    .outline-list li:hover { background: var(--panel-hover-bg); }
    .outline-list li[data-level="1"] { font-weight: 600; }
    .outline-list li[data-level="2"] { padding-left: 16px; }
    .outline-list li[data-level="3"] { padding-left: 28px; opacity: 0.8; }
    .outline-list li[data-level="4"], .outline-list li[data-level="5"], .outline-list li[data-level="6"] {
      padding-left: 40px;
      opacity: 0.7;
    }

    .search-results li {
      padding: 5px 6px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 11.5px;
      border-left: 2px solid transparent;
    }
    .search-results li:hover { background: var(--panel-hover-bg); border-left-color: var(--vscode-focusBorder); }
    .search-results .result-path { opacity: 0.65; font-size: 10px; }
    .search-results .result-text {
      font-family: var(--vscode-editor-font-family);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .search-results mark {
      background: var(--vscode-editor-findMatchHighlightBackground, rgba(234,179,8,0.35));
      color: inherit;
    }

    .media-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(92px, 1fr)); gap: 8px; }
    .media-item {
      border: 1px solid var(--border-color);
      border-radius: 6px;
      padding: 6px;
      text-align: center;
      background: var(--vscode-editor-background);
      position: relative;
    }
    .media-item.unused { border-style: dashed; opacity: 0.75; }
    .media-item.unused::after {
      content: 'unused';
      position: absolute;
      top: 3px;
      right: 4px;
      font-size: 8px;
      text-transform: uppercase;
      opacity: 0.6;
    }
    .media-item img { max-width: 100%; max-height: 56px; object-fit: contain; margin-bottom: 4px; border-radius: 2px; }
    .media-item .placeholder {
      height: 46px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--panel-bg);
      border-radius: 4px;
      margin-bottom: 4px;
      font-size: 9px;
      opacity: 0.6;
      word-break: break-all;
    }
    .media-item .info { font-size: 9.5px; word-break: break-all; opacity: 0.8; }
    .media-item .actions { margin-top: 5px; display: flex; gap: 2px; justify-content: center; flex-wrap: wrap; }

    .form-row { display: flex; flex-direction: column; gap: 4px; margin-bottom: 9px; }
    .form-row:last-child { margin-bottom: 0; }
    .form-row label { font-size: 10px; opacity: 0.7; text-transform: uppercase; letter-spacing: 0.3px; }
    .form-row textarea { min-height: 48px; resize: vertical; }
    .btn-row { display: flex; gap: 8px; margin-top: 10px; }

    .empty-state { text-align: center; padding: 14px; opacity: 0.55; font-size: 11.5px; }
    .badge {
      background: var(--vscode-badge-background);
      color: var(--vscode-badge-foreground);
      font-size: 10px;
      padding: 1px 6px;
      border-radius: 10px;
      margin-left: 6px;
    }
    .stats-line { padding: 8px 12px; font-size: 10.5px; opacity: 0.6; }

    .view-toggle {
      display: flex;
      border: 1px solid var(--vscode-button-border, var(--border-color));
      border-radius: 4px;
      overflow: hidden;
    }
    .view-toggle button {
      border: none;
      border-radius: 0;
      background: var(--vscode-button-secondaryBackground);
      color: var(--vscode-button-secondaryForeground);
    }
    .view-toggle button + button { border-left: 1px solid var(--vscode-button-border, var(--border-color)); }
    .view-toggle button.active {
      background: var(--vscode-button-background);
      color: var(--vscode-button-foreground);
    }
    .view-toggle button:hover:not(.active) { background: var(--vscode-button-secondaryHoverBackground); }

    .editor-toolbar {
      display: flex;
      gap: 3px;
      align-items: center;
      padding: 6px 10px;
      border-bottom: 1px solid var(--border-color);
      flex-wrap: wrap;
    }
    .editor-toolbar .spacer { flex: 1; }
    .editor-toolbar .file-path {
      font-size: 11px;
      opacity: 0.7;
      font-family: var(--vscode-editor-font-family);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 180px;
    }
    .fmt-btn {
      background: transparent;
      border: 1px solid transparent;
      color: var(--vscode-foreground);
      padding: 2px 6px;
      font-size: 12px;
      min-width: 26px;
      justify-content: center;
      opacity: 0.8;
    }
    .fmt-btn:hover { background: var(--panel-hover-bg); opacity: 1; }
    #markdownEditor {
      flex: 1;
      width: 100%;
      padding: 14px;
      border: none;
      border-radius: 0;
      background: var(--vscode-editor-background);
      color: var(--vscode-editor-foreground, var(--vscode-foreground));
      font-family: var(--vscode-editor-font-family);
      font-size: 13px;
      line-height: 1.55;
      resize: none;
      tab-size: 2;
    }
    #markdownEditor:focus { outline: none; }
    .editor-status {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      padding: 5px 12px;
      font-size: 11px;
      opacity: 0.75;
      border-top: 1px solid var(--border-color);
    }
    .editor-status .modified { color: var(--vscode-gitDecoration-modifiedResourceForeground, #e2c08d); }

    .toast {
      position: fixed;
      bottom: 16px;
      right: 16px;
      background: var(--vscode-notifications-background, var(--panel-bg));
      border: 1px solid var(--border-color);
      border-radius: 6px;
      padding: 8px 14px;
      font-size: 12px;
      opacity: 0;
      transform: translateY(8px);
      transition: opacity 0.15s, transform 0.15s;
      pointer-events: none;
    }
    .toast.show { opacity: 1; transform: translateY(0); }
  </style>
</head>
<body>
  <header>
    <button id="toggleSidebarBtn" type="button" class="icon" title="Toggle sidebar">
      <svg viewBox="0 0 16 16" width="16" height="16"><path d="M1.5 2h13a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5zM2 3v10h3V3H2zm4 0v10h8V3H6z"/></svg>
    </button>
    <div class="meta">
      <div id="docTitle" class="title">MDOCX</div>
      <div id="docDesc" class="desc"></div>
    </div>
    <div class="view-toggle">
      <button id="previewToggle" type="button" class="active" title="Preview only">Preview</button>
      <button id="splitToggle" type="button" title="Split editor and live preview">Split</button>
      <button id="editToggle" type="button" title="Editor only">Edit</button>
    </div>
    <button id="copyBtn" type="button" class="secondary small" title="Copy markdown to clipboard">Copy</button>
    <button id="exportHtmlBtn" type="button" class="secondary small" title="Export rendered HTML">Export HTML</button>
    <button id="editExternalBtn" type="button" class="secondary small" title="Open in VS Code text editor">Open in Editor</button>
  </header>

  <div class="layout" id="layout">
    <aside class="sidebar">
      <div class="sidebar-section">
        <div class="section-header" id="filesHeader">
          <span>Files <span class="badge" id="fileCount">0</span></span>
          <svg class="chevron" viewBox="0 0 16 16"><path d="M6 12l4-4-4-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
        </div>
        <div class="section-body">
          <div class="section-actions">
            <input type="search" id="fileFilter" placeholder="Filter files..." />
            <button type="button" id="addFileBtn" class="small" title="Add markdown file">+</button>
          </div>
          <ul class="file-list" id="fileList"></ul>
        </div>
      </div>

      <div class="sidebar-section">
        <div class="section-header" id="outlineHeader">
          <span>Outline</span>
          <svg class="chevron" viewBox="0 0 16 16"><path d="M6 12l4-4-4-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
        </div>
        <div class="section-body">
          <ul class="outline-list" id="outlineList"></ul>
        </div>
      </div>

      <div class="sidebar-section">
        <div class="section-header collapsed" id="searchHeader">
          <span>Search <span class="badge" id="searchCount">0</span></span>
          <svg class="chevron" viewBox="0 0 16 16"><path d="M6 12l4-4-4-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
        </div>
        <div class="section-body">
          <div class="section-actions">
            <input type="search" id="searchInput" placeholder="Search all documents..." />
          </div>
          <ul class="search-results" id="searchResults"></ul>
        </div>
      </div>

      <div class="sidebar-section">
        <div class="section-header" id="mediaHeader">
          <span>Media <span class="badge" id="mediaCount">0</span></span>
          <svg class="chevron" viewBox="0 0 16 16"><path d="M6 12l4-4-4-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
        </div>
        <div class="section-body">
          <div class="section-actions">
            <button type="button" id="addMediaBtn" class="small">+ Add Media</button>
          </div>
          <div class="media-grid" id="mediaGrid"></div>
        </div>
      </div>

      <div class="sidebar-section">
        <div class="section-header collapsed" id="metadataHeader">
          <span>Metadata</span>
          <svg class="chevron" viewBox="0 0 16 16"><path d="M6 12l4-4-4-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
        </div>
        <div class="section-body">
          <div class="form-row">
            <label for="metaTitle">Title</label>
            <input type="text" id="metaTitle" placeholder="Document title" />
          </div>
          <div class="form-row">
            <label for="metaDescription">Description</label>
            <textarea id="metaDescription" placeholder="Description"></textarea>
          </div>
          <div class="form-row">
            <label for="metaAuthor">Author</label>
            <input type="text" id="metaAuthor" placeholder="Author" />
          </div>
          <div class="form-row">
            <label for="metaRoot">Root File</label>
            <select id="metaRoot"></select>
          </div>
          <div class="form-row">
            <label for="metaTags">Tags</label>
            <input type="text" id="metaTags" placeholder="tag1, tag2" />
          </div>
          <div class="btn-row">
            <button type="button" id="saveMetadataBtn" class="small">Save Metadata</button>
          </div>
        </div>
      </div>

      <div class="stats-line" id="statsLine"></div>
    </aside>

    <main class="main-content">
      <div id="error" class="error" style="display:none"></div>
      <div class="view-area mode-preview" id="viewArea">
        <section id="previewView">
          <div class="doc-body" id="content"></div>
        </section>
        <section id="editorView">
          <div class="editor-toolbar">
            <button type="button" class="fmt-btn" data-fmt="bold" title="Bold (Ctrl+B)"><b>B</b></button>
            <button type="button" class="fmt-btn" data-fmt="italic" title="Italic (Ctrl+I)"><i>I</i></button>
            <button type="button" class="fmt-btn" data-fmt="code" title="Inline code">&lt;/&gt;</button>
            <button type="button" class="fmt-btn" data-fmt="heading" title="Heading">H</button>
            <button type="button" class="fmt-btn" data-fmt="link" title="Link (Ctrl+K)">Link</button>
            <button type="button" class="fmt-btn" data-fmt="ul" title="Bullet list">&bull;</button>
            <button type="button" class="fmt-btn" data-fmt="ol" title="Numbered list">1.</button>
            <button type="button" class="fmt-btn" data-fmt="quote" title="Blockquote">&ldquo;</button>
            <button type="button" class="fmt-btn" data-fmt="table" title="Table">Table</button>
            <button type="button" class="fmt-btn" data-fmt="codeblock" title="Code block">Code</button>
            <span class="spacer"></span>
            <span class="file-path" id="editorFilePath"></span>
            <button type="button" id="discardBtn" class="secondary small">Discard</button>
            <button type="button" id="saveBtn" class="small">Save</button>
          </div>
          <textarea id="markdownEditor" spellcheck="true" placeholder="Enter markdown content..."></textarea>
          <div class="editor-status">
            <span id="editorStatus"></span>
            <span id="editorCounts">0 words</span>
          </div>
        </section>
      </div>
    </main>
  </div>

  <div class="toast" id="toast"></div>

  <script nonce="${n}">
    const vscode = acquireVsCodeApi();
    const state = vscode.getState() || {};

    const $ = (id) => document.getElementById(id);
    const content = $('content');
    const errorBox = $('error');
    const docTitle = $('docTitle');
    const docDesc = $('docDesc');
    const fileList = $('fileList');
    const fileCount = $('fileCount');
    const fileFilter = $('fileFilter');
    const outlineList = $('outlineList');
    const searchInput = $('searchInput');
    const searchResults = $('searchResults');
    const searchCount = $('searchCount');
    const mediaGrid = $('mediaGrid');
    const mediaCount = $('mediaCount');
    const statsLine = $('statsLine');
    const metaTitle = $('metaTitle');
    const metaDescription = $('metaDescription');
    const metaAuthor = $('metaAuthor');
    const metaRoot = $('metaRoot');
    const metaTags = $('metaTags');
    const viewArea = $('viewArea');
    const layout = $('layout');
    const markdownEditor = $('markdownEditor');
    const editorFilePath = $('editorFilePath');
    const editorStatus = $('editorStatus');
    const editorCounts = $('editorCounts');
    const toast = $('toast');
    const previewToggle = $('previewToggle');
    const splitToggle = $('splitToggle');
    const editToggle = $('editToggle');

    let currentFiles = [];
    let currentPath = '';
    let rootPath = '';
    let mode = state.mode || 'preview';
    let originalContent = '';
    let isModified = false;
    let livePreviewTimer = null;
    let searchTimer = null;
    let toastTimer = null;

    function escapeHtml(str) {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    function formatBytes(bytes) {
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
      return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    }

    function showToast(message) {
      toast.textContent = message;
      toast.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
    }

    function setError(message) {
      errorBox.style.display = message ? 'block' : 'none';
      errorBox.textContent = message || '';
    }

    function isEditing() { return mode === 'edit' || mode === 'split'; }

    function confirmDiscard() {
      return !isModified || confirm('You have unsaved changes. Discard them?');
    }

    function persistState() {
      vscode.setState({ selectedPath: currentPath, mode: mode });
    }

    function applyMode() {
      viewArea.className = 'view-area mode-' + mode;
      previewToggle.classList.toggle('active', mode === 'preview');
      splitToggle.classList.toggle('active', mode === 'split');
      editToggle.classList.toggle('active', mode === 'edit');
    }

    function setMode(next) {
      if (next === mode) return;
      if (next === 'preview' && !confirmDiscard()) return;
      if (next === 'preview' && isModified) {
        markdownEditor.value = originalContent;
      }
      mode = next;
      applyMode();
      persistState();
      if (isEditing()) {
        editorFilePath.textContent = currentPath;
        if (!isModified) {
          vscode.postMessage({ type: 'getMarkdownContent', path: currentPath });
        }
        setTimeout(() => markdownEditor.focus(), 30);
      }
      updateEditorStatus();
    }

    function updateEditorStatus() {
      const value = markdownEditor.value;
      const words = (value.match(/[\\p{L}\\p{N}'-]+/gu) || []).length;
      const minutes = Math.max(1, Math.round(words / 200));
      editorCounts.textContent = words + ' words \\u00b7 ' + value.length + ' chars \\u00b7 ~' + minutes + ' min read';
      isModified = value !== originalContent;
      editorStatus.innerHTML = isModified ? '<span class="modified">\\u25cf Unsaved changes</span>' : '';
      if (mode === 'split') scheduleLivePreview();
    }

    function scheduleLivePreview() {
      clearTimeout(livePreviewTimer);
      livePreviewTimer = setTimeout(() => {
        vscode.postMessage({ type: 'renderPreview', path: currentPath, content: markdownEditor.value });
      }, 350);
    }

    function renderFileList() {
      const filter = fileFilter.value.trim().toLowerCase();
      const visible = currentFiles.filter((f) => !filter || f.path.toLowerCase().includes(filter));
      fileList.innerHTML = '';
      if (visible.length === 0) {
        fileList.innerHTML = '<li class="empty-state">' + (currentFiles.length ? 'No matches' : 'No files yet') + '</li>';
        return;
      }
      for (const file of visible) {
        const li = document.createElement('li');
        li.className = 'file-item' + (file.path === currentPath ? ' selected' : '') + (file.isRoot ? ' root-file' : '');
        li.title = file.path + ' \\u2014 ' + file.words + ' words \\u00b7 ' + formatBytes(file.size);
        li.dataset.path = file.path;
        const safePath = escapeHtml(file.path);
        li.innerHTML =
          '<svg class="file-icon" viewBox="0 0 16 16"><path d="M4 0h5.5L14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 0v4.5H14L9.5 0z"/></svg>' +
          '<span class="file-name">' + safePath + '</span>' +
          '<span class="file-actions">' +
          '<button type="button" class="icon" title="Set as root file" data-action="root" data-path="' + safePath + '">&#9733;</button>' +
          '<button type="button" class="icon" title="Rename" data-action="rename" data-path="' + safePath + '">&#9998;</button>' +
          '<button type="button" class="icon" title="Duplicate" data-action="duplicate" data-path="' + safePath + '">&#10697;</button>' +
          '<button type="button" class="icon" title="Delete" data-action="delete" data-path="' + safePath + '">&#10005;</button>' +
          '</span>';
        fileList.appendChild(li);
      }
    }

    function setFiles(files, selected, root) {
      currentFiles = files || [];
      currentPath = selected || (currentFiles[0] && currentFiles[0].path) || '';
      rootPath = root || '';
      fileCount.textContent = currentFiles.length;
      renderFileList();

      metaRoot.innerHTML = '';
      for (const file of currentFiles) {
        const opt = document.createElement('option');
        opt.value = file.path;
        opt.textContent = file.path;
        metaRoot.appendChild(opt);
      }
      if (rootPath) metaRoot.value = rootPath;
    }

    function setOutline(outline) {
      const entries = outline || [];
      outlineList.innerHTML = '';
      if (entries.length === 0) {
        outlineList.innerHTML = '<li class="empty-state">No headings</li>';
        return;
      }
      for (const entry of entries) {
        const li = document.createElement('li');
        li.dataset.level = entry.level;
        li.dataset.id = entry.id;
        li.textContent = entry.text;
        li.title = entry.text;
        outlineList.appendChild(li);
      }
    }

    function setMetadata(metadata) {
      if (!metadata) return;
      metaTitle.value = metadata.title || '';
      metaDescription.value = metadata.description || '';
      metaAuthor.value = metadata.author || '';
      if (metadata.root) {
        rootPath = metadata.root;
        metaRoot.value = metadata.root;
      }
      metaTags.value = Array.isArray(metadata.tags) ? metadata.tags.join(', ') : '';
    }

    function setMediaItems(items) {
      mediaCount.textContent = items ? items.length : 0;
      mediaGrid.innerHTML = '';
      if (!items || items.length === 0) {
        mediaGrid.innerHTML = '<div class="empty-state">No media</div>';
        return;
      }
      for (const item of items) {
        const div = document.createElement('div');
        div.className = 'media-item' + (item.used ? '' : ' unused');
        div.title = (item.path || item.id) + ' \\u2014 ' + (item.mimeType || 'unknown');
        const safeId = escapeHtml(item.id);
        const preview = item.dataUri
          ? '<img src="' + item.dataUri + '" alt="' + safeId + '" />'
          : '<div class="placeholder">' + escapeHtml(item.mimeType || 'binary') + '</div>';
        div.innerHTML = preview +
          '<div class="info">' + safeId + '<br/>' + formatBytes(item.size) + '</div>' +
          '<div class="actions">' +
          '<button type="button" class="icon" title="Insert reference at cursor" data-action="insert" data-id="' + safeId +
            '" data-path="' + escapeHtml(item.path || '') + '" data-mime="' + escapeHtml(item.mimeType || '') + '">&#43;</button>' +
          '<button type="button" class="icon" title="Export to disk" data-action="export" data-id="' + safeId + '">&#8615;</button>' +
          '<button type="button" class="icon" title="Replace" data-action="replace" data-id="' + safeId + '">&#8646;</button>' +
          '<button type="button" class="icon" title="Remove" data-action="remove" data-id="' + safeId + '">&#10005;</button>' +
          '</div>';
        mediaGrid.appendChild(div);
      }
    }

    function setStats(stats) {
      if (!stats) { statsLine.textContent = ''; return; }
      statsLine.textContent = stats.files + ' files \\u00b7 ' + stats.words + ' words \\u00b7 ' +
        stats.media + ' media (' + formatBytes(stats.mediaBytes) + ')';
    }

    function enhancePreview() {
      content.querySelectorAll('.code-block').forEach((block) => {
        if (block.querySelector('.copy-code')) return;
        const lang = block.dataset.lang;
        if (lang) {
          const label = document.createElement('span');
          label.className = 'code-lang';
          label.textContent = lang;
          block.appendChild(label);
        }
        const btn = document.createElement('button');
        btn.className = 'copy-code secondary small';
        btn.type = 'button';
        btn.textContent = 'Copy';
        btn.addEventListener('click', () => {
          const code = block.querySelector('code');
          if (!code) return;
          navigator.clipboard.writeText(code.textContent || '').then(() => showToast('Code copied'));
        });
        block.appendChild(btn);
      });
    }

    function replaceSelection(before, after, placeholder) {
      const start = markdownEditor.selectionStart;
      const end = markdownEditor.selectionEnd;
      const value = markdownEditor.value;
      const selected = value.slice(start, end) || placeholder || '';
      markdownEditor.value = value.slice(0, start) + before + selected + after + value.slice(end);
      markdownEditor.selectionStart = start + before.length;
      markdownEditor.selectionEnd = start + before.length + selected.length;
      markdownEditor.focus();
      updateEditorStatus();
    }

    function prefixLines(prefix, numbered) {
      const value = markdownEditor.value;
      const start = value.lastIndexOf('\\n', Math.max(0, markdownEditor.selectionStart - 1)) + 1;
      let end = value.indexOf('\\n', markdownEditor.selectionEnd);
      if (end === -1) end = value.length;
      const lines = value.slice(start, end).split('\\n');
      const updated = lines.map((line, i) => (numbered ? (i + 1) + '. ' : prefix) + line).join('\\n');
      markdownEditor.value = value.slice(0, start) + updated + value.slice(end);
      markdownEditor.selectionStart = start;
      markdownEditor.selectionEnd = start + updated.length;
      markdownEditor.focus();
      updateEditorStatus();
    }

    function applyFormat(fmt) {
      if (fmt === 'bold') return replaceSelection('**', '**', 'bold text');
      if (fmt === 'italic') return replaceSelection('*', '*', 'italic text');
      if (fmt === 'code') return replaceSelection('\\u0060', '\\u0060', 'code');
      if (fmt === 'heading') return prefixLines('## ');
      if (fmt === 'link') return replaceSelection('[', '](https://)', 'link text');
      if (fmt === 'ul') return prefixLines('- ');
      if (fmt === 'ol') return prefixLines('', true);
      if (fmt === 'quote') return prefixLines('> ');
      if (fmt === 'table') return replaceSelection('\\n| Column A | Column B |\\n| --- | --- |\\n| ', ' | |\\n', 'value');
      if (fmt === 'codeblock') {
        const fence = '\\u0060\\u0060\\u0060';
        return replaceSelection('\\n' + fence + '\\n', '\\n' + fence + '\\n', 'code');
      }
    }

    function insertAtCursor(text) {
      const start = markdownEditor.selectionStart;
      const end = markdownEditor.selectionEnd;
      const value = markdownEditor.value;
      markdownEditor.value = value.slice(0, start) + text + value.slice(end);
      markdownEditor.selectionStart = markdownEditor.selectionEnd = start + text.length;
      markdownEditor.focus();
      updateEditorStatus();
    }

    function save() {
      if (!currentPath) return;
      vscode.postMessage({ type: 'saveContent', path: currentPath, content: markdownEditor.value });
      originalContent = markdownEditor.value;
      updateEditorStatus();
    }

    document.querySelectorAll('.section-header').forEach((header) => {
      header.addEventListener('click', () => header.classList.toggle('collapsed'));
    });

    fileList.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-action]');
      if (btn) {
        const action = btn.dataset.action;
        const target = btn.dataset.path;
        if (action === 'delete') vscode.postMessage({ type: 'deleteMarkdown', path: target });
        else if (action === 'rename') vscode.postMessage({ type: 'renameMarkdown', path: target });
        else if (action === 'duplicate') vscode.postMessage({ type: 'duplicateMarkdown', path: target });
        else if (action === 'root') vscode.postMessage({ type: 'setRoot', path: target });
        return;
      }
      const item = e.target.closest('.file-item[data-path]');
      if (!item || !confirmDiscard()) return;
      vscode.postMessage({ type: 'select', path: item.dataset.path });
    });

    fileFilter.addEventListener('input', renderFileList);

    outlineList.addEventListener('click', (e) => {
      const li = e.target.closest('li[data-id]');
      if (!li) return;
      if (mode === 'edit') setMode('split');
      const target = content.querySelector('[id="' + CSS.escape(li.dataset.id) + '"]');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    searchInput.addEventListener('input', () => {
      clearTimeout(searchTimer);
      const query = searchInput.value;
      searchTimer = setTimeout(() => vscode.postMessage({ type: 'search', query: query }), 250);
    });

    searchResults.addEventListener('click', (e) => {
      const li = e.target.closest('li[data-path]');
      if (!li || !confirmDiscard()) return;
      vscode.postMessage({ type: 'select', path: li.dataset.path });
    });

    mediaGrid.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-action]');
      if (!btn) return;
      const action = btn.dataset.action;
      const id = btn.dataset.id;
      if (action === 'replace') vscode.postMessage({ type: 'replaceMedia', id: id });
      else if (action === 'remove') vscode.postMessage({ type: 'removeMedia', id: id });
      else if (action === 'export') vscode.postMessage({ type: 'exportMedia', id: id });
      else if (action === 'insert') {
        const ref = btn.dataset.path || ('mdocx://media/' + id);
        const isImage = (btn.dataset.mime || '').indexOf('image/') === 0;
        if (!isEditing()) setMode('split');
        insertAtCursor((isImage ? '!' : '') + '[' + id + '](' + ref + ')');
        showToast('Reference inserted');
      }
    });

    content.addEventListener('click', (e) => {
      const link = e.target.closest('a[data-mdocx-file]');
      if (!link) return;
      e.preventDefault();
      if (!confirmDiscard()) return;
      vscode.postMessage({ type: 'select', path: link.dataset.mdocxFile });
    });

    document.querySelectorAll('.fmt-btn').forEach((btn) => {
      btn.addEventListener('click', () => applyFormat(btn.dataset.fmt));
    });

    $('toggleSidebarBtn').addEventListener('click', () => layout.classList.toggle('sidebar-hidden'));
    $('copyBtn').addEventListener('click', () => vscode.postMessage({ type: 'copy', path: currentPath }));
    $('exportHtmlBtn').addEventListener('click', () => vscode.postMessage({ type: 'exportHtml' }));
    $('editExternalBtn').addEventListener('click', () => vscode.postMessage({ type: 'editExternal', path: currentPath }));
    previewToggle.addEventListener('click', () => setMode('preview'));
    splitToggle.addEventListener('click', () => setMode('split'));
    editToggle.addEventListener('click', () => setMode('edit'));
    $('saveBtn').addEventListener('click', save);
    $('discardBtn').addEventListener('click', () => {
      if (isModified && !confirm('Discard all changes?')) return;
      markdownEditor.value = originalContent;
      updateEditorStatus();
    });
    $('addFileBtn').addEventListener('click', () => vscode.postMessage({ type: 'addMarkdown' }));
    $('addMediaBtn').addEventListener('click', () => vscode.postMessage({ type: 'addMedia' }));
    $('saveMetadataBtn').addEventListener('click', () => {
      const tagsStr = metaTags.value.trim();
      const tags = tagsStr ? tagsStr.split(',').map((t) => t.trim()).filter(Boolean) : [];
      vscode.postMessage({
        type: 'saveMetadata',
        metadata: {
          title: metaTitle.value,
          description: metaDescription.value,
          author: metaAuthor.value,
          root: metaRoot.value || undefined,
          tags: tags
        }
      });
    });

    markdownEditor.addEventListener('input', updateEditorStatus);

    markdownEditor.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      e.preventDefault();
      const start = markdownEditor.selectionStart;
      const value = markdownEditor.value;
      markdownEditor.value = value.slice(0, start) + '  ' + value.slice(markdownEditor.selectionEnd);
      markdownEditor.selectionStart = markdownEditor.selectionEnd = start + 2;
      updateEditorStatus();
    });

    document.addEventListener('keydown', (e) => {
      if (!(e.ctrlKey || e.metaKey)) return;
      const inEditor = document.activeElement === markdownEditor;
      if (e.key === 's') { e.preventDefault(); save(); }
      else if (e.key === 'b' && inEditor) { e.preventDefault(); applyFormat('bold'); }
      else if (e.key === 'i' && inEditor) { e.preventDefault(); applyFormat('italic'); }
      else if (e.key === 'k' && inEditor) { e.preventDefault(); applyFormat('link'); }
      else if (e.key === 'f') {
        e.preventDefault();
        $('searchHeader').classList.remove('collapsed');
        searchInput.focus();
      }
    });

    applyMode();
    vscode.postMessage({ type: 'ready', selectedPath: state.selectedPath });

    window.addEventListener('message', (event) => {
      const msg = event.data;
      if (!msg || typeof msg.type !== 'string') return;

      if (msg.type === 'markdownContent') {
        markdownEditor.value = msg.content || '';
        originalContent = msg.content || '';
        editorFilePath.textContent = msg.path || currentPath;
        updateEditorStatus();
        return;
      }

      if (msg.type === 'previewHtml') {
        content.innerHTML = msg.html || '';
        enhancePreview();
        setOutline(msg.outline);
        return;
      }

      if (msg.type === 'saved') {
        showToast('Saved ' + msg.path);
        return;
      }

      if (msg.type === 'searchResults') {
        const results = msg.results || [];
        searchCount.textContent = results.length;
        searchResults.innerHTML = '';
        if (results.length === 0) {
          const hint = msg.query && msg.query.trim().length >= 2 ? 'No results' : 'Type at least 2 characters';
          searchResults.innerHTML = '<li class="empty-state">' + hint + '</li>';
          return;
        }
        const needle = (msg.query || '').trim().toLowerCase();
        for (const result of results) {
          const li = document.createElement('li');
          li.dataset.path = result.path;
          const index = result.text.toLowerCase().indexOf(needle);
          const highlighted = index >= 0
            ? escapeHtml(result.text.slice(0, index)) + '<mark>' +
              escapeHtml(result.text.slice(index, index + needle.length)) + '</mark>' +
              escapeHtml(result.text.slice(index + needle.length))
            : escapeHtml(result.text);
          li.innerHTML = '<div class="result-path">' + escapeHtml(result.path) + ':' + result.line + '</div>' +
            '<div class="result-text">' + highlighted + '</div>';
          searchResults.appendChild(li);
        }
        return;
      }

      if (msg.type !== 'render') return;

      docTitle.textContent = msg.title || 'MDOCX';
      docDesc.textContent = msg.description || '';

      if (Array.isArray(msg.fileList)) {
        setFiles(msg.fileList, msg.path, msg.metadata && msg.metadata.root);
      }
      if (msg.metadata) setMetadata(msg.metadata);
      if (msg.mediaItems) setMediaItems(msg.mediaItems);
      setStats(msg.stats);
      setOutline(msg.outline);
      setError(msg.error || null);

      if (typeof msg.html === 'string') {
        content.innerHTML = msg.html;
        enhancePreview();
      }

      if (msg.path) {
        persistState();
        const switchedFile = msg.path !== editorFilePath.textContent;
        if (typeof msg.markdown === 'string' && (!isModified || switchedFile)) {
          markdownEditor.value = msg.markdown;
          originalContent = msg.markdown;
          editorFilePath.textContent = msg.path;
          updateEditorStatus();
        }
      }
    });
  </script>
</body>
</html>`}};var W=Ce(require("vscode"));var Sn=class t{static scheme=Ae.scheme;static triggerCharacters=["/","(","[","!",".",'"',"'"];static register(e){let n=new t;return W.languages.registerCompletionItemProvider({scheme:t.scheme,language:"markdown"},n,...t.triggerCharacters)}async provideCompletionItems(e,n,r,i){if(e.uri.scheme!==t.scheme)return;let o=Ae.parseUri(e.uri);if(!o)return;let s=e.lineAt(n.line).text.substring(0,n.character);if(/!\[[^\]]*\]\([^)]*$/.test(s)||/\[[^\]]*\]\([^)]*$/.test(s)||/src=["'][^"']*$/.test(s)||/href=["'][^"']*$/.test(s)||/!\[$/.test(s)||/!\[[^\]]*$/.test(s))try{let{mediaItems:d,markdownPaths:c}=await this.getDocumentEntries(o.mdocxUri);if(d.length===0&&c.length===0)return;let f=[];for(let u of c){if(u===o.embeddedPath)continue;let p=new W.CompletionItem(u,W.CompletionItemKind.File);p.detail="Markdown document in this MDOCX",p.documentation=new W.MarkdownString(`Links to the embedded document **${u}**.`),p.insertText=u,p.sortText="0_doc_"+u,f.push(p)}for(let u of d){if(u.path){let g=new W.CompletionItem(u.path,W.CompletionItemKind.File);g.detail=`${u.mimeType||"media"} (${this.formatBytes(u.size)})`,g.documentation=new W.MarkdownString(`**Media ID:** ${u.id}

**Path:** ${u.path}

**Type:** ${u.mimeType||"unknown"}

**Size:** ${this.formatBytes(u.size)}`),g.insertText=u.path,g.sortText="0_"+u.path,f.push(g)}let p=`mdocx://media/${u.id}`,m=new W.CompletionItem(p,W.CompletionItemKind.Reference);m.detail=`${u.mimeType||"media"} by ID`,m.documentation=new W.MarkdownString(`**Media ID:** ${u.id}

**Path:** ${u.path||"N/A"}

**Type:** ${u.mimeType||"unknown"}

**Size:** ${this.formatBytes(u.size)}`),m.insertText=p,m.sortText="1_"+u.id,f.push(m)}if(/!\[$/.test(s)){for(let u of d)if(u.mimeType?.startsWith("image/")){let p=new W.CompletionItem(`Image: ${u.id}`,W.CompletionItemKind.Snippet);p.detail="Insert complete image markdown",p.documentation=new W.MarkdownString(`Inserts: \`![${u.id}](${u.path||`mdocx://media/${u.id}`})\``),p.insertText=new W.SnippetString(`[\${1:${u.id}}](${u.path||`mdocx://media/${u.id}`})`),p.sortText="2_"+u.id,f.push(p)}}return f}catch{return}}async getDocumentEntries(e){try{let n=await ie(e);return{mediaItems:n.media.items.map(r=>({id:r.id,path:r.path,mimeType:Ye(r),size:r.data?.byteLength??0})),markdownPaths:n.markdown.files.map(r=>r.path)}}catch{return{mediaItems:[],markdownPaths:[]}}}formatBytes(e){return e<1024?e+" B":e<1024*1024?(e/1024).toFixed(1)+" KB":(e/(1024*1024)).toFixed(2)+" MB"}};function hc(t){t.subscriptions.push(Ae.register(t)),t.subscriptions.push(Tn.register(t)),t.subscriptions.push(Sn.register(t)),t.subscriptions.push(M.commands.registerCommand("mdocx.createNew",e=>gc(e)),M.commands.registerCommand("mdocx.extractToFolder",e=>vc(e)),M.commands.registerCommand("mdocx.createFromFolder",e=>wc(e)),M.commands.registerCommand("mdocx.exportHtml",e=>yc(e)))}function mc(){}async function Fo(t){if(t?.fsPath.toLowerCase().endsWith(".mdocx"))return t;let e=M.window.activeTextEditor?.document.uri;if(e?.fsPath.toLowerCase().endsWith(".mdocx"))return e;let n=await M.workspace.findFiles("**/*.mdocx","**/node_modules/**",50);if(n.length===1)return n[0];if(n.length>1){let i=await M.window.showQuickPick(n.map(o=>({label:M.workspace.asRelativePath(o),uri:o})),{placeHolder:"Select an MDOCX file"});return i?i.uri:void 0}return(await M.window.showOpenDialog({canSelectMany:!1,filters:{"MDOCX Files":["mdocx"]},openLabel:"Select MDOCX"}))?.[0]}async function Cn(t){try{return await t()}catch(e){let n=e instanceof Error?e.message:String(e);M.window.showErrorMessage(`MDOCX: ${n}`);return}}async function gc(t){let e;if(t)try{e=(await M.workspace.fs.stat(t)).type===M.FileType.Directory?t:M.Uri.joinPath(t,"..")}catch{e=void 0}!e&&M.workspace.workspaceFolders?.[0]&&(e=M.workspace.workspaceFolders[0].uri);let n=await M.window.showInputBox({prompt:"Enter the name for the new MDOCX file",value:"document.mdocx",validateInput:i=>{if(!i||i.trim().length===0)return"File name cannot be empty";if(!i.endsWith(".mdocx"))return"File name must end with .mdocx"}});if(!n)return;let r=await M.window.showSaveDialog({defaultUri:e?M.Uri.joinPath(e,n):void 0,filters:{"MDOCX Files":["mdocx"]},saveLabel:"Create MDOCX"});r&&await Cn(async()=>{let i=n.replace(/\.mdocx$/i,""),o=`# ${i}

Welcome to your new MDOCX document!

## Getting Started

Start editing this file or add more markdown files to build your document.
`;await Bo(r,{bundleVersion:1,files:[{path:"README.md",content:Je(o)}],rootPath:"README.md"},{bundleVersion:1,items:[]},{title:i,created_at:new Date().toISOString(),root:"README.md"}),await M.commands.executeCommand("vscode.openWith",r,"mdocx.preview"),M.window.showInformationMessage(`MDOCX: Created ${ye.basename(r.fsPath)}`)})}async function Bo(t,e,n,r){let{writeMdocxAsync:i}=await Promise.resolve().then(()=>(Ke(),Qe)),o=await i(e,n,{metadata:r,markdownCompression:"zip",mediaCompression:"zip"});await M.workspace.fs.writeFile(t,o)}async function vc(t){let e=await Fo(t);if(!e)return;let r=(await M.window.showOpenDialog({canSelectFolders:!0,canSelectFiles:!1,canSelectMany:!1,openLabel:"Extract Here"}))?.[0];r&&await Cn(async()=>{let i=await ie(e),o=ye.basename(e.fsPath,ye.extname(e.fsPath)),a=M.Uri.joinPath(r,o);for(let l of i.markdown.files)await M.workspace.fs.writeFile(_o(a,l.path),l.content);for(let l of i.media.items){let d=l.path||`media/${l.id}`;await M.workspace.fs.writeFile(_o(a,d),l.data)}i.metadata&&await M.workspace.fs.writeFile(M.Uri.joinPath(a,"mdocx-metadata.json"),Je(JSON.stringify(i.metadata,null,2))),await M.window.showInformationMessage(`MDOCX: Extracted ${i.markdown.files.length} markdown and ${i.media.items.length} media files.`,"Reveal Folder")==="Reveal Folder"&&await M.commands.executeCommand("revealFileInOS",a)})}function _o(t,e){let n=e.replace(/\\/g,"/").split("/").filter(r=>r&&r!=="."&&r!=="..");if(n.length===0)throw new Error(`Invalid path in container: "${e}"`);return M.Uri.joinPath(t,...n)}async function wc(t){let e=t;if(e)try{(await M.workspace.fs.stat(e)).type!==M.FileType.Directory&&(e=void 0)}catch{e=void 0}if(e||(e=(await M.window.showOpenDialog({canSelectFolders:!0,canSelectFiles:!1,canSelectMany:!1,openLabel:"Use This Folder"}))?.[0]),!e)return;let n=await M.window.showSaveDialog({defaultUri:M.Uri.file(`${e.fsPath}.mdocx`),filters:{"MDOCX Files":["mdocx"]},saveLabel:"Create MDOCX"});n&&await Cn(async()=>{let r=[],i=[],o=new Set,a=async(l,d)=>{for(let[c,f]of await M.workspace.fs.readDirectory(l)){if(c.startsWith(".")||c==="node_modules")continue;let u=M.Uri.joinPath(l,c),p=d?`${d}/${c}`:c;if(f===M.FileType.Directory){await a(u,p);continue}let m=ye.extname(c).toLowerCase();if(m===".md"||m===".markdown")r.push({path:p,content:await M.workspace.fs.readFile(u)});else if(ho.includes(m)){let g=yn(c,o);o.add(g),i.push({id:g,path:p,mimeType:lt(m),data:await M.workspace.fs.readFile(u)})}}};if(await a(e,""),r.length===0)throw new Error("No markdown files found in the selected folder.");let s=r.find(l=>/^readme\.(md|markdown)$/i.test(l.path))?.path??r.find(l=>!l.path.includes("/"))?.path??r[0].path;await Bo(n,{bundleVersion:1,files:r,rootPath:s},{bundleVersion:1,items:i},{title:ye.basename(n.fsPath,".mdocx"),created_at:new Date().toISOString(),root:s}),await M.commands.executeCommand("vscode.openWith",n,"mdocx.preview"),M.window.showInformationMessage(`MDOCX: Packed ${r.length} markdown and ${i.length} media files.`)})}async function yc(t){let e=await Fo(t);e&&await Cn(async()=>{let n=await ie(e);if(n.markdown.files.length===0)throw new Error("This MDOCX contains no markdown files.");let r="$all",i=n.markdown.files.length===1?n.markdown.files[0].path:(await M.window.showQuickPick([{label:"All files (combined)",value:r},...n.markdown.files.map(m=>({label:m.path,value:m.path}))],{placeHolder:"Which document should be exported?"}))?.value;if(!i)return;let o=i===r?n.markdown.files:n.markdown.files.filter(m=>m.path===i),a=typeof n.metadata?.title=="string"&&n.metadata.title||ye.basename(e.fsPath),s=i===r?`${ye.basename(e.fsPath,".mdocx")}.html`:`${i.replace(/[\\/]/g,"-").replace(/\.(md|markdown)$/i,"")}.html`,l=await M.window.showSaveDialog({defaultUri:M.Uri.joinPath(M.Uri.file(ye.dirname(e.fsPath)),s),filters:{"HTML Files":["html"]},saveLabel:"Export HTML"});if(!l)return;let{MediaResolver:d}=await Promise.resolve().then(()=>(Ke(),Qe)),c=new d(n),f=new Set(n.markdown.files.map(m=>m.path)),u=o.map(m=>{let{html:g}=Ft(Ze(m.content),{resolveMediaHref:h=>xc(c,h,m),resolveFileHref:h=>i===r?bc(h,f):void 0});return{path:m.path,html:g}});await M.workspace.fs.writeFile(l,Je(kc(a,u,i===r))),await M.window.showInformationMessage("MDOCX: HTML exported.","Open File")==="Open File"&&await M.env.openExternal(l)})}function bc(t,e){if(!(!t||pt(t))){for(let n of ft(t))if(e.has(n))return n}}function xc(t,e,n){if(!(!e||pt(e)))for(let r of ft(e)){let i;try{i=t.resolve(r,n)}catch{i=void 0}if(!i){let o=/^mdocx:\/\/media\/(.+)$/i.exec(r);if(o&&typeof t.getById=="function")try{i=t.getById(o[1])}catch{i=void 0}}if(i?.data)return Bt(Ye(i),i.data)}}function kc(t,e,n){let r=n&&e.length>1?`<nav class="toc"><strong>Contents</strong><ul>${e.map(o=>`<li><a href="#${En(o.path)}">${Y(o.path)}</a></li>`).join("")}</ul></nav>`:"",i=e.map(o=>`<article id="${En(o.path)}">${e.length>1?`<h1 class="doc-heading">${Y(o.path)}</h1>`:""}${o.html}</article>`).join(`
<hr />
`);return`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${Y(t)}</title>
<style>
  :root { color-scheme: light dark; }
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.65; max-width: 860px; margin: 0 auto; padding: 40px 20px 80px; }
  img { max-width: 100%; border-radius: 4px; }
  pre { background: rgba(127,127,127,0.12); padding: 12px; border-radius: 6px; overflow: auto; }
  code { font-family: ui-monospace, SFMono-Regular, Consolas, monospace; font-size: 0.92em; }
  pre code { background: none; }
  :not(pre) > code { background: rgba(127,127,127,0.15); padding: 0.1em 0.35em; border-radius: 3px; }
  table { border-collapse: collapse; margin: 1em 0; }
  th, td { border: 1px solid rgba(127,127,127,0.4); padding: 6px 10px; text-align: left; }
  blockquote { margin: 1em 0; padding: 0.4em 1em; border-left: 3px solid rgba(127,127,127,0.5); }
  hr { border: none; border-top: 1px solid rgba(127,127,127,0.35); margin: 3em 0; }
  .toc { background: rgba(127,127,127,0.08); border-radius: 8px; padding: 12px 18px; margin-bottom: 32px; }
  .toc ul { margin: 8px 0 0; padding-left: 18px; }
  .heading-anchor { display: none; }
  .doc-heading { font-size: 0.85em; text-transform: uppercase; letter-spacing: 0.08em; opacity: 0.55; border: none; }
</style>
</head>
<body>
${r}
${i}
</body>
</html>
`}0&&(module.exports={activate,deactivate});
