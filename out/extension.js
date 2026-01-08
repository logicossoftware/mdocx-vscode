"use strict";var uo=Object.create;var Mt=Object.defineProperty;var fo=Object.getOwnPropertyDescriptor;var ho=Object.getOwnPropertyNames;var po=Object.getPrototypeOf,mo=Object.prototype.hasOwnProperty;var fn=(t,e)=>()=>(t&&(e=t(t=0)),e);var pe=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),dr=(t,e)=>{for(var n in e)Mt(t,n,{get:e[n],enumerable:!0})},ur=(t,e,n,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of ho(e))!mo.call(t,i)&&i!==n&&Mt(t,i,{get:()=>e[i],enumerable:!(r=fo(e,i))||r.enumerable});return t};var Oe=(t,e,n)=>(n=t!=null?uo(po(t)):{},ur(e||!t||!t.__esModule?Mt(n,"default",{value:t,enumerable:!0}):n,t)),go=t=>ur(Mt({},"__esModule",{value:!0}),t);function ua(t,e){return da(t,e||{},0,0)}function fa(t,e){return oa(t,{i:2},e&&e.out,e&&e.dictionary)}function Dr(t,e){if(e){for(var n=new O(t.length),r=0;r<t.length;++r)n[r]=t.charCodeAt(r);return n}if(Br)return Br.encode(t);for(var i=t.length,a=new O(t.length+(t.length>>1)),o=0,s=function(c){a[o++]=c},r=0;r<i;++r){if(o+5>a.length){var l=new O(o+8+(i-r<<1));l.set(a),a=l}var d=t.charCodeAt(r);d<128||e?s(d):d<2048?(s(192|d>>6),s(128|d&63)):d>55295&&d<57344?(d=65536+(d&1047552)|t.charCodeAt(++r)&1023,s(240|d>>18),s(128|d>>12&63),s(128|d>>6&63),s(128|d&63)):(s(224|d>>12),s(128|d>>6&63),s(128|d&63))}return ft(a,0,o)}function ma(t,e){if(e){for(var n="",r=0;r<t.length;r+=16384)n+=String.fromCharCode.apply(null,t.subarray(r,r+16384));return n}else{if(Sn)return Sn.decode(t);var i=pa(t),a=i.s,n=i.r;return n.length&&ee(8),a}}function Hr(t,e){e||(e={});var n={},r=[];Nr(t,"",n,e);var i=0,a=0;for(var o in n){var s=n[o],l=s[0],d=s[1],c=d.level==0?0:8,u=Dr(o),f=u.length,h=d.comment,p=h&&Dr(h),m=p&&p.length,v=Bn(d.extra);f>65535&&ee(11);var T=c?ua(l,d):l,w=T.length,b=ca();b.p(l),r.push(Or(d,{size:l.length,crc:b.d(),c:T,f:u,m:p,u:f!=o.length||p&&h.length!=m,o:i,compression:c})),i+=30+f+v+w,a+=76+2*(f+v)+(m||0)+w}for(var S=new O(a+22),A=i,y=a-i,C=0;C<r.length;++C){var u=r[C];_r(S,u.o,u,u.f,u.u,u.c.length);var E=30+u.f.length+Bn(u.extra);S.set(u.c,u.o+E),_r(S,i,u,u.f,u.u,u.c.length,u.o,u.m),i+=16+E+(u.m?u.m.length:0)}return ya(S,i,r.length,y,A),S}function Zr(t,e){for(var n={},r=t.length-22;ge(t,r)!=101010256;--r)(!r||t.length-r>65558)&&ee(13);var i=we(t,r+8);if(!i)return{};var a=ge(t,r+16),o=a==4294967295||i==65535;if(o){var s=ge(t,r-12);o=ge(t,s)==101075792,o&&(i=ge(t,s+32),a=ge(t,s+48))}for(var l=e&&e.filter,d=0;d<i;++d){var c=va(t,a,o),u=c[0],f=c[1],h=c[2],p=c[3],m=c[4],v=c[5],T=ga(t,v);a=m,(!l||l({name:p,size:f,originalSize:h,compression:u}))&&(u?u==8?n[p]=fa(t.subarray(T,T+f),{out:new O(h)}):ee(14,"unknown compression type "+u):n[p]=ft(t,T,T+f))}return n}var zr,Ko,Jo,O,le,Dn,Ct,St,Tn,Ur,Lr,Fr,An,$r,Yo,Ir,In,Ie,z,ye,ze,z,z,z,z,ut,z,ea,ta,na,ra,xn,me,kn,_n,ft,ia,ee,oa,Ce,ct,Mn,Cn,Cr,dt,Rr,Sr,aa,Pr,sa,la,ca,da,Or,we,ge,En,Q,Nr,Br,Sn,ha,pa,ga,va,wa,Bn,_r,ya,Gr=fn(()=>{zr=require("module"),Ko=(0,zr.createRequire)("/");try{Jo=Ko("worker_threads").Worker}catch{}O=Uint8Array,le=Uint16Array,Dn=Int32Array,Ct=new O([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),St=new O([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Tn=new O([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Ur=function(t,e){for(var n=new le(31),r=0;r<31;++r)n[r]=e+=1<<t[r-1];for(var i=new Dn(n[30]),r=1;r<30;++r)for(var a=n[r];a<n[r+1];++a)i[a]=a-n[r]<<5|r;return{b:n,r:i}},Lr=Ur(Ct,2),Fr=Lr.b,An=Lr.r;Fr[28]=258,An[258]=28;$r=Ur(St,0),Yo=$r.b,Ir=$r.r,In=new le(32768);for(z=0;z<32768;++z)Ie=(z&43690)>>1|(z&21845)<<1,Ie=(Ie&52428)>>2|(Ie&13107)<<2,Ie=(Ie&61680)>>4|(Ie&3855)<<4,In[z]=((Ie&65280)>>8|(Ie&255)<<8)>>1;ye=function(t,e,n){for(var r=t.length,i=0,a=new le(e);i<r;++i)t[i]&&++a[t[i]-1];var o=new le(e);for(i=1;i<e;++i)o[i]=o[i-1]+a[i-1]<<1;var s;if(n){s=new le(1<<e);var l=15-e;for(i=0;i<r;++i)if(t[i])for(var d=i<<4|t[i],c=e-t[i],u=o[t[i]-1]++<<c,f=u|(1<<c)-1;u<=f;++u)s[In[u]>>l]=d}else for(s=new le(r),i=0;i<r;++i)t[i]&&(s[i]=In[o[t[i]-1]++]>>15-t[i]);return s},ze=new O(288);for(z=0;z<144;++z)ze[z]=8;for(z=144;z<256;++z)ze[z]=9;for(z=256;z<280;++z)ze[z]=7;for(z=280;z<288;++z)ze[z]=8;ut=new O(32);for(z=0;z<32;++z)ut[z]=5;ea=ye(ze,9,0),ta=ye(ze,9,1),na=ye(ut,5,0),ra=ye(ut,5,1),xn=function(t){for(var e=t[0],n=1;n<t.length;++n)t[n]>e&&(e=t[n]);return e},me=function(t,e,n){var r=e/8|0;return(t[r]|t[r+1]<<8)>>(e&7)&n},kn=function(t,e){var n=e/8|0;return(t[n]|t[n+1]<<8|t[n+2]<<16)>>(e&7)},_n=function(t){return(t+7)/8|0},ft=function(t,e,n){return(e==null||e<0)&&(e=0),(n==null||n>t.length)&&(n=t.length),new O(t.subarray(e,n))},ia=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],ee=function(t,e,n){var r=new Error(e||ia[t]);if(r.code=t,Error.captureStackTrace&&Error.captureStackTrace(r,ee),!n)throw r;return r},oa=function(t,e,n,r){var i=t.length,a=r?r.length:0;if(!i||e.f&&!e.l)return n||new O(0);var o=!n,s=o||e.i!=2,l=e.i;o&&(n=new O(i*3));var d=function(fe){var he=n.length;if(fe>he){var _e=new O(Math.max(he*2,fe));_e.set(n),n=_e}},c=e.f||0,u=e.p||0,f=e.b||0,h=e.l,p=e.d,m=e.m,v=e.n,T=i*8;do{if(!h){c=me(t,u,1);var w=me(t,u+1,3);if(u+=3,w)if(w==1)h=ta,p=ra,m=9,v=5;else if(w==2){var y=me(t,u,31)+257,C=me(t,u+10,15)+4,E=y+me(t,u+5,31)+1;u+=14;for(var x=new O(E),B=new O(19),U=0;U<C;++U)B[Tn[U]]=me(t,u+U*3,7);u+=C*3;for(var $=xn(B),Z=(1<<$)-1,I=ye(B,$,1),U=0;U<E;){var k=I[me(t,u,Z)];u+=k&15;var b=k>>4;if(b<16)x[U++]=b;else{var D=0,R=0;for(b==16?(R=3+me(t,u,3),u+=2,D=x[U-1]):b==17?(R=3+me(t,u,7),u+=3):b==18&&(R=11+me(t,u,127),u+=7);R--;)x[U++]=D}}var j=x.subarray(0,y),N=x.subarray(y);m=xn(j),v=xn(N),h=ye(j,m,1),p=ye(N,v,1)}else ee(1);else{var b=_n(u)+4,S=t[b-4]|t[b-3]<<8,A=b+S;if(A>i){l&&ee(0);break}s&&d(f+S),n.set(t.subarray(b,A),f),e.b=f+=S,e.p=u=A*8,e.f=c;continue}if(u>T){l&&ee(0);break}}s&&d(f+131072);for(var ke=(1<<m)-1,Y=(1<<v)-1,oe=u;;oe=u){var D=h[kn(t,u)&ke],K=D>>4;if(u+=D&15,u>T){l&&ee(0);break}if(D||ee(2),K<256)n[f++]=K;else if(K==256){oe=u,h=null;break}else{var J=K-254;if(K>264){var U=K-257,P=Ct[U];J=me(t,u,(1<<P)-1)+Fr[U],u+=P}var ae=p[kn(t,u)&Y],re=ae>>4;ae||ee(3),u+=ae&15;var N=Yo[re];if(re>3){var P=St[re];N+=kn(t,u)&(1<<P)-1,u+=P}if(u>T){l&&ee(0);break}s&&d(f+131072);var de=f+J;if(f<N){var Me=a-N,Ee=Math.min(N,de);for(Me+f<0&&ee(3);f<Ee;++f)n[f]=r[Me+f]}for(;f<de;++f)n[f]=n[f-N]}}e.l=h,e.p=oe,e.b=f,e.f=c,h&&(c=1,e.m=m,e.d=p,e.n=v)}while(!c);return f!=n.length&&o?ft(n,0,f):n.subarray(0,f)},Ce=function(t,e,n){n<<=e&7;var r=e/8|0;t[r]|=n,t[r+1]|=n>>8},ct=function(t,e,n){n<<=e&7;var r=e/8|0;t[r]|=n,t[r+1]|=n>>8,t[r+2]|=n>>16},Mn=function(t,e){for(var n=[],r=0;r<t.length;++r)t[r]&&n.push({s:r,f:t[r]});var i=n.length,a=n.slice();if(!i)return{t:Pr,l:0};if(i==1){var o=new O(n[0].s+1);return o[n[0].s]=1,{t:o,l:1}}n.sort(function(A,y){return A.f-y.f}),n.push({s:-1,f:25001});var s=n[0],l=n[1],d=0,c=1,u=2;for(n[0]={s:-1,f:s.f+l.f,l:s,r:l};c!=i-1;)s=n[n[d].f<n[u].f?d++:u++],l=n[d!=c&&n[d].f<n[u].f?d++:u++],n[c++]={s:-1,f:s.f+l.f,l:s,r:l};for(var f=a[0].s,r=1;r<i;++r)a[r].s>f&&(f=a[r].s);var h=new le(f+1),p=Cn(n[c-1],h,0);if(p>e){var r=0,m=0,v=p-e,T=1<<v;for(a.sort(function(y,C){return h[C.s]-h[y.s]||y.f-C.f});r<i;++r){var w=a[r].s;if(h[w]>e)m+=T-(1<<p-h[w]),h[w]=e;else break}for(m>>=v;m>0;){var b=a[r].s;h[b]<e?m-=1<<e-h[b]++-1:++r}for(;r>=0&&m;--r){var S=a[r].s;h[S]==e&&(--h[S],++m)}p=e}return{t:new O(h),l:p}},Cn=function(t,e,n){return t.s==-1?Math.max(Cn(t.l,e,n+1),Cn(t.r,e,n+1)):e[t.s]=n},Cr=function(t){for(var e=t.length;e&&!t[--e];);for(var n=new le(++e),r=0,i=t[0],a=1,o=function(l){n[r++]=l},s=1;s<=e;++s)if(t[s]==i&&s!=e)++a;else{if(!i&&a>2){for(;a>138;a-=138)o(32754);a>2&&(o(a>10?a-11<<5|28690:a-3<<5|12305),a=0)}else if(a>3){for(o(i),--a;a>6;a-=6)o(8304);a>2&&(o(a-3<<5|8208),a=0)}for(;a--;)o(i);a=1,i=t[s]}return{c:n.subarray(0,r),n:e}},dt=function(t,e){for(var n=0,r=0;r<e.length;++r)n+=t[r]*e[r];return n},Rr=function(t,e,n){var r=n.length,i=_n(e+2);t[i]=r&255,t[i+1]=r>>8,t[i+2]=t[i]^255,t[i+3]=t[i+1]^255;for(var a=0;a<r;++a)t[i+a+4]=n[a];return(i+4+r)*8},Sr=function(t,e,n,r,i,a,o,s,l,d,c){Ce(e,c++,n),++i[256];for(var u=Mn(i,15),f=u.t,h=u.l,p=Mn(a,15),m=p.t,v=p.l,T=Cr(f),w=T.c,b=T.n,S=Cr(m),A=S.c,y=S.n,C=new le(19),E=0;E<w.length;++E)++C[w[E]&31];for(var E=0;E<A.length;++E)++C[A[E]&31];for(var x=Mn(C,7),B=x.t,U=x.l,$=19;$>4&&!B[Tn[$-1]];--$);var Z=d+5<<3,I=dt(i,ze)+dt(a,ut)+o,k=dt(i,f)+dt(a,m)+o+14+3*$+dt(C,B)+2*C[16]+3*C[17]+7*C[18];if(l>=0&&Z<=I&&Z<=k)return Rr(e,c,t.subarray(l,l+d));var D,R,j,N;if(Ce(e,c,1+(k<I)),c+=2,k<I){D=ye(f,h,0),R=f,j=ye(m,v,0),N=m;var ke=ye(B,U,0);Ce(e,c,b-257),Ce(e,c+5,y-1),Ce(e,c+10,$-4),c+=14;for(var E=0;E<$;++E)Ce(e,c+3*E,B[Tn[E]]);c+=3*$;for(var Y=[w,A],oe=0;oe<2;++oe)for(var K=Y[oe],E=0;E<K.length;++E){var J=K[E]&31;Ce(e,c,ke[J]),c+=B[J],J>15&&(Ce(e,c,K[E]>>5&127),c+=K[E]>>12)}}else D=ea,R=ze,j=na,N=ut;for(var E=0;E<s;++E){var P=r[E];if(P>255){var J=P>>18&31;ct(e,c,D[J+257]),c+=R[J+257],J>7&&(Ce(e,c,P>>23&31),c+=Ct[J]);var ae=P&31;ct(e,c,j[ae]),c+=N[ae],ae>3&&(ct(e,c,P>>5&8191),c+=St[ae])}else ct(e,c,D[P]),c+=R[P]}return ct(e,c,D[256]),c+R[256]},aa=new Dn([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),Pr=new O(0),sa=function(t,e,n,r,i,a){var o=a.z||t.length,s=new O(r+o+5*(1+Math.ceil(o/7e3))+i),l=s.subarray(r,s.length-i),d=a.l,c=(a.r||0)&7;if(e){c&&(l[0]=a.r>>3);for(var u=aa[e-1],f=u>>13,h=u&8191,p=(1<<n)-1,m=a.p||new le(32768),v=a.h||new le(p+1),T=Math.ceil(n/3),w=2*T,b=function(un){return(t[un]^t[un+1]<<T^t[un+2]<<w)&p},S=new Dn(25e3),A=new le(288),y=new le(32),C=0,E=0,x=a.i||0,B=0,U=a.w||0,$=0;x+2<o;++x){var Z=b(x),I=x&32767,k=v[Z];if(m[I]=k,v[Z]=I,U<=x){var D=o-x;if((C>7e3||B>24576)&&(D>423||!d)){c=Sr(t,l,0,S,A,y,E,B,$,x-$,c),B=C=E=0,$=x;for(var R=0;R<286;++R)A[R]=0;for(var R=0;R<30;++R)y[R]=0}var j=2,N=0,ke=h,Y=I-k&32767;if(D>2&&Z==b(x-Y))for(var oe=Math.min(f,D)-1,K=Math.min(32767,x),J=Math.min(258,D);Y<=K&&--ke&&I!=k;){if(t[x+j]==t[x+j-Y]){for(var P=0;P<J&&t[x+P]==t[x+P-Y];++P);if(P>j){if(j=P,N=Y,P>oe)break;for(var ae=Math.min(Y,P-2),re=0,R=0;R<ae;++R){var de=x-Y+R&32767,Me=m[de],Ee=de-Me&32767;Ee>re&&(re=Ee,k=de)}}}I=k,k=m[I],Y+=I-k&32767}if(N){S[B++]=268435456|An[j]<<18|Ir[N];var fe=An[j]&31,he=Ir[N]&31;E+=Ct[fe]+St[he],++A[257+fe],++y[he],U=x+j,++C}else S[B++]=t[x],++A[t[x]]}}for(x=Math.max(x,U);x<o;++x)S[B++]=t[x],++A[t[x]];c=Sr(t,l,d,S,A,y,E,B,$,x-$,c),d||(a.r=c&7|l[c/8|0]<<3,c-=7,a.h=v,a.p=m,a.i=x,a.w=U)}else{for(var x=a.w||0;x<o+d;x+=65535){var _e=x+65535;_e>=o&&(l[c/8|0]=d,_e=o),c=Rr(l,c+1,t.subarray(x,_e))}a.i=o}return ft(s,0,r+_n(c)+i)},la=function(){for(var t=new Int32Array(256),e=0;e<256;++e){for(var n=e,r=9;--r;)n=(n&1&&-306674912)^n>>>1;t[e]=n}return t}(),ca=function(){var t=-1;return{p:function(e){for(var n=t,r=0;r<e.length;++r)n=la[n&255^e[r]]^n>>>8;t=n},d:function(){return~t}}},da=function(t,e,n,r,i){if(!i&&(i={l:1},e.dictionary)){var a=e.dictionary.subarray(-32768),o=new O(a.length+t.length);o.set(a),o.set(t,a.length),t=o,i.w=a.length}return sa(t,e.level==null?6:e.level,e.mem==null?i.l?Math.ceil(Math.max(8,Math.min(13,Math.log(t.length)))*1.5):20:12+e.mem,n,r,i)},Or=function(t,e){var n={};for(var r in t)n[r]=t[r];for(var r in e)n[r]=e[r];return n},we=function(t,e){return t[e]|t[e+1]<<8},ge=function(t,e){return(t[e]|t[e+1]<<8|t[e+2]<<16|t[e+3]<<24)>>>0},En=function(t,e){return ge(t,e)+ge(t,e+4)*4294967296},Q=function(t,e,n){for(;n;++e)t[e]=n,n>>>=8};Nr=function(t,e,n,r){for(var i in t){var a=t[i],o=e+i,s=r;Array.isArray(a)&&(s=Or(r,a[1]),a=a[0]),a instanceof O?n[o]=[a,s]:(n[o+="/"]=[new O(0),s],Nr(a,o,n,r))}},Br=typeof TextEncoder<"u"&&new TextEncoder,Sn=typeof TextDecoder<"u"&&new TextDecoder,ha=0;try{Sn.decode(Pr,{stream:!0}),ha=1}catch{}pa=function(t){for(var e="",n=0;;){var r=t[n++],i=(r>127)+(r>223)+(r>239);if(n+i>t.length)return{s:e,r:ft(t,n-1)};i?i==3?(r=((r&15)<<18|(t[n++]&63)<<12|(t[n++]&63)<<6|t[n++]&63)-65536,e+=String.fromCharCode(55296|r>>10,56320|r&1023)):i&1?e+=String.fromCharCode((r&31)<<6|t[n++]&63):e+=String.fromCharCode((r&15)<<12|(t[n++]&63)<<6|t[n++]&63):e+=String.fromCharCode(r)}};ga=function(t,e){return e+30+we(t,e+26)+we(t,e+28)},va=function(t,e,n){var r=we(t,e+28),i=ma(t.subarray(e+46,e+46+r),!(we(t,e+8)&2048)),a=e+46+r,o=ge(t,e+20),s=n&&o==4294967295?wa(t,a):[o,ge(t,e+24),ge(t,e+42)],l=s[0],d=s[1],c=s[2];return[we(t,e+10),l,d,i,a+we(t,e+30)+we(t,e+32),c]},wa=function(t,e){for(;we(t,e)!=1;e+=4+we(t,e+2));return[En(t,e+12),En(t,e+4),En(t,e+20)]},Bn=function(t){var e=0;if(t)for(var n in t){var r=t[n].length;r>65535&&ee(9),e+=r+4}return e},_r=function(t,e,n,r,i,a,o,s){var l=r.length,d=n.extra,c=s&&s.length,u=Bn(d);Q(t,e,o!=null?33639248:67324752),e+=4,o!=null&&(t[e++]=20,t[e++]=n.os),t[e]=20,e+=2,t[e++]=n.flag<<1|(a<0&&8),t[e++]=i&&8,t[e++]=n.compression&255,t[e++]=n.compression>>8;var f=new Date(n.mtime==null?Date.now():n.mtime),h=f.getFullYear()-1980;if((h<0||h>119)&&ee(10),Q(t,e,h<<25|f.getMonth()+1<<21|f.getDate()<<16|f.getHours()<<11|f.getMinutes()<<5|f.getSeconds()>>1),e+=4,a!=-1&&(Q(t,e,n.crc),Q(t,e+4,a<0?-a-2:a),Q(t,e+8,n.size)),Q(t,e+12,l),Q(t,e+14,u),e+=16,o!=null&&(Q(t,e,c),Q(t,e+6,n.attrs),Q(t,e+10,o),e+=14),t.set(r,e),e+=l,u)for(var p in d){var m=d[p],v=m.length;Q(t,e,+p),Q(t,e+2,v),t.set(m,e+4),e+=4+v}return c&&(t.set(s,e),e+=c),e},ya=function(t,e,n,r,i){Q(t,e,101010256),Q(t,e+8,n),Q(t,e+10,n),Q(t,e+12,r),Q(t,e+16,i)}});function qr(t,e){for(var n=[],r=+!e,i=0,a=0;t.length;){var o=Ta(t,r||e);if(typeof o=="object"){for(r?(e=null,o.w.length==o.u&&(n.push(e=o.w),a+=o.u)):(n.push(e),o.e=0);!o.l;){var s=za(t,o,e);s||G(5),e?o.e=o.y:(n.push(s),a+=s.length,ka(o.w,0,s.length),o.w.set(s,o.w.length-s.length))}i=o.b+o.c*4}else i=o;t=t.subarray(i)}return Ua(n,a)}var ba,H,Bt,xa,Dt,zn,pt,ka,Ma,G,jr,Ea,Ta,Ze,mt,Aa,Ia,Ca,Sa,Vr,Un,Ba,Ln,Da,ht,_a,za,Ua,Wr=fn(()=>{ba=ArrayBuffer,H=Uint8Array,Bt=Uint16Array,xa=Int16Array,Dt=Int32Array,zn=function(t,e,n){if(H.prototype.slice)return H.prototype.slice.call(t,e,n);(e==null||e<0)&&(e=0),(n==null||n>t.length)&&(n=t.length);var r=new H(n-e);return r.set(t.subarray(e,n)),r},pt=function(t,e,n,r){if(H.prototype.fill)return H.prototype.fill.call(t,e,n,r);for((n==null||n<0)&&(n=0),(r==null||r>t.length)&&(r=t.length);n<r;++n)t[n]=e;return t},ka=function(t,e,n,r){if(H.prototype.copyWithin)return H.prototype.copyWithin.call(t,e,n,r);for((n==null||n<0)&&(n=0),(r==null||r>t.length)&&(r=t.length);n<r;)t[e++]=t[n++]},Ma=["invalid zstd data","window size too large (>2046MB)","invalid block type","FSE accuracy too high","match distance too far back","unexpected EOF"],G=function(t,e,n){var r=new Error(e||Ma[t]);if(r.code=t,Error.captureStackTrace&&Error.captureStackTrace(r,G),!n)throw r;return r},jr=function(t,e,n){for(var r=0,i=0;r<n;++r)i|=t[e++]<<(r<<3);return i},Ea=function(t,e){return(t[e]|t[e+1]<<8|t[e+2]<<16|t[e+3]<<24)>>>0},Ta=function(t,e){var n=t[0]|t[1]<<8|t[2]<<16;if(n==3126568&&t[3]==253){var r=t[4],i=r>>5&1,a=r>>2&1,o=r&3,s=r>>6;r&8&&G(0);var l=6-i,d=o==3?4:o,c=jr(t,l,d);l+=d;var u=s?1<<s:i,f=jr(t,l,u)+(s==1&&256),h=f;if(!i){var p=1<<10+(t[5]>>3);h=p+(p>>3)*(t[5]&7)}h>2145386496&&G(1);var m=new H((e==1?f||h:e?0:h)+12);return m[0]=1,m[4]=4,m[8]=8,{b:l+u,y:0,l:0,d:c,w:e&&e!=1?e:m.subarray(12),e:h,o:new Dt(m.buffer,0,3),u:f,c:a,m:Math.min(131072,h)}}else if((n>>4|t[3]<<20)==25481893)return Ea(t,4)+8;G(0)},Ze=function(t){for(var e=0;1<<e<=t;++e);return e-1},mt=function(t,e,n){var r=(e<<3)+4,i=(t[e]&15)+5;i>n&&G(3);for(var a=1<<i,o=a,s=-1,l=-1,d=-1,c=a,u=new ba(512+(a<<2)),f=new xa(u,0,256),h=new Bt(u,0,256),p=new Bt(u,512,a),m=512+(a<<1),v=new H(u,m,a),T=new H(u,m+a);s<255&&o>0;){var w=Ze(o+1),b=r>>3,S=(1<<w+1)-1,A=(t[b]|t[b+1]<<8|t[b+2]<<16)>>(r&7)&S,y=(1<<w)-1,C=S-o-1,E=A&y;if(E<C?(r+=w,A=E):(r+=w+1,A>y&&(A-=C)),f[++s]=--A,A==-1?(o+=A,v[--c]=s):o-=A,!A)do{var x=r>>3;l=(t[x]|t[x+1]<<8)>>(r&7)&3,r+=2,s+=l}while(l==3)}(s>255||o)&&G(0);for(var B=0,U=(a>>1)+(a>>3)+3,$=a-1,Z=0;Z<=s;++Z){var I=f[Z];if(I<1){h[Z]=-I;continue}for(d=0;d<I;++d){v[B]=Z;do B=B+U&$;while(B>=c)}}for(B&&G(0),d=0;d<a;++d){var k=h[v[d]]++,D=T[d]=i-Ze(k);p[d]=(k<<D)-a}return[r+7>>3,{b:i,s:v,n:T,t:p}]},Aa=function(t,e){var n=0,r=-1,i=new H(292),a=t[e],o=i.subarray(0,256),s=i.subarray(256,268),l=new Bt(i.buffer,268);if(a<128){var d=mt(t,e+1,6),c=d[0],u=d[1];e+=a;var f=c<<3,h=t[e];h||G(0);for(var p=0,m=0,v=u.b,T=v,w=(++e<<3)-8+Ze(h);w-=v,!(w<f);){var b=w>>3;if(p+=(t[b]|t[b+1]<<8)>>(w&7)&(1<<v)-1,o[++r]=u.s[p],w-=T,w<f)break;b=w>>3,m+=(t[b]|t[b+1]<<8)>>(w&7)&(1<<T)-1,o[++r]=u.s[m],v=u.n[p],p=u.t[p],T=u.n[m],m=u.t[m]}++r>255&&G(0)}else{for(r=a-127;n<r;n+=2){var S=t[++e];o[n]=S>>4,o[n+1]=S&15}++e}var A=0;for(n=0;n<r;++n){var y=o[n];y>11&&G(0),A+=y&&1<<y-1}var C=Ze(A)+1,E=1<<C,x=E-A;for(x&x-1&&G(0),o[r++]=Ze(x)+1,n=0;n<r;++n){var y=o[n];++s[o[n]=y&&C+1-y]}var B=new H(E<<1),U=B.subarray(0,E),$=B.subarray(E);for(l[C]=0,n=C;n>0;--n){var Z=l[n];pt($,n,Z,l[n-1]=Z+s[n]*(1<<C-n))}for(l[0]!=E&&G(0),n=0;n<r;++n){var I=o[n];if(I){var k=l[I];pt(U,n,k,l[I]=k+(1<<C-I))}}return[e,{n:$,b:C,s:U}]},Ia=mt(new H([81,16,99,140,49,198,24,99,12,33,196,24,99,102,102,134,70,146,4]),0,6)[1],Ca=mt(new H([33,20,196,24,99,140,33,132,16,66,8,33,132,16,66,8,33,68,68,68,68,68,68,68,68,36,9]),0,6)[1],Sa=mt(new H([32,132,16,66,102,70,68,68,68,68,36,73,2]),0,5)[1],Vr=function(t,e){for(var n=t.length,r=new Dt(n),i=0;i<n;++i)r[i]=e,e+=1<<t[i];return r},Un=new H(new Dt([0,0,0,0,16843009,50528770,134678020,202050057,269422093]).buffer,0,36),Ba=Vr(Un,0),Ln=new H(new Dt([0,0,0,0,0,0,0,0,16843009,50528770,117769220,185207048,252579084,16]).buffer,0,53),Da=Vr(Ln,3),ht=function(t,e,n){var r=t.length,i=e.length,a=t[r-1],o=(1<<n.b)-1,s=-n.b;a||G(0);for(var l=0,d=n.b,c=(r<<3)-8+Ze(a)-d,u=-1;c>s&&u<i;){var f=c>>3,h=(t[f]|t[f+1]<<8|t[f+2]<<16)>>(c&7);l=(l<<d|h)&o,e[++u]=n.s[l],c-=d=n.n[l]}(c!=s||u+1!=i)&&G(0)},_a=function(t,e,n){var r=6,i=e.length,a=i+3>>2,o=a<<1,s=a+o;ht(t.subarray(r,r+=t[0]|t[1]<<8),e.subarray(0,a),n),ht(t.subarray(r,r+=t[2]|t[3]<<8),e.subarray(a,o),n),ht(t.subarray(r,r+=t[4]|t[5]<<8),e.subarray(o,s),n),ht(t.subarray(r),e.subarray(s),n)},za=function(t,e,n){var r,i=e.b,a=t[i],o=a>>1&3;e.l=a&1;var s=a>>3|t[i+1]<<5|t[i+2]<<13,l=(i+=3)+s;if(o==1)return i>=t.length?void 0:(e.b=i+1,n?(pt(n,t[i],e.y,e.y+=s),n):pt(new H(s),t[i]));if(!(l>t.length)){if(o==0)return e.b=l,n?(n.set(t.subarray(i,l),e.y),e.y+=s,n):zn(t,i,l);if(o==2){var d=t[i],c=d&3,u=d>>2&3,f=d>>4,h=0,p=0;c<2?u&1?f|=t[++i]<<4|(u&2&&t[++i]<<12):f=d>>3:(p=u,u<2?(f|=(t[++i]&63)<<4,h=t[i]>>6|t[++i]<<2):u==2?(f|=t[++i]<<4|(t[++i]&3)<<12,h=t[i]>>2|t[++i]<<6):(f|=t[++i]<<4|(t[++i]&63)<<12,h=t[i]>>6|t[++i]<<2|t[++i]<<10)),++i;var m=n?n.subarray(e.y,e.y+e.m):new H(e.m),v=m.length-f;if(c==0)m.set(t.subarray(i,i+=f),v);else if(c==1)pt(m,t[i++],v);else{var T=e.h;if(c==2){var w=Aa(t,i);h+=i-(i=w[0]),e.h=T=w[1]}else T||G(0);(p?_a:ht)(t.subarray(i,i+=h),m.subarray(v),T)}var b=t[i++];if(b){b==255?b=(t[i++]|t[i++]<<8)+32512:b>127&&(b=b-128<<8|t[i++]);var S=t[i++];S&3&&G(0);for(var A=[Ca,Sa,Ia],y=2;y>-1;--y){var C=S>>(y<<1)+2&3;if(C==1){var E=new H([0,0,t[i++]]);A[y]={s:E.subarray(2,3),n:E.subarray(0,1),t:new Bt(E.buffer,0,1),b:0}}else C==2?(r=mt(t,i,9-(y&1)),i=r[0],A[y]=r[1]):C==3&&(e.t||G(0),A[y]=e.t[y])}var x=e.t=A,B=x[0],U=x[1],$=x[2],Z=t[l-1];Z||G(0);var I=(l<<3)-8+Ze(Z)-$.b,k=I>>3,D=0,R=(t[k]|t[k+1]<<8)>>(I&7)&(1<<$.b)-1;k=(I-=U.b)>>3;var j=(t[k]|t[k+1]<<8)>>(I&7)&(1<<U.b)-1;k=(I-=B.b)>>3;var N=(t[k]|t[k+1]<<8)>>(I&7)&(1<<B.b)-1;for(++b;--b;){var ke=$.s[R],Y=$.n[R],oe=B.s[N],K=B.n[N],J=U.s[j],P=U.n[j];k=(I-=J)>>3;var ae=1<<J,re=ae+((t[k]|t[k+1]<<8|t[k+2]<<16|t[k+3]<<24)>>>(I&7)&ae-1);k=(I-=Ln[oe])>>3;var de=Da[oe]+((t[k]|t[k+1]<<8|t[k+2]<<16)>>(I&7)&(1<<Ln[oe])-1);k=(I-=Un[ke])>>3;var Me=Ba[ke]+((t[k]|t[k+1]<<8|t[k+2]<<16)>>(I&7)&(1<<Un[ke])-1);if(k=(I-=Y)>>3,R=$.t[R]+((t[k]|t[k+1]<<8)>>(I&7)&(1<<Y)-1),k=(I-=K)>>3,N=B.t[N]+((t[k]|t[k+1]<<8)>>(I&7)&(1<<K)-1),k=(I-=P)>>3,j=U.t[j]+((t[k]|t[k+1]<<8)>>(I&7)&(1<<P)-1),re>3)e.o[2]=e.o[1],e.o[1]=e.o[0],e.o[0]=re-=3;else{var Ee=re-(Me!=0);Ee?(re=Ee==3?e.o[0]-1:e.o[Ee],Ee>1&&(e.o[2]=e.o[1]),e.o[1]=e.o[0],e.o[0]=re):re=e.o[0]}for(var y=0;y<Me;++y)m[D+y]=m[v+y];D+=Me,v+=Me;var fe=D-re;if(fe<0){var he=-fe,_e=e.e+fe;he>de&&(he=de);for(var y=0;y<he;++y)m[D+y]=e.w[_e+y];D+=he,de-=he,fe=0}for(var y=0;y<de;++y)m[D+y]=m[fe+y];D+=de}if(D!=v)for(;v<m.length;)m[D++]=m[v++];else D=m.length;n?e.y+=D:m=zn(m,0,D)}else if(n){if(e.y+=f,v)for(var y=0;y<f;++y)m[y]=m[v+y]}else v&&(m=zn(m,v));return e.b=l,m}G(2)}},Ua=function(t,e){if(t.length==1)return t[0];for(var n=new H(e),r=0,i=0;r<t.length;++r){var a=t[r];n.set(a,i),i+=a.length}return n}});var si=pe($t=>{"use strict";Object.defineProperty($t,"__esModule",{value:!0});$t.Module=void 0;var g=typeof g<"u"?g:{};$t.Module=g;var vt={},Ue;for(Ue in g)g.hasOwnProperty(Ue)&&(vt[Ue]=g[Ue]);var La=[],Je=g.printErr||console.warn.bind(console);for(Ue in vt)vt.hasOwnProperty(Ue)&&(g[Ue]=vt[Ue]);var Fn=(t,e)=>{throw e};vt=null;g.arguments&&(La=g.arguments);g.thisProgram&&(thisProgram=g.thisProgram);g.quit&&(Fn=g.quit);typeof WebAssembly!="object"&&$n("no native wasm support detected");var _t,Lt=!1,Ft,Xr,Fa;function Qr(){var t=_t.buffer;g.HEAP8=Fa=new Int8Array(t),g.HEAPU8=Xr=new Uint8Array(t)}var Kr=[],Jr=[],Yr=[],$a=!1;function Ra(){if(g.preRun)for(typeof g.preRun=="function"&&(g.preRun=[g.preRun]);g.preRun.length;)Na(g.preRun.shift());Rn(Kr)}function Pa(){$a=!0,Rn(Jr)}function Oa(){if(g.postRun)for(typeof g.postRun=="function"&&(g.postRun=[g.postRun]);g.postRun.length;)Za(g.postRun.shift());Rn(Yr)}function Na(t){Kr.unshift(t)}function Ha(t){Jr.unshift(t)}function Za(t){Yr.unshift(t)}var Ge=0,wt=null;function Ga(t){var e;Ge++,(e=g.monitorRunDependencies)===null||e===void 0||e.call(g,Ge)}function ja(t){var e;if(Ge--,(e=g.monitorRunDependencies)===null||e===void 0||e.call(g,Ge),Ge==0&&wt){var n=wt;wt=null,n()}}function $n(t){var e;(e=g.onAbort)===null||e===void 0||e.call(g,t),t="Aborted("+t+")",Je(t),Lt=!0,t+=". Build with -sASSERTIONS for more info.";var n=new WebAssembly.RuntimeError(t);throw n}function Va(){return{a:ss}}function qa(t){return fetch(t,{credentials:"same-origin"}).then(function(e){if(!e.ok)throw"failed to load wasm binary file at '"+t+"'";return e.arrayBuffer()})}function Wa(t){var e=Va();function n(s,l){return V=s.exports,_t=V.f,Qr(),Ha(V.g),ja("wasm-instantiate"),V}Ga("wasm-instantiate");function r(s){n(s.instance)}function i(s){return qa(t).then(function(l){var d=WebAssembly.instantiate(l,e);return d}).then(s,function(l){Je("failed to asynchronously prepare wasm: "+l),$n(l)})}function a(){return t&&t.byteLength>0?WebAssembly.instantiate(t,e).then(r,function(s){Je("wasm compile failed: "+s)}):typeof WebAssembly.instantiateStreaming=="function"&&typeof t=="string"&&typeof fetch=="function"?fetch(t,{credentials:"same-origin"}).then(function(s){var l=WebAssembly.instantiateStreaming(s,e);return l.then(r,function(d){return Je("wasm streaming compile failed: "+d),Je("falling back to ArrayBuffer instantiation"),i(r)})}):i(r)}if(g.instantiateWasm)try{var o=g.instantiateWasm(e,n);return o}catch(s){return Je("Module.instantiateWasm callback failed with error: "+s),!1}return a(),{}}var zt=class{constructor(e){this.name="ExitStatus",this.message=`Program terminated with exit(${e})`,this.status=e}},Rn=t=>{for(;t.length>0;)t.shift()(g)},ei=g.noExitRuntime||!0,Xa=()=>$n(""),ti=0,Qa=()=>{ei=!1,ti=0},gt={},ni=t=>{if(t instanceof zt||t=="unwind")return Ft;Fn(1,t)},ri=()=>ei||ti>0,ii=t=>{var e;Ft=t,ri()||((e=g.onExit)===null||e===void 0||e.call(g,t),Lt=!0),Fn(t,new zt(t))},Ka=(t,e)=>{Ft=t,ii(t)},Ja=Ka,Ya=()=>{if(!ri())try{Ja(Ft)}catch(t){ni(t)}},es=t=>{if(!Lt)try{t(),Ya()}catch(e){ni(e)}},ts=()=>performance.now(),ns=(t,e)=>{if(gt[t]&&(clearTimeout(gt[t].id),delete gt[t]),!e)return 0;var n=setTimeout(()=>{delete gt[t],es(()=>oi(t,ts()))},e);return gt[t]={id:n,timeout_ms:e},0},rs=()=>2147483648,is=(t,e)=>Math.ceil(t/e)*e,os=t=>{var e=_t.buffer,n=(t-e.byteLength+65535)/65536|0;try{return _t.grow(n),Qr(),1}catch{}},as=t=>{var e=Xr.length;t>>>=0;var n=rs();if(t>n)return!1;for(var r=1;r<=4;r*=2){var i=e*(1+.2/r);i=Math.min(i,t+100663296);var a=Math.min(n,is(Math.max(t,i),65536)),o=os(a);if(o)return!0}return!1},ss={c:Xa,b:Qa,d:ns,e:as,a:ii},V,ls=g._ZSTD_isError=t=>(ls=g._ZSTD_isError=V.h)(t),cs=g._ZSTD_compressBound=t=>(cs=g._ZSTD_compressBound=V.i)(t),ds=g._ZSTD_createCCtx=()=>(ds=g._ZSTD_createCCtx=V.j)(),us=g._ZSTD_freeCCtx=t=>(us=g._ZSTD_freeCCtx=V.k)(t),fs=g._ZSTD_compress_usingDict=(t,e,n,r,i,a,o,s)=>(fs=g._ZSTD_compress_usingDict=V.l)(t,e,n,r,i,a,o,s),hs=g._ZSTD_compress=(t,e,n,r,i)=>(hs=g._ZSTD_compress=V.m)(t,e,n,r,i),ps=g._ZSTD_createDCtx=()=>(ps=g._ZSTD_createDCtx=V.n)(),ms=g._ZSTD_freeDCtx=t=>(ms=g._ZSTD_freeDCtx=V.o)(t),gs=g._ZSTD_getFrameContentSize=(t,e)=>(gs=g._ZSTD_getFrameContentSize=V.p)(t,e),vs=g._ZSTD_decompress_usingDict=(t,e,n,r,i,a,o)=>(vs=g._ZSTD_decompress_usingDict=V.q)(t,e,n,r,i,a,o),ws=g._ZSTD_decompress=(t,e,n,r)=>(ws=g._ZSTD_decompress=V.r)(t,e,n,r),ys=g._malloc=t=>(ys=g._malloc=V.s)(t),bs=g._free=t=>(bs=g._free=V.t)(t),oi=(t,e)=>(oi=V.v)(t,e),Ut;wt=function t(){Ut||ai(),Ut||(wt=t)};function ai(){if(Ge>0||(Ra(),Ge>0))return;function t(){var e;Ut||(Ut=!0,g.calledRun=!0,!Lt&&(Pa(),(e=g.onRuntimeInitialized)===null||e===void 0||e.call(g),Oa()))}g.setStatus?(g.setStatus("Running..."),setTimeout(()=>{setTimeout(()=>g.setStatus(""),1),t()},1)):t()}g.run=ai;if(g.preInit)for(typeof g.preInit=="function"&&(g.preInit=[g.preInit]);g.preInit.length>0;)g.preInit.pop()();g.init=Wa});var je=pe(Le=>{"use strict";var xs=Le&&Le.__awaiter||function(t,e,n,r){function i(a){return a instanceof n?a:new n(function(o){o(a)})}return new(n||(n=Promise))(function(a,o){function s(c){try{d(r.next(c))}catch(u){o(u)}}function l(c){try{d(r.throw(c))}catch(u){o(u)}}function d(c){c.done?a(c.value):i(c.value).then(s,l)}d((r=r.apply(t,e||[])).next())})};Object.defineProperty(Le,"__esModule",{value:!0});Le.Module=Le.waitInitialized=void 0;var li=si();Object.defineProperty(Le,"Module",{enumerable:!0,get:function(){return li.Module}});var ks=new Promise(t=>{li.Module.onRuntimeInitialized=t}),Ms=()=>xs(void 0,void 0,void 0,function*(){yield ks});Le.waitInitialized=Ms});var yt=pe(Rt=>{"use strict";Object.defineProperty(Rt,"__esModule",{value:!0});Rt.isError=void 0;var Es=je(),Ts=t=>{let e=Es.Module._ZSTD_isError;return e(t)};Rt.isError=Ts});var ci=pe(Pt=>{"use strict";Object.defineProperty(Pt,"__esModule",{value:!0});Pt.decompress=void 0;var Ye=je(),As=yt(),Is=(t,e)=>{let n=Ye.Module._ZSTD_getFrameContentSize;return n(t,e)},Cs=(t,e={defaultHeapSize:1024*1024})=>{let n=Ye.Module._malloc,r=n(t.byteLength);Ye.Module.HEAP8.set(t,r);let i=Is(r,t.byteLength),a=i===-1?e.defaultHeapSize:i,o=Ye.Module._free,s=n(a);try{let l=Ye.Module._ZSTD_decompress,d=l(s,a,r,t.byteLength);if((0,As.isError)(d))throw new Error(`Failed to compress with code ${d}`);let c=new Uint8Array(Ye.Module.HEAPU8.buffer,s,d).slice();return o(s,a),o(r,t.byteLength),c}catch(l){throw o(s,a),o(r,t.byteLength),l}};Pt.decompress=Cs});var di=pe(Ot=>{"use strict";Object.defineProperty(Ot,"__esModule",{value:!0});Ot.compress=void 0;var et=je(),Ss=yt(),Bs=t=>{let e=et.Module._ZSTD_compressBound;return e(t)},Ds=(t,e)=>{let n=Bs(t.byteLength),r=et.Module._malloc,i=r(n),a=r(t.byteLength);et.Module.HEAP8.set(t,a);let o=et.Module._free;try{let s=et.Module._ZSTD_compress,l=s(i,n,a,t.byteLength,e??3);if((0,Ss.isError)(l))throw new Error(`Failed to compress with code ${l}`);let d=new Uint8Array(et.Module.HEAPU8.buffer,i,l).slice();return o(i,n),o(a,t.byteLength),d}catch(s){throw o(i,n),o(a,t.byteLength),s}};Ot.compress=Ds});var ui=pe(Fe=>{"use strict";Object.defineProperty(Fe,"__esModule",{value:!0});Fe.decompressUsingDict=Fe.freeDCtx=Fe.createDCtx=void 0;var Se=je(),_s=yt(),zs=(t,e)=>{let n=Se.Module._ZSTD_getFrameContentSize;return n(t,e)},Us=()=>Se.Module._ZSTD_createDCtx();Fe.createDCtx=Us;var Ls=t=>Se.Module._ZSTD_freeDCtx(t);Fe.freeDCtx=Ls;var Fs=(t,e,n,r={defaultHeapSize:1024*1024})=>{let i=Se.Module._malloc,a=i(e.byteLength);Se.Module.HEAP8.set(e,a);let o=i(n.byteLength);Se.Module.HEAP8.set(n,o);let s=zs(a,e.byteLength),l=s===-1?r.defaultHeapSize:s,d=Se.Module._free,c=i(l);try{let u=Se.Module._ZSTD_decompress_usingDict,f=u(t,c,l,a,e.byteLength,o,n.byteLength);if((0,_s.isError)(f))throw new Error(`Failed to compress with code ${f}`);let h=new Uint8Array(Se.Module.HEAPU8.buffer,c,f).slice();return d(c,l),d(a,e.byteLength),d(o,n.byteLength),h}catch(u){throw d(c,l),d(a,e.byteLength),d(o,n.byteLength),u}};Fe.decompressUsingDict=Fs});var fi=pe($e=>{"use strict";Object.defineProperty($e,"__esModule",{value:!0});$e.compressUsingDict=$e.freeCCtx=$e.createCCtx=void 0;var Be=je(),$s=yt(),Rs=t=>{let e=Be.Module._ZSTD_compressBound;return e(t)},Ps=()=>Be.Module._ZSTD_createCCtx();$e.createCCtx=Ps;var Os=t=>Be.Module._ZSTD_freeCCtx(t);$e.freeCCtx=Os;var Ns=(t,e,n,r)=>{let i=Rs(e.byteLength),a=Be.Module._malloc,o=a(i),s=a(e.byteLength);Be.Module.HEAP8.set(e,s);let l=a(n.byteLength);Be.Module.HEAP8.set(n,l);let d=Be.Module._free;try{let c=Be.Module._ZSTD_compress_usingDict,u=c(t,o,i,s,e.byteLength,l,n.byteLength,r??3);if((0,$s.isError)(u))throw new Error(`Failed to compress with code ${u}`);let f=new Uint8Array(Be.Module.HEAPU8.buffer,o,u).slice();return d(o,i),d(s,e.byteLength),d(l,n.byteLength),f}catch(c){throw d(o,i),d(s,e.byteLength),d(l,n.byteLength),c}};$e.compressUsingDict=Ns});var pi=pe(ie=>{"use strict";var Hs=ie&&ie.__createBinding||(Object.create?function(t,e,n,r){r===void 0&&(r=n);var i=Object.getOwnPropertyDescriptor(e,n);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(t,r,i)}:function(t,e,n,r){r===void 0&&(r=n),t[r]=e[n]}),Nt=ie&&ie.__exportStar||function(t,e){for(var n in t)n!=="default"&&!Object.prototype.hasOwnProperty.call(e,n)&&Hs(e,t,n)},Zs=ie&&ie.__awaiter||function(t,e,n,r){function i(a){return a instanceof n?a:new n(function(o){o(a)})}return new(n||(n=Promise))(function(a,o){function s(c){try{d(r.next(c))}catch(u){o(u)}}function l(c){try{d(r.throw(c))}catch(u){o(u)}}function d(c){c.done?a(c.value):i(c.value).then(s,l)}d((r=r.apply(t,e||[])).next())})};Object.defineProperty(ie,"__esModule",{value:!0});ie.init=void 0;var hi=je(),Gs=()=>Zs(void 0,void 0,void 0,function*(){let{readFile:t}=require("fs/promises"),{resolve:e}=require("path"),n=yield t(e(__dirname,"./zstd.wasm"));hi.Module.init(n),yield(0,hi.waitInitialized)()});ie.init=Gs;Nt(ci(),ie);Nt(di(),ie);Nt(ui(),ie);Nt(fi(),ie)});var Pn=pe(tt=>{tt.hashU32=function(e){return e=e|0,e=e+2127912214+(e<<12)|0,e=e^-949894596^e>>>19,e=e+374761393+(e<<5)|0,e=e+-744332180^e<<9,e=e+-42973499+(e<<3)|0,e^-1252372727^e>>>16|0};tt.readU64=function(e,n){var r=0;return r|=e[n++]<<0,r|=e[n++]<<8,r|=e[n++]<<16,r|=e[n++]<<24,r|=e[n++]<<32,r|=e[n++]<<40,r|=e[n++]<<48,r|=e[n++]<<56,r};tt.readU32=function(e,n){var r=0;return r|=e[n++]<<0,r|=e[n++]<<8,r|=e[n++]<<16,r|=e[n++]<<24,r};tt.writeU32=function(e,n,r){e[n++]=r>>0&255,e[n++]=r>>8&255,e[n++]=r>>16&255,e[n++]=r>>24&255};tt.imul=function(e,n){var r=e>>>16,i=e&65535,a=n>>>16,o=n&65535;return i*o+(r*o+i*a<<16)|0}});var yi=pe(wi=>{var be=Pn(),Ve=2654435761,qe=2246822519,mi=3266489917,js=668265263,gi=374761393;function Ht(t,e){return t=t|0,e=e|0,t>>>(32-e|0)|t<<e|0}function vi(t,e,n){return t=t|0,e=e|0,n=n|0,be.imul(t>>>(32-e|0)|t<<e,n)|0}function On(t,e){return t=t|0,e=e|0,t>>>e^t|0}function bt(t,e,n,r,i){return vi(be.imul(e,n)+t,r,i)}function Vs(t,e,n){return vi(t+be.imul(e[n],gi),11,Ve)}function qs(t,e,n){return bt(t,be.readU32(e,n),mi,17,js)}function Ws(t,e,n){return[bt(t[0],be.readU32(e,n+0),qe,13,Ve),bt(t[1],be.readU32(e,n+4),qe,13,Ve),bt(t[2],be.readU32(e,n+8),qe,13,Ve),bt(t[3],be.readU32(e,n+12),qe,13,Ve)]}function Xs(t,e,n,r){var i,a;if(a=r,r>=16){for(i=[t+Ve+qe,t+qe,t,t-Ve];r>=16;)i=Ws(i,e,n),n+=16,r-=16;i=Ht(i[0],1)+Ht(i[1],7)+Ht(i[2],12)+Ht(i[3],18)+a}else i=t+gi+r>>>0;for(;r>=4;)i=qs(i,e,n),n+=4,r-=4;for(;r>0;)i=Vs(i,e,n),n++,r--;return i=On(be.imul(On(be.imul(On(i,15),qe),13),mi),16),i>>>0}wi.hash=Xs});var Ci=pe(q=>{var Qs=yi(),ue=Pn(),Gt=4,Ks=13,bi=5,Nn=6,jt=65536,xt=4,Zt=(1<<xt)-1,Js=4,nt=(1<<Js)-1,xi=Ai(5<<20),Hn=el(),Gn=407708164,Ys=4,Mi=8,Ei=16,jn=64,Zn=192,Vt=2147483648,ki=7,Vn=4,Ti=7,qt={4:65536,5:262144,6:1048576,7:4194304};function el(){try{return new Uint32Array(jt)}catch{for(var t=new Array(jt),e=0;e<jt;e++)t[e]=0;return t}}function tl(t){for(var e=0;e<jt;e++)Hn[e]=0}function Ai(t){try{return new Uint8Array(t)}catch{for(var e=new Array(t),n=0;n<t;n++)e[n]=0;return e}}function Ii(t,e,n){if(typeof t.buffer!==void 0){if(Uint8Array.prototype.slice)return t.slice(e,n);var r=t.length;e=e|0,e=e<0?Math.max(r+e,0):Math.min(e,r),n=n===void 0?r:n|0,n=n<0?Math.max(r+n,0):Math.min(n,r);for(var i=new Uint8Array(n-e),a=e,o=0;a<n;)i[o++]=t[a++];return i}else return t.slice(e,n)}q.compressBound=function(e){return e+e/255+16|0};q.decompressBound=function(e){var n=0;if(ue.readU32(e,n)!==Gn)throw new Error("invalid magic number");n+=4;var r=e[n++];if((r&Zn)!==jn)throw new Error("incompatible descriptor version "+(r&Zn));var i=(r&Ei)!==0,a=(r&Mi)!==0,o=e[n++]>>Vn&Ti;if(qt[o]===void 0)throw new Error("invalid block size "+o);var s=qt[o];if(a)return ue.readU64(e,n);n++;for(var l=0;;){var d=ue.readU32(e,n);if(n+=4,d&Vt?(d&=~Vt,l+=d):l+=s,d===0)return l;i&&(n+=4),n+=d}};q.makeBuffer=Ai;q.decompressBlock=function(e,n,r,i,a){var o,s,l,d,c;for(l=r+i;r<l;){var u=e[r++],f=u>>4;if(f>0){if(f===15)for(;f+=e[r],e[r++]===255;);for(d=r+f;r<d;)n[a++]=e[r++]}if(r>=l)break;if(o=u&15,s=e[r++]|e[r++]<<8,o===15)for(;o+=e[r],e[r++]===255;);for(o+=Gt,c=a-s,d=c+o;c<d;)n[a++]=n[c++]|0}return a};q.compressBlock=function(e,n,r,i,a){var o,s,l,d,c,u,f,h,p;if(f=0,h=i+r,s=r,i>=Ks)for(var m=(1<<Nn)+3;r+Gt<h-bi;){var v=ue.readU32(e,r),T=ue.hashU32(v)>>>0;if(T=(T>>16^T)>>>0&65535,o=a[T]-1,a[T]=r+1,o<0||r-o>>>16>0||ue.readU32(e,o)!==v){c=m++>>Nn,r+=c;continue}for(m=(1<<Nn)+3,u=r-s,d=r-o,r+=Gt,o+=Gt,l=r;r<h-bi&&e[r]===e[o];)r++,o++;l=r-l;var w=l<Zt?l:Zt;if(u>=nt){for(n[f++]=(nt<<xt)+w,p=u-nt;p>=255;p-=255)n[f++]=255;n[f++]=p}else n[f++]=(u<<xt)+w;for(var b=0;b<u;b++)n[f++]=e[s+b];if(n[f++]=d,n[f++]=d>>8,l>=Zt){for(p=l-Zt;p>=255;p-=255)n[f++]=255;n[f++]=p}s=r}if(s===0)return 0;if(u=h-s,u>=nt){for(n[f++]=nt<<xt,p=u-nt;p>=255;p-=255)n[f++]=255;n[f++]=p}else n[f++]=u<<xt;for(r=s;r<h;)n[f++]=e[r++];return f};q.decompressFrame=function(e,n){var r,i,a,o,s=0,l=0;if(ue.readU32(e,s)!==Gn)throw new Error("invalid magic number");if(s+=4,o=e[s++],(o&Zn)!==jn)throw new Error("incompatible descriptor version");r=(o&Ei)!==0,i=(o&Ys)!==0,a=(o&Mi)!==0;var d=e[s++]>>Vn&Ti;if(qt[d]===void 0)throw new Error("invalid block size");for(a&&(s+=8),s++;;){var c;if(c=ue.readU32(e,s),s+=4,c===0)break;if(r&&(s+=4),c&Vt){c&=~Vt;for(var u=0;u<c;u++)n[l++]=e[s++]}else l=q.decompressBlock(e,n,s,c,l),s+=c}return i&&(s+=4),l};q.compressFrame=function(e,n){var r=0;ue.writeU32(n,r,Gn),r+=4,n[r++]=jn,n[r++]=ki<<Vn,n[r]=Qs.hash(0,n,4,r-4)>>8,r++;var i=qt[ki],a=e.length,o=0;for(tl(Hn);a>0;){var s=0,l=a>i?i:a;if(s=q.compressBlock(e,xi,o,l,Hn),s>l||s===0){ue.writeU32(n,r,2147483648|l),r+=4;for(var d=o+l;o<d;)n[r++]=e[o++];a-=l}else{ue.writeU32(n,r,s),r+=4;for(var c=0;c<s;)n[r++]=xi[c++];o+=l,a-=l}}return ue.writeU32(n,r,0),r+=4,r};q.decompress=function(e,n){var r,i;return n===void 0&&(n=q.decompressBound(e)),r=q.makeBuffer(n),i=q.decompressFrame(e,r),i!==n&&(r=Ii(r,0,i)),r};q.compress=function(e,n){var r,i;return n===void 0&&(n=q.compressBound(e.length)),r=q.makeBuffer(n),i=q.compressFrame(e,r),i!==n&&(r=Ii(r,0,i)),r}});var te={};dr(te,{COMP_BR:()=>ir,COMP_LZ4:()=>rr,COMP_NONE:()=>kt,COMP_ZIP:()=>tr,COMP_ZSTD:()=>nr,FIXED_HEADER_SIZE_V1:()=>rt,MDOCX_MAGIC:()=>on,MDOCX_MEDIA_URI_PREFIX:()=>Qt,MarkdownBundleBuilder:()=>lo,MdocxBuilder:()=>lr,MediaBundleBuilder:()=>co,MediaResolver:()=>Cl,SECTION_TYPE_MARKDOWN:()=>an,SECTION_TYPE_MEDIA:()=>Pe,createBuilder:()=>Ll,createMediaIdRef:()=>Il,createSimpleDocument:()=>Ul,defaultReadLimits:()=>Qi,documentToMdocxBytes:()=>Ml,documentToMdocxBytesAsync:()=>El,extractMediaReferences:()=>so,findUnresolvedReferences:()=>Sl,initZstd:()=>Ji,isValidMdocx:()=>Al,isZstdCompressionAvailable:()=>al,parseMediaReference:()=>Kt,readMdocx:()=>xl,resolveMediaReference:()=>sr,validateMdocx:()=>Tl,validateMdocxDetailed:()=>ar,writeMdocx:()=>Jn,writeMdocxAsync:()=>Yn});function rl(t,e){if(t.byteLength!==e.byteLength)return!1;for(let n=0;n<t.byteLength;n++)if(t[n]!==e[n])return!1;return!0}function il(t){return new TextDecoder("utf-8",{fatal:!1}).decode(t)}function Ki(t){return new TextEncoder().encode(t)}async function Ji(){Xt||(await(0,en.init)(),Xt=!0)}function al(){return Xt}function sl(t,e,n){if(n<0)throw new Error("expectedSize < 0");switch(t){case"none":return e.byteLength,e;case"br":{let r=(0,Yt.brotliDecompressSync)(e);if(r.byteLength!==n)throw new Error(`Brotli size mismatch (got ${r.byteLength}, expected ${n})`);return r}case"zstd":{let r=qr(e);if(r.byteLength!==n)throw new Error(`ZSTD size mismatch (got ${r.byteLength}, expected ${n})`);return r}case"lz4":{let r=(0,tn.decompress)(e);if(r.byteLength!==n)throw new Error(`LZ4 size mismatch (got ${r.byteLength}, expected ${n})`);return r}case"zip":{let r=Zr(e),i=Object.keys(r);if(i.length!==1||i[0]!=="payload.gob")throw new Error("ZIP must contain exactly one file named payload.gob");let a=r["payload.gob"];if(!a)throw new Error("ZIP missing payload.gob");if(a.byteLength!==n)throw new Error(`ZIP size mismatch (got ${a.byteLength}, expected ${n})`);return a}}}function Yi(t,e){switch(t){case"none":return e;case"br":return(0,Yt.brotliCompressSync)(e);case"zstd":{if(!Xt)throw new Error("ZSTD compression requires initialization. Call `await initZstd()` first, or use `compressPayloadAsync`.");return(0,en.compress)(e,ol)}case"lz4":return(0,tn.compress)(e);case"zip":return Hr({"payload.gob":e})}}async function ll(t,e){return t==="zstd"&&await Ji(),Yi(t,e)}function ce(t,e){if(t>BigInt(Number.MAX_SAFE_INTEGER))throw new Error(`${e} exceeds MAX_SAFE_INTEGER`);if(t<BigInt(Number.MIN_SAFE_INTEGER))throw new Error(`${e} below MIN_SAFE_INTEGER`);return Number(t)}function ul(t){for(let e of t)if(e!==0)return!1;return!0}function xe(t,e,n){let r=e.get(n);switch(r.kind){case"bool":return t.readGobUint()!==0n;case"int":return ce(t.readGobInt(),"int");case"uint":return ce(t.readGobUint(),"uint");case"float":{let i=t.readGobUint();if(i>0xffffffffffffffffn)throw new Error("float bits too large");let a=new ArrayBuffer(8),o=new DataView(a);return o.setBigUint64(0,i,!1),o.getFloat64(0,!1)}case"bytes":return t.readGobBytes();case"string":return t.readGobString();case"complex":{let i=xe(t,e,4),a=xe(t,e,4);return{real:i,imag:a}}case"interface":{let i=t.readGobString();if(i==="")return null;let a=ce(t.readGobInt(),"interface concrete type id");return{name:i,value:xe(t,e,a)}}case"array":{let i=ce(t.readGobUint(),"array len");if(i!==r.len)throw new Error(`Array length mismatch: got ${i}, expected ${r.len}`);if(e.get(r.elem).kind==="uint"&&r.len>0){let s=new Uint8Array(r.len);for(let l=0;l<r.len;l++){let d=ce(t.readGobUint(),"array uint elem");if(!Number.isInteger(d)||d<0||d>255)throw new Error("uint8 out of range");s[l]=d}return s}let o=[];for(let s=0;s<r.len;s++)o.push(xe(t,e,r.elem));return o}case"slice":{let i=ce(t.readGobUint(),"slice len");if(e.get(r.elem).kind==="uint"){let s=new Uint8Array(i);for(let l=0;l<i;l++){let d=ce(t.readGobUint(),"slice uint elem");if(!Number.isInteger(d)||d<0||d>255)throw new Error("uint8 out of range");s[l]=d}return s}let o=[];for(let s=0;s<i;s++)o.push(xe(t,e,r.elem));return o}case"map":{let i=ce(t.readGobUint(),"map len"),a={};for(let o=0;o<i;o++){let s=xe(t,e,r.key),l=xe(t,e,r.elem);if(typeof s!="string")throw new Error("Only string keys supported in this decoder");a[s]=l}return a}case"struct":{let i={},a=-1;for(;;){let o=ce(t.readGobUint(),"field delta");if(o===0)break;if(a+=o,a<0||a>=r.fields.length)throw new Error(`Struct field out of range: ${a} (have ${r.fields.length})`);let s=r.fields[a];i[s.name]=xe(t,e,s.typeId)}return i}}}function We(t,e,n,r){let i=e.get(n);switch(i.kind){case"bool":{t.writeGobUint(r?1n:0n);return}case"int":{if(typeof r!="number"||!Number.isFinite(r)||!Number.isInteger(r))throw new Error("Expected int number");t.writeGobInt(BigInt(r));return}case"uint":{if(typeof r!="number"||!Number.isFinite(r)||!Number.isInteger(r)||r<0)throw new Error("Expected uint number");t.writeGobUint(BigInt(r));return}case"float":{if(typeof r!="number"||!Number.isFinite(r))throw new Error("Expected float number");let a=new ArrayBuffer(8),o=new DataView(a);o.setFloat64(0,r,!1),t.writeGobUint(o.getBigUint64(0,!1));return}case"bytes":{if(!(r instanceof Uint8Array))throw new Error("Expected Uint8Array for bytes");t.writeGobBytes(r);return}case"string":{if(typeof r!="string")throw new Error("Expected string");t.writeGobString(r);return}case"complex":throw new Error("complex not supported for encoding");case"interface":throw new Error("interface not supported for encoding");case"array":{if(!(r instanceof Uint8Array)&&!Array.isArray(r))throw new Error("Expected array");t.writeGobUint(BigInt(i.len));let a=e.get(i.elem);if(r instanceof Uint8Array){if(r.byteLength!==i.len)throw new Error("Array byte length mismatch");if(a.kind!=="uint")throw new Error("Uint8Array arrays only supported for uint elements");for(let o of r)t.writeGobUint(BigInt(o));return}if(r.length!==i.len)throw new Error("Array length mismatch");for(let o of r)We(t,e,i.elem,o);return}case"slice":{let a=e.get(i.elem);if(r instanceof Uint8Array&&a.kind==="uint"){t.writeGobUint(BigInt(r.byteLength));for(let o of r)t.writeGobUint(BigInt(o));return}if(!Array.isArray(r))throw new Error("Expected slice as JS array");t.writeGobUint(BigInt(r.length));for(let o of r)We(t,e,i.elem,o);return}case"map":{if(!r||typeof r!="object"||Array.isArray(r))throw new Error("Expected map object");let a=Object.entries(r);t.writeGobUint(BigInt(a.length));for(let[o,s]of a)We(t,e,i.key,o),We(t,e,i.elem,s);return}case"struct":{if(!r||typeof r!="object"||Array.isArray(r))throw new Error("Expected struct object");let a=r,o=-1;for(let s=0;s<i.fields.length;s++){let l=i.fields[s],d=a[l.name],c=e.get(l.typeId),f=c.kind==="array";if(f||(d===void 0||c.kind==="string"&&d===""||(c.kind==="int"||c.kind==="uint")&&d===0||c.kind==="bytes"&&d instanceof Uint8Array&&d.byteLength===0||c.kind==="slice"&&Array.isArray(d)&&d.length===0?f=!1:f=!0),!f)continue;let h=s-o;t.writeGobUint(BigInt(h)),We(t,e,l.typeId,d),o=s}t.writeGobUint(0n);return}}}function Bi(t){let e=new Kn;return e.writeGobUint(BigInt(t.byteLength)),e.writeBytes(t),e.concat()}function fl(t,e){let n=new Qn(e);return xe(n,t,16)}function hl(t){let e=o=>{let s=t[o];if(s&&typeof s=="object"&&!Array.isArray(s))return s},n=e("ArrayT");if(n){let o=n.CommonType,s=Number(n.Elem),l=Number(n.Len);return{kind:"array",name:String(o?.Name??""),elem:s,len:l}}let r=e("SliceT");if(r){let o=r.CommonType,s=Number(r.Elem);return{kind:"slice",name:String(o?.Name??""),elem:s}}let i=e("StructT");if(i){let o=i.CommonType,s=i.Field;if(!Array.isArray(s))throw new Error("structType.Field must be an array");let l=s.map(d=>{if(!d||typeof d!="object"||Array.isArray(d))throw new Error("fieldType must be object");let c=d;return{name:String(c.Name),typeId:Number(c.Id)}});return{kind:"struct",name:String(o?.Name??""),fields:l}}let a=e("MapT");if(a){let o=a.CommonType,s=Number(a.Key),l=Number(a.Elem);return{kind:"map",name:String(o?.Name??""),key:s,elem:l}}throw new Error("Unsupported wireType (no ArrayT/SliceT/StructT/MapT)")}function Di(t){let e=new eo(!0),n=new Qn(t);for(;n.remaining()>0;){let r=n.readGobUint(),i=ce(r,"message length"),a=n.readBytes(i),o=new Qn(a),s=ce(o.readGobInt(),"message type id");if(s<0){let d=-s;if(d<64)throw new Error(`Received reserved/builtin type id: ${d}`);let c=fl(e,o.readBytes(o.remaining()));e.set(d,hl(c));continue}let l=xe(o,e,s);return{typeId:s,value:l}}throw new Error("No gob value found")}function _i(t,e,n){let r=new eo(!0);for(let[c,u]of e.entries())r.set(c,u);let i=[],a=[...e.entries()].sort((c,u)=>c[0]-u[0]);for(let[c,u]of a){let f=pl(c,u),h=new Kn;h.writeGobInt(BigInt(-c)),We(h,r,16,f),i.push(Bi(h.concat()))}let o=new Kn;o.writeGobInt(BigInt(t)),We(o,r,t,n),i.push(Bi(o.concat()));let s=i.reduce((c,u)=>c+u.byteLength,0),l=new Uint8Array(s),d=0;for(let c of i)l.set(c,d),d+=c.byteLength;return l}function pl(t,e){let n=i=>({Name:i,Id:t}),r={};if(e.kind==="array")return r.ArrayT={CommonType:n(e.name??""),Elem:e.elem,Len:e.len},r;if(e.kind==="slice")return r.SliceT={CommonType:n(e.name??""),Elem:e.elem},r;if(e.kind==="map")return r.MapT={CommonType:n(e.name??""),Key:e.key,Elem:e.elem},r;if(e.kind==="struct")return r.StructT={CommonType:n(e.name??""),Field:e.fields.map(i=>({Name:i.name,Id:i.typeId}))},r;throw new Error(`Type kind ${e.kind} cannot be sent as a user type`)}function ml(t){if(t.byteLength!==32)throw new Error("sha256 must be 32 bytes");return ul(t)?void 0:t}function zi(t,e){if(typeof t!="string")throw new Error(`${e} must be a string`);return t}function Ui(t,e){if(typeof t!="number"||!Number.isFinite(t))throw new Error(`${e} must be a number`);return t}function Li(t,e){if(!(t instanceof Uint8Array))throw new Error(`${e} must be bytes`);return t}function qn(t){if(t!==void 0){if(typeof t!="string")throw new Error("Expected optional string");return t.length?t:void 0}}function vl(t){if(t===void 0)return;if(!Array.isArray(t))throw new Error("Expected optional string array");let e=t.map(n=>{if(typeof n!="string")throw new Error("Expected string in array");return n});return e.length?e:void 0}function Fi(t){if(t===void 0)return;if(!t||typeof t!="object"||Array.isArray(t))throw new Error("Expected optional map");let e={};for(let[n,r]of Object.entries(t)){if(typeof r!="string")throw new Error("Expected string map values");e[n]=r}return Object.keys(e).length?e:void 0}function wl(t){let e=t.readBytes(8),n=t.readU16LE(),r=t.readU16LE(),i=t.readU32LE(),a=t.readU32LE(),o=t.readU32LE(),s=t.readU64LE();return{magic:e,version:n,headerFlags:r,fixedHeaderSize:i,metadataLength:a,reserved0:o,reserved1:s}}function $i(t){let e=t.readU16LE(),n=t.readU16LE(),r=t.readU64LE(),i=t.readU32LE();return{sectionType:e,sectionFlags:n,payloadLen:r,reserved:i}}function yl(t){let e=t&15,n=(t&or)!==0;switch(e){case kt:return{alg:"none",hasUncompressedLen:n};case tr:return{alg:"zip",hasUncompressedLen:n};case nr:return{alg:"zstd",hasUncompressedLen:n};case rr:return{alg:"lz4",hasUncompressedLen:n};case ir:return{alg:"br",hasUncompressedLen:n};default:throw new Error(`Unknown compression value: 0x${e.toString(16)}`)}}function bl(t,e,n){if(e.metadataLength===0)return;if(e.metadataLength>n.maxMetadataLength)throw new Error(`MetadataLength too large: ${e.metadataLength}`);let r=t.readBytes(e.metadataLength);if(!(e.headerFlags&er))return{raw:r};let i=il(r),a=JSON.parse(i);if(!a||typeof a!="object"||Array.isArray(a))throw new Error("Metadata JSON must be an object");return a}function Ri(t,e,n,r,i){if(e.sectionType!==r)throw new Error(`Unexpected section type: ${e.sectionType}, expected ${r}`);if(e.reserved!==0)throw new Error("Section reserved must be 0");if(e.payloadLen>BigInt(n.maxSectionPayloadLen))throw new Error(`Section payloadLen too large: ${e.payloadLen}`);let a=Number(e.payloadLen);if(!Number.isSafeInteger(a)||a<0)throw new Error("payloadLen is not a safe JS integer");let o=t.readBytes(a),{alg:s,hasUncompressedLen:l}=yl(e.sectionFlags);if(s==="none"){if(l)throw new Error("HAS_UNCOMPRESSED_LEN must be 0 for COMP_NONE");return o}if(!l)throw new Error("Compressed payloads MUST set HAS_UNCOMPRESSED_LEN");if(o.byteLength<8)throw new Error("Compressed payload missing UncompressedLen prefix");let c=new DataView(o.buffer,o.byteOffset,o.byteLength).getBigUint64(0,!0);if(c>BigInt(i))throw new Error(`UncompressedLen too large: ${c}`);let u=Number(c);if(!Number.isSafeInteger(u)||u<0)throw new Error("UncompressedLen is not a safe JS integer");let f=o.subarray(8);return sl(s,f,u)}async function xl(t,e=Qi){let n=new nl(t);if(n.remaining()<rt)throw new Error("File too small");let r=wl(n);if(!rl(r.magic,on))throw new Error("Bad magic");if(r.fixedHeaderSize!==rt)throw new Error(`FixedHeaderSize must be ${rt}`);if(r.version!==1)throw new Error(`Unsupported version: ${r.version}`);if(r.reserved0!==0||r.reserved1!==0n)throw new Error("Reserved header fields must be 0");let i=bl(n,r,e);if(n.remaining()<Si)throw new Error("Missing markdown section header");let a=$i(n),o=Ri(n,a,e,an,e.maxMarkdownUncompressed);if(n.remaining()<Si)throw new Error("Missing media section header");let s=$i(n),l=new Uint8Array;if(s.payloadLen===0n){if(s.sectionType!==Pe)throw new Error(`Unexpected section type: ${s.sectionType}, expected ${Pe}`);if(s.reserved!==0)throw new Error("Section reserved must be 0");l=new Uint8Array}else l=Ri(n,s,e,Pe,e.maxMediaUncompressed);let d=new gl,c=d.decodeMarkdownBundle(o),u=l.byteLength?d.decodeMediaBundle(l):{bundleVersion:1,items:[]};return i?{header:r,metadata:i,markdown:c,media:u}:{header:r,markdown:c,media:u}}function Vi(){let t=new Map;return t.set(Hi,{kind:"slice",name:"[]string",elem:Re}),t.set(Xn,{kind:"map",name:"map[string]string",key:Re,elem:Re}),t.set(Oi,{kind:"struct",name:"MarkdownFile",fields:[{name:"Path",typeId:Re},{name:"Content",typeId:Pi},{name:"MediaRefs",typeId:Hi},{name:"Attributes",typeId:Xn}]}),t.set(Ni,{kind:"slice",name:"[]MarkdownFile",elem:Oi}),t.set(to,{kind:"struct",name:"MarkdownBundle",fields:[{name:"BundleVersion",typeId:Wn},{name:"RootPath",typeId:Re},{name:"Files",typeId:Ni}]}),t.set(ji,{kind:"array",name:"[32]uint8",elem:Wn,len:32}),t.set(Zi,{kind:"struct",name:"MediaItem",fields:[{name:"ID",typeId:Re},{name:"Path",typeId:Re},{name:"MimeType",typeId:Re},{name:"Data",typeId:Pi},{name:"SHA256",typeId:ji},{name:"Attributes",typeId:Xn}]}),t.set(Gi,{kind:"slice",name:"[]MediaItem",elem:Zi}),t.set(no,{kind:"struct",name:"MediaBundle",fields:[{name:"BundleVersion",typeId:Wn},{name:"Items",typeId:Gi}]}),t}function io(t){switch(t){case"none":return kt;case"zip":return tr;case"zstd":return nr;case"lz4":return rr;case"br":return ir}}function oo(t,e,n){t.writeBytes(on),t.writeU16LE(1),t.writeU16LE(n),t.writeU32LE(rt),t.writeU32LE(e),t.writeU32LE(0),t.writeU64LE(0n)}function qi(t,e,n,r){let a=io(n),o;if(n==="none")o=r;else{a|=or;let s=Yi(n,r),l=new sn;l.writeU64LE(BigInt(r.byteLength)),l.writeBytes(s),o=l.concat()}t.writeU16LE(e),t.writeU16LE(a),t.writeU64LE(BigInt(o.byteLength)),t.writeU32LE(0),t.writeBytes(o)}async function Wi(t,e,n,r){let a=io(n),o;if(n==="none")o=r;else{a|=or;let s=await ll(n,r),l=new sn;l.writeU64LE(BigInt(r.byteLength)),l.writeBytes(s),o=l.concat()}t.writeU16LE(e),t.writeU16LE(a),t.writeU64LE(BigInt(o.byteLength)),t.writeU32LE(0),t.writeBytes(o)}function kl(t){return(0,rn.createHash)("sha256").update(t).digest()}function ao(t){let e=t.items.map(n=>n.sha256?n:{...n,sha256:kl(n.data)});return{...t,items:e}}function Jn(t,e,n={}){let r=new ro,i=r.encodeMarkdownBundle(t),a=n.autoPopulateSha256!==!1?ao(e):e,o=a.items.length?r.encodeMediaBundle(a):new Uint8Array,s=n.metadata?Ki(JSON.stringify(n.metadata)):new Uint8Array,l=n.metadata?er:0,d=new sn;return oo(d,s.byteLength,l),s.byteLength&&d.writeBytes(s),qi(d,an,n.markdownCompression??"zip",i),o.byteLength===0?(d.writeU16LE(Pe),d.writeU16LE(kt),d.writeU64LE(0n),d.writeU32LE(0)):qi(d,Pe,n.mediaCompression??"zip",o),d.concat()}async function Yn(t,e,n={}){let r=new ro,i=r.encodeMarkdownBundle(t),a=n.autoPopulateSha256!==!1?ao(e):e,o=a.items.length?r.encodeMediaBundle(a):new Uint8Array,s=n.metadata?Ki(JSON.stringify(n.metadata)):new Uint8Array,l=n.metadata?er:0,d=new sn;return oo(d,s.byteLength,l),s.byteLength&&d.writeBytes(s),await Wi(d,an,n.markdownCompression??"zip",i),o.byteLength===0?(d.writeU16LE(Pe),d.writeU16LE(kt),d.writeU64LE(0n),d.writeU32LE(0)):await Wi(d,Pe,n.mediaCompression??"zip",o),d.concat()}function Ml(t,e={}){return t.metadata?Jn(t.markdown,t.media,{...e,metadata:t.metadata}):Jn(t.markdown,t.media,e)}async function El(t,e={}){return t.metadata?Yn(t.markdown,t.media,{...e,metadata:t.metadata}):Yn(t.markdown,t.media,e)}function Xi(t){if(!t||t.startsWith("/"))return!1;let e=t.split("/");return!(e.some(n=>n==="..")||e.some(n=>n.length===0))}function Wt(t){return Buffer.from(t).toString("hex")}function ar(t,e={}){let n=[],r={verifyHashes:!0,checkPaths:!0,checkDuplicates:!0,warnOnMissingOptional:!1,includeInfo:!1,...e},i=(c,u,f,h)=>{if(c==="info"&&!r.includeInfo)return;let p={severity:c,message:u};f!==void 0&&(p.path=f),h!==void 0&&(p.details=h),n.push(p)};t.markdown.bundleVersion!==1&&i("error","markdown.bundleVersion must be 1","markdown.bundleVersion"),t.markdown.files.length||i("error","markdown.files must be non-empty","markdown.files");let a=new Set;t.markdown.files.forEach((c,u)=>{let f=`markdown.files[${u}]`;r.checkPaths&&!Xi(c.path)&&i("error",`Invalid markdown path: "${c.path}"`,`${f}.path`,{path:c.path}),r.checkDuplicates&&(a.has(c.path)&&i("error",`Duplicate markdown path: "${c.path}"`,`${f}.path`),a.add(c.path)),r.warnOnMissingOptional&&(c.mediaRefs?.length||i("info","No media references",`${f}.mediaRefs`))}),t.media.bundleVersion!==1&&i("error","media.bundleVersion must be 1","media.bundleVersion");let o=new Set;t.media.items.forEach((c,u)=>{let f=`media.items[${u}]`;if(c.id||i("error","MediaItem.id must be non-empty",`${f}.id`),r.checkDuplicates&&(o.has(c.id)&&i("error",`Duplicate media ID: "${c.id}"`,`${f}.id`),o.add(c.id)),r.checkPaths&&c.path&&!Xi(c.path)&&i("error",`Invalid media path: "${c.path}"`,`${f}.path`,{path:c.path}),r.verifyHashes&&c.sha256)if(c.sha256.byteLength!==32)i("error",`MediaItem.sha256 must be 32 bytes for id="${c.id}"`,`${f}.sha256`);else{let h=(0,rn.createHash)("sha256").update(c.data).digest();Wt(h)!==Wt(c.sha256)&&i("error",`MediaItem.sha256 mismatch for id="${c.id}"`,`${f}.sha256`,{stored:Wt(c.sha256),computed:Wt(h)})}r.warnOnMissingOptional&&(c.mimeType||i("warning",`Missing MIME type for id="${c.id}"`,`${f}.mimeType`),c.sha256||i("warning",`Missing SHA256 hash for id="${c.id}"`,`${f}.sha256`))});let s={markdownFileCount:t.markdown.files.length,mediaItemCount:t.media.items.length,totalMarkdownBytes:t.markdown.files.reduce((c,u)=>c+u.content.byteLength,0),totalMediaBytes:t.media.items.reduce((c,u)=>c+u.data.byteLength,0)},l=n.filter(c=>c.severity==="error").length,d=n.filter(c=>c.severity==="warning").length;return{valid:l===0,issues:n,errorCount:l,warningCount:d,stats:s}}function Tl(t){return ar(t).issues.filter(n=>n.severity==="error").map(n=>n.message)}function Al(t){return ar(t).valid}function Kt(t){if(t){if(t.startsWith(Qt)){let e=t.slice(Qt.length);return e?{type:"id",id:e}:void 0}if(!t.includes("://"))return{type:"path",path:t}}}function Il(t){return`${Qt}${t}`}function sr(t,e,n){let r=Kt(t);if(!r)return;if(r.type==="id")return e.items.find(a=>a.id===r.id);let i=Jt(r.path,n);return e.items.find(a=>a.path&&Jt(a.path)===i)}function Jt(t,e){if(e&&!t.startsWith("/")){let i=e.includes("/")?e.substring(0,e.lastIndexOf("/")):"";t=i?`${i}/${t}`:t}let n=t.split("/").filter(i=>i&&i!=="."),r=[];for(let i of n)i===".."?r.pop():r.push(i);return r.join("/")}function so(t){let e=typeof t=="string"?t:new TextDecoder().decode(t),n=new Set,r=/!?\[([^\]]*)\]\(([^)]+)\)/g,i;for(;(i=r.exec(e))!==null;){let o=i[2];if(o){let s=o.split(/\s+/)[0];s&&Kt(s)&&n.add(s)}}let a=/<img[^>]+src=["']([^"']+)["']/gi;for(;(i=a.exec(e))!==null;){let o=i[1];o&&Kt(o)&&n.add(o)}return[...n]}function Sl(t,e){let n=so(t.content),r=[];for(let i of n)sr(i,e,t.path)||r.push(i);return r}function Bl(t){return typeof t=="string"?new TextEncoder().encode(t):t}function Dl(t){return(0,rn.createHash)("sha256").update(t).digest()}function _l(t){let e=t.split(".").pop()?.toLowerCase();return e?{png:"image/png",jpg:"image/jpeg",jpeg:"image/jpeg",gif:"image/gif",webp:"image/webp",svg:"image/svg+xml",ico:"image/x-icon",bmp:"image/bmp",mp3:"audio/mpeg",wav:"audio/wav",ogg:"audio/ogg",mp4:"video/mp4",webm:"video/webm",pdf:"application/pdf",json:"application/json",xml:"application/xml",zip:"application/zip",txt:"text/plain",css:"text/css",js:"application/javascript",html:"text/html",md:"text/markdown",markdown:"text/markdown"}[e]??"application/octet-stream":"application/octet-stream"}function zl(t){return t.replace(/[^a-zA-Z0-9_-]/g,"_").replace(/_+/g,"_").replace(/^_|_$/g,"")}function Ul(t,e,n){let r=new lr().addMarkdown(t,e).root(t);return n&&r.setMetadata(n),r.build()}function Ll(){return new lr}var Yt,en,tn,nn,rn,Qi,on,rt,er,an,Pe,Si,kt,tr,nr,rr,ir,or,nl,sn,ol,Xt,cl,dl,Qn,Kn,eo,gl,Wn,Pi,Re,to,Oi,Ni,Hi,Xn,no,Zi,Gi,ji,ro,Qt,Cl,lo,co,lr,ne=fn(()=>{Yt=require("zlib");Gr();Wr();en=Oe(pi(),1),tn=Oe(Ci(),1),nn=require("util"),rn=require("crypto"),Qi={maxMetadataLength:1024*1024,maxSectionPayloadLen:1024*1024*1024,maxMarkdownUncompressed:256*1024*1024,maxMediaUncompressed:2*1024*1024*1024},on=Uint8Array.from([77,68,79,67,88,13,10,26]),rt=32,er=1,an=1,Pe=2,Si=16,kt=0,tr=1,nr=2,rr=3,ir=4,or=16,nl=class{view;buf;offset=0;constructor(t){this.buf=t,this.view=new DataView(t.buffer,t.byteOffset,t.byteLength)}remaining(){return this.buf.byteLength-this.offset}readBytes(t){if(t<0)throw new Error("readBytes: negative length");if(this.offset+t>this.buf.byteLength)throw new Error(`Unexpected EOF (need ${t}, have ${this.remaining()})`);let e=this.buf.subarray(this.offset,this.offset+t);return this.offset+=t,e}readU16LE(){let t=this.view.getUint16(this.offset,!0);return this.offset+=2,t}readU32LE(){let t=this.view.getUint32(this.offset,!0);return this.offset+=4,t}readU64LE(){let t=this.view.getBigUint64(this.offset,!0);return this.offset+=8,t}},sn=class{chunks=[];writeBytes(t){this.chunks.push(t)}writeU16LE(t){let e=new Uint8Array(2);new DataView(e.buffer).setUint16(0,t,!0),this.chunks.push(e)}writeU32LE(t){let e=new Uint8Array(4);new DataView(e.buffer).setUint32(0,t,!0),this.chunks.push(e)}writeU64LE(t){let e=new Uint8Array(8);new DataView(e.buffer).setBigUint64(0,t,!0),this.chunks.push(e)}concat(){let t=this.chunks.reduce((r,i)=>r+i.byteLength,0),e=new Uint8Array(t),n=0;for(let r of this.chunks)e.set(r,n),n+=r.byteLength;return e}};ol=3,Xt=!1;cl=new nn.TextDecoder,dl=new nn.TextEncoder,Qn=class{constructor(t){this.bytes=t}off=0;remaining(){return this.bytes.byteLength-this.off}readByte(){if(this.off>=this.bytes.byteLength)throw new Error("Unexpected EOF");return this.bytes[this.off++]}readBytes(t){if(t<0)throw new Error("Invalid length");if(this.off+t>this.bytes.byteLength)throw new Error("Unexpected EOF");let e=this.bytes.subarray(this.off,this.off+t);return this.off+=t,e}readGobUint(){let t=this.readByte();if(t<=127)return BigInt(t);let e=256-t,n=0n;for(let r=0;r<e;r++)n=n<<8n|BigInt(this.readByte());return n}readGobInt(){let t=this.readGobUint();return(t&1n)===0n?t>>1n:~(t>>1n)}readGobString(){let t=this.readGobUint(),e=ce(t,"string length"),n=this.readBytes(e);return cl.decode(n)}readGobBytes(){let t=this.readGobUint(),e=ce(t,"bytes length");return this.readBytes(e)}},Kn=class{chunks=[];writeByte(t){let e=new Uint8Array(1);e[0]=t&255,this.chunks.push(e)}writeBytes(t){this.chunks.push(t)}writeGobUint(t){if(t<0n)throw new Error("uint must be non-negative");if(t<=0x7fn){this.writeByte(Number(t));return}let e=[],n=t;for(;n>0n;)e.push(Number(n&0xffn)),n>>=8n;if(e.reverse(),e.length>255)throw new Error("uint too large");this.writeByte(256-e.length),this.writeBytes(Uint8Array.from(e))}writeGobInt(t){if(t<0n){let e=~t<<1n|1n;this.writeGobUint(e)}else{let e=t<<1n;this.writeGobUint(e)}}writeGobString(t){let e=dl.encode(t);this.writeGobUint(BigInt(e.byteLength)),this.writeBytes(e)}writeGobBytes(t){this.writeGobUint(BigInt(t.byteLength)),this.writeBytes(t)}concat(){let t=this.chunks.reduce((r,i)=>r+i.byteLength,0),e=new Uint8Array(t),n=0;for(let r of this.chunks)e.set(r,n),n+=r.byteLength;return e}};eo=class{types=new Map;constructor(t){t&&(this.types.set(1,{kind:"bool"}),this.types.set(2,{kind:"int"}),this.types.set(3,{kind:"uint"}),this.types.set(4,{kind:"float"}),this.types.set(5,{kind:"bytes"}),this.types.set(6,{kind:"string"}),this.types.set(7,{kind:"complex"}),this.types.set(8,{kind:"interface"}),this.types.set(18,{kind:"struct",name:"CommonType",fields:[{name:"Name",typeId:6},{name:"Id",typeId:2}]}),this.types.set(17,{kind:"struct",name:"arrayType",fields:[{name:"CommonType",typeId:18},{name:"Elem",typeId:2},{name:"Len",typeId:2}]}),this.types.set(19,{kind:"struct",name:"sliceType",fields:[{name:"CommonType",typeId:18},{name:"Elem",typeId:2}]}),this.types.set(21,{kind:"struct",name:"fieldType",fields:[{name:"Name",typeId:6},{name:"Id",typeId:2}]}),this.types.set(22,{kind:"slice",name:"[]fieldType",elem:21}),this.types.set(20,{kind:"struct",name:"structType",fields:[{name:"CommonType",typeId:18},{name:"Field",typeId:22}]}),this.types.set(23,{kind:"struct",name:"mapType",fields:[{name:"CommonType",typeId:18},{name:"Key",typeId:2},{name:"Elem",typeId:2}]}),this.types.set(16,{kind:"struct",name:"wireType",fields:[{name:"ArrayT",typeId:17},{name:"SliceT",typeId:19},{name:"StructT",typeId:20},{name:"MapT",typeId:23}]}))}get(t){let e=this.types.get(t);if(!e)throw new Error(`Unknown gob type id: ${t}`);return e}has(t){return this.types.has(t)}set(t,e){this.types.set(t,e)}};gl=class{decodeMarkdownBundle(t){let n=Di(t).value;if(!n||typeof n!="object"||Array.isArray(n))throw new Error("MarkdownBundle gob must decode to an object");let r=n,i=Ui(r.BundleVersion,"BundleVersion"),a=qn(r.RootPath),o=r.Files;if(!Array.isArray(o))throw new Error("Files must be an array");let s=o.map((l,d)=>{if(!l||typeof l!="object"||Array.isArray(l))throw new Error(`Files[${d}] must be an object`);let c=l,u=zi(c.Path,"Path"),f=c.Content===void 0?new Uint8Array:Li(c.Content,"Content"),h=vl(c.MediaRefs),p=Fi(c.Attributes);return{path:u,content:f,...h?{mediaRefs:h}:{},...p?{attributes:p}:{}}});return{bundleVersion:i,...a?{rootPath:a}:{},files:s}}decodeMediaBundle(t){let n=Di(t).value;if(!n||typeof n!="object"||Array.isArray(n))throw new Error("MediaBundle gob must decode to an object");let r=n,i=Ui(r.BundleVersion,"BundleVersion"),a=r.Items;if(a===void 0)return{bundleVersion:i,items:[]};if(!Array.isArray(a))throw new Error("Items must be an array");let o=a.map((s,l)=>{if(!s||typeof s!="object"||Array.isArray(s))throw new Error(`Items[${l}] must be an object`);let d=s,c=zi(d.ID,"ID"),u=qn(d.Path),f=qn(d.MimeType??d.MIMEType),h=d.Data===void 0?new Uint8Array:Li(d.Data,"Data"),p=d.SHA256,m=p instanceof Uint8Array?ml(p):void 0,v=Fi(d.Attributes);return{id:c,...u?{path:u}:{},...f?{mimeType:f}:{},data:h,...m?{sha256:m}:{},...v?{attributes:v}:{}}});return{bundleVersion:i,items:o}}};Wn=3,Pi=5,Re=6,to=65,Oi=66,Ni=67,Hi=68,Xn=69,no=70,Zi=71,Gi=72,ji=73;ro=class{encodeMarkdownBundle(t){let e=Vi(),n={BundleVersion:t.bundleVersion,RootPath:t.rootPath??"",Files:t.files.map(r=>({Path:r.path,Content:r.content,MediaRefs:r.mediaRefs??[],...r.attributes?{Attributes:r.attributes}:{}}))};return _i(to,e,n)}encodeMediaBundle(t){let e=Vi(),n={BundleVersion:t.bundleVersion,Items:t.items.map(r=>({ID:r.id,Path:r.path??"",MimeType:r.mimeType??"",Data:r.data,SHA256:r.sha256??new Uint8Array(32),...r.attributes?{Attributes:r.attributes}:{}}))};return _i(no,e,n)}};Qt="mdocx://media/";Cl=class{constructor(t){this.doc=t}resolve(t,e){return sr(t,this.doc.media,e?.path)}getById(t){return this.doc.media.items.find(e=>e.id===t)}getByPath(t){let e=Jt(t);return this.doc.media.items.find(n=>n.path&&Jt(n.path)===e)}getReferencedMedia(t){if(!t.mediaRefs)return[];let e=[];for(let n of t.mediaRefs){let r=this.getById(n);r&&e.push(r)}return e}getAllMedia(){return[...this.doc.media.items]}hasId(t){return this.doc.media.items.some(e=>e.id===t)}getMimeType(t){return t.mimeType??"application/octet-stream"}};lo=class{files=[];rootPath;root(t){return this.rootPath=t,this}addFile(t,e,n={}){return this.files.push({path:t,content:Bl(e),...n.mediaRefs?.length?{mediaRefs:n.mediaRefs}:{},...n.attributes&&Object.keys(n.attributes).length?{attributes:n.attributes}:{}}),this}addFiles(t){for(let e of t)this.addFile(e.path,e.content,e);return this}build(){if(this.files.length===0)throw new Error("MarkdownBundle must contain at least one file");return{bundleVersion:1,...this.rootPath?{rootPath:this.rootPath}:{},files:this.files}}},co=class{items=[];usedIds=new Set;addItem(t,e,n={}){if(this.usedIds.has(t))throw new Error(`Duplicate media ID: ${t}`);this.usedIds.add(t);let r={id:t,data:e,...n.path?{path:n.path}:{},mimeType:n.mimeType??(n.path?_l(n.path):"application/octet-stream"),...n.computeSha256!==!1?{sha256:Dl(e)}:{},...n.attributes&&Object.keys(n.attributes).length?{attributes:n.attributes}:{}};return this.items.push(r),this}addFromPath(t,e,n={}){let r=zl(t);return this.addItem(r,e,{...n,path:t})}addItems(t){for(let e of t)this.addItem(e.id,e.data,e);return this}build(){return{bundleVersion:1,items:this.items}}static empty(){return{bundleVersion:1,items:[]}}},lr=class{markdownBuilder=new lo;mediaBuilder=new co;metadata;setMetadata(t){return this.metadata=t,this}addMetadata(t){return this.metadata={...this.metadata??{},...t},this}title(t){return this.addMetadata({title:t})}description(t){return this.addMetadata({description:t})}root(t){return this.markdownBuilder.root(t),this.addMetadata({root:t}),this}addMarkdown(t,e,n={}){return this.markdownBuilder.addFile(t,e,n),this}addMedia(t,e,n={}){return this.mediaBuilder.addItem(t,e,n),this}addMediaFromPath(t,e,n={}){return this.mediaBuilder.addFromPath(t,e,n),this}markdown(){return this.markdownBuilder}media(){return this.mediaBuilder}build(){let e={header:{magic:on,version:1,headerFlags:this.metadata?1:0,fixedHeaderSize:rt,metadataLength:0,reserved0:0,reserved1:0n},markdown:this.markdownBuilder.build(),media:this.mediaBuilder.build()};return this.metadata&&(e.metadata=this.metadata),e}}});var Ol={};dr(Ol,{activate:()=>$l,deactivate:()=>Pl});module.exports=go(Ol);var X=Oe(require("vscode"));var M=Oe(require("vscode")),cr=require("buffer"),ve=Oe(require("path")),ln=require("util");function mn(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var He=mn();function vr(t){He=t}var wr=/[&<>"']/,vo=new RegExp(wr.source,"g"),yr=/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,wo=new RegExp(yr.source,"g"),yo={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},fr=t=>yo[t];function se(t,e){if(e){if(wr.test(t))return t.replace(vo,fr)}else if(yr.test(t))return t.replace(wo,fr);return t}var bo=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;function xo(t){return t.replace(bo,(e,n)=>(n=n.toLowerCase(),n==="colon"?":":n.charAt(0)==="#"?n.charAt(1)==="x"?String.fromCharCode(parseInt(n.substring(2),16)):String.fromCharCode(+n.substring(1)):""))}var ko=/(^|[^\[])\^/g;function F(t,e){let n=typeof t=="string"?t:t.source;e=e||"";let r={replace:(i,a)=>{let o=typeof a=="string"?a:a.source;return o=o.replace(ko,"$1"),n=n.replace(i,o),r},getRegex:()=>new RegExp(n,e)};return r}function hr(t){try{t=encodeURI(t).replace(/%25/g,"%")}catch{return null}return t}var ot={exec:()=>null};function pr(t,e){let n=t.replace(/\|/g,(a,o,s)=>{let l=!1,d=o;for(;--d>=0&&s[d]==="\\";)l=!l;return l?"|":" |"}),r=n.split(/ \|/),i=0;if(r[0].trim()||r.shift(),r.length>0&&!r[r.length-1].trim()&&r.pop(),e)if(r.length>e)r.splice(e);else for(;r.length<e;)r.push("");for(;i<r.length;i++)r[i]=r[i].trim().replace(/\\\|/g,"|");return r}function Et(t,e,n){let r=t.length;if(r===0)return"";let i=0;for(;i<r;){let a=t.charAt(r-i-1);if(a===e&&!n)i++;else if(a!==e&&n)i++;else break}return t.slice(0,r-i)}function Mo(t,e){if(t.indexOf(e[1])===-1)return-1;let n=0;for(let r=0;r<t.length;r++)if(t[r]==="\\")r++;else if(t[r]===e[0])n++;else if(t[r]===e[1]&&(n--,n<0))return r;return-1}function mr(t,e,n,r){let i=e.href,a=e.title?se(e.title):null,o=t[1].replace(/\\([\[\]])/g,"$1");if(t[0].charAt(0)!=="!"){r.state.inLink=!0;let s={type:"link",raw:n,href:i,title:a,text:o,tokens:r.inlineTokens(o)};return r.state.inLink=!1,s}return{type:"image",raw:n,href:i,title:a,text:se(o)}}function Eo(t,e){let n=t.match(/^(\s+)(?:```)/);if(n===null)return e;let r=n[1];return e.split(`
`).map(i=>{let a=i.match(/^\s+/);if(a===null)return i;let[o]=a;return o.length>=r.length?i.slice(r.length):i}).join(`
`)}var Qe=class{options;rules;lexer;constructor(e){this.options=e||He}space(e){let n=this.rules.block.newline.exec(e);if(n&&n[0].length>0)return{type:"space",raw:n[0]}}code(e){let n=this.rules.block.code.exec(e);if(n){let r=n[0].replace(/^ {1,4}/gm,"");return{type:"code",raw:n[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Et(r,`
`)}}}fences(e){let n=this.rules.block.fences.exec(e);if(n){let r=n[0],i=Eo(r,n[3]||"");return{type:"code",raw:r,lang:n[2]?n[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):n[2],text:i}}}heading(e){let n=this.rules.block.heading.exec(e);if(n){let r=n[2].trim();if(/#$/.test(r)){let i=Et(r,"#");(this.options.pedantic||!i||/ $/.test(i))&&(r=i.trim())}return{type:"heading",raw:n[0],depth:n[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let n=this.rules.block.hr.exec(e);if(n)return{type:"hr",raw:n[0]}}blockquote(e){let n=this.rules.block.blockquote.exec(e);if(n){let r=n[0].replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,`
    $1`);r=Et(r.replace(/^ *>[ \t]?/gm,""),`
`);let i=this.lexer.state.top;this.lexer.state.top=!0;let a=this.lexer.blockTokens(r);return this.lexer.state.top=i,{type:"blockquote",raw:n[0],tokens:a,text:r}}}list(e){let n=this.rules.block.list.exec(e);if(n){let r=n[1].trim(),i=r.length>1,a={type:"list",raw:"",ordered:i,start:i?+r.slice(0,-1):"",loose:!1,items:[]};r=i?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=i?r:"[*+-]");let o=new RegExp(`^( {0,3}${r})((?:[	 ][^\\n]*)?(?:\\n|$))`),s="",l="",d=!1;for(;e;){let c=!1;if(!(n=o.exec(e))||this.rules.block.hr.test(e))break;s=n[0],e=e.substring(s.length);let u=n[2].split(`
`,1)[0].replace(/^\t+/,T=>" ".repeat(3*T.length)),f=e.split(`
`,1)[0],h=0;this.options.pedantic?(h=2,l=u.trimStart()):(h=n[2].search(/[^ ]/),h=h>4?1:h,l=u.slice(h),h+=n[1].length);let p=!1;if(!u&&/^ *$/.test(f)&&(s+=f+`
`,e=e.substring(f.length+1),c=!0),!c){let T=new RegExp(`^ {0,${Math.min(3,h-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),w=new RegExp(`^ {0,${Math.min(3,h-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),b=new RegExp(`^ {0,${Math.min(3,h-1)}}(?:\`\`\`|~~~)`),S=new RegExp(`^ {0,${Math.min(3,h-1)}}#`);for(;e;){let A=e.split(`
`,1)[0];if(f=A,this.options.pedantic&&(f=f.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  ")),b.test(f)||S.test(f)||T.test(f)||w.test(e))break;if(f.search(/[^ ]/)>=h||!f.trim())l+=`
`+f.slice(h);else{if(p||u.search(/[^ ]/)>=4||b.test(u)||S.test(u)||w.test(u))break;l+=`
`+f}!p&&!f.trim()&&(p=!0),s+=A+`
`,e=e.substring(A.length+1),u=f.slice(h)}}a.loose||(d?a.loose=!0:/\n *\n *$/.test(s)&&(d=!0));let m=null,v;this.options.gfm&&(m=/^\[[ xX]\] /.exec(l),m&&(v=m[0]!=="[ ] ",l=l.replace(/^\[[ xX]\] +/,""))),a.items.push({type:"list_item",raw:s,task:!!m,checked:v,loose:!1,text:l,tokens:[]}),a.raw+=s}a.items[a.items.length-1].raw=s.trimEnd(),a.items[a.items.length-1].text=l.trimEnd(),a.raw=a.raw.trimEnd();for(let c=0;c<a.items.length;c++)if(this.lexer.state.top=!1,a.items[c].tokens=this.lexer.blockTokens(a.items[c].text,[]),!a.loose){let u=a.items[c].tokens.filter(h=>h.type==="space"),f=u.length>0&&u.some(h=>/\n.*\n/.test(h.raw));a.loose=f}if(a.loose)for(let c=0;c<a.items.length;c++)a.items[c].loose=!0;return a}}html(e){let n=this.rules.block.html.exec(e);if(n)return{type:"html",block:!0,raw:n[0],pre:n[1]==="pre"||n[1]==="script"||n[1]==="style",text:n[0]}}def(e){let n=this.rules.block.def.exec(e);if(n){let r=n[1].toLowerCase().replace(/\s+/g," "),i=n[2]?n[2].replace(/^<(.*)>$/,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",a=n[3]?n[3].substring(1,n[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):n[3];return{type:"def",tag:r,raw:n[0],href:i,title:a}}}table(e){let n=this.rules.block.table.exec(e);if(!n||!/[:|]/.test(n[2]))return;let r=pr(n[1]),i=n[2].replace(/^\||\| *$/g,"").split("|"),a=n[3]&&n[3].trim()?n[3].replace(/\n[ \t]*$/,"").split(`
`):[],o={type:"table",raw:n[0],header:[],align:[],rows:[]};if(r.length===i.length){for(let s of i)/^ *-+: *$/.test(s)?o.align.push("right"):/^ *:-+: *$/.test(s)?o.align.push("center"):/^ *:-+ *$/.test(s)?o.align.push("left"):o.align.push(null);for(let s of r)o.header.push({text:s,tokens:this.lexer.inline(s)});for(let s of a)o.rows.push(pr(s,o.header.length).map(l=>({text:l,tokens:this.lexer.inline(l)})));return o}}lheading(e){let n=this.rules.block.lheading.exec(e);if(n)return{type:"heading",raw:n[0],depth:n[2].charAt(0)==="="?1:2,text:n[1],tokens:this.lexer.inline(n[1])}}paragraph(e){let n=this.rules.block.paragraph.exec(e);if(n){let r=n[1].charAt(n[1].length-1)===`
`?n[1].slice(0,-1):n[1];return{type:"paragraph",raw:n[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let n=this.rules.block.text.exec(e);if(n)return{type:"text",raw:n[0],text:n[0],tokens:this.lexer.inline(n[0])}}escape(e){let n=this.rules.inline.escape.exec(e);if(n)return{type:"escape",raw:n[0],text:se(n[1])}}tag(e){let n=this.rules.inline.tag.exec(e);if(n)return!this.lexer.state.inLink&&/^<a /i.test(n[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(n[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(n[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(n[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:n[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:n[0]}}link(e){let n=this.rules.inline.link.exec(e);if(n){let r=n[2].trim();if(!this.options.pedantic&&/^</.test(r)){if(!/>$/.test(r))return;let o=Et(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Mo(n[2],"()");if(o>-1){let l=(n[0].indexOf("!")===0?5:4)+n[1].length+o;n[2]=n[2].substring(0,o),n[0]=n[0].substring(0,l).trim(),n[3]=""}}let i=n[2],a="";if(this.options.pedantic){let o=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(i);o&&(i=o[1],a=o[3])}else a=n[3]?n[3].slice(1,-1):"";return i=i.trim(),/^</.test(i)&&(this.options.pedantic&&!/>$/.test(r)?i=i.slice(1):i=i.slice(1,-1)),mr(n,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:a&&a.replace(this.rules.inline.anyPunctuation,"$1")},n[0],this.lexer)}}reflink(e,n){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let i=(r[2]||r[1]).replace(/\s+/g," "),a=n[i.toLowerCase()];if(!a){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return mr(r,a,r[0],this.lexer)}}emStrong(e,n,r=""){let i=this.rules.inline.emStrongLDelim.exec(e);if(!i||i[3]&&r.match(/[\p{L}\p{N}]/u))return;if(!(i[1]||i[2]||"")||!r||this.rules.inline.punctuation.exec(r)){let o=[...i[0]].length-1,s,l,d=o,c=0,u=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,n=n.slice(-1*e.length+o);(i=u.exec(n))!=null;){if(s=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!s)continue;if(l=[...s].length,i[3]||i[4]){d+=l;continue}else if((i[5]||i[6])&&o%3&&!((o+l)%3)){c+=l;continue}if(d-=l,d>0)continue;l=Math.min(l,l+d+c);let f=[...i[0]][0].length,h=e.slice(0,o+i.index+f+l);if(Math.min(o,l)%2){let m=h.slice(1,-1);return{type:"em",raw:h,text:m,tokens:this.lexer.inlineTokens(m)}}let p=h.slice(2,-2);return{type:"strong",raw:h,text:p,tokens:this.lexer.inlineTokens(p)}}}}codespan(e){let n=this.rules.inline.code.exec(e);if(n){let r=n[2].replace(/\n/g," "),i=/[^ ]/.test(r),a=/^ /.test(r)&&/ $/.test(r);return i&&a&&(r=r.substring(1,r.length-1)),r=se(r,!0),{type:"codespan",raw:n[0],text:r}}}br(e){let n=this.rules.inline.br.exec(e);if(n)return{type:"br",raw:n[0]}}del(e){let n=this.rules.inline.del.exec(e);if(n)return{type:"del",raw:n[0],text:n[2],tokens:this.lexer.inlineTokens(n[2])}}autolink(e){let n=this.rules.inline.autolink.exec(e);if(n){let r,i;return n[2]==="@"?(r=se(n[1]),i="mailto:"+r):(r=se(n[1]),i=r),{type:"link",raw:n[0],text:r,href:i,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let n;if(n=this.rules.inline.url.exec(e)){let r,i;if(n[2]==="@")r=se(n[0]),i="mailto:"+r;else{let a;do a=n[0],n[0]=this.rules.inline._backpedal.exec(n[0])?.[0]??"";while(a!==n[0]);r=se(n[0]),n[1]==="www."?i="http://"+n[0]:i=n[0]}return{type:"link",raw:n[0],text:r,href:i,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let n=this.rules.inline.text.exec(e);if(n){let r;return this.lexer.state.inRawBlock?r=n[0]:r=se(n[0]),{type:"text",raw:n[0],text:r}}}},To=/^(?: *(?:\n|$))+/,Ao=/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,Io=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,st=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Co=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,br=/(?:[*+-]|\d{1,9}[.)])/,xr=F(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g,br).replace(/blockCode/g,/ {4}/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).getRegex(),gn=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,So=/^[^\n]+/,vn=/(?!\s*\])(?:\\.|[^\[\]\\])+/,Bo=F(/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/).replace("label",vn).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Do=F(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,br).getRegex(),It="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",wn=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,_o=F("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))","i").replace("comment",wn).replace("tag",It).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),kr=F(gn).replace("hr",st).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",It).getRegex(),zo=F(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",kr).getRegex(),yn={blockquote:zo,code:Ao,def:Bo,fences:Io,heading:Co,hr:st,html:_o,lheading:xr,list:Do,newline:To,paragraph:kr,table:ot,text:So},gr=F("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",st).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",It).getRegex(),Uo={...yn,table:gr,paragraph:F(gn).replace("hr",st).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",gr).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",It).getRegex()},Lo={...yn,html:F(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",wn).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:ot,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:F(gn).replace("hr",st).replace("heading",` *#{1,6} *[^
]`).replace("lheading",xr).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Mr=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Fo=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Er=/^( {2,}|\\)\n(?!\s*$)/,$o=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,lt="\\p{P}\\p{S}",Ro=F(/^((?![*_])[\spunctuation])/,"u").replace(/punctuation/g,lt).getRegex(),Po=/\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g,Oo=F(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,"u").replace(/punct/g,lt).getRegex(),No=F("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])","gu").replace(/punct/g,lt).getRegex(),Ho=F("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])","gu").replace(/punct/g,lt).getRegex(),Zo=F(/\\([punct])/,"gu").replace(/punct/g,lt).getRegex(),Go=F(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),jo=F(wn).replace("(?:-->|$)","-->").getRegex(),Vo=F("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",jo).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),At=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,qo=F(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label",At).replace("href",/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Tr=F(/^!?\[(label)\]\[(ref)\]/).replace("label",At).replace("ref",vn).getRegex(),Ar=F(/^!?\[(ref)\](?:\[\])?/).replace("ref",vn).getRegex(),Wo=F("reflink|nolink(?!\\()","g").replace("reflink",Tr).replace("nolink",Ar).getRegex(),bn={_backpedal:ot,anyPunctuation:Zo,autolink:Go,blockSkip:Po,br:Er,code:Fo,del:ot,emStrongLDelim:Oo,emStrongRDelimAst:No,emStrongRDelimUnd:Ho,escape:Mr,link:qo,nolink:Ar,punctuation:Ro,reflink:Tr,reflinkSearch:Wo,tag:Vo,text:$o,url:ot},Xo={...bn,link:F(/^!?\[(label)\]\((.*?)\)/).replace("label",At).getRegex(),reflink:F(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",At).getRegex()},hn={...bn,escape:F(Mr).replace("])","~|])").getRegex(),url:F(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},Qo={...hn,br:F(Er).replace("{2,}","*").getRegex(),text:F(hn.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Tt={normal:yn,gfm:Uo,pedantic:Lo},it={normal:bn,gfm:hn,breaks:Qo,pedantic:Xo},Te=class t{tokens;options;state;tokenizer;inlineQueue;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||He,this.options.tokenizer=this.options.tokenizer||new Qe,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={block:Tt.normal,inline:it.normal};this.options.pedantic?(n.block=Tt.pedantic,n.inline=it.pedantic):this.options.gfm&&(n.block=Tt.gfm,this.options.breaks?n.inline=it.breaks:n.inline=it.gfm),this.tokenizer.rules=n}static get rules(){return{block:Tt,inline:it}}static lex(e,n){return new t(n).lex(e)}static lexInline(e,n){return new t(n).inlineTokens(e)}lex(e){e=e.replace(/\r\n|\r/g,`
`),this.blockTokens(e,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,n=[]){this.options.pedantic?e=e.replace(/\t/g,"    ").replace(/^ +$/gm,""):e=e.replace(/^( *)(\t+)/gm,(s,l,d)=>l+"    ".repeat(d.length));let r,i,a,o;for(;e;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some(s=>(r=s.call({lexer:this},e,n))?(e=e.substring(r.raw.length),n.push(r),!0):!1))){if(r=this.tokenizer.space(e)){e=e.substring(r.raw.length),r.raw.length===1&&n.length>0?n[n.length-1].raw+=`
`:n.push(r);continue}if(r=this.tokenizer.code(e)){e=e.substring(r.raw.length),i=n[n.length-1],i&&(i.type==="paragraph"||i.type==="text")?(i.raw+=`
`+r.raw,i.text+=`
`+r.text,this.inlineQueue[this.inlineQueue.length-1].src=i.text):n.push(r);continue}if(r=this.tokenizer.fences(e)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.heading(e)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.hr(e)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.blockquote(e)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.list(e)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.html(e)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.def(e)){e=e.substring(r.raw.length),i=n[n.length-1],i&&(i.type==="paragraph"||i.type==="text")?(i.raw+=`
`+r.raw,i.text+=`
`+r.raw,this.inlineQueue[this.inlineQueue.length-1].src=i.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});continue}if(r=this.tokenizer.table(e)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.lheading(e)){e=e.substring(r.raw.length),n.push(r);continue}if(a=e,this.options.extensions&&this.options.extensions.startBlock){let s=1/0,l=e.slice(1),d;this.options.extensions.startBlock.forEach(c=>{d=c.call({lexer:this},l),typeof d=="number"&&d>=0&&(s=Math.min(s,d))}),s<1/0&&s>=0&&(a=e.substring(0,s+1))}if(this.state.top&&(r=this.tokenizer.paragraph(a))){i=n[n.length-1],o&&i.type==="paragraph"?(i.raw+=`
`+r.raw,i.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=i.text):n.push(r),o=a.length!==e.length,e=e.substring(r.raw.length);continue}if(r=this.tokenizer.text(e)){e=e.substring(r.raw.length),i=n[n.length-1],i&&i.type==="text"?(i.raw+=`
`+r.raw,i.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=i.text):n.push(r);continue}if(e){let s="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(s);break}else throw new Error(s)}}return this.state.top=!0,n}inline(e,n=[]){return this.inlineQueue.push({src:e,tokens:n}),n}inlineTokens(e,n=[]){let r,i,a,o=e,s,l,d;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(o))!=null;)c.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(o=o.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+o.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.blockSkip.exec(o))!=null;)o=o.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+o.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(o))!=null;)o=o.slice(0,s.index)+"++"+o.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;e;)if(l||(d=""),l=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some(c=>(r=c.call({lexer:this},e,n))?(e=e.substring(r.raw.length),n.push(r),!0):!1))){if(r=this.tokenizer.escape(e)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.tag(e)){e=e.substring(r.raw.length),i=n[n.length-1],i&&r.type==="text"&&i.type==="text"?(i.raw+=r.raw,i.text+=r.text):n.push(r);continue}if(r=this.tokenizer.link(e)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(r.raw.length),i=n[n.length-1],i&&r.type==="text"&&i.type==="text"?(i.raw+=r.raw,i.text+=r.text):n.push(r);continue}if(r=this.tokenizer.emStrong(e,o,d)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.codespan(e)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.br(e)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.del(e)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.autolink(e)){e=e.substring(r.raw.length),n.push(r);continue}if(!this.state.inLink&&(r=this.tokenizer.url(e))){e=e.substring(r.raw.length),n.push(r);continue}if(a=e,this.options.extensions&&this.options.extensions.startInline){let c=1/0,u=e.slice(1),f;this.options.extensions.startInline.forEach(h=>{f=h.call({lexer:this},u),typeof f=="number"&&f>=0&&(c=Math.min(c,f))}),c<1/0&&c>=0&&(a=e.substring(0,c+1))}if(r=this.tokenizer.inlineText(a)){e=e.substring(r.raw.length),r.raw.slice(-1)!=="_"&&(d=r.raw.slice(-1)),l=!0,i=n[n.length-1],i&&i.type==="text"?(i.raw+=r.raw,i.text+=r.text):n.push(r);continue}if(e){let c="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(c);break}else throw new Error(c)}}return n}},Ke=class{options;constructor(e){this.options=e||He}code(e,n,r){let i=(n||"").match(/^\S*/)?.[0];return e=e.replace(/\n$/,"")+`
`,i?'<pre><code class="language-'+se(i)+'">'+(r?e:se(e,!0))+`</code></pre>
`:"<pre><code>"+(r?e:se(e,!0))+`</code></pre>
`}blockquote(e){return`<blockquote>
${e}</blockquote>
`}html(e,n){return e}heading(e,n,r){return`<h${n}>${e}</h${n}>
`}hr(){return`<hr>
`}list(e,n,r){let i=n?"ol":"ul",a=n&&r!==1?' start="'+r+'"':"";return"<"+i+a+`>
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
`}strong(e){return`<strong>${e}</strong>`}em(e){return`<em>${e}</em>`}codespan(e){return`<code>${e}</code>`}br(){return"<br>"}del(e){return`<del>${e}</del>`}link(e,n,r){let i=hr(e);if(i===null)return r;e=i;let a='<a href="'+e+'"';return n&&(a+=' title="'+n+'"'),a+=">"+r+"</a>",a}image(e,n,r){let i=hr(e);if(i===null)return r;e=i;let a=`<img src="${e}" alt="${r}"`;return n&&(a+=` title="${n}"`),a+=">",a}text(e){return e}},at=class{strong(e){return e}em(e){return e}codespan(e){return e}del(e){return e}html(e){return e}text(e){return e}link(e,n,r){return""+r}image(e,n,r){return""+r}br(){return""}},Ae=class t{options;renderer;textRenderer;constructor(e){this.options=e||He,this.options.renderer=this.options.renderer||new Ke,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new at}static parse(e,n){return new t(n).parse(e)}static parseInline(e,n){return new t(n).parseInline(e)}parse(e,n=!0){let r="";for(let i=0;i<e.length;i++){let a=e[i];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[a.type]){let o=a,s=this.options.extensions.renderers[o.type].call({parser:this},o);if(s!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(o.type)){r+=s||"";continue}}switch(a.type){case"space":continue;case"hr":{r+=this.renderer.hr();continue}case"heading":{let o=a;r+=this.renderer.heading(this.parseInline(o.tokens),o.depth,xo(this.parseInline(o.tokens,this.textRenderer)));continue}case"code":{let o=a;r+=this.renderer.code(o.text,o.lang,!!o.escaped);continue}case"table":{let o=a,s="",l="";for(let c=0;c<o.header.length;c++)l+=this.renderer.tablecell(this.parseInline(o.header[c].tokens),{header:!0,align:o.align[c]});s+=this.renderer.tablerow(l);let d="";for(let c=0;c<o.rows.length;c++){let u=o.rows[c];l="";for(let f=0;f<u.length;f++)l+=this.renderer.tablecell(this.parseInline(u[f].tokens),{header:!1,align:o.align[f]});d+=this.renderer.tablerow(l)}r+=this.renderer.table(s,d);continue}case"blockquote":{let o=a,s=this.parse(o.tokens);r+=this.renderer.blockquote(s);continue}case"list":{let o=a,s=o.ordered,l=o.start,d=o.loose,c="";for(let u=0;u<o.items.length;u++){let f=o.items[u],h=f.checked,p=f.task,m="";if(f.task){let v=this.renderer.checkbox(!!h);d?f.tokens.length>0&&f.tokens[0].type==="paragraph"?(f.tokens[0].text=v+" "+f.tokens[0].text,f.tokens[0].tokens&&f.tokens[0].tokens.length>0&&f.tokens[0].tokens[0].type==="text"&&(f.tokens[0].tokens[0].text=v+" "+f.tokens[0].tokens[0].text)):f.tokens.unshift({type:"text",text:v+" "}):m+=v+" "}m+=this.parse(f.tokens,d),c+=this.renderer.listitem(m,p,!!h)}r+=this.renderer.list(c,s,l);continue}case"html":{let o=a;r+=this.renderer.html(o.text,o.block);continue}case"paragraph":{let o=a;r+=this.renderer.paragraph(this.parseInline(o.tokens));continue}case"text":{let o=a,s=o.tokens?this.parseInline(o.tokens):o.text;for(;i+1<e.length&&e[i+1].type==="text";)o=e[++i],s+=`
`+(o.tokens?this.parseInline(o.tokens):o.text);r+=n?this.renderer.paragraph(s):s;continue}default:{let o='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(o),"";throw new Error(o)}}}return r}parseInline(e,n){n=n||this.renderer;let r="";for(let i=0;i<e.length;i++){let a=e[i];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[a.type]){let o=this.options.extensions.renderers[a.type].call({parser:this},a);if(o!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(a.type)){r+=o||"";continue}}switch(a.type){case"escape":{let o=a;r+=n.text(o.text);break}case"html":{let o=a;r+=n.html(o.text);break}case"link":{let o=a;r+=n.link(o.href,o.title,this.parseInline(o.tokens,n));break}case"image":{let o=a;r+=n.image(o.href,o.title,o.text);break}case"strong":{let o=a;r+=n.strong(this.parseInline(o.tokens,n));break}case"em":{let o=a;r+=n.em(this.parseInline(o.tokens,n));break}case"codespan":{let o=a;r+=n.codespan(o.text);break}case"br":{r+=n.br();break}case"del":{let o=a;r+=n.del(this.parseInline(o.tokens,n));break}case"text":{let o=a;r+=n.text(o.text);break}default:{let o='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(o),"";throw new Error(o)}}}return r}},Xe=class{options;constructor(e){this.options=e||He}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}},pn=class{defaults=mn();options=this.setOptions;parse=this.#e(Te.lex,Ae.parse);parseInline=this.#e(Te.lexInline,Ae.parseInline);Parser=Ae;Renderer=Ke;TextRenderer=at;Lexer=Te;Tokenizer=Qe;Hooks=Xe;constructor(...e){this.use(...e)}walkTokens(e,n){let r=[];for(let i of e)switch(r=r.concat(n.call(this,i)),i.type){case"table":{let a=i;for(let o of a.header)r=r.concat(this.walkTokens(o.tokens,n));for(let o of a.rows)for(let s of o)r=r.concat(this.walkTokens(s.tokens,n));break}case"list":{let a=i;r=r.concat(this.walkTokens(a.items,n));break}default:{let a=i;this.defaults.extensions?.childTokens?.[a.type]?this.defaults.extensions.childTokens[a.type].forEach(o=>{let s=a[o].flat(1/0);r=r.concat(this.walkTokens(s,n))}):a.tokens&&(r=r.concat(this.walkTokens(a.tokens,n)))}}return r}use(...e){let n=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let i={...r};if(i.async=this.defaults.async||i.async||!1,r.extensions&&(r.extensions.forEach(a=>{if(!a.name)throw new Error("extension name required");if("renderer"in a){let o=n.renderers[a.name];o?n.renderers[a.name]=function(...s){let l=a.renderer.apply(this,s);return l===!1&&(l=o.apply(this,s)),l}:n.renderers[a.name]=a.renderer}if("tokenizer"in a){if(!a.level||a.level!=="block"&&a.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=n[a.level];o?o.unshift(a.tokenizer):n[a.level]=[a.tokenizer],a.start&&(a.level==="block"?n.startBlock?n.startBlock.push(a.start):n.startBlock=[a.start]:a.level==="inline"&&(n.startInline?n.startInline.push(a.start):n.startInline=[a.start]))}"childTokens"in a&&a.childTokens&&(n.childTokens[a.name]=a.childTokens)}),i.extensions=n),r.renderer){let a=this.defaults.renderer||new Ke(this.defaults);for(let o in r.renderer){if(!(o in a))throw new Error(`renderer '${o}' does not exist`);if(o==="options")continue;let s=o,l=r.renderer[s],d=a[s];a[s]=(...c)=>{let u=l.apply(a,c);return u===!1&&(u=d.apply(a,c)),u||""}}i.renderer=a}if(r.tokenizer){let a=this.defaults.tokenizer||new Qe(this.defaults);for(let o in r.tokenizer){if(!(o in a))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let s=o,l=r.tokenizer[s],d=a[s];a[s]=(...c)=>{let u=l.apply(a,c);return u===!1&&(u=d.apply(a,c)),u}}i.tokenizer=a}if(r.hooks){let a=this.defaults.hooks||new Xe;for(let o in r.hooks){if(!(o in a))throw new Error(`hook '${o}' does not exist`);if(o==="options")continue;let s=o,l=r.hooks[s],d=a[s];Xe.passThroughHooks.has(o)?a[s]=c=>{if(this.defaults.async)return Promise.resolve(l.call(a,c)).then(f=>d.call(a,f));let u=l.call(a,c);return d.call(a,u)}:a[s]=(...c)=>{let u=l.apply(a,c);return u===!1&&(u=d.apply(a,c)),u}}i.hooks=a}if(r.walkTokens){let a=this.defaults.walkTokens,o=r.walkTokens;i.walkTokens=function(s){let l=[];return l.push(o.call(this,s)),a&&(l=l.concat(a.call(this,s))),l}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,n){return Te.lex(e,n??this.defaults)}parser(e,n){return Ae.parse(e,n??this.defaults)}#e(e,n){return(r,i)=>{let a={...i},o={...this.defaults,...a};this.defaults.async===!0&&a.async===!1&&(o.silent||console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored."),o.async=!0);let s=this.#t(!!o.silent,!!o.async);if(typeof r>"u"||r===null)return s(new Error("marked(): input parameter is undefined or null"));if(typeof r!="string")return s(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(r)+", string expected"));if(o.hooks&&(o.hooks.options=o),o.async)return Promise.resolve(o.hooks?o.hooks.preprocess(r):r).then(l=>e(l,o)).then(l=>o.hooks?o.hooks.processAllTokens(l):l).then(l=>o.walkTokens?Promise.all(this.walkTokens(l,o.walkTokens)).then(()=>l):l).then(l=>n(l,o)).then(l=>o.hooks?o.hooks.postprocess(l):l).catch(s);try{o.hooks&&(r=o.hooks.preprocess(r));let l=e(r,o);o.hooks&&(l=o.hooks.processAllTokens(l)),o.walkTokens&&this.walkTokens(l,o.walkTokens);let d=n(l,o);return o.hooks&&(d=o.hooks.postprocess(d)),d}catch(l){return s(l)}}}#t(e,n){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let i="<p>An error occurred:</p><pre>"+se(r.message+"",!0)+"</pre>";return n?Promise.resolve(i):i}if(n)return Promise.reject(r);throw r}}},Ne=new pn;function _(t,e){return Ne.parse(t,e)}_.options=_.setOptions=function(t){return Ne.setOptions(t),_.defaults=Ne.defaults,vr(_.defaults),_};_.getDefaults=mn;_.defaults=He;_.use=function(...t){return Ne.use(...t),_.defaults=Ne.defaults,vr(_.defaults),_};_.walkTokens=function(t,e){return Ne.walkTokens(t,e)};_.parseInline=Ne.parseInline;_.Parser=Ae;_.parser=Ae.parse;_.Renderer=Ke;_.TextRenderer=at;_.Lexer=Te;_.lexer=Te.lex;_.Tokenizer=Qe;_.Hooks=Xe;_.parse=_;var Hl=_.options,Zl=_.setOptions,Gl=_.use,jl=_.walkTokens,Vl=_.parseInline;var ql=Ae.parse,Wl=Te.lex;var L=Oe(require("vscode")),De=class t{static scheme="mdocx-md";_onDidChangeFile=new L.EventEmitter;onDidChangeFile=this._onDidChangeFile.event;static register(e){let n=new t;return L.workspace.registerFileSystemProvider(t.scheme,n,{isCaseSensitive:!0,isReadonly:!1})}static buildUri(e,n){let r=encodeURIComponent(e.fsPath),i=n.startsWith("/")?n:"/"+n;return L.Uri.parse(`${t.scheme}://${r}${i}`)}static parseUri(e){try{if(!e.authority)return null;let n=decodeURIComponent(e.authority);if(!n)return null;let r=e.path.startsWith("/")?e.path.slice(1):e.path;return r?{mdocxUri:L.Uri.file(n),embeddedPath:r}:null}catch{return null}}watch(e){return new L.Disposable(()=>{})}async stat(e){try{let n=t.parseUri(e);if(!n)throw L.FileSystemError.FileNotFound(e);let{mdocxUri:r,embeddedPath:i}=n,a=await this.findFile(r,i);if(!a)throw L.FileSystemError.FileNotFound(e);return{type:L.FileType.File,ctime:0,mtime:Date.now(),size:a.content.byteLength}}catch(n){throw n instanceof L.FileSystemError?n:L.FileSystemError.FileNotFound(e)}}async readDirectory(e){return[]}createDirectory(e){throw L.FileSystemError.NoPermissions("Cannot create directories in MDOCX.")}async readFile(e){try{let n=t.parseUri(e);if(!n)throw L.FileSystemError.FileNotFound(e);let{mdocxUri:r,embeddedPath:i}=n,a=await this.findFile(r,i);if(!a)throw L.FileSystemError.FileNotFound(e);return a.content}catch(n){throw n instanceof L.FileSystemError?n:L.FileSystemError.FileNotFound(e)}}async writeFile(e,n,r){let i=t.parseUri(e);if(!i)throw L.FileSystemError.FileNotFound(e);let{mdocxUri:a,embeddedPath:o}=i,s=await L.workspace.fs.readFile(a),{readMdocx:l,writeMdocxAsync:d}=await Promise.resolve().then(()=>(ne(),te)),c=await l(s),u=c.markdown.files.find(h=>h.path===o);if(!u)throw L.FileSystemError.FileNotFound(e);u.content=n;let f=await d(c.markdown,c.media,{metadata:c.metadata,markdownCompression:"zip",mediaCompression:"zip"});await L.workspace.fs.writeFile(a,f),this._onDidChangeFile.fire([{type:L.FileChangeType.Changed,uri:e}])}delete(e,n){throw L.FileSystemError.NoPermissions("Cannot delete files from MDOCX via this provider.")}rename(e,n,r){throw L.FileSystemError.NoPermissions("Cannot rename files in MDOCX via this provider.")}async findFile(e,n){try{let r=await L.workspace.fs.readFile(e),{readMdocx:i}=await Promise.resolve().then(()=>(ne(),te));return(await i(r)).markdown.files.find(o=>o.path===n)}catch{return}}};var Fl="mdocx.preview",cn=class t{constructor(e){this._context=e}static register(e){let n=new t(e);return M.window.registerCustomEditorProvider(Fl,n,{webviewOptions:{retainContextWhenHidden:!0}})}async openCustomDocument(e,n,r){return{uri:e,dispose:()=>{}}}async resolveCustomEditor(e,n,r){n.webview.options={enableScripts:!0};let i,a=!1,o=async f=>{let h=await this.renderDocument(e.uri,f??i);i=h.path||f||i,await n.webview.postMessage(h)},s=n.webview.onDidReceiveMessage(async f=>{if(!(!f||typeof f.type!="string")){if(f.type==="ready"){a=!0,typeof f.selectedPath=="string"&&f.selectedPath.length>0&&(i=f.selectedPath),await o(i);return}if(f.type==="select"&&typeof f.path=="string"){i=f.path,await o(i);return}if(f.type==="copy"){let h=typeof f.path=="string"&&f.path.length>0?f.path:i,p=await this.getMarkdownText(e.uri,h);if(!p){M.window.showWarningMessage("MDOCX: No markdown content to copy.");return}await M.env.clipboard.writeText(p),M.window.showInformationMessage("MDOCX: Markdown copied to clipboard.");return}if(f.type!=="edit"){if(f.type==="editExternal"){let h=typeof f.path=="string"&&f.path.length>0?f.path:i;if(!h){M.window.showWarningMessage("MDOCX: No markdown file selected to edit.");return}let p=De.buildUri(e.uri,h);await M.window.showTextDocument(p,{preview:!1});return}if(f.type==="getMarkdownContent"){let h=f.path;if(!h)return;let p=await this.getMarkdownText(e.uri,h);await n.webview.postMessage({type:"markdownContent",path:h,content:p||""});return}if(f.type==="saveContent"){let h=f.path,p=f.content;if(!h){M.window.showWarningMessage("MDOCX: No file path specified.");return}await this.saveMarkdownContent(e.uri,h,p),M.window.showInformationMessage("MDOCX: File saved."),await o(i);return}if(f.type==="saveMetadata"){await this.saveMetadata(e.uri,f.metadata),M.window.showInformationMessage("MDOCX: Metadata saved."),await o(i);return}if(f.type==="addMedia"){let h=await M.window.showOpenDialog({canSelectMany:!0,openLabel:"Add Media",filters:{Images:["png","jpg","jpeg","gif","webp","svg"],"All Files":["*"]}});h&&h.length>0&&(await this.addMediaFiles(e.uri,h),M.window.showInformationMessage(`MDOCX: Added ${h.length} media file(s).`),await o(i));return}if(f.type==="removeMedia"){await M.window.showWarningMessage(`Remove media "${f.id}" from MDOCX?`,{modal:!0},"Remove")==="Remove"&&(await this.removeMedia(e.uri,f.id),M.window.showInformationMessage("MDOCX: Media removed."),await o(i));return}if(f.type==="replaceMedia"){let h=await M.window.showOpenDialog({canSelectMany:!1,openLabel:"Replace Media",filters:{Images:["png","jpg","jpeg","gif","webp","svg"],"All Files":["*"]}});h&&h.length>0&&(await this.replaceMedia(e.uri,f.id,h[0]),M.window.showInformationMessage("MDOCX: Media replaced."),await o(i));return}if(f.type==="addMarkdown"){let h=await M.window.showInputBox({prompt:"Enter the path for the new markdown file",value:"new-file.md",validateInput:p=>{if(!p||p.trim().length===0)return"File name cannot be empty";if(!p.endsWith(".md")&&!p.endsWith(".markdown"))return"File must have .md or .markdown extension"}});h&&(await this.addMarkdownFile(e.uri,h),M.window.showInformationMessage(`MDOCX: Added ${h}`),i=h,await o(i));return}if(f.type==="renameMarkdown"){await this.renameMarkdownFile(e.uri,f.oldPath,f.newPath),M.window.showInformationMessage(`MDOCX: Renamed to ${f.newPath}`),i===f.oldPath&&(i=f.newPath),await o(i);return}if(f.type==="deleteMarkdown"){await M.window.showWarningMessage(`Delete "${f.path}" from MDOCX? This cannot be undone.`,{modal:!0},"Delete")==="Delete"&&(await this.deleteMarkdownFile(e.uri,f.path),M.window.showInformationMessage("MDOCX: File deleted."),i===f.path&&(i=void 0),await o(i));return}}}}),l=new M.RelativePattern(ve.dirname(e.uri.fsPath),ve.basename(e.uri.fsPath)),d=M.workspace.createFileSystemWatcher(l),c=async()=>{await o(i)},u=[d,d.onDidChange(c),d.onDidCreate(c),d.onDidDelete(async()=>{await n.webview.postMessage({type:"render",path:"",title:"MDOCX",description:void 0,html:"",fileList:[],error:"The file was deleted from disk."})})];n.webview.html=this.getWebviewHtml(n.webview),setTimeout(async()=>{a||await o(i)},500),n.onDidDispose(()=>{s.dispose(),u.forEach(f=>f.dispose())})}async renderDocument(e,n){try{let r=await M.workspace.fs.readFile(e),{readMdocx:i,MediaResolver:a}=await Promise.resolve().then(()=>(ne(),te)),o=await i(r);o.markdown=o.markdown||{files:[]},Array.isArray(o.markdown.files)||(o.markdown.files=[]),o.media=o.media||{items:[]},Array.isArray(o.media.items)||(o.media.items=[]);let s=o.markdown.files.map(w=>w.path).sort((w,b)=>w.localeCompare(b)),l=n??o.markdown.rootPath??(typeof o.metadata?.root=="string"?o.metadata.root:void 0)??o.markdown.files[0]?.path,d=o.markdown.files.find(w=>w.path===l)??o.markdown.files[0];if(!d)return{type:"render",path:n??"",html:"",fileList:s,error:"No markdown files found in this MDOCX."};let u=new ln.TextDecoder("utf-8").decode(d.content),f=new a(o),h=this.renderMarkdownToHtml(u,{resolveMediaHref:w=>this.tryResolveMediaHrefToDataUri(f,w,d)}),p=typeof o.metadata?.title=="string"?o.metadata.title:void 0,m=typeof o.metadata?.description=="string"?o.metadata.description:void 0,v={title:p,description:m,author:typeof o.metadata?.creator=="string"?o.metadata.creator:void 0,root:o.markdown.rootPath??o.metadata?.root,tags:Array.isArray(o.metadata?.tags)?o.metadata.tags:void 0},T=(o.media.items||[]).map(w=>{let b={id:w.id,path:w.path,mimeType:w.mimeType,size:w.data?.byteLength??0};return w.mimeType?.startsWith("image/")&&w.data&&w.data.byteLength<500*1024&&(b.dataUri=`data:${w.mimeType};base64,${cr.Buffer.from(w.data).toString("base64")}`),b});return{type:"render",path:d.path,title:p,description:m,html:h,markdown:u,fileList:s,metadata:v,mediaItems:T}}catch(r){let i=r instanceof Error?r.message:String(r);return{type:"render",path:n??"",html:"",fileList:[],error:`Failed to read MDOCX: ${i}`}}}async getMarkdownText(e,n){try{let r=await M.workspace.fs.readFile(e),{readMdocx:i}=await Promise.resolve().then(()=>(ne(),te)),a=await i(r);a.markdown=a.markdown||{files:[]},Array.isArray(a.markdown.files)||(a.markdown.files=[]);let o=n??a.markdown.rootPath??(typeof a.metadata?.root=="string"?a.metadata.root:void 0)??a.markdown.files[0]?.path,s=a.markdown.files.find(d=>d.path===o)??a.markdown.files[0];return s?new ln.TextDecoder("utf-8").decode(s.content):void 0}catch{return}}async saveMarkdownContent(e,n,r){let i=await M.workspace.fs.readFile(e),{readMdocx:a,writeMdocxAsync:o}=await Promise.resolve().then(()=>(ne(),te)),s=await a(i);s.markdown=s.markdown||{files:[]},Array.isArray(s.markdown.files)||(s.markdown.files=[]),s.media=s.media||{items:[]},Array.isArray(s.media.items)||(s.media.items=[]);let l=s.markdown.files.find(u=>u.path===n);if(!l)throw new Error(`File "${n}" not found in this MDOCX`);let d=new TextEncoder;l.content=d.encode(r);let c=await o(s.markdown,s.media,{metadata:s.metadata,markdownCompression:"zip",mediaCompression:"zip"});await M.workspace.fs.writeFile(e,c)}async saveMetadata(e,n){let r=await M.workspace.fs.readFile(e),{readMdocx:i,writeMdocxAsync:a}=await Promise.resolve().then(()=>(ne(),te)),o=await i(r);o.markdown=o.markdown||{files:[]},Array.isArray(o.markdown.files)||(o.markdown.files=[]);let s=o.metadata||{};n.title!==void 0&&(s.title=n.title),n.description!==void 0&&(s.description=n.description),n.author!==void 0&&(s.creator=n.author),n.root!==void 0&&(s.root=n.root),n.tags!==void 0&&(s.tags=n.tags),n.root!==void 0&&(o.markdown.rootPath=n.root);let l=await a(o.markdown,o.media,{metadata:s,markdownCompression:"zip",mediaCompression:"zip"});await M.workspace.fs.writeFile(e,l)}async addMediaFiles(e,n){let r=await M.workspace.fs.readFile(e),{readMdocx:i,writeMdocxAsync:a}=await Promise.resolve().then(()=>(ne(),te)),o=await i(r);o.markdown=o.markdown||{files:[]},Array.isArray(o.markdown.files)||(o.markdown.files=[]),o.media=o.media||{items:[]},Array.isArray(o.media.items)||(o.media.items=[]);let s=Date.now(),l=0;for(let c of n){let u=await M.workspace.fs.readFile(c),f=ve.basename(c.fsPath),h=ve.extname(f).toLowerCase(),p=f.replace(/[^a-zA-Z0-9_-]/g,"_")+"_"+(s+l++),m=this.getMimeTypeFromExtension(h);o.media.items.push({id:p,path:`media/${f}`,mimeType:m,data:new Uint8Array(u)})}let d=await a(o.markdown,o.media,{metadata:o.metadata,markdownCompression:"zip",mediaCompression:"zip"});await M.workspace.fs.writeFile(e,d)}async addMarkdownFile(e,n){let r=await M.workspace.fs.readFile(e),{readMdocx:i,writeMdocxAsync:a}=await Promise.resolve().then(()=>(ne(),te)),o=await i(r);if(o.markdown=o.markdown||{files:[]},Array.isArray(o.markdown.files)||(o.markdown.files=[]),o.media=o.media||{items:[]},Array.isArray(o.media.items)||(o.media.items=[]),o.markdown.files.find(f=>f.path===n))throw new Error(`File "${n}" already exists in this MDOCX`);let d=`# ${ve.basename(n,ve.extname(n))}

Start writing here...
`,c=new TextEncoder;o.markdown.files.push({path:n,content:c.encode(d)});let u=await a(o.markdown,o.media,{metadata:o.metadata,markdownCompression:"zip",mediaCompression:"zip"});await M.workspace.fs.writeFile(e,u)}async renameMarkdownFile(e,n,r){let i=await M.workspace.fs.readFile(e),{readMdocx:a,writeMdocxAsync:o}=await Promise.resolve().then(()=>(ne(),te)),s=await a(i);s.markdown=s.markdown||{files:[]},Array.isArray(s.markdown.files)||(s.markdown.files=[]),s.media=s.media||{items:[]},Array.isArray(s.media.items)||(s.media.items=[]);let l=s.markdown.files.find(u=>u.path===n);if(!l)throw new Error(`File "${n}" not found in this MDOCX`);if(s.markdown.files.find(u=>u.path===r))throw new Error(`File "${r}" already exists in this MDOCX`);l.path=r,s.markdown.rootPath===n&&(s.markdown.rootPath=r);let c=await o(s.markdown,s.media,{metadata:s.metadata,markdownCompression:"zip",mediaCompression:"zip"});await M.workspace.fs.writeFile(e,c)}async deleteMarkdownFile(e,n){let r=await M.workspace.fs.readFile(e),{readMdocx:i,writeMdocxAsync:a}=await Promise.resolve().then(()=>(ne(),te)),o=await i(r);o.markdown=o.markdown||{files:[]},Array.isArray(o.markdown.files)||(o.markdown.files=[]),o.media=o.media||{items:[]},Array.isArray(o.media.items)||(o.media.items=[]);let s=o.markdown.files.findIndex(d=>d.path===n);s>=0&&o.markdown.files.splice(s,1),o.markdown.rootPath===n&&o.markdown.files.length>0&&(o.markdown.rootPath=o.markdown.files[0].path);let l=await a(o.markdown,o.media,{metadata:o.metadata,markdownCompression:"zip",mediaCompression:"zip"});await M.workspace.fs.writeFile(e,l)}async removeMedia(e,n){let r=await M.workspace.fs.readFile(e),{readMdocx:i,writeMdocxAsync:a}=await Promise.resolve().then(()=>(ne(),te)),o=await i(r);o.markdown=o.markdown||{files:[]},Array.isArray(o.markdown.files)||(o.markdown.files=[]),o.media=o.media||{items:[]},Array.isArray(o.media.items)||(o.media.items=[]);let s=o.media.items.findIndex(d=>d.id===n);s>=0&&o.media.items.splice(s,1);let l=await a(o.markdown,o.media,{metadata:o.metadata,markdownCompression:"zip",mediaCompression:"zip"});await M.workspace.fs.writeFile(e,l)}async replaceMedia(e,n,r){let i=await M.workspace.fs.readFile(e),{readMdocx:a,writeMdocxAsync:o}=await Promise.resolve().then(()=>(ne(),te)),s=await a(i),l=s.media.items.find(c=>c.id===n);if(l){let c=await M.workspace.fs.readFile(r),u=ve.basename(r.fsPath),f=ve.extname(u).toLowerCase();l.data=new Uint8Array(c),l.mimeType=this.getMimeTypeFromExtension(f),l.path=`media/${u}`}let d=await o(s.markdown,s.media,{metadata:s.metadata,markdownCompression:"zip",mediaCompression:"zip"});await M.workspace.fs.writeFile(e,d)}getMimeTypeFromExtension(e){return{".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg",".gif":"image/gif",".webp":"image/webp",".svg":"image/svg+xml",".mp3":"audio/mpeg",".wav":"audio/wav",".mp4":"video/mp4",".webm":"video/webm",".pdf":"application/pdf"}[e]||"application/octet-stream"}renderMarkdownToHtml(e,n){let r=s=>{let l=(s??"").trim();return l&&(l.startsWith("#")||/^mailto:/i.test(l)||/^data:/i.test(l)||/^https?:\/\//i.test(l))?l:null},i=new _.Renderer;i.html=()=>"",i.link=(s,l,d)=>{let c=r(s);if(!c)return d;let u=l?` title="${this.escapeHtmlAttr(l)}"`:"",h=/^https?:\/\//i.test(c)?' rel="noreferrer noopener" target="_blank"':"";return`<a href="${this.escapeHtmlAttr(c)}"${u}${h}>${d}</a>`},i.image=(s,l,d)=>{let c=r(s);if(!c)return"";let u=l?` title="${this.escapeHtmlAttr(l)}"`:"",f=this.escapeHtmlAttr(d??"");return`<img src="${this.escapeHtmlAttr(c)}" alt="${f}"${u} />`};let a=s=>{if(n?.resolveMediaHref&&!(!s||typeof s.type!="string")&&(s.type==="image"||s.type==="link")&&typeof s.href=="string"){let l=n.resolveMediaHref(s.href);l&&(s.href=l)}},o=_.parse(e,{renderer:i,walkTokens:a});return typeof o=="string"?o:""}tryResolveMediaHrefToDataUri(e,n,r){let i=n.trim().replace(/^<|>$/g,"");if(!i||/^https?:\/\//i.test(i)||/^data:/i.test(i)||/^mailto:/i.test(i)||i.startsWith("#"))return;let o=(i.split("#")[0]?.split("?")[0]??i).replace(/\\/g,"/"),s=new Set([o,o.startsWith("./")?o.slice(2):o,o.startsWith("/")?o.slice(1):o]);try{s.add(decodeURI(o))}catch{}let l;for(let h of s){try{if(l=e.resolve(h,r),l)break}catch{}try{if(!l&&typeof e.getByPath=="function"&&(l=e.getByPath(h),l))break}catch{}try{let p=/^mdocx:\/\/media\/(.+)$/i.exec(h);if(!l&&p&&typeof e.getById=="function"&&(l=e.getById(p[1]),l))break}catch{}}if(!l||!l.data)return;let d=this.getMaxInlineMediaBytes();if(typeof l.data.byteLength=="number"&&l.data.byteLength>d)return;let c=this.inferMimeType(l),u=typeof l.mimeType=="string"&&l.mimeType.length>0?l.mimeType:c,f=cr.Buffer.from(l.data).toString("base64");return`data:${u};base64,${f}`}inferMimeType(e){let n=typeof e.path=="string"?e.path.toLowerCase():"";if(n.endsWith(".png"))return"image/png";if(n.endsWith(".jpg")||n.endsWith(".jpeg"))return"image/jpeg";if(n.endsWith(".gif"))return"image/gif";if(n.endsWith(".webp"))return"image/webp";if(n.endsWith(".svg"))return"image/svg+xml";let r=e.data;if(!r||r.length<12)return"application/octet-stream";if(r[0]===137&&r[1]===80&&r[2]===78&&r[3]===71&&r[4]===13&&r[5]===10&&r[6]===26&&r[7]===10)return"image/png";if(r[0]===255&&r[1]===216)return"image/jpeg";if(r[0]===71&&r[1]===73&&r[2]===70)return"image/gif";if(r[0]===82&&r[1]===73&&r[2]===70&&r[3]===70&&r[8]===87&&r[9]===69&&r[10]===66&&r[11]===80)return"image/webp";try{let i=new ln.TextDecoder("utf-8").decode(r.slice(0,256));if(i.includes("<svg")||i.includes("<?xml"))return"image/svg+xml"}catch{}return"application/octet-stream"}getMaxInlineMediaBytes(){let e=M.workspace.getConfiguration("mdocx").get("maxInlineMediaBytes");return typeof e=="number"&&Number.isFinite(e)&&e>0?e:25*1024*1024}getWebviewHtml(e){let n=String(Date.now());return`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data: https: http:; style-src 'unsafe-inline'; script-src 'nonce-${n}';" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MDOCX Preview</title>
  <style>
    :root {
      color-scheme: light dark;
      --border-color: var(--vscode-editorGroup-border);
      --panel-bg: color-mix(in srgb, var(--vscode-editor-background) 92%, black);
      --panel-hover-bg: color-mix(in srgb, var(--vscode-editor-background) 85%, black);
      --danger-bg: var(--vscode-inputValidation-errorBackground, #5a1d1d);
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 0;
      font-family: var(--vscode-font-family);
      color: var(--vscode-foreground);
      background: var(--vscode-editor-background);
    }
    header {
      position: sticky;
      top: 0;
      z-index: 10;
      padding: 12px 16px;
      border-bottom: 1px solid var(--border-color);
      background: var(--vscode-editor-background);
      display: flex;
      gap: 12px;
      align-items: center;
      flex-wrap: wrap;
    }
    header .meta {
      flex: 1;
      min-width: 200px;
      display: flex;
      flex-direction: column;
      gap: 2px;
      overflow: hidden;
    }
    header .meta .title {
      font-weight: 600;
      font-size: 14px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    header .meta .desc {
      opacity: 0.7;
      font-size: 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    select, input, textarea {
      padding: 6px 10px;
      border: 1px solid var(--vscode-input-border, var(--border-color));
      background: var(--vscode-input-background);
      color: var(--vscode-input-foreground);
      border-radius: 4px;
      font-family: var(--vscode-font-family);
      font-size: 13px;
    }
    select:focus, input:focus, textarea:focus {
      outline: 1px solid var(--vscode-focusBorder);
      outline-offset: -1px;
    }
    button {
      border: 1px solid var(--vscode-button-border, transparent);
      background: var(--vscode-button-background);
      color: var(--vscode-button-foreground);
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-family: var(--vscode-font-family);
      font-size: 12px;
      font-weight: 500;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      white-space: nowrap;
      transition: background 0.1s;
    }
    button svg {
      width: 14px;
      height: 14px;
      fill: currentColor;
      opacity: 0.9;
    }
    button:hover {
      background: var(--vscode-button-hoverBackground);
    }
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    button.secondary {
      background: var(--vscode-button-secondaryBackground);
      color: var(--vscode-button-secondaryForeground);
    }
    button.secondary:hover {
      background: var(--vscode-button-secondaryHoverBackground);
    }
    button.active {
      background: var(--vscode-button-hoverBackground);
      box-shadow: inset 0 0 0 1px var(--vscode-focusBorder);
    }
    button.danger {
      background: var(--danger-bg);
    }
    button.small {
      padding: 3px 8px;
      font-size: 11px;
    }
    .layout {
      display: grid;
      grid-template-columns: 280px 1fr;
      min-height: calc(100vh - 60px);
    }
    @media (max-width: 800px) {
      .layout {
        grid-template-columns: 1fr;
      }
      .sidebar {
        border-right: none !important;
        border-bottom: 1px solid var(--border-color);
      }
    }
    .sidebar {
      border-right: 1px solid var(--border-color);
      background: var(--panel-bg);
      overflow-y: auto;
      max-height: calc(100vh - 60px);
    }
    .main-content {
      padding: 20px 24px;
      overflow-y: auto;
      max-height: calc(100vh - 60px);
      display: flex;
      flex-direction: column;
    }
    .main-content img {
      max-width: 100%;
    }
    .main-content pre {
      padding: 12px;
      overflow: auto;
      background: var(--panel-bg);
      border: 1px solid var(--border-color);
      border-radius: 6px;
    }
    .main-content code {
      font-family: var(--vscode-editor-font-family);
    }
    .main-content h1:first-child { margin-top: 0; }
    .error {
      color: var(--vscode-errorForeground);
      padding: 12px 16px;
      border: 1px solid var(--vscode-errorForeground);
      border-radius: 6px;
      margin: 12px 0;
      white-space: pre-wrap;
    }
    
    /* Sidebar sections */
    .sidebar-section {
      border-bottom: 1px solid var(--border-color);
    }
    .sidebar-section:last-child {
      border-bottom: none;
    }
    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 12px;
      cursor: pointer;
      user-select: none;
      font-weight: 600;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      opacity: 0.8;
    }
    .section-header:hover {
      background: var(--panel-hover-bg);
    }
    .section-header .chevron {
      width: 12px;
      height: 12px;
      fill: currentColor;
      transition: transform 0.15s;
    }
    .section-header.collapsed .chevron {
      transform: rotate(-90deg);
    }
    .section-header.collapsed + .section-body {
      display: none;
    }
    .section-body {
      padding: 8px 12px 12px;
    }
    .section-actions {
      display: flex;
      gap: 6px;
      margin-bottom: 10px;
    }

    /* File list */
    .file-list {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .file-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 8px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 13px;
    }
    .file-item:hover {
      background: var(--panel-hover-bg);
    }
    .file-item.selected {
      background: var(--vscode-list-activeSelectionBackground);
      color: var(--vscode-list-activeSelectionForeground);
    }
    .file-item .file-icon {
      width: 16px;
      height: 16px;
      fill: currentColor;
      opacity: 0.7;
      flex-shrink: 0;
    }
    .file-item .file-name {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .file-item .file-actions {
      display: none;
      gap: 4px;
    }
    .file-item:hover .file-actions {
      display: flex;
    }
    .file-item .file-actions button {
      padding: 2px 4px;
      background: transparent;
      border: none;
      opacity: 0.7;
    }
    .file-item .file-actions button:hover {
      opacity: 1;
      background: var(--panel-hover-bg);
    }
    .file-item.root-file .file-name::after {
      content: ' (root)';
      opacity: 0.5;
      font-size: 11px;
    }

    /* Media grid */
    .media-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      gap: 8px;
    }
    .media-item {
      border: 1px solid var(--border-color);
      border-radius: 6px;
      padding: 8px;
      text-align: center;
      background: var(--vscode-editor-background);
    }
    .media-item img {
      max-width: 100%;
      max-height: 60px;
      object-fit: contain;
      margin-bottom: 6px;
      border-radius: 2px;
    }
    .media-item .placeholder {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--panel-bg);
      border-radius: 4px;
      margin-bottom: 6px;
      font-size: 10px;
      opacity: 0.6;
    }
    .media-item .info {
      font-size: 10px;
      word-break: break-all;
      opacity: 0.8;
    }
    .media-item .actions {
      margin-top: 6px;
      display: flex;
      gap: 4px;
      justify-content: center;
    }

    /* Form elements */
    .form-row {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: 10px;
    }
    .form-row:last-child {
      margin-bottom: 0;
    }
    .form-row label {
      font-size: 11px;
      opacity: 0.7;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .form-row textarea {
      min-height: 50px;
      resize: vertical;
    }
    .btn-row {
      display: flex;
      gap: 8px;
      margin-top: 10px;
    }

    /* Empty state */
    .empty-state {
      text-align: center;
      padding: 20px;
      opacity: 0.6;
      font-size: 12px;
    }

    /* Badge */
    .badge {
      background: var(--vscode-badge-background);
      color: var(--vscode-badge-foreground);
      font-size: 10px;
      padding: 2px 6px;
      border-radius: 10px;
      margin-left: 6px;
    }

    /* View toggle */
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
    .view-toggle button:first-child {
      border-right: 1px solid var(--vscode-button-border, var(--border-color));
    }
    .view-toggle button.active {
      background: var(--vscode-button-background);
      color: var(--vscode-button-foreground);
      box-shadow: none;
    }
    .view-toggle button:hover:not(.active) {
      background: var(--vscode-button-secondaryHoverBackground);
    }

    /* Editor view */
    #previewView {
      flex: 1;
    }
    #editorView {
      display: none;
      flex: 1;
      flex-direction: column;
      gap: 12px;
    }
    #editorView.active {
      display: flex;
    }
    #previewView.hidden {
      display: none;
    }
    .editor-toolbar {
      display: flex;
      gap: 8px;
      align-items: center;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--border-color);
    }
    .editor-toolbar .file-path {
      flex: 1;
      font-size: 12px;
      opacity: 0.8;
      font-family: var(--vscode-editor-font-family);
    }
    .editor-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }
    #markdownEditor {
      flex: 1;
      width: 100%;
      min-height: 400px;
      padding: 12px;
      border: 1px solid var(--vscode-input-border, var(--border-color));
      background: var(--vscode-input-background);
      color: var(--vscode-input-foreground);
      border-radius: 6px;
      font-family: var(--vscode-editor-font-family);
      font-size: 13px;
      line-height: 1.5;
      resize: none;
      tab-size: 2;
    }
    #markdownEditor:focus {
      outline: 1px solid var(--vscode-focusBorder);
      outline-offset: -1px;
    }
    .editor-status {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 8px;
      font-size: 11px;
      opacity: 0.7;
    }
    .editor-status .modified {
      color: var(--vscode-gitDecoration-modifiedResourceForeground, #e2c08d);
    }
    .editor-actions {
      display: flex;
      gap: 8px;
    }
  </style>
</head>
<body>
  <header>
    <div class="meta">
      <div id="docTitle" class="title">MDOCX</div>
      <div id="docDesc" class="desc"></div>
    </div>
    <div class="view-toggle">
      <button id="previewToggle" type="button" class="active" title="Preview Mode">
        <svg viewBox="0 0 16 16"><path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/></svg>
        Preview
      </button>
      <button id="editToggle" type="button" title="Edit Mode">
        <svg viewBox="0 0 16 16"><path d="M12.146.854a.5.5 0 0 1 .708 0l2.292 2.292a.5.5 0 0 1 0 .708l-9.5 9.5a.5.5 0 0 1-.168.11l-4 1.5a.5.5 0 0 1-.638-.638l1.5-4a.5.5 0 0 1 .11-.168l9.5-9.5z"/></svg>
        Edit
      </button>
    </div>
    <button id="copyBtn" type="button" class="secondary" title="Copy Markdown to Clipboard">
      <svg viewBox="0 0 16 16"><path d="M10 1H3.5A1.5 1.5 0 0 0 2 2.5V10h1V2.5a.5.5 0 0 1 .5-.5H10V1z"/><path d="M5.5 4H12A2 2 0 0 1 14 6v6.5A2 2 0 0 1 12 14H5.5A2 2 0 0 1 3.5 12.5V6A2 2 0 0 1 5.5 4zm0 1A1 1 0 0 0 4.5 6v6.5a1 1 0 0 0 1 1H12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H5.5z"/></svg>
      Copy
    </button>
    <button id="editExternalBtn" type="button" class="secondary" title="Edit in VS Code Editor">
      <svg viewBox="0 0 16 16"><path d="M4.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V4.207L10.793 1H4.5z"/><path d="M10 1v3.5a.5.5 0 0 0 .5.5H14"/></svg>
      Open in Editor
    </button>
  </header>

  <div class="layout">
    <aside class="sidebar">
      <!-- Files Section -->
      <div class="sidebar-section">
        <div class="section-header" id="filesHeader">
          <span>Files <span class="badge" id="fileCount">0</span></span>
          <svg class="chevron" viewBox="0 0 16 16"><path d="M6 12l4-4-4-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
        </div>
        <div class="section-body" id="filesBody">
          <div class="section-actions">
            <button type="button" id="addFileBtn" class="small">+ Add File</button>
          </div>
          <ul class="file-list" id="fileList"></ul>
        </div>
      </div>

      <!-- Media Section -->
      <div class="sidebar-section">
        <div class="section-header" id="mediaHeader">
          <span>Media <span class="badge" id="mediaCount">0</span></span>
          <svg class="chevron" viewBox="0 0 16 16"><path d="M6 12l4-4-4-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
        </div>
        <div class="section-body" id="mediaBody">
          <div class="section-actions">
            <button type="button" id="addMediaBtn" class="small">+ Add Media</button>
          </div>
          <div class="media-grid" id="mediaGrid"></div>
        </div>
      </div>

      <!-- Metadata Section -->
      <div class="sidebar-section">
        <div class="section-header collapsed" id="metadataHeader">
          <span>Metadata</span>
          <svg class="chevron" viewBox="0 0 16 16"><path d="M6 12l4-4-4-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
        </div>
        <div class="section-body" id="metadataBody">
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
    </aside>

    <main class="main-content">
      <div id="error" class="error" style="display:none"></div>
      <div id="previewView">
        <div id="content"></div>
      </div>
      <div id="editorView">
        <div class="editor-toolbar">
          <span class="file-path" id="editorFilePath"></span>
          <button type="button" id="discardBtn" class="secondary small">Discard</button>
          <button type="button" id="saveBtn" class="small">Save</button>
        </div>
        <div class="editor-container">
          <textarea id="markdownEditor" placeholder="Enter markdown content..."></textarea>
        </div>
        <div class="editor-status">
          <span id="editorStatus"></span>
          <div class="editor-actions">
            <span id="charCount">0 characters</span>
          </div>
        </div>
      </div>
    </main>
  </div>

  <script nonce="${n}">
    const vscode = acquireVsCodeApi();
    const state = vscode.getState() || {};

    // Elements
    const content = document.getElementById('content');
    const error = document.getElementById('error');
    const docTitle = document.getElementById('docTitle');
    const docDesc = document.getElementById('docDesc');
    const fileList = document.getElementById('fileList');
    const fileCount = document.getElementById('fileCount');
    const mediaGrid = document.getElementById('mediaGrid');
    const mediaCount = document.getElementById('mediaCount');
    const metaTitle = document.getElementById('metaTitle');
    const metaDescription = document.getElementById('metaDescription');
    const metaAuthor = document.getElementById('metaAuthor');
    const metaRoot = document.getElementById('metaRoot');
    const metaTags = document.getElementById('metaTags');
    const previewView = document.getElementById('previewView');
    const editorView = document.getElementById('editorView');
    const markdownEditor = document.getElementById('markdownEditor');
    const editorFilePath = document.getElementById('editorFilePath');
    const editorStatus = document.getElementById('editorStatus');
    const charCount = document.getElementById('charCount');
    const previewToggle = document.getElementById('previewToggle');
    const editToggle = document.getElementById('editToggle');

    let currentFiles = [];
    let currentPath = '';
    let rootPath = '';
    let isEditMode = false;
    let originalContent = '';
    let isModified = false;

    // Section toggle
    document.querySelectorAll('.section-header').forEach(header => {
      header.addEventListener('click', () => header.classList.toggle('collapsed'));
    });

    function setError(message) {
      error.style.display = message ? 'block' : 'none';
      error.textContent = message || '';
    }

    function escapeHtml(str) {
      return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function formatBytes(bytes) {
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
      return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    }

    function updateEditorStatus() {
      const len = markdownEditor.value.length;
      charCount.textContent = len + ' character' + (len !== 1 ? 's' : '');
      isModified = markdownEditor.value !== originalContent;
      if (isModified) {
        editorStatus.innerHTML = '<span class="modified">\u25CF Modified</span>';
      } else {
        editorStatus.textContent = '';
      }
    }

    function switchToPreview() {
      if (isModified) {
        // Could prompt to save, but for simplicity just switch
      }
      isEditMode = false;
      previewView.classList.remove('hidden');
      editorView.classList.remove('active');
      previewToggle.classList.add('active');
      editToggle.classList.remove('active');
    }

    function switchToEdit() {
      isEditMode = true;
      previewView.classList.add('hidden');
      editorView.classList.add('active');
      previewToggle.classList.remove('active');
      editToggle.classList.add('active');
      editorFilePath.textContent = currentPath;
      vscode.postMessage({ type: 'getMarkdownContent', path: currentPath });
    }

    function setFiles(files, selected, root) {
      currentFiles = files || [];
      currentPath = selected || currentFiles[0] || '';
      rootPath = root || '';
      fileCount.textContent = currentFiles.length;
      fileList.innerHTML = '';
      metaRoot.innerHTML = '';

      if (currentFiles.length === 0) {
        fileList.innerHTML = '<li class="empty-state">No files yet</li>';
        return;
      }

      for (const path of currentFiles) {
        // File list item
        const li = document.createElement('li');
        li.className = 'file-item' + (path === currentPath ? ' selected' : '') + (path === rootPath ? ' root-file' : '');
        li.innerHTML = \`
          <svg class="file-icon" viewBox="0 0 16 16"><path d="M4 0h5.5L14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 0v4.5H14L9.5 0zM4.5 12.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z"/></svg>
          <span class="file-name">\${escapeHtml(path)}</span>
          <span class="file-actions">
            <button type="button" title="Edit" data-action="edit" data-path="\${escapeHtml(path)}">
              <svg viewBox="0 0 16 16" width="12" height="12"><path fill="currentColor" d="M12.146.854a.5.5 0 0 1 .708 0l2.292 2.292a.5.5 0 0 1 0 .708l-9.5 9.5a.5.5 0 0 1-.168.11l-4 1.5a.5.5 0 0 1-.638-.638l1.5-4a.5.5 0 0 1 .11-.168l9.5-9.5z"/></svg>
            </button>
            <button type="button" title="Delete" data-action="delete" data-path="\${escapeHtml(path)}">
              <svg viewBox="0 0 16 16" width="12" height="12"><path fill="currentColor" d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill="currentColor" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>
            </button>
          </span>
        \`;
        li.addEventListener('click', (e) => {
          if (e.target.closest('button')) return;
          // If in edit mode and modified, confirm before switching
          if (isEditMode && isModified) {
            if (!confirm('You have unsaved changes. Discard them?')) return;
          }
          vscode.postMessage({ type: 'select', path });
        });
        fileList.appendChild(li);

        // Root select option
        const opt = document.createElement('option');
        opt.value = path;
        opt.textContent = path;
        metaRoot.appendChild(opt);
      }

      // Update root select
      if (rootPath) metaRoot.value = rootPath;
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
        div.className = 'media-item';
        div.innerHTML = \`
          \${item.dataUri 
            ? \`<img src="\${item.dataUri}" alt="\${escapeHtml(item.id)}" />\`
            : \`<div class="placeholder">\${escapeHtml(item.mimeType || 'binary')}</div>\`
          }
          <div class="info">\${escapeHtml(item.id)}<br/>\${formatBytes(item.size)}</div>
          <div class="actions">
            <button type="button" class="small secondary" data-action="replace" data-id="\${escapeHtml(item.id)}">Replace</button>
            <button type="button" class="small danger" data-action="remove" data-id="\${escapeHtml(item.id)}">\u2715</button>
          </div>
        \`;
        mediaGrid.appendChild(div);
      }
    }

    // Event delegation for file actions
    fileList.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-action]');
      if (!btn) return;
      const action = btn.dataset.action;
      const path = btn.dataset.path;
      if (action === 'edit') {
        // Switch to inline edit for that file
        if (isEditMode && isModified && currentPath !== path) {
          if (!confirm('You have unsaved changes. Discard them?')) return;
        }
        vscode.postMessage({ type: 'select', path });
        setTimeout(() => switchToEdit(), 100);
      } else if (action === 'delete') {
        vscode.postMessage({ type: 'deleteMarkdown', path });
      }
    });

    // Event delegation for media actions
    mediaGrid.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-action]');
      if (!btn) return;
      const action = btn.dataset.action;
      const id = btn.dataset.id;
      if (action === 'replace') {
        vscode.postMessage({ type: 'replaceMedia', id });
      } else if (action === 'remove') {
        vscode.postMessage({ type: 'removeMedia', id });
      }
    });

    // Button handlers
    document.getElementById('copyBtn').addEventListener('click', () => {
      vscode.postMessage({ type: 'copy', path: currentPath });
    });

    document.getElementById('editExternalBtn').addEventListener('click', () => {
      vscode.postMessage({ type: 'editExternal', path: currentPath });
    });

    previewToggle.addEventListener('click', () => {
      if (!isEditMode) return;
      if (isModified) {
        if (!confirm('You have unsaved changes. Discard them?')) return;
      }
      switchToPreview();
    });

    editToggle.addEventListener('click', () => {
      if (isEditMode) return;
      switchToEdit();
    });

    document.getElementById('saveBtn').addEventListener('click', () => {
      if (!currentPath) return;
      vscode.postMessage({ type: 'saveContent', path: currentPath, content: markdownEditor.value });
      originalContent = markdownEditor.value;
      updateEditorStatus();
    });

    document.getElementById('discardBtn').addEventListener('click', () => {
      if (isModified) {
        if (!confirm('Discard all changes?')) return;
      }
      markdownEditor.value = originalContent;
      updateEditorStatus();
    });

    markdownEditor.addEventListener('input', updateEditorStatus);

    // Handle Ctrl+S in editor
    markdownEditor.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (currentPath) {
          vscode.postMessage({ type: 'saveContent', path: currentPath, content: markdownEditor.value });
          originalContent = markdownEditor.value;
          updateEditorStatus();
        }
      }
    });

    document.getElementById('addFileBtn').addEventListener('click', () => {
      vscode.postMessage({ type: 'addMarkdown' });
    });

    document.getElementById('addMediaBtn').addEventListener('click', () => {
      vscode.postMessage({ type: 'addMedia' });
    });

    document.getElementById('saveMetadataBtn').addEventListener('click', () => {
      const tagsStr = metaTags.value.trim();
      const tags = tagsStr ? tagsStr.split(',').map(t => t.trim()).filter(Boolean) : undefined;
      vscode.postMessage({
        type: 'saveMetadata',
        metadata: {
          title: metaTitle.value || undefined,
          description: metaDescription.value || undefined,
          author: metaAuthor.value || undefined,
          root: metaRoot.value || undefined,
          tags
        }
      });
    });

    // Init
    vscode.postMessage({ type: 'ready', selectedPath: state.selectedPath });

    // Message handler
    window.addEventListener('message', (event) => {
      const msg = event.data;
      
      // Handle markdown content for editor
      if (msg && msg.type === 'markdownContent') {
        markdownEditor.value = msg.content || '';
        originalContent = msg.content || '';
        editorFilePath.textContent = msg.path || currentPath;
        updateEditorStatus();
        markdownEditor.focus();
        return;
      }

      if (!msg || msg.type !== 'render') return;

      docTitle.textContent = msg.title || 'MDOCX';
      docDesc.textContent = msg.description || '';

      if (Array.isArray(msg.fileList)) {
        setFiles(msg.fileList, msg.path, msg.metadata?.root);
      }

      if (msg.metadata) {
        setMetadata(msg.metadata);
      }

      if (msg.mediaItems) {
        setMediaItems(msg.mediaItems);
      }

      if (msg.path) {
        vscode.setState({ selectedPath: msg.path });
        // If in edit mode, update the editor content
        if (isEditMode && msg.markdown) {
          markdownEditor.value = msg.markdown;
          originalContent = msg.markdown;
          editorFilePath.textContent = msg.path;
          updateEditorStatus();
        }
      }

      setError(msg.error || null);

      if (typeof msg.html === 'string') {
        content.innerHTML = msg.html;
      }
    });
  </script>
</body>
</html>`}escapeHtmlAttr(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}};var W=Oe(require("vscode"));var dn=class t{static scheme=De.scheme;static triggerCharacters=["/","(","[","!",".",'"',"'"];static register(e){let n=new t;return W.languages.registerCompletionItemProvider({scheme:t.scheme,language:"markdown"},n,...t.triggerCharacters)}async provideCompletionItems(e,n,r,i){if(e.uri.scheme!==t.scheme)return;let a=De.parseUri(e.uri);if(!a)return;let s=e.lineAt(n.line).text.substring(0,n.character);if(/!\[[^\]]*\]\([^)]*$/.test(s)||/\[[^\]]*\]\([^)]*$/.test(s)||/src=["'][^"']*$/.test(s)||/href=["'][^"']*$/.test(s)||/!\[$/.test(s)||/!\[[^\]]*$/.test(s))try{let d=await this.getMediaItems(a.mdocxUri);if(!d||d.length===0)return;let c=[];for(let u of d){if(u.path){let p=new W.CompletionItem(u.path,W.CompletionItemKind.File);p.detail=`${u.mimeType||"media"} (${this.formatBytes(u.size)})`,p.documentation=new W.MarkdownString(`**Media ID:** ${u.id}

**Path:** ${u.path}

**Type:** ${u.mimeType||"unknown"}

**Size:** ${this.formatBytes(u.size)}`),p.insertText=u.path,p.sortText="0_"+u.path,c.push(p)}let f=`mdocx://media/${u.id}`,h=new W.CompletionItem(f,W.CompletionItemKind.Reference);h.detail=`${u.mimeType||"media"} by ID`,h.documentation=new W.MarkdownString(`**Media ID:** ${u.id}

**Path:** ${u.path||"N/A"}

**Type:** ${u.mimeType||"unknown"}

**Size:** ${this.formatBytes(u.size)}`),h.insertText=f,h.sortText="1_"+u.id,c.push(h)}if(/!\[$/.test(s)){for(let u of d)if(u.mimeType?.startsWith("image/")){let f=`[${u.id}](${u.path||`mdocx://media/${u.id}`})`,h=new W.CompletionItem(`Image: ${u.id}`,W.CompletionItemKind.Snippet);h.detail="Insert complete image markdown",h.documentation=new W.MarkdownString(`Inserts: \`![${u.id}](${u.path||`mdocx://media/${u.id}`})\``),h.insertText=new W.SnippetString(`[\${1:${u.id}}](${u.path||`mdocx://media/${u.id}`})`),h.sortText="2_"+u.id,c.push(h)}}return c}catch{return}}async getMediaItems(e){try{let n=await W.workspace.fs.readFile(e),{readMdocx:r}=await Promise.resolve().then(()=>(ne(),te));return((await r(n)).media.items||[]).map(a=>({id:a.id,path:a.path,mimeType:a.mimeType,size:a.data?.byteLength??0}))}catch{return[]}}formatBytes(e){return e<1024?e+" B":e<1024*1024?(e/1024).toFixed(1)+" KB":(e/(1024*1024)).toFixed(2)+" MB"}};function $l(t){t.subscriptions.push(De.register(t)),t.subscriptions.push(cn.register(t)),t.subscriptions.push(dn.register(t)),t.subscriptions.push(X.commands.registerCommand("mdocx.createNew",async e=>{await Rl(e)}))}async function Rl(t){let e;t?(await X.workspace.fs.stat(t)).type===X.FileType.Directory?e=t:e=X.Uri.joinPath(t,".."):X.workspace.workspaceFolders?.[0]&&(e=X.workspace.workspaceFolders[0].uri);let n=await X.window.showInputBox({prompt:"Enter the name for the new MDOCX file",value:"document.mdocx",validateInput:i=>{if(!i||i.trim().length===0)return"File name cannot be empty";if(!i.endsWith(".mdocx"))return"File name must end with .mdocx"}});if(!n)return;let r=await X.window.showSaveDialog({defaultUri:e?X.Uri.joinPath(e,n):void 0,filters:{"MDOCX Files":["mdocx"]},saveLabel:"Create MDOCX"});if(r)try{let{writeMdocxAsync:i}=await Promise.resolve().then(()=>(ne(),te)),s={bundleVersion:1,files:[{path:"README.md",content:new TextEncoder().encode(`# New Document

Welcome to your new MDOCX document!

## Getting Started

Start editing this file or add more markdown files to build your document.
`)}],rootPath:"README.md"},l={bundleVersion:1,items:[]},d={title:n.replace(".mdocx",""),created:new Date().toISOString()},c=await i(s,l,{metadata:d,markdownCompression:"zip",mediaCompression:"zip"});await X.workspace.fs.writeFile(r,c),await X.commands.executeCommand("vscode.openWith",r,"mdocx.preview"),X.window.showInformationMessage(`Created MDOCX file: ${r.fsPath}`)}catch(i){let a=i instanceof Error?i.message:String(i);X.window.showErrorMessage(`Failed to create MDOCX file: ${a}`)}}function Pl(){}0&&(module.exports={activate,deactivate});
