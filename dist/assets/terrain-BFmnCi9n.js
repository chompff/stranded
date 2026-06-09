(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2021 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Wh="128",zd=0,ac=1,Od=2,Xh=1,qh=2,Ns=3,pr=0,st=1,ln=2,Yh=1,ks=0,Mn=1,Ht=2,lc=3,cc=4,Ud=5,Hi=100,Hd=101,Gd=102,hc=103,uc=104,kd=200,Vd=201,Wd=202,Xd=203,jh=204,Zh=205,qd=206,Yd=207,jd=208,Zd=209,Jd=210,Kd=0,Qd=1,$d=2,qa=3,ef=4,tf=5,nf=6,sf=7,Po=0,rf=1,of=2,Vs=0,af=1,Jh=2,lf=3,cf=4,hf=5,Kh=300,dl=301,fl=302,dc=303,fc=304,pl=306,ml=307,Zn=1e3,Nt=1001,wo=1002,St=1003,Ya=1004,ja=1005,Ft=1006,Qh=1007,mr=1008,gl=1009,uf=1010,df=1011,bo=1012,ff=1013,lo=1014,Hn=1015,So=1016,pf=1017,mf=1018,gf=1019,Ws=1020,xf=1021,qn=1022,$t=1023,vf=1024,yf=1025,Yi=1026,$s=1027,_f=1028,Mf=1029,wf=1030,bf=1031,Sf=1032,Tf=1033,pc=33776,mc=33777,gc=33778,xc=33779,vc=35840,yc=35841,_c=35842,Mc=35843,Ef=36196,wc=37492,bc=37496,Af=37808,Lf=37809,Cf=37810,Rf=37811,Pf=37812,If=37813,Df=37814,Nf=37815,Ff=37816,Bf=37817,zf=37818,Of=37819,Uf=37820,Hf=37821,Gf=36492,kf=37840,Vf=37841,Wf=37842,Xf=37843,qf=37844,Yf=37845,jf=37846,Zf=37847,Jf=37848,Kf=37849,Qf=37850,$f=37851,ep=37852,tp=37853,np=2200,ip=2201,sp=2202,er=2300,$i=2301,ra=2302,Gi=2400,ki=2401,To=2402,xl=2500,$h=2501,rp=0,op=1,eu=2,gr=3e3,tr=3001,ap=3007,lp=3002,cp=3003,hp=3004,up=3005,dp=3006,fp=3200,pp=3201,gi=0,mp=1,oa=7680,gp=519,nr=35044,Eo=35048,Sc="300 es";class xi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,e);e.target=null}}}const mt=[];for(let s=0;s<256;s++)mt[s]=(s<16?"0":"")+s.toString(16);let Tr=1234567;const Xs=Math.PI/180,ir=180/Math.PI;function Vt(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(mt[s&255]+mt[s>>8&255]+mt[s>>16&255]+mt[s>>24&255]+"-"+mt[e&255]+mt[e>>8&255]+"-"+mt[e>>16&15|64]+mt[e>>24&255]+"-"+mt[t&63|128]+mt[t>>8&255]+"-"+mt[t>>16&255]+mt[t>>24&255]+mt[n&255]+mt[n>>8&255]+mt[n>>16&255]+mt[n>>24&255]).toUpperCase()}function Dt(s,e,t){return Math.max(e,Math.min(t,s))}function vl(s,e){return(s%e+e)%e}function xp(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function vp(s,e,t){return s!==e?(t-s)/(e-s):0}function qs(s,e,t){return(1-t)*s+t*e}function yp(s,e,t,n){return qs(s,e,1-Math.exp(-t*n))}function _p(s,e=1){return e-Math.abs(vl(s,e*2)-e)}function Mp(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function wp(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function bp(s,e){return s+Math.floor(Math.random()*(e-s+1))}function Sp(s,e){return s+Math.random()*(e-s)}function Tp(s){return s*(.5-Math.random())}function Ep(s){return s!==void 0&&(Tr=s%2147483647),Tr=Tr*16807%2147483647,(Tr-1)/2147483646}function Ap(s){return s*Xs}function Lp(s){return s*ir}function Za(s){return(s&s-1)===0&&s!==0}function tu(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function nu(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Cp(s,e,t,n,i){const r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),d=o((e-n)/2),p=r((n-e)/2),m=o((n-e)/2);switch(i){case"XYX":s.set(a*h,l*u,l*d,a*c);break;case"YZY":s.set(l*d,a*h,l*u,a*c);break;case"ZXZ":s.set(l*u,l*d,a*h,a*c);break;case"XZX":s.set(a*h,l*m,l*p,a*c);break;case"YXY":s.set(l*p,a*h,l*m,a*c);break;case"ZYZ":s.set(l*m,l*p,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}var Rp=Object.freeze({__proto__:null,DEG2RAD:Xs,RAD2DEG:ir,generateUUID:Vt,clamp:Dt,euclideanModulo:vl,mapLinear:xp,inverseLerp:vp,lerp:qs,damp:yp,pingpong:_p,smoothstep:Mp,smootherstep:wp,randInt:bp,randFloat:Sp,randFloatSpread:Tp,seededRandom:Ep,degToRad:Ap,radToDeg:Lp,isPowerOfTwo:Za,ceilPowerOfTwo:tu,floorPowerOfTwo:nu,setQuaternionFromProperEuler:Cp});class Q{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e,t){return t!==void 0?(console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(e,t)):(this.x+=e.x,this.y+=e.y,this)}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e,t){return t!==void 0?(console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(e,t)):(this.x-=e.x,this.y-=e.y,this)}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t,n){return n!==void 0&&console.warn("THREE.Vector2: offset has been removed from .fromBufferAttribute()."),this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*i+e.x,this.y=r*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}}Q.prototype.isVector2=!0;class gt{constructor(){this.elements=[1,0,0,0,1,0,0,0,1],arguments.length>0&&console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.")}set(e,t,n,i,r,o,a,l,c){const h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],p=n[5],m=n[8],x=i[0],v=i[3],g=i[6],f=i[1],_=i[4],w=i[7],E=i[2],y=i[5],S=i[8];return r[0]=o*x+a*f+l*E,r[3]=o*v+a*_+l*y,r[6]=o*g+a*w+l*S,r[1]=c*x+h*f+u*E,r[4]=c*v+h*_+u*y,r[7]=c*g+h*w+u*S,r[2]=d*x+p*f+m*E,r[5]=d*v+p*_+m*y,r[8]=d*g+p*w+m*S,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*r*h+n*a*l+i*r*c-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,d=a*l-h*r,p=c*r-o*l,m=t*u+n*d+i*p;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/m;return e[0]=u*x,e[1]=(i*c-h*n)*x,e[2]=(a*n-i*o)*x,e[3]=d*x,e[4]=(h*t-i*l)*x,e[5]=(i*r-a*t)*x,e[6]=p*x,e[7]=(n*l-c*t)*x,e[8]=(o*t-n*r)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=t,n[4]*=t,n[7]*=t,this}rotate(e){const t=Math.cos(e),n=Math.sin(e),i=this.elements,r=i[0],o=i[3],a=i[6],l=i[1],c=i[4],h=i[7];return i[0]=t*r+n*l,i[3]=t*o+n*c,i[6]=t*a+n*h,i[1]=-n*r+t*l,i[4]=-n*o+t*c,i[7]=-n*a+t*h,this}translate(e,t){const n=this.elements;return n[0]+=e*n[2],n[3]+=e*n[5],n[6]+=e*n[8],n[1]+=t*n[2],n[4]+=t*n[5],n[7]+=t*n[8],this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}gt.prototype.isMatrix3=!0;let wi;class as{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{wi===void 0&&(wi=document.createElementNS("http://www.w3.org/1999/xhtml","canvas")),wi.width=e.width,wi.height=e.height;const n=wi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=wi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}}let Pp=0;class xt extends xi{constructor(e=xt.DEFAULT_IMAGE,t=xt.DEFAULT_MAPPING,n=Nt,i=Nt,r=Ft,o=mr,a=$t,l=gl,c=1,h=gr){super(),Object.defineProperty(this,"id",{value:Pp++}),this.uuid=Vt(),this.name="",this.image=e,this.mipmaps=[],this.mapping=t,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Q(0,0),this.repeat=new Q(1,1),this.center=new Q(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new gt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=h,this.version=0,this.onUpdate=null}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.image=e.image,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.encoding=e.encoding,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,mapping:this.mapping,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,type:this.type,encoding:this.encoding,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};if(this.image!==void 0){const i=this.image;if(i.uuid===void 0&&(i.uuid=Vt()),!t&&e.images[i.uuid]===void 0){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(aa(i[o].image)):r.push(aa(i[o]))}else r=aa(i);e.images[i.uuid]={uuid:i.uuid,url:r}}n.image=i.uuid}return t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Kh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Zn:e.x=e.x-Math.floor(e.x);break;case Nt:e.x=e.x<0?0:1;break;case wo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Zn:e.y=e.y-Math.floor(e.y);break;case Nt:e.y=e.y<0?0:1;break;case wo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&this.version++}}xt.DEFAULT_IMAGE=void 0;xt.DEFAULT_MAPPING=Kh;xt.prototype.isTexture=!0;function aa(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?as.getDataURL(s):s.data?{data:Array.prototype.slice.call(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}class qe{constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e,t){return t!==void 0?(console.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(e,t)):(this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this)}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e,t){return t!==void 0?(console.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(e,t)):(this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this)}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],p=l[5],m=l[9],x=l[2],v=l[6],g=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-x)<.01&&Math.abs(m-v)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+x)<.1&&Math.abs(m+v)<.1&&Math.abs(c+p+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const _=(c+1)/2,w=(p+1)/2,E=(g+1)/2,y=(h+d)/4,S=(u+x)/4,C=(m+v)/4;return _>w&&_>E?_<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(_),i=y/n,r=S/n):w>E?w<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(w),n=y/i,r=C/i):E<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(E),n=S/r,i=C/r),this.set(n,i,r,t),this}let f=Math.sqrt((v-m)*(v-m)+(u-x)*(u-x)+(d-h)*(d-h));return Math.abs(f)<.001&&(f=1),this.x=(v-m)/f,this.y=(u-x)/f,this.z=(d-h)/f,this.w=Math.acos((c+p+g-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t,n){return n!==void 0&&console.warn("THREE.Vector4: offset has been removed from .fromBufferAttribute()."),this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}}qe.prototype.isVector4=!0;class hi extends xi{constructor(e,t,n){super(),this.width=e,this.height=t,this.depth=1,this.scissor=new qe(0,0,e,t),this.scissorTest=!1,this.viewport=new qe(0,0,e,t),n=n||{},this.texture=new xt(void 0,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.encoding),this.texture.image={},this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=1,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:Ft,this.depthBuffer=n.depthBuffer!==void 0?n.depthBuffer:!0,this.stencilBuffer=n.stencilBuffer!==void 0?n.stencilBuffer:!1,this.depthTexture=n.depthTexture!==void 0?n.depthTexture:null}setTexture(e){e.image={width:this.width,height:this.height,depth:this.depth},this.texture=e}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.width=e.width,this.height=e.height,this.depth=e.depth,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.depthTexture=e.depthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}hi.prototype.isWebGLRenderTarget=!0;class Ip extends hi{constructor(e,t,n){super(e,t,n),this.samples=4}copy(e){return super.copy.call(this,e),this.samples=e.samples,this}}Ip.prototype.isWebGLMultisampleRenderTarget=!0;class Lt{constructor(e=0,t=0,n=0,i=1){this._x=e,this._y=t,this._z=n,this._w=i}static slerp(e,t,n,i){return console.warn("THREE.Quaternion: Static .slerp() has been deprecated. Use qm.slerpQuaternions( qa, qb, t ) instead."),n.slerpQuaternions(e,t,i)}static slerpFlat(e,t,n,i,r,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const d=r[o+0],p=r[o+1],m=r[o+2],x=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=p,e[t+2]=m,e[t+3]=x;return}if(u!==x||l!==d||c!==p||h!==m){let v=1-a;const g=l*d+c*p+h*m+u*x,f=g>=0?1:-1,_=1-g*g;if(_>Number.EPSILON){const E=Math.sqrt(_),y=Math.atan2(E,g*f);v=Math.sin(v*y)/E,a=Math.sin(a*y)/E}const w=a*f;if(l=l*v+d*w,c=c*v+p*w,h=h*v+m*w,u=u*v+x*w,v===1-a){const E=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=E,c*=E,h*=E,u*=E}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,o){const a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[o],d=r[o+1],p=r[o+2],m=r[o+3];return e[t]=a*m+h*u+l*p-c*d,e[t+1]=l*m+h*d+c*u-a*p,e[t+2]=c*m+h*p+a*d-l*u,e[t+3]=h*m-a*u-l*d-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t){if(!(e&&e.isEuler))throw new Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");const n=e._x,i=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(r/2),d=l(n/2),p=l(i/2),m=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*p*m,this._y=c*p*u-d*h*m,this._z=c*h*m+d*p*u,this._w=c*h*u-d*p*m;break;case"YXZ":this._x=d*h*u+c*p*m,this._y=c*p*u-d*h*m,this._z=c*h*m-d*p*u,this._w=c*h*u+d*p*m;break;case"ZXY":this._x=d*h*u-c*p*m,this._y=c*p*u+d*h*m,this._z=c*h*m+d*p*u,this._w=c*h*u-d*p*m;break;case"ZYX":this._x=d*h*u-c*p*m,this._y=c*p*u+d*h*m,this._z=c*h*m-d*p*u,this._w=c*h*u+d*p*m;break;case"YZX":this._x=d*h*u+c*p*m,this._y=c*p*u+d*h*m,this._z=c*h*m-d*p*u,this._w=c*h*u-d*p*m;break;case"XZY":this._x=d*h*u-c*p*m,this._y=c*p*u-d*h*m,this._z=c*h*m+d*p*u,this._w=c*h*u+d*p*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(o-i)*p}else if(n>a&&n>u){const p=2*Math.sqrt(1+n-a-u);this._w=(h-l)/p,this._x=.25*p,this._y=(i+o)/p,this._z=(r+c)/p}else if(a>u){const p=2*Math.sqrt(1+a-n-u);this._w=(r-c)/p,this._x=(i+o)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+u-n-a);this._w=(o-i)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Dt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e,t){return t!==void 0?(console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."),this.multiplyQuaternions(e,t)):this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+i*c-r*l,this._y=i*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*n+t*this._x,this._y=p*i+t*this._y,this._z=p*r+t*this._z,this.normalize(),this._onChangeCallback(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){this.copy(e).slerp(t,n)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}}Lt.prototype.isQuaternion=!0;class T{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e,t){return t!==void 0?(console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(e,t)):(this.x+=e.x,this.y+=e.y,this.z+=e.z,this)}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e,t){return t!==void 0?(console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(e,t)):(this.x-=e.x,this.y-=e.y,this.z-=e.z,this)}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e,t){return t!==void 0?(console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."),this.multiplyVectors(e,t)):(this.x*=e.x,this.y*=e.y,this.z*=e.z,this)}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return e&&e.isEuler||console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order."),this.applyQuaternion(Tc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Tc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=l*t+o*i-a*n,h=l*n+a*t-r*i,u=l*i+r*n-o*t,d=-r*t-o*n-a*i;return this.x=c*l+d*-r+h*-a-u*-o,this.y=h*l+d*-o+u*-r-c*-a,this.z=u*l+d*-a+c*-o-h*-r,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e,t){return t!==void 0?(console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."),this.crossVectors(e,t)):this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return la.copy(this).projectOnVector(e),this.sub(la)}reflect(e){return this.sub(la.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Dt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t,n){return n!==void 0&&console.warn("THREE.Vector3: offset has been removed from .fromBufferAttribute()."),this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}}T.prototype.isVector3=!0;const la=new T,Tc=new Lt;class Gt{constructor(e=new T(1/0,1/0,1/0),t=new T(-1/0,-1/0,-1/0)){this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){let t=1/0,n=1/0,i=1/0,r=-1/0,o=-1/0,a=-1/0;for(let l=0,c=e.length;l<c;l+=3){const h=e[l],u=e[l+1],d=e[l+2];h<t&&(t=h),u<n&&(n=u),d<i&&(i=d),h>r&&(r=h),u>o&&(o=u),d>a&&(a=d)}return this.min.set(t,n,i),this.max.set(r,o,a),this}setFromBufferAttribute(e){let t=1/0,n=1/0,i=1/0,r=-1/0,o=-1/0,a=-1/0;for(let l=0,c=e.count;l<c;l++){const h=e.getX(l),u=e.getY(l),d=e.getZ(l);h<t&&(t=h),u<n&&(n=u),d<i&&(i=d),h>r&&(r=h),u>o&&(o=u),d>a&&(a=d)}return this.min.set(t,n,i),this.max.set(r,o,a),this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=ws.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e){return this.makeEmpty(),this.expandByObject(e)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return e===void 0&&(console.warn("THREE.Box3: .getCenter() target is now required"),e=new T),this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return e===void 0&&(console.warn("THREE.Box3: .getSize() target is now required"),e=new T),this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e){e.updateWorldMatrix(!1,!1);const t=e.geometry;t!==void 0&&(t.boundingBox===null&&t.computeBoundingBox(),ca.copy(t.boundingBox),ca.applyMatrix4(e.matrixWorld),this.union(ca));const n=e.children;for(let i=0,r=n.length;i<r;i++)this.expandByObject(n[i]);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t===void 0&&(console.warn("THREE.Box3: .getParameter() target is now required"),t=new T),t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,ws),ws.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(bs),Er.subVectors(this.max,bs),bi.subVectors(e.a,bs),Si.subVectors(e.b,bs),Ti.subVectors(e.c,bs),Cn.subVectors(Si,bi),Rn.subVectors(Ti,Si),ei.subVectors(bi,Ti);let t=[0,-Cn.z,Cn.y,0,-Rn.z,Rn.y,0,-ei.z,ei.y,Cn.z,0,-Cn.x,Rn.z,0,-Rn.x,ei.z,0,-ei.x,-Cn.y,Cn.x,0,-Rn.y,Rn.x,0,-ei.y,ei.x,0];return!ha(t,bi,Si,Ti,Er)||(t=[1,0,0,0,1,0,0,0,1],!ha(t,bi,Si,Ti,Er))?!1:(Ar.crossVectors(Cn,Rn),t=[Ar.x,Ar.y,Ar.z],ha(t,bi,Si,Ti,Er))}clampPoint(e,t){return t===void 0&&(console.warn("THREE.Box3: .clampPoint() target is now required"),t=new T),t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return ws.copy(e).clamp(this.min,this.max).sub(e).length()}getBoundingSphere(e){return e===void 0&&console.error("THREE.Box3: .getBoundingSphere() target is now required"),this.getCenter(e.center),e.radius=this.getSize(ws).length()*.5,e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(dn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),dn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),dn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),dn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),dn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),dn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),dn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),dn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(dn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}Gt.prototype.isBox3=!0;const dn=[new T,new T,new T,new T,new T,new T,new T,new T],ws=new T,ca=new Gt,bi=new T,Si=new T,Ti=new T,Cn=new T,Rn=new T,ei=new T,bs=new T,Er=new T,Ar=new T,ti=new T;function ha(s,e,t,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){ti.fromArray(s,r);const a=i.x*Math.abs(ti.x)+i.y*Math.abs(ti.y)+i.z*Math.abs(ti.z),l=e.dot(ti),c=t.dot(ti),h=n.dot(ti);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const Dp=new Gt,Ec=new T,ua=new T,da=new T;class vi{constructor(e=new T,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Dp.setFromPoints(e).getCenter(n);let i=0;for(let r=0,o=e.length;r<o;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t===void 0&&(console.warn("THREE.Sphere: .clampPoint() target is now required"),t=new T),t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return e===void 0&&(console.warn("THREE.Sphere: .getBoundingBox() target is now required"),e=new Gt),this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){da.subVectors(e,this.center);const t=da.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.add(da.multiplyScalar(i/n)),this.radius+=i}return this}union(e){return ua.subVectors(e.center,this.center).normalize().multiplyScalar(e.radius),this.expandByPoint(Ec.copy(e.center).add(ua)),this.expandByPoint(Ec.copy(e.center).sub(ua)),this}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const fn=new T,fa=new T,Lr=new T,Pn=new T,pa=new T,Cr=new T,ma=new T;class yi{constructor(e=new T,t=new T(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t===void 0&&(console.warn("THREE.Ray: .at() target is now required"),t=new T),t.copy(this.direction).multiplyScalar(e).add(this.origin)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,fn)),this}closestPointToPoint(e,t){t===void 0&&(console.warn("THREE.Ray: .closestPointToPoint() target is now required"),t=new T),t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.direction).multiplyScalar(n).add(this.origin)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=fn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(fn.copy(this.direction).multiplyScalar(t).add(this.origin),fn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){fa.copy(e).add(t).multiplyScalar(.5),Lr.copy(t).sub(e).normalize(),Pn.copy(this.origin).sub(fa);const r=e.distanceTo(t)*.5,o=-this.direction.dot(Lr),a=Pn.dot(this.direction),l=-Pn.dot(Lr),c=Pn.lengthSq(),h=Math.abs(1-o*o);let u,d,p,m;if(h>0)if(u=o*l-a,d=o*a-l,m=r*h,u>=0)if(d>=-m)if(d<=m){const x=1/h;u*=x,d*=x,p=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*l)+c;else d<=-m?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),p=-u*u+d*(d+2*l)+c):d<=m?(u=0,d=Math.min(Math.max(-r,-l),r),p=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),p=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*l)+c;return n&&n.copy(this.direction).multiplyScalar(u).add(this.origin),i&&i.copy(Lr).multiplyScalar(d).add(fa),p}intersectSphere(e,t){fn.subVectors(e.center,this.origin);const n=fn.dot(this.direction),i=fn.dot(fn)-n*n,r=e.radius*e.radius;if(i>r)return null;const o=Math.sqrt(r-i),a=n-o,l=n+o;return a<0&&l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||r>i||((r>n||n!==n)&&(n=r),(o<i||i!==i)&&(i=o),u>=0?(a=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,fn)!==null}intersectTriangle(e,t,n,i,r){pa.subVectors(t,e),Cr.subVectors(n,e),ma.crossVectors(pa,Cr);let o=this.direction.dot(ma),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Pn.subVectors(this.origin,e);const l=a*this.direction.dot(Cr.crossVectors(Pn,Cr));if(l<0)return null;const c=a*this.direction.dot(pa.cross(Pn));if(c<0||l+c>o)return null;const h=-a*Pn.dot(ma);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ue{constructor(){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],arguments.length>0&&console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.")}set(e,t,n,i,r,o,a,l,c,h,u,d,p,m,x,v){const g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=i,g[1]=r,g[5]=o,g[9]=a,g[13]=l,g[2]=c,g[6]=h,g[10]=u,g[14]=d,g[3]=p,g[7]=m,g[11]=x,g[15]=v,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ue().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Ei.setFromMatrixColumn(e,0).length(),r=1/Ei.setFromMatrixColumn(e,1).length(),o=1/Ei.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){e&&e.isEuler||console.error("THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");const t=this.elements,n=e.x,i=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const d=o*h,p=o*u,m=a*h,x=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=p+m*c,t[5]=d-x*c,t[9]=-a*l,t[2]=x-d*c,t[6]=m+p*c,t[10]=o*l}else if(e.order==="YXZ"){const d=l*h,p=l*u,m=c*h,x=c*u;t[0]=d+x*a,t[4]=m*a-p,t[8]=o*c,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=p*a-m,t[6]=x+d*a,t[10]=o*l}else if(e.order==="ZXY"){const d=l*h,p=l*u,m=c*h,x=c*u;t[0]=d-x*a,t[4]=-o*u,t[8]=m+p*a,t[1]=p+m*a,t[5]=o*h,t[9]=x-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const d=o*h,p=o*u,m=a*h,x=a*u;t[0]=l*h,t[4]=m*c-p,t[8]=d*c+x,t[1]=l*u,t[5]=x*c+d,t[9]=p*c-m,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const d=o*l,p=o*c,m=a*l,x=a*c;t[0]=l*h,t[4]=x-d*u,t[8]=m*u+p,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=p*u+m,t[10]=d-x*u}else if(e.order==="XZY"){const d=o*l,p=o*c,m=a*l,x=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+x,t[5]=o*h,t[9]=p*u-m,t[2]=m*u-p,t[6]=a*h,t[10]=x*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Np,e,Fp)}lookAt(e,t,n){const i=this.elements;return Bt.subVectors(e,t),Bt.lengthSq()===0&&(Bt.z=1),Bt.normalize(),In.crossVectors(n,Bt),In.lengthSq()===0&&(Math.abs(n.z)===1?Bt.x+=1e-4:Bt.z+=1e-4,Bt.normalize(),In.crossVectors(n,Bt)),In.normalize(),Rr.crossVectors(Bt,In),i[0]=In.x,i[4]=Rr.x,i[8]=Bt.x,i[1]=In.y,i[5]=Rr.y,i[9]=Bt.y,i[2]=In.z,i[6]=Rr.z,i[10]=Bt.z,this}multiply(e,t){return t!==void 0?(console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."),this.multiplyMatrices(e,t)):this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],p=n[13],m=n[2],x=n[6],v=n[10],g=n[14],f=n[3],_=n[7],w=n[11],E=n[15],y=i[0],S=i[4],C=i[8],I=i[12],B=i[1],U=i[5],z=i[9],L=i[13],D=i[2],N=i[6],R=i[10],X=i[14],K=i[3],Z=i[7],ee=i[11],re=i[15];return r[0]=o*y+a*B+l*D+c*K,r[4]=o*S+a*U+l*N+c*Z,r[8]=o*C+a*z+l*R+c*ee,r[12]=o*I+a*L+l*X+c*re,r[1]=h*y+u*B+d*D+p*K,r[5]=h*S+u*U+d*N+p*Z,r[9]=h*C+u*z+d*R+p*ee,r[13]=h*I+u*L+d*X+p*re,r[2]=m*y+x*B+v*D+g*K,r[6]=m*S+x*U+v*N+g*Z,r[10]=m*C+x*z+v*R+g*ee,r[14]=m*I+x*L+v*X+g*re,r[3]=f*y+_*B+w*D+E*K,r[7]=f*S+_*U+w*N+E*Z,r[11]=f*C+_*z+w*R+E*ee,r[15]=f*I+_*L+w*X+E*re,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],p=e[14],m=e[3],x=e[7],v=e[11],g=e[15];return m*(+r*l*u-i*c*u-r*a*d+n*c*d+i*a*p-n*l*p)+x*(+t*l*p-t*c*d+r*o*d-i*o*p+i*c*h-r*l*h)+v*(+t*c*u-t*a*p-r*o*u+n*o*p+r*a*h-n*c*h)+g*(-i*a*h-t*l*u+t*a*d+i*o*u-n*o*d+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],p=e[11],m=e[12],x=e[13],v=e[14],g=e[15],f=u*v*c-x*d*c+x*l*p-a*v*p-u*l*g+a*d*g,_=m*d*c-h*v*c-m*l*p+o*v*p+h*l*g-o*d*g,w=h*x*c-m*u*c+m*a*p-o*x*p-h*a*g+o*u*g,E=m*u*l-h*x*l-m*a*d+o*x*d+h*a*v-o*u*v,y=t*f+n*_+i*w+r*E;if(y===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const S=1/y;return e[0]=f*S,e[1]=(x*d*r-u*v*r-x*i*p+n*v*p+u*i*g-n*d*g)*S,e[2]=(a*v*r-x*l*r+x*i*c-n*v*c-a*i*g+n*l*g)*S,e[3]=(u*l*r-a*d*r-u*i*c+n*d*c+a*i*p-n*l*p)*S,e[4]=_*S,e[5]=(h*v*r-m*d*r+m*i*p-t*v*p-h*i*g+t*d*g)*S,e[6]=(m*l*r-o*v*r-m*i*c+t*v*c+o*i*g-t*l*g)*S,e[7]=(o*d*r-h*l*r+h*i*c-t*d*c-o*i*p+t*l*p)*S,e[8]=w*S,e[9]=(m*u*r-h*x*r-m*n*p+t*x*p+h*n*g-t*u*g)*S,e[10]=(o*x*r-m*a*r+m*n*c-t*x*c-o*n*g+t*a*g)*S,e[11]=(h*a*r-o*u*r-h*n*c+t*u*c+o*n*p-t*a*p)*S,e[12]=E*S,e[13]=(h*x*i-m*u*i+m*n*d-t*x*d-h*n*v+t*u*v)*S,e[14]=(m*a*i-o*x*i-m*n*l+t*x*l+o*n*v-t*a*v)*S,e[15]=(o*u*i-h*a*i+h*n*l-t*u*l-o*n*d+t*a*d)*S,this}scale(e){const t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n){return this.set(1,t,n,0,e,1,n,0,e,t,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,u=a+a,d=r*c,p=r*h,m=r*u,x=o*h,v=o*u,g=a*u,f=l*c,_=l*h,w=l*u,E=n.x,y=n.y,S=n.z;return i[0]=(1-(x+g))*E,i[1]=(p+w)*E,i[2]=(m-_)*E,i[3]=0,i[4]=(p-w)*y,i[5]=(1-(d+g))*y,i[6]=(v+f)*y,i[7]=0,i[8]=(m+_)*S,i[9]=(v-f)*S,i[10]=(1-(d+x))*S,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let r=Ei.set(i[0],i[1],i[2]).length();const o=Ei.set(i[4],i[5],i[6]).length(),a=Ei.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],Yt.copy(this);const c=1/r,h=1/o,u=1/a;return Yt.elements[0]*=c,Yt.elements[1]*=c,Yt.elements[2]*=c,Yt.elements[4]*=h,Yt.elements[5]*=h,Yt.elements[6]*=h,Yt.elements[8]*=u,Yt.elements[9]*=u,Yt.elements[10]*=u,t.setFromRotationMatrix(Yt),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,i,r,o){o===void 0&&console.warn("THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.");const a=this.elements,l=2*r/(t-e),c=2*r/(n-i),h=(t+e)/(t-e),u=(n+i)/(n-i),d=-(o+r)/(o-r),p=-2*o*r/(o-r);return a[0]=l,a[4]=0,a[8]=h,a[12]=0,a[1]=0,a[5]=c,a[9]=u,a[13]=0,a[2]=0,a[6]=0,a[10]=d,a[14]=p,a[3]=0,a[7]=0,a[11]=-1,a[15]=0,this}makeOrthographic(e,t,n,i,r,o){const a=this.elements,l=1/(t-e),c=1/(n-i),h=1/(o-r),u=(t+e)*l,d=(n+i)*c,p=(o+r)*h;return a[0]=2*l,a[4]=0,a[8]=0,a[12]=-u,a[1]=0,a[5]=2*c,a[9]=0,a[13]=-d,a[2]=0,a[6]=0,a[10]=-2*h,a[14]=-p,a[3]=0,a[7]=0,a[11]=0,a[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}ue.prototype.isMatrix4=!0;const Ei=new T,Yt=new ue,Np=new T(0,0,0),Fp=new T(1,1,1),In=new T,Rr=new T,Bt=new T,Ac=new ue,Lc=new Lt;class ls{constructor(e=0,t=0,n=0,i=ls.DefaultOrder){this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._order=i||this._order,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t,n){const i=e.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],p=i[10];switch(t=t||this._order,t){case"XYZ":this._y=Math.asin(Dt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Dt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Dt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Dt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Dt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Dt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n!==!1&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ac.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ac,t,n)}setFromVector3(e,t){return this.set(e.x,e.y,e.z,t||this._order)}reorder(e){return Lc.setFromEuler(this),this.setFromQuaternion(Lc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}toVector3(e){return e?e.set(this._x,this._y,this._z):new T(this._x,this._y,this._z)}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}}ls.prototype.isEuler=!0;ls.DefaultOrder="XYZ";ls.RotationOrders=["XYZ","YZX","ZXY","XZY","YXZ","ZYX"];class iu{constructor(){this.mask=1}set(e){this.mask=1<<e|0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}}let Bp=0;const Cc=new T,Ai=new Lt,pn=new ue,Pr=new T,Ss=new T,zp=new T,Op=new Lt,Rc=new T(1,0,0),Pc=new T(0,1,0),Ic=new T(0,0,1),Up={type:"added"},Dc={type:"removed"};class ke extends xi{constructor(){super(),Object.defineProperty(this,"id",{value:Bp++}),this.uuid=Vt(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ke.DefaultUp.clone();const e=new T,t=new ls,n=new Lt,i=new T(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ue},normalMatrix:{value:new gt}}),this.matrix=new ue,this.matrixWorld=new ue,this.matrixAutoUpdate=ke.DefaultMatrixAutoUpdate,this.matrixWorldNeedsUpdate=!1,this.layers=new iu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ai.setFromAxisAngle(e,t),this.quaternion.multiply(Ai),this}rotateOnWorldAxis(e,t){return Ai.setFromAxisAngle(e,t),this.quaternion.premultiply(Ai),this}rotateX(e){return this.rotateOnAxis(Rc,e)}rotateY(e){return this.rotateOnAxis(Pc,e)}rotateZ(e){return this.rotateOnAxis(Ic,e)}translateOnAxis(e,t){return Cc.copy(e).applyQuaternion(this.quaternion),this.position.add(Cc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Rc,e)}translateY(e){return this.translateOnAxis(Pc,e)}translateZ(e){return this.translateOnAxis(Ic,e)}localToWorld(e){return e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return e.applyMatrix4(pn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Pr.copy(e):Pr.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Ss.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pn.lookAt(Ss,Pr,this.up):pn.lookAt(Pr,Ss,this.up),this.quaternion.setFromRotationMatrix(pn),i&&(pn.extractRotation(i.matrixWorld),Ai.setFromRotationMatrix(pn),this.quaternion.premultiply(Ai.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Up)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Dc)),this}clear(){for(let e=0;e<this.children.length;e++){const t=this.children[e];t.parent=null,t.dispatchEvent(Dc)}return this.children.length=0,this}attach(e){return this.updateWorldMatrix(!0,!1),pn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),pn.multiply(e.parent.matrixWorld)),e.applyMatrix4(pn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getWorldPosition(e){return e===void 0&&(console.warn("THREE.Object3D: .getWorldPosition() target is now required"),e=new T),this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return e===void 0&&(console.warn("THREE.Object3D: .getWorldQuaternion() target is now required"),e=new Lt),this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ss,e,zp),e}getWorldScale(e){return e===void 0&&(console.warn("THREE.Object3D: .getWorldScale() target is now required"),e=new T),this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ss,Op,e),e}getWorldDirection(e){e===void 0&&(console.warn("THREE.Object3D: .getWorldDirection() target is now required"),e=new T),this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{}},n.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),JSON.stringify(this.userData)!=="{}"&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),p=o(e.animations);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p)}return n.object=i,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}ke.DefaultUp=new T(0,1,0);ke.DefaultMatrixAutoUpdate=!0;ke.prototype.isObject3D=!0;const ga=new T,Hp=new T,Gp=new gt;class kt{constructor(e=new T(1,0,0),t=0){this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=ga.subVectors(n,t).cross(Hp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t===void 0&&(console.warn("THREE.Plane: .projectPoint() target is now required"),t=new T),t.copy(this.normal).multiplyScalar(-this.distanceToPoint(e)).add(e)}intersectLine(e,t){t===void 0&&(console.warn("THREE.Plane: .intersectLine() target is now required"),t=new T);const n=e.delta(ga),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(n).multiplyScalar(r).add(e.start)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e===void 0&&(console.warn("THREE.Plane: .coplanarPoint() target is now required"),e=new T),e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Gp.getNormalMatrix(e),i=this.coplanarPoint(ga).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}kt.prototype.isPlane=!0;const jt=new T,mn=new T,xa=new T,gn=new T,Li=new T,Ci=new T,Nc=new T,va=new T,ya=new T,_a=new T;class ft{constructor(e=new T,t=new T,n=new T){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i===void 0&&(console.warn("THREE.Triangle: .getNormal() target is now required"),i=new T),i.subVectors(n,t),jt.subVectors(e,t),i.cross(jt);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){jt.subVectors(i,t),mn.subVectors(n,t),xa.subVectors(e,t);const o=jt.dot(jt),a=jt.dot(mn),l=jt.dot(xa),c=mn.dot(mn),h=mn.dot(xa),u=o*c-a*a;if(r===void 0&&(console.warn("THREE.Triangle: .getBarycoord() target is now required"),r=new T),u===0)return r.set(-2,-1,-1);const d=1/u,p=(c*l-a*h)*d,m=(o*h-a*l)*d;return r.set(1-p-m,m,p)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,gn),gn.x>=0&&gn.y>=0&&gn.x+gn.y<=1}static getUV(e,t,n,i,r,o,a,l){return this.getBarycoord(e,t,n,i,gn),l.set(0,0),l.addScaledVector(r,gn.x),l.addScaledVector(o,gn.y),l.addScaledVector(a,gn.z),l}static isFrontFacing(e,t,n,i){return jt.subVectors(n,t),mn.subVectors(e,t),jt.cross(mn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return jt.subVectors(this.c,this.b),mn.subVectors(this.a,this.b),jt.cross(mn).length()*.5}getMidpoint(e){return e===void 0&&(console.warn("THREE.Triangle: .getMidpoint() target is now required"),e=new T),e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ft.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e===void 0&&(console.warn("THREE.Triangle: .getPlane() target is now required"),e=new kt),e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return ft.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,i,r){return ft.getUV(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return ft.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ft.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){t===void 0&&(console.warn("THREE.Triangle: .closestPointToPoint() target is now required"),t=new T);const n=this.a,i=this.b,r=this.c;let o,a;Li.subVectors(i,n),Ci.subVectors(r,n),va.subVectors(e,n);const l=Li.dot(va),c=Ci.dot(va);if(l<=0&&c<=0)return t.copy(n);ya.subVectors(e,i);const h=Li.dot(ya),u=Ci.dot(ya);if(h>=0&&u<=h)return t.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(Li,o);_a.subVectors(e,r);const p=Li.dot(_a),m=Ci.dot(_a);if(m>=0&&p<=m)return t.copy(r);const x=p*c-l*m;if(x<=0&&c>=0&&m<=0)return a=c/(c-m),t.copy(n).addScaledVector(Ci,a);const v=h*m-p*u;if(v<=0&&u-h>=0&&p-m>=0)return Nc.subVectors(r,i),a=(u-h)/(u-h+(p-m)),t.copy(i).addScaledVector(Nc,a);const g=1/(v+x+d);return o=x*g,a=d*g,t.copy(n).addScaledVector(Li,o).addScaledVector(Ci,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}let kp=0;function ht(){Object.defineProperty(this,"id",{value:kp++}),this.uuid=Vt(),this.name="",this.type="Material",this.fog=!0,this.blending=Mn,this.side=pr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=jh,this.blendDst=Zh,this.blendEquation=Hi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=qa,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=gp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=oa,this.stencilZFail=oa,this.stencilZPass=oa,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaTest=0,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0}ht.prototype=Object.assign(Object.create(xi.prototype),{constructor:ht,isMaterial:!0,onBuild:function(){},onBeforeCompile:function(){},customProgramCacheKey:function(){return this.onBeforeCompile.toString()},setValues:function(s){if(s!==void 0)for(const e in s){const t=s[e];if(t===void 0){console.warn("THREE.Material: '"+e+"' parameter is undefined.");continue}if(e==="shading"){console.warn("THREE."+this.type+": .shading has been removed. Use the boolean .flatShading instead."),this.flatShading=t===Yh;continue}const n=this[e];if(n===void 0){console.warn("THREE."+this.type+": '"+e+"' is not a property of this material.");continue}n&&n.isColor?n.set(t):n&&n.isVector3&&t&&t.isVector3?n.copy(t):this[e]=t}},toJSON:function(s){const e=s===void 0||typeof s=="string";e&&(s={textures:{},images:{}});const t={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),this.color&&this.color.isColor&&(t.color=this.color.getHex()),this.roughness!==void 0&&(t.roughness=this.roughness),this.metalness!==void 0&&(t.metalness=this.metalness),this.sheen&&this.sheen.isColor&&(t.sheen=this.sheen.getHex()),this.emissive&&this.emissive.isColor&&(t.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(t.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(t.specular=this.specular.getHex()),this.shininess!==void 0&&(t.shininess=this.shininess),this.clearcoat!==void 0&&(t.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(t.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(t.clearcoatMap=this.clearcoatMap.toJSON(s).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(t.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(s).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(t.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(s).uuid,t.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.map&&this.map.isTexture&&(t.map=this.map.toJSON(s).uuid),this.matcap&&this.matcap.isTexture&&(t.matcap=this.matcap.toJSON(s).uuid),this.alphaMap&&this.alphaMap.isTexture&&(t.alphaMap=this.alphaMap.toJSON(s).uuid),this.lightMap&&this.lightMap.isTexture&&(t.lightMap=this.lightMap.toJSON(s).uuid,t.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(t.aoMap=this.aoMap.toJSON(s).uuid,t.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(t.bumpMap=this.bumpMap.toJSON(s).uuid,t.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(t.normalMap=this.normalMap.toJSON(s).uuid,t.normalMapType=this.normalMapType,t.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(t.displacementMap=this.displacementMap.toJSON(s).uuid,t.displacementScale=this.displacementScale,t.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(t.roughnessMap=this.roughnessMap.toJSON(s).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(t.metalnessMap=this.metalnessMap.toJSON(s).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(t.emissiveMap=this.emissiveMap.toJSON(s).uuid),this.specularMap&&this.specularMap.isTexture&&(t.specularMap=this.specularMap.toJSON(s).uuid),this.envMap&&this.envMap.isTexture&&(t.envMap=this.envMap.toJSON(s).uuid,this.combine!==void 0&&(t.combine=this.combine)),this.envMapIntensity!==void 0&&(t.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(t.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(t.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(t.gradientMap=this.gradientMap.toJSON(s).uuid),this.size!==void 0&&(t.size=this.size),this.shadowSide!==null&&(t.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(t.sizeAttenuation=this.sizeAttenuation),this.blending!==Mn&&(t.blending=this.blending),this.side!==pr&&(t.side=this.side),this.vertexColors&&(t.vertexColors=!0),this.opacity<1&&(t.opacity=this.opacity),this.transparent===!0&&(t.transparent=this.transparent),t.depthFunc=this.depthFunc,t.depthTest=this.depthTest,t.depthWrite=this.depthWrite,t.colorWrite=this.colorWrite,t.stencilWrite=this.stencilWrite,t.stencilWriteMask=this.stencilWriteMask,t.stencilFunc=this.stencilFunc,t.stencilRef=this.stencilRef,t.stencilFuncMask=this.stencilFuncMask,t.stencilFail=this.stencilFail,t.stencilZFail=this.stencilZFail,t.stencilZPass=this.stencilZPass,this.rotation&&this.rotation!==0&&(t.rotation=this.rotation),this.polygonOffset===!0&&(t.polygonOffset=!0),this.polygonOffsetFactor!==0&&(t.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(t.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth&&this.linewidth!==1&&(t.linewidth=this.linewidth),this.dashSize!==void 0&&(t.dashSize=this.dashSize),this.gapSize!==void 0&&(t.gapSize=this.gapSize),this.scale!==void 0&&(t.scale=this.scale),this.dithering===!0&&(t.dithering=!0),this.alphaTest>0&&(t.alphaTest=this.alphaTest),this.alphaToCoverage===!0&&(t.alphaToCoverage=this.alphaToCoverage),this.premultipliedAlpha===!0&&(t.premultipliedAlpha=this.premultipliedAlpha),this.wireframe===!0&&(t.wireframe=this.wireframe),this.wireframeLinewidth>1&&(t.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(t.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(t.wireframeLinejoin=this.wireframeLinejoin),this.morphTargets===!0&&(t.morphTargets=!0),this.morphNormals===!0&&(t.morphNormals=!0),this.skinning===!0&&(t.skinning=!0),this.flatShading===!0&&(t.flatShading=this.flatShading),this.visible===!1&&(t.visible=!1),this.toneMapped===!1&&(t.toneMapped=!1),JSON.stringify(this.userData)!=="{}"&&(t.userData=this.userData);function n(i){const r=[];for(const o in i){const a=i[o];delete a.metadata,r.push(a)}return r}if(e){const i=n(s.textures),r=n(s.images);i.length>0&&(t.textures=i),r.length>0&&(t.images=r)}return t},clone:function(){return new this.constructor().copy(this)},copy:function(s){this.name=s.name,this.fog=s.fog,this.blending=s.blending,this.side=s.side,this.vertexColors=s.vertexColors,this.opacity=s.opacity,this.transparent=s.transparent,this.blendSrc=s.blendSrc,this.blendDst=s.blendDst,this.blendEquation=s.blendEquation,this.blendSrcAlpha=s.blendSrcAlpha,this.blendDstAlpha=s.blendDstAlpha,this.blendEquationAlpha=s.blendEquationAlpha,this.depthFunc=s.depthFunc,this.depthTest=s.depthTest,this.depthWrite=s.depthWrite,this.stencilWriteMask=s.stencilWriteMask,this.stencilFunc=s.stencilFunc,this.stencilRef=s.stencilRef,this.stencilFuncMask=s.stencilFuncMask,this.stencilFail=s.stencilFail,this.stencilZFail=s.stencilZFail,this.stencilZPass=s.stencilZPass,this.stencilWrite=s.stencilWrite;const e=s.clippingPlanes;let t=null;if(e!==null){const n=e.length;t=new Array(n);for(let i=0;i!==n;++i)t[i]=e[i].clone()}return this.clippingPlanes=t,this.clipIntersection=s.clipIntersection,this.clipShadows=s.clipShadows,this.shadowSide=s.shadowSide,this.colorWrite=s.colorWrite,this.precision=s.precision,this.polygonOffset=s.polygonOffset,this.polygonOffsetFactor=s.polygonOffsetFactor,this.polygonOffsetUnits=s.polygonOffsetUnits,this.dithering=s.dithering,this.alphaTest=s.alphaTest,this.alphaToCoverage=s.alphaToCoverage,this.premultipliedAlpha=s.premultipliedAlpha,this.visible=s.visible,this.toneMapped=s.toneMapped,this.userData=JSON.parse(JSON.stringify(s.userData)),this},dispose:function(){this.dispatchEvent({type:"dispose"})}});Object.defineProperty(ht.prototype,"needsUpdate",{set:function(s){s===!0&&this.version++}});const su={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Zt={h:0,s:0,l:0},Ir={h:0,s:0,l:0};function Ma(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}function wa(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function ba(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}class le{constructor(e,t,n){return t===void 0&&n===void 0?this.set(e):this.setRGB(e,t,n)}set(e){return e&&e.isColor?this.copy(e):typeof e=="number"?this.setHex(e):typeof e=="string"&&this.setStyle(e),this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,this}setRGB(e,t,n){return this.r=e,this.g=t,this.b=n,this}setHSL(e,t,n){if(e=vl(e,1),t=Dt(t,0,1),n=Dt(n,0,1),t===0)this.r=this.g=this.b=n;else{const i=n<=.5?n*(1+t):n+t-n*t,r=2*n-i;this.r=Ma(r,i,e+1/3),this.g=Ma(r,i,e),this.b=Ma(r,i,e-1/3)}return this}setStyle(e){function t(i){i!==void 0&&parseFloat(i)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let n;if(n=/^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(e)){let i;const r=n[1],o=n[2];switch(r){case"rgb":case"rgba":if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return this.r=Math.min(255,parseInt(i[1],10))/255,this.g=Math.min(255,parseInt(i[2],10))/255,this.b=Math.min(255,parseInt(i[3],10))/255,t(i[4]),this;if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return this.r=Math.min(100,parseInt(i[1],10))/100,this.g=Math.min(100,parseInt(i[2],10))/100,this.b=Math.min(100,parseInt(i[3],10))/100,t(i[4]),this;break;case"hsl":case"hsla":if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)){const a=parseFloat(i[1])/360,l=parseInt(i[2],10)/100,c=parseInt(i[3],10)/100;return t(i[4]),this.setHSL(a,l,c)}break}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(e)){const i=n[1],r=i.length;if(r===3)return this.r=parseInt(i.charAt(0)+i.charAt(0),16)/255,this.g=parseInt(i.charAt(1)+i.charAt(1),16)/255,this.b=parseInt(i.charAt(2)+i.charAt(2),16)/255,this;if(r===6)return this.r=parseInt(i.charAt(0)+i.charAt(1),16)/255,this.g=parseInt(i.charAt(2)+i.charAt(3),16)/255,this.b=parseInt(i.charAt(4)+i.charAt(5),16)/255,this}return e&&e.length>0?this.setColorName(e):this}setColorName(e){const t=su[e.toLowerCase()];return t!==void 0?this.setHex(t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copyGammaToLinear(e,t=2){return this.r=Math.pow(e.r,t),this.g=Math.pow(e.g,t),this.b=Math.pow(e.b,t),this}copyLinearToGamma(e,t=2){const n=t>0?1/t:1;return this.r=Math.pow(e.r,n),this.g=Math.pow(e.g,n),this.b=Math.pow(e.b,n),this}convertGammaToLinear(e){return this.copyGammaToLinear(this,e),this}convertLinearToGamma(e){return this.copyLinearToGamma(this,e),this}copySRGBToLinear(e){return this.r=wa(e.r),this.g=wa(e.g),this.b=wa(e.b),this}copyLinearToSRGB(e){return this.r=ba(e.r),this.g=ba(e.g),this.b=ba(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(){return this.r*255<<16^this.g*255<<8^this.b*255<<0}getHexString(){return("000000"+this.getHex().toString(16)).slice(-6)}getHSL(e){e===void 0&&(console.warn("THREE.Color: .getHSL() target is now required"),e={h:0,s:0,l:0});const t=this.r,n=this.g,i=this.b,r=Math.max(t,n,i),o=Math.min(t,n,i);let a,l;const c=(o+r)/2;if(o===r)a=0,l=0;else{const h=r-o;switch(l=c<=.5?h/(r+o):h/(2-r-o),r){case t:a=(n-i)/h+(n<i?6:0);break;case n:a=(i-t)/h+2;break;case i:a=(t-n)/h+4;break}a/=6}return e.h=a,e.s=l,e.l=c,e}getStyle(){return"rgb("+(this.r*255|0)+","+(this.g*255|0)+","+(this.b*255|0)+")"}offsetHSL(e,t,n){return this.getHSL(Zt),Zt.h+=e,Zt.s+=t,Zt.l+=n,this.setHSL(Zt.h,Zt.s,Zt.l),this}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Zt),e.getHSL(Ir);const n=qs(Zt.h,Ir.h,t),i=qs(Zt.s,Ir.s,t),r=qs(Zt.l,Ir.l,t);return this.setHSL(n,i,r),this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),e.normalized===!0&&(this.r/=255,this.g/=255,this.b/=255),this}toJSON(){return this.getHex()}}le.NAMES=su;le.prototype.isColor=!0;le.prototype.r=1;le.prototype.g=1;le.prototype.b=1;class Ut extends ht{constructor(e){super(),this.type="MeshBasicMaterial",this.color=new le(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Po,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this}}Ut.prototype.isMeshBasicMaterial=!0;const Ke=new T,Dr=new Q;class Le{constructor(e,t,n){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n===!0,this.usage=nr,this.updateRange={offset:0,count:-1},this.version=0,this.onUploadCallback=function(){}}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}copyColorsArray(e){const t=this.array;let n=0;for(let i=0,r=e.length;i<r;i++){let o=e[i];o===void 0&&(console.warn("THREE.BufferAttribute.copyColorsArray(): color is undefined",i),o=new le),t[n++]=o.r,t[n++]=o.g,t[n++]=o.b}return this}copyVector2sArray(e){const t=this.array;let n=0;for(let i=0,r=e.length;i<r;i++){let o=e[i];o===void 0&&(console.warn("THREE.BufferAttribute.copyVector2sArray(): vector is undefined",i),o=new Q),t[n++]=o.x,t[n++]=o.y}return this}copyVector3sArray(e){const t=this.array;let n=0;for(let i=0,r=e.length;i<r;i++){let o=e[i];o===void 0&&(console.warn("THREE.BufferAttribute.copyVector3sArray(): vector is undefined",i),o=new T),t[n++]=o.x,t[n++]=o.y,t[n++]=o.z}return this}copyVector4sArray(e){const t=this.array;let n=0;for(let i=0,r=e.length;i<r;i++){let o=e[i];o===void 0&&(console.warn("THREE.BufferAttribute.copyVector4sArray(): vector is undefined",i),o=new qe),t[n++]=o.x,t[n++]=o.y,t[n++]=o.z,t[n++]=o.w}return this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Dr.fromBufferAttribute(this,t),Dr.applyMatrix3(e),this.setXY(t,Dr.x,Dr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ke.fromBufferAttribute(this,t),Ke.applyMatrix3(e),this.setXYZ(t,Ke.x,Ke.y,Ke.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ke.x=this.getX(t),Ke.y=this.getY(t),Ke.z=this.getZ(t),Ke.applyMatrix4(e),this.setXYZ(t,Ke.x,Ke.y,Ke.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ke.x=this.getX(t),Ke.y=this.getY(t),Ke.z=this.getZ(t),Ke.applyNormalMatrix(e),this.setXYZ(t,Ke.x,Ke.y,Ke.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ke.x=this.getX(t),Ke.y=this.getY(t),Ke.z=this.getZ(t),Ke.transformDirection(e),this.setXYZ(t,Ke.x,Ke.y,Ke.z);return this}set(e,t=0){return this.array.set(e,t),this}getX(e){return this.array[e*this.itemSize]}setX(e,t){return this.array[e*this.itemSize]=t,this}getY(e){return this.array[e*this.itemSize+1]}setY(e,t){return this.array[e*this.itemSize+1]=t,this}getZ(e){return this.array[e*this.itemSize+2]}setZ(e,t){return this.array[e*this.itemSize+2]=t,this}getW(e){return this.array[e*this.itemSize+3]}setW(e,t){return this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.prototype.slice.call(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==nr&&(e.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(e.updateRange=this.updateRange),e}}Le.prototype.isBufferAttribute=!0;class ru extends Le{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class ou extends Le{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Vp extends Le{constructor(e,t,n){super(new Uint16Array(e),t,n)}}Vp.prototype.isFloat16BufferAttribute=!0;class Je extends Le{constructor(e,t,n){super(new Float32Array(e),t,n)}}function au(s){if(s.length===0)return-1/0;let e=s[0];for(let t=1,n=s.length;t<n;++t)s[t]>e&&(e=s[t]);return e}let Wp=0;const en=new ue,Sa=new ke,Ri=new T,zt=new Gt,Ts=new Gt,pt=new T;class Be extends xi{constructor(){super(),Object.defineProperty(this,"id",{value:Wp++}),this.uuid=Vt(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(au(e)>65535?ou:ru)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new gt().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}rotateX(e){return en.makeRotationX(e),this.applyMatrix4(en),this}rotateY(e){return en.makeRotationY(e),this.applyMatrix4(en),this}rotateZ(e){return en.makeRotationZ(e),this.applyMatrix4(en),this}translate(e,t,n){return en.makeTranslation(e,t,n),this.applyMatrix4(en),this}scale(e,t,n){return en.makeScale(e,t,n),this.applyMatrix4(en),this}lookAt(e){return Sa.lookAt(e),Sa.updateMatrix(),this.applyMatrix4(Sa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ri).negate(),this.translate(Ri.x,Ri.y,Ri.z),this}setFromPoints(e){const t=[];for(let n=0,i=e.length;n<i;n++){const r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Je(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Gt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new T(-1/0,-1/0,-1/0),new T(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];zt.setFromBufferAttribute(r),this.morphTargetsRelative?(pt.addVectors(this.boundingBox.min,zt.min),this.boundingBox.expandByPoint(pt),pt.addVectors(this.boundingBox.max,zt.max),this.boundingBox.expandByPoint(pt)):(this.boundingBox.expandByPoint(zt.min),this.boundingBox.expandByPoint(zt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new vi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new T,1/0);return}if(e){const n=this.boundingSphere.center;if(zt.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];Ts.setFromBufferAttribute(a),this.morphTargetsRelative?(pt.addVectors(zt.min,Ts.min),zt.expandByPoint(pt),pt.addVectors(zt.max,Ts.max),zt.expandByPoint(pt)):(zt.expandByPoint(Ts.min),zt.expandByPoint(Ts.max))}zt.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)pt.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(pt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)pt.fromBufferAttribute(a,c),l&&(Ri.fromBufferAttribute(e,c),pt.add(Ri)),i=Math.max(i,n.distanceToSquared(pt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeFaceNormals(){}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,i=t.position.array,r=t.normal.array,o=t.uv.array,a=i.length/3;t.tangent===void 0&&this.setAttribute("tangent",new Le(new Float32Array(4*a),4));const l=t.tangent.array,c=[],h=[];for(let B=0;B<a;B++)c[B]=new T,h[B]=new T;const u=new T,d=new T,p=new T,m=new Q,x=new Q,v=new Q,g=new T,f=new T;function _(B,U,z){u.fromArray(i,B*3),d.fromArray(i,U*3),p.fromArray(i,z*3),m.fromArray(o,B*2),x.fromArray(o,U*2),v.fromArray(o,z*2),d.sub(u),p.sub(u),x.sub(m),v.sub(m);const L=1/(x.x*v.y-v.x*x.y);isFinite(L)&&(g.copy(d).multiplyScalar(v.y).addScaledVector(p,-x.y).multiplyScalar(L),f.copy(p).multiplyScalar(x.x).addScaledVector(d,-v.x).multiplyScalar(L),c[B].add(g),c[U].add(g),c[z].add(g),h[B].add(f),h[U].add(f),h[z].add(f))}let w=this.groups;w.length===0&&(w=[{start:0,count:n.length}]);for(let B=0,U=w.length;B<U;++B){const z=w[B],L=z.start,D=z.count;for(let N=L,R=L+D;N<R;N+=3)_(n[N+0],n[N+1],n[N+2])}const E=new T,y=new T,S=new T,C=new T;function I(B){S.fromArray(r,B*3),C.copy(S);const U=c[B];E.copy(U),E.sub(S.multiplyScalar(S.dot(U))).normalize(),y.crossVectors(C,U);const L=y.dot(h[B])<0?-1:1;l[B*4]=E.x,l[B*4+1]=E.y,l[B*4+2]=E.z,l[B*4+3]=L}for(let B=0,U=w.length;B<U;++B){const z=w[B],L=z.start,D=z.count;for(let N=L,R=L+D;N<R;N+=3)I(n[N+0]),I(n[N+1]),I(n[N+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Le(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);const i=new T,r=new T,o=new T,a=new T,l=new T,c=new T,h=new T,u=new T;if(e)for(let d=0,p=e.count;d<p;d+=3){const m=e.getX(d+0),x=e.getX(d+1),v=e.getX(d+2);i.fromBufferAttribute(t,m),r.fromBufferAttribute(t,x),o.fromBufferAttribute(t,v),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),a.fromBufferAttribute(n,m),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,v),a.add(h),l.add(h),c.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(v,c.x,c.y,c.z)}else for(let d=0,p=t.count;d<p;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}merge(e,t){if(!(e&&e.isBufferGeometry)){console.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.",e);return}t===void 0&&(t=0,console.warn("THREE.BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge."));const n=this.attributes;for(const i in n){if(e.attributes[i]===void 0)continue;const o=n[i].array,a=e.attributes[i],l=a.array,c=a.itemSize*t,h=Math.min(l.length,o.length-c);for(let u=0,d=c;u<h;u++,d++)o[d]=l[u]}return this}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)pt.fromBufferAttribute(e,t),pt.normalize(),e.setXYZ(t,pt.x,pt.y,pt.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let p=0,m=0;for(let x=0,v=l.length;x<v;x++){p=l[x]*h;for(let g=0;g<h;g++)d[m++]=c[p++]}return new Le(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Be,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],p=e(d,n);l.push(p)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const p=c[u];h.push(p.toJSON(e.data))}h.length>0&&(i[l]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new Be().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}Be.prototype.isBufferGeometry=!0;const Fc=new ue,Pi=new yi,Ta=new vi,Dn=new T,Nn=new T,Fn=new T,Ea=new T,Aa=new T,La=new T,Nr=new T,Fr=new T,Br=new T,zr=new Q,Or=new Q,Ur=new Q,Ca=new T,Hr=new T;class Qe extends ke{constructor(e=new Be,t=new Ut){super(),this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e){return super.copy(e),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=e.material,this.geometry=e.geometry,this}updateMorphTargets(){const e=this.geometry;if(e.isBufferGeometry){const t=e.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}else{const t=e.morphTargets;t!==void 0&&t.length>0&&console.error("THREE.Mesh.updateMorphTargets() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")}}raycast(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;if(i===void 0||(n.boundingSphere===null&&n.computeBoundingSphere(),Ta.copy(n.boundingSphere),Ta.applyMatrix4(r),e.ray.intersectsSphere(Ta)===!1)||(Fc.copy(r).invert(),Pi.copy(e.ray).applyMatrix4(Fc),n.boundingBox!==null&&Pi.intersectsBox(n.boundingBox)===!1))return;let o;if(n.isBufferGeometry){const a=n.index,l=n.attributes.position,c=n.morphAttributes.position,h=n.morphTargetsRelative,u=n.attributes.uv,d=n.attributes.uv2,p=n.groups,m=n.drawRange;if(a!==null)if(Array.isArray(i))for(let x=0,v=p.length;x<v;x++){const g=p[x],f=i[g.materialIndex],_=Math.max(g.start,m.start),w=Math.min(g.start+g.count,m.start+m.count);for(let E=_,y=w;E<y;E+=3){const S=a.getX(E),C=a.getX(E+1),I=a.getX(E+2);o=Gr(this,f,e,Pi,l,c,h,u,d,S,C,I),o&&(o.faceIndex=Math.floor(E/3),o.face.materialIndex=g.materialIndex,t.push(o))}}else{const x=Math.max(0,m.start),v=Math.min(a.count,m.start+m.count);for(let g=x,f=v;g<f;g+=3){const _=a.getX(g),w=a.getX(g+1),E=a.getX(g+2);o=Gr(this,i,e,Pi,l,c,h,u,d,_,w,E),o&&(o.faceIndex=Math.floor(g/3),t.push(o))}}else if(l!==void 0)if(Array.isArray(i))for(let x=0,v=p.length;x<v;x++){const g=p[x],f=i[g.materialIndex],_=Math.max(g.start,m.start),w=Math.min(g.start+g.count,m.start+m.count);for(let E=_,y=w;E<y;E+=3){const S=E,C=E+1,I=E+2;o=Gr(this,f,e,Pi,l,c,h,u,d,S,C,I),o&&(o.faceIndex=Math.floor(E/3),o.face.materialIndex=g.materialIndex,t.push(o))}}else{const x=Math.max(0,m.start),v=Math.min(l.count,m.start+m.count);for(let g=x,f=v;g<f;g+=3){const _=g,w=g+1,E=g+2;o=Gr(this,i,e,Pi,l,c,h,u,d,_,w,E),o&&(o.faceIndex=Math.floor(g/3),t.push(o))}}}else n.isGeometry&&console.error("THREE.Mesh.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")}}Qe.prototype.isMesh=!0;function Xp(s,e,t,n,i,r,o,a){let l;if(e.side===st?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,e.side!==ln,a),l===null)return null;Hr.copy(a),Hr.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(Hr);return c<t.near||c>t.far?null:{distance:c,point:Hr.clone(),object:s}}function Gr(s,e,t,n,i,r,o,a,l,c,h,u){Dn.fromBufferAttribute(i,c),Nn.fromBufferAttribute(i,h),Fn.fromBufferAttribute(i,u);const d=s.morphTargetInfluences;if(e.morphTargets&&r&&d){Nr.set(0,0,0),Fr.set(0,0,0),Br.set(0,0,0);for(let m=0,x=r.length;m<x;m++){const v=d[m],g=r[m];v!==0&&(Ea.fromBufferAttribute(g,c),Aa.fromBufferAttribute(g,h),La.fromBufferAttribute(g,u),o?(Nr.addScaledVector(Ea,v),Fr.addScaledVector(Aa,v),Br.addScaledVector(La,v)):(Nr.addScaledVector(Ea.sub(Dn),v),Fr.addScaledVector(Aa.sub(Nn),v),Br.addScaledVector(La.sub(Fn),v)))}Dn.add(Nr),Nn.add(Fr),Fn.add(Br)}s.isSkinnedMesh&&e.skinning&&(s.boneTransform(c,Dn),s.boneTransform(h,Nn),s.boneTransform(u,Fn));const p=Xp(s,e,t,n,Dn,Nn,Fn,Ca);if(p){a&&(zr.fromBufferAttribute(a,c),Or.fromBufferAttribute(a,h),Ur.fromBufferAttribute(a,u),p.uv=ft.getUV(Ca,Dn,Nn,Fn,zr,Or,Ur,new Q)),l&&(zr.fromBufferAttribute(l,c),Or.fromBufferAttribute(l,h),Ur.fromBufferAttribute(l,u),p.uv2=ft.getUV(Ca,Dn,Nn,Fn,zr,Or,Ur,new Q));const m={a:c,b:h,c:u,normal:new T,materialIndex:0};ft.getNormal(Dn,Nn,Fn,m.normal),p.face=m}return p}class yl extends Be{constructor(e=1,t=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};const a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],u=[];let d=0,p=0;m("z","y","x",-1,-1,n,t,e,o,r,0),m("z","y","x",1,-1,n,t,-e,o,r,1),m("x","z","y",1,1,e,n,t,i,o,2),m("x","z","y",1,-1,e,n,-t,i,o,3),m("x","y","z",1,-1,e,t,n,i,r,4),m("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new Je(c,3)),this.setAttribute("normal",new Je(h,3)),this.setAttribute("uv",new Je(u,2));function m(x,v,g,f,_,w,E,y,S,C,I){const B=w/S,U=E/C,z=w/2,L=E/2,D=y/2,N=S+1,R=C+1;let X=0,K=0;const Z=new T;for(let ee=0;ee<R;ee++){const re=ee*U-L;for(let pe=0;pe<N;pe++){const Me=pe*B-z;Z[x]=Me*f,Z[v]=re*_,Z[g]=D,c.push(Z.x,Z.y,Z.z),Z[x]=0,Z[v]=0,Z[g]=y>0?1:-1,h.push(Z.x,Z.y,Z.z),u.push(pe/S),u.push(1-ee/C),X+=1}}for(let ee=0;ee<C;ee++)for(let re=0;re<S;re++){const pe=d+re+N*ee,Me=d+re+N*(ee+1),W=d+(re+1)+N*(ee+1),Ie=d+(re+1)+N*ee;l.push(pe,Me,Ie),l.push(Me,W,Ie),K+=6}a.addGroup(p,K,I),p+=K,d+=X}}}function es(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function _t(s){const e={};for(let t=0;t<s.length;t++){const n=es(s[t]);for(const i in n)e[i]=n[i]}return e}const qp={clone:es,merge:_t};var Yp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,jp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class vt extends ht{constructor(e){super(),this.type="ShaderMaterial",this.defines={},this.uniforms={},this.vertexShader=Yp,this.fragmentShader=jp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&(e.attributes!==void 0&&console.error("THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead."),this.setValues(e))}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=es(e.uniforms),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.lights=e.lights,this.clipping=e.clipping,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.morphNormals=e.morphNormals,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}vt.prototype.isShaderMaterial=!0;class _l extends ke{constructor(){super(),this.type="Camera",this.matrixWorldInverse=new ue,this.projectionMatrix=new ue,this.projectionMatrixInverse=new ue}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this}getWorldDirection(e){e===void 0&&(console.warn("THREE.Camera: .getWorldDirection() target is now required"),e=new T),this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(-t[8],-t[9],-t[10]).normalize()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}_l.prototype.isCamera=!0;class At extends _l{constructor(e=50,t=1,n=.1,i=2e3){super(),this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ir*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Xs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ir*2*Math.atan(Math.tan(Xs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,i,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Xs*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}At.prototype.isPerspectiveCamera=!0;const Ii=90,Di=1;class Ml extends ke{constructor(e,t,n){if(super(),this.type="CubeCamera",n.isWebGLCubeRenderTarget!==!0){console.error("THREE.CubeCamera: The constructor now expects an instance of WebGLCubeRenderTarget as third parameter.");return}this.renderTarget=n;const i=new At(Ii,Di,e,t);i.layers=this.layers,i.up.set(0,-1,0),i.lookAt(new T(1,0,0)),this.add(i);const r=new At(Ii,Di,e,t);r.layers=this.layers,r.up.set(0,-1,0),r.lookAt(new T(-1,0,0)),this.add(r);const o=new At(Ii,Di,e,t);o.layers=this.layers,o.up.set(0,0,1),o.lookAt(new T(0,1,0)),this.add(o);const a=new At(Ii,Di,e,t);a.layers=this.layers,a.up.set(0,0,-1),a.lookAt(new T(0,-1,0)),this.add(a);const l=new At(Ii,Di,e,t);l.layers=this.layers,l.up.set(0,-1,0),l.lookAt(new T(0,0,1)),this.add(l);const c=new At(Ii,Di,e,t);c.layers=this.layers,c.up.set(0,-1,0),c.lookAt(new T(0,0,-1)),this.add(c)}update(e,t){this.parent===null&&this.updateMatrixWorld();const n=this.renderTarget,[i,r,o,a,l,c]=this.children,h=e.xr.enabled,u=e.getRenderTarget();e.xr.enabled=!1;const d=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0),e.render(t,i),e.setRenderTarget(n,1),e.render(t,r),e.setRenderTarget(n,2),e.render(t,o),e.setRenderTarget(n,3),e.render(t,a),e.setRenderTarget(n,4),e.render(t,l),n.texture.generateMipmaps=d,e.setRenderTarget(n,5),e.render(t,c),e.setRenderTarget(u),e.xr.enabled=h}}class Io extends xt{constructor(e,t,n,i,r,o,a,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:dl,a=a!==void 0?a:qn,super(e,t,n,i,r,o,a,l,c,h),this._needsFlipEnvMap=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}Io.prototype.isCubeTexture=!0;class lu extends hi{constructor(e,t,n){Number.isInteger(t)&&(console.warn("THREE.WebGLCubeRenderTarget: constructor signature is now WebGLCubeRenderTarget( size, options )"),t=n),super(e,e,t),t=t||{},this.texture=new Io(void 0,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.encoding),this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Ft,this.texture._needsFlipEnvMap=!1}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.format=$t,this.texture.encoding=t.encoding,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new yl(5,5,5),r=new vt({name:"CubemapFromEquirect",uniforms:es(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:st,blending:ks});r.uniforms.tEquirect.value=t;const o=new Qe(i,r),a=t.minFilter;return t.minFilter===mr&&(t.minFilter=Ft),new Ml(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(r)}}lu.prototype.isWebGLCubeRenderTarget=!0;class cu extends xt{constructor(e,t,n,i,r,o,a,l,c,h,u,d){super(null,o,a,l,c,h,i,r,u,d),this.image={data:e||null,width:t||1,height:n||1},this.magFilter=c!==void 0?c:St,this.minFilter=h!==void 0?h:St,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.needsUpdate=!0}}cu.prototype.isDataTexture=!0;const Ni=new vi,kr=new T;class Do{constructor(e=new kt,t=new kt,n=new kt,i=new kt,r=new kt,o=new kt){this.planes=[e,t,n,i,r,o]}set(e,t,n,i,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e){const t=this.planes,n=e.elements,i=n[0],r=n[1],o=n[2],a=n[3],l=n[4],c=n[5],h=n[6],u=n[7],d=n[8],p=n[9],m=n[10],x=n[11],v=n[12],g=n[13],f=n[14],_=n[15];return t[0].setComponents(a-i,u-l,x-d,_-v).normalize(),t[1].setComponents(a+i,u+l,x+d,_+v).normalize(),t[2].setComponents(a+r,u+c,x+p,_+g).normalize(),t[3].setComponents(a-r,u-c,x-p,_-g).normalize(),t[4].setComponents(a-o,u-h,x-m,_-f).normalize(),t[5].setComponents(a+o,u+h,x+m,_+f).normalize(),this}intersectsObject(e){const t=e.geometry;return t.boundingSphere===null&&t.computeBoundingSphere(),Ni.copy(t.boundingSphere).applyMatrix4(e.matrixWorld),this.intersectsSphere(Ni)}intersectsSprite(e){return Ni.center.set(0,0,0),Ni.radius=.7071067811865476,Ni.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ni)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(kr.x=i.normal.x>0?e.max.x:e.min.x,kr.y=i.normal.y>0?e.max.y:e.min.y,kr.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(kr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function hu(){let s=null,e=!1,t=null,n=null;function i(r,o){t(r,o),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function Zp(s,e){const t=e.isWebGL2,n=new WeakMap;function i(c,h){const u=c.array,d=c.usage,p=s.createBuffer();s.bindBuffer(h,p),s.bufferData(h,u,d),c.onUploadCallback();let m=5126;return u instanceof Float32Array?m=5126:u instanceof Float64Array?console.warn("THREE.WebGLAttributes: Unsupported data buffer format: Float64Array."):u instanceof Uint16Array?c.isFloat16BufferAttribute?t?m=5131:console.warn("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2."):m=5123:u instanceof Int16Array?m=5122:u instanceof Uint32Array?m=5125:u instanceof Int32Array?m=5124:u instanceof Int8Array?m=5120:u instanceof Uint8Array&&(m=5121),{buffer:p,type:m,bytesPerElement:u.BYTES_PER_ELEMENT,version:c.version}}function r(c,h,u){const d=h.array,p=h.updateRange;s.bindBuffer(u,c),p.count===-1?s.bufferSubData(u,0,d):(t?s.bufferSubData(u,p.offset*d.BYTES_PER_ELEMENT,d,p.offset,p.count):s.bufferSubData(u,p.offset*d.BYTES_PER_ELEMENT,d.subarray(p.offset,p.offset+p.count)),p.count=-1)}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);h&&(s.deleteBuffer(h.buffer),n.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const d=n.get(c);(!d||d.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const u=n.get(c);u===void 0?n.set(c,i(c,h)):u.version<c.version&&(r(u.buffer,c,h),u.version=c.version)}return{get:o,remove:a,update:l}}class cs extends Be{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=e/a,d=t/l,p=[],m=[],x=[],v=[];for(let g=0;g<h;g++){const f=g*d-o;for(let _=0;_<c;_++){const w=_*u-r;m.push(w,-f,0),x.push(0,0,1),v.push(_/a),v.push(1-g/l)}}for(let g=0;g<l;g++)for(let f=0;f<a;f++){const _=f+c*g,w=f+c*(g+1),E=f+1+c*(g+1),y=f+1+c*g;p.push(_,w,y),p.push(w,E,y)}this.setIndex(p),this.setAttribute("position",new Je(m,3)),this.setAttribute("normal",new Je(x,3)),this.setAttribute("uv",new Je(v,2))}}var Jp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vUv ).g;
#endif`,Kp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Qp=`#ifdef ALPHATEST
	if ( diffuseColor.a < ALPHATEST ) discard;
#endif`,$p=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );
	#endif
#endif`,em=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,tm="vec3 transformed = vec3( position );",nm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,im=`vec2 integrateSpecularBRDF( const in float dotNV, const in float roughness ) {
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	return vec2( -1.04, 1.04 ) * a004 + r.zw;
}
float punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
#if defined ( PHYSICALLY_CORRECT_LIGHTS )
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
#else
	if( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
		return pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );
	}
	return 1.0;
#endif
}
vec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 specularColor, const in float dotLH ) {
	float fresnel = exp2( ( -5.55473 * dotLH - 6.98316 ) * dotLH );
	return ( 1.0 - specularColor ) * fresnel + specularColor;
}
vec3 F_Schlick_RoughnessDependent( const in vec3 F0, const in float dotNV, const in float roughness ) {
	float fresnel = exp2( ( -5.55473 * dotNV - 6.98316 ) * dotNV );
	vec3 Fr = max( vec3( 1.0 - roughness ), F0 ) - F0;
	return Fr * fresnel + F0;
}
float G_GGX_Smith( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gl = dotNL + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	float gv = dotNV + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	return 1.0 / ( gl * gv );
}
float G_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
vec3 BRDF_Specular_GGX( const in IncidentLight incidentLight, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float roughness ) {
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( incidentLight.direction + viewDir );
	float dotNL = saturate( dot( normal, incidentLight.direction ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotLH = saturate( dot( incidentLight.direction, halfDir ) );
	vec3 F = F_Schlick( specularColor, dotLH );
	float G = G_GGX_SmithCorrelated( alpha, dotNL, dotNV );
	float D = D_GGX( alpha, dotNH );
	return F * ( G * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
vec3 BRDF_Specular_GGX_Environment( const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 brdf = integrateSpecularBRDF( dotNV, roughness );
	return specularColor * brdf.x + brdf.y;
}
void BRDF_Specular_Multiscattering_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
	float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
	vec3 F = F_Schlick_RoughnessDependent( specularColor, dotNV, roughness );
	vec2 brdf = integrateSpecularBRDF( dotNV, roughness );
	vec3 FssEss = F * brdf.x + brdf.y;
	float Ess = brdf.x + brdf.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = specularColor + ( 1.0 - specularColor ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );
	float dotNH = saturate( dot( geometry.normal, halfDir ) );
	float dotLH = saturate( dot( incidentLight.direction, halfDir ) );
	vec3 F = F_Schlick( specularColor, dotLH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
}
float GGXRoughnessToBlinnExponent( const in float ggxRoughness ) {
	return ( 2.0 / pow2( ggxRoughness + 0.0001 ) - 2.0 );
}
float BlinnExponentToGGXRoughness( const in float blinnExponent ) {
	return sqrt( 2.0 / ( blinnExponent + 2.0 ) );
}
#if defined( USE_SHEEN )
float D_Charlie(float roughness, float NoH) {
	float invAlpha = 1.0 / roughness;
	float cos2h = NoH * NoH;
	float sin2h = max(1.0 - cos2h, 0.0078125);	return (2.0 + invAlpha) * pow(sin2h, invAlpha * 0.5) / (2.0 * PI);
}
float V_Neubelt(float NoV, float NoL) {
	return saturate(1.0 / (4.0 * (NoL + NoV - NoL * NoV)));
}
vec3 BRDF_Specular_Sheen( const in float roughness, const in vec3 L, const in GeometricContext geometry, vec3 specularColor ) {
	vec3 N = geometry.normal;
	vec3 V = geometry.viewDir;
	vec3 H = normalize( V + L );
	float dotNH = saturate( dot( N, H ) );
	return specularColor * D_Charlie( roughness, dotNH ) * V_Neubelt( dot(N, V), dot(N, L) );
}
#endif`,sm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vUv );
		vec2 dSTdy = dFdy( vUv );
		float Hll = bumpScale * texture2D( bumpMap, vUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );
		vec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,rm=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,om=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,am=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,lm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,cm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,hm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,um=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,dm=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,fm=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate(a) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement(a) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract(sin(sn) * c);
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float max3( vec3 v ) { return max( max( v.x, v.y ), v.z ); }
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
#ifdef CLEARCOAT
	vec3 clearcoatNormal;
#endif
};
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
vec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {
	float distance = dot( planeNormal, point - pointOnPlane );
	return - distance * planeNormal + point;
}
float sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {
	return sign( dot( point - pointOnPlane, planeNormal ) );
}
vec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {
	return lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float linearToRelativeLuminance( const in vec3 color ) {
	vec3 weights = vec3( 0.2126, 0.7152, 0.0722 );
	return dot( weights, color.rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}`,pm=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_maxMipLevel 8.0
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_maxTileSize 256.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		float texelSize = 1.0 / ( 3.0 * cubeUV_maxTileSize );
		vec2 uv = getUV( direction, face ) * ( faceSize - 1.0 );
		vec2 f = fract( uv );
		uv += 0.5 - f;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		if ( mipInt < cubeUV_maxMipLevel ) {
			uv.y += 2.0 * cubeUV_maxTileSize;
		}
		uv.y += filterInt * 2.0 * cubeUV_minTileSize;
		uv.x += 3.0 * max( 0.0, cubeUV_maxTileSize - 2.0 * faceSize );
		uv *= texelSize;
		vec3 tl = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;
		uv.x += texelSize;
		vec3 tr = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;
		uv.y += texelSize;
		vec3 br = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;
		uv.x -= texelSize;
		vec3 bl = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;
		vec3 tm = mix( tl, tr, f.x );
		vec3 bm = mix( bl, br, f.x );
		return mix( tm, bm, f.y );
	}
	#define r0 1.0
	#define v0 0.339
	#define m0 - 2.0
	#define r1 0.8
	#define v1 0.276
	#define m1 - 1.0
	#define r4 0.4
	#define v4 0.046
	#define m4 2.0
	#define r5 0.305
	#define v5 0.016
	#define m5 3.0
	#define r6 0.21
	#define v6 0.0038
	#define m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= r1 ) {
			mip = ( r0 - roughness ) * ( m1 - m0 ) / ( r0 - r1 ) + m0;
		} else if ( roughness >= r4 ) {
			mip = ( r1 - roughness ) * ( m4 - m1 ) / ( r1 - r4 ) + m1;
		} else if ( roughness >= r5 ) {
			mip = ( r4 - roughness ) * ( m5 - m4 ) / ( r4 - r5 ) + m4;
		} else if ( roughness >= r6 ) {
			mip = ( r5 - roughness ) * ( m6 - m5 ) / ( r5 - r6 ) + m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), m0, cubeUV_maxMipLevel );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,mm=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,gm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,xm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );
#endif`,vm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vUv );
	emissiveColor.rgb = emissiveMapTexelToLinear( emissiveColor ).rgb;
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ym=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,_m="gl_FragColor = linearToOutputTexel( gl_FragColor );",Mm=`
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 GammaToLinear( in vec4 value, in float gammaFactor ) {
	return vec4( pow( value.rgb, vec3( gammaFactor ) ), value.a );
}
vec4 LinearToGamma( in vec4 value, in float gammaFactor ) {
	return vec4( pow( value.rgb, vec3( 1.0 / gammaFactor ) ), value.a );
}
vec4 sRGBToLinear( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 RGBEToLinear( in vec4 value ) {
	return vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );
}
vec4 LinearToRGBE( in vec4 value ) {
	float maxComponent = max( max( value.r, value.g ), value.b );
	float fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );
	return vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );
}
vec4 RGBMToLinear( in vec4 value, in float maxRange ) {
	return vec4( value.rgb * value.a * maxRange, 1.0 );
}
vec4 LinearToRGBM( in vec4 value, in float maxRange ) {
	float maxRGB = max( value.r, max( value.g, value.b ) );
	float M = clamp( maxRGB / maxRange, 0.0, 1.0 );
	M = ceil( M * 255.0 ) / 255.0;
	return vec4( value.rgb / ( M * maxRange ), M );
}
vec4 RGBDToLinear( in vec4 value, in float maxRange ) {
	return vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );
}
vec4 LinearToRGBD( in vec4 value, in float maxRange ) {
	float maxRGB = max( value.r, max( value.g, value.b ) );
	float D = max( maxRange / maxRGB, 1.0 );
	D = clamp( floor( D ) / 255.0, 0.0, 1.0 );
	return vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );
}
const mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );
vec4 LinearToLogLuv( in vec4 value ) {
	vec3 Xp_Y_XYZp = cLogLuvM * value.rgb;
	Xp_Y_XYZp = max( Xp_Y_XYZp, vec3( 1e-6, 1e-6, 1e-6 ) );
	vec4 vResult;
	vResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;
	float Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;
	vResult.w = fract( Le );
	vResult.z = ( Le - ( floor( vResult.w * 255.0 ) ) / 255.0 ) / 255.0;
	return vResult;
}
const mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );
vec4 LogLuvToLinear( in vec4 value ) {
	float Le = value.z * 255.0 + value.w;
	vec3 Xp_Y_XYZp;
	Xp_Y_XYZp.y = exp2( ( Le - 127.0 ) / 2.0 );
	Xp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;
	Xp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;
	vec3 vRGB = cLogLuvInverseM * Xp_Y_XYZp.rgb;
	return vec4( max( vRGB, 0.0 ), 1.0 );
}`,wm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 envColor = textureCubeUV( envMap, reflectVec, 0.0 );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifndef ENVMAP_TYPE_CUBE_UV
		envColor = envMapTexelToLinear( envColor );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,bm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform int maxMipLevel;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Sm=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Tm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) ||defined( PHONG )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Em=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Am=`#ifdef USE_FOG
	fogDepth = - mvPosition.z;
#endif`,Lm=`#ifdef USE_FOG
	varying float fogDepth;
#endif`,Cm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * fogDepth * fogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, fogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Rm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float fogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Pm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return texture2D( gradientMap, coord ).rgb;
	#else
		return ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );
	#endif
}`,Im=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel= texture2D( lightMap, vUv2 );
	reflectedLight.indirectDiffuse += PI * lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;
#endif`,Dm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Nm=`vec3 diffuse = vec3( 1.0 );
GeometricContext geometry;
geometry.position = mvPosition.xyz;
geometry.normal = normalize( transformedNormal );
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( -mvPosition.xyz );
GeometricContext backGeometry;
backGeometry.position = geometry.position;
backGeometry.normal = -geometry.normal;
backGeometry.viewDir = geometry.viewDir;
vLightFront = vec3( 0.0 );
vIndirectFront = vec3( 0.0 );
#ifdef DOUBLE_SIDED
	vLightBack = vec3( 0.0 );
	vIndirectBack = vec3( 0.0 );
#endif
IncidentLight directLight;
float dotNL;
vec3 directLightColor_Diffuse;
vIndirectFront += getAmbientLightIrradiance( ambientLightColor );
vIndirectFront += getLightProbeIrradiance( lightProbe, geometry );
#ifdef DOUBLE_SIDED
	vIndirectBack += getAmbientLightIrradiance( ambientLightColor );
	vIndirectBack += getLightProbeIrradiance( lightProbe, backGeometry );
#endif
#if NUM_POINT_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		getPointDirectLightIrradiance( pointLights[ i ], geometry, directLight );
		dotNL = dot( geometry.normal, directLight.direction );
		directLightColor_Diffuse = PI * directLight.color;
		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;
		#ifdef DOUBLE_SIDED
			vLightBack += saturate( -dotNL ) * directLightColor_Diffuse;
		#endif
	}
	#pragma unroll_loop_end
#endif
#if NUM_SPOT_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		getSpotDirectLightIrradiance( spotLights[ i ], geometry, directLight );
		dotNL = dot( geometry.normal, directLight.direction );
		directLightColor_Diffuse = PI * directLight.color;
		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;
		#ifdef DOUBLE_SIDED
			vLightBack += saturate( -dotNL ) * directLightColor_Diffuse;
		#endif
	}
	#pragma unroll_loop_end
#endif
#if NUM_DIR_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		getDirectionalDirectLightIrradiance( directionalLights[ i ], geometry, directLight );
		dotNL = dot( geometry.normal, directLight.direction );
		directLightColor_Diffuse = PI * directLight.color;
		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;
		#ifdef DOUBLE_SIDED
			vLightBack += saturate( -dotNL ) * directLightColor_Diffuse;
		#endif
	}
	#pragma unroll_loop_end
#endif
#if NUM_HEMI_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
		vIndirectFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );
		#ifdef DOUBLE_SIDED
			vIndirectBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry );
		#endif
	}
	#pragma unroll_loop_end
#endif`,Fm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ];
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in GeometricContext geometry ) {
	vec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	#ifndef PHYSICALLY_CORRECT_LIGHTS
		irradiance *= PI;
	#endif
	return irradiance;
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {
		directLight.color = directionalLight.color;
		directLight.direction = directionalLight.direction;
		directLight.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {
		vec3 lVector = pointLight.position - geometry.position;
		directLight.direction = normalize( lVector );
		float lightDistance = length( lVector );
		directLight.color = pointLight.color;
		directLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );
		directLight.visible = ( directLight.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight ) {
		vec3 lVector = spotLight.position - geometry.position;
		directLight.direction = normalize( lVector );
		float lightDistance = length( lVector );
		float angleCos = dot( directLight.direction, spotLight.direction );
		if ( angleCos > spotLight.coneCos ) {
			float spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );
			directLight.color = spotLight.color;
			directLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );
			directLight.visible = true;
		} else {
			directLight.color = vec3( 0.0 );
			directLight.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {
		float dotNL = dot( geometry.normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		#ifndef PHYSICALLY_CORRECT_LIGHTS
			irradiance *= PI;
		#endif
		return irradiance;
	}
#endif`,Bm=`#if defined( USE_ENVMAP )
	#ifdef ENVMAP_MODE_REFRACTION
		uniform float refractionRatio;
	#endif
	vec3 getLightProbeIndirectIrradiance( const in GeometricContext geometry, const in int maxMIPLevel ) {
		vec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );
		#ifdef ENVMAP_TYPE_CUBE
			vec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );
			#ifdef TEXTURE_LOD_EXT
				vec4 envMapColor = textureCubeLodEXT( envMap, queryVec, float( maxMIPLevel ) );
			#else
				vec4 envMapColor = textureCube( envMap, queryVec, float( maxMIPLevel ) );
			#endif
			envMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;
		#elif defined( ENVMAP_TYPE_CUBE_UV )
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
		#else
			vec4 envMapColor = vec4( 0.0 );
		#endif
		return PI * envMapColor.rgb * envMapIntensity;
	}
	float getSpecularMIPLevel( const in float roughness, const in int maxMIPLevel ) {
		float maxMIPLevelScalar = float( maxMIPLevel );
		float sigma = PI * roughness * roughness / ( 1.0 + roughness );
		float desiredMIPLevel = maxMIPLevelScalar + log2( sigma );
		return clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );
	}
	vec3 getLightProbeIndirectRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in int maxMIPLevel ) {
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( -viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
		#else
			vec3 reflectVec = refract( -viewDir, normal, refractionRatio );
		#endif
		reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
		float specularMIPLevel = getSpecularMIPLevel( roughness, maxMIPLevel );
		#ifdef ENVMAP_TYPE_CUBE
			vec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );
			#ifdef TEXTURE_LOD_EXT
				vec4 envMapColor = textureCubeLodEXT( envMap, queryReflectVec, specularMIPLevel );
			#else
				vec4 envMapColor = textureCube( envMap, queryReflectVec, specularMIPLevel );
			#endif
			envMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;
		#elif defined( ENVMAP_TYPE_CUBE_UV )
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
		#endif
		return envMapColor.rgb * envMapIntensity;
	}
#endif`,zm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Om=`varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;
	#ifndef PHYSICALLY_CORRECT_LIGHTS
		irradiance *= PI;
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon
#define Material_LightProbeLOD( material )	(0)`,Um=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Hm=`varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifndef PHYSICALLY_CORRECT_LIGHTS
		irradiance *= PI;
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong
#define Material_LightProbeLOD( material )	(0)`,Gm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.specularRoughness = max( roughnessFactor, 0.0525 );material.specularRoughness += geometryRoughness;
material.specularRoughness = min( material.specularRoughness, 1.0 );
#ifdef REFLECTIVITY
	material.specularColor = mix( vec3( MAXIMUM_SPECULAR_COEFFICIENT * pow2( reflectivity ) ), diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( DEFAULT_SPECULAR_COEFFICIENT ), diffuseColor.rgb, metalnessFactor );
#endif
#ifdef CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheen;
#endif`,km=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float specularRoughness;
	vec3 specularColor;
#ifdef CLEARCOAT
	float clearcoat;
	float clearcoatRoughness;
#endif
#ifdef USE_SHEEN
	vec3 sheenColor;
#endif
};
#define MAXIMUM_SPECULAR_COEFFICIENT 0.16
#define DEFAULT_SPECULAR_COEFFICIENT 0.04
float clearcoatDHRApprox( const in float roughness, const in float dotNL ) {
	return DEFAULT_SPECULAR_COEFFICIENT + ( 1.0 - DEFAULT_SPECULAR_COEFFICIENT ) * ( pow( 1.0 - dotNL, 5.0 ) * pow( 1.0 - roughness, 2.0 ) );
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometry.normal;
		vec3 viewDir = geometry.viewDir;
		vec3 position = geometry.position;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.specularRoughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifndef PHYSICALLY_CORRECT_LIGHTS
		irradiance *= PI;
	#endif
	#ifdef CLEARCOAT
		float ccDotNL = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = ccDotNL * directLight.color;
		#ifndef PHYSICALLY_CORRECT_LIGHTS
			ccIrradiance *= PI;
		#endif
		float clearcoatDHR = material.clearcoat * clearcoatDHRApprox( material.clearcoatRoughness, ccDotNL );
		reflectedLight.directSpecular += ccIrradiance * material.clearcoat * BRDF_Specular_GGX( directLight, geometry.viewDir, geometry.clearcoatNormal, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearcoatRoughness );
	#else
		float clearcoatDHR = 0.0;
	#endif
	#ifdef USE_SHEEN
		reflectedLight.directSpecular += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Specular_Sheen(
			material.specularRoughness,
			directLight.direction,
			geometry,
			material.sheenColor
		);
	#else
		reflectedLight.directSpecular += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Specular_GGX( directLight, geometry.viewDir, geometry.normal, material.specularColor, material.specularRoughness);
	#endif
	reflectedLight.directDiffuse += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef CLEARCOAT
		float ccDotNV = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );
		reflectedLight.indirectSpecular += clearcoatRadiance * material.clearcoat * BRDF_Specular_GGX_Environment( geometry.viewDir, geometry.clearcoatNormal, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearcoatRoughness );
		float ccDotNL = ccDotNV;
		float clearcoatDHR = material.clearcoat * clearcoatDHRApprox( material.clearcoatRoughness, ccDotNL );
	#else
		float clearcoatDHR = 0.0;
	#endif
	float clearcoatInv = 1.0 - clearcoatDHR;
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	BRDF_Specular_Multiscattering_Environment( geometry, material.specularColor, material.specularRoughness, singleScattering, multiScattering );
	vec3 diffuse = material.diffuseColor * ( 1.0 - ( singleScattering + multiScattering ) );
	reflectedLight.indirectSpecular += clearcoatInv * radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Vm=`
GeometricContext geometry;
geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
#ifdef CLEARCOAT
	geometry.clearcoatNormal = clearcoatNormal;
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointDirectLightIrradiance( pointLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotDirectLightIrradiance( spotLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	irradiance += getLightProbeIrradiance( lightProbe, geometry );
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Wm=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel= texture2D( lightMap, vUv2 );
		vec3 lightMapIrradiance = lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;
		#ifndef PHYSICALLY_CORRECT_LIGHTS
			lightMapIrradiance *= PI;
		#endif
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getLightProbeIndirectIrradiance( geometry, maxMipLevel );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	radiance += getLightProbeIndirectRadiance( geometry.viewDir, geometry.normal, material.specularRoughness, maxMipLevel );
	#ifdef CLEARCOAT
		clearcoatRadiance += getLightProbeIndirectRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness, maxMipLevel );
	#endif
#endif`,Xm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`,qm=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ym=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,jm=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Zm=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Jm=`#ifdef USE_MAP
	vec4 texelColor = texture2D( map, vUv );
	texelColor = mapTexelToLinear( texelColor );
	diffuseColor *= texelColor;
#endif`,Km=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Qm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
#endif
#ifdef USE_MAP
	vec4 mapTexel = texture2D( map, uv );
	diffuseColor *= mapTexelToLinear( mapTexel );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,$m=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	uniform mat3 uvTransform;
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,eg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vUv );
	metalnessFactor *= texelMetalness.b;
#endif`,tg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ng=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
	objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
	objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
	objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
#endif`,ig=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifndef USE_MORPHNORMALS
		uniform float morphTargetInfluences[ 8 ];
	#else
		uniform float morphTargetInfluences[ 4 ];
	#endif
#endif`,sg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	transformed += morphTarget0 * morphTargetInfluences[ 0 ];
	transformed += morphTarget1 * morphTargetInfluences[ 1 ];
	transformed += morphTarget2 * morphTargetInfluences[ 2 ];
	transformed += morphTarget3 * morphTargetInfluences[ 3 ];
	#ifndef USE_MORPHNORMALS
		transformed += morphTarget4 * morphTargetInfluences[ 4 ];
		transformed += morphTarget5 * morphTargetInfluences[ 5 ];
		transformed += morphTarget6 * morphTargetInfluences[ 6 ];
		transformed += morphTarget7 * morphTargetInfluences[ 7 ];
	#endif
#endif`,rg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );
	vec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	#ifdef USE_TANGENT
		vec3 tangent = normalize( vTangent );
		vec3 bitangent = normalize( vBitangent );
		#ifdef DOUBLE_SIDED
			tangent = tangent * faceDirection;
			bitangent = bitangent * faceDirection;
		#endif
		#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )
			mat3 vTBN = mat3( tangent, bitangent, normal );
		#endif
	#endif
#endif
vec3 geometryNormal = normal;`,og=`#ifdef OBJECTSPACE_NORMALMAP
	normal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( TANGENTSPACE_NORMALMAP )
	vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	#ifdef USE_TANGENT
		normal = normalize( vTBN * mapN );
	#else
		normal = perturbNormal2Arb( -vViewPosition, normal, mapN, faceDirection );
	#endif
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,ag=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef OBJECTSPACE_NORMALMAP
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )
	vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {
		vec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );
		vec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );
		vec2 st0 = dFdx( vUv.st );
		vec2 st1 = dFdy( vUv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );
		return normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );
	}
#endif`,lg=`#ifdef CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`,cg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	#ifdef USE_TANGENT
		clearcoatNormal = normalize( vTBN * clearcoatMapN );
	#else
		clearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN, faceDirection );
	#endif
#endif`,hg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif`,ug=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ));
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w);
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {
	return linearClipZ * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return (( near + viewZ ) * far ) / (( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * invClipZ - far );
}`,dg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,fg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,pg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,mg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,gg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vUv );
	roughnessFactor *= texelRoughness.g;
#endif`,xg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,vg=`#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		varying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );
		bool inFrustum = all( inFrustumVec );
		bvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );
		bool frustumTest = all( frustumTestVec );
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ), 
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ), 
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,yg=`#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHT_SHADOWS ];
		varying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,_g=`#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SPOT_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		vec4 shadowWorldPosition;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
		vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias, 0 );
		vSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
		vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
#endif`,Mg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,wg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,bg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	#ifdef BONE_TEXTURE
		uniform highp sampler2D boneTexture;
		uniform int boneTextureSize;
		mat4 getBoneMatrix( const in float i ) {
			float j = i * 4.0;
			float x = mod( j, float( boneTextureSize ) );
			float y = floor( j / float( boneTextureSize ) );
			float dx = 1.0 / float( boneTextureSize );
			float dy = 1.0 / float( boneTextureSize );
			y = dy * ( y + 0.5 );
			vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
			vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
			vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
			vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
			mat4 bone = mat4( v1, v2, v3, v4 );
			return bone;
		}
	#else
		uniform mat4 boneMatrices[ MAX_BONES ];
		mat4 getBoneMatrix( const in float i ) {
			mat4 bone = boneMatrices[ int(i) ];
			return bone;
		}
	#endif
#endif`,Sg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Tg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Eg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ag=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Lg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Cg=`#ifndef saturate
#define saturate(a) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return toneMappingExposure * color;
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Rg=`#ifdef USE_TRANSMISSIONMAP
	totalTransmission *= texture2D( transmissionMap, vUv ).r;
#endif`,Pg=`#ifdef USE_TRANSMISSIONMAP
	uniform sampler2D transmissionMap;
#endif`,Ig=`#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )
	varying vec2 vUv;
#endif`,Dg=`#ifdef USE_UV
	#ifdef UVS_VERTEX_ONLY
		vec2 vUv;
	#else
		varying vec2 vUv;
	#endif
	uniform mat3 uvTransform;
#endif`,Ng=`#ifdef USE_UV
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
#endif`,Fg=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	varying vec2 vUv2;
#endif`,Bg=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	attribute vec2 uv2;
	varying vec2 vUv2;
	uniform mat3 uv2Transform;
#endif`,zg=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;
#endif`,Og=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP )
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Ug=`uniform sampler2D t2D;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	gl_FragColor = mapTexelToLinear( texColor );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Hg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Gg=`#include <envmap_common_pars_fragment>
uniform float opacity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	vec3 vReflect = vWorldDirection;
	#include <envmap_fragment>
	gl_FragColor = envColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,kg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Vg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Wg=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Xg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,qg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Yg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	vec4 texColor = texture2D( tEquirect, sampleUV );
	gl_FragColor = mapTexelToLinear( texColor );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,jg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Zg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Jg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <color_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Kg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
	
		vec4 lightMapTexel= texture2D( lightMap, vUv2 );
		reflectedLight.indirectDiffuse += lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qg=`#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <skinbase_vertex>
	#ifdef USE_ENVMAP
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,$g=`uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
varying vec3 vLightFront;
varying vec3 vIndirectFront;
#ifdef DOUBLE_SIDED
	varying vec3 vLightBack;
	varying vec3 vIndirectBack;
#endif
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <fog_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <emissivemap_fragment>
	#ifdef DOUBLE_SIDED
		reflectedLight.indirectDiffuse += ( gl_FrontFacing ) ? vIndirectFront : vIndirectBack;
	#else
		reflectedLight.indirectDiffuse += vIndirectFront;
	#endif
	#include <lightmap_fragment>
	reflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );
	#ifdef DOUBLE_SIDED
		reflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;
	#else
		reflectedLight.directDiffuse = vLightFront;
	#endif
	reflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,e0=`#define LAMBERT
varying vec3 vLightFront;
varying vec3 vIndirectFront;
#ifdef DOUBLE_SIDED
	varying vec3 vLightBack;
	varying vec3 vIndirectBack;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <bsdfs>
#include <lights_pars_begin>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <lights_lambert_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,t0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <fog_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
		matcapColor = matcapTexelToLinear( matcapColor );
	#else
		vec4 matcapColor = vec4( 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,n0=`#define MATCAP
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#ifndef FLAT_SHADED
		vNormal = normalize( transformedNormal );
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,i0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,s0=`#define TOON
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,r0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,o0=`#define PHONG
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,a0=`#define STANDARD
#ifdef PHYSICAL
	#define REFLECTIVITY
	#define CLEARCOAT
	#define TRANSMISSION
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef TRANSMISSION
	uniform float transmission;
#endif
#ifdef REFLECTIVITY
	uniform float reflectivity;
#endif
#ifdef CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheen;
#endif
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <transmissionmap_pars_fragment>
#include <bsdfs>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <lights_physical_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#ifdef TRANSMISSION
		float totalTransmission = transmission;
	#endif
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <transmissionmap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#ifdef TRANSMISSION
		diffuseColor.a *= mix( saturate( 1. - totalTransmission + linearToRelativeLuminance( reflectedLight.directSpecular + reflectedLight.indirectSpecular ) ), 1.0, metalness );
	#endif
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,l0=`#define STANDARD
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,c0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif
#include <packing>
#include <uv_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
}`,h0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	vViewPosition = - mvPosition.xyz;
#endif
}`,u0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,d0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <color_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,f0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,p0=`#include <common>
#include <fog_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <begin_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,m0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,g0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`;const Ne={alphamap_fragment:Jp,alphamap_pars_fragment:Kp,alphatest_fragment:Qp,aomap_fragment:$p,aomap_pars_fragment:em,begin_vertex:tm,beginnormal_vertex:nm,bsdfs:im,bumpmap_pars_fragment:sm,clipping_planes_fragment:rm,clipping_planes_pars_fragment:om,clipping_planes_pars_vertex:am,clipping_planes_vertex:lm,color_fragment:cm,color_pars_fragment:hm,color_pars_vertex:um,color_vertex:dm,common:fm,cube_uv_reflection_fragment:pm,defaultnormal_vertex:mm,displacementmap_pars_vertex:gm,displacementmap_vertex:xm,emissivemap_fragment:vm,emissivemap_pars_fragment:ym,encodings_fragment:_m,encodings_pars_fragment:Mm,envmap_fragment:wm,envmap_common_pars_fragment:bm,envmap_pars_fragment:Sm,envmap_pars_vertex:Tm,envmap_physical_pars_fragment:Bm,envmap_vertex:Em,fog_vertex:Am,fog_pars_vertex:Lm,fog_fragment:Cm,fog_pars_fragment:Rm,gradientmap_pars_fragment:Pm,lightmap_fragment:Im,lightmap_pars_fragment:Dm,lights_lambert_vertex:Nm,lights_pars_begin:Fm,lights_toon_fragment:zm,lights_toon_pars_fragment:Om,lights_phong_fragment:Um,lights_phong_pars_fragment:Hm,lights_physical_fragment:Gm,lights_physical_pars_fragment:km,lights_fragment_begin:Vm,lights_fragment_maps:Wm,lights_fragment_end:Xm,logdepthbuf_fragment:qm,logdepthbuf_pars_fragment:Ym,logdepthbuf_pars_vertex:jm,logdepthbuf_vertex:Zm,map_fragment:Jm,map_pars_fragment:Km,map_particle_fragment:Qm,map_particle_pars_fragment:$m,metalnessmap_fragment:eg,metalnessmap_pars_fragment:tg,morphnormal_vertex:ng,morphtarget_pars_vertex:ig,morphtarget_vertex:sg,normal_fragment_begin:rg,normal_fragment_maps:og,normalmap_pars_fragment:ag,clearcoat_normal_fragment_begin:lg,clearcoat_normal_fragment_maps:cg,clearcoat_pars_fragment:hg,packing:ug,premultiplied_alpha_fragment:dg,project_vertex:fg,dithering_fragment:pg,dithering_pars_fragment:mg,roughnessmap_fragment:gg,roughnessmap_pars_fragment:xg,shadowmap_pars_fragment:vg,shadowmap_pars_vertex:yg,shadowmap_vertex:_g,shadowmask_pars_fragment:Mg,skinbase_vertex:wg,skinning_pars_vertex:bg,skinning_vertex:Sg,skinnormal_vertex:Tg,specularmap_fragment:Eg,specularmap_pars_fragment:Ag,tonemapping_fragment:Lg,tonemapping_pars_fragment:Cg,transmissionmap_fragment:Rg,transmissionmap_pars_fragment:Pg,uv_pars_fragment:Ig,uv_pars_vertex:Dg,uv_vertex:Ng,uv2_pars_fragment:Fg,uv2_pars_vertex:Bg,uv2_vertex:zg,worldpos_vertex:Og,background_frag:Ug,background_vert:Hg,cube_frag:Gg,cube_vert:kg,depth_frag:Vg,depth_vert:Wg,distanceRGBA_frag:Xg,distanceRGBA_vert:qg,equirect_frag:Yg,equirect_vert:jg,linedashed_frag:Zg,linedashed_vert:Jg,meshbasic_frag:Kg,meshbasic_vert:Qg,meshlambert_frag:$g,meshlambert_vert:e0,meshmatcap_frag:t0,meshmatcap_vert:n0,meshtoon_frag:i0,meshtoon_vert:s0,meshphong_frag:r0,meshphong_vert:o0,meshphysical_frag:a0,meshphysical_vert:l0,normal_frag:c0,normal_vert:h0,points_frag:u0,points_vert:d0,shadow_frag:f0,shadow_vert:p0,sprite_frag:m0,sprite_vert:g0},ae={common:{diffuse:{value:new le(15658734)},opacity:{value:1},map:{value:null},uvTransform:{value:new gt},uv2Transform:{value:new gt},alphaMap:{value:null}},specularmap:{specularMap:{value:null}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},refractionRatio:{value:.98},maxMipLevel:{value:0}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1}},emissivemap:{emissiveMap:{value:null}},bumpmap:{bumpMap:{value:null},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalScale:{value:new Q(1,1)}},displacementmap:{displacementMap:{value:null},displacementScale:{value:1},displacementBias:{value:0}},roughnessmap:{roughnessMap:{value:null}},metalnessmap:{metalnessMap:{value:null}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new le(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotShadowMap:{value:[]},spotShadowMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new le(15658734)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},uvTransform:{value:new gt}},sprite:{diffuse:{value:new le(15658734)},opacity:{value:1},center:{value:new Q(.5,.5)},rotation:{value:0},map:{value:null},alphaMap:{value:null},uvTransform:{value:new gt}}},nn={basic:{uniforms:_t([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.fog]),vertexShader:Ne.meshbasic_vert,fragmentShader:Ne.meshbasic_frag},lambert:{uniforms:_t([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.fog,ae.lights,{emissive:{value:new le(0)}}]),vertexShader:Ne.meshlambert_vert,fragmentShader:Ne.meshlambert_frag},phong:{uniforms:_t([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new le(0)},specular:{value:new le(1118481)},shininess:{value:30}}]),vertexShader:Ne.meshphong_vert,fragmentShader:Ne.meshphong_frag},standard:{uniforms:_t([ae.common,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.roughnessmap,ae.metalnessmap,ae.fog,ae.lights,{emissive:{value:new le(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag},toon:{uniforms:_t([ae.common,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.gradientmap,ae.fog,ae.lights,{emissive:{value:new le(0)}}]),vertexShader:Ne.meshtoon_vert,fragmentShader:Ne.meshtoon_frag},matcap:{uniforms:_t([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,{matcap:{value:null}}]),vertexShader:Ne.meshmatcap_vert,fragmentShader:Ne.meshmatcap_frag},points:{uniforms:_t([ae.points,ae.fog]),vertexShader:Ne.points_vert,fragmentShader:Ne.points_frag},dashed:{uniforms:_t([ae.common,ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ne.linedashed_vert,fragmentShader:Ne.linedashed_frag},depth:{uniforms:_t([ae.common,ae.displacementmap]),vertexShader:Ne.depth_vert,fragmentShader:Ne.depth_frag},normal:{uniforms:_t([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,{opacity:{value:1}}]),vertexShader:Ne.normal_vert,fragmentShader:Ne.normal_frag},sprite:{uniforms:_t([ae.sprite,ae.fog]),vertexShader:Ne.sprite_vert,fragmentShader:Ne.sprite_frag},background:{uniforms:{uvTransform:{value:new gt},t2D:{value:null}},vertexShader:Ne.background_vert,fragmentShader:Ne.background_frag},cube:{uniforms:_t([ae.envmap,{opacity:{value:1}}]),vertexShader:Ne.cube_vert,fragmentShader:Ne.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ne.equirect_vert,fragmentShader:Ne.equirect_frag},distanceRGBA:{uniforms:_t([ae.common,ae.displacementmap,{referencePosition:{value:new T},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ne.distanceRGBA_vert,fragmentShader:Ne.distanceRGBA_frag},shadow:{uniforms:_t([ae.lights,ae.fog,{color:{value:new le(0)},opacity:{value:1}}]),vertexShader:Ne.shadow_vert,fragmentShader:Ne.shadow_frag}};nn.physical={uniforms:_t([nn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatNormalScale:{value:new Q(1,1)},clearcoatNormalMap:{value:null},sheen:{value:new le(0)},transmission:{value:0},transmissionMap:{value:null}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag};function x0(s,e,t,n,i){const r=new le(0);let o=0,a,l,c=null,h=0,u=null;function d(m,x,v,g){let f=x.isScene===!0?x.background:null;f&&f.isTexture&&(f=e.get(f));const _=s.xr,w=_.getSession&&_.getSession();w&&w.environmentBlendMode==="additive"&&(f=null),f===null?p(r,o):f&&f.isColor&&(p(f,1),g=!0),(s.autoClear||g)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),f&&(f.isCubeTexture||f.mapping===pl)?(l===void 0&&(l=new Qe(new yl(1,1,1),new vt({name:"BackgroundCubeMaterial",uniforms:es(nn.cube.uniforms),vertexShader:nn.cube.vertexShader,fragmentShader:nn.cube.fragmentShader,side:st,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(E,y,S){this.matrixWorld.copyPosition(S.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=f,l.material.uniforms.flipEnvMap.value=f.isCubeTexture&&f._needsFlipEnvMap?-1:1,(c!==f||h!==f.version||u!==s.toneMapping)&&(l.material.needsUpdate=!0,c=f,h=f.version,u=s.toneMapping),m.unshift(l,l.geometry,l.material,0,0,null)):f&&f.isTexture&&(a===void 0&&(a=new Qe(new cs(2,2),new vt({name:"BackgroundMaterial",uniforms:es(nn.background.uniforms),vertexShader:nn.background.vertexShader,fragmentShader:nn.background.fragmentShader,side:pr,depthTest:!1,depthWrite:!1,fog:!1})),a.geometry.deleteAttribute("normal"),Object.defineProperty(a.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(a)),a.material.uniforms.t2D.value=f,f.matrixAutoUpdate===!0&&f.updateMatrix(),a.material.uniforms.uvTransform.value.copy(f.matrix),(c!==f||h!==f.version||u!==s.toneMapping)&&(a.material.needsUpdate=!0,c=f,h=f.version,u=s.toneMapping),m.unshift(a,a.geometry,a.material,0,0,null))}function p(m,x){t.buffers.color.setClear(m.r,m.g,m.b,x,i)}return{getClearColor:function(){return r},setClearColor:function(m,x=1){r.set(m),o=x,p(r,o)},getClearAlpha:function(){return o},setClearAlpha:function(m){o=m,p(r,o)},render:d}}function v0(s,e,t,n){const i=s.getParameter(34921),r=n.isWebGL2?null:e.get("OES_vertex_array_object"),o=n.isWebGL2||r!==null,a={},l=x(null);let c=l;function h(L,D,N,R,X){let K=!1;if(o){const Z=m(R,N,D);c!==Z&&(c=Z,d(c.object)),K=v(R,X),K&&g(R,X)}else{const Z=D.wireframe===!0;(c.geometry!==R.id||c.program!==N.id||c.wireframe!==Z)&&(c.geometry=R.id,c.program=N.id,c.wireframe=Z,K=!0)}L.isInstancedMesh===!0&&(K=!0),X!==null&&t.update(X,34963),K&&(S(L,D,N,R),X!==null&&s.bindBuffer(34963,t.get(X).buffer))}function u(){return n.isWebGL2?s.createVertexArray():r.createVertexArrayOES()}function d(L){return n.isWebGL2?s.bindVertexArray(L):r.bindVertexArrayOES(L)}function p(L){return n.isWebGL2?s.deleteVertexArray(L):r.deleteVertexArrayOES(L)}function m(L,D,N){const R=N.wireframe===!0;let X=a[L.id];X===void 0&&(X={},a[L.id]=X);let K=X[D.id];K===void 0&&(K={},X[D.id]=K);let Z=K[R];return Z===void 0&&(Z=x(u()),K[R]=Z),Z}function x(L){const D=[],N=[],R=[];for(let X=0;X<i;X++)D[X]=0,N[X]=0,R[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:N,attributeDivisors:R,object:L,attributes:{},index:null}}function v(L,D){const N=c.attributes,R=L.attributes;let X=0;for(const K in R){const Z=N[K],ee=R[K];if(Z===void 0||Z.attribute!==ee||Z.data!==ee.data)return!0;X++}return c.attributesNum!==X||c.index!==D}function g(L,D){const N={},R=L.attributes;let X=0;for(const K in R){const Z=R[K],ee={};ee.attribute=Z,Z.data&&(ee.data=Z.data),N[K]=ee,X++}c.attributes=N,c.attributesNum=X,c.index=D}function f(){const L=c.newAttributes;for(let D=0,N=L.length;D<N;D++)L[D]=0}function _(L){w(L,0)}function w(L,D){const N=c.newAttributes,R=c.enabledAttributes,X=c.attributeDivisors;N[L]=1,R[L]===0&&(s.enableVertexAttribArray(L),R[L]=1),X[L]!==D&&((n.isWebGL2?s:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](L,D),X[L]=D)}function E(){const L=c.newAttributes,D=c.enabledAttributes;for(let N=0,R=D.length;N<R;N++)D[N]!==L[N]&&(s.disableVertexAttribArray(N),D[N]=0)}function y(L,D,N,R,X,K){n.isWebGL2===!0&&(N===5124||N===5125)?s.vertexAttribIPointer(L,D,N,X,K):s.vertexAttribPointer(L,D,N,R,X,K)}function S(L,D,N,R){if(n.isWebGL2===!1&&(L.isInstancedMesh||R.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;f();const X=R.attributes,K=N.getAttributes(),Z=D.defaultAttributeValues;for(const ee in K){const re=K[ee];if(re>=0){const pe=X[ee];if(pe!==void 0){const Me=pe.normalized,W=pe.itemSize,Ie=t.get(pe);if(Ie===void 0)continue;const Ce=Ie.buffer,ge=Ie.type,fe=Ie.bytesPerElement;if(pe.isInterleavedBufferAttribute){const Se=pe.data,we=Se.stride,Te=pe.offset;Se&&Se.isInstancedInterleavedBuffer?(w(re,Se.meshPerAttribute),R._maxInstanceCount===void 0&&(R._maxInstanceCount=Se.meshPerAttribute*Se.count)):_(re),s.bindBuffer(34962,Ce),y(re,W,ge,Me,we*fe,Te*fe)}else pe.isInstancedBufferAttribute?(w(re,pe.meshPerAttribute),R._maxInstanceCount===void 0&&(R._maxInstanceCount=pe.meshPerAttribute*pe.count)):_(re),s.bindBuffer(34962,Ce),y(re,W,ge,Me,0,0)}else if(ee==="instanceMatrix"){const Me=t.get(L.instanceMatrix);if(Me===void 0)continue;const W=Me.buffer,Ie=Me.type;w(re+0,1),w(re+1,1),w(re+2,1),w(re+3,1),s.bindBuffer(34962,W),s.vertexAttribPointer(re+0,4,Ie,!1,64,0),s.vertexAttribPointer(re+1,4,Ie,!1,64,16),s.vertexAttribPointer(re+2,4,Ie,!1,64,32),s.vertexAttribPointer(re+3,4,Ie,!1,64,48)}else if(ee==="instanceColor"){const Me=t.get(L.instanceColor);if(Me===void 0)continue;const W=Me.buffer,Ie=Me.type;w(re,1),s.bindBuffer(34962,W),s.vertexAttribPointer(re,3,Ie,!1,12,0)}else if(Z!==void 0){const Me=Z[ee];if(Me!==void 0)switch(Me.length){case 2:s.vertexAttrib2fv(re,Me);break;case 3:s.vertexAttrib3fv(re,Me);break;case 4:s.vertexAttrib4fv(re,Me);break;default:s.vertexAttrib1fv(re,Me)}}}}E()}function C(){U();for(const L in a){const D=a[L];for(const N in D){const R=D[N];for(const X in R)p(R[X].object),delete R[X];delete D[N]}delete a[L]}}function I(L){if(a[L.id]===void 0)return;const D=a[L.id];for(const N in D){const R=D[N];for(const X in R)p(R[X].object),delete R[X];delete D[N]}delete a[L.id]}function B(L){for(const D in a){const N=a[D];if(N[L.id]===void 0)continue;const R=N[L.id];for(const X in R)p(R[X].object),delete R[X];delete N[L.id]}}function U(){z(),c!==l&&(c=l,d(c.object))}function z(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:U,resetDefaultState:z,dispose:C,releaseStatesOfGeometry:I,releaseStatesOfProgram:B,initAttributes:f,enableAttribute:_,disableUnusedAttributes:E}}function y0(s,e,t,n){const i=n.isWebGL2;let r;function o(c){r=c}function a(c,h){s.drawArrays(r,c,h),t.update(h,r,1)}function l(c,h,u){if(u===0)return;let d,p;if(i)d=s,p="drawArraysInstanced";else if(d=e.get("ANGLE_instanced_arrays"),p="drawArraysInstancedANGLE",d===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[p](r,c,h,u),t.update(h,r,u)}this.setMode=o,this.render=a,this.renderInstances=l}function _0(s,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const y=e.get("EXT_texture_filter_anisotropic");n=s.getParameter(y.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(y){if(y==="highp"){if(s.getShaderPrecisionFormat(35633,36338).precision>0&&s.getShaderPrecisionFormat(35632,36338).precision>0)return"highp";y="mediump"}return y==="mediump"&&s.getShaderPrecisionFormat(35633,36337).precision>0&&s.getShaderPrecisionFormat(35632,36337).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&s instanceof WebGL2RenderingContext||typeof WebGL2ComputeRenderingContext<"u"&&s instanceof WebGL2ComputeRenderingContext;let a=t.precision!==void 0?t.precision:"highp";const l=r(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=t.logarithmicDepthBuffer===!0,h=s.getParameter(34930),u=s.getParameter(35660),d=s.getParameter(3379),p=s.getParameter(34076),m=s.getParameter(34921),x=s.getParameter(36347),v=s.getParameter(36348),g=s.getParameter(36349),f=u>0,_=o||e.has("OES_texture_float"),w=f&&_,E=o?s.getParameter(36183):0;return{isWebGL2:o,getMaxAnisotropy:i,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:c,maxTextures:h,maxVertexTextures:u,maxTextureSize:d,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:x,maxVaryings:v,maxFragmentUniforms:g,vertexTextures:f,floatFragmentTextures:_,floatVertexTextures:w,maxSamples:E}}function M0(s){const e=this;let t=null,n=0,i=!1,r=!1;const o=new kt,a=new gt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d,p){const m=u.length!==0||d||n!==0||i;return i=d,t=h(u,p,0),n=u.length,m},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1,c()},this.setState=function(u,d,p){const m=u.clippingPlanes,x=u.clipIntersection,v=u.clipShadows,g=s.get(u);if(!i||m===null||m.length===0||r&&!v)r?h(null):c();else{const f=r?0:n,_=f*4;let w=g.clippingState||null;l.value=w,w=h(m,d,_,p);for(let E=0;E!==_;++E)w[E]=t[E];g.clippingState=w,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=f}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,p,m){const x=u!==null?u.length:0;let v=null;if(x!==0){if(v=l.value,m!==!0||v===null){const g=p+x*4,f=d.matrixWorldInverse;a.getNormalMatrix(f),(v===null||v.length<g)&&(v=new Float32Array(g));for(let _=0,w=p;_!==x;++_,w+=4)o.copy(u[_]).applyMatrix4(f,a),o.normal.toArray(v,w),v[w+3]=o.constant}l.value=v,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,v}}function w0(s){let e=new WeakMap;function t(o,a){return a===dc?o.mapping=dl:a===fc&&(o.mapping=fl),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===dc||a===fc)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=s.getRenderTarget(),h=new lu(l.height/2);return h.fromEquirectangularTexture(s,o),e.set(o,h),s.setRenderTarget(c),o.addEventListener("dispose",i),t(h.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}function b0(s){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?t("EXT_color_buffer_float"):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float")},get:function(n){const i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function S0(s,e,t,n){const i={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const m in d.attributes)e.remove(d.attributes[m]);d.removeEventListener("dispose",o),delete i[d.id];const p=r.get(d);p&&(e.remove(p),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const m in d)e.update(d[m],34962);const p=u.morphAttributes;for(const m in p){const x=p[m];for(let v=0,g=x.length;v<g;v++)e.update(x[v],34962)}}function c(u){const d=[],p=u.index,m=u.attributes.position;let x=0;if(p!==null){const f=p.array;x=p.version;for(let _=0,w=f.length;_<w;_+=3){const E=f[_+0],y=f[_+1],S=f[_+2];d.push(E,y,y,S,S,E)}}else{const f=m.array;x=m.version;for(let _=0,w=f.length/3-1;_<w;_+=3){const E=_+0,y=_+1,S=_+2;d.push(E,y,y,S,S,E)}}const v=new(au(d)>65535?ou:ru)(d,1);v.version=x;const g=r.get(u);g&&e.remove(g),r.set(u,v)}function h(u){const d=r.get(u);if(d){const p=u.index;p!==null&&d.version<p.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function T0(s,e,t,n){const i=n.isWebGL2;let r;function o(d){r=d}let a,l;function c(d){a=d.type,l=d.bytesPerElement}function h(d,p){s.drawElements(r,p,a,d*l),t.update(p,r,1)}function u(d,p,m){if(m===0)return;let x,v;if(i)x=s,v="drawElementsInstanced";else if(x=e.get("ANGLE_instanced_arrays"),v="drawElementsInstancedANGLE",x===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}x[v](r,p,a,d*l,m),t.update(p,r,m)}this.setMode=o,this.setIndex=c,this.render=h,this.renderInstances=u}function E0(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case 4:t.triangles+=a*(r/3);break;case 1:t.lines+=a*(r/2);break;case 3:t.lines+=a*(r-1);break;case 2:t.lines+=a*r;break;case 0:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.frame++,t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function A0(s,e){return s[0]-e[0]}function L0(s,e){return Math.abs(e[1])-Math.abs(s[1])}function C0(s){const e={},t=new Float32Array(8),n=[];for(let r=0;r<8;r++)n[r]=[r,0];function i(r,o,a,l){const c=r.morphTargetInfluences,h=c===void 0?0:c.length;let u=e[o.id];if(u===void 0){u=[];for(let v=0;v<h;v++)u[v]=[v,0];e[o.id]=u}for(let v=0;v<h;v++){const g=u[v];g[0]=v,g[1]=c[v]}u.sort(L0);for(let v=0;v<8;v++)v<h&&u[v][1]?(n[v][0]=u[v][0],n[v][1]=u[v][1]):(n[v][0]=Number.MAX_SAFE_INTEGER,n[v][1]=0);n.sort(A0);const d=a.morphTargets&&o.morphAttributes.position,p=a.morphNormals&&o.morphAttributes.normal;let m=0;for(let v=0;v<8;v++){const g=n[v],f=g[0],_=g[1];f!==Number.MAX_SAFE_INTEGER&&_?(d&&o.getAttribute("morphTarget"+v)!==d[f]&&o.setAttribute("morphTarget"+v,d[f]),p&&o.getAttribute("morphNormal"+v)!==p[f]&&o.setAttribute("morphNormal"+v,p[f]),t[v]=_,m+=_):(d&&o.hasAttribute("morphTarget"+v)===!0&&o.deleteAttribute("morphTarget"+v),p&&o.hasAttribute("morphNormal"+v)===!0&&o.deleteAttribute("morphNormal"+v),t[v]=0)}const x=o.morphTargetsRelative?1:1-m;l.getUniforms().setValue(s,"morphTargetBaseInfluence",x),l.getUniforms().setValue(s,"morphTargetInfluences",t)}return{update:i}}function R0(s,e,t,n){let i=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=e.get(l,h);return i.get(u)!==c&&(e.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),t.update(l.instanceMatrix,34962),l.instanceColor!==null&&t.update(l.instanceColor,34962)),u}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}class uu extends xt{constructor(e=null,t=1,n=1,i=1){super(null),this.image={data:e,width:t,height:n,depth:i},this.magFilter=St,this.minFilter=St,this.wrapR=Nt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.needsUpdate=!0}}uu.prototype.isDataTexture2DArray=!0;class du extends xt{constructor(e=null,t=1,n=1,i=1){super(null),this.image={data:e,width:t,height:n,depth:i},this.magFilter=St,this.minFilter=St,this.wrapR=Nt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.needsUpdate=!0}}du.prototype.isDataTexture3D=!0;const fu=new xt,P0=new uu,I0=new du,pu=new Io,Bc=[],zc=[],Oc=new Float32Array(16),Uc=new Float32Array(9),Hc=new Float32Array(4);function hs(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let r=Bc[i];if(r===void 0&&(r=new Float32Array(i),Bc[i]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function Ct(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function Tt(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function mu(s,e){let t=zc[e];t===void 0&&(t=new Int32Array(e),zc[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function D0(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function N0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;s.uniform2fv(this.addr,e),Tt(t,e)}}function F0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ct(t,e))return;s.uniform3fv(this.addr,e),Tt(t,e)}}function B0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;s.uniform4fv(this.addr,e),Tt(t,e)}}function z0(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ct(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Tt(t,e)}else{if(Ct(t,n))return;Hc.set(n),s.uniformMatrix2fv(this.addr,!1,Hc),Tt(t,n)}}function O0(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ct(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Tt(t,e)}else{if(Ct(t,n))return;Uc.set(n),s.uniformMatrix3fv(this.addr,!1,Uc),Tt(t,n)}}function U0(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ct(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Tt(t,e)}else{if(Ct(t,n))return;Oc.set(n),s.uniformMatrix4fv(this.addr,!1,Oc),Tt(t,n)}}function H0(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function G0(s,e){const t=this.cache;Ct(t,e)||(s.uniform2iv(this.addr,e),Tt(t,e))}function k0(s,e){const t=this.cache;Ct(t,e)||(s.uniform3iv(this.addr,e),Tt(t,e))}function V0(s,e){const t=this.cache;Ct(t,e)||(s.uniform4iv(this.addr,e),Tt(t,e))}function W0(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function X0(s,e){const t=this.cache;Ct(t,e)||(s.uniform2uiv(this.addr,e),Tt(t,e))}function q0(s,e){const t=this.cache;Ct(t,e)||(s.uniform3uiv(this.addr,e),Tt(t,e))}function Y0(s,e){const t=this.cache;Ct(t,e)||(s.uniform4uiv(this.addr,e),Tt(t,e))}function j0(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.safeSetTexture2D(e||fu,i)}function Z0(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||I0,i)}function J0(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.safeSetTextureCube(e||pu,i)}function K0(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||P0,i)}function Q0(s){switch(s){case 5126:return D0;case 35664:return N0;case 35665:return F0;case 35666:return B0;case 35674:return z0;case 35675:return O0;case 35676:return U0;case 5124:case 35670:return H0;case 35667:case 35671:return G0;case 35668:case 35672:return k0;case 35669:case 35673:return V0;case 5125:return W0;case 36294:return X0;case 36295:return q0;case 36296:return Y0;case 35678:case 36198:case 36298:case 36306:case 35682:return j0;case 35679:case 36299:case 36307:return Z0;case 35680:case 36300:case 36308:case 36293:return J0;case 36289:case 36303:case 36311:case 36292:return K0}}function $0(s,e){s.uniform1fv(this.addr,e)}function ex(s,e){const t=hs(e,this.size,2);s.uniform2fv(this.addr,t)}function tx(s,e){const t=hs(e,this.size,3);s.uniform3fv(this.addr,t)}function nx(s,e){const t=hs(e,this.size,4);s.uniform4fv(this.addr,t)}function ix(s,e){const t=hs(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function sx(s,e){const t=hs(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function rx(s,e){const t=hs(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function ox(s,e){s.uniform1iv(this.addr,e)}function ax(s,e){s.uniform2iv(this.addr,e)}function lx(s,e){s.uniform3iv(this.addr,e)}function cx(s,e){s.uniform4iv(this.addr,e)}function hx(s,e){s.uniform1uiv(this.addr,e)}function ux(s,e){s.uniform2uiv(this.addr,e)}function dx(s,e){s.uniform3uiv(this.addr,e)}function fx(s,e){s.uniform4uiv(this.addr,e)}function px(s,e,t){const n=e.length,i=mu(t,n);s.uniform1iv(this.addr,i);for(let r=0;r!==n;++r)t.safeSetTexture2D(e[r]||fu,i[r])}function mx(s,e,t){const n=e.length,i=mu(t,n);s.uniform1iv(this.addr,i);for(let r=0;r!==n;++r)t.safeSetTextureCube(e[r]||pu,i[r])}function gx(s){switch(s){case 5126:return $0;case 35664:return ex;case 35665:return tx;case 35666:return nx;case 35674:return ix;case 35675:return sx;case 35676:return rx;case 5124:case 35670:return ox;case 35667:case 35671:return ax;case 35668:case 35672:return lx;case 35669:case 35673:return cx;case 5125:return hx;case 36294:return ux;case 36295:return dx;case 36296:return fx;case 35678:case 36198:case 36298:case 36306:case 35682:return px;case 35680:case 36300:case 36308:case 36293:return mx}}function xx(s,e,t){this.id=s,this.addr=t,this.cache=[],this.setValue=Q0(e.type)}function gu(s,e,t){this.id=s,this.addr=t,this.cache=[],this.size=e.size,this.setValue=gx(e.type)}gu.prototype.updateCache=function(s){const e=this.cache;s instanceof Float32Array&&e.length!==s.length&&(this.cache=new Float32Array(s.length)),Tt(e,s)};function xu(s){this.id=s,this.seq=[],this.map={}}xu.prototype.setValue=function(s,e,t){const n=this.seq;for(let i=0,r=n.length;i!==r;++i){const o=n[i];o.setValue(s,e[o.id],t)}};const Ra=/(\w+)(\])?(\[|\.)?/g;function Gc(s,e){s.seq.push(e),s.map[e.id]=e}function vx(s,e,t){const n=s.name,i=n.length;for(Ra.lastIndex=0;;){const r=Ra.exec(n),o=Ra.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Gc(t,c===void 0?new xx(a,s,e):new gu(a,s,e));break}else{let u=t.map[a];u===void 0&&(u=new xu(a),Gc(t,u)),t=u}}}function Yn(s,e){this.seq=[],this.map={};const t=s.getProgramParameter(e,35718);for(let n=0;n<t;++n){const i=s.getActiveUniform(e,n),r=s.getUniformLocation(e,i.name);vx(i,r,this)}}Yn.prototype.setValue=function(s,e,t,n){const i=this.map[e];i!==void 0&&i.setValue(s,t,n)};Yn.prototype.setOptional=function(s,e,t){const n=e[t];n!==void 0&&this.setValue(s,t,n)};Yn.upload=function(s,e,t,n){for(let i=0,r=e.length;i!==r;++i){const o=e[i],a=t[o.id];a.needsUpdate!==!1&&o.setValue(s,a.value,n)}};Yn.seqWithValue=function(s,e){const t=[];for(let n=0,i=s.length;n!==i;++n){const r=s[n];r.id in e&&t.push(r)}return t};function kc(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}let yx=0;function _x(s){const e=s.split(`
`);for(let t=0;t<e.length;t++)e[t]=t+1+": "+e[t];return e.join(`
`)}function vu(s){switch(s){case gr:return["Linear","( value )"];case tr:return["sRGB","( value )"];case lp:return["RGBE","( value )"];case hp:return["RGBM","( value, 7.0 )"];case up:return["RGBM","( value, 16.0 )"];case dp:return["RGBD","( value, 256.0 )"];case ap:return["Gamma","( value, float( GAMMA_FACTOR ) )"];case cp:return["LogLuv","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported encoding:",s),["Linear","( value )"]}}function Vc(s,e,t){const n=s.getShaderParameter(e,35713),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";const r=s.getShaderSource(e);return"THREE.WebGLShader: gl.getShaderInfoLog() "+t+`
`+i+_x(r)}function Es(s,e){const t=vu(e);return"vec4 "+s+"( vec4 value ) { return "+t[0]+"ToLinear"+t[1]+"; }"}function Mx(s,e){const t=vu(e);return"vec4 "+s+"( vec4 value ) { return LinearTo"+t[0]+t[1]+"; }"}function wx(s,e){let t;switch(e){case af:t="Linear";break;case Jh:t="Reinhard";break;case lf:t="OptimizedCineon";break;case cf:t="ACESFilmic";break;case hf:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function bx(s){return[s.extensionDerivatives||s.envMapCubeUV||s.bumpMap||s.tangentSpaceNormalMap||s.clearcoatNormalMap||s.flatShading||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Fs).join(`
`)}function Sx(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Tx(s,e){const t={},n=s.getProgramParameter(e,35721);for(let i=0;i<n;i++){const o=s.getActiveAttrib(e,i).name;t[o]=s.getAttribLocation(e,o)}return t}function Fs(s){return s!==""}function Wc(s,e){return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Xc(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Ex=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ja(s){return s.replace(Ex,Ax)}function Ax(s,e){const t=Ne[e];if(t===void 0)throw new Error("Can not resolve #include <"+e+">");return Ja(t)}const Lx=/#pragma unroll_loop[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g,Cx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function qc(s){return s.replace(Cx,yu).replace(Lx,Rx)}function Rx(s,e,t,n){return console.warn("WebGLProgram: #pragma unroll_loop shader syntax is deprecated. Please use #pragma unroll_loop_start syntax instead."),yu(s,e,t,n)}function yu(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Yc(s){let e="precision "+s.precision+` float;
precision `+s.precision+" int;";return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Px(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Xh?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===qh?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Ns&&(e="SHADOWMAP_TYPE_VSM"),e}function Ix(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case dl:case fl:e="ENVMAP_TYPE_CUBE";break;case pl:case ml:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Dx(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case fl:case ml:e="ENVMAP_MODE_REFRACTION";break}return e}function Nx(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Po:e="ENVMAP_BLENDING_MULTIPLY";break;case rf:e="ENVMAP_BLENDING_MIX";break;case of:e="ENVMAP_BLENDING_ADD";break}return e}function Fx(s,e,t,n){const i=s.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=Px(t),c=Ix(t),h=Dx(t),u=Nx(t),d=s.gammaFactor>0?s.gammaFactor:1,p=t.isWebGL2?"":bx(t),m=Sx(r),x=i.createProgram();let v,g,f=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(v=[m].filter(Fs).join(`
`),v.length>0&&(v+=`
`),g=[p,m].filter(Fs).join(`
`),g.length>0&&(g+=`
`)):(v=[Yc(t),"#define SHADER_NAME "+t.shaderName,m,t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.supportsVertexTextures?"#define VERTEX_TEXTURES":"","#define GAMMA_FACTOR "+d,"#define MAX_BONES "+t.maxBones,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMap&&t.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",t.normalMap&&t.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.displacementMap&&t.supportsVertexTextures?"#define USE_DISPLACEMENTMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUvs?"#define USE_UV":"",t.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.useVertexTexture?"#define BONE_TEXTURE":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_MORPHTARGETS","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Fs).join(`
`),g=[p,Yc(t),"#define SHADER_NAME "+t.shaderName,m,t.alphaTest?"#define ALPHATEST "+t.alphaTest+(t.alphaTest%1?"":".0"):"","#define GAMMA_FACTOR "+d,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMap&&t.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",t.normalMap&&t.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.sheen?"#define USE_SHEEN":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUvs?"#define USE_UV":"",t.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.physicallyCorrectLights?"#define PHYSICALLY_CORRECT_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"",(t.extensionShaderTextureLOD||t.envMap)&&t.rendererExtensionShaderTextureLod?"#define TEXTURE_LOD_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Vs?"#define TONE_MAPPING":"",t.toneMapping!==Vs?Ne.tonemapping_pars_fragment:"",t.toneMapping!==Vs?wx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",Ne.encodings_pars_fragment,t.map?Es("mapTexelToLinear",t.mapEncoding):"",t.matcap?Es("matcapTexelToLinear",t.matcapEncoding):"",t.envMap?Es("envMapTexelToLinear",t.envMapEncoding):"",t.emissiveMap?Es("emissiveMapTexelToLinear",t.emissiveMapEncoding):"",t.lightMap?Es("lightMapTexelToLinear",t.lightMapEncoding):"",Mx("linearToOutputTexel",t.outputEncoding),t.depthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Fs).join(`
`)),o=Ja(o),o=Wc(o,t),o=Xc(o,t),a=Ja(a),a=Wc(a,t),a=Xc(a,t),o=qc(o),a=qc(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(f=`#version 300 es
`,v=["#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+v,g=["#define varying in",t.glslVersion===Sc?"":"out highp vec4 pc_fragColor;",t.glslVersion===Sc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const _=f+v+o,w=f+g+a,E=kc(i,35633,_),y=kc(i,35632,w);if(i.attachShader(x,E),i.attachShader(x,y),t.index0AttributeName!==void 0?i.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(x,0,"position"),i.linkProgram(x),s.debug.checkShaderErrors){const I=i.getProgramInfoLog(x).trim(),B=i.getShaderInfoLog(E).trim(),U=i.getShaderInfoLog(y).trim();let z=!0,L=!0;if(i.getProgramParameter(x,35714)===!1){z=!1;const D=Vc(i,E,"vertex"),N=Vc(i,y,"fragment");console.error("THREE.WebGLProgram: shader error: ",i.getError(),"35715",i.getProgramParameter(x,35715),"gl.getProgramInfoLog",I,D,N)}else I!==""?console.warn("THREE.WebGLProgram: gl.getProgramInfoLog()",I):(B===""||U==="")&&(L=!1);L&&(this.diagnostics={runnable:z,programLog:I,vertexShader:{log:B,prefix:v},fragmentShader:{log:U,prefix:g}})}i.deleteShader(E),i.deleteShader(y);let S;this.getUniforms=function(){return S===void 0&&(S=new Yn(i,x)),S};let C;return this.getAttributes=function(){return C===void 0&&(C=Tx(i,x)),C},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(x),this.program=void 0},this.name=t.shaderName,this.id=yx++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=E,this.fragmentShader=y,this}function Bx(s,e,t,n,i,r){const o=[],a=n.isWebGL2,l=n.logarithmicDepthBuffer,c=n.floatVertexTextures,h=n.maxVertexUniforms,u=n.vertexTextures;let d=n.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"},m=["precision","isWebGL2","supportsVertexTextures","outputEncoding","instancing","instancingColor","map","mapEncoding","matcap","matcapEncoding","envMap","envMapMode","envMapEncoding","envMapCubeUV","lightMap","lightMapEncoding","aoMap","emissiveMap","emissiveMapEncoding","bumpMap","normalMap","objectSpaceNormalMap","tangentSpaceNormalMap","clearcoatMap","clearcoatRoughnessMap","clearcoatNormalMap","displacementMap","specularMap","roughnessMap","metalnessMap","gradientMap","alphaMap","combine","vertexColors","vertexAlphas","vertexTangents","vertexUvs","uvsVertexOnly","fog","useFog","fogExp2","flatShading","sizeAttenuation","logarithmicDepthBuffer","skinning","maxBones","useVertexTexture","morphTargets","morphNormals","premultipliedAlpha","numDirLights","numPointLights","numSpotLights","numHemiLights","numRectAreaLights","numDirLightShadows","numPointLightShadows","numSpotLightShadows","shadowMapEnabled","shadowMapType","toneMapping","physicallyCorrectLights","alphaTest","doubleSided","flipSided","numClippingPlanes","numClipIntersection","depthPacking","dithering","sheen","transmissionMap"];function x(y){const C=y.skeleton.bones;if(c)return 1024;{const B=Math.floor((h-20)/4),U=Math.min(B,C.length);return U<C.length?(console.warn("THREE.WebGLRenderer: Skeleton has "+C.length+" bones. This GPU supports "+U+"."),0):U}}function v(y){let S;return y&&y.isTexture?S=y.encoding:y&&y.isWebGLRenderTarget?(console.warn("THREE.WebGLPrograms.getTextureEncodingFromMap: don't use render targets as textures. Use their .texture property instead."),S=y.texture.encoding):S=gr,S}function g(y,S,C,I,B){const U=I.fog,z=y.isMeshStandardMaterial?I.environment:null,L=e.get(y.envMap||z),D=p[y.type],N=B.isSkinnedMesh?x(B):0;y.precision!==null&&(d=n.getMaxPrecision(y.precision),d!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",d,"instead."));let R,X;if(D){const ee=nn[D];R=ee.vertexShader,X=ee.fragmentShader}else R=y.vertexShader,X=y.fragmentShader;const K=s.getRenderTarget();return{isWebGL2:a,shaderID:D,shaderName:y.type,vertexShader:R,fragmentShader:X,defines:y.defines,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:d,instancing:B.isInstancedMesh===!0,instancingColor:B.isInstancedMesh===!0&&B.instanceColor!==null,supportsVertexTextures:u,outputEncoding:K!==null?v(K.texture):s.outputEncoding,map:!!y.map,mapEncoding:v(y.map),matcap:!!y.matcap,matcapEncoding:v(y.matcap),envMap:!!L,envMapMode:L&&L.mapping,envMapEncoding:v(L),envMapCubeUV:!!L&&(L.mapping===pl||L.mapping===ml),lightMap:!!y.lightMap,lightMapEncoding:v(y.lightMap),aoMap:!!y.aoMap,emissiveMap:!!y.emissiveMap,emissiveMapEncoding:v(y.emissiveMap),bumpMap:!!y.bumpMap,normalMap:!!y.normalMap,objectSpaceNormalMap:y.normalMapType===mp,tangentSpaceNormalMap:y.normalMapType===gi,clearcoatMap:!!y.clearcoatMap,clearcoatRoughnessMap:!!y.clearcoatRoughnessMap,clearcoatNormalMap:!!y.clearcoatNormalMap,displacementMap:!!y.displacementMap,roughnessMap:!!y.roughnessMap,metalnessMap:!!y.metalnessMap,specularMap:!!y.specularMap,alphaMap:!!y.alphaMap,gradientMap:!!y.gradientMap,sheen:!!y.sheen,transmissionMap:!!y.transmissionMap,combine:y.combine,vertexTangents:y.normalMap&&y.vertexTangents,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&B.geometry&&B.geometry.attributes.color&&B.geometry.attributes.color.itemSize===4,vertexUvs:!!y.map||!!y.bumpMap||!!y.normalMap||!!y.specularMap||!!y.alphaMap||!!y.emissiveMap||!!y.roughnessMap||!!y.metalnessMap||!!y.clearcoatMap||!!y.clearcoatRoughnessMap||!!y.clearcoatNormalMap||!!y.displacementMap||!!y.transmissionMap,uvsVertexOnly:!(y.map||y.bumpMap||y.normalMap||y.specularMap||y.alphaMap||y.emissiveMap||y.roughnessMap||y.metalnessMap||y.clearcoatNormalMap||y.transmissionMap)&&!!y.displacementMap,fog:!!U,useFog:y.fog,fogExp2:U&&U.isFogExp2,flatShading:!!y.flatShading,sizeAttenuation:y.sizeAttenuation,logarithmicDepthBuffer:l,skinning:y.skinning&&N>0,maxBones:N,useVertexTexture:c,morphTargets:y.morphTargets,morphNormals:y.morphNormals,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:s.shadowMap.enabled&&C.length>0,shadowMapType:s.shadowMap.type,toneMapping:y.toneMapped?s.toneMapping:Vs,physicallyCorrectLights:s.physicallyCorrectLights,premultipliedAlpha:y.premultipliedAlpha,alphaTest:y.alphaTest,doubleSided:y.side===ln,flipSided:y.side===st,depthPacking:y.depthPacking!==void 0?y.depthPacking:!1,index0AttributeName:y.index0AttributeName,extensionDerivatives:y.extensions&&y.extensions.derivatives,extensionFragDepth:y.extensions&&y.extensions.fragDepth,extensionDrawBuffers:y.extensions&&y.extensions.drawBuffers,extensionShaderTextureLOD:y.extensions&&y.extensions.shaderTextureLOD,rendererExtensionFragDepth:a||t.has("EXT_frag_depth"),rendererExtensionDrawBuffers:a||t.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:a||t.has("EXT_shader_texture_lod"),customProgramCacheKey:y.customProgramCacheKey()}}function f(y){const S=[];if(y.shaderID?S.push(y.shaderID):(S.push(y.fragmentShader),S.push(y.vertexShader)),y.defines!==void 0)for(const C in y.defines)S.push(C),S.push(y.defines[C]);if(y.isRawShaderMaterial===!1){for(let C=0;C<m.length;C++)S.push(y[m[C]]);S.push(s.outputEncoding),S.push(s.gammaFactor)}return S.push(y.customProgramCacheKey),S.join()}function _(y){const S=p[y.type];let C;if(S){const I=nn[S];C=qp.clone(I.uniforms)}else C=y.uniforms;return C}function w(y,S){let C;for(let I=0,B=o.length;I<B;I++){const U=o[I];if(U.cacheKey===S){C=U,++C.usedTimes;break}}return C===void 0&&(C=new Fx(s,S,y,i),o.push(C)),C}function E(y){if(--y.usedTimes===0){const S=o.indexOf(y);o[S]=o[o.length-1],o.pop(),y.destroy()}}return{getParameters:g,getProgramCacheKey:f,getUniforms:_,acquireProgram:w,releaseProgram:E,programs:o}}function zx(){let s=new WeakMap;function e(r){let o=s.get(r);return o===void 0&&(o={},s.set(r,o)),o}function t(r){s.delete(r)}function n(r,o,a){s.get(r)[o]=a}function i(){s=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function Ox(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.program!==e.program?s.program.id-e.program.id:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Ux(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function jc(s){const e=[];let t=0;const n=[],i=[],r={id:-1};function o(){t=0,n.length=0,i.length=0}function a(d,p,m,x,v,g){let f=e[t];const _=s.get(m);return f===void 0?(f={id:d.id,object:d,geometry:p,material:m,program:_.program||r,groupOrder:x,renderOrder:d.renderOrder,z:v,group:g},e[t]=f):(f.id=d.id,f.object=d,f.geometry=p,f.material=m,f.program=_.program||r,f.groupOrder=x,f.renderOrder=d.renderOrder,f.z=v,f.group=g),t++,f}function l(d,p,m,x,v,g){const f=a(d,p,m,x,v,g);(m.transparent===!0?i:n).push(f)}function c(d,p,m,x,v,g){const f=a(d,p,m,x,v,g);(m.transparent===!0?i:n).unshift(f)}function h(d,p){n.length>1&&n.sort(d||Ox),i.length>1&&i.sort(p||Ux)}function u(){for(let d=t,p=e.length;d<p;d++){const m=e[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.program=null,m.group=null}}return{opaque:n,transparent:i,init:o,push:l,unshift:c,finish:u,sort:h}}function Hx(s){let e=new WeakMap;function t(i,r){let o;return e.has(i)===!1?(o=new jc(s),e.set(i,[o])):r>=e.get(i).length?(o=new jc(s),e.get(i).push(o)):o=e.get(i)[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}function Gx(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new T,color:new le};break;case"SpotLight":t={position:new T,direction:new T,color:new le,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new T,color:new le,distance:0,decay:0};break;case"HemisphereLight":t={direction:new T,skyColor:new le,groundColor:new le};break;case"RectAreaLight":t={color:new le,position:new T,halfWidth:new T,halfHeight:new T};break}return s[e.id]=t,t}}}function kx(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Q};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Q};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Q,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let Vx=0;function Wx(s,e){return(e.castShadow?1:0)-(s.castShadow?1:0)}function Xx(s,e){const t=new Gx,n=kx(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotShadow:[],spotShadowMap:[],spotShadowMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[]};for(let h=0;h<9;h++)i.probe.push(new T);const r=new T,o=new ue,a=new ue;function l(h){let u=0,d=0,p=0;for(let S=0;S<9;S++)i.probe[S].set(0,0,0);let m=0,x=0,v=0,g=0,f=0,_=0,w=0,E=0;h.sort(Wx);for(let S=0,C=h.length;S<C;S++){const I=h[S],B=I.color,U=I.intensity,z=I.distance,L=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)u+=B.r*U,d+=B.g*U,p+=B.b*U;else if(I.isLightProbe)for(let D=0;D<9;D++)i.probe[D].addScaledVector(I.sh.coefficients[D],U);else if(I.isDirectionalLight){const D=t.get(I);if(D.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const N=I.shadow,R=n.get(I);R.shadowBias=N.bias,R.shadowNormalBias=N.normalBias,R.shadowRadius=N.radius,R.shadowMapSize=N.mapSize,i.directionalShadow[m]=R,i.directionalShadowMap[m]=L,i.directionalShadowMatrix[m]=I.shadow.matrix,_++}i.directional[m]=D,m++}else if(I.isSpotLight){const D=t.get(I);if(D.position.setFromMatrixPosition(I.matrixWorld),D.color.copy(B).multiplyScalar(U),D.distance=z,D.coneCos=Math.cos(I.angle),D.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),D.decay=I.decay,I.castShadow){const N=I.shadow,R=n.get(I);R.shadowBias=N.bias,R.shadowNormalBias=N.normalBias,R.shadowRadius=N.radius,R.shadowMapSize=N.mapSize,i.spotShadow[v]=R,i.spotShadowMap[v]=L,i.spotShadowMatrix[v]=I.shadow.matrix,E++}i.spot[v]=D,v++}else if(I.isRectAreaLight){const D=t.get(I);D.color.copy(B).multiplyScalar(U),D.halfWidth.set(I.width*.5,0,0),D.halfHeight.set(0,I.height*.5,0),i.rectArea[g]=D,g++}else if(I.isPointLight){const D=t.get(I);if(D.color.copy(I.color).multiplyScalar(I.intensity),D.distance=I.distance,D.decay=I.decay,I.castShadow){const N=I.shadow,R=n.get(I);R.shadowBias=N.bias,R.shadowNormalBias=N.normalBias,R.shadowRadius=N.radius,R.shadowMapSize=N.mapSize,R.shadowCameraNear=N.camera.near,R.shadowCameraFar=N.camera.far,i.pointShadow[x]=R,i.pointShadowMap[x]=L,i.pointShadowMatrix[x]=I.shadow.matrix,w++}i.point[x]=D,x++}else if(I.isHemisphereLight){const D=t.get(I);D.skyColor.copy(I.color).multiplyScalar(U),D.groundColor.copy(I.groundColor).multiplyScalar(U),i.hemi[f]=D,f++}}g>0&&(e.isWebGL2||s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ae.LTC_FLOAT_1,i.rectAreaLTC2=ae.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=ae.LTC_HALF_1,i.rectAreaLTC2=ae.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=p;const y=i.hash;(y.directionalLength!==m||y.pointLength!==x||y.spotLength!==v||y.rectAreaLength!==g||y.hemiLength!==f||y.numDirectionalShadows!==_||y.numPointShadows!==w||y.numSpotShadows!==E)&&(i.directional.length=m,i.spot.length=v,i.rectArea.length=g,i.point.length=x,i.hemi.length=f,i.directionalShadow.length=_,i.directionalShadowMap.length=_,i.pointShadow.length=w,i.pointShadowMap.length=w,i.spotShadow.length=E,i.spotShadowMap.length=E,i.directionalShadowMatrix.length=_,i.pointShadowMatrix.length=w,i.spotShadowMatrix.length=E,y.directionalLength=m,y.pointLength=x,y.spotLength=v,y.rectAreaLength=g,y.hemiLength=f,y.numDirectionalShadows=_,y.numPointShadows=w,y.numSpotShadows=E,i.version=Vx++)}function c(h,u){let d=0,p=0,m=0,x=0,v=0;const g=u.matrixWorldInverse;for(let f=0,_=h.length;f<_;f++){const w=h[f];if(w.isDirectionalLight){const E=i.directional[d];E.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(g),d++}else if(w.isSpotLight){const E=i.spot[m];E.position.setFromMatrixPosition(w.matrixWorld),E.position.applyMatrix4(g),E.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(g),m++}else if(w.isRectAreaLight){const E=i.rectArea[x];E.position.setFromMatrixPosition(w.matrixWorld),E.position.applyMatrix4(g),a.identity(),o.copy(w.matrixWorld),o.premultiply(g),a.extractRotation(o),E.halfWidth.set(w.width*.5,0,0),E.halfHeight.set(0,w.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),x++}else if(w.isPointLight){const E=i.point[p];E.position.setFromMatrixPosition(w.matrixWorld),E.position.applyMatrix4(g),p++}else if(w.isHemisphereLight){const E=i.hemi[v];E.direction.setFromMatrixPosition(w.matrixWorld),E.direction.transformDirection(g),E.direction.normalize(),v++}}}return{setup:l,setupView:c,state:i}}function Zc(s,e){const t=new Xx(s,e),n=[],i=[];function r(){n.length=0,i.length=0}function o(u){n.push(u)}function a(u){i.push(u)}function l(){t.setup(n)}function c(u){t.setupView(n,u)}return{init:r,state:{lightsArray:n,shadowsArray:i,lights:t},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function qx(s,e){let t=new WeakMap;function n(r,o=0){let a;return t.has(r)===!1?(a=new Zc(s,e),t.set(r,[a])):o>=t.get(r).length?(a=new Zc(s,e),t.get(r).push(a)):a=t.get(r)[o],a}function i(){t=new WeakMap}return{get:n,dispose:i}}class _u extends ht{constructor(e){super(),this.type="MeshDepthMaterial",this.depthPacking=fp,this.skinning=!1,this.morphTargets=!1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}_u.prototype.isMeshDepthMaterial=!0;class Mu extends ht{constructor(e){super(),this.type="MeshDistanceMaterial",this.referencePosition=new T,this.nearDistance=1,this.farDistance=1e3,this.skinning=!1,this.morphTargets=!1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.fog=!1,this.setValues(e)}copy(e){return super.copy(e),this.referencePosition.copy(e.referencePosition),this.nearDistance=e.nearDistance,this.farDistance=e.farDistance,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}Mu.prototype.isMeshDistanceMaterial=!0;var Yx=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	float mean = 0.0;
	float squared_mean = 0.0;
	float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy ) / resolution ) );
	for ( float i = -1.0; i < 1.0 ; i += SAMPLE_RATE) {
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( i, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, i ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean * HALF_SAMPLE_RATE;
	squared_mean = squared_mean * HALF_SAMPLE_RATE;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`,jx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`;function wu(s,e,t){let n=new Do;const i=new Q,r=new Q,o=new qe,a=[],l=[],c={},h=t.maxTextureSize,u={0:st,1:pr,2:ln},d=new vt({defines:{SAMPLE_RATE:2/8,HALF_SAMPLE_RATE:1/8},uniforms:{shadow_pass:{value:null},resolution:{value:new Q},radius:{value:4}},vertexShader:jx,fragmentShader:Yx}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const m=new Be;m.setAttribute("position",new Le(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Qe(m,d),v=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Xh,this.render=function(y,S,C){if(v.enabled===!1||v.autoUpdate===!1&&v.needsUpdate===!1||y.length===0)return;const I=s.getRenderTarget(),B=s.getActiveCubeFace(),U=s.getActiveMipmapLevel(),z=s.state;z.setBlending(ks),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);for(let L=0,D=y.length;L<D;L++){const N=y[L],R=N.shadow;if(R===void 0){console.warn("THREE.WebGLShadowMap:",N,"has no shadow.");continue}if(R.autoUpdate===!1&&R.needsUpdate===!1)continue;i.copy(R.mapSize);const X=R.getFrameExtents();if(i.multiply(X),r.copy(R.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/X.x),i.x=r.x*X.x,R.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/X.y),i.y=r.y*X.y,R.mapSize.y=r.y)),R.map===null&&!R.isPointLightShadow&&this.type===Ns){const Z={minFilter:Ft,magFilter:Ft,format:$t};R.map=new hi(i.x,i.y,Z),R.map.texture.name=N.name+".shadowMap",R.mapPass=new hi(i.x,i.y,Z),R.camera.updateProjectionMatrix()}if(R.map===null){const Z={minFilter:St,magFilter:St,format:$t};R.map=new hi(i.x,i.y,Z),R.map.texture.name=N.name+".shadowMap",R.camera.updateProjectionMatrix()}s.setRenderTarget(R.map),s.clear();const K=R.getViewportCount();for(let Z=0;Z<K;Z++){const ee=R.getViewport(Z);o.set(r.x*ee.x,r.y*ee.y,r.x*ee.z,r.y*ee.w),z.viewport(o),R.updateMatrices(N,Z),n=R.getFrustum(),E(S,C,R.camera,N,this.type)}!R.isPointLightShadow&&this.type===Ns&&g(R,C),R.needsUpdate=!1}v.needsUpdate=!1,s.setRenderTarget(I,B,U)};function g(y,S){const C=e.update(x);d.uniforms.shadow_pass.value=y.map.texture,d.uniforms.resolution.value=y.mapSize,d.uniforms.radius.value=y.radius,s.setRenderTarget(y.mapPass),s.clear(),s.renderBufferDirect(S,null,C,d,x,null),p.uniforms.shadow_pass.value=y.mapPass.texture,p.uniforms.resolution.value=y.mapSize,p.uniforms.radius.value=y.radius,s.setRenderTarget(y.map),s.clear(),s.renderBufferDirect(S,null,C,p,x,null)}function f(y,S,C){const I=y<<0|S<<1|C<<2;let B=a[I];return B===void 0&&(B=new _u({depthPacking:pp,morphTargets:y,skinning:S}),a[I]=B),B}function _(y,S,C){const I=y<<0|S<<1|C<<2;let B=l[I];return B===void 0&&(B=new Mu({morphTargets:y,skinning:S}),l[I]=B),B}function w(y,S,C,I,B,U,z){let L=null,D=f,N=y.customDepthMaterial;if(I.isPointLight===!0&&(D=_,N=y.customDistanceMaterial),N===void 0){let R=!1;C.morphTargets===!0&&(R=S.morphAttributes&&S.morphAttributes.position&&S.morphAttributes.position.length>0);let X=!1;y.isSkinnedMesh===!0&&(C.skinning===!0?X=!0:console.warn("THREE.WebGLShadowMap: THREE.SkinnedMesh with material.skinning set to false:",y));const K=y.isInstancedMesh===!0;L=D(R,X,K)}else L=N;if(s.localClippingEnabled&&C.clipShadows===!0&&C.clippingPlanes.length!==0){const R=L.uuid,X=C.uuid;let K=c[R];K===void 0&&(K={},c[R]=K);let Z=K[X];Z===void 0&&(Z=L.clone(),K[X]=Z),L=Z}return L.visible=C.visible,L.wireframe=C.wireframe,z===Ns?L.side=C.shadowSide!==null?C.shadowSide:C.side:L.side=C.shadowSide!==null?C.shadowSide:u[C.side],L.clipShadows=C.clipShadows,L.clippingPlanes=C.clippingPlanes,L.clipIntersection=C.clipIntersection,L.wireframeLinewidth=C.wireframeLinewidth,L.linewidth=C.linewidth,I.isPointLight===!0&&L.isMeshDistanceMaterial===!0&&(L.referencePosition.setFromMatrixPosition(I.matrixWorld),L.nearDistance=B,L.farDistance=U),L}function E(y,S,C,I,B){if(y.visible===!1)return;if(y.layers.test(S.layers)&&(y.isMesh||y.isLine||y.isPoints)&&(y.castShadow||y.receiveShadow&&B===Ns)&&(!y.frustumCulled||n.intersectsObject(y))){y.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,y.matrixWorld);const L=e.update(y),D=y.material;if(Array.isArray(D)){const N=L.groups;for(let R=0,X=N.length;R<X;R++){const K=N[R],Z=D[K.materialIndex];if(Z&&Z.visible){const ee=w(y,L,Z,I,C.near,C.far,B);s.renderBufferDirect(C,null,L,ee,y,K)}}}else if(D.visible){const N=w(y,L,D,I,C.near,C.far,B);s.renderBufferDirect(C,null,L,N,y,null)}}const z=y.children;for(let L=0,D=z.length;L<D;L++)E(z[L],S,C,I,B)}}function Zx(s,e,t){const n=t.isWebGL2;function i(){let P=!1;const O=new qe;let k=null;const j=new qe(0,0,0,0);return{setMask:function(H){k!==H&&!P&&(s.colorMask(H,H,H,H),k=H)},setLocked:function(H){P=H},setClear:function(H,se,de,Ee,We){We===!0&&(H*=Ee,se*=Ee,de*=Ee),O.set(H,se,de,Ee),j.equals(O)===!1&&(s.clearColor(H,se,de,Ee),j.copy(O))},reset:function(){P=!1,k=null,j.set(-1,0,0,0)}}}function r(){let P=!1,O=null,k=null,j=null;return{setTest:function(H){H?pe(2929):Me(2929)},setMask:function(H){O!==H&&!P&&(s.depthMask(H),O=H)},setFunc:function(H){if(k!==H){if(H)switch(H){case Kd:s.depthFunc(512);break;case Qd:s.depthFunc(519);break;case $d:s.depthFunc(513);break;case qa:s.depthFunc(515);break;case ef:s.depthFunc(514);break;case tf:s.depthFunc(518);break;case nf:s.depthFunc(516);break;case sf:s.depthFunc(517);break;default:s.depthFunc(515)}else s.depthFunc(515);k=H}},setLocked:function(H){P=H},setClear:function(H){j!==H&&(s.clearDepth(H),j=H)},reset:function(){P=!1,O=null,k=null,j=null}}}function o(){let P=!1,O=null,k=null,j=null,H=null,se=null,de=null,Ee=null,We=null;return{setTest:function(He){P||(He?pe(2960):Me(2960))},setMask:function(He){O!==He&&!P&&(s.stencilMask(He),O=He)},setFunc:function(He,je,$e){(k!==He||j!==je||H!==$e)&&(s.stencilFunc(He,je,$e),k=He,j=je,H=$e)},setOp:function(He,je,$e){(se!==He||de!==je||Ee!==$e)&&(s.stencilOp(He,je,$e),se=He,de=je,Ee=$e)},setLocked:function(He){P=He},setClear:function(He){We!==He&&(s.clearStencil(He),We=He)},reset:function(){P=!1,O=null,k=null,j=null,H=null,se=null,de=null,Ee=null,We=null}}}const a=new i,l=new r,c=new o;let h={},u=null,d={},p=null,m=!1,x=null,v=null,g=null,f=null,_=null,w=null,E=null,y=!1,S=null,C=null,I=null,B=null,U=null;const z=s.getParameter(35661);let L=!1,D=0;const N=s.getParameter(7938);N.indexOf("WebGL")!==-1?(D=parseFloat(/^WebGL (\d)/.exec(N)[1]),L=D>=1):N.indexOf("OpenGL ES")!==-1&&(D=parseFloat(/^OpenGL ES (\d)/.exec(N)[1]),L=D>=2);let R=null,X={};const K=new qe(0,0,s.canvas.width,s.canvas.height),Z=new qe(0,0,s.canvas.width,s.canvas.height);function ee(P,O,k){const j=new Uint8Array(4),H=s.createTexture();s.bindTexture(P,H),s.texParameteri(P,10241,9728),s.texParameteri(P,10240,9728);for(let se=0;se<k;se++)s.texImage2D(O+se,0,6408,1,1,0,6408,5121,j);return H}const re={};re[3553]=ee(3553,3553,1),re[34067]=ee(34067,34069,6),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),pe(2929),l.setFunc(qa),Te(!1),J(ac),pe(2884),Se(ks);function pe(P){h[P]!==!0&&(s.enable(P),h[P]=!0)}function Me(P){h[P]!==!1&&(s.disable(P),h[P]=!1)}function W(P){P!==u&&(s.bindFramebuffer(36160,P),u=P)}function Ie(P,O){O===null&&u!==null&&(O=u),d[P]!==O&&(s.bindFramebuffer(P,O),d[P]=O,n&&(P===36009&&(d[36160]=O),P===36160&&(d[36009]=O)))}function Ce(P){return p!==P?(s.useProgram(P),p=P,!0):!1}const ge={[Hi]:32774,[Hd]:32778,[Gd]:32779};if(n)ge[hc]=32775,ge[uc]=32776;else{const P=e.get("EXT_blend_minmax");P!==null&&(ge[hc]=P.MIN_EXT,ge[uc]=P.MAX_EXT)}const fe={[kd]:0,[Vd]:1,[Wd]:768,[jh]:770,[Jd]:776,[jd]:774,[qd]:772,[Xd]:769,[Zh]:771,[Zd]:775,[Yd]:773};function Se(P,O,k,j,H,se,de,Ee){if(P===ks){m===!0&&(Me(3042),m=!1);return}if(m===!1&&(pe(3042),m=!0),P!==Ud){if(P!==x||Ee!==y){if((v!==Hi||_!==Hi)&&(s.blendEquation(32774),v=Hi,_=Hi),Ee)switch(P){case Mn:s.blendFuncSeparate(1,771,1,771);break;case Ht:s.blendFunc(1,1);break;case lc:s.blendFuncSeparate(0,0,769,771);break;case cc:s.blendFuncSeparate(0,768,0,770);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}else switch(P){case Mn:s.blendFuncSeparate(770,771,1,771);break;case Ht:s.blendFunc(770,1);break;case lc:s.blendFunc(0,769);break;case cc:s.blendFunc(0,768);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}g=null,f=null,w=null,E=null,x=P,y=Ee}return}H=H||O,se=se||k,de=de||j,(O!==v||H!==_)&&(s.blendEquationSeparate(ge[O],ge[H]),v=O,_=H),(k!==g||j!==f||se!==w||de!==E)&&(s.blendFuncSeparate(fe[k],fe[j],fe[se],fe[de]),g=k,f=j,w=se,E=de),x=P,y=null}function we(P,O){P.side===ln?Me(2884):pe(2884);let k=P.side===st;O&&(k=!k),Te(k),P.blending===Mn&&P.transparent===!1?Se(ks):Se(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.premultipliedAlpha),l.setFunc(P.depthFunc),l.setTest(P.depthTest),l.setMask(P.depthWrite),a.setMask(P.colorWrite);const j=P.stencilWrite;c.setTest(j),j&&(c.setMask(P.stencilWriteMask),c.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),c.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),te(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?pe(32926):Me(32926)}function Te(P){S!==P&&(P?s.frontFace(2304):s.frontFace(2305),S=P)}function J(P){P!==zd?(pe(2884),P!==C&&(P===ac?s.cullFace(1029):P===Od?s.cullFace(1028):s.cullFace(1032))):Me(2884),C=P}function $(P){P!==I&&(L&&s.lineWidth(P),I=P)}function te(P,O,k){P?(pe(32823),(B!==O||U!==k)&&(s.polygonOffset(O,k),B=O,U=k)):Me(32823)}function he(P){P?pe(3089):Me(3089)}function oe(P){P===void 0&&(P=33984+z-1),R!==P&&(s.activeTexture(P),R=P)}function A(P,O){R===null&&oe();let k=X[R];k===void 0&&(k={type:void 0,texture:void 0},X[R]=k),(k.type!==P||k.texture!==O)&&(s.bindTexture(P,O||re[P]),k.type=P,k.texture=O)}function b(){const P=X[R];P!==void 0&&P.type!==void 0&&(s.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function q(){try{s.compressedTexImage2D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Y(){try{s.texImage2D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ie(){try{s.texImage3D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ce(P){K.equals(P)===!1&&(s.scissor(P.x,P.y,P.z,P.w),K.copy(P))}function De(P){Z.equals(P)===!1&&(s.viewport(P.x,P.y,P.z,P.w),Z.copy(P))}function _e(){s.disable(3042),s.disable(2884),s.disable(2929),s.disable(32823),s.disable(3089),s.disable(2960),s.disable(32926),s.blendEquation(32774),s.blendFunc(1,0),s.blendFuncSeparate(1,0,1,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(513),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(519,0,4294967295),s.stencilOp(7680,7680,7680),s.clearStencil(0),s.cullFace(1029),s.frontFace(2305),s.polygonOffset(0,0),s.activeTexture(33984),s.bindFramebuffer(36160,null),n===!0&&(s.bindFramebuffer(36009,null),s.bindFramebuffer(36008,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},R=null,X={},u=null,d={},p=null,m=!1,x=null,v=null,g=null,f=null,_=null,w=null,E=null,y=!1,S=null,C=null,I=null,B=null,U=null,K.set(0,0,s.canvas.width,s.canvas.height),Z.set(0,0,s.canvas.width,s.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:pe,disable:Me,bindFramebuffer:Ie,bindXRFramebuffer:W,useProgram:Ce,setBlending:Se,setMaterial:we,setFlipSided:Te,setCullFace:J,setLineWidth:$,setPolygonOffset:te,setScissorTest:he,activeTexture:oe,bindTexture:A,unbindTexture:b,compressedTexImage2D:q,texImage2D:Y,texImage3D:ie,scissor:ce,viewport:De,reset:_e}}function Jx(s,e,t,n,i,r,o){const a=i.isWebGL2,l=i.maxTextures,c=i.maxCubemapSize,h=i.maxTextureSize,u=i.maxSamples,d=new WeakMap;let p,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(A,b){return m?new OffscreenCanvas(A,b):document.createElementNS("http://www.w3.org/1999/xhtml","canvas")}function v(A,b,q,Y){let ie=1;if((A.width>Y||A.height>Y)&&(ie=Y/Math.max(A.width,A.height)),ie<1||b===!0)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap){const ce=b?nu:Math.floor,De=ce(ie*A.width),_e=ce(ie*A.height);p===void 0&&(p=x(De,_e));const P=q?x(De,_e):p;return P.width=De,P.height=_e,P.getContext("2d").drawImage(A,0,0,De,_e),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+A.width+"x"+A.height+") to ("+De+"x"+_e+")."),P}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+A.width+"x"+A.height+")."),A;return A}function g(A){return Za(A.width)&&Za(A.height)}function f(A){return a?!1:A.wrapS!==Nt||A.wrapT!==Nt||A.minFilter!==St&&A.minFilter!==Ft}function _(A,b){return A.generateMipmaps&&b&&A.minFilter!==St&&A.minFilter!==Ft}function w(A,b,q,Y){s.generateMipmap(A);const ie=n.get(b);ie.__maxMipLevel=Math.log2(Math.max(q,Y))}function E(A,b,q){if(a===!1)return b;if(A!==null){if(s[A]!==void 0)return s[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let Y=b;return b===6403&&(q===5126&&(Y=33326),q===5131&&(Y=33325),q===5121&&(Y=33321)),b===6407&&(q===5126&&(Y=34837),q===5131&&(Y=34843),q===5121&&(Y=32849)),b===6408&&(q===5126&&(Y=34836),q===5131&&(Y=34842),q===5121&&(Y=32856)),(Y===33325||Y===33326||Y===34842||Y===34836)&&e.get("EXT_color_buffer_float"),Y}function y(A){return A===St||A===Ya||A===ja?9728:9729}function S(A){const b=A.target;b.removeEventListener("dispose",S),I(b),b.isVideoTexture&&d.delete(b),o.memory.textures--}function C(A){const b=A.target;b.removeEventListener("dispose",C),B(b),o.memory.textures--}function I(A){const b=n.get(A);b.__webglInit!==void 0&&(s.deleteTexture(b.__webglTexture),n.remove(A))}function B(A){const b=A.texture,q=n.get(A),Y=n.get(b);if(A){if(Y.__webglTexture!==void 0&&s.deleteTexture(Y.__webglTexture),A.depthTexture&&A.depthTexture.dispose(),A.isWebGLCubeRenderTarget)for(let ie=0;ie<6;ie++)s.deleteFramebuffer(q.__webglFramebuffer[ie]),q.__webglDepthbuffer&&s.deleteRenderbuffer(q.__webglDepthbuffer[ie]);else s.deleteFramebuffer(q.__webglFramebuffer),q.__webglDepthbuffer&&s.deleteRenderbuffer(q.__webglDepthbuffer),q.__webglMultisampledFramebuffer&&s.deleteFramebuffer(q.__webglMultisampledFramebuffer),q.__webglColorRenderbuffer&&s.deleteRenderbuffer(q.__webglColorRenderbuffer),q.__webglDepthRenderbuffer&&s.deleteRenderbuffer(q.__webglDepthRenderbuffer);n.remove(b),n.remove(A)}}let U=0;function z(){U=0}function L(){const A=U;return A>=l&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+l),U+=1,A}function D(A,b){const q=n.get(A);if(A.isVideoTexture&&J(A),A.version>0&&q.__version!==A.version){const Y=A.image;if(Y===void 0)console.warn("THREE.WebGLRenderer: Texture marked for update but image is undefined");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{pe(q,A,b);return}}t.activeTexture(33984+b),t.bindTexture(3553,q.__webglTexture)}function N(A,b){const q=n.get(A);if(A.version>0&&q.__version!==A.version){pe(q,A,b);return}t.activeTexture(33984+b),t.bindTexture(35866,q.__webglTexture)}function R(A,b){const q=n.get(A);if(A.version>0&&q.__version!==A.version){pe(q,A,b);return}t.activeTexture(33984+b),t.bindTexture(32879,q.__webglTexture)}function X(A,b){const q=n.get(A);if(A.version>0&&q.__version!==A.version){Me(q,A,b);return}t.activeTexture(33984+b),t.bindTexture(34067,q.__webglTexture)}const K={[Zn]:10497,[Nt]:33071,[wo]:33648},Z={[St]:9728,[Ya]:9984,[ja]:9986,[Ft]:9729,[Qh]:9985,[mr]:9987};function ee(A,b,q){if(q?(s.texParameteri(A,10242,K[b.wrapS]),s.texParameteri(A,10243,K[b.wrapT]),(A===32879||A===35866)&&s.texParameteri(A,32882,K[b.wrapR]),s.texParameteri(A,10240,Z[b.magFilter]),s.texParameteri(A,10241,Z[b.minFilter])):(s.texParameteri(A,10242,33071),s.texParameteri(A,10243,33071),(A===32879||A===35866)&&s.texParameteri(A,32882,33071),(b.wrapS!==Nt||b.wrapT!==Nt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(A,10240,y(b.magFilter)),s.texParameteri(A,10241,y(b.minFilter)),b.minFilter!==St&&b.minFilter!==Ft&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),e.has("EXT_texture_filter_anisotropic")===!0){const Y=e.get("EXT_texture_filter_anisotropic");if(b.type===Hn&&e.has("OES_texture_float_linear")===!1||a===!1&&b.type===So&&e.has("OES_texture_half_float_linear")===!1)return;(b.anisotropy>1||n.get(b).__currentAnisotropy)&&(s.texParameterf(A,Y.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,i.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy)}}function re(A,b){A.__webglInit===void 0&&(A.__webglInit=!0,b.addEventListener("dispose",S),A.__webglTexture=s.createTexture(),o.memory.textures++)}function pe(A,b,q){let Y=3553;b.isDataTexture2DArray&&(Y=35866),b.isDataTexture3D&&(Y=32879),re(A,b),t.activeTexture(33984+q),t.bindTexture(Y,A.__webglTexture),s.pixelStorei(37440,b.flipY),s.pixelStorei(37441,b.premultiplyAlpha),s.pixelStorei(3317,b.unpackAlignment),s.pixelStorei(37443,0);const ie=f(b)&&g(b.image)===!1,ce=v(b.image,ie,!1,h),De=g(ce)||a,_e=r.convert(b.format);let P=r.convert(b.type),O=E(b.internalFormat,_e,P);ee(Y,b,De);let k;const j=b.mipmaps;if(b.isDepthTexture)O=6402,a?b.type===Hn?O=36012:b.type===lo?O=33190:b.type===Ws?O=35056:O=33189:b.type===Hn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),b.format===Yi&&O===6402&&b.type!==bo&&b.type!==lo&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),b.type=bo,P=r.convert(b.type)),b.format===$s&&O===6402&&(O=34041,b.type!==Ws&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),b.type=Ws,P=r.convert(b.type))),t.texImage2D(3553,0,O,ce.width,ce.height,0,_e,P,null);else if(b.isDataTexture)if(j.length>0&&De){for(let H=0,se=j.length;H<se;H++)k=j[H],t.texImage2D(3553,H,O,k.width,k.height,0,_e,P,k.data);b.generateMipmaps=!1,A.__maxMipLevel=j.length-1}else t.texImage2D(3553,0,O,ce.width,ce.height,0,_e,P,ce.data),A.__maxMipLevel=0;else if(b.isCompressedTexture){for(let H=0,se=j.length;H<se;H++)k=j[H],b.format!==$t&&b.format!==qn?_e!==null?t.compressedTexImage2D(3553,H,O,k.width,k.height,0,k.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):t.texImage2D(3553,H,O,k.width,k.height,0,_e,P,k.data);A.__maxMipLevel=j.length-1}else if(b.isDataTexture2DArray)t.texImage3D(35866,0,O,ce.width,ce.height,ce.depth,0,_e,P,ce.data),A.__maxMipLevel=0;else if(b.isDataTexture3D)t.texImage3D(32879,0,O,ce.width,ce.height,ce.depth,0,_e,P,ce.data),A.__maxMipLevel=0;else if(j.length>0&&De){for(let H=0,se=j.length;H<se;H++)k=j[H],t.texImage2D(3553,H,O,_e,P,k);b.generateMipmaps=!1,A.__maxMipLevel=j.length-1}else t.texImage2D(3553,0,O,_e,P,ce),A.__maxMipLevel=0;_(b,De)&&w(Y,b,ce.width,ce.height),A.__version=b.version,b.onUpdate&&b.onUpdate(b)}function Me(A,b,q){if(b.image.length!==6)return;re(A,b),t.activeTexture(33984+q),t.bindTexture(34067,A.__webglTexture),s.pixelStorei(37440,b.flipY),s.pixelStorei(37441,b.premultiplyAlpha),s.pixelStorei(3317,b.unpackAlignment),s.pixelStorei(37443,0);const Y=b&&(b.isCompressedTexture||b.image[0].isCompressedTexture),ie=b.image[0]&&b.image[0].isDataTexture,ce=[];for(let H=0;H<6;H++)!Y&&!ie?ce[H]=v(b.image[H],!1,!0,c):ce[H]=ie?b.image[H].image:b.image[H];const De=ce[0],_e=g(De)||a,P=r.convert(b.format),O=r.convert(b.type),k=E(b.internalFormat,P,O);ee(34067,b,_e);let j;if(Y){for(let H=0;H<6;H++){j=ce[H].mipmaps;for(let se=0;se<j.length;se++){const de=j[se];b.format!==$t&&b.format!==qn?P!==null?t.compressedTexImage2D(34069+H,se,k,de.width,de.height,0,de.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):t.texImage2D(34069+H,se,k,de.width,de.height,0,P,O,de.data)}}A.__maxMipLevel=j.length-1}else{j=b.mipmaps;for(let H=0;H<6;H++)if(ie){t.texImage2D(34069+H,0,k,ce[H].width,ce[H].height,0,P,O,ce[H].data);for(let se=0;se<j.length;se++){const Ee=j[se].image[H].image;t.texImage2D(34069+H,se+1,k,Ee.width,Ee.height,0,P,O,Ee.data)}}else{t.texImage2D(34069+H,0,k,P,O,ce[H]);for(let se=0;se<j.length;se++){const de=j[se];t.texImage2D(34069+H,se+1,k,P,O,de.image[H])}}A.__maxMipLevel=j.length}_(b,_e)&&w(34067,b,De.width,De.height),A.__version=b.version,b.onUpdate&&b.onUpdate(b)}function W(A,b,q,Y){const ie=b.texture,ce=r.convert(ie.format),De=r.convert(ie.type),_e=E(ie.internalFormat,ce,De);Y===32879||Y===35866?t.texImage3D(Y,0,_e,b.width,b.height,b.depth,0,ce,De,null):t.texImage2D(Y,0,_e,b.width,b.height,0,ce,De,null),t.bindFramebuffer(36160,A),s.framebufferTexture2D(36160,q,Y,n.get(ie).__webglTexture,0),t.bindFramebuffer(36160,null)}function Ie(A,b,q){if(s.bindRenderbuffer(36161,A),b.depthBuffer&&!b.stencilBuffer){let Y=33189;if(q){const ie=b.depthTexture;ie&&ie.isDepthTexture&&(ie.type===Hn?Y=36012:ie.type===lo&&(Y=33190));const ce=Te(b);s.renderbufferStorageMultisample(36161,ce,Y,b.width,b.height)}else s.renderbufferStorage(36161,Y,b.width,b.height);s.framebufferRenderbuffer(36160,36096,36161,A)}else if(b.depthBuffer&&b.stencilBuffer){if(q){const Y=Te(b);s.renderbufferStorageMultisample(36161,Y,35056,b.width,b.height)}else s.renderbufferStorage(36161,34041,b.width,b.height);s.framebufferRenderbuffer(36160,33306,36161,A)}else{const Y=b.texture,ie=r.convert(Y.format),ce=r.convert(Y.type),De=E(Y.internalFormat,ie,ce);if(q){const _e=Te(b);s.renderbufferStorageMultisample(36161,_e,De,b.width,b.height)}else s.renderbufferStorage(36161,De,b.width,b.height)}s.bindRenderbuffer(36161,null)}function Ce(A,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(36160,A),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(b.depthTexture).__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),D(b.depthTexture,0);const Y=n.get(b.depthTexture).__webglTexture;if(b.depthTexture.format===Yi)s.framebufferTexture2D(36160,36096,3553,Y,0);else if(b.depthTexture.format===$s)s.framebufferTexture2D(36160,33306,3553,Y,0);else throw new Error("Unknown depthTexture format")}function ge(A){const b=n.get(A),q=A.isWebGLCubeRenderTarget===!0;if(A.depthTexture){if(q)throw new Error("target.depthTexture not supported in Cube render targets");Ce(b.__webglFramebuffer,A)}else if(q){b.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)t.bindFramebuffer(36160,b.__webglFramebuffer[Y]),b.__webglDepthbuffer[Y]=s.createRenderbuffer(),Ie(b.__webglDepthbuffer[Y],A,!1)}else t.bindFramebuffer(36160,b.__webglFramebuffer),b.__webglDepthbuffer=s.createRenderbuffer(),Ie(b.__webglDepthbuffer,A,!1);t.bindFramebuffer(36160,null)}function fe(A){const b=A.texture,q=n.get(A),Y=n.get(b);A.addEventListener("dispose",C),Y.__webglTexture=s.createTexture(),Y.__version=b.version,o.memory.textures++;const ie=A.isWebGLCubeRenderTarget===!0,ce=A.isWebGLMultisampleRenderTarget===!0,De=b.isDataTexture3D||b.isDataTexture2DArray,_e=g(A)||a;if(a&&b.format===qn&&(b.type===Hn||b.type===So)&&(b.format=$t,console.warn("THREE.WebGLRenderer: Rendering to textures with RGB format is not supported. Using RGBA format instead.")),ie){q.__webglFramebuffer=[];for(let P=0;P<6;P++)q.__webglFramebuffer[P]=s.createFramebuffer()}else if(q.__webglFramebuffer=s.createFramebuffer(),ce)if(a){q.__webglMultisampledFramebuffer=s.createFramebuffer(),q.__webglColorRenderbuffer=s.createRenderbuffer(),s.bindRenderbuffer(36161,q.__webglColorRenderbuffer);const P=r.convert(b.format),O=r.convert(b.type),k=E(b.internalFormat,P,O),j=Te(A);s.renderbufferStorageMultisample(36161,j,k,A.width,A.height),t.bindFramebuffer(36160,q.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(36160,36064,36161,q.__webglColorRenderbuffer),s.bindRenderbuffer(36161,null),A.depthBuffer&&(q.__webglDepthRenderbuffer=s.createRenderbuffer(),Ie(q.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(36160,null)}else console.warn("THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.");if(ie){t.bindTexture(34067,Y.__webglTexture),ee(34067,b,_e);for(let P=0;P<6;P++)W(q.__webglFramebuffer[P],A,36064,34069+P);_(b,_e)&&w(34067,b,A.width,A.height),t.bindTexture(34067,null)}else{let P=3553;De&&(a?P=b.isDataTexture3D?32879:35866:console.warn("THREE.DataTexture3D and THREE.DataTexture2DArray only supported with WebGL2.")),t.bindTexture(P,Y.__webglTexture),ee(P,b,_e),W(q.__webglFramebuffer,A,36064,P),_(b,_e)&&w(3553,b,A.width,A.height),t.bindTexture(3553,null)}A.depthBuffer&&ge(A)}function Se(A){const b=A.texture,q=g(A)||a;if(_(b,q)){const Y=A.isWebGLCubeRenderTarget?34067:3553,ie=n.get(b).__webglTexture;t.bindTexture(Y,ie),w(Y,b,A.width,A.height),t.bindTexture(Y,null)}}function we(A){if(A.isWebGLMultisampleRenderTarget)if(a){const b=A.width,q=A.height;let Y=16384;A.depthBuffer&&(Y|=256),A.stencilBuffer&&(Y|=1024);const ie=n.get(A);t.bindFramebuffer(36008,ie.__webglMultisampledFramebuffer),t.bindFramebuffer(36009,ie.__webglFramebuffer),s.blitFramebuffer(0,0,b,q,0,0,b,q,Y,9728),t.bindFramebuffer(36008,null),t.bindFramebuffer(36009,ie.__webglMultisampledFramebuffer)}else console.warn("THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.")}function Te(A){return a&&A.isWebGLMultisampleRenderTarget?Math.min(u,A.samples):0}function J(A){const b=o.render.frame;d.get(A)!==b&&(d.set(A,b),A.update())}let $=!1,te=!1;function he(A,b){A&&A.isWebGLRenderTarget&&($===!1&&(console.warn("THREE.WebGLTextures.safeSetTexture2D: don't use render targets as textures. Use their .texture property instead."),$=!0),A=A.texture),D(A,b)}function oe(A,b){A&&A.isWebGLCubeRenderTarget&&(te===!1&&(console.warn("THREE.WebGLTextures.safeSetTextureCube: don't use cube render targets as textures. Use their .texture property instead."),te=!0),A=A.texture),X(A,b)}this.allocateTextureUnit=L,this.resetTextureUnits=z,this.setTexture2D=D,this.setTexture2DArray=N,this.setTexture3D=R,this.setTextureCube=X,this.setupRenderTarget=fe,this.updateRenderTargetMipmap=Se,this.updateMultisampleRenderTarget=we,this.safeSetTexture2D=he,this.safeSetTextureCube=oe}function Kx(s,e,t){const n=t.isWebGL2;function i(r){let o;if(r===gl)return 5121;if(r===pf)return 32819;if(r===mf)return 32820;if(r===gf)return 33635;if(r===uf)return 5120;if(r===df)return 5122;if(r===bo)return 5123;if(r===ff)return 5124;if(r===lo)return 5125;if(r===Hn)return 5126;if(r===So)return n?5131:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===xf)return 6406;if(r===qn)return 6407;if(r===$t)return 6408;if(r===vf)return 6409;if(r===yf)return 6410;if(r===Yi)return 6402;if(r===$s)return 34041;if(r===_f)return 6403;if(r===Mf)return 36244;if(r===wf)return 33319;if(r===bf)return 33320;if(r===Sf)return 36248;if(r===Tf)return 36249;if(r===pc||r===mc||r===gc||r===xc)if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===pc)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===mc)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===gc)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===xc)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===vc||r===yc||r===_c||r===Mc)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===vc)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===yc)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===_c)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Mc)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Ef)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if((r===wc||r===bc)&&(o=e.get("WEBGL_compressed_texture_etc"),o!==null)){if(r===wc)return o.COMPRESSED_RGB8_ETC2;if(r===bc)return o.COMPRESSED_RGBA8_ETC2_EAC}if(r===Af||r===Lf||r===Cf||r===Rf||r===Pf||r===If||r===Df||r===Nf||r===Ff||r===Bf||r===zf||r===Of||r===Uf||r===Hf||r===kf||r===Vf||r===Wf||r===Xf||r===qf||r===Yf||r===jf||r===Zf||r===Jf||r===Kf||r===Qf||r===$f||r===ep||r===tp)return o=e.get("WEBGL_compressed_texture_astc"),o!==null?r:null;if(r===Gf)return o=e.get("EXT_texture_compression_bptc"),o!==null?r:null;if(r===Ws)return n?34042:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null)}return{convert:i}}class bu extends At{constructor(e=[]){super(),this.cameras=e}}bu.prototype.isArrayCamera=!0;class yn extends ke{constructor(){super(),this.type="Group"}}yn.prototype.isGroup=!0;const Qx={type:"move"};class Pa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new yn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new yn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new T,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new T),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new yn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new T,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new T),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred")if(a!==null&&(i=t.getPose(e.targetRaySpace,n),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Qx))),c&&e.hand){o=!0;for(const x of e.hand.values()){const v=t.getJointPose(x,n);if(c.joints[x.jointName]===void 0){const f=new yn;f.matrixAutoUpdate=!1,f.visible=!1,c.joints[x.jointName]=f,c.add(f)}const g=c.joints[x.jointName];v!==null&&(g.matrix.fromArray(v.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.jointRadius=v.radius),g.visible=v!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,m=.005;c.inputState.pinching&&d>p+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=p-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}}class $x extends xi{constructor(e,t){super();const n=this,i=e.state;let r=null,o=1,a=null,l="local-floor",c=null;const h=[],u=new Map,d=new At;d.layers.enable(1),d.viewport=new qe;const p=new At;p.layers.enable(2),p.viewport=new qe;const m=[d,p],x=new bu;x.layers.enable(1),x.layers.enable(2);let v=null,g=null;this.enabled=!1,this.isPresenting=!1,this.getController=function(z){let L=h[z];return L===void 0&&(L=new Pa,h[z]=L),L.getTargetRaySpace()},this.getControllerGrip=function(z){let L=h[z];return L===void 0&&(L=new Pa,h[z]=L),L.getGripSpace()},this.getHand=function(z){let L=h[z];return L===void 0&&(L=new Pa,h[z]=L),L.getHandSpace()};function f(z){const L=u.get(z.inputSource);L&&L.dispatchEvent({type:z.type,data:z.inputSource})}function _(){u.forEach(function(z,L){z.disconnect(L)}),u.clear(),v=null,g=null,i.bindXRFramebuffer(null),e.setRenderTarget(e.getRenderTarget()),U.stop(),n.isPresenting=!1,n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(z){o=z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(z){l=z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return a},this.getSession=function(){return r},this.setSession=async function(z){if(r=z,r!==null){r.addEventListener("select",f),r.addEventListener("selectstart",f),r.addEventListener("selectend",f),r.addEventListener("squeeze",f),r.addEventListener("squeezestart",f),r.addEventListener("squeezeend",f),r.addEventListener("end",_),r.addEventListener("inputsourceschange",w);const L=t.getContextAttributes();L.xrCompatible!==!0&&await t.makeXRCompatible();const D={antialias:L.antialias,alpha:L.alpha,depth:L.depth,stencil:L.stencil,framebufferScaleFactor:o},N=new XRWebGLLayer(r,t,D);r.updateRenderState({baseLayer:N}),a=await r.requestReferenceSpace(l),U.setContext(r),U.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}};function w(z){const L=r.inputSources;for(let D=0;D<h.length;D++)u.set(L[D],h[D]);for(let D=0;D<z.removed.length;D++){const N=z.removed[D],R=u.get(N);R&&(R.dispatchEvent({type:"disconnected",data:N}),u.delete(N))}for(let D=0;D<z.added.length;D++){const N=z.added[D],R=u.get(N);R&&R.dispatchEvent({type:"connected",data:N})}}const E=new T,y=new T;function S(z,L,D){E.setFromMatrixPosition(L.matrixWorld),y.setFromMatrixPosition(D.matrixWorld);const N=E.distanceTo(y),R=L.projectionMatrix.elements,X=D.projectionMatrix.elements,K=R[14]/(R[10]-1),Z=R[14]/(R[10]+1),ee=(R[9]+1)/R[5],re=(R[9]-1)/R[5],pe=(R[8]-1)/R[0],Me=(X[8]+1)/X[0],W=K*pe,Ie=K*Me,Ce=N/(-pe+Me),ge=Ce*-pe;L.matrixWorld.decompose(z.position,z.quaternion,z.scale),z.translateX(ge),z.translateZ(Ce),z.matrixWorld.compose(z.position,z.quaternion,z.scale),z.matrixWorldInverse.copy(z.matrixWorld).invert();const fe=K+Ce,Se=Z+Ce,we=W-ge,Te=Ie+(N-ge),J=ee*Z/Se*fe,$=re*Z/Se*fe;z.projectionMatrix.makePerspective(we,Te,J,$,fe,Se)}function C(z,L){L===null?z.matrixWorld.copy(z.matrix):z.matrixWorld.multiplyMatrices(L.matrixWorld,z.matrix),z.matrixWorldInverse.copy(z.matrixWorld).invert()}this.getCamera=function(z){x.near=p.near=d.near=z.near,x.far=p.far=d.far=z.far,(v!==x.near||g!==x.far)&&(r.updateRenderState({depthNear:x.near,depthFar:x.far}),v=x.near,g=x.far);const L=z.parent,D=x.cameras;C(x,L);for(let R=0;R<D.length;R++)C(D[R],L);z.matrixWorld.copy(x.matrixWorld),z.matrix.copy(x.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale);const N=z.children;for(let R=0,X=N.length;R<X;R++)N[R].updateMatrixWorld(!0);return D.length===2?S(x,d,p):x.projectionMatrix.copy(d.projectionMatrix),x};let I=null;function B(z,L){if(c=L.getViewerPose(a),c!==null){const N=c.views,R=r.renderState.baseLayer;i.bindXRFramebuffer(R.framebuffer);let X=!1;N.length!==x.cameras.length&&(x.cameras.length=0,X=!0);for(let K=0;K<N.length;K++){const Z=N[K],ee=R.getViewport(Z),re=m[K];re.matrix.fromArray(Z.transform.matrix),re.projectionMatrix.fromArray(Z.projectionMatrix),re.viewport.set(ee.x,ee.y,ee.width,ee.height),K===0&&x.matrix.copy(re.matrix),X===!0&&x.cameras.push(re)}}const D=r.inputSources;for(let N=0;N<h.length;N++){const R=h[N],X=D[N];R.update(X,L,a)}I&&I(z,L)}const U=new hu;U.setAnimationLoop(B),this.setAnimationLoop=function(z){I=z},this.dispose=function(){}}}function ev(s){function e(g,f){g.fogColor.value.copy(f.color),f.isFog?(g.fogNear.value=f.near,g.fogFar.value=f.far):f.isFogExp2&&(g.fogDensity.value=f.density)}function t(g,f,_,w){f.isMeshBasicMaterial?n(g,f):f.isMeshLambertMaterial?(n(g,f),l(g,f)):f.isMeshToonMaterial?(n(g,f),h(g,f)):f.isMeshPhongMaterial?(n(g,f),c(g,f)):f.isMeshStandardMaterial?(n(g,f),f.isMeshPhysicalMaterial?d(g,f):u(g,f)):f.isMeshMatcapMaterial?(n(g,f),p(g,f)):f.isMeshDepthMaterial?(n(g,f),m(g,f)):f.isMeshDistanceMaterial?(n(g,f),x(g,f)):f.isMeshNormalMaterial?(n(g,f),v(g,f)):f.isLineBasicMaterial?(i(g,f),f.isLineDashedMaterial&&r(g,f)):f.isPointsMaterial?o(g,f,_,w):f.isSpriteMaterial?a(g,f):f.isShadowMaterial?(g.color.value.copy(f.color),g.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function n(g,f){g.opacity.value=f.opacity,f.color&&g.diffuse.value.copy(f.color),f.emissive&&g.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(g.map.value=f.map),f.alphaMap&&(g.alphaMap.value=f.alphaMap),f.specularMap&&(g.specularMap.value=f.specularMap);const _=s.get(f).envMap;if(_){g.envMap.value=_,g.flipEnvMap.value=_.isCubeTexture&&_._needsFlipEnvMap?-1:1,g.reflectivity.value=f.reflectivity,g.refractionRatio.value=f.refractionRatio;const y=s.get(_).__maxMipLevel;y!==void 0&&(g.maxMipLevel.value=y)}f.lightMap&&(g.lightMap.value=f.lightMap,g.lightMapIntensity.value=f.lightMapIntensity),f.aoMap&&(g.aoMap.value=f.aoMap,g.aoMapIntensity.value=f.aoMapIntensity);let w;f.map?w=f.map:f.specularMap?w=f.specularMap:f.displacementMap?w=f.displacementMap:f.normalMap?w=f.normalMap:f.bumpMap?w=f.bumpMap:f.roughnessMap?w=f.roughnessMap:f.metalnessMap?w=f.metalnessMap:f.alphaMap?w=f.alphaMap:f.emissiveMap?w=f.emissiveMap:f.clearcoatMap?w=f.clearcoatMap:f.clearcoatNormalMap?w=f.clearcoatNormalMap:f.clearcoatRoughnessMap&&(w=f.clearcoatRoughnessMap),w!==void 0&&(w.isWebGLRenderTarget&&(w=w.texture),w.matrixAutoUpdate===!0&&w.updateMatrix(),g.uvTransform.value.copy(w.matrix));let E;f.aoMap?E=f.aoMap:f.lightMap&&(E=f.lightMap),E!==void 0&&(E.isWebGLRenderTarget&&(E=E.texture),E.matrixAutoUpdate===!0&&E.updateMatrix(),g.uv2Transform.value.copy(E.matrix))}function i(g,f){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity}function r(g,f){g.dashSize.value=f.dashSize,g.totalSize.value=f.dashSize+f.gapSize,g.scale.value=f.scale}function o(g,f,_,w){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,g.size.value=f.size*_,g.scale.value=w*.5,f.map&&(g.map.value=f.map),f.alphaMap&&(g.alphaMap.value=f.alphaMap);let E;f.map?E=f.map:f.alphaMap&&(E=f.alphaMap),E!==void 0&&(E.matrixAutoUpdate===!0&&E.updateMatrix(),g.uvTransform.value.copy(E.matrix))}function a(g,f){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,g.rotation.value=f.rotation,f.map&&(g.map.value=f.map),f.alphaMap&&(g.alphaMap.value=f.alphaMap);let _;f.map?_=f.map:f.alphaMap&&(_=f.alphaMap),_!==void 0&&(_.matrixAutoUpdate===!0&&_.updateMatrix(),g.uvTransform.value.copy(_.matrix))}function l(g,f){f.emissiveMap&&(g.emissiveMap.value=f.emissiveMap)}function c(g,f){g.specular.value.copy(f.specular),g.shininess.value=Math.max(f.shininess,1e-4),f.emissiveMap&&(g.emissiveMap.value=f.emissiveMap),f.bumpMap&&(g.bumpMap.value=f.bumpMap,g.bumpScale.value=f.bumpScale,f.side===st&&(g.bumpScale.value*=-1)),f.normalMap&&(g.normalMap.value=f.normalMap,g.normalScale.value.copy(f.normalScale),f.side===st&&g.normalScale.value.negate()),f.displacementMap&&(g.displacementMap.value=f.displacementMap,g.displacementScale.value=f.displacementScale,g.displacementBias.value=f.displacementBias)}function h(g,f){f.gradientMap&&(g.gradientMap.value=f.gradientMap),f.emissiveMap&&(g.emissiveMap.value=f.emissiveMap),f.bumpMap&&(g.bumpMap.value=f.bumpMap,g.bumpScale.value=f.bumpScale,f.side===st&&(g.bumpScale.value*=-1)),f.normalMap&&(g.normalMap.value=f.normalMap,g.normalScale.value.copy(f.normalScale),f.side===st&&g.normalScale.value.negate()),f.displacementMap&&(g.displacementMap.value=f.displacementMap,g.displacementScale.value=f.displacementScale,g.displacementBias.value=f.displacementBias)}function u(g,f){g.roughness.value=f.roughness,g.metalness.value=f.metalness,f.roughnessMap&&(g.roughnessMap.value=f.roughnessMap),f.metalnessMap&&(g.metalnessMap.value=f.metalnessMap),f.emissiveMap&&(g.emissiveMap.value=f.emissiveMap),f.bumpMap&&(g.bumpMap.value=f.bumpMap,g.bumpScale.value=f.bumpScale,f.side===st&&(g.bumpScale.value*=-1)),f.normalMap&&(g.normalMap.value=f.normalMap,g.normalScale.value.copy(f.normalScale),f.side===st&&g.normalScale.value.negate()),f.displacementMap&&(g.displacementMap.value=f.displacementMap,g.displacementScale.value=f.displacementScale,g.displacementBias.value=f.displacementBias),s.get(f).envMap&&(g.envMapIntensity.value=f.envMapIntensity)}function d(g,f){u(g,f),g.reflectivity.value=f.reflectivity,g.clearcoat.value=f.clearcoat,g.clearcoatRoughness.value=f.clearcoatRoughness,f.sheen&&g.sheen.value.copy(f.sheen),f.clearcoatMap&&(g.clearcoatMap.value=f.clearcoatMap),f.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap),f.clearcoatNormalMap&&(g.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),g.clearcoatNormalMap.value=f.clearcoatNormalMap,f.side===st&&g.clearcoatNormalScale.value.negate()),g.transmission.value=f.transmission,f.transmissionMap&&(g.transmissionMap.value=f.transmissionMap)}function p(g,f){f.matcap&&(g.matcap.value=f.matcap),f.bumpMap&&(g.bumpMap.value=f.bumpMap,g.bumpScale.value=f.bumpScale,f.side===st&&(g.bumpScale.value*=-1)),f.normalMap&&(g.normalMap.value=f.normalMap,g.normalScale.value.copy(f.normalScale),f.side===st&&g.normalScale.value.negate()),f.displacementMap&&(g.displacementMap.value=f.displacementMap,g.displacementScale.value=f.displacementScale,g.displacementBias.value=f.displacementBias)}function m(g,f){f.displacementMap&&(g.displacementMap.value=f.displacementMap,g.displacementScale.value=f.displacementScale,g.displacementBias.value=f.displacementBias)}function x(g,f){f.displacementMap&&(g.displacementMap.value=f.displacementMap,g.displacementScale.value=f.displacementScale,g.displacementBias.value=f.displacementBias),g.referencePosition.value.copy(f.referencePosition),g.nearDistance.value=f.nearDistance,g.farDistance.value=f.farDistance}function v(g,f){f.bumpMap&&(g.bumpMap.value=f.bumpMap,g.bumpScale.value=f.bumpScale,f.side===st&&(g.bumpScale.value*=-1)),f.normalMap&&(g.normalMap.value=f.normalMap,g.normalScale.value.copy(f.normalScale),f.side===st&&g.normalScale.value.negate()),f.displacementMap&&(g.displacementMap.value=f.displacementMap,g.displacementScale.value=f.displacementScale,g.displacementBias.value=f.displacementBias)}return{refreshFogUniforms:e,refreshMaterialUniforms:t}}function tv(){const s=document.createElementNS("http://www.w3.org/1999/xhtml","canvas");return s.style.display="block",s}function Ye(s){s=s||{};const e=s.canvas!==void 0?s.canvas:tv(),t=s.context!==void 0?s.context:null,n=s.alpha!==void 0?s.alpha:!1,i=s.depth!==void 0?s.depth:!0,r=s.stencil!==void 0?s.stencil:!0,o=s.antialias!==void 0?s.antialias:!1,a=s.premultipliedAlpha!==void 0?s.premultipliedAlpha:!0,l=s.preserveDrawingBuffer!==void 0?s.preserveDrawingBuffer:!1,c=s.powerPreference!==void 0?s.powerPreference:"default",h=s.failIfMajorPerformanceCaveat!==void 0?s.failIfMajorPerformanceCaveat:!1;let u=null,d=null;const p=[],m=[];this.domElement=e,this.debug={checkShaderErrors:!0},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.gammaFactor=2,this.outputEncoding=gr,this.physicallyCorrectLights=!1,this.toneMapping=Vs,this.toneMappingExposure=1;const x=this;let v=!1,g=0,f=0,_=null,w=-1,E=null;const y=new qe,S=new qe;let C=null,I=e.width,B=e.height,U=1,z=null,L=null;const D=new qe(0,0,I,B),N=new qe(0,0,I,B);let R=!1;const X=new Do;let K=!1,Z=!1;const ee=new ue,re=new T,pe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Me(){return _===null?U:1}let W=t;function Ie(M,G){for(let F=0;F<M.length;F++){const V=M[F],ne=e.getContext(V,G);if(ne!==null)return ne}return null}try{const M={alpha:n,depth:i,stencil:r,antialias:o,premultipliedAlpha:a,preserveDrawingBuffer:l,powerPreference:c,failIfMajorPerformanceCaveat:h};if(e.addEventListener("webglcontextlost",se,!1),e.addEventListener("webglcontextrestored",de,!1),W===null){const G=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&G.shift(),W=Ie(G,M),W===null)throw Ie(G)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}W.getShaderPrecisionFormat===void 0&&(W.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let Ce,ge,fe,Se,we,Te,J,$,te,he,oe,A,b,q,Y,ie,ce,De,_e,P,O,k;function j(){Ce=new b0(W),ge=new _0(W,Ce,s),Ce.init(ge),O=new Kx(W,Ce,ge),fe=new Zx(W,Ce,ge),Se=new E0,we=new zx,Te=new Jx(W,Ce,fe,we,ge,O,Se),J=new w0(x),$=new Zp(W,ge),k=new v0(W,Ce,$,ge),te=new S0(W,$,Se,k),he=new R0(W,te,$,Se),De=new C0(W),Y=new M0(we),oe=new Bx(x,J,Ce,ge,k,Y),A=new ev(we),b=new Hx(we),q=new qx(Ce,ge),ce=new x0(x,J,fe,he,a),ie=new wu(x,he,ge),_e=new y0(W,Ce,Se,ge),P=new T0(W,Ce,Se,ge),Se.programs=oe.programs,x.capabilities=ge,x.extensions=Ce,x.properties=we,x.renderLists=b,x.shadowMap=ie,x.state=fe,x.info=Se}j();const H=new $x(x,W);this.xr=H,this.getContext=function(){return W},this.getContextAttributes=function(){return W.getContextAttributes()},this.forceContextLoss=function(){const M=Ce.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=Ce.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return U},this.setPixelRatio=function(M){M!==void 0&&(U=M,this.setSize(I,B,!1))},this.getSize=function(M){return M===void 0&&(console.warn("WebGLRenderer: .getsize() now requires a Vector2 as an argument"),M=new Q),M.set(I,B)},this.setSize=function(M,G,F){if(H.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}I=M,B=G,e.width=Math.floor(M*U),e.height=Math.floor(G*U),F!==!1&&(e.style.width=M+"px",e.style.height=G+"px"),this.setViewport(0,0,M,G)},this.getDrawingBufferSize=function(M){return M===void 0&&(console.warn("WebGLRenderer: .getdrawingBufferSize() now requires a Vector2 as an argument"),M=new Q),M.set(I*U,B*U).floor()},this.setDrawingBufferSize=function(M,G,F){I=M,B=G,U=F,e.width=Math.floor(M*F),e.height=Math.floor(G*F),this.setViewport(0,0,M,G)},this.getCurrentViewport=function(M){return M===void 0&&(console.warn("WebGLRenderer: .getCurrentViewport() now requires a Vector4 as an argument"),M=new qe),M.copy(y)},this.getViewport=function(M){return M.copy(D)},this.setViewport=function(M,G,F,V){M.isVector4?D.set(M.x,M.y,M.z,M.w):D.set(M,G,F,V),fe.viewport(y.copy(D).multiplyScalar(U).floor())},this.getScissor=function(M){return M.copy(N)},this.setScissor=function(M,G,F,V){M.isVector4?N.set(M.x,M.y,M.z,M.w):N.set(M,G,F,V),fe.scissor(S.copy(N).multiplyScalar(U).floor())},this.getScissorTest=function(){return R},this.setScissorTest=function(M){fe.setScissorTest(R=M)},this.setOpaqueSort=function(M){z=M},this.setTransparentSort=function(M){L=M},this.getClearColor=function(M){return M===void 0&&(console.warn("WebGLRenderer: .getClearColor() now requires a Color as an argument"),M=new le),M.copy(ce.getClearColor())},this.setClearColor=function(){ce.setClearColor.apply(ce,arguments)},this.getClearAlpha=function(){return ce.getClearAlpha()},this.setClearAlpha=function(){ce.setClearAlpha.apply(ce,arguments)},this.clear=function(M,G,F){let V=0;(M===void 0||M)&&(V|=16384),(G===void 0||G)&&(V|=256),(F===void 0||F)&&(V|=1024),W.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",se,!1),e.removeEventListener("webglcontextrestored",de,!1),b.dispose(),q.dispose(),we.dispose(),J.dispose(),he.dispose(),k.dispose(),H.dispose(),H.removeEventListener("sessionstart",ze),H.removeEventListener("sessionend",ot),Rt.stop()};function se(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),v=!0}function de(){console.log("THREE.WebGLRenderer: Context Restored."),v=!1;const M=Se.autoReset,G=ie.enabled,F=ie.autoUpdate,V=ie.needsUpdate,ne=ie.type;j(),Se.autoReset=M,ie.enabled=G,ie.autoUpdate=F,ie.needsUpdate=V,ie.type=ne}function Ee(M){const G=M.target;G.removeEventListener("dispose",Ee),We(G)}function We(M){He(M),we.remove(M)}function He(M){const G=we.get(M).programs;G!==void 0&&G.forEach(function(F){oe.releaseProgram(F)})}function je(M,G){M.render(function(F){x.renderBufferImmediate(F,G)})}this.renderBufferImmediate=function(M,G){k.initAttributes();const F=we.get(M);M.hasPositions&&!F.position&&(F.position=W.createBuffer()),M.hasNormals&&!F.normal&&(F.normal=W.createBuffer()),M.hasUvs&&!F.uv&&(F.uv=W.createBuffer()),M.hasColors&&!F.color&&(F.color=W.createBuffer());const V=G.getAttributes();M.hasPositions&&(W.bindBuffer(34962,F.position),W.bufferData(34962,M.positionArray,35048),k.enableAttribute(V.position),W.vertexAttribPointer(V.position,3,5126,!1,0,0)),M.hasNormals&&(W.bindBuffer(34962,F.normal),W.bufferData(34962,M.normalArray,35048),k.enableAttribute(V.normal),W.vertexAttribPointer(V.normal,3,5126,!1,0,0)),M.hasUvs&&(W.bindBuffer(34962,F.uv),W.bufferData(34962,M.uvArray,35048),k.enableAttribute(V.uv),W.vertexAttribPointer(V.uv,2,5126,!1,0,0)),M.hasColors&&(W.bindBuffer(34962,F.color),W.bufferData(34962,M.colorArray,35048),k.enableAttribute(V.color),W.vertexAttribPointer(V.color,3,5126,!1,0,0)),k.disableUnusedAttributes(),W.drawArrays(4,0,M.count),M.count=0},this.renderBufferDirect=function(M,G,F,V,ne,Re){G===null&&(G=pe);const ve=ne.isMesh&&ne.matrixWorld.determinant()<0,be=Ms(M,G,V,ne);fe.setMaterial(V,ve);let Ge=F.index;const ye=F.attributes.position;if(Ge===null){if(ye===void 0||ye.count===0)return}else if(Ge.count===0)return;let Pe=1;V.wireframe===!0&&(Ge=te.getWireframeAttribute(F),Pe=2),(V.morphTargets||V.morphNormals)&&De.update(ne,F,V,be),k.setup(ne,V,be,F,Ge);let xe,Oe=_e;Ge!==null&&(xe=$.get(Ge),Oe=P,Oe.setIndex(xe));const Et=Ge!==null?Ge.count:ye.count,nt=F.drawRange.start*Pe,qt=F.drawRange.count*Pe,dt=Re!==null?Re.start*Pe:0,$n=Re!==null?Re.count*Pe:1/0,ct=Math.max(nt,dt),sa=Math.min(Et,nt+qt,dt+$n)-1,Pt=Math.max(0,sa-ct+1);if(Pt!==0){if(ne.isMesh)V.wireframe===!0?(fe.setLineWidth(V.wireframeLinewidth*Me()),Oe.setMode(1)):Oe.setMode(4);else if(ne.isLine){let un=V.linewidth;un===void 0&&(un=1),fe.setLineWidth(un*Me()),ne.isLineSegments?Oe.setMode(1):ne.isLineLoop?Oe.setMode(2):Oe.setMode(3)}else ne.isPoints?Oe.setMode(0):ne.isSprite&&Oe.setMode(4);if(ne.isInstancedMesh)Oe.renderInstances(ct,Pt,ne.count);else if(F.isInstancedBufferGeometry){const un=Math.min(F.instanceCount,F._maxInstanceCount);Oe.renderInstances(ct,Pt,un)}else Oe.render(ct,Pt)}},this.compile=function(M,G){d=q.get(M),d.init(),M.traverseVisible(function(F){F.isLight&&F.layers.test(G.layers)&&(d.pushLight(F),F.castShadow&&d.pushShadow(F))}),d.setupLights(),M.traverse(function(F){const V=F.material;if(V)if(Array.isArray(V))for(let ne=0;ne<V.length;ne++){const Re=V[ne];Mi(Re,M,F)}else Mi(V,M,F)})};let $e=null;function Fe(M){$e&&$e(M)}function ze(){Rt.stop()}function ot(){Rt.start()}const Rt=new hu;Rt.setAnimationLoop(Fe),typeof window<"u"&&Rt.setContext(window),this.setAnimationLoop=function(M){$e=M,H.setAnimationLoop(M),M===null?Rt.stop():Rt.start()},H.addEventListener("sessionstart",ze),H.addEventListener("sessionend",ot),this.render=function(M,G){let F,V;if(arguments[2]!==void 0&&(console.warn("THREE.WebGLRenderer.render(): the renderTarget argument has been removed. Use .setRenderTarget() instead."),F=arguments[2]),arguments[3]!==void 0&&(console.warn("THREE.WebGLRenderer.render(): the forceClear argument has been removed. Use .clear() instead."),V=arguments[3]),G!==void 0&&G.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(v===!0)return;M.autoUpdate===!0&&M.updateMatrixWorld(),G.parent===null&&G.updateMatrixWorld(),H.enabled===!0&&H.isPresenting===!0&&(G=H.getCamera(G)),M.isScene===!0&&M.onBeforeRender(x,M,G,F||_),d=q.get(M,m.length),d.init(),m.push(d),ee.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),X.setFromProjectionMatrix(ee),Z=this.localClippingEnabled,K=Y.init(this.clippingPlanes,Z,G),u=b.get(M,p.length),u.init(),p.push(u),Qn(M,G,0,x.sortObjects),u.finish(),x.sortObjects===!0&&u.sort(z,L),K===!0&&Y.beginShadows();const ne=d.state.shadowsArray;ie.render(ne,M,G),d.setupLights(),d.setupLightsView(G),K===!0&&Y.endShadows(),this.info.autoReset===!0&&this.info.reset(),F!==void 0&&this.setRenderTarget(F),ce.render(u,M,G,V);const Re=u.opaque,ve=u.transparent;Re.length>0&&Ln(Re,M,G),ve.length>0&&Ln(ve,M,G),_!==null&&(Te.updateRenderTargetMipmap(_),Te.updateMultisampleRenderTarget(_)),M.isScene===!0&&M.onAfterRender(x,M,G),fe.buffers.depth.setTest(!0),fe.buffers.depth.setMask(!0),fe.buffers.color.setMask(!0),fe.setPolygonOffset(!1),k.resetDefaultState(),w=-1,E=null,m.pop(),m.length>0?d=m[m.length-1]:d=null,p.pop(),p.length>0?u=p[p.length-1]:u=null};function Qn(M,G,F,V){if(M.visible===!1)return;if(M.layers.test(G.layers)){if(M.isGroup)F=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(G);else if(M.isLight)d.pushLight(M),M.castShadow&&d.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||X.intersectsSprite(M)){V&&re.setFromMatrixPosition(M.matrixWorld).applyMatrix4(ee);const ve=he.update(M),be=M.material;be.visible&&u.push(M,ve,be,F,re.z,null)}}else if(M.isImmediateRenderObject)V&&re.setFromMatrixPosition(M.matrixWorld).applyMatrix4(ee),u.push(M,null,M.material,F,re.z,null);else if((M.isMesh||M.isLine||M.isPoints)&&(M.isSkinnedMesh&&M.skeleton.frame!==Se.render.frame&&(M.skeleton.update(),M.skeleton.frame=Se.render.frame),!M.frustumCulled||X.intersectsObject(M))){V&&re.setFromMatrixPosition(M.matrixWorld).applyMatrix4(ee);const ve=he.update(M),be=M.material;if(Array.isArray(be)){const Ge=ve.groups;for(let ye=0,Pe=Ge.length;ye<Pe;ye++){const xe=Ge[ye],Oe=be[xe.materialIndex];Oe&&Oe.visible&&u.push(M,ve,Oe,F,re.z,xe)}}else be.visible&&u.push(M,ve,be,F,re.z,null)}}const Re=M.children;for(let ve=0,be=Re.length;ve<be;ve++)Qn(Re[ve],G,F,V)}function Ln(M,G,F){const V=G.isScene===!0?G.overrideMaterial:null;for(let ne=0,Re=M.length;ne<Re;ne++){const ve=M[ne],be=ve.object,Ge=ve.geometry,ye=V===null?ve.material:V,Pe=ve.group;if(F.isArrayCamera){const xe=F.cameras;for(let Oe=0,Et=xe.length;Oe<Et;Oe++){const nt=xe[Oe];be.layers.test(nt.layers)&&(fe.viewport(y.copy(nt.viewport)),d.setupLightsView(nt),ys(be,G,nt,Ge,ye,Pe))}}else ys(be,G,F,Ge,ye,Pe)}}function ys(M,G,F,V,ne,Re){if(M.onBeforeRender(x,G,F,V,ne,Re),M.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),M.isImmediateRenderObject){const ve=Ms(F,G,ne,M);fe.setMaterial(ne),k.reset(),je(M,ve)}else x.renderBufferDirect(F,G,V,ne,M,Re);M.onAfterRender(x,G,F,V,ne,Re)}function Mi(M,G,F){G.isScene!==!0&&(G=pe);const V=we.get(M),ne=d.state.lights,Re=d.state.shadowsArray,ve=ne.state.version,be=oe.getParameters(M,ne.state,Re,G,F),Ge=oe.getProgramCacheKey(be);let ye=V.programs;V.environment=M.isMeshStandardMaterial?G.environment:null,V.fog=G.fog,V.envMap=J.get(M.envMap||V.environment),ye===void 0&&(M.addEventListener("dispose",Ee),ye=new Map,V.programs=ye);let Pe=ye.get(Ge);if(Pe!==void 0){if(V.currentProgram===Pe&&V.lightsStateVersion===ve)return _s(M,be),Pe}else be.uniforms=oe.getUniforms(M),M.onBuild(be,x),M.onBeforeCompile(be,x),Pe=oe.acquireProgram(be,Ge),ye.set(Ge,Pe),V.uniforms=be.uniforms;const xe=V.uniforms;(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(xe.clippingPlanes=Y.uniform),_s(M,be),V.needsLights=Sr(M),V.lightsStateVersion=ve,V.needsLights&&(xe.ambientLightColor.value=ne.state.ambient,xe.lightProbe.value=ne.state.probe,xe.directionalLights.value=ne.state.directional,xe.directionalLightShadows.value=ne.state.directionalShadow,xe.spotLights.value=ne.state.spot,xe.spotLightShadows.value=ne.state.spotShadow,xe.rectAreaLights.value=ne.state.rectArea,xe.ltc_1.value=ne.state.rectAreaLTC1,xe.ltc_2.value=ne.state.rectAreaLTC2,xe.pointLights.value=ne.state.point,xe.pointLightShadows.value=ne.state.pointShadow,xe.hemisphereLights.value=ne.state.hemi,xe.directionalShadowMap.value=ne.state.directionalShadowMap,xe.directionalShadowMatrix.value=ne.state.directionalShadowMatrix,xe.spotShadowMap.value=ne.state.spotShadowMap,xe.spotShadowMatrix.value=ne.state.spotShadowMatrix,xe.pointShadowMap.value=ne.state.pointShadowMap,xe.pointShadowMatrix.value=ne.state.pointShadowMatrix);const Oe=Pe.getUniforms(),Et=Yn.seqWithValue(Oe.seq,xe);return V.currentProgram=Pe,V.uniformsList=Et,Pe}function _s(M,G){const F=we.get(M);F.outputEncoding=G.outputEncoding,F.instancing=G.instancing,F.numClippingPlanes=G.numClippingPlanes,F.numIntersection=G.numClipIntersection,F.vertexAlphas=G.vertexAlphas}function Ms(M,G,F,V){G.isScene!==!0&&(G=pe),Te.resetTextureUnits();const ne=G.fog,Re=F.isMeshStandardMaterial?G.environment:null,ve=_===null?x.outputEncoding:_.texture.encoding,be=J.get(F.envMap||Re),Ge=F.vertexColors===!0&&V.geometry&&V.geometry.attributes.color&&V.geometry.attributes.color.itemSize===4,ye=we.get(F),Pe=d.state.lights;if(K===!0&&(Z===!0||M!==E)){const ct=M===E&&F.id===w;Y.setState(F,M,ct)}let xe=!1;F.version===ye.__version?(ye.needsLights&&ye.lightsStateVersion!==Pe.state.version||ye.outputEncoding!==ve||V.isInstancedMesh&&ye.instancing===!1||!V.isInstancedMesh&&ye.instancing===!0||ye.envMap!==be||F.fog&&ye.fog!==ne||ye.numClippingPlanes!==void 0&&(ye.numClippingPlanes!==Y.numPlanes||ye.numIntersection!==Y.numIntersection)||ye.vertexAlphas!==Ge)&&(xe=!0):(xe=!0,ye.__version=F.version);let Oe=ye.currentProgram;xe===!0&&(Oe=Mi(F,G,V));let Et=!1,nt=!1,qt=!1;const dt=Oe.getUniforms(),$n=ye.uniforms;if(fe.useProgram(Oe.program)&&(Et=!0,nt=!0,qt=!0),F.id!==w&&(w=F.id,nt=!0),Et||E!==M){if(dt.setValue(W,"projectionMatrix",M.projectionMatrix),ge.logarithmicDepthBuffer&&dt.setValue(W,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),E!==M&&(E=M,nt=!0,qt=!0),F.isShaderMaterial||F.isMeshPhongMaterial||F.isMeshToonMaterial||F.isMeshStandardMaterial||F.envMap){const ct=dt.map.cameraPosition;ct!==void 0&&ct.setValue(W,re.setFromMatrixPosition(M.matrixWorld))}(F.isMeshPhongMaterial||F.isMeshToonMaterial||F.isMeshLambertMaterial||F.isMeshBasicMaterial||F.isMeshStandardMaterial||F.isShaderMaterial)&&dt.setValue(W,"isOrthographic",M.isOrthographicCamera===!0),(F.isMeshPhongMaterial||F.isMeshToonMaterial||F.isMeshLambertMaterial||F.isMeshBasicMaterial||F.isMeshStandardMaterial||F.isShaderMaterial||F.isShadowMaterial||F.skinning)&&dt.setValue(W,"viewMatrix",M.matrixWorldInverse)}if(F.skinning){dt.setOptional(W,V,"bindMatrix"),dt.setOptional(W,V,"bindMatrixInverse");const ct=V.skeleton;if(ct){const sa=ct.bones;if(ge.floatVertexTextures){if(ct.boneTexture===null){let Pt=Math.sqrt(sa.length*4);Pt=tu(Pt),Pt=Math.max(Pt,4);const un=new Float32Array(Pt*Pt*4);un.set(ct.boneMatrices);const Bd=new cu(un,Pt,Pt,$t,Hn);ct.boneMatrices=un,ct.boneTexture=Bd,ct.boneTextureSize=Pt}dt.setValue(W,"boneTexture",ct.boneTexture,Te),dt.setValue(W,"boneTextureSize",ct.boneTextureSize)}else dt.setOptional(W,ct,"boneMatrices")}}return(nt||ye.receiveShadow!==V.receiveShadow)&&(ye.receiveShadow=V.receiveShadow,dt.setValue(W,"receiveShadow",V.receiveShadow)),nt&&(dt.setValue(W,"toneMappingExposure",x.toneMappingExposure),ye.needsLights&&br($n,qt),ne&&F.fog&&A.refreshFogUniforms($n,ne),A.refreshMaterialUniforms($n,F,U,B),Yn.upload(W,ye.uniformsList,$n,Te)),F.isShaderMaterial&&F.uniformsNeedUpdate===!0&&(Yn.upload(W,ye.uniformsList,$n,Te),F.uniformsNeedUpdate=!1),F.isSpriteMaterial&&dt.setValue(W,"center",V.center),dt.setValue(W,"modelViewMatrix",V.modelViewMatrix),dt.setValue(W,"normalMatrix",V.normalMatrix),dt.setValue(W,"modelMatrix",V.matrixWorld),Oe}function br(M,G){M.ambientLightColor.needsUpdate=G,M.lightProbe.needsUpdate=G,M.directionalLights.needsUpdate=G,M.directionalLightShadows.needsUpdate=G,M.pointLights.needsUpdate=G,M.pointLightShadows.needsUpdate=G,M.spotLights.needsUpdate=G,M.spotLightShadows.needsUpdate=G,M.rectAreaLights.needsUpdate=G,M.hemisphereLights.needsUpdate=G}function Sr(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return g},this.getActiveMipmapLevel=function(){return f},this.getRenderTarget=function(){return _},this.setRenderTarget=function(M,G=0,F=0){_=M,g=G,f=F,M&&we.get(M).__webglFramebuffer===void 0&&Te.setupRenderTarget(M);let V=null,ne=!1,Re=!1;if(M){const ve=M.texture;(ve.isDataTexture3D||ve.isDataTexture2DArray)&&(Re=!0);const be=we.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(V=be[G],ne=!0):M.isWebGLMultisampleRenderTarget?V=we.get(M).__webglMultisampledFramebuffer:V=be,y.copy(M.viewport),S.copy(M.scissor),C=M.scissorTest}else y.copy(D).multiplyScalar(U).floor(),S.copy(N).multiplyScalar(U).floor(),C=R;if(fe.bindFramebuffer(36160,V),fe.viewport(y),fe.scissor(S),fe.setScissorTest(C),ne){const ve=we.get(M.texture);W.framebufferTexture2D(36160,36064,34069+G,ve.__webglTexture,F)}else if(Re){const ve=we.get(M.texture),be=G||0;W.framebufferTextureLayer(36160,36064,ve.__webglTexture,F||0,be)}},this.readRenderTargetPixels=function(M,G,F,V,ne,Re,ve){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let be=we.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ve!==void 0&&(be=be[ve]),be){fe.bindFramebuffer(36160,be);try{const Ge=M.texture,ye=Ge.format,Pe=Ge.type;if(ye!==$t&&O.convert(ye)!==W.getParameter(35739)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const xe=Pe===So&&(Ce.has("EXT_color_buffer_half_float")||ge.isWebGL2&&Ce.has("EXT_color_buffer_float"));if(Pe!==gl&&O.convert(Pe)!==W.getParameter(35738)&&!(Pe===Hn&&(ge.isWebGL2||Ce.has("OES_texture_float")||Ce.has("WEBGL_color_buffer_float")))&&!xe){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W.checkFramebufferStatus(36160)===36053?G>=0&&G<=M.width-V&&F>=0&&F<=M.height-ne&&W.readPixels(G,F,V,ne,O.convert(ye),O.convert(Pe),Re):console.error("THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.")}finally{const Ge=_!==null?we.get(_).__webglFramebuffer:null;fe.bindFramebuffer(36160,Ge)}}},this.copyFramebufferToTexture=function(M,G,F=0){const V=Math.pow(2,-F),ne=Math.floor(G.image.width*V),Re=Math.floor(G.image.height*V),ve=O.convert(G.format);Te.setTexture2D(G,0),W.copyTexImage2D(3553,F,ve,M.x,M.y,ne,Re,0),fe.unbindTexture()},this.copyTextureToTexture=function(M,G,F,V=0){const ne=G.image.width,Re=G.image.height,ve=O.convert(F.format),be=O.convert(F.type);Te.setTexture2D(F,0),W.pixelStorei(37440,F.flipY),W.pixelStorei(37441,F.premultiplyAlpha),W.pixelStorei(3317,F.unpackAlignment),G.isDataTexture?W.texSubImage2D(3553,V,M.x,M.y,ne,Re,ve,be,G.image.data):G.isCompressedTexture?W.compressedTexSubImage2D(3553,V,M.x,M.y,G.mipmaps[0].width,G.mipmaps[0].height,ve,G.mipmaps[0].data):W.texSubImage2D(3553,V,M.x,M.y,ve,be,G.image),V===0&&F.generateMipmaps&&W.generateMipmap(3553),fe.unbindTexture()},this.copyTextureToTexture3D=function(M,G,F,V,ne=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const{width:Re,height:ve,data:be}=F.image,Ge=O.convert(V.format),ye=O.convert(V.type);let Pe;if(V.isDataTexture3D)Te.setTexture3D(V,0),Pe=32879;else if(V.isDataTexture2DArray)Te.setTexture2DArray(V,0),Pe=35866;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}W.pixelStorei(37440,V.flipY),W.pixelStorei(37441,V.premultiplyAlpha),W.pixelStorei(3317,V.unpackAlignment);const xe=W.getParameter(3314),Oe=W.getParameter(32878),Et=W.getParameter(3316),nt=W.getParameter(3315),qt=W.getParameter(32877);W.pixelStorei(3314,Re),W.pixelStorei(32878,ve),W.pixelStorei(3316,M.min.x),W.pixelStorei(3315,M.min.y),W.pixelStorei(32877,M.min.z),W.texSubImage3D(Pe,ne,G.x,G.y,G.z,M.max.x-M.min.x+1,M.max.y-M.min.y+1,M.max.z-M.min.z+1,Ge,ye,be),W.pixelStorei(3314,xe),W.pixelStorei(32878,Oe),W.pixelStorei(3316,Et),W.pixelStorei(3315,nt),W.pixelStorei(32877,qt),ne===0&&V.generateMipmaps&&W.generateMipmap(Pe),fe.unbindTexture()},this.initTexture=function(M){Te.setTexture2D(M,0),fe.unbindTexture()},this.resetState=function(){g=0,f=0,_=null,fe.reset(),k.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}class nv extends Ye{}nv.prototype.isWebGL1Renderer=!0;class wl{constructor(e,t=25e-5){this.name="",this.color=new le(e),this.density=t}clone(){return new wl(this.color,this.density)}toJSON(){return{type:"FogExp2",color:this.color.getHex(),density:this.density}}}wl.prototype.isFogExp2=!0;class bl extends ke{constructor(){super(),this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.overrideMaterial=null,this.autoUpdate=!0,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.autoUpdate=e.autoUpdate,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.background!==null&&(t.object.background=this.background.toJSON(e)),this.environment!==null&&(t.object.environment=this.environment.toJSON(e)),this.fog!==null&&(t.object.fog=this.fog.toJSON()),t}}bl.prototype.isScene=!0;class Kn{constructor(e,t){this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=nr,this.updateRange={offset:0,count:-1},this.version=0,this.uuid=Vt(),this.onUploadCallback=function(){}}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Vt()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new Kn(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Vt()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.prototype.slice.call(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}Kn.prototype.isInterleavedBuffer=!0;const at=new T;class ts{constructor(e,t,n,i){this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i===!0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)at.x=this.getX(t),at.y=this.getY(t),at.z=this.getZ(t),at.applyMatrix4(e),this.setXYZ(t,at.x,at.y,at.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)at.x=this.getX(t),at.y=this.getY(t),at.z=this.getZ(t),at.applyNormalMatrix(e),this.setXYZ(t,at.x,at.y,at.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)at.x=this.getX(t),at.y=this.getY(t),at.z=this.getZ(t),at.transformDirection(e),this.setXYZ(t,at.x,at.y,at.z);return this}setX(e,t){return this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){return this.data.array[e*this.data.stride+this.offset]}getY(e){return this.data.array[e*this.data.stride+this.offset+1]}getZ(e){return this.data.array[e*this.data.stride+this.offset+2]}getW(e){return this.data.array[e*this.data.stride+this.offset+3]}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interlaved buffer attribute will deinterleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new Le(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new ts(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interlaved buffer attribute will deinterleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}ts.prototype.isInterleavedBufferAttribute=!0;class xr extends ht{constructor(e){super(),this.type="SpriteMaterial",this.color=new le(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this}}xr.prototype.isSpriteMaterial=!0;let Fi;const As=new T,Bi=new T,zi=new T,Oi=new Q,Ls=new Q,Su=new ue,Vr=new T,Cs=new T,Wr=new T,Jc=new Q,Ia=new Q,Kc=new Q;class No extends ke{constructor(e){if(super(),this.type="Sprite",Fi===void 0){Fi=new Be;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Kn(t,5);Fi.setIndex([0,1,2,0,2,3]),Fi.setAttribute("position",new ts(n,3,0,!1)),Fi.setAttribute("uv",new ts(n,2,3,!1))}this.geometry=Fi,this.material=e!==void 0?e:new xr,this.center=new Q(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Bi.setFromMatrixScale(this.matrixWorld),Su.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),zi.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Bi.multiplyScalar(-zi.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const o=this.center;Xr(Vr.set(-.5,-.5,0),zi,o,Bi,i,r),Xr(Cs.set(.5,-.5,0),zi,o,Bi,i,r),Xr(Wr.set(.5,.5,0),zi,o,Bi,i,r),Jc.set(0,0),Ia.set(1,0),Kc.set(1,1);let a=e.ray.intersectTriangle(Vr,Cs,Wr,!1,As);if(a===null&&(Xr(Cs.set(-.5,.5,0),zi,o,Bi,i,r),Ia.set(0,1),a=e.ray.intersectTriangle(Vr,Wr,Cs,!1,As),a===null))return;const l=e.ray.origin.distanceTo(As);l<e.near||l>e.far||t.push({distance:l,point:As.clone(),uv:ft.getUV(As,Vr,Cs,Wr,Jc,Ia,Kc,new Q),face:null,object:this})}copy(e){return super.copy(e),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}No.prototype.isSprite=!0;function Xr(s,e,t,n,i,r){Oi.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(Ls.x=r*Oi.x-i*Oi.y,Ls.y=i*Oi.x+r*Oi.y):Ls.copy(Oi),s.copy(e),s.x+=Ls.x,s.y+=Ls.y,s.applyMatrix4(Su)}const Qc=new T,$c=new qe,eh=new qe,iv=new T,th=new ue;class Sl extends Qe{constructor(e,t){super(e,t),this.type="SkinnedMesh",this.bindMode="attached",this.bindMatrix=new ue,this.bindMatrixInverse=new ue}copy(e){return super.copy(e),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,this}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new qe,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.x=t.getX(n),e.y=t.getY(n),e.z=t.getZ(n),e.w=t.getW(n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode==="attached"?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode==="detached"?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}boneTransform(e,t){const n=this.skeleton,i=this.geometry;$c.fromBufferAttribute(i.attributes.skinIndex,e),eh.fromBufferAttribute(i.attributes.skinWeight,e),Qc.fromBufferAttribute(i.attributes.position,e).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const o=eh.getComponent(r);if(o!==0){const a=$c.getComponent(r);th.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(iv.copy(Qc).applyMatrix4(th),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}Sl.prototype.isSkinnedMesh=!0;class Tl extends ke{constructor(){super(),this.type="Bone"}}Tl.prototype.isBone=!0;const nh=new ue,sv=new ue;class El{constructor(e=[],t=[]){this.uuid=Vt(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.boneTextureSize=0,this.frame=-1,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new ue)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new ue;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,o=e.length;r<o;r++){const a=e[r]?e[r].matrixWorld:sv;nh.multiplyMatrices(a,t[r]),nh.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new El(this.bones,this.boneInverses)}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const r=e.bones[n];let o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new Tl),this.bones.push(o),this.boneInverses.push(new ue().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.5,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}const ih=new ue,sh=new ue,qr=[],Rs=new Qe;class Tu extends Qe{constructor(e,t,n){super(e,t),this.instanceMatrix=new Le(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.frustumCulled=!1}copy(e){return super.copy(e),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Rs.geometry=this.geometry,Rs.material=this.material,Rs.material!==void 0)for(let r=0;r<i;r++){this.getMatrixAt(r,ih),sh.multiplyMatrices(n,ih),Rs.matrixWorld=sh,Rs.raycast(e,qr);for(let o=0,a=qr.length;o<a;o++){const l=qr[o];l.instanceId=r,l.object=this,t.push(l)}qr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Le(new Float32Array(this.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}Tu.prototype.isInstancedMesh=!0;class us extends ht{constructor(e){super(),this.type="LineBasicMaterial",this.color=new le(16777215),this.linewidth=1,this.linecap="round",this.linejoin="round",this.morphTargets=!1,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.morphTargets=e.morphTargets,this}}us.prototype.isLineBasicMaterial=!0;const rh=new T,oh=new T,ah=new ue,Da=new yi,Yr=new vi;class vr extends ke{constructor(e=new Be,t=new us){super(),this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e){return super.copy(e),this.material=e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.isBufferGeometry)if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)rh.fromBufferAttribute(t,i-1),oh.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=rh.distanceTo(oh);e.setAttribute("lineDistance",new Je(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");else e.isGeometry&&console.error("THREE.Line.computeLineDistances() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Yr.copy(n.boundingSphere),Yr.applyMatrix4(i),Yr.radius+=r,e.ray.intersectsSphere(Yr)===!1)return;ah.copy(i).invert(),Da.copy(e.ray).applyMatrix4(ah);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=new T,h=new T,u=new T,d=new T,p=this.isLineSegments?2:1;if(n.isBufferGeometry){const m=n.index,v=n.attributes.position;if(m!==null){const g=Math.max(0,o.start),f=Math.min(m.count,o.start+o.count);for(let _=g,w=f-1;_<w;_+=p){const E=m.getX(_),y=m.getX(_+1);if(c.fromBufferAttribute(v,E),h.fromBufferAttribute(v,y),Da.distanceSqToSegment(c,h,d,u)>l)continue;d.applyMatrix4(this.matrixWorld);const C=e.ray.origin.distanceTo(d);C<e.near||C>e.far||t.push({distance:C,point:u.clone().applyMatrix4(this.matrixWorld),index:_,face:null,faceIndex:null,object:this})}}else{const g=Math.max(0,o.start),f=Math.min(v.count,o.start+o.count);for(let _=g,w=f-1;_<w;_+=p){if(c.fromBufferAttribute(v,_),h.fromBufferAttribute(v,_+1),Da.distanceSqToSegment(c,h,d,u)>l)continue;d.applyMatrix4(this.matrixWorld);const y=e.ray.origin.distanceTo(d);y<e.near||y>e.far||t.push({distance:y,point:u.clone().applyMatrix4(this.matrixWorld),index:_,face:null,faceIndex:null,object:this})}}}else n.isGeometry&&console.error("THREE.Line.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")}updateMorphTargets(){const e=this.geometry;if(e.isBufferGeometry){const t=e.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}else{const t=e.morphTargets;t!==void 0&&t.length>0&&console.error("THREE.Line.updateMorphTargets() does not support THREE.Geometry. Use THREE.BufferGeometry instead.")}}}vr.prototype.isLine=!0;const lh=new T,ch=new T;class Fo extends vr{constructor(e,t){super(e,t),this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.isBufferGeometry)if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)lh.fromBufferAttribute(t,i),ch.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+lh.distanceTo(ch);e.setAttribute("lineDistance",new Je(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");else e.isGeometry&&console.error("THREE.LineSegments.computeLineDistances() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.");return this}}Fo.prototype.isLineSegments=!0;class Eu extends vr{constructor(e,t){super(e,t),this.type="LineLoop"}}Eu.prototype.isLineLoop=!0;class Al extends ht{constructor(e){super(),this.type="PointsMaterial",this.color=new le(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.morphTargets=!1,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.morphTargets=e.morphTargets,this}}Al.prototype.isPointsMaterial=!0;const hh=new ue,Ka=new yi,jr=new vi,Zr=new T;class ds extends ke{constructor(e=new Be,t=new Al){super(),this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e){return super.copy(e),this.material=e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),jr.copy(n.boundingSphere),jr.applyMatrix4(i),jr.radius+=r,e.ray.intersectsSphere(jr)===!1)return;hh.copy(i).invert(),Ka.copy(e.ray).applyMatrix4(hh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a;if(n.isBufferGeometry){const c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),p=Math.min(c.count,o.start+o.count);for(let m=d,x=p;m<x;m++){const v=c.getX(m);Zr.fromBufferAttribute(u,v),uh(Zr,v,l,i,e,t,this)}}else{const d=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let m=d,x=p;m<x;m++)Zr.fromBufferAttribute(u,m),uh(Zr,m,l,i,e,t,this)}}else console.error("THREE.Points.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")}updateMorphTargets(){const e=this.geometry;if(e.isBufferGeometry){const t=e.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}else{const t=e.morphTargets;t!==void 0&&t.length>0&&console.error("THREE.Points.updateMorphTargets() does not support THREE.Geometry. Use THREE.BufferGeometry instead.")}}}ds.prototype.isPoints=!0;function uh(s,e,t,n,i,r,o){const a=Ka.distanceSqToPoint(s);if(a<t){const l=new T;Ka.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,object:o})}}class rv extends xt{constructor(e,t,n,i,r,o,a,l,c){super(e,t,n,i,r,o,a,l,c),this.format=a!==void 0?a:qn,this.minFilter=o!==void 0?o:Ft,this.magFilter=r!==void 0?r:Ft,this.generateMipmaps=!1;const h=this;function u(){h.needsUpdate=!0,e.requestVideoFrameCallback(u)}"requestVideoFrameCallback"in e&&e.requestVideoFrameCallback(u)}clone(){return new this.constructor(this.image).copy(this)}update(){const e=this.image;"requestVideoFrameCallback"in e===!1&&e.readyState>=e.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}}rv.prototype.isVideoTexture=!0;class ov extends xt{constructor(e,t,n,i,r,o,a,l,c,h,u,d){super(null,o,a,l,c,h,i,r,u,d),this.image={width:t,height:n},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}}ov.prototype.isCompressedTexture=!0;class cn extends xt{constructor(e,t,n,i,r,o,a,l,c){super(e,t,n,i,r,o,a,l,c),this.needsUpdate=!0}}cn.prototype.isCanvasTexture=!0;class av extends xt{constructor(e,t,n,i,r,o,a,l,c,h){if(h=h!==void 0?h:Yi,h!==Yi&&h!==$s)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Yi&&(n=bo),n===void 0&&h===$s&&(n=Ws),super(null,i,r,o,a,l,h,n,c),this.image={width:e,height:t},this.magFilter=a!==void 0?a:St,this.minFilter=l!==void 0?l:St,this.flipY=!1,this.generateMipmaps=!1}}av.prototype.isDepthTexture=!0;class Bo extends Be{constructor(e=1,t=1,n=1,i=8,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const h=[],u=[],d=[],p=[];let m=0;const x=[],v=n/2;let g=0;f(),o===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new Je(u,3)),this.setAttribute("normal",new Je(d,3)),this.setAttribute("uv",new Je(p,2));function f(){const w=new T,E=new T;let y=0;const S=(t-e)/n;for(let C=0;C<=r;C++){const I=[],B=C/r,U=B*(t-e)+e;for(let z=0;z<=i;z++){const L=z/i,D=L*l+a,N=Math.sin(D),R=Math.cos(D);E.x=U*N,E.y=-B*n+v,E.z=U*R,u.push(E.x,E.y,E.z),w.set(N,S,R).normalize(),d.push(w.x,w.y,w.z),p.push(L,1-B),I.push(m++)}x.push(I)}for(let C=0;C<i;C++)for(let I=0;I<r;I++){const B=x[I][C],U=x[I+1][C],z=x[I+1][C+1],L=x[I][C+1];h.push(B,U,L),h.push(U,z,L),y+=6}c.addGroup(g,y,0),g+=y}function _(w){const E=m,y=new Q,S=new T;let C=0;const I=w===!0?e:t,B=w===!0?1:-1;for(let z=1;z<=i;z++)u.push(0,v*B,0),d.push(0,B,0),p.push(.5,.5),m++;const U=m;for(let z=0;z<=i;z++){const D=z/i*l+a,N=Math.cos(D),R=Math.sin(D);S.x=I*R,S.y=v*B,S.z=I*N,u.push(S.x,S.y,S.z),d.push(0,B,0),y.x=N*.5+.5,y.y=R*.5*B+.5,p.push(y.x,y.y),m++}for(let z=0;z<i;z++){const L=E+z,D=U+z;w===!0?h.push(D,D+1,L):h.push(D+1,D,L),C+=3}c.addGroup(g,C,w===!0?1:2),g+=C}}}class CM extends Bo{constructor(e=1,t=1,n=8,i=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}}class lv extends Be{constructor(e,t,n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const r=[],o=[];a(i),c(n),h(),this.setAttribute("position",new Je(r,3)),this.setAttribute("normal",new Je(r.slice(),3)),this.setAttribute("uv",new Je(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(f){const _=new T,w=new T,E=new T;for(let y=0;y<t.length;y+=3)p(t[y+0],_),p(t[y+1],w),p(t[y+2],E),l(_,w,E,f)}function l(f,_,w,E){const y=E+1,S=[];for(let C=0;C<=y;C++){S[C]=[];const I=f.clone().lerp(w,C/y),B=_.clone().lerp(w,C/y),U=y-C;for(let z=0;z<=U;z++)z===0&&C===y?S[C][z]=I:S[C][z]=I.clone().lerp(B,z/U)}for(let C=0;C<y;C++)for(let I=0;I<2*(y-C)-1;I++){const B=Math.floor(I/2);I%2===0?(d(S[C][B+1]),d(S[C+1][B]),d(S[C][B])):(d(S[C][B+1]),d(S[C+1][B+1]),d(S[C+1][B]))}}function c(f){const _=new T;for(let w=0;w<r.length;w+=3)_.x=r[w+0],_.y=r[w+1],_.z=r[w+2],_.normalize().multiplyScalar(f),r[w+0]=_.x,r[w+1]=_.y,r[w+2]=_.z}function h(){const f=new T;for(let _=0;_<r.length;_+=3){f.x=r[_+0],f.y=r[_+1],f.z=r[_+2];const w=v(f)/2/Math.PI+.5,E=g(f)/Math.PI+.5;o.push(w,1-E)}m(),u()}function u(){for(let f=0;f<o.length;f+=6){const _=o[f+0],w=o[f+2],E=o[f+4],y=Math.max(_,w,E),S=Math.min(_,w,E);y>.9&&S<.1&&(_<.2&&(o[f+0]+=1),w<.2&&(o[f+2]+=1),E<.2&&(o[f+4]+=1))}}function d(f){r.push(f.x,f.y,f.z)}function p(f,_){const w=f*3;_.x=e[w+0],_.y=e[w+1],_.z=e[w+2]}function m(){const f=new T,_=new T,w=new T,E=new T,y=new Q,S=new Q,C=new Q;for(let I=0,B=0;I<r.length;I+=9,B+=6){f.set(r[I+0],r[I+1],r[I+2]),_.set(r[I+3],r[I+4],r[I+5]),w.set(r[I+6],r[I+7],r[I+8]),y.set(o[B+0],o[B+1]),S.set(o[B+2],o[B+3]),C.set(o[B+4],o[B+5]),E.copy(f).add(_).add(w).divideScalar(3);const U=v(E);x(y,B+0,f,U),x(S,B+2,_,U),x(C,B+4,w,U)}}function x(f,_,w,E){E<0&&f.x===1&&(o[_]=f.x-1),w.x===0&&w.z===0&&(o[_]=E/2/Math.PI+.5)}function v(f){return Math.atan2(f.z,-f.x)}function g(f){return Math.atan2(-f.y,Math.sqrt(f.x*f.x+f.z*f.z))}}}const cv={triangulate:function(s,e,t){t=t||2;const n=e&&e.length,i=n?e[0]*t:s.length;let r=Au(s,0,i,t,!0);const o=[];if(!r||r.next===r.prev)return o;let a,l,c,h,u,d,p;if(n&&(r=pv(s,e,r,t)),s.length>80*t){a=c=s[0],l=h=s[1];for(let m=t;m<i;m+=t)u=s[m],d=s[m+1],u<a&&(a=u),d<l&&(l=d),u>c&&(c=u),d>h&&(h=d);p=Math.max(c-a,h-l),p=p!==0?1/p:0}return sr(r,o,t,a,l,p),o}};function Au(s,e,t,n,i){let r,o;if(i===Tv(s,e,t,n)>0)for(r=e;r<t;r+=n)o=dh(r,s[r],s[r+1],o);else for(r=t-n;r>=e;r-=n)o=dh(r,s[r],s[r+1],o);return o&&zo(o,o.next)&&(or(o),o=o.next),o}function Jn(s,e){if(!s)return s;e||(e=s);let t=s,n;do if(n=!1,!t.steiner&&(zo(t,t.next)||rt(t.prev,t,t.next)===0)){if(or(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function sr(s,e,t,n,i,r,o){if(!s)return;!o&&r&&yv(s,n,i,r);let a=s,l,c;for(;s.prev!==s.next;){if(l=s.prev,c=s.next,r?uv(s,n,i,r):hv(s)){e.push(l.i/t),e.push(s.i/t),e.push(c.i/t),or(s),s=c.next,a=c.next;continue}if(s=c,s===a){o?o===1?(s=dv(Jn(s),e,t),sr(s,e,t,n,i,r,2)):o===2&&fv(s,e,t,n,i,r):sr(Jn(s),e,t,n,i,r,1);break}}}function hv(s){const e=s.prev,t=s,n=s.next;if(rt(e,t,n)>=0)return!1;let i=s.next.next;for(;i!==s.prev;){if(Vi(e.x,e.y,t.x,t.y,n.x,n.y,i.x,i.y)&&rt(i.prev,i,i.next)>=0)return!1;i=i.next}return!0}function uv(s,e,t,n){const i=s.prev,r=s,o=s.next;if(rt(i,r,o)>=0)return!1;const a=i.x<r.x?i.x<o.x?i.x:o.x:r.x<o.x?r.x:o.x,l=i.y<r.y?i.y<o.y?i.y:o.y:r.y<o.y?r.y:o.y,c=i.x>r.x?i.x>o.x?i.x:o.x:r.x>o.x?r.x:o.x,h=i.y>r.y?i.y>o.y?i.y:o.y:r.y>o.y?r.y:o.y,u=Qa(a,l,e,t,n),d=Qa(c,h,e,t,n);let p=s.prevZ,m=s.nextZ;for(;p&&p.z>=u&&m&&m.z<=d;){if(p!==s.prev&&p!==s.next&&Vi(i.x,i.y,r.x,r.y,o.x,o.y,p.x,p.y)&&rt(p.prev,p,p.next)>=0||(p=p.prevZ,m!==s.prev&&m!==s.next&&Vi(i.x,i.y,r.x,r.y,o.x,o.y,m.x,m.y)&&rt(m.prev,m,m.next)>=0))return!1;m=m.nextZ}for(;p&&p.z>=u;){if(p!==s.prev&&p!==s.next&&Vi(i.x,i.y,r.x,r.y,o.x,o.y,p.x,p.y)&&rt(p.prev,p,p.next)>=0)return!1;p=p.prevZ}for(;m&&m.z<=d;){if(m!==s.prev&&m!==s.next&&Vi(i.x,i.y,r.x,r.y,o.x,o.y,m.x,m.y)&&rt(m.prev,m,m.next)>=0)return!1;m=m.nextZ}return!0}function dv(s,e,t){let n=s;do{const i=n.prev,r=n.next.next;!zo(i,r)&&Lu(i,n,n.next,r)&&rr(i,r)&&rr(r,i)&&(e.push(i.i/t),e.push(n.i/t),e.push(r.i/t),or(n),or(n.next),n=s=r),n=n.next}while(n!==s);return Jn(n)}function fv(s,e,t,n,i,r){let o=s;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&wv(o,a)){let l=Cu(o,a);o=Jn(o,o.next),l=Jn(l,l.next),sr(o,e,t,n,i,r),sr(l,e,t,n,i,r);return}a=a.next}o=o.next}while(o!==s)}function pv(s,e,t,n){const i=[];let r,o,a,l,c;for(r=0,o=e.length;r<o;r++)a=e[r]*n,l=r<o-1?e[r+1]*n:s.length,c=Au(s,a,l,n,!1),c===c.next&&(c.steiner=!0),i.push(Mv(c));for(i.sort(mv),r=0;r<i.length;r++)gv(i[r],t),t=Jn(t,t.next);return t}function mv(s,e){return s.x-e.x}function gv(s,e){if(e=xv(s,e),e){const t=Cu(e,s);Jn(e,e.next),Jn(t,t.next)}}function xv(s,e){let t=e;const n=s.x,i=s.y;let r=-1/0,o;do{if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){const d=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=n&&d>r){if(r=d,d===n){if(i===t.y)return t;if(i===t.next.y)return t.next}o=t.x<t.next.x?t:t.next}}t=t.next}while(t!==e);if(!o)return null;if(n===r)return o;const a=o,l=o.x,c=o.y;let h=1/0,u;t=o;do n>=t.x&&t.x>=l&&n!==t.x&&Vi(i<c?n:r,i,l,c,i<c?r:n,i,t.x,t.y)&&(u=Math.abs(i-t.y)/(n-t.x),rr(t,s)&&(u<h||u===h&&(t.x>o.x||t.x===o.x&&vv(o,t)))&&(o=t,h=u)),t=t.next;while(t!==a);return o}function vv(s,e){return rt(s.prev,s,e.prev)<0&&rt(e.next,s,s.next)<0}function yv(s,e,t,n){let i=s;do i.z===null&&(i.z=Qa(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,_v(i)}function _v(s){let e,t,n,i,r,o,a,l,c=1;do{for(t=s,s=null,r=null,o=0;t;){for(o++,n=t,a=0,e=0;e<c&&(a++,n=n.nextZ,!!n);e++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||t.z<=n.z)?(i=t,t=t.nextZ,a--):(i=n,n=n.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;t=n}r.nextZ=null,c*=2}while(o>1);return s}function Qa(s,e,t,n,i){return s=32767*(s-t)*i,e=32767*(e-n)*i,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function Mv(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function Vi(s,e,t,n,i,r,o,a){return(i-o)*(e-a)-(s-o)*(r-a)>=0&&(s-o)*(n-a)-(t-o)*(e-a)>=0&&(t-o)*(r-a)-(i-o)*(n-a)>=0}function wv(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!bv(s,e)&&(rr(s,e)&&rr(e,s)&&Sv(s,e)&&(rt(s.prev,s,e.prev)||rt(s,e.prev,e))||zo(s,e)&&rt(s.prev,s,s.next)>0&&rt(e.prev,e,e.next)>0)}function rt(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function zo(s,e){return s.x===e.x&&s.y===e.y}function Lu(s,e,t,n){const i=Kr(rt(s,e,t)),r=Kr(rt(s,e,n)),o=Kr(rt(t,n,s)),a=Kr(rt(t,n,e));return!!(i!==r&&o!==a||i===0&&Jr(s,t,e)||r===0&&Jr(s,n,e)||o===0&&Jr(t,s,n)||a===0&&Jr(t,e,n))}function Jr(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function Kr(s){return s>0?1:s<0?-1:0}function bv(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&Lu(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function rr(s,e){return rt(s.prev,s,s.next)<0?rt(s,e,s.next)>=0&&rt(s,s.prev,e)>=0:rt(s,e,s.prev)<0||rt(s,s.next,e)<0}function Sv(s,e){let t=s,n=!1;const i=(s.x+e.x)/2,r=(s.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&i<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==s);return n}function Cu(s,e){const t=new $a(s.i,s.x,s.y),n=new $a(e.i,e.x,e.y),i=s.next,r=e.prev;return s.next=e,e.prev=s,t.next=i,i.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function dh(s,e,t,n){const i=new $a(s,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function or(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function $a(s,e,t){this.i=s,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=null,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Tv(s,e,t,n){let i=0;for(let r=e,o=t-n;r<t;r+=n)i+=(s[o]-s[r])*(s[r+1]+s[o+1]),o=r;return i}class jn{static area(e){const t=e.length;let n=0;for(let i=t-1,r=0;r<t;i=r++)n+=e[i].x*e[r].y-e[r].x*e[i].y;return n*.5}static isClockWise(e){return jn.area(e)<0}static triangulateShape(e,t){const n=[],i=[],r=[];fh(e),ph(n,e);let o=e.length;t.forEach(fh);for(let l=0;l<t.length;l++)i.push(o),o+=t[l].length,ph(n,t[l]);const a=cv.triangulate(n,i);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}}function fh(s){const e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function ph(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}class Oo extends Be{constructor(e,t){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,i=[],r=[];for(let a=0,l=e.length;a<l;a++){const c=e[a];o(c)}this.setAttribute("position",new Je(i,3)),this.setAttribute("uv",new Je(r,2)),this.computeVertexNormals();function o(a){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1;let u=t.depth!==void 0?t.depth:100,d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,p=t.bevelThickness!==void 0?t.bevelThickness:6,m=t.bevelSize!==void 0?t.bevelSize:p-2,x=t.bevelOffset!==void 0?t.bevelOffset:0,v=t.bevelSegments!==void 0?t.bevelSegments:3;const g=t.extrudePath,f=t.UVGenerator!==void 0?t.UVGenerator:Ev;t.amount!==void 0&&(console.warn("THREE.ExtrudeBufferGeometry: amount has been renamed to depth."),u=t.amount);let _,w=!1,E,y,S,C;g&&(_=g.getSpacedPoints(h),w=!0,d=!1,E=g.computeFrenetFrames(h,!1),y=new T,S=new T,C=new T),d||(v=0,p=0,m=0,x=0);const I=a.extractPoints(c);let B=I.shape;const U=I.holes;if(!jn.isClockWise(B)){B=B.reverse();for(let J=0,$=U.length;J<$;J++){const te=U[J];jn.isClockWise(te)&&(U[J]=te.reverse())}}const L=jn.triangulateShape(B,U),D=B;for(let J=0,$=U.length;J<$;J++){const te=U[J];B=B.concat(te)}function N(J,$,te){return $||console.error("THREE.ExtrudeGeometry: vec does not exist"),$.clone().multiplyScalar(te).add(J)}const R=B.length,X=L.length;function K(J,$,te){let he,oe,A;const b=J.x-$.x,q=J.y-$.y,Y=te.x-J.x,ie=te.y-J.y,ce=b*b+q*q,De=b*ie-q*Y;if(Math.abs(De)>Number.EPSILON){const _e=Math.sqrt(ce),P=Math.sqrt(Y*Y+ie*ie),O=$.x-q/_e,k=$.y+b/_e,j=te.x-ie/P,H=te.y+Y/P,se=((j-O)*ie-(H-k)*Y)/(b*ie-q*Y);he=O+b*se-J.x,oe=k+q*se-J.y;const de=he*he+oe*oe;if(de<=2)return new Q(he,oe);A=Math.sqrt(de/2)}else{let _e=!1;b>Number.EPSILON?Y>Number.EPSILON&&(_e=!0):b<-Number.EPSILON?Y<-Number.EPSILON&&(_e=!0):Math.sign(q)===Math.sign(ie)&&(_e=!0),_e?(he=-q,oe=b,A=Math.sqrt(ce)):(he=b,oe=q,A=Math.sqrt(ce/2))}return new Q(he/A,oe/A)}const Z=[];for(let J=0,$=D.length,te=$-1,he=J+1;J<$;J++,te++,he++)te===$&&(te=0),he===$&&(he=0),Z[J]=K(D[J],D[te],D[he]);const ee=[];let re,pe=Z.concat();for(let J=0,$=U.length;J<$;J++){const te=U[J];re=[];for(let he=0,oe=te.length,A=oe-1,b=he+1;he<oe;he++,A++,b++)A===oe&&(A=0),b===oe&&(b=0),re[he]=K(te[he],te[A],te[b]);ee.push(re),pe=pe.concat(re)}for(let J=0;J<v;J++){const $=J/v,te=p*Math.cos($*Math.PI/2),he=m*Math.sin($*Math.PI/2)+x;for(let oe=0,A=D.length;oe<A;oe++){const b=N(D[oe],Z[oe],he);ge(b.x,b.y,-te)}for(let oe=0,A=U.length;oe<A;oe++){const b=U[oe];re=ee[oe];for(let q=0,Y=b.length;q<Y;q++){const ie=N(b[q],re[q],he);ge(ie.x,ie.y,-te)}}}const Me=m+x;for(let J=0;J<R;J++){const $=d?N(B[J],pe[J],Me):B[J];w?(S.copy(E.normals[0]).multiplyScalar($.x),y.copy(E.binormals[0]).multiplyScalar($.y),C.copy(_[0]).add(S).add(y),ge(C.x,C.y,C.z)):ge($.x,$.y,0)}for(let J=1;J<=h;J++)for(let $=0;$<R;$++){const te=d?N(B[$],pe[$],Me):B[$];w?(S.copy(E.normals[J]).multiplyScalar(te.x),y.copy(E.binormals[J]).multiplyScalar(te.y),C.copy(_[J]).add(S).add(y),ge(C.x,C.y,C.z)):ge(te.x,te.y,u/h*J)}for(let J=v-1;J>=0;J--){const $=J/v,te=p*Math.cos($*Math.PI/2),he=m*Math.sin($*Math.PI/2)+x;for(let oe=0,A=D.length;oe<A;oe++){const b=N(D[oe],Z[oe],he);ge(b.x,b.y,u+te)}for(let oe=0,A=U.length;oe<A;oe++){const b=U[oe];re=ee[oe];for(let q=0,Y=b.length;q<Y;q++){const ie=N(b[q],re[q],he);w?ge(ie.x,ie.y+_[h-1].y,_[h-1].x+te):ge(ie.x,ie.y,u+te)}}}W(),Ie();function W(){const J=i.length/3;if(d){let $=0,te=R*$;for(let he=0;he<X;he++){const oe=L[he];fe(oe[2]+te,oe[1]+te,oe[0]+te)}$=h+v*2,te=R*$;for(let he=0;he<X;he++){const oe=L[he];fe(oe[0]+te,oe[1]+te,oe[2]+te)}}else{for(let $=0;$<X;$++){const te=L[$];fe(te[2],te[1],te[0])}for(let $=0;$<X;$++){const te=L[$];fe(te[0]+R*h,te[1]+R*h,te[2]+R*h)}}n.addGroup(J,i.length/3-J,0)}function Ie(){const J=i.length/3;let $=0;Ce(D,$),$+=D.length;for(let te=0,he=U.length;te<he;te++){const oe=U[te];Ce(oe,$),$+=oe.length}n.addGroup(J,i.length/3-J,1)}function Ce(J,$){let te=J.length;for(;--te>=0;){const he=te;let oe=te-1;oe<0&&(oe=J.length-1);for(let A=0,b=h+v*2;A<b;A++){const q=R*A,Y=R*(A+1),ie=$+he+q,ce=$+oe+q,De=$+oe+Y,_e=$+he+Y;Se(ie,ce,De,_e)}}}function ge(J,$,te){l.push(J),l.push($),l.push(te)}function fe(J,$,te){we(J),we($),we(te);const he=i.length/3,oe=f.generateTopUV(n,i,he-3,he-2,he-1);Te(oe[0]),Te(oe[1]),Te(oe[2])}function Se(J,$,te,he){we(J),we($),we(he),we($),we(te),we(he);const oe=i.length/3,A=f.generateSideWallUV(n,i,oe-6,oe-3,oe-2,oe-1);Te(A[0]),Te(A[1]),Te(A[3]),Te(A[1]),Te(A[2]),Te(A[3])}function we(J){i.push(l[J*3+0]),i.push(l[J*3+1]),i.push(l[J*3+2])}function Te(J){r.push(J.x),r.push(J.y)}}}toJSON(){const e=Be.prototype.toJSON.call(this),t=this.parameters.shapes,n=this.parameters.options;return Av(t,n,e)}}const Ev={generateTopUV:function(s,e,t,n,i){const r=e[t*3],o=e[t*3+1],a=e[n*3],l=e[n*3+1],c=e[i*3],h=e[i*3+1];return[new Q(r,o),new Q(a,l),new Q(c,h)]},generateSideWallUV:function(s,e,t,n,i,r){const o=e[t*3],a=e[t*3+1],l=e[t*3+2],c=e[n*3],h=e[n*3+1],u=e[n*3+2],d=e[i*3],p=e[i*3+1],m=e[i*3+2],x=e[r*3],v=e[r*3+1],g=e[r*3+2];return Math.abs(a-h)<.01?[new Q(o,1-l),new Q(c,1-u),new Q(d,1-m),new Q(x,1-g)]:[new Q(a,1-l),new Q(h,1-u),new Q(p,1-m),new Q(v,1-g)]}};function Av(s,e,t){if(t.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){const r=s[n];t.shapes.push(r.uuid)}else t.shapes.push(s.uuid);return e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class RM extends lv{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}}class Lv extends Be{constructor(e,t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],i=[],r=[],o=[];let a=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(a,l,h),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new Je(i,3)),this.setAttribute("normal",new Je(r,3)),this.setAttribute("uv",new Je(o,2));function c(h){const u=i.length/3,d=h.extractPoints(t);let p=d.shape;const m=d.holes;jn.isClockWise(p)===!1&&(p=p.reverse());for(let v=0,g=m.length;v<g;v++){const f=m[v];jn.isClockWise(f)===!0&&(m[v]=f.reverse())}const x=jn.triangulateShape(p,m);for(let v=0,g=m.length;v<g;v++){const f=m[v];p=p.concat(f)}for(let v=0,g=p.length;v<g;v++){const f=p[v];i.push(f.x,f.y,0),r.push(0,0,1),o.push(f.x,f.y)}for(let v=0,g=x.length;v<g;v++){const f=x[v],_=f[0]+u,w=f[1]+u,E=f[2]+u;n.push(_,w,E),l+=3}}}toJSON(){const e=Be.prototype.toJSON.call(this),t=this.parameters.shapes;return Cv(t,e)}}function Cv(s,e){if(e.shapes=[],Array.isArray(s))for(let t=0,n=s.length;t<n;t++){const i=s[t];e.shapes.push(i.uuid)}else e.shapes.push(s.uuid);return e}class Ru extends Be{constructor(e=1,t=8,n=6,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new T,d=new T,p=[],m=[],x=[],v=[];for(let g=0;g<=n;g++){const f=[],_=g/n;let w=0;g==0&&o==0?w=.5/t:g==n&&l==Math.PI&&(w=-.5/t);for(let E=0;E<=t;E++){const y=E/t;u.x=-e*Math.cos(i+y*r)*Math.sin(o+_*a),u.y=e*Math.cos(o+_*a),u.z=e*Math.sin(i+y*r)*Math.sin(o+_*a),m.push(u.x,u.y,u.z),d.copy(u).normalize(),x.push(d.x,d.y,d.z),v.push(y+w,1-_),f.push(c++)}h.push(f)}for(let g=0;g<n;g++)for(let f=0;f<t;f++){const _=h[g][f+1],w=h[g][f],E=h[g+1][f],y=h[g+1][f+1];(g!==0||o>0)&&p.push(_,w,y),(g!==n-1||l<Math.PI)&&p.push(w,E,y)}this.setIndex(p),this.setAttribute("position",new Je(m,3)),this.setAttribute("normal",new Je(x,3)),this.setAttribute("uv",new Je(v,2))}}class Rv extends ht{constructor(e){super(),this.type="ShadowMaterial",this.color=new le(0),this.transparent=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this}}Rv.prototype.isShadowMaterial=!0;class Pv extends vt{constructor(e){super(e),this.type="RawShaderMaterial"}}Pv.prototype.isRawShaderMaterial=!0;class En extends ht{constructor(e){super(),this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new le(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new le(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=gi,this.normalScale=new Q(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.flatShading=!1,this.vertexTangents=!1,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.morphNormals=e.morphNormals,this.flatShading=e.flatShading,this.vertexTangents=e.vertexTangents,this}}En.prototype.isMeshStandardMaterial=!0;class Uo extends En{constructor(e){super(),this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.clearcoat=0,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Q(1,1),this.clearcoatNormalMap=null,this.reflectivity=.5,Object.defineProperty(this,"ior",{get:function(){return(1+.4*this.reflectivity)/(1-.4*this.reflectivity)},set:function(t){this.reflectivity=Dt(2.5*(t-1)/(t+1),0,1)}}),this.sheen=null,this.transmission=0,this.transmissionMap=null,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.reflectivity=e.reflectivity,e.sheen?this.sheen=(this.sheen||new le).copy(e.sheen):this.sheen=null,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this}}Uo.prototype.isMeshPhysicalMaterial=!0;class Iv extends ht{constructor(e){super(),this.type="MeshPhongMaterial",this.color=new le(16777215),this.specular=new le(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new le(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=gi,this.normalScale=new Q(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Po,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.morphNormals=e.morphNormals,this.flatShading=e.flatShading,this}}Iv.prototype.isMeshPhongMaterial=!0;class Dv extends ht{constructor(e){super(),this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new le(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new le(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=gi,this.normalScale=new Q(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.morphNormals=e.morphNormals,this}}Dv.prototype.isMeshToonMaterial=!0;class Nv extends ht{constructor(e){super(),this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=gi,this.normalScale=new Q(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.morphNormals=e.morphNormals,this.flatShading=e.flatShading,this}}Nv.prototype.isMeshNormalMaterial=!0;class Fv extends ht{constructor(e){super(),this.type="MeshLambertMaterial",this.color=new le(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new le(0),this.emissiveIntensity=1,this.emissiveMap=null,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Po,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.morphNormals=e.morphNormals,this}}Fv.prototype.isMeshLambertMaterial=!0;class Bv extends ht{constructor(e){super(),this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new le(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=gi,this.normalScale=new Q(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.defines={MATCAP:""},this.color.copy(e.color),this.matcap=e.matcap,this.map=e.map,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.morphNormals=e.morphNormals,this.flatShading=e.flatShading,this}}Bv.prototype.isMeshMatcapMaterial=!0;class zv extends us{constructor(e){super(),this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}zv.prototype.isLineDashedMaterial=!0;const et={arraySlice:function(s,e,t){return et.isTypedArray(s)?new s.constructor(s.subarray(e,t!==void 0?t:s.length)):s.slice(e,t)},convertArray:function(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)},isTypedArray:function(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)},getKeyframeOrder:function(s){function e(i,r){return s[i]-s[r]}const t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n},sortedArray:function(s,e,t){const n=s.length,i=new s.constructor(n);for(let r=0,o=0;o!==n;++r){const a=t[r]*e;for(let l=0;l!==e;++l)i[o++]=s[a+l]}return i},flattenJSON:function(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push.apply(t,o)),r=s[i++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=s[i++];while(r!==void 0)},subclip:function(s,e,t,n,i=30){const r=s.clone();r.name=e;const o=[];for(let l=0;l<r.tracks.length;++l){const c=r.tracks[l],h=c.getValueSize(),u=[],d=[];for(let p=0;p<c.times.length;++p){const m=c.times[p]*i;if(!(m<t||m>=n)){u.push(c.times[p]);for(let x=0;x<h;++x)d.push(c.values[p*h+x])}}u.length!==0&&(c.times=et.convertArray(u,c.times.constructor),c.values=et.convertArray(d,c.values.constructor),o.push(c))}r.tracks=o;let a=1/0;for(let l=0;l<r.tracks.length;++l)a>r.tracks[l].times[0]&&(a=r.tracks[l].times[0]);for(let l=0;l<r.tracks.length;++l)r.tracks[l].shift(-1*a);return r.resetDuration(),r},makeClipAdditive:function(s,e=0,t=s,n=30){n<=0&&(n=30);const i=t.tracks.length,r=e/n;for(let o=0;o<i;++o){const a=t.tracks[o],l=a.ValueTypeName;if(l==="bool"||l==="string")continue;const c=s.tracks.find(function(g){return g.name===a.name&&g.ValueTypeName===l});if(c===void 0)continue;let h=0;const u=a.getValueSize();a.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(h=u/3);let d=0;const p=c.getValueSize();c.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(d=p/3);const m=a.times.length-1;let x;if(r<=a.times[0]){const g=h,f=u-h;x=et.arraySlice(a.values,g,f)}else if(r>=a.times[m]){const g=m*u+h,f=g+u-h;x=et.arraySlice(a.values,g,f)}else{const g=a.createInterpolant(),f=h,_=u-h;g.evaluate(r),x=et.arraySlice(g.resultBuffer,f,_)}l==="quaternion"&&new Lt().fromArray(x).normalize().conjugate().toArray(x);const v=c.times.length;for(let g=0;g<v;++g){const f=g*p+d;if(l==="quaternion")Lt.multiplyQuaternionsFlat(c.values,f,x,0,c.values,f);else{const _=p-d*2;for(let w=0;w<_;++w)c.values[f+w]-=x[w]}}}return s.blendMode=$h,s}};class Sn{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],r=t[n-1];e:{t:{let o;n:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.afterEnd_(n-1,e,r)}if(n===a)break;if(r=i,i=t[++n],e<i)break t}o=t.length;break n}if(!(e>=r)){const a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.beforeStart_(0,e,i);if(n===l)break;if(i=r,r=t[--n-1],e>=r)break t}o=n,n=0;break n}break e}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.beforeStart_(0,e,i);if(i===void 0)return n=t.length,this._cachedIndex=n,this.afterEnd_(n-1,r,e)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let o=0;o!==i;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}Sn.prototype.beforeStart_=Sn.prototype.copySampleValue_;Sn.prototype.afterEnd_=Sn.prototype.copySampleValue_;class Ov extends Sn{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Gi,endingEnd:Gi}}intervalChanged_(e,t,n){const i=this.parameterPositions;let r=e-2,o=e+1,a=i[r],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case ki:r=e,a=2*t-n;break;case To:r=i.length-2,a=t+i[r]-i[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case ki:o=e,l=2*n-t;break;case To:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}const c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,p=this._weightNext,m=(n-t)/(i-t),x=m*m,v=x*m,g=-d*v+2*d*x-d*m,f=(1+d)*v+(-1.5-2*d)*x+(-.5+d)*m+1,_=(-1-p)*v+(1.5+p)*x+.5*m,w=p*v-p*x;for(let E=0;E!==a;++E)r[E]=g*o[h+E]+f*o[c+E]+_*o[l+E]+w*o[u+E];return r}}class Pu extends Sn{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==a;++d)r[d]=o[c+d]*u+o[l+d]*h;return r}}class Uv extends Sn{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class hn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=et.convertArray(t,this.TimeBufferType),this.values=et.convertArray(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:et.convertArray(e.times,Array),values:et.convertArray(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Uv(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Pu(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Ov(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case er:t=this.InterpolantFactoryMethodDiscrete;break;case $i:t=this.InterpolantFactoryMethodLinear;break;case ra:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return er;case this.InterpolantFactoryMethodLinear:return $i;case this.InterpolantFactoryMethodSmooth:return ra}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let r=0,o=i-1;for(;r!==i&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=et.arraySlice(n,r,o),this.values=et.arraySlice(this.values,r*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&et.isTypedArray(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=et.arraySlice(this.times),t=et.arraySlice(this.values),n=this.getValueSize(),i=this.getInterpolation()===ra,r=e.length-1;let o=1;for(let a=1;a<r;++a){let l=!1;const c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(i)l=!0;else{const u=a*n,d=u-n,p=u+n;for(let m=0;m!==n;++m){const x=t[u+m];if(x!==t[d+m]||x!==t[p+m]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const u=a*n,d=o*n;for(let p=0;p!==n;++p)t[d+p]=t[u+p]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=et.arraySlice(e,0,o),this.values=et.arraySlice(t,0,o*n)):(this.times=e,this.values=t),this}clone(){const e=et.arraySlice(this.times,0),t=et.arraySlice(this.values,0),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}hn.prototype.TimeBufferType=Float32Array;hn.prototype.ValueBufferType=Float32Array;hn.prototype.DefaultInterpolation=$i;class fs extends hn{}fs.prototype.ValueTypeName="bool";fs.prototype.ValueBufferType=Array;fs.prototype.DefaultInterpolation=er;fs.prototype.InterpolantFactoryMethodLinear=void 0;fs.prototype.InterpolantFactoryMethodSmooth=void 0;class Iu extends hn{}Iu.prototype.ValueTypeName="color";class ar extends hn{}ar.prototype.ValueTypeName="number";class Hv extends Sn{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t);let c=e*a;for(let h=c+a;c!==h;c+=4)Lt.slerpFlat(r,0,o,c-a,o,c,l);return r}}class ps extends hn{InterpolantFactoryMethodLinear(e){return new Hv(this.times,this.values,this.getValueSize(),e)}}ps.prototype.ValueTypeName="quaternion";ps.prototype.DefaultInterpolation=$i;ps.prototype.InterpolantFactoryMethodSmooth=void 0;class ms extends hn{}ms.prototype.ValueTypeName="string";ms.prototype.ValueBufferType=Array;ms.prototype.DefaultInterpolation=er;ms.prototype.InterpolantFactoryMethodLinear=void 0;ms.prototype.InterpolantFactoryMethodSmooth=void 0;class lr extends hn{}lr.prototype.ValueTypeName="vector";class el{constructor(e,t=-1,n,i=xl){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Vt(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(kv(n[o]).scale(i));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=n.length;r!==o;++r)t.push(hn.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const r=t.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);const h=et.getKeyframeOrder(l);l=et.sortedArray(l,1,h),c=et.sortedArray(c,1,h),!i&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new ar(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],h=c.name.match(r);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,p,m,x){if(p.length!==0){const v=[],g=[];et.flattenJSON(p,v,g,m),v.length!==0&&x.push(new u(d,v,g))}},i=[],r=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const p={};let m;for(m=0;m<d.length;m++)if(d[m].morphTargets)for(let x=0;x<d[m].morphTargets.length;x++)p[d[m].morphTargets[x]]=-1;for(const x in p){const v=[],g=[];for(let f=0;f!==d[m].morphTargets.length;++f){const _=d[m];v.push(_.time),g.push(_.morphTarget===x?1:0)}i.push(new ar(".morphTargetInfluence["+x+"]",v,g))}l=p.length*o}else{const p=".bones["+t[u].name+"]";n(lr,p+".position",d,"pos",i),n(ps,p+".quaternion",d,"rot",i),n(lr,p+".scale",d,"scl",i)}}return i.length===0?null:new this(r,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function Gv(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ar;case"vector":case"vector2":case"vector3":case"vector4":return lr;case"color":return Iu;case"quaternion":return ps;case"bool":case"boolean":return fs;case"string":return ms}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function kv(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Gv(s.type);if(s.times===void 0){const t=[],n=[];et.flattenJSON(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}const ns={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class Vv{constructor(e,t,n){const i=this;let r=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const p=c[u],m=c[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return m}return null}}}const Wv=new Vv;class An{constructor(e){this.manager=e!==void 0?e:Wv,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}const Jt={};class Ll extends An{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=ns.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;if(Jt[e]!==void 0){Jt[e].push({onLoad:t,onProgress:n,onError:i});return}const a=/^data:(.*?)(;base64)?,(.*)$/,l=e.match(a);let c;if(l){const h=l[1],u=!!l[2];let d=l[3];d=decodeURIComponent(d),u&&(d=atob(d));try{let p;const m=(this.responseType||"").toLowerCase();switch(m){case"arraybuffer":case"blob":const x=new Uint8Array(d.length);for(let g=0;g<d.length;g++)x[g]=d.charCodeAt(g);m==="blob"?p=new Blob([x.buffer],{type:h}):p=x.buffer;break;case"document":p=new DOMParser().parseFromString(d,h);break;case"json":p=JSON.parse(d);break;default:p=d;break}setTimeout(function(){t&&t(p),r.manager.itemEnd(e)},0)}catch(p){setTimeout(function(){i&&i(p),r.manager.itemError(e),r.manager.itemEnd(e)},0)}}else{Jt[e]=[],Jt[e].push({onLoad:t,onProgress:n,onError:i}),c=new XMLHttpRequest,c.open("GET",e,!0),c.addEventListener("load",function(h){const u=this.response,d=Jt[e];if(delete Jt[e],this.status===200||this.status===0){this.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),ns.add(e,u);for(let p=0,m=d.length;p<m;p++){const x=d[p];x.onLoad&&x.onLoad(u)}r.manager.itemEnd(e)}else{for(let p=0,m=d.length;p<m;p++){const x=d[p];x.onError&&x.onError(h)}r.manager.itemError(e),r.manager.itemEnd(e)}},!1),c.addEventListener("progress",function(h){const u=Jt[e];for(let d=0,p=u.length;d<p;d++){const m=u[d];m.onProgress&&m.onProgress(h)}},!1),c.addEventListener("error",function(h){const u=Jt[e];delete Jt[e];for(let d=0,p=u.length;d<p;d++){const m=u[d];m.onError&&m.onError(h)}r.manager.itemError(e),r.manager.itemEnd(e)},!1),c.addEventListener("abort",function(h){const u=Jt[e];delete Jt[e];for(let d=0,p=u.length;d<p;d++){const m=u[d];m.onError&&m.onError(h)}r.manager.itemError(e),r.manager.itemEnd(e)},!1),this.responseType!==void 0&&(c.responseType=this.responseType),this.withCredentials!==void 0&&(c.withCredentials=this.withCredentials),c.overrideMimeType&&c.overrideMimeType(this.mimeType!==void 0?this.mimeType:"text/plain");for(const h in this.requestHeader)c.setRequestHeader(h,this.requestHeader[h]);c.send(null)}return r.manager.itemStart(e),c}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class Du extends An{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=ns.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;const a=document.createElementNS("http://www.w3.org/1999/xhtml","img");function l(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1),ns.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(h){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1),i&&i(h),r.manager.itemError(e),r.manager.itemEnd(e)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.substr(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}}class Xv extends An{constructor(e){super(e)}load(e,t,n,i){const r=new Io,o=new Du(this.manager);o.setCrossOrigin(this.crossOrigin),o.setPath(this.path);let a=0;function l(c){o.load(e[c],function(h){r.images[c]=h,a++,a===6&&(r.needsUpdate=!0,t&&t(r))},void 0,i)}for(let c=0;c<e.length;++c)l(c);return r}}class Cl extends An{constructor(e){super(e)}load(e,t,n,i){const r=new xt,o=new Du(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a;const l=e.search(/\.jpe?g($|\?)/i)>0||e.search(/^data\:image\/jpeg/)===0;r.format=l?qn:$t,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}}class Wt{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let i=0;const r=n.length;let o;t?o=t:o=e*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(r-1);const h=n[i],d=n[i+1]-h,p=(o-h)/d;return(i+p)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);const o=this.getPoint(i),a=this.getPoint(r),l=t||(o.isVector2?new Q:new T);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new T,i=[],r=[],o=[],a=new T,l=new ue;for(let p=0;p<=e;p++){const m=p/e;i[p]=this.getTangentAt(m,new T),i[p].normalize()}r[0]=new T,o[0]=new T;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let p=1;p<=e;p++){if(r[p]=r[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(i[p-1],i[p]),a.length()>Number.EPSILON){a.normalize();const m=Math.acos(Dt(i[p-1].dot(i[p]),-1,1));r[p].applyMatrix4(l.makeRotationAxis(a,m))}o[p].crossVectors(i[p],r[p])}if(t===!0){let p=Math.acos(Dt(r[0].dot(r[e]),-1,1));p/=e,i[0].dot(a.crossVectors(r[0],r[e]))>0&&(p=-p);for(let m=1;m<=e;m++)r[m].applyMatrix4(l.makeRotationAxis(i[m],p*m)),o[m].crossVectors(i[m],r[m])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.5,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Ho extends Wt{constructor(e=0,t=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t){const n=t||new Q,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);const a=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,p=c-this.aY;l=d*h-p*u+this.aX,c=d*u+p*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}Ho.prototype.isEllipseCurve=!0;class Nu extends Ho{constructor(e,t,n,i,r,o){super(e,t,n,n,i,r,o),this.type="ArcCurve"}}Nu.prototype.isArcCurve=!0;function Rl(){let s=0,e=0,t=0,n=0;function i(r,o,a,l){s=r,e=a,t=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){i(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,p=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,p*=h,i(o,a,d,p)},calc:function(r){const o=r*r,a=o*r;return s+e*r+t*o+n*a}}}const Qr=new T,Na=new Rl,Fa=new Rl,Ba=new Rl;class Fu extends Wt{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new T){const n=t,i=this.points,r=i.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%r]:(Qr.subVectors(i[0],i[1]).add(i[0]),c=Qr);const u=i[a%r],d=i[(a+1)%r];if(this.closed||a+2<r?h=i[(a+2)%r]:(Qr.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Qr),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let m=Math.pow(c.distanceToSquared(u),p),x=Math.pow(u.distanceToSquared(d),p),v=Math.pow(d.distanceToSquared(h),p);x<1e-4&&(x=1),m<1e-4&&(m=x),v<1e-4&&(v=x),Na.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,m,x,v),Fa.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,m,x,v),Ba.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,m,x,v)}else this.curveType==="catmullrom"&&(Na.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),Fa.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Ba.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(Na.calc(l),Fa.calc(l),Ba.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new T().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}Fu.prototype.isCatmullRomCurve3=!0;function mh(s,e,t,n,i){const r=(n-e)*.5,o=(i-t)*.5,a=s*s,l=s*a;return(2*t-2*n+r+o)*l+(-3*t+3*n-2*r-o)*a+r*s+t}function qv(s,e){const t=1-s;return t*t*e}function Yv(s,e){return 2*(1-s)*s*e}function jv(s,e){return s*s*e}function Ys(s,e,t,n){return qv(s,e)+Yv(s,t)+jv(s,n)}function Zv(s,e){const t=1-s;return t*t*t*e}function Jv(s,e){const t=1-s;return 3*t*t*s*e}function Kv(s,e){return 3*(1-s)*s*s*e}function Qv(s,e){return s*s*s*e}function js(s,e,t,n,i){return Zv(s,e)+Jv(s,t)+Kv(s,n)+Qv(s,i)}class Pl extends Wt{constructor(e=new Q,t=new Q,n=new Q,i=new Q){super(),this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new Q){const n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(js(e,i.x,r.x,o.x,a.x),js(e,i.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}Pl.prototype.isCubicBezierCurve=!0;class Bu extends Wt{constructor(e=new T,t=new T,n=new T,i=new T){super(),this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new T){const n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(js(e,i.x,r.x,o.x,a.x),js(e,i.y,r.y,o.y,a.y),js(e,i.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}Bu.prototype.isCubicBezierCurve3=!0;class Go extends Wt{constructor(e=new Q,t=new Q){super(),this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Q){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t){const n=t||new Q;return n.copy(this.v2).sub(this.v1).normalize(),n}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}Go.prototype.isLineCurve=!0;class $v extends Wt{constructor(e=new T,t=new T){super(),this.type="LineCurve3",this.isLineCurve3=!0,this.v1=e,this.v2=t}getPoint(e,t=new T){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Il extends Wt{constructor(e=new Q,t=new Q,n=new Q){super(),this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new Q){const n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(Ys(e,i.x,r.x,o.x),Ys(e,i.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}Il.prototype.isQuadraticBezierCurve=!0;class zu extends Wt{constructor(e=new T,t=new T,n=new T){super(),this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new T){const n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(Ys(e,i.x,r.x,o.x),Ys(e,i.y,r.y,o.y),Ys(e,i.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}zu.prototype.isQuadraticBezierCurve3=!0;class Dl extends Wt{constructor(e=[]){super(),this.type="SplineCurve",this.points=e}getPoint(e,t=new Q){const n=t,i=this.points,r=(i.length-1)*e,o=Math.floor(r),a=r-o,l=i[o===0?o:o-1],c=i[o],h=i[o>i.length-2?i.length-1:o+1],u=i[o>i.length-3?i.length-1:o+2];return n.set(mh(a,l.x,c.x,h.x,u.x),mh(a,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new Q().fromArray(i))}return this}}Dl.prototype.isSplineCurve=!0;var ey=Object.freeze({__proto__:null,ArcCurve:Nu,CatmullRomCurve3:Fu,CubicBezierCurve:Pl,CubicBezierCurve3:Bu,EllipseCurve:Ho,LineCurve:Go,LineCurve3:$v,QuadraticBezierCurve:Il,QuadraticBezierCurve3:zu,SplineCurve:Dl});class ty extends Wt{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);e.equals(t)||this.curves.push(new Go(t,e))}getPoint(e){const t=e*this.getLength(),n=this.getCurveLengths();let i=0;for(;i<n.length;){if(n[i]>=t){const r=n[i]-t,o=this.curves[i],a=o.getLength(),l=a===0?0:1-r/a;return o.getPointAt(l)}i++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const o=r[i],a=o&&o.isEllipseCurve?e*2:o&&(o.isLineCurve||o.isLineCurve3)?1:o&&o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new ey[i.type]().fromJSON(i))}return this}}class tl extends ty{constructor(e){super(),this.type="Path",this.currentPoint=new Q,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Go(this.currentPoint.clone(),new Q(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const r=new Il(this.currentPoint.clone(),new Q(e,t),new Q(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,o){const a=new Pl(this.currentPoint.clone(),new Q(e,t),new Q(n,i),new Q(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Dl(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,i,r,o),this}absarc(e,t,n,i,r,o){return this.absellipse(e,t,n,n,i,r,o),this}ellipse(e,t,n,i,r,o,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,i,r,o,a,l),this}absellipse(e,t,n,i,r,o,a,l){const c=new Ho(e,t,n,i,r,o,a,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Nl extends tl{constructor(e){super(e),this.uuid=Vt(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(new tl().fromJSON(i))}return this}}class on extends ke{constructor(e,t=1){super(),this.type="Light",this.color=new le(e),this.intensity=t}dispose(){}copy(e){return super.copy(e),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}on.prototype.isLight=!0;class Ou extends on{constructor(e,t,n){super(e,n),this.type="HemisphereLight",this.position.copy(ke.DefaultUp),this.updateMatrix(),this.groundColor=new le(t)}copy(e){return on.prototype.copy.call(this,e),this.groundColor.copy(e.groundColor),this}}Ou.prototype.isHemisphereLight=!0;const gh=new ue,xh=new T,vh=new T;class Fl{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.mapSize=new Q(512,512),this.map=null,this.mapPass=null,this.matrix=new ue,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Do,this._frameExtents=new Q(1,1),this._viewportCount=1,this._viewports=[new qe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;xh.setFromMatrixPosition(e.matrixWorld),t.position.copy(xh),vh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(vh),t.updateMatrixWorld(),gh.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(gh),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(t.projectionMatrix),n.multiply(t.matrixWorldInverse)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Uu extends Fl{constructor(){super(new At(50,1,.5,500)),this.focus=1}updateMatrices(e){const t=this.camera,n=ir*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}Uu.prototype.isSpotLightShadow=!0;class Hu extends on{constructor(e,t,n=0,i=Math.PI/3,r=0,o=1){super(e,t),this.type="SpotLight",this.position.copy(ke.DefaultUp),this.updateMatrix(),this.target=new ke,this.distance=n,this.angle=i,this.penumbra=r,this.decay=o,this.shadow=new Uu}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}Hu.prototype.isSpotLight=!0;const yh=new ue,Ps=new T,za=new T;class Gu extends Fl{constructor(){super(new At(90,1,.5,500)),this._frameExtents=new Q(4,2),this._viewportCount=6,this._viewports=[new qe(2,1,1,1),new qe(0,1,1,1),new qe(3,1,1,1),new qe(1,1,1,1),new qe(3,0,1,1),new qe(1,0,1,1)],this._cubeDirections=[new T(1,0,0),new T(-1,0,0),new T(0,0,1),new T(0,0,-1),new T(0,1,0),new T(0,-1,0)],this._cubeUps=[new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,0,1),new T(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Ps.setFromMatrixPosition(e.matrixWorld),n.position.copy(Ps),za.copy(n.position),za.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(za),n.updateMatrixWorld(),i.makeTranslation(-Ps.x,-Ps.y,-Ps.z),yh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(yh)}}Gu.prototype.isPointLightShadow=!0;class ko extends on{constructor(e,t,n=0,i=1){super(e,t),this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Gu}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}ko.prototype.isPointLight=!0;class Bl extends _l{constructor(e=-1,t=1,n=1,i=-1,r=.1,o=2e3){super(),this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}Bl.prototype.isOrthographicCamera=!0;class ku extends Fl{constructor(){super(new Bl(-5,5,5,-5,.5,500))}}ku.prototype.isDirectionalLightShadow=!0;class gs extends on{constructor(e,t){super(e,t),this.type="DirectionalLight",this.position.copy(ke.DefaultUp),this.updateMatrix(),this.target=new ke,this.shadow=new ku}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}gs.prototype.isDirectionalLight=!0;class Vu extends on{constructor(e,t){super(e,t),this.type="AmbientLight"}}Vu.prototype.isAmbientLight=!0;class ny extends on{constructor(e,t,n=10,i=10){super(e,t),this.type="RectAreaLight",this.width=n,this.height=i}copy(e){return super.copy(e),this.width=e.width,this.height=e.height,this}toJSON(e){const t=super.toJSON(e);return t.object.width=this.width,t.object.height=this.height,t}}ny.prototype.isRectAreaLight=!0;class Wu{constructor(){this.coefficients=[];for(let e=0;e<9;e++)this.coefficients.push(new T)}set(e){for(let t=0;t<9;t++)this.coefficients[t].copy(e[t]);return this}zero(){for(let e=0;e<9;e++)this.coefficients[e].set(0,0,0);return this}getAt(e,t){const n=e.x,i=e.y,r=e.z,o=this.coefficients;return t.copy(o[0]).multiplyScalar(.282095),t.addScaledVector(o[1],.488603*i),t.addScaledVector(o[2],.488603*r),t.addScaledVector(o[3],.488603*n),t.addScaledVector(o[4],1.092548*(n*i)),t.addScaledVector(o[5],1.092548*(i*r)),t.addScaledVector(o[6],.315392*(3*r*r-1)),t.addScaledVector(o[7],1.092548*(n*r)),t.addScaledVector(o[8],.546274*(n*n-i*i)),t}getIrradianceAt(e,t){const n=e.x,i=e.y,r=e.z,o=this.coefficients;return t.copy(o[0]).multiplyScalar(.886227),t.addScaledVector(o[1],2*.511664*i),t.addScaledVector(o[2],2*.511664*r),t.addScaledVector(o[3],2*.511664*n),t.addScaledVector(o[4],2*.429043*n*i),t.addScaledVector(o[5],2*.429043*i*r),t.addScaledVector(o[6],.743125*r*r-.247708),t.addScaledVector(o[7],2*.429043*n*r),t.addScaledVector(o[8],.429043*(n*n-i*i)),t}add(e){for(let t=0;t<9;t++)this.coefficients[t].add(e.coefficients[t]);return this}addScaledSH(e,t){for(let n=0;n<9;n++)this.coefficients[n].addScaledVector(e.coefficients[n],t);return this}scale(e){for(let t=0;t<9;t++)this.coefficients[t].multiplyScalar(e);return this}lerp(e,t){for(let n=0;n<9;n++)this.coefficients[n].lerp(e.coefficients[n],t);return this}equals(e){for(let t=0;t<9;t++)if(!this.coefficients[t].equals(e.coefficients[t]))return!1;return!0}copy(e){return this.set(e.coefficients)}clone(){return new this.constructor().copy(this)}fromArray(e,t=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].fromArray(e,t+i*3);return this}toArray(e=[],t=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].toArray(e,t+i*3);return e}static getBasisAt(e,t){const n=e.x,i=e.y,r=e.z;t[0]=.282095,t[1]=.488603*i,t[2]=.488603*r,t[3]=.488603*n,t[4]=1.092548*n*i,t[5]=1.092548*i*r,t[6]=.315392*(3*r*r-1),t[7]=1.092548*n*r,t[8]=.546274*(n*n-i*i)}}Wu.prototype.isSphericalHarmonics3=!0;class zl extends on{constructor(e=new Wu,t=1){super(void 0,t),this.sh=e}copy(e){return super.copy(e),this.sh.copy(e.sh),this}fromJSON(e){return this.intensity=e.intensity,this.sh.fromArray(e.sh),this}toJSON(e){const t=super.toJSON(e);return t.object.sh=this.sh.toArray(),t}}zl.prototype.isLightProbe=!0;class ji{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.substr(0,t+1)}}class iy extends Be{constructor(){super(),this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}clone(){return new this.constructor().copy(this)}toJSON(){const e=super.toJSON(this);return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}iy.prototype.isInstancedBufferGeometry=!0;class Vo extends Le{constructor(e,t,n,i){typeof n=="number"&&(i=n,n=!1,console.error("THREE.InstancedBufferAttribute: The constructor now expects normalized as the third argument.")),super(e,t,n),this.meshPerAttribute=i||1}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}Vo.prototype.isInstancedBufferAttribute=!0;class Xu extends An{constructor(e){super(e),typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=ns.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){ns.add(e,l),t&&t(l),r.manager.itemEnd(e)}).catch(function(l){i&&i(l),r.manager.itemError(e),r.manager.itemEnd(e)}),r.manager.itemStart(e)}}Xu.prototype.isImageBitmapLoader=!0;let $r;const sy={getContext:function(){return $r===void 0&&($r=new(window.AudioContext||window.webkitAudioContext)),$r},setContext:function(s){$r=s}};class ry extends An{constructor(e){super(e)}load(e,t,n,i){const r=this,o=new Ll(this.manager);o.setResponseType("arraybuffer"),o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(a){try{const l=a.slice(0);sy.getContext().decodeAudioData(l,function(h){t(h)})}catch(l){i?i(l):console.error(l),r.manager.itemError(e)}},n,i)}}class oy extends zl{constructor(e,t,n=1){super(void 0,n);const i=new le().set(e),r=new le().set(t),o=new T(i.r,i.g,i.b),a=new T(r.r,r.g,r.b),l=Math.sqrt(Math.PI),c=l*Math.sqrt(.75);this.sh.coefficients[0].copy(o).add(a).multiplyScalar(l),this.sh.coefficients[1].copy(o).sub(a).multiplyScalar(c)}}oy.prototype.isHemisphereLightProbe=!0;class ay extends zl{constructor(e,t=1){super(void 0,t);const n=new le().set(e);this.sh.coefficients[0].set(n.r,n.g,n.b).multiplyScalar(2*Math.sqrt(Math.PI))}}ay.prototype.isAmbientLightProbe=!0;class ly{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=_h(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=_h();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function _h(){return(typeof performance>"u"?Date:performance).now()}class cy extends ke{constructor(e){super(),this.type="Audio",this.listener=e,this.context=e.context,this.gain=this.context.createGain(),this.gain.connect(e.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(e){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=e,this.connect(),this}setMediaElementSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(e),this.connect(),this}setMediaStreamSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(e),this.connect(),this}setBuffer(e){return this.buffer=e,this.sourceType="buffer",this.autoplay&&this.play(),this}play(e=0){if(this.isPlaying===!0){console.warn("THREE.Audio: Audio is already playing.");return}if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}this._startedAt=this.context.currentTime+e;const t=this.context.createBufferSource();return t.buffer=this.buffer,t.loop=this.loop,t.loopStart=this.loopStart,t.loopEnd=this.loopEnd,t.onended=this.onEnded.bind(this),t.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=t,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.isPlaying===!0&&(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,this.loop===!0&&(this._progress=this._progress%(this.duration||this.buffer.duration)),this.source.stop(),this.source.onended=null,this.isPlaying=!1),this}stop(){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this._progress=0,this.source.stop(),this.source.onended=null,this.isPlaying=!1,this}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].connect(this.filters[e]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].disconnect(this.filters[e]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}getFilters(){return this.filters}setFilters(e){return e||(e=[]),this._connected===!0?(this.disconnect(),this.filters=e.slice(),this.connect()):this.filters=e.slice(),this}setDetune(e){if(this.detune=e,this.source.detune!==void 0)return this.isPlaying===!0&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(e){return this.setFilters(e?[e]:[])}setPlaybackRate(e){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.playbackRate=e,this.isPlaying===!0&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1}getLoop(){return this.hasPlaybackControl===!1?(console.warn("THREE.Audio: this Audio has no playback control."),!1):this.loop}setLoop(e){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.loop=e,this.isPlaying===!0&&(this.source.loop=this.loop),this}setLoopStart(e){return this.loopStart=e,this}setLoopEnd(e){return this.loopEnd=e,this}getVolume(){return this.gain.gain.value}setVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}}class hy{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,r,o;switch(t){case"quaternion":i=this._slerp,r=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,r=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,r=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=r,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,i=this.valueSize,r=e*i+i;let o=this.cumulativeWeight;if(o===0){for(let a=0;a!==i;++a)n[r+a]=n[a];o=t}else{o+=t;const a=t/o;this._mixBufferRegion(n,r,0,a,i)}this.cumulativeWeight=o}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,i=e*t+t,r=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){const l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-r,t)}o>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){a.setValue(n,i);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let r=n,o=i;r!==o;++r)t[r]=t[i+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,r){if(i>=.5)for(let o=0;o!==r;++o)e[t+o]=e[n+o]}_slerp(e,t,n,i){Lt.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,r){const o=this._workIndex*r;Lt.multiplyQuaternionsFlat(e,o,e,t,e,n),Lt.slerpFlat(e,t,e,t,e,o,i)}_lerp(e,t,n,i,r){const o=1-i;for(let a=0;a!==r;++a){const l=t+a;e[l]=e[l]*o+e[n+a]*i}}_lerpAdditive(e,t,n,i,r){for(let o=0;o!==r;++o){const a=t+o;e[a]=e[a]+e[n+o]*i}}}const Ol="\\[\\]\\.:\\/",uy=new RegExp("["+Ol+"]","g"),Ul="[^"+Ol+"]",dy="[^"+Ol.replace("\\.","")+"]",fy=/((?:WC+[\/:])*)/.source.replace("WC",Ul),py=/(WCOD+)?/.source.replace("WCOD",dy),my=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ul),gy=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ul),xy=new RegExp("^"+fy+py+my+gy+"$"),vy=["material","materials","bones"];class yy{constructor(e,t,n){const i=n||Xe.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Xe{constructor(e,t,n){this.path=t,this.parsedPath=n||Xe.parseTrackName(t),this.node=Xe.findNode(e,this.parsedPath.nodeName)||e,this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Xe.Composite(e,t,n):new Xe(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(uy,"")}static parseTrackName(e){const t=xy.exec(e);if(!t)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);vy.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(!t||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.node[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let r=t.propertyIndex;if(e||(e=Xe.findNode(this.rootNode,t.nodeName)||this.rootNode,this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.error("THREE.PropertyBinding: Trying to update node for track: "+this.path+" but it wasn't found.");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[i];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(e.geometry.isBufferGeometry){if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}else{console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences on THREE.Geometry. Use THREE.BufferGeometry instead.",this);return}}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Xe.Composite=yy;Xe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Xe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Xe.prototype.GetterByBindingType=[Xe.prototype._getValue_direct,Xe.prototype._getValue_array,Xe.prototype._getValue_arrayElement,Xe.prototype._getValue_toArray];Xe.prototype.SetterByBindingTypeAndVersioning=[[Xe.prototype._setValue_direct,Xe.prototype._setValue_direct_setNeedsUpdate,Xe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Xe.prototype._setValue_array,Xe.prototype._setValue_array_setNeedsUpdate,Xe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Xe.prototype._setValue_arrayElement,Xe.prototype._setValue_arrayElement_setNeedsUpdate,Xe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Xe.prototype._setValue_fromArray,Xe.prototype._setValue_fromArray_setNeedsUpdate,Xe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class _y{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;const r=t.tracks,o=r.length,a=new Array(o),l={endingStart:Gi,endingEnd:Gi};for(let c=0;c!==o;++c){const h=r[c].createInterpolant(null);a[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=ip,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){const i=this._clip.duration,r=e._clip.duration,o=r/i,a=i/r;e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const i=this._mixer,r=i.time,o=this.timeScale;let a=this._timeScaleInterpolant;a===null&&(a=i._lendControlInterpolant(),this._timeScaleInterpolant=a);const l=a.parameterPositions,c=a.sampleValues;return l[0]=r,l[1]=r+n,c[0]=e/o,c[1]=t/o,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}const r=this._startTime;if(r!==null){const l=(e-r)*n;if(l<0||n===0)return;this._startTime=null,t=n*l}t*=this._updateTimeScale(e);const o=this._updateTime(t),a=this._updateWeight(e);if(a>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case $h:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulateAdditive(a);break;case xl:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulate(i,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let i=this.time+e,r=this._loopCount;const o=n===sp;if(e===0)return r===-1?i:o&&(r&1)===1?t-i:i;if(n===np){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),i>=t||i<0){const a=Math.floor(i/t);i-=t*a,r+=Math.abs(a);const l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){const c=e<0;this._setEndings(c,!c,o)}else this._setEndings(!1,!1,o);this._loopCount=r,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=i;if(o&&(r&1)===1)return t-i}return i}_setEndings(e,t,n){const i=this._interpolantSettings;n?(i.endingStart=ki,i.endingEnd=ki):(e?i.endingStart=this.zeroSlopeAtStart?ki:Gi:i.endingStart=To,t?i.endingEnd=this.zeroSlopeAtEnd?ki:Gi:i.endingEnd=To)}_scheduleFading(e,t,n){const i=this._mixer,r=i.time;let o=this._weightInterpolant;o===null&&(o=i._lendControlInterpolant(),this._weightInterpolant=o);const a=o.parameterPositions,l=o.sampleValues;return a[0]=r,l[0]=t,a[1]=r+e,l[1]=n,this}}class My extends xi{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,r=i.length,o=e._propertyBindings,a=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==r;++u){const d=i[u],p=d.name;let m=h[p];if(m!==void 0)o[u]=m;else{if(m=o[u],m!==void 0){m._cacheIndex===null&&(++m.referenceCount,this._addInactiveBinding(m,l,p));continue}const x=t&&t._propertyBindings[u].binding.parsedPath;m=new hy(Xe.create(n,p,x),d.ValueTypeName,d.getValueSize()),++m.referenceCount,this._addInactiveBinding(m,l,p),o[u]=m}a[u].resultBuffer=m.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,r=this._actionsByClip[i];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const i=this._actions,r=this._actionsByClip;let o=r[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=o;else{const a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=i.length,i.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const r=e._clip.uuid,o=this._actionsByClip,a=o[r],l=a.knownActions,c=l[l.length-1],h=e._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),e._byClipCacheIndex=null;const u=a.actionByRoot,d=(e._localRoot||this._root).uuid;delete u[d],l.length===0&&delete o[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){const i=this._bindingsByRootAndName,r=this._bindings;let o=i[t];o===void 0&&(o={},i[t]=o),o[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,r=n.path,o=this._bindingsByRootAndName,a=o[i],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete a[r],Object.keys(a).length===0&&delete o[i]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new Pu(new Float32Array(2),new Float32Array(2),1,this._controlInterpolantsResultBuffer),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,r=t[i];e.__cacheIndex=i,t[i]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){const i=t||this._root,r=i.uuid;let o=typeof e=="string"?el.findByName(i,e):e;const a=o!==null?o.uuid:e,l=this._actionsByClip[a];let c=null;if(n===void 0&&(o!==null?n=o.blendMode:n=xl),l!==void 0){const u=l.actionByRoot[r];if(u!==void 0&&u.blendMode===n)return u;c=l.knownActions[0],o===null&&(o=c._clip)}if(o===null)return null;const h=new _y(this,o,t,n);return this._bindAction(h,c),this._addInactiveAction(h,a,r),h}existingAction(e,t){const n=t||this._root,i=n.uuid,r=typeof e=="string"?el.findByName(n,e):e,o=r?r.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[i]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,r=Math.sign(e),o=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(i,e,r,o);const a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,r=i[n];if(r!==void 0){const o=r.knownActions;for(let a=0,l=o.length;a!==l;++a){const c=o[a];this._deactivateAction(c);const h=c._cacheIndex,u=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const o in n){const a=n[o].actionByRoot,l=a[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const i=this._bindingsByRootAndName,r=i[t];if(r!==void 0)for(const o in r){const a=r[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}My.prototype._controlInterpolantsResultBuffer=new Float32Array(1);class wy extends Kn{constructor(e,t,n=1){super(e,t),this.meshPerAttribute=n||1}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){const t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){const t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}}wy.prototype.isInstancedInterleavedBuffer=!0;class PM{constructor(e,t,n=0,i=1/0){this.ray=new yi(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new iu,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t&&t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t&&t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!1,n=[]){return nl(e,this,n,t),n.sort(Mh),n}intersectObjects(e,t=!1,n=[]){for(let i=0,r=e.length;i<r;i++)nl(e[i],this,n,t);return n.sort(Mh),n}}function Mh(s,e){return s.distance-e.distance}function nl(s,e,t,n){if(s.layers.test(e.layers)&&s.raycast(e,t),n===!0){const i=s.children;for(let r=0,o=i.length;r<o;r++)nl(i[r],e,t,!0)}}class by extends ke{constructor(e){super(),this.material=e,this.render=function(){},this.hasPositions=!1,this.hasNormals=!1,this.hasColors=!1,this.hasUvs=!1,this.positionArray=null,this.normalArray=null,this.colorArray=null,this.uvArray=null,this.count=0}}by.prototype.isImmediateRenderObject=!0;const Bn=new T,eo=new ue,Oa=new ue;class Sy extends Fo{constructor(e){const t=qu(e),n=new Be,i=[],r=[],o=new le(0,0,1),a=new le(0,1,0);for(let c=0;c<t.length;c++){const h=t[c];h.parent&&h.parent.isBone&&(i.push(0,0,0),i.push(0,0,0),r.push(o.r,o.g,o.b),r.push(a.r,a.g,a.b))}n.setAttribute("position",new Je(i,3)),n.setAttribute("color",new Je(r,3));const l=new us({vertexColors:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,transparent:!0});super(n,l),this.type="SkeletonHelper",this.isSkeletonHelper=!0,this.root=e,this.bones=t,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1}updateMatrixWorld(e){const t=this.bones,n=this.geometry,i=n.getAttribute("position");Oa.copy(this.root.matrixWorld).invert();for(let r=0,o=0;r<t.length;r++){const a=t[r];a.parent&&a.parent.isBone&&(eo.multiplyMatrices(Oa,a.matrixWorld),Bn.setFromMatrixPosition(eo),i.setXYZ(o,Bn.x,Bn.y,Bn.z),eo.multiplyMatrices(Oa,a.parent.matrixWorld),Bn.setFromMatrixPosition(eo),i.setXYZ(o+1,Bn.x,Bn.y,Bn.z),o+=2)}n.getAttribute("position").needsUpdate=!0,super.updateMatrixWorld(e)}}function qu(s){const e=[];s&&s.isBone&&e.push(s);for(let t=0;t<s.children.length;t++)e.push.apply(e,qu(s.children[t]));return e}class Ty extends Fo{constructor(e=10,t=10,n=4473924,i=8947848){n=new le(n),i=new le(i);const r=t/2,o=e/t,a=e/2,l=[],c=[];for(let d=0,p=0,m=-a;d<=t;d++,m+=o){l.push(-a,0,m,a,0,m),l.push(m,0,-a,m,0,a);const x=d===r?n:i;x.toArray(c,p),p+=3,x.toArray(c,p),p+=3,x.toArray(c,p),p+=3,x.toArray(c,p),p+=3}const h=new Be;h.setAttribute("position",new Je(l,3)),h.setAttribute("color",new Je(c,3));const u=new us({vertexColors:!0,toneMapped:!1});super(h,u),this.type="GridHelper"}}const Ey=new Float32Array(1);new Int32Array(Ey.buffer);const Ay=new Ut({side:st,depthWrite:!1,depthTest:!1});new Qe(new yl,Ay);Wt.create=function(s,e){return console.log("THREE.Curve.create() has been deprecated"),s.prototype=Object.create(Wt.prototype),s.prototype.constructor=s,s.prototype.getPoint=e,s};tl.prototype.fromPoints=function(s){return console.warn("THREE.Path: .fromPoints() has been renamed to .setFromPoints()."),this.setFromPoints(s)};Ty.prototype.setColors=function(){console.error("THREE.GridHelper: setColors() has been deprecated, pass them in the constructor instead.")};Sy.prototype.update=function(){console.error("THREE.SkeletonHelper: update() no longer needs to be called.")};An.prototype.extractUrlBase=function(s){return console.warn("THREE.Loader: .extractUrlBase() has been deprecated. Use THREE.LoaderUtils.extractUrlBase() instead."),ji.extractUrlBase(s)};An.Handlers={add:function(){console.error("THREE.Loader: Handlers.add() has been removed. Use LoadingManager.addHandler() instead.")},get:function(){console.error("THREE.Loader: Handlers.get() has been removed. Use LoadingManager.getHandler() instead.")}};Gt.prototype.center=function(s){return console.warn("THREE.Box3: .center() has been renamed to .getCenter()."),this.getCenter(s)};Gt.prototype.empty=function(){return console.warn("THREE.Box3: .empty() has been renamed to .isEmpty()."),this.isEmpty()};Gt.prototype.isIntersectionBox=function(s){return console.warn("THREE.Box3: .isIntersectionBox() has been renamed to .intersectsBox()."),this.intersectsBox(s)};Gt.prototype.isIntersectionSphere=function(s){return console.warn("THREE.Box3: .isIntersectionSphere() has been renamed to .intersectsSphere()."),this.intersectsSphere(s)};Gt.prototype.size=function(s){return console.warn("THREE.Box3: .size() has been renamed to .getSize()."),this.getSize(s)};vi.prototype.empty=function(){return console.warn("THREE.Sphere: .empty() has been renamed to .isEmpty()."),this.isEmpty()};Do.prototype.setFromMatrix=function(s){return console.warn("THREE.Frustum: .setFromMatrix() has been renamed to .setFromProjectionMatrix()."),this.setFromProjectionMatrix(s)};gt.prototype.flattenToArrayOffset=function(s,e){return console.warn("THREE.Matrix3: .flattenToArrayOffset() has been deprecated. Use .toArray() instead."),this.toArray(s,e)};gt.prototype.multiplyVector3=function(s){return console.warn("THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead."),s.applyMatrix3(this)};gt.prototype.multiplyVector3Array=function(){console.error("THREE.Matrix3: .multiplyVector3Array() has been removed.")};gt.prototype.applyToBufferAttribute=function(s){return console.warn("THREE.Matrix3: .applyToBufferAttribute() has been removed. Use attribute.applyMatrix3( matrix ) instead."),s.applyMatrix3(this)};gt.prototype.applyToVector3Array=function(){console.error("THREE.Matrix3: .applyToVector3Array() has been removed.")};gt.prototype.getInverse=function(s){return console.warn("THREE.Matrix3: .getInverse() has been removed. Use matrixInv.copy( matrix ).invert(); instead."),this.copy(s).invert()};ue.prototype.extractPosition=function(s){return console.warn("THREE.Matrix4: .extractPosition() has been renamed to .copyPosition()."),this.copyPosition(s)};ue.prototype.flattenToArrayOffset=function(s,e){return console.warn("THREE.Matrix4: .flattenToArrayOffset() has been deprecated. Use .toArray() instead."),this.toArray(s,e)};ue.prototype.getPosition=function(){return console.warn("THREE.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead."),new T().setFromMatrixColumn(this,3)};ue.prototype.setRotationFromQuaternion=function(s){return console.warn("THREE.Matrix4: .setRotationFromQuaternion() has been renamed to .makeRotationFromQuaternion()."),this.makeRotationFromQuaternion(s)};ue.prototype.multiplyToArray=function(){console.warn("THREE.Matrix4: .multiplyToArray() has been removed.")};ue.prototype.multiplyVector3=function(s){return console.warn("THREE.Matrix4: .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) instead."),s.applyMatrix4(this)};ue.prototype.multiplyVector4=function(s){return console.warn("THREE.Matrix4: .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead."),s.applyMatrix4(this)};ue.prototype.multiplyVector3Array=function(){console.error("THREE.Matrix4: .multiplyVector3Array() has been removed.")};ue.prototype.rotateAxis=function(s){console.warn("THREE.Matrix4: .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead."),s.transformDirection(this)};ue.prototype.crossVector=function(s){return console.warn("THREE.Matrix4: .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead."),s.applyMatrix4(this)};ue.prototype.translate=function(){console.error("THREE.Matrix4: .translate() has been removed.")};ue.prototype.rotateX=function(){console.error("THREE.Matrix4: .rotateX() has been removed.")};ue.prototype.rotateY=function(){console.error("THREE.Matrix4: .rotateY() has been removed.")};ue.prototype.rotateZ=function(){console.error("THREE.Matrix4: .rotateZ() has been removed.")};ue.prototype.rotateByAxis=function(){console.error("THREE.Matrix4: .rotateByAxis() has been removed.")};ue.prototype.applyToBufferAttribute=function(s){return console.warn("THREE.Matrix4: .applyToBufferAttribute() has been removed. Use attribute.applyMatrix4( matrix ) instead."),s.applyMatrix4(this)};ue.prototype.applyToVector3Array=function(){console.error("THREE.Matrix4: .applyToVector3Array() has been removed.")};ue.prototype.makeFrustum=function(s,e,t,n,i,r){return console.warn("THREE.Matrix4: .makeFrustum() has been removed. Use .makePerspective( left, right, top, bottom, near, far ) instead."),this.makePerspective(s,e,n,t,i,r)};ue.prototype.getInverse=function(s){return console.warn("THREE.Matrix4: .getInverse() has been removed. Use matrixInv.copy( matrix ).invert(); instead."),this.copy(s).invert()};kt.prototype.isIntersectionLine=function(s){return console.warn("THREE.Plane: .isIntersectionLine() has been renamed to .intersectsLine()."),this.intersectsLine(s)};Lt.prototype.multiplyVector3=function(s){return console.warn("THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead."),s.applyQuaternion(this)};Lt.prototype.inverse=function(){return console.warn("THREE.Quaternion: .inverse() has been renamed to invert()."),this.invert()};yi.prototype.isIntersectionBox=function(s){return console.warn("THREE.Ray: .isIntersectionBox() has been renamed to .intersectsBox()."),this.intersectsBox(s)};yi.prototype.isIntersectionPlane=function(s){return console.warn("THREE.Ray: .isIntersectionPlane() has been renamed to .intersectsPlane()."),this.intersectsPlane(s)};yi.prototype.isIntersectionSphere=function(s){return console.warn("THREE.Ray: .isIntersectionSphere() has been renamed to .intersectsSphere()."),this.intersectsSphere(s)};ft.prototype.area=function(){return console.warn("THREE.Triangle: .area() has been renamed to .getArea()."),this.getArea()};ft.prototype.barycoordFromPoint=function(s,e){return console.warn("THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord()."),this.getBarycoord(s,e)};ft.prototype.midpoint=function(s){return console.warn("THREE.Triangle: .midpoint() has been renamed to .getMidpoint()."),this.getMidpoint(s)};ft.prototypenormal=function(s){return console.warn("THREE.Triangle: .normal() has been renamed to .getNormal()."),this.getNormal(s)};ft.prototype.plane=function(s){return console.warn("THREE.Triangle: .plane() has been renamed to .getPlane()."),this.getPlane(s)};ft.barycoordFromPoint=function(s,e,t,n,i){return console.warn("THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord()."),ft.getBarycoord(s,e,t,n,i)};ft.normal=function(s,e,t,n){return console.warn("THREE.Triangle: .normal() has been renamed to .getNormal()."),ft.getNormal(s,e,t,n)};Nl.prototype.extractAllPoints=function(s){return console.warn("THREE.Shape: .extractAllPoints() has been removed. Use .extractPoints() instead."),this.extractPoints(s)};Nl.prototype.extrude=function(s){return console.warn("THREE.Shape: .extrude() has been removed. Use ExtrudeGeometry() instead."),new Oo(this,s)};Nl.prototype.makeGeometry=function(s){return console.warn("THREE.Shape: .makeGeometry() has been removed. Use ShapeGeometry() instead."),new Lv(this,s)};Q.prototype.fromAttribute=function(s,e,t){return console.warn("THREE.Vector2: .fromAttribute() has been renamed to .fromBufferAttribute()."),this.fromBufferAttribute(s,e,t)};Q.prototype.distanceToManhattan=function(s){return console.warn("THREE.Vector2: .distanceToManhattan() has been renamed to .manhattanDistanceTo()."),this.manhattanDistanceTo(s)};Q.prototype.lengthManhattan=function(){return console.warn("THREE.Vector2: .lengthManhattan() has been renamed to .manhattanLength()."),this.manhattanLength()};T.prototype.setEulerFromRotationMatrix=function(){console.error("THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.")};T.prototype.setEulerFromQuaternion=function(){console.error("THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.")};T.prototype.getPositionFromMatrix=function(s){return console.warn("THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition()."),this.setFromMatrixPosition(s)};T.prototype.getScaleFromMatrix=function(s){return console.warn("THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale()."),this.setFromMatrixScale(s)};T.prototype.getColumnFromMatrix=function(s,e){return console.warn("THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn()."),this.setFromMatrixColumn(e,s)};T.prototype.applyProjection=function(s){return console.warn("THREE.Vector3: .applyProjection() has been removed. Use .applyMatrix4( m ) instead."),this.applyMatrix4(s)};T.prototype.fromAttribute=function(s,e,t){return console.warn("THREE.Vector3: .fromAttribute() has been renamed to .fromBufferAttribute()."),this.fromBufferAttribute(s,e,t)};T.prototype.distanceToManhattan=function(s){return console.warn("THREE.Vector3: .distanceToManhattan() has been renamed to .manhattanDistanceTo()."),this.manhattanDistanceTo(s)};T.prototype.lengthManhattan=function(){return console.warn("THREE.Vector3: .lengthManhattan() has been renamed to .manhattanLength()."),this.manhattanLength()};qe.prototype.fromAttribute=function(s,e,t){return console.warn("THREE.Vector4: .fromAttribute() has been renamed to .fromBufferAttribute()."),this.fromBufferAttribute(s,e,t)};qe.prototype.lengthManhattan=function(){return console.warn("THREE.Vector4: .lengthManhattan() has been renamed to .manhattanLength()."),this.manhattanLength()};ke.prototype.getChildByName=function(s){return console.warn("THREE.Object3D: .getChildByName() has been renamed to .getObjectByName()."),this.getObjectByName(s)};ke.prototype.renderDepth=function(){console.warn("THREE.Object3D: .renderDepth has been removed. Use .renderOrder, instead.")};ke.prototype.translate=function(s,e){return console.warn("THREE.Object3D: .translate() has been removed. Use .translateOnAxis( axis, distance ) instead."),this.translateOnAxis(e,s)};ke.prototype.getWorldRotation=function(){console.error("THREE.Object3D: .getWorldRotation() has been removed. Use THREE.Object3D.getWorldQuaternion( target ) instead.")};ke.prototype.applyMatrix=function(s){return console.warn("THREE.Object3D: .applyMatrix() has been renamed to .applyMatrix4()."),this.applyMatrix4(s)};Object.defineProperties(ke.prototype,{eulerOrder:{get:function(){return console.warn("THREE.Object3D: .eulerOrder is now .rotation.order."),this.rotation.order},set:function(s){console.warn("THREE.Object3D: .eulerOrder is now .rotation.order."),this.rotation.order=s}},useQuaternion:{get:function(){console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")},set:function(){console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")}}});Qe.prototype.setDrawMode=function(){console.error("THREE.Mesh: .setDrawMode() has been removed. The renderer now always assumes THREE.TrianglesDrawMode. Transform your geometry via BufferGeometryUtils.toTrianglesDrawMode() if necessary.")};Object.defineProperties(Qe.prototype,{drawMode:{get:function(){return console.error("THREE.Mesh: .drawMode has been removed. The renderer now always assumes THREE.TrianglesDrawMode."),rp},set:function(){console.error("THREE.Mesh: .drawMode has been removed. The renderer now always assumes THREE.TrianglesDrawMode. Transform your geometry via BufferGeometryUtils.toTrianglesDrawMode() if necessary.")}}});Sl.prototype.initBones=function(){console.error("THREE.SkinnedMesh: initBones() has been removed.")};At.prototype.setLens=function(s,e){console.warn("THREE.PerspectiveCamera.setLens is deprecated. Use .setFocalLength and .filmGauge for a photographic setup."),e!==void 0&&(this.filmGauge=e),this.setFocalLength(s)};Object.defineProperties(on.prototype,{onlyShadow:{set:function(){console.warn("THREE.Light: .onlyShadow has been removed.")}},shadowCameraFov:{set:function(s){console.warn("THREE.Light: .shadowCameraFov is now .shadow.camera.fov."),this.shadow.camera.fov=s}},shadowCameraLeft:{set:function(s){console.warn("THREE.Light: .shadowCameraLeft is now .shadow.camera.left."),this.shadow.camera.left=s}},shadowCameraRight:{set:function(s){console.warn("THREE.Light: .shadowCameraRight is now .shadow.camera.right."),this.shadow.camera.right=s}},shadowCameraTop:{set:function(s){console.warn("THREE.Light: .shadowCameraTop is now .shadow.camera.top."),this.shadow.camera.top=s}},shadowCameraBottom:{set:function(s){console.warn("THREE.Light: .shadowCameraBottom is now .shadow.camera.bottom."),this.shadow.camera.bottom=s}},shadowCameraNear:{set:function(s){console.warn("THREE.Light: .shadowCameraNear is now .shadow.camera.near."),this.shadow.camera.near=s}},shadowCameraFar:{set:function(s){console.warn("THREE.Light: .shadowCameraFar is now .shadow.camera.far."),this.shadow.camera.far=s}},shadowCameraVisible:{set:function(){console.warn("THREE.Light: .shadowCameraVisible has been removed. Use new THREE.CameraHelper( light.shadow.camera ) instead.")}},shadowBias:{set:function(s){console.warn("THREE.Light: .shadowBias is now .shadow.bias."),this.shadow.bias=s}},shadowDarkness:{set:function(){console.warn("THREE.Light: .shadowDarkness has been removed.")}},shadowMapWidth:{set:function(s){console.warn("THREE.Light: .shadowMapWidth is now .shadow.mapSize.width."),this.shadow.mapSize.width=s}},shadowMapHeight:{set:function(s){console.warn("THREE.Light: .shadowMapHeight is now .shadow.mapSize.height."),this.shadow.mapSize.height=s}}});Object.defineProperties(Le.prototype,{length:{get:function(){return console.warn("THREE.BufferAttribute: .length has been deprecated. Use .count instead."),this.array.length}},dynamic:{get:function(){return console.warn("THREE.BufferAttribute: .dynamic has been deprecated. Use .usage instead."),this.usage===Eo},set:function(){console.warn("THREE.BufferAttribute: .dynamic has been deprecated. Use .usage instead."),this.setUsage(Eo)}}});Le.prototype.setDynamic=function(s){return console.warn("THREE.BufferAttribute: .setDynamic() has been deprecated. Use .setUsage() instead."),this.setUsage(s===!0?Eo:nr),this};Le.prototype.copyIndicesArray=function(){console.error("THREE.BufferAttribute: .copyIndicesArray() has been removed.")},Le.prototype.setArray=function(){console.error("THREE.BufferAttribute: .setArray has been removed. Use BufferGeometry .setAttribute to replace/resize attribute buffers")};Be.prototype.addIndex=function(s){console.warn("THREE.BufferGeometry: .addIndex() has been renamed to .setIndex()."),this.setIndex(s)};Be.prototype.addAttribute=function(s,e){return console.warn("THREE.BufferGeometry: .addAttribute() has been renamed to .setAttribute()."),!(e&&e.isBufferAttribute)&&!(e&&e.isInterleavedBufferAttribute)?(console.warn("THREE.BufferGeometry: .addAttribute() now expects ( name, attribute )."),this.setAttribute(s,new Le(arguments[1],arguments[2]))):s==="index"?(console.warn("THREE.BufferGeometry.addAttribute: Use .setIndex() for index attribute."),this.setIndex(e),this):this.setAttribute(s,e)};Be.prototype.addDrawCall=function(s,e,t){t!==void 0&&console.warn("THREE.BufferGeometry: .addDrawCall() no longer supports indexOffset."),console.warn("THREE.BufferGeometry: .addDrawCall() is now .addGroup()."),this.addGroup(s,e)};Be.prototype.clearDrawCalls=function(){console.warn("THREE.BufferGeometry: .clearDrawCalls() is now .clearGroups()."),this.clearGroups()};Be.prototype.computeOffsets=function(){console.warn("THREE.BufferGeometry: .computeOffsets() has been removed.")};Be.prototype.removeAttribute=function(s){return console.warn("THREE.BufferGeometry: .removeAttribute() has been renamed to .deleteAttribute()."),this.deleteAttribute(s)};Be.prototype.applyMatrix=function(s){return console.warn("THREE.BufferGeometry: .applyMatrix() has been renamed to .applyMatrix4()."),this.applyMatrix4(s)};Object.defineProperties(Be.prototype,{drawcalls:{get:function(){return console.error("THREE.BufferGeometry: .drawcalls has been renamed to .groups."),this.groups}},offsets:{get:function(){return console.warn("THREE.BufferGeometry: .offsets has been renamed to .groups."),this.groups}}});Kn.prototype.setDynamic=function(s){return console.warn("THREE.InterleavedBuffer: .setDynamic() has been deprecated. Use .setUsage() instead."),this.setUsage(s===!0?Eo:nr),this};Kn.prototype.setArray=function(){console.error("THREE.InterleavedBuffer: .setArray has been removed. Use BufferGeometry .setAttribute to replace/resize attribute buffers")};Oo.prototype.getArrays=function(){console.error("THREE.ExtrudeGeometry: .getArrays() has been removed.")};Oo.prototype.addShapeList=function(){console.error("THREE.ExtrudeGeometry: .addShapeList() has been removed.")};Oo.prototype.addShape=function(){console.error("THREE.ExtrudeGeometry: .addShape() has been removed.")};bl.prototype.dispose=function(){console.error("THREE.Scene: .dispose() has been removed.")};Object.defineProperties(ht.prototype,{wrapAround:{get:function(){console.warn("THREE.Material: .wrapAround has been removed.")},set:function(){console.warn("THREE.Material: .wrapAround has been removed.")}},overdraw:{get:function(){console.warn("THREE.Material: .overdraw has been removed.")},set:function(){console.warn("THREE.Material: .overdraw has been removed.")}},wrapRGB:{get:function(){return console.warn("THREE.Material: .wrapRGB has been removed."),new le}},shading:{get:function(){console.error("THREE."+this.type+": .shading has been removed. Use the boolean .flatShading instead.")},set:function(s){console.warn("THREE."+this.type+": .shading has been removed. Use the boolean .flatShading instead."),this.flatShading=s===Yh}},stencilMask:{get:function(){return console.warn("THREE."+this.type+": .stencilMask has been removed. Use .stencilFuncMask instead."),this.stencilFuncMask},set:function(s){console.warn("THREE."+this.type+": .stencilMask has been removed. Use .stencilFuncMask instead."),this.stencilFuncMask=s}}});Object.defineProperties(vt.prototype,{derivatives:{get:function(){return console.warn("THREE.ShaderMaterial: .derivatives has been moved to .extensions.derivatives."),this.extensions.derivatives},set:function(s){console.warn("THREE. ShaderMaterial: .derivatives has been moved to .extensions.derivatives."),this.extensions.derivatives=s}}});Ye.prototype.clearTarget=function(s,e,t,n){console.warn("THREE.WebGLRenderer: .clearTarget() has been deprecated. Use .setRenderTarget() and .clear() instead."),this.setRenderTarget(s),this.clear(e,t,n)};Ye.prototype.animate=function(s){console.warn("THREE.WebGLRenderer: .animate() is now .setAnimationLoop()."),this.setAnimationLoop(s)};Ye.prototype.getCurrentRenderTarget=function(){return console.warn("THREE.WebGLRenderer: .getCurrentRenderTarget() is now .getRenderTarget()."),this.getRenderTarget()};Ye.prototype.getMaxAnisotropy=function(){return console.warn("THREE.WebGLRenderer: .getMaxAnisotropy() is now .capabilities.getMaxAnisotropy()."),this.capabilities.getMaxAnisotropy()};Ye.prototype.getPrecision=function(){return console.warn("THREE.WebGLRenderer: .getPrecision() is now .capabilities.precision."),this.capabilities.precision};Ye.prototype.resetGLState=function(){return console.warn("THREE.WebGLRenderer: .resetGLState() is now .state.reset()."),this.state.reset()};Ye.prototype.supportsFloatTextures=function(){return console.warn("THREE.WebGLRenderer: .supportsFloatTextures() is now .extensions.get( 'OES_texture_float' )."),this.extensions.get("OES_texture_float")};Ye.prototype.supportsHalfFloatTextures=function(){return console.warn("THREE.WebGLRenderer: .supportsHalfFloatTextures() is now .extensions.get( 'OES_texture_half_float' )."),this.extensions.get("OES_texture_half_float")};Ye.prototype.supportsStandardDerivatives=function(){return console.warn("THREE.WebGLRenderer: .supportsStandardDerivatives() is now .extensions.get( 'OES_standard_derivatives' )."),this.extensions.get("OES_standard_derivatives")};Ye.prototype.supportsCompressedTextureS3TC=function(){return console.warn("THREE.WebGLRenderer: .supportsCompressedTextureS3TC() is now .extensions.get( 'WEBGL_compressed_texture_s3tc' )."),this.extensions.get("WEBGL_compressed_texture_s3tc")};Ye.prototype.supportsCompressedTexturePVRTC=function(){return console.warn("THREE.WebGLRenderer: .supportsCompressedTexturePVRTC() is now .extensions.get( 'WEBGL_compressed_texture_pvrtc' )."),this.extensions.get("WEBGL_compressed_texture_pvrtc")};Ye.prototype.supportsBlendMinMax=function(){return console.warn("THREE.WebGLRenderer: .supportsBlendMinMax() is now .extensions.get( 'EXT_blend_minmax' )."),this.extensions.get("EXT_blend_minmax")};Ye.prototype.supportsVertexTextures=function(){return console.warn("THREE.WebGLRenderer: .supportsVertexTextures() is now .capabilities.vertexTextures."),this.capabilities.vertexTextures};Ye.prototype.supportsInstancedArrays=function(){return console.warn("THREE.WebGLRenderer: .supportsInstancedArrays() is now .extensions.get( 'ANGLE_instanced_arrays' )."),this.extensions.get("ANGLE_instanced_arrays")};Ye.prototype.enableScissorTest=function(s){console.warn("THREE.WebGLRenderer: .enableScissorTest() is now .setScissorTest()."),this.setScissorTest(s)};Ye.prototype.initMaterial=function(){console.warn("THREE.WebGLRenderer: .initMaterial() has been removed.")};Ye.prototype.addPrePlugin=function(){console.warn("THREE.WebGLRenderer: .addPrePlugin() has been removed.")};Ye.prototype.addPostPlugin=function(){console.warn("THREE.WebGLRenderer: .addPostPlugin() has been removed.")};Ye.prototype.updateShadowMap=function(){console.warn("THREE.WebGLRenderer: .updateShadowMap() has been removed.")};Ye.prototype.setFaceCulling=function(){console.warn("THREE.WebGLRenderer: .setFaceCulling() has been removed.")};Ye.prototype.allocTextureUnit=function(){console.warn("THREE.WebGLRenderer: .allocTextureUnit() has been removed.")};Ye.prototype.setTexture=function(){console.warn("THREE.WebGLRenderer: .setTexture() has been removed.")};Ye.prototype.setTexture2D=function(){console.warn("THREE.WebGLRenderer: .setTexture2D() has been removed.")};Ye.prototype.setTextureCube=function(){console.warn("THREE.WebGLRenderer: .setTextureCube() has been removed.")};Ye.prototype.getActiveMipMapLevel=function(){return console.warn("THREE.WebGLRenderer: .getActiveMipMapLevel() is now .getActiveMipmapLevel()."),this.getActiveMipmapLevel()};Object.defineProperties(Ye.prototype,{shadowMapEnabled:{get:function(){return this.shadowMap.enabled},set:function(s){console.warn("THREE.WebGLRenderer: .shadowMapEnabled is now .shadowMap.enabled."),this.shadowMap.enabled=s}},shadowMapType:{get:function(){return this.shadowMap.type},set:function(s){console.warn("THREE.WebGLRenderer: .shadowMapType is now .shadowMap.type."),this.shadowMap.type=s}},shadowMapCullFace:{get:function(){console.warn("THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead.")},set:function(){console.warn("THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead.")}},context:{get:function(){return console.warn("THREE.WebGLRenderer: .context has been removed. Use .getContext() instead."),this.getContext()}},vr:{get:function(){return console.warn("THREE.WebGLRenderer: .vr has been renamed to .xr"),this.xr}},gammaInput:{get:function(){return console.warn("THREE.WebGLRenderer: .gammaInput has been removed. Set the encoding for textures via Texture.encoding instead."),!1},set:function(){console.warn("THREE.WebGLRenderer: .gammaInput has been removed. Set the encoding for textures via Texture.encoding instead.")}},gammaOutput:{get:function(){return console.warn("THREE.WebGLRenderer: .gammaOutput has been removed. Set WebGLRenderer.outputEncoding instead."),!1},set:function(s){console.warn("THREE.WebGLRenderer: .gammaOutput has been removed. Set WebGLRenderer.outputEncoding instead."),this.outputEncoding=s===!0?tr:gr}},toneMappingWhitePoint:{get:function(){return console.warn("THREE.WebGLRenderer: .toneMappingWhitePoint has been removed."),1},set:function(){console.warn("THREE.WebGLRenderer: .toneMappingWhitePoint has been removed.")}}});Object.defineProperties(wu.prototype,{cullFace:{get:function(){console.warn("THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead.")},set:function(){console.warn("THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead.")}},renderReverseSided:{get:function(){console.warn("THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead.")},set:function(){console.warn("THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead.")}},renderSingleSided:{get:function(){console.warn("THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead.")},set:function(){console.warn("THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead.")}}});Object.defineProperties(hi.prototype,{wrapS:{get:function(){return console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS."),this.texture.wrapS},set:function(s){console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS."),this.texture.wrapS=s}},wrapT:{get:function(){return console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT."),this.texture.wrapT},set:function(s){console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT."),this.texture.wrapT=s}},magFilter:{get:function(){return console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter."),this.texture.magFilter},set:function(s){console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter."),this.texture.magFilter=s}},minFilter:{get:function(){return console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter."),this.texture.minFilter},set:function(s){console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter."),this.texture.minFilter=s}},anisotropy:{get:function(){return console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy."),this.texture.anisotropy},set:function(s){console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy."),this.texture.anisotropy=s}},offset:{get:function(){return console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset."),this.texture.offset},set:function(s){console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset."),this.texture.offset=s}},repeat:{get:function(){return console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat."),this.texture.repeat},set:function(s){console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat."),this.texture.repeat=s}},format:{get:function(){return console.warn("THREE.WebGLRenderTarget: .format is now .texture.format."),this.texture.format},set:function(s){console.warn("THREE.WebGLRenderTarget: .format is now .texture.format."),this.texture.format=s}},type:{get:function(){return console.warn("THREE.WebGLRenderTarget: .type is now .texture.type."),this.texture.type},set:function(s){console.warn("THREE.WebGLRenderTarget: .type is now .texture.type."),this.texture.type=s}},generateMipmaps:{get:function(){return console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps."),this.texture.generateMipmaps},set:function(s){console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps."),this.texture.generateMipmaps=s}}});cy.prototype.load=function(s){console.warn("THREE.Audio: .load has been deprecated. Use THREE.AudioLoader instead.");const e=this;return new ry().load(s,function(n){e.setBuffer(n)}),this};Ml.prototype.updateCubeMap=function(s,e){return console.warn("THREE.CubeCamera: .updateCubeMap() is now .update()."),this.update(s,e)};Ml.prototype.clear=function(s,e,t,n){return console.warn("THREE.CubeCamera: .clear() is now .renderTarget.clear()."),this.renderTarget.clear(s,e,t,n)};as.crossOrigin=void 0;as.loadTexture=function(s,e,t,n){console.warn("THREE.ImageUtils.loadTexture has been deprecated. Use THREE.TextureLoader() instead.");const i=new Cl;i.setCrossOrigin(this.crossOrigin);const r=i.load(s,t,void 0,n);return e&&(r.mapping=e),r};as.loadTextureCube=function(s,e,t,n){console.warn("THREE.ImageUtils.loadTextureCube has been deprecated. Use THREE.CubeTextureLoader() instead.");const i=new Xv;i.setCrossOrigin(this.crossOrigin);const r=i.load(s,t,void 0,n);return e&&(r.mapping=e),r};as.loadCompressedTexture=function(){console.error("THREE.ImageUtils.loadCompressedTexture has been removed. Use THREE.DDSLoader instead.")};as.loadCompressedTextureCube=function(){console.error("THREE.ImageUtils.loadCompressedTextureCube has been removed. Use THREE.DDSLoader instead.")};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Wh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Wh);class IM extends An{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Py(t)}),this.register(function(t){return new Dy(t)}),this.register(function(t){return new Ny(t)}),this.register(function(t){return new Iy(t)}),this.register(function(t){return new Cy(t)}),this.register(function(t){return new Fy(t)})}load(e,t,n,i){const r=this;let o;this.resourcePath!==""?o=this.resourcePath:this.path!==""?o=this.path:o=ji.extractUrlBase(e),this.manager.itemStart(e);const a=function(c){i?i(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new Ll(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,o,function(h){t(h),r.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r;const o={},a={};if(typeof e=="string")r=e;else if(ji.decodeText(new Uint8Array(e,0,4))===Yu){try{o[Ve.KHR_BINARY_GLTF]=new By(e)}catch(u){i&&i(u);return}r=o[Ve.KHR_BINARY_GLTF].content}else r=ji.decodeText(new Uint8Array(e));const l=JSON.parse(r);if(l.asset===void 0||l.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new qy(l,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](c);a[u.name]=u,o[u.name]=!0}if(l.extensionsUsed)for(let h=0;h<l.extensionsUsed.length;++h){const u=l.extensionsUsed[h],d=l.extensionsRequired||[];switch(u){case Ve.KHR_MATERIALS_UNLIT:o[u]=new Ry;break;case Ve.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:o[u]=new Uy;break;case Ve.KHR_DRACO_MESH_COMPRESSION:o[u]=new zy(l,this.dracoLoader);break;case Ve.KHR_TEXTURE_TRANSFORM:o[u]=new Oy;break;case Ve.KHR_MESH_QUANTIZATION:o[u]=new Hy;break;default:d.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,i)}}function Ly(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}const Ve={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:"KHR_materials_pbrSpecularGlossiness",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression"};class Cy{constructor(e){this.parser=e,this.name=Ve.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let c;const h=new le(16777215);l.color!==void 0&&h.fromArray(l.color);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new gs(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new ko(h),c.distance=u;break;case"spot":c=new Hu(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class Ry{constructor(){this.name=Ve.KHR_MATERIALS_UNLIT}getMaterialType(){return Ut}extendParams(e,t,n){const i=[];e.color=new le(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const o=r.baseColorFactor;e.color.fromArray(o),e.opacity=o[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture))}return Promise.all(i)}}class Py{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Uo}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Q(a,-a)}return Promise.all(r)}}class Iy{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Uo}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}}class Dy{constructor(e){this.parser=e,this.name=Ve.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const r=i.extensions[this.name],o=n.images[r.source],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,o,a)}}class Ny{constructor(e){this.parser=e,this.name=Ve.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,a,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class Fy{constructor(e){this.name=Ve.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return Promise.all([r,o.ready]).then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,d=new ArrayBuffer(h*u),p=new Uint8Array(a[0],l,c);return o.decodeGltfBuffer(new Uint8Array(d),h,u,p,i.mode,i.filter),d})}else return null}}const Yu="glTF",Is=12,wh={JSON:1313821514,BIN:5130562};class By{constructor(e){this.name=Ve.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Is);if(this.header={magic:ji.decodeText(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Yu)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const n=this.header.length-Is,i=new DataView(e,Is);let r=0;for(;r<n;){const o=i.getUint32(r,!0);r+=4;const a=i.getUint32(r,!0);if(r+=4,a===wh.JSON){const l=new Uint8Array(e,Is+r,o);this.content=ji.decodeText(l)}else if(a===wh.BIN){const l=Is+r;this.body=e.slice(l,l+o)}r+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class zy{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Ve.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const h in o){const u=sl[h]||h.toLowerCase();a[u]=o[h]}for(const h in e.attributes){const u=sl[h]||h.toLowerCase();if(o[h]!==void 0){const d=n.accessors[e.attributes[h]],p=cr[d.componentType];c[u]=p,l[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u){i.decodeDracoFile(h,function(d){for(const p in d.attributes){const m=d.attributes[p],x=l[p];x!==void 0&&(m.normalized=x)}u(d)},a,c)})})}}class Oy{constructor(){this.name=Ve.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return e=e.clone(),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.texCoord!==void 0&&console.warn('THREE.GLTFLoader: Custom UV sets in "'+this.name+'" extension not yet supported.'),e.needsUpdate=!0,e}}class il extends En{constructor(e){super(),this.isGLTFSpecularGlossinessMaterial=!0;const t=["#ifdef USE_SPECULARMAP","	uniform sampler2D specularMap;","#endif"].join(`
`),n=["#ifdef USE_GLOSSINESSMAP","	uniform sampler2D glossinessMap;","#endif"].join(`
`),i=["vec3 specularFactor = specular;","#ifdef USE_SPECULARMAP","	vec4 texelSpecular = texture2D( specularMap, vUv );","	texelSpecular = sRGBToLinear( texelSpecular );","	// reads channel RGB, compatible with a glTF Specular-Glossiness (RGBA) texture","	specularFactor *= texelSpecular.rgb;","#endif"].join(`
`),r=["float glossinessFactor = glossiness;","#ifdef USE_GLOSSINESSMAP","	vec4 texelGlossiness = texture2D( glossinessMap, vUv );","	// reads channel A, compatible with a glTF Specular-Glossiness (RGBA) texture","	glossinessFactor *= texelGlossiness.a;","#endif"].join(`
`),o=["PhysicalMaterial material;","material.diffuseColor = diffuseColor.rgb * ( 1. - max( specularFactor.r, max( specularFactor.g, specularFactor.b ) ) );","vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );","float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );","material.specularRoughness = max( 1.0 - glossinessFactor, 0.0525 ); // 0.0525 corresponds to the base mip of a 256 cubemap.","material.specularRoughness += geometryRoughness;","material.specularRoughness = min( material.specularRoughness, 1.0 );","material.specularColor = specularFactor;"].join(`
`),a={specular:{value:new le().setHex(16777215)},glossiness:{value:1},specularMap:{value:null},glossinessMap:{value:null}};this._extraUniforms=a,this.onBeforeCompile=function(l){for(const c in a)l.uniforms[c]=a[c];l.fragmentShader=l.fragmentShader.replace("uniform float roughness;","uniform vec3 specular;").replace("uniform float metalness;","uniform float glossiness;").replace("#include <roughnessmap_pars_fragment>",t).replace("#include <metalnessmap_pars_fragment>",n).replace("#include <roughnessmap_fragment>",i).replace("#include <metalnessmap_fragment>",r).replace("#include <lights_physical_fragment>",o)},Object.defineProperties(this,{specular:{get:function(){return a.specular.value},set:function(l){a.specular.value=l}},specularMap:{get:function(){return a.specularMap.value},set:function(l){a.specularMap.value=l,l?this.defines.USE_SPECULARMAP="":delete this.defines.USE_SPECULARMAP}},glossiness:{get:function(){return a.glossiness.value},set:function(l){a.glossiness.value=l}},glossinessMap:{get:function(){return a.glossinessMap.value},set:function(l){a.glossinessMap.value=l,l?(this.defines.USE_GLOSSINESSMAP="",this.defines.USE_UV=""):(delete this.defines.USE_GLOSSINESSMAP,delete this.defines.USE_UV)}}}),delete this.metalness,delete this.roughness,delete this.metalnessMap,delete this.roughnessMap,this.setValues(e)}copy(e){return super.copy(e),this.specularMap=e.specularMap,this.specular.copy(e.specular),this.glossinessMap=e.glossinessMap,this.glossiness=e.glossiness,delete this.metalness,delete this.roughness,delete this.metalnessMap,delete this.roughnessMap,this}}class Uy{constructor(){this.name=Ve.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS,this.specularGlossinessParams=["color","map","lightMap","lightMapIntensity","aoMap","aoMapIntensity","emissive","emissiveIntensity","emissiveMap","bumpMap","bumpScale","normalMap","normalMapType","displacementMap","displacementScale","displacementBias","specularMap","specular","glossinessMap","glossiness","alphaMap","envMap","envMapIntensity","refractionRatio"]}getMaterialType(){return il}extendParams(e,t,n){const i=t.extensions[this.name];e.color=new le(1,1,1),e.opacity=1;const r=[];if(Array.isArray(i.diffuseFactor)){const o=i.diffuseFactor;e.color.fromArray(o),e.opacity=o[3]}if(i.diffuseTexture!==void 0&&r.push(n.assignTexture(e,"map",i.diffuseTexture)),e.emissive=new le(0,0,0),e.glossiness=i.glossinessFactor!==void 0?i.glossinessFactor:1,e.specular=new le(1,1,1),Array.isArray(i.specularFactor)&&e.specular.fromArray(i.specularFactor),i.specularGlossinessTexture!==void 0){const o=i.specularGlossinessTexture;r.push(n.assignTexture(e,"glossinessMap",o)),r.push(n.assignTexture(e,"specularMap",o))}return Promise.all(r)}createMaterial(e){const t=new il(e);return t.fog=!0,t.color=e.color,t.map=e.map===void 0?null:e.map,t.lightMap=null,t.lightMapIntensity=1,t.aoMap=e.aoMap===void 0?null:e.aoMap,t.aoMapIntensity=1,t.emissive=e.emissive,t.emissiveIntensity=1,t.emissiveMap=e.emissiveMap===void 0?null:e.emissiveMap,t.bumpMap=e.bumpMap===void 0?null:e.bumpMap,t.bumpScale=1,t.normalMap=e.normalMap===void 0?null:e.normalMap,t.normalMapType=gi,e.normalScale&&(t.normalScale=e.normalScale),t.displacementMap=null,t.displacementScale=1,t.displacementBias=0,t.specularMap=e.specularMap===void 0?null:e.specularMap,t.specular=e.specular,t.glossinessMap=e.glossinessMap===void 0?null:e.glossinessMap,t.glossiness=e.glossiness,t.alphaMap=null,t.envMap=e.envMap===void 0?null:e.envMap,t.envMapIntensity=1,t.refractionRatio=.98,t}}class Hy{constructor(){this.name=Ve.KHR_MESH_QUANTIZATION}}class is extends Sn{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[r+o];return t}}is.prototype.beforeStart_=is.prototype.copySampleValue_;is.prototype.afterEnd_=is.prototype.copySampleValue_;is.prototype.interpolate_=function(s,e,t,n){const i=this.resultBuffer,r=this.sampleValues,o=this.valueSize,a=o*2,l=o*3,c=n-e,h=(t-e)/c,u=h*h,d=u*h,p=s*l,m=p-l,x=-2*d+3*u,v=d-u,g=1-x,f=v-u+h;for(let _=0;_!==o;_++){const w=r[m+_+o],E=r[m+_+a]*c,y=r[p+_+o],S=r[p+_]*c;i[_]=g*w+f*E+x*y+v*S}return i};const xn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},cr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},bh={9728:St,9729:Ft,9984:Ya,9985:Qh,9986:ja,9987:mr},Sh={33071:Nt,33648:wo,10497:Zn},Th={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},sl={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv2",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},zn={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Gy={CUBICSPLINE:void 0,LINEAR:$i,STEP:er},Ua={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Eh(s,e){return typeof s!="string"||s===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(s)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(s)||/^data:.*,.*$/i.test(s)||/^blob:.*$/i.test(s)?s:e+s)}function ky(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new En({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:pr})),s.DefaultMaterial}function Ds(s,e,t){for(const n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function si(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Vy(s,e,t){let n=!1,i=!1;for(let a=0,l=e.length;a<l;a++){const c=e[a];if(c.POSITION!==void 0&&(n=!0),c.NORMAL!==void 0&&(i=!0),n&&i)break}if(!n&&!i)return Promise.resolve(s);const r=[],o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a];if(n){const h=c.POSITION!==void 0?t.getDependency("accessor",c.POSITION):s.attributes.position;r.push(h)}if(i){const h=c.NORMAL!==void 0?t.getDependency("accessor",c.NORMAL):s.attributes.normal;o.push(h)}}return Promise.all([Promise.all(r),Promise.all(o)]).then(function(a){const l=a[0],c=a[1];return n&&(s.morphAttributes.position=l),i&&(s.morphAttributes.normal=c),s.morphTargetsRelative=!0,s})}function Wy(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Xy(s){const e=s.extensions&&s.extensions[Ve.KHR_DRACO_MESH_COMPRESSION];let t;return e?t="draco:"+e.bufferView+":"+e.indices+":"+Ah(e.attributes):t=s.indices+":"+Ah(s.attributes)+":"+s.mode,t}function Ah(s){let e="";const t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function rl(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}class qy{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Ly,this.associations=new Map,this.primitiveCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.nodeNamesUsed={},typeof createImageBitmap<"u"&&/Firefox/.test(navigator.userAgent)===!1?this.textureLoader=new Xu(this.options.manager):this.textureLoader=new Cl(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Ll(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};Ds(r,a,i),si(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){const o=t[i].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let i=0,r=e.length;i<r;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone();return i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this.loadNode(t);break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this.loadAnimation(t);break;case"camera":i=this.loadCamera(t);break;default:throw new Error("Unknown type: "+e)}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Ve.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(r,o){n.load(Eh(t.uri,i.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0)return Promise.resolve(null);const r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(o){const a=o[0],l=Th[i.type],c=cr[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=i.byteOffset||0,p=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,m=i.normalized===!0;let x,v;if(p&&p!==u){const g=Math.floor(d/p),f="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+g+":"+i.count;let _=t.cache.get(f);_||(x=new c(a,g*p,i.count*p/h),_=new Kn(x,p/h),t.cache.add(f,_)),v=new ts(_,l,d%p/h,m)}else a===null?x=new c(i.count*l):x=new c(a,d,i.count*l),v=new Le(x,l,m);if(i.sparse!==void 0){const g=Th.SCALAR,f=cr[i.sparse.indices.componentType],_=i.sparse.indices.byteOffset||0,w=i.sparse.values.byteOffset||0,E=new f(o[1],_,i.sparse.count*g),y=new c(o[2],w,i.sparse.count*l);a!==null&&(v=new Le(v.array.slice(),v.itemSize,v.normalized));for(let S=0,C=E.length;S<C;S++){const I=E[S];if(v.setX(I,y[S*l]),l>=2&&v.setY(I,y[S*l+1]),l>=3&&v.setZ(I,y[S*l+2]),l>=4&&v.setW(I,y[S*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return v})}loadTexture(e){const t=this.json,n=this.options,i=t.textures[e],r=t.images[i.source];let o=this.textureLoader;if(r.uri){const a=n.manager.getHandler(r.uri);a!==null&&(o=a)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){const i=this,r=this.json,o=this.options,a=r.textures[e],l=self.URL||self.webkitURL;let c=t.uri,h=!1,u=!0;if(t.mimeType==="image/jpeg"&&(u=!1),t.bufferView!==void 0)c=i.getDependency("bufferView",t.bufferView).then(function(d){if(t.mimeType==="image/png"){const m=new DataView(d,25,1).getUint8(0,!1);u=m===6||m===4||m===3}h=!0;const p=new Blob([d],{type:t.mimeType});return c=l.createObjectURL(p),c});else if(t.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");return Promise.resolve(c).then(function(d){return new Promise(function(p,m){let x=p;n.isImageBitmapLoader===!0&&(x=function(v){p(new cn(v))}),n.load(Eh(d,o.path),x,void 0,m)})}).then(function(d){h===!0&&l.revokeObjectURL(c),d.flipY=!1,a.name&&(d.name=a.name),u||(d.format=qn);const m=(r.samplers||{})[a.sampler]||{};return d.magFilter=bh[m.magFilter]||Ft,d.minFilter=bh[m.minFilter]||mr,d.wrapS=Sh[m.wrapS]||Zn,d.wrapT=Sh[m.wrapT]||Zn,i.associations.set(d,{type:"textures",index:e}),d})}assignTexture(e,t,n){const i=this;return this.getDependency("texture",n.index).then(function(r){if(n.texCoord!==void 0&&n.texCoord!=0&&!(t==="aoMap"&&n.texCoord==1)&&console.warn("THREE.GLTFLoader: Custom UV set "+n.texCoord+" for texture "+t+" not yet supported."),i.extensions[Ve.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[Ve.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const a=i.associations.get(r);r=i.extensions[Ve.KHR_TEXTURE_TRANSFORM].extendTexture(r,o),i.associations.set(r,a)}}e[t]=r})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent!==void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0,a=e.isSkinnedMesh===!0,l=Object.keys(t.morphAttributes).length>0,c=l&&t.morphAttributes.normal!==void 0;if(e.isPoints){const h="PointsMaterial:"+n.uuid;let u=this.cache.get(h);u||(u=new Al,ht.prototype.copy.call(u,n),u.color.copy(n.color),u.map=n.map,u.sizeAttenuation=!1,this.cache.add(h,u)),n=u}else if(e.isLine){const h="LineBasicMaterial:"+n.uuid;let u=this.cache.get(h);u||(u=new us,ht.prototype.copy.call(u,n),u.color.copy(n.color),this.cache.add(h,u)),n=u}if(i||r||o||a||l){let h="ClonedMaterial:"+n.uuid+":";n.isGLTFSpecularGlossinessMaterial&&(h+="specular-glossiness:"),a&&(h+="skinning:"),i&&(h+="vertex-tangents:"),r&&(h+="vertex-colors:"),o&&(h+="flat-shading:"),l&&(h+="morph-targets:"),c&&(h+="morph-normals:");let u=this.cache.get(h);u||(u=n.clone(),a&&(u.skinning=!0),r&&(u.vertexColors=!0),o&&(u.flatShading=!0),l&&(u.morphTargets=!0),c&&(u.morphNormals=!0),i&&(u.vertexTangents=!0,u.normalScale&&(u.normalScale.y*=-1),u.clearcoatNormalScale&&(u.clearcoatNormalScale.y*=-1)),this.cache.add(h,u),this.associations.set(u,this.associations.get(n))),n=u}n.aoMap&&t.attributes.uv2===void 0&&t.attributes.uv!==void 0&&t.setAttribute("uv2",t.attributes.uv),e.material=n}getMaterialType(){return En}loadMaterial(e){const t=this,n=this.json,i=this.extensions,r=n.materials[e];let o;const a={},l=r.extensions||{},c=[];if(l[Ve.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS]){const u=i[Ve.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS];o=u.getMaterialType(),c.push(u.extendParams(a,r,t))}else if(l[Ve.KHR_MATERIALS_UNLIT]){const u=i[Ve.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),c.push(u.extendParams(a,r,t))}else{const u=r.pbrMetallicRoughness||{};if(a.color=new le(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;a.color.fromArray(d),a.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",u.baseColorTexture)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=ln);const h=r.alphaMode||Ua.OPAQUE;return h===Ua.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===Ua.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==Ut&&(c.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new Q(1,-1),r.normalTexture.scale!==void 0&&a.normalScale.set(r.normalTexture.scale,-r.normalTexture.scale)),r.occlusionTexture!==void 0&&o!==Ut&&(c.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==Ut&&(a.emissive=new le().fromArray(r.emissiveFactor)),r.emissiveTexture!==void 0&&o!==Ut&&c.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture)),Promise.all(c).then(function(){let u;return o===il?u=i[Ve.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS].createMaterial(a):u=new o(a),r.name&&(u.name=r.name),u.map&&(u.map.encoding=tr),u.emissiveMap&&(u.emissiveMap.encoding=tr),si(u,r),t.associations.set(u,{type:"materials",index:e}),r.extensions&&Ds(i,u,r),u})}createUniqueName(e){const t=Xe.sanitizeNodeName(e||"");let n=t;for(let i=1;this.nodeNamesUsed[n];++i)n=t+"_"+i;return this.nodeNamesUsed[n]=!0,n}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function r(a){return n[Ve.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return Lh(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],h=Xy(c),u=i[h];if(u)o.push(u.promise);else{let d;c.extensions&&c.extensions[Ve.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=Lh(new Be,c,t),i[h]={primitive:c,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const h=o[l].material===void 0?ky(this.cache):this.getDependency("material",o[l].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let p=0,m=h.length;p<m;p++){const x=h[p],v=o[p];let g;const f=c[p];if(v.mode===xn.TRIANGLES||v.mode===xn.TRIANGLE_STRIP||v.mode===xn.TRIANGLE_FAN||v.mode===void 0)g=r.isSkinnedMesh===!0?new Sl(x,f):new Qe(x,f),g.isSkinnedMesh===!0&&!g.geometry.attributes.skinWeight.normalized&&g.normalizeSkinWeights(),v.mode===xn.TRIANGLE_STRIP?g.geometry=Ch(g.geometry,op):v.mode===xn.TRIANGLE_FAN&&(g.geometry=Ch(g.geometry,eu));else if(v.mode===xn.LINES)g=new Fo(x,f);else if(v.mode===xn.LINE_STRIP)g=new vr(x,f);else if(v.mode===xn.LINE_LOOP)g=new Eu(x,f);else if(v.mode===xn.POINTS)g=new ds(x,f);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+v.mode);Object.keys(g.geometry.morphAttributes).length>0&&Wy(g,r),g.name=t.createUniqueName(r.name||"mesh_"+e),si(g,r),v.extensions&&Ds(i,g,v),t.assignFinalMaterial(g),u.push(g)}if(u.length===1)return u[0];const d=new yn;for(let p=0,m=u.length;p<m;p++)d.add(u[p]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new At(Rp.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Bl(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),si(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n={joints:t.joints};return t.inverseBindMatrices===void 0?Promise.resolve(n):this.getDependency("accessor",t.inverseBindMatrices).then(function(i){return n.inverseBindMatrices=i,n})}loadAnimation(e){const n=this.json.animations[e],i=[],r=[],o=[],a=[],l=[];for(let c=0,h=n.channels.length;c<h;c++){const u=n.channels[c],d=n.samplers[u.sampler],p=u.target,m=p.node!==void 0?p.node:p.id,x=n.parameters!==void 0?n.parameters[d.input]:d.input,v=n.parameters!==void 0?n.parameters[d.output]:d.output;i.push(this.getDependency("node",m)),r.push(this.getDependency("accessor",x)),o.push(this.getDependency("accessor",v)),a.push(d),l.push(p)}return Promise.all([Promise.all(i),Promise.all(r),Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],d=c[2],p=c[3],m=c[4],x=[];for(let g=0,f=h.length;g<f;g++){const _=h[g],w=u[g],E=d[g],y=p[g],S=m[g];if(_===void 0)continue;_.updateMatrix(),_.matrixAutoUpdate=!0;let C;switch(zn[S.path]){case zn.weights:C=ar;break;case zn.rotation:C=ps;break;case zn.position:case zn.scale:default:C=lr;break}const I=_.name?_.name:_.uuid,B=y.interpolation!==void 0?Gy[y.interpolation]:$i,U=[];zn[S.path]===zn.weights?_.traverse(function(L){L.isMesh===!0&&L.morphTargetInfluences&&U.push(L.name?L.name:L.uuid)}):U.push(I);let z=E.array;if(E.normalized){const L=rl(z.constructor),D=new Float32Array(z.length);for(let N=0,R=z.length;N<R;N++)D[N]=z[N]*L;z=D}for(let L=0,D=U.length;L<D;L++){const N=new C(U[L]+"."+zn[S.path],w.array,z,B);y.interpolation==="CUBICSPLINE"&&(N.createInterpolant=function(X){return new is(this.times,this.values,this.getValueSize()/3,X)},N.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0),x.push(N)}}const v=n.name?n.name:"animation_"+e;return new el(v,void 0,x)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){const o=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(e){const t=this.json,n=this.extensions,i=this,r=t.nodes[e],o=r.name?i.createUniqueName(r.name):"";return(function(){const a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),r.camera!==void 0&&a.push(i.getDependency("camera",r.camera).then(function(c){return i._getNodeRef(i.cameraCache,r.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),Promise.all(a)})().then(function(a){let l;if(r.isBone===!0?l=new Tl:a.length>1?l=new yn:a.length===1?l=a[0]:l=new ke,l!==a[0])for(let c=0,h=a.length;c<h;c++)l.add(a[c]);if(r.name&&(l.userData.name=r.name,l.name=o),si(l,r),r.extensions&&Ds(n,l,r),r.matrix!==void 0){const c=new ue;c.fromArray(r.matrix),l.applyMatrix4(c)}else r.translation!==void 0&&l.position.fromArray(r.translation),r.rotation!==void 0&&l.quaternion.fromArray(r.rotation),r.scale!==void 0&&l.scale.fromArray(r.scale);return i.associations.set(l,{type:"nodes",index:e}),l})}loadScene(e){const t=this.json,n=this.extensions,i=this.json.scenes[e],r=this,o=new yn;i.name&&(o.name=r.createUniqueName(i.name)),si(o,i),i.extensions&&Ds(n,o,i);const a=i.nodes||[],l=[];for(let c=0,h=a.length;c<h;c++)l.push(ju(a[c],o,t,r));return Promise.all(l).then(function(){return o})}}function ju(s,e,t,n){const i=t.nodes[s];return n.getDependency("node",s).then(function(r){if(i.skin===void 0)return r;let o;return n.getDependency("skin",i.skin).then(function(a){o=a;const l=[];for(let c=0,h=o.joints.length;c<h;c++)l.push(n.getDependency("node",o.joints[c]));return Promise.all(l)}).then(function(a){return r.traverse(function(l){if(!l.isMesh)return;const c=[],h=[];for(let u=0,d=a.length;u<d;u++){const p=a[u];if(p){c.push(p);const m=new ue;o.inverseBindMatrices!==void 0&&m.fromArray(o.inverseBindMatrices.array,u*16),h.push(m)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',o.joints[u])}l.bind(new El(c,h),l.matrixWorld)}),r})}).then(function(r){e.add(r);const o=[];if(i.children){const a=i.children;for(let l=0,c=a.length;l<c;l++){const h=a[l];o.push(ju(h,r,t,n))}}return Promise.all(o)})}function Yy(s,e,t){const n=e.attributes,i=new Gt;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new T(l[0],l[1],l[2]),new T(c[0],c[1],c[2])),a.normalized){const h=rl(cr[a.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const a=new T,l=new T;for(let c=0,h=r.length;c<h;c++){const u=r[c];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],p=d.min,m=d.max;if(p!==void 0&&m!==void 0){if(l.setX(Math.max(Math.abs(p[0]),Math.abs(m[0]))),l.setY(Math.max(Math.abs(p[1]),Math.abs(m[1]))),l.setZ(Math.max(Math.abs(p[2]),Math.abs(m[2]))),d.normalized){const x=rl(cr[d.componentType]);l.multiplyScalar(x)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}s.boundingBox=i;const o=new vi;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=o}function Lh(s,e,t){const n=e.attributes,i=[];function r(o,a){return t.getDependency("accessor",o).then(function(l){s.setAttribute(a,l)})}for(const o in n){const a=sl[o]||o.toLowerCase();a in s.attributes||i.push(r(n[o],a))}if(e.indices!==void 0&&!s.index){const o=t.getDependency("accessor",e.indices).then(function(a){s.setIndex(a)});i.push(o)}return si(s,e),Yy(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?Vy(s,e.targets,t):s})}function Ch(s,e){let t=s.getIndex();if(t===null){const o=[],a=s.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);s.setIndex(o),t=s.getIndex()}else return console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}const n=t.count-2,i=[];if(e===eu)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=s.clone();return r.setIndex(i),r}const Zu=document.createElement("canvas");document.body.appendChild(Zu);const yt=new Ye({canvas:Zu,antialias:!0});yt.setPixelRatio(Math.min(window.devicePixelRatio,2));yt.setSize(window.innerWidth,window.innerHeight);yt.outputEncoding=tr;yt.toneMapping=Jh;yt.toneMappingExposure=2;yt.shadowMap.enabled=!0;yt.shadowMap.type=qh;yt.localClippingEnabled=!0;const Ae=new bl,DM=new ly,ut=-50,jy=18,Zy=25,Rh=-11,Gn=parseInt(sessionStorage.getItem("sipSeed")??"42",10),ss=2,NM=12,Ph=150,FM=Math.max(75,jy*4.2),BM=1/3;let Jy=8.5;function zM(s){Jy=s}const it=new At(50,window.innerWidth/window.innerHeight,.1,1200);it.position.set(0,.3,Zy);it.lookAt(0,8.5,ut);const ol=-150,OM={currentAngle:Math.PI/2,targetAngle:Math.PI/2,dirIndex:1,labels:["N","E","S","W"],topBlend:0,topTarget:0,panX:0,panZ:ol,panTargetX:0,panTargetZ:ol},Ih={active:!1,hoverMesh:null,hoverTile:null,painting:!1,paintedCells:new Set},Ky={material:"sand",height:3,tool:"raise",brush:1},Ha={mode:"terrain",selectedSpecies:"FL-001"},Ju=new Map,rs={currentRockMesh:null,currentSandMesh:null,blocksGroup:null,sharedRockMat:null,sharedSandMat:null,seabedMesh:null,slabMeshes:null},UM={},HM={buildCamera:null,buildCamState:{zoom:63,panX:0,panZ:0,camY:45}},to={removeFlora:null,placeFlora:null,rebuildFormation:null,updateDragPreview:null};function Ku(){yt.setSize(window.innerWidth,window.innerHeight),it.aspect=window.innerWidth/window.innerHeight,it.updateProjectionMatrix()}window.addEventListener("resize",Ku);Ku();const Hl=sessionStorage.getItem("sipDev")==="1";let Qy=Hl?.93:1.5;function GM(s){Hl&&(Qy=s)}let co=-7.5;function kM(s){co=Math.max(-28.5,Math.min(-7.5,s))}let ho=0;function VM(s){ho=Math.max(-.7,Math.min(.8,s))}window.addEventListener("wheel",s=>{Hl?(ho+=s.deltaY*.002,ho=Math.max(-.7,Math.min(.8,ho))):(co+=s.deltaY*.05,co=Math.max(-28.5,Math.min(-7.5,co)))},{passive:!0});const Wo=document.createElement("canvas");Wo.width=4;Wo.height=1024;const tn=Wo.getContext("2d"),Xt=tn.createLinearGradient(0,0,0,1024);Xt.addColorStop(0,"#0a1e3a");Xt.addColorStop(.08,"#0e3468");Xt.addColorStop(.18,"#1a5090");Xt.addColorStop(.3,"#2670b8");Xt.addColorStop(.42,"#3890d0");Xt.addColorStop(.55,"#50a8e0");Xt.addColorStop(.67,"#72c0ec");Xt.addColorStop(.78,"#98d6f4");Xt.addColorStop(.88,"#bce6f8");Xt.addColorStop(.95,"#d8f0f4");Xt.addColorStop(1,"#c8e4e0");tn.fillStyle=Xt;tn.fillRect(0,0,4,1024);Ae.background=new cn(Wo);function $y(s,e){const t=document.createElement("canvas");t.width=s,t.height=e;const n=t.getContext("2d");n.clearRect(0,0,s,e);let i=42;function r(){return i=(i*16807+0)%2147483647,(i-1)/2147483646}const o=256,a=new Uint8Array(o*2),l=[[1,1],[-1,1],[1,-1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]],c=[];for(let S=0;S<o;S++)c.push(S);for(let S=o-1;S>0;S--){const C=Math.floor(r()*(S+1));[c[S],c[C]]=[c[C],c[S]]}for(let S=0;S<o;S++)a[S]=c[S],a[o+S]=c[S];function h(S){return S*S*S*(S*(S*6-15)+10)}function u(S,C,I){return S+I*(C-S)}function d(S,C,I){return S[0]*C+S[1]*I}function p(S,C){const I=Math.floor(S)&255,B=Math.floor(C)&255,U=S-Math.floor(S),z=C-Math.floor(C),L=h(U),D=h(z),N=a[a[I]+B]%12,R=a[a[I]+B+1]%12,X=a[a[I+1]+B]%12,K=a[a[I+1]+B+1]%12,Z=d(l[N],U,z),ee=d(l[X],U-1,z),re=d(l[R],U,z-1),pe=d(l[K],U-1,z-1);return u(u(Z,ee,L),u(re,pe,L),D)}function m(S,C){let I=0,B=.5,U=1;for(let z=0;z<6;z++)I+=B*p(S*U,C*U),U*=2.1,B*=.48;return I}function x(S,C){const B=S+.7*m(S+1.7,C+9.2),U=C+.7*m(S+8.3,C+2.8);return m(B,U)}const v=n.createImageData(s,e),g=v.data,f=.02,_=3,w=-2,E=Math.floor(e*.25),y=Math.floor(e*.5);for(let S=E;S<y;S++){const C=(S-E)/(y-E),I=Math.sin(C*Math.PI);for(let B=0;B<s;B++){const U=B/s*14,z=S/e*6,L=x(U,z),D=Math.min(1,Math.max(0,(L-f)/.18));if(D>.003){const N=x(U+_*.015,z+w*.015),R=Math.min(1,Math.max(0,(N-f)/.18)),K=.65+(1-Math.min(1,R*.7))*.35,Z=D*D*I*.92,ee=(S*s+B)*4;g[ee]=Math.floor(K*255),g[ee+1]=Math.floor(K*255),g[ee+2]=Math.floor(Math.min(1,K+.03)*255),g[ee+3]=Math.floor(Z*255)}}}return n.putImageData(v,0,0),n.filter="blur(4px)",n.drawImage(t,0,0),n.filter="blur(3px)",n.drawImage(t,0,0),n.filter="none",t}const e_=$y(2048,1024),Gl=new cn(e_);Gl.wrapS=Zn;Gl.wrapT=Nt;function t_(s,e){const t=document.createElement("canvas");t.width=s,t.height=e;const n=t.getContext("2d");n.fillStyle="#3a3e48",n.fillRect(0,0,s,e);let i=77;function r(){return i=(i*16807+0)%2147483647,(i-1)/2147483646}const o=256,a=new Uint8Array(o*2),l=[[1,1],[-1,1],[1,-1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]],c=[];for(let f=0;f<o;f++)c.push(f);for(let f=o-1;f>0;f--){const _=Math.floor(r()*(f+1));[c[f],c[_]]=[c[_],c[f]]}for(let f=0;f<o;f++)a[f]=c[f],a[o+f]=c[f];function h(f){return f*f*f*(f*(f*6-15)+10)}function u(f,_,w){return f+w*(_-f)}function d(f,_,w){return f[0]*_+f[1]*w}function p(f,_){const w=Math.floor(f)&255,E=Math.floor(_)&255,y=f-Math.floor(f),S=_-Math.floor(_),C=h(y),I=h(S),B=a[a[w]+E]%12,U=a[a[w]+E+1]%12,z=a[a[w+1]+E]%12,L=a[a[w+1]+E+1]%12,D=d(l[B],y,S),N=d(l[z],y-1,S),R=d(l[U],y,S-1),X=d(l[L],y-1,S-1);return u(u(D,N,C),u(R,X,C),I)}function m(f,_){let w=0,E=.5,y=1;for(let S=0;S<6;S++)w+=E*p(f*y,_*y),y*=2.1,E*=.48;return w}function x(f,_){const E=f+.8*m(f+1.7,_+9.2),y=_+.8*m(f+8.3,_+2.8);return m(E,y)}const v=n.getImageData(0,0,s,e),g=v.data;for(let f=0;f<e;f++){const _=f<e*.12?f/(e*.12):1;for(let w=0;w<s;w++){const E=w/s*6,y=f/e*3,S=x(E,y),C=w/s*16,I=f/e*8,B=m(C+3.1,I+7.4),L=.18+((S*.65+B*.35)*.5+.5)*.38,D=S*.5+.5,N=_*(.82+D*.18),R=(f*s+w)*4;g[R]=Math.floor(L*255),g[R+1]=Math.floor(L*255),g[R+2]=Math.floor(Math.min(1,L+.04)*255),g[R+3]=Math.floor(Math.max(0,Math.min(1,N))*255)}}return n.putImageData(v,0,0),n.filter="blur(4px)",n.drawImage(t,0,0),n.filter="blur(3px)",n.drawImage(t,0,0),n.filter="none",t}const n_=t_(2048,1024),Qu=new cn(n_);Qu.wrapS=Zn;Qu.wrapT=Nt;const $u=new kt(new T(0,1,0),0),hr=new Ru(900,64,40),_n=hr.attributes.position,uo=new Float32Array(_n.count*3);for(let s=0;s<_n.count;s++)uo[s*3]=1,uo[s*3+1]=1,uo[s*3+2]=1;hr.setAttribute("color",new Le(uo,3));const ed=new Float32Array(_n.count);for(let s=0;s<_n.count;s++){const e=_n.getY(s);ed[s]=Math.max(0,Math.min(1,e/900))}const td=new Ut({map:Gl,transparent:!0,depthWrite:!1,side:st,clippingPlanes:[$u],vertexColors:!0}),Vn=new Qe(hr,td);Ae.add(Vn);const It={cover:0,rain:!1,domeRef:Vn,matRef:td};Vn.visible=!1;const i_=new Ru(890,64,40),nd=new Ut({color:14542058,transparent:!0,opacity:0,depthWrite:!1,side:st,fog:!1,clippingPlanes:[$u]}),s_=new Qe(i_,nd);Ae.add(s_);const tt=new gs(16771264,2.5);tt.position.set(-15,60,ut+20);tt.castShadow=!0;const r_=/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)||navigator.maxTouchPoints>1&&window.innerWidth<1200,id=r_?1024:2048;tt.shadow.mapSize.width=id;tt.shadow.mapSize.height=id;tt.shadow.camera.near=.5;tt.shadow.camera.far=500;tt.shadow.camera.left=-130;tt.shadow.camera.right=130;tt.shadow.camera.top=130;tt.shadow.camera.bottom=-60;tt.shadow.bias=-.0015;tt.shadow.normalBias=.3;tt.target.position.set(0,0,ut);Ae.add(tt);Ae.add(tt.target);Ae.add(new Ou(6338784,15259824,.6));Ae.add(new Vu(16777215,.4));const kl=new gs(16765088,.35);kl.position.set(20,30,40);Ae.add(kl);const Vl=new gs(6351072,.6);Vl.position.set(10,-5,-20);Ae.add(Vl);const Wl=new ko(4249800,.4,50);Wl.position.set(0,-6,ut);Ae.add(Wl);const Xl=new ko(6342888,.3,60);Xl.position.set(-15,-8,ut-10);Ae.add(Xl);const oi=new gs(8425656,0);oi.position.set(0,100,ut);oi.castShadow=!1;Ae.add(oi);const Zs=150,Ao=150,ql=150,Yl=150,Dh=Zs+Ao+ql+Yl,o_=["Dawn","Noon","Dusk","Night"],fo=[0,Zs,Zs+Ao,Zs+Ao+ql],Bs=[Zs,Ao,ql,Yl],sd={mobile:{azStart:-10,azEnd:9.5,elevPeak:32},tablet:{azStart:-31,azEnd:30.5,elevPeak:32},desktop:{azStart:-33,azEnd:35,elevPeak:32}},rd={mobile:{azCenter:0,elevBase:28,elevArc:4,azDrift:12},tablet:{azCenter:0,elevBase:24,elevArc:5.5,azDrift:40},desktop:{azCenter:0,elevBase:24,elevArc:5.5,azDrift:40}};function a_(){const s=window.innerWidth,e=window.innerHeight,t=Math.min(s,e),n="ontouchstart"in window||navigator.maxTouchPoints>0;return n&&t<=500?"mobile":n?"tablet":"desktop"}let jl=a_();const Kt=sd[jl],Wn=rd[jl];function WM(s){jl=s;const e=sd[s];Kt.azStart=e.azStart,Kt.azEnd=e.azEnd,Kt.elevPeak=e.elevPeak;const t=rd[s];Wn.azCenter=t.azCenter,Wn.elevBase=t.elevBase,Wn.elevArc=t.elevArc,Wn.azDrift=t.azDrift}const od=[[6,8],[8,19],[19,21],[21,30]];function ad(){const s=new Date;let e=s.getHours()+s.getMinutes()/60+s.getSeconds()/3600;e<6&&(e+=24);for(let t=0;t<4;t++){const[n,i]=od[t];if(e>=n&&e<i){const r=(e-n)/(i-n);return fo[t]+r*Bs[t]}}return 0}const me={cycleTime:ad(),phase:0,phaseT:0,paused:!1,forcedPhase:-1,forcedMoonPhase:-1,_lastForcedMoon:-1,lastFrameTime:-1,sunElevDeg:0,timeLapse:!1},l_=[{p:0,c:[12,15,45]},{p:.08,c:[25,20,60]},{p:.18,c:[50,30,75]},{p:.3,c:[80,40,80]},{p:.42,c:[120,60,75]},{p:.55,c:[170,95,75]},{p:.67,c:[210,140,90]},{p:.78,c:[240,175,120]},{p:.88,c:[255,200,150]},{p:.95,c:[255,215,175]},{p:1,c:[250,200,165]}],Nh=[{p:0,c:[10,30,58]},{p:.08,c:[14,52,104]},{p:.18,c:[26,80,144]},{p:.3,c:[38,112,184]},{p:.42,c:[56,144,208]},{p:.55,c:[80,168,224]},{p:.67,c:[114,192,236]},{p:.78,c:[152,214,244]},{p:.88,c:[188,230,248]},{p:.95,c:[216,240,244]},{p:1,c:[200,228,224]}],c_=[{p:0,c:[10,12,40]},{p:.08,c:[20,18,55]},{p:.18,c:[40,22,65]},{p:.3,c:[90,30,60]},{p:.42,c:[160,50,45]},{p:.55,c:[200,80,40]},{p:.67,c:[230,120,50]},{p:.78,c:[245,155,70]},{p:.88,c:[255,185,100]},{p:.95,c:[255,200,130]},{p:1,c:[240,180,120]}],Fh=[{p:0,c:[2,3,12]},{p:.08,c:[4,6,20]},{p:.18,c:[6,10,30]},{p:.3,c:[8,14,38]},{p:.42,c:[10,18,44]},{p:.55,c:[12,22,50]},{p:.67,c:[14,26,55]},{p:.78,c:[16,30,58]},{p:.88,c:[18,34,60]},{p:.95,c:[16,30,52]},{p:1,c:[12,24,42]}],h_={r:1.4,g:.85,b:.88,specHex:16758944},u_={r:1,g:1,b:1,specHex:16771264},d_={r:1.6,g:.7,b:.65,specHex:16736304},f_={r:.3,g:.4,b:.7,specHex:4219040},no=[h_,u_,d_,f_],p_={col:16756864,int:2.2,hSky:13670512,hGnd:12624e3,hInt:.45,exp:1.8},m_={col:16771264,int:2.5,hSky:6338784,hGnd:15259824,hInt:.6,exp:2},g_={col:16740416,int:2,hSky:12607536,hGnd:10518624,hInt:.35,exp:1.6},x_={col:2113696,int:0,hSky:1054768,hGnd:526352,hInt:.15,exp:.8},io=[p_,m_,g_,x_];let Wi=null;Ae.traverse(s=>{!Wi&&s.isHemisphereLight&&(Wi=s)});function v_(s){const e=document.createElement("canvas");e.width=s,e.height=s;const t=e.getContext("2d"),n=s/2,i=s/2,r=t.createRadialGradient(n,i,0,n,i,n);return r.addColorStop(0,"rgba(255,255,250,1.0)"),r.addColorStop(.04,"rgba(255,250,220,1.0)"),r.addColorStop(.08,"rgba(255,235,160,0.95)"),r.addColorStop(.14,"rgba(255,210,100,0.8)"),r.addColorStop(.22,"rgba(255,180,60,0.55)"),r.addColorStop(.35,"rgba(255,140,30,0.3)"),r.addColorStop(.5,"rgba(255,100,15,0.12)"),r.addColorStop(.7,"rgba(255,70,5,0.04)"),r.addColorStop(1,"rgba(255,40,0,0.0)"),t.fillStyle=r,t.fillRect(0,0,s,s),e}function y_(s){const e=document.createElement("canvas");e.width=s,e.height=s;const t=e.getContext("2d"),n=s/2,i=s/2,r=t.createRadialGradient(n,i,0,n,i,n);return r.addColorStop(0,"rgba(255,245,230,1.0)"),r.addColorStop(.04,"rgba(255,220,160,1.0)"),r.addColorStop(.08,"rgba(255,180,80,0.95)"),r.addColorStop(.14,"rgba(255,130,40,0.8)"),r.addColorStop(.22,"rgba(255,90,20,0.55)"),r.addColorStop(.35,"rgba(255,55,10,0.3)"),r.addColorStop(.5,"rgba(220,30,5,0.14)"),r.addColorStop(.7,"rgba(180,15,0,0.05)"),r.addColorStop(1,"rgba(140,5,0,0.0)"),t.fillStyle=r,t.fillRect(0,0,s,s),e}const ld=new cn(v_(512)),__=new cn(y_(512)),zs=new xr({map:ld,blending:Ht,depthWrite:!1,transparent:!0,opacity:1}),kn=new No(zs);kn.scale.set(50,50,1);kn.position.set(0,200,ut);Ae.add(kn);const M_=Date.UTC(2e3,0,6,18,14,0),so=29.53058770576,w_=864e5;function al(s){const t=((s.getTime()-M_)/w_%so+so)%so/so,n=(1-Math.cos(t*2*Math.PI))/2;let i;return t<.0625?i="New Moon":t<.1875?i="Waxing Crescent":t<.3125?i="First Quarter":t<.4375?i="Waxing Gibbous":t<.5625?i="Full Moon":t<.6875?i="Waning Gibbous":t<.8125?i="Last Quarter":t<.9375?i="Waning Crescent":i="New Moon",{phase:t,illumination:n,name:i}}let Mt=al(new Date),Bh=-1;function b_(s){const e=document.createElement("canvas");e.width=s,e.height=s;const t=e.getContext("2d"),n=s/2,i=s/2,r=s*.38;let o=42;function a(){return o=(o*16807+0)%2147483647,(o&2147483647)/2147483647}t.beginPath(),t.arc(n,i,r,0,Math.PI*2),t.fillStyle="rgb(210, 212, 218)",t.fill(),t.save(),t.beginPath(),t.arc(n,i,r,0,Math.PI*2),t.clip();const l=[{x:-.18,y:-.3,rx:.22,ry:.16,c:"rgba(120,125,140,0.55)"},{x:.05,y:-.12,rx:.13,ry:.18,c:"rgba(130,133,148,0.45)"},{x:.18,y:.05,rx:.15,ry:.2,c:"rgba(125,128,143,0.50)"},{x:-.05,y:.15,rx:.2,ry:.12,c:"rgba(135,138,150,0.40)"},{x:-.25,y:0,rx:.1,ry:.14,c:"rgba(128,131,145,0.45)"},{x:.1,y:-.32,rx:.1,ry:.08,c:"rgba(130,135,148,0.40)"},{x:.3,y:.05,rx:.08,ry:.12,c:"rgba(125,130,142,0.50)"},{x:-.1,y:.3,rx:.12,ry:.08,c:"rgba(132,135,148,0.35)"}];for(const m of l){t.save(),t.translate(n+m.x*r,i+m.y*r),t.rotate(a()*.5-.25),t.beginPath(),t.ellipse(0,0,m.rx*r,m.ry*r,0,0,Math.PI*2);const x=t.createRadialGradient(0,0,0,0,0,Math.max(m.rx,m.ry)*r);x.addColorStop(0,m.c),x.addColorStop(.6,m.c),x.addColorStop(1,m.c.replace(/[\d.]+\)$/,"0.0)")),t.fillStyle=x,t.fill(),t.restore()}for(let m=0;m<35;m++){const x=a()*Math.PI*2,v=a()*.85,g=n+Math.cos(x)*v*r,f=i+Math.sin(x)*v*r,_=(1.5+a()*5)*(s/256);t.beginPath(),t.arc(g,f,_*1.3,0,Math.PI*2),t.fillStyle="rgba(230,232,240,"+(.15+a()*.15)+")",t.fill(),t.beginPath(),t.arc(g+_*.2,f+_*.2,_,0,Math.PI*2),t.fillStyle="rgba(140,145,160,"+(.2+a()*.2)+")",t.fill()}const c=[{x:-.05,y:.32,r:.035},{x:-.2,y:-.08,r:.03}];for(const m of c){const x=n+m.x*r,v=i+m.y*r,g=m.r*r;for(let f=0;f<6;f++){const _=f*Math.PI/3+a()*.3,w=g*(4+a()*5);t.beginPath(),t.moveTo(x,v),t.lineTo(x+Math.cos(_)*w,v+Math.sin(_)*w),t.lineWidth=g*.5,t.strokeStyle="rgba(220,222,235,0.12)",t.stroke()}t.beginPath(),t.arc(x,v,g,0,Math.PI*2),t.fillStyle="rgba(235,237,248,0.7)",t.fill()}const h=t.getImageData(0,0,s,s),u=h.data;for(let m=0;m<u.length;m+=4){const x=m/4%s,v=Math.floor(m/4/s),g=x-n,f=v-i;if(g*g+f*f>r*r)continue;const w=(a()-.5)*12;u[m]=Math.min(255,Math.max(0,u[m]+w)),u[m+1]=Math.min(255,Math.max(0,u[m+1]+w)),u[m+2]=Math.min(255,Math.max(0,u[m+2]+w))}t.putImageData(h,0,0),t.globalCompositeOperation="multiply";const d=t.createRadialGradient(n,i,r*.15,n,i,r);d.addColorStop(0,"rgba(255,255,255,1.0)"),d.addColorStop(.5,"rgba(245,246,250,1.0)"),d.addColorStop(.75,"rgba(210,215,230,1.0)"),d.addColorStop(.9,"rgba(140,150,180,1.0)"),d.addColorStop(1,"rgba(60,70,100,1.0)"),t.fillStyle=d,t.fillRect(0,0,s,s),t.restore(),t.globalCompositeOperation="destination-out";const p=t.createRadialGradient(n,i,r*.82,n,i,r*1.02);return p.addColorStop(0,"rgba(0,0,0,0.0)"),p.addColorStop(1,"rgba(0,0,0,0.7)"),t.fillStyle=p,t.fillRect(0,0,s,s),t.globalCompositeOperation="source-over",e}function S_(s){const e=document.createElement("canvas");e.width=s,e.height=s;const t=e.getContext("2d"),n=s/2,i=s/2,r=t.createRadialGradient(n,i,0,n,i,n);return r.addColorStop(0,"rgba(220, 225, 245, 0.7)"),r.addColorStop(.06,"rgba(200, 210, 240, 0.5)"),r.addColorStop(.14,"rgba(170, 185, 230, 0.3)"),r.addColorStop(.25,"rgba(140, 160, 215, 0.15)"),r.addColorStop(.4,"rgba(110, 135, 200, 0.06)"),r.addColorStop(.6,"rgba(80, 105, 180, 0.02)"),r.addColorStop(1,"rgba(50, 70, 150, 0.0)"),t.fillStyle=r,t.fillRect(0,0,s,s),e}const sn=document.createElement("canvas");sn.width=512;sn.height=512;const Ze=sn.getContext("2d");function Js(s,e){if(Ze.clearRect(0,0,512,512),e>.47&&e<.53)return Ze.drawImage(s,0,0,512,512),sn;if(e<.02||e>.98)return sn;const o=Math.cos(e*2*Math.PI),a=Math.abs(o)*194.56,l=e<=.5;Ze.save(),Ze.beginPath(),l?o>=0?(Ze.arc(256,256,194.56,-Math.PI/2,Math.PI/2,!1),Ze.ellipse(256,256,a,194.56,0,Math.PI/2,-Math.PI/2,!0)):(Ze.arc(256,256,194.56,-Math.PI/2,Math.PI/2,!1),Ze.moveTo(256,256+194.56),Ze.ellipse(256,256,a,194.56,0,Math.PI/2,-Math.PI/2,!1)):o>=0?(Ze.arc(256,256,194.56,Math.PI/2,-Math.PI/2,!1),Ze.ellipse(256,256,a,194.56,0,-Math.PI/2,Math.PI/2,!0)):(Ze.arc(256,256,194.56,Math.PI/2,-Math.PI/2,!1),Ze.ellipse(256,256,a,194.56,0,-Math.PI/2,Math.PI/2,!1)),Ze.closePath(),Ze.clip(),Ze.drawImage(s,0,0,512,512),Ze.restore();const c=10,h=64;Ze.save(),Ze.beginPath(),Ze.arc(256,256,194.56,0,Math.PI*2),Ze.closePath(),Ze.clip(),Ze.globalCompositeOperation="destination-out";for(let u=0;u<h;u++){const d=(u+.5)/h,p=-Math.PI/2+d*Math.PI,v=256+(l&&o>=0||!l&&o<0?1:-1)*Math.cos(p)*a,g=256+Math.sin(p)*194.56,f=Ze.createRadialGradient(v,g,0,v,g,c);f.addColorStop(0,"rgba(0,0,0,0.5)"),f.addColorStop(.5,"rgba(0,0,0,0.2)"),f.addColorStop(1,"rgba(0,0,0,0.0)"),Ze.fillStyle=f,Ze.fillRect(v-c,g-c,c*2,c*2)}return Ze.restore(),sn}const cd=b_(512);let po=cd;const vn=new cn(Js(cd,Mt.phase)),hd=new xr({map:vn,blending:Mn,depthWrite:!1,transparent:!0,opacity:0});new Cl().load("./assets/moon.png",s=>{const e=s.image,t=document.createElement("canvas");t.width=512,t.height=512,t.getContext("2d").drawImage(e,0,0,512,512),po=t,Js(t,Mt.phase),vn.image=sn,vn.needsUpdate=!0});const di=new No(hd);di.scale.set(18,18,1);di.position.set(0,-200,ut);di.visible=!1;di.renderOrder=-1;Ae.add(di);const T_=new cn(S_(256)),ud=new xr({map:T_,blending:Ht,depthWrite:!1,transparent:!0,opacity:0}),fi=new No(ud);fi.scale.set(80,80,1);fi.position.set(0,-200,ut);fi.visible=!1;fi.renderOrder=-1;Ae.add(fi);const Ga=new T,yr=2580,bt=new Float32Array(yr*3),Xo=new Float32Array(yr),wt=new Float32Array(yr*3),qo=new Float32Array(yr),Yo=new Float32Array(yr),rn=480;function dd(s,e){const t=s/24*Math.PI*2,n=e*Math.PI/180,i=-16*Math.PI/180,r=Math.sin(n)*Math.sin(i)+Math.cos(n)*Math.cos(i),o=Math.asin(Math.max(-1,Math.min(1,r)));if(o<-.05)return null;const a=t,l=Math.PI/2-o;return{x:rn*Math.sin(l)*Math.cos(a),y:rn*Math.cos(l),z:rn*Math.sin(l)*Math.sin(a)}}for(let s=0;s<2500;s++){const e=Math.random()*Math.PI*2;let t;s<800?t=.25+(Math.random()-.5)*.22:t=Math.random()*Math.PI*.48;const n=Math.sin(t)*Math.cos(e),i=Math.cos(t),r=Math.sin(t)*Math.sin(e);bt[s*3]=n*rn,bt[s*3+1]=i*rn,bt[s*3+2]=r*rn;const o=Math.random();Xo[s]=o<.6?.6+Math.random()*.6:o<.85?1.2+Math.random()*1:o<.96?2.2+Math.random()*1.3:3.5+Math.random()*1.5;const a=Math.random();a<.25?(wt[s*3]=1,wt[s*3+1]=.82+Math.random()*.08,wt[s*3+2]=.6+Math.random()*.15):a<.65?(wt[s*3]=1,wt[s*3+1]=.95+Math.random()*.05,wt[s*3+2]=.9+Math.random()*.1):(wt[s*3]=.72+Math.random()*.1,wt[s*3+1]=.8+Math.random()*.1,wt[s*3+2]=1),qo[s]=Math.random()*Math.PI*2,Yo[s]=.3+Math.random()*2}const zh=[[6.75,-17,6,.7,.8,1],[6.4,-53,5.5,1,.95,.8],[14.66,-61,5,1,.92,.7],[1.63,-57,4.5,.75,.82,1],[22.96,-30,4,1,1,1],[16.49,-26,4.5,1,.6,.3],[13.42,-11,4,.75,.8,1],[5.24,-8,5,.7,.8,1],[5.92,7,5,1,.65,.3],[4.6,16,4,1,.75,.45],[7.75,28,3.5,1,.82,.55],[19.85,9,4,1,1,.95],[12.44,-63,4.5,.75,.82,1],[12.79,-60,4,.75,.82,1],[14.06,-60,4.5,.7,.78,1],[7.65,5,4,1,.95,.75],[10.14,12,3.5,.78,.84,1],[14.26,19,4,1,.72,.35],[18.62,39,3.5,.78,.85,1],[20.69,45,3,1,1,.95]];for(let s=0;s<zh.length;s++){const e=2500+s,[t,n,i,r,o,a]=zh[s],l=dd(t,n);if(l)bt[e*3]=l.x,bt[e*3+1]=l.y,bt[e*3+2]=l.z;else{const c=t/24*Math.PI*2;bt[e*3]=rn*Math.cos(c),bt[e*3+1]=5,bt[e*3+2]=rn*Math.sin(c)}Xo[e]=i,wt[e*3]=r,wt[e*3+1]=o,wt[e*3+2]=a,qo[e]=Math.random()*Math.PI*2,Yo[e]=.3+Math.random()*.5}const Oh=[[5.42,-1.2,2.8,.75,.82,1],[5.6,-1.95,3,.78,.84,1],[5.68,-1.94,2.8,.75,.82,1],[5.42,6.35,3.2,.72,.8,1],[5.8,-9.67,2.8,.7,.78,1],[16.01,-22.6,2.5,.78,.82,1],[16.09,-19.8,2.2,.8,.84,1],[16.36,-25.6,2,.78,.8,1],[16.84,-34.3,2.3,.76,.8,1],[17.2,-37.3,2,.74,.78,1],[17.42,-37.1,2,.74,.78,1],[17.56,-37,2.5,.78,.82,1],[17.62,-43,3,.8,.85,1],[17.71,-39,3.2,.72,.8,1],[12.52,-57.1,3,1,.7,.35],[12.25,-58.7,2.5,.75,.82,1],[6.38,-18,2.8,.72,.8,1],[7.14,-26.4,2.5,1,.92,.7],[6.98,-29,2.8,.72,.78,1],[7.4,-29.3,2.2,.7,.78,1],[5.44,28.6,2.8,.72,.78,1],[4.33,15.6,2.2,1,.9,.7],[4.48,19.2,2,.85,.82,.7],[11.24,20.5,2.5,.8,.85,1],[10.33,19.8,2.2,.85,.88,1],[10.28,23.4,2,.8,.84,1],[10.14,16.8,2.2,.82,.86,1],[9.88,26,2,.78,.82,1],[7.58,32,3,.8,.85,1],[6.73,25.1,2,.82,.85,1],[6.38,22.5,2,.8,.84,1],[13.93,-42.1,2.5,.78,.82,1],[14.11,-36.4,2,.75,.8,1],[11.06,61.75,3.5,1,.9,.65],[11.03,56.38,3.2,.82,.85,1],[11.9,53.69,3,.82,.85,1],[12.26,57.03,2.8,.8,.84,1],[12.9,55.96,3.2,.82,.86,1],[13.4,54.93,3.2,.82,.86,1],[13.79,49.31,3,.8,.84,1]];for(let s=0;s<Oh.length;s++){const e=2520+s,[t,n,i,r,o,a]=Oh[s],l=dd(t,n);if(l)bt[e*3]=l.x,bt[e*3+1]=l.y,bt[e*3+2]=l.z;else{const c=t/24*Math.PI*2;bt[e*3]=rn*Math.cos(c),bt[e*3+1]=5,bt[e*3+2]=rn*Math.sin(c)}Xo[e]=i,wt[e*3]=r,wt[e*3+1]=o,wt[e*3+2]=a,qo[e]=Math.random()*Math.PI*2,Yo[e]=.3+Math.random()*.5}const xs=new Be;xs.setAttribute("position",new Le(bt,3));xs.setAttribute("aSize",new Le(Xo,1));xs.setAttribute("aColor",new Le(wt,3));xs.setAttribute("aPhase",new Le(qo,1));xs.setAttribute("aSpeed",new Le(Yo,1));const E_=`
  uniform float uTime;
  uniform float uOpacity;
  uniform float uPixelRatio;
  uniform vec4 uMoonClip;
  attribute float aSize;
  attribute vec3 aColor;
  attribute float aPhase;
  attribute float aSpeed;
  varying vec3 vColor;
  varying float vTwinkle;
  varying float vSize;
  varying vec2 vScreenPos;
  void main() {
    vColor = aColor;
    // Dual-wave twinkle — some stars barely flicker, others pulse noticeably
    float t1 = sin(uTime * aSpeed + aPhase) * 0.5 + 0.5;
    float t2 = sin(uTime * aSpeed * 1.7 + aPhase * 2.3) * 0.5 + 0.5;
    vTwinkle = 0.5 + 0.5 * t1 * t2;
    vSize = aSize;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    // Direct pixel sizing — aSize IS the screen pixel diameter
    gl_PointSize = aSize * uPixelRatio;
    gl_Position = projectionMatrix * mvPosition;
    vScreenPos = gl_Position.xy / gl_Position.w;
  }
`,A_=`
  uniform float uOpacity;
  uniform vec4 uMoonClip;
  varying vec3 vColor;
  varying float vTwinkle;
  varying float vSize;
  varying vec2 vScreenPos;
  void main() {
    // Discard stars behind the moon disc (uMoonClip = moonScreenX, moonScreenY, radius, active)
    if (uMoonClip.w > 0.5) {
      float dMoon = length(vScreenPos - uMoonClip.xy);
      if (dMoon < uMoonClip.z) discard;
    }
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    if (dist > 0.5) discard;
    // Bright core with soft glow halo — bigger stars get a wider glow
    float core = exp(-dist * dist * 18.0);   // tight bright center
    float glow = exp(-dist * dist * 5.0);    // softer halo
    float alpha = mix(glow, core, 0.6);
    // Brighter stars get boosted intensity (non-linear)
    float brightBoost = 1.0 + step(5.0, vSize) * 0.4;
    gl_FragColor = vec4(vColor * vTwinkle * brightBoost, alpha * uOpacity * vTwinkle);
  }
`,Os=new vt({uniforms:{uTime:{value:0},uOpacity:{value:0},uPixelRatio:{value:yt.getPixelRatio()},uMoonClip:{value:new qe(0,0,0,0)}},vertexShader:E_,fragmentShader:A_,transparent:!0,blending:Ht,depthWrite:!1}),Lo=new ds(xs,Os);Lo.renderOrder=-2;Ae.add(Lo);const Ks=20,L_=new Float32Array(Ks*3),C_=new Float32Array(Ks),ai=new Be;ai.setAttribute("position",new Le(L_,3));ai.setAttribute("aAlpha",new Le(C_,1));const R_=`
  attribute float aAlpha;
  varying float vAlpha;
  void main() {
    vAlpha = aAlpha;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,P_=`
  varying float vAlpha;
  void main() {
    gl_FragColor = vec4(1.0, 0.98, 0.9, vAlpha);
  }
`,I_=new vt({vertexShader:R_,fragmentShader:P_,transparent:!0,blending:Ht,depthWrite:!1}),Zi=new vr(ai,I_);Zi.visible=!1;Zi.frustumCulled=!1;Ae.add(Zi);const Ue={active:!1,startTime:0,duration:0,startPos:[0,0,0],dir:[0,0,0],speed:0,nextSpawnTime:0,spawnCount:0},jo=new Bo(500,500,30,48,6,!0),Co=jo.attributes.position,fd=new Float32Array(Co.count),mo=new Float32Array(Co.count*3);for(let s=0;s<Co.count;s++){const t=(Co.getY(s)+15)/30,n=.3,i=.22;fd[s]=Math.exp(-((t-n)*(t-n))/(2*i*i));const r=Math.exp(-((t-.25)*(t-.25))/.08);mo[s*3]=.08+r*.1,mo[s*3+1]=.1+r*.05,mo[s*3+2]=.25+(1-t)*.1}jo.setAttribute("aAlpha",new Le(fd,1));const D_=`
  attribute float aAlpha;
  attribute vec3 color;
  varying float vAlpha;
  varying vec3 vCol;
  void main() {
    vAlpha = aAlpha;
    vCol = color;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,N_=`
  uniform float uOpacity;
  varying float vAlpha;
  varying vec3 vCol;
  void main() {
    gl_FragColor = vec4(vCol, vAlpha * uOpacity);
  }
`;jo.setAttribute("color",new Le(mo,3));const pd=new vt({uniforms:{uOpacity:{value:0}},vertexShader:D_,fragmentShader:N_,transparent:!0,blending:Ht,depthWrite:!1,side:st}),Zl=new Qe(jo,pd);Zl.position.set(0,-4,0);Zl.renderOrder=-3;Ae.add(Zl);const Zo=document.createElement("canvas");Zo.width=4;Zo.height=512;const li=Zo.getContext("2d"),_i=li.createLinearGradient(0,0,0,512);_i.addColorStop(0,"#28d8cc");_i.addColorStop(.15,"#20c0b4");_i.addColorStop(.35,"#18a89c");_i.addColorStop(.55,"#109080");_i.addColorStop(.75,"#087868");_i.addColorStop(1,"#046050");li.fillStyle=_i;li.fillRect(0,0,4,512);const md=new cn(Zo),gd=new Qe(new Bo(250,250,40,32,1,!0),new Ut({map:md,side:st,depthWrite:!1}));gd.position.set(0,-20,0);Ae.add(gd);const ur=new Bo(520,520,18,64,8,!0),os=ur.attributes.position,Xi=new Float32Array(os.count*4);for(let s=0;s<os.count;s++){const t=(os.getY(s)+9)/18,n=.35,i=.28,r=Math.exp(-((t-n)*(t-n))/(2*i*i));Xi[s*4]=1,Xi[s*4+1]=.7,Xi[s*4+2]=.5,Xi[s*4+3]=r*.6}ur.setAttribute("color",new Le(Xi,4));const F_=new Ut({vertexColors:!0,transparent:!0,depthWrite:!1,side:st,blending:Mn}),Jl=new Qe(ur,F_);Jl.position.set(0,0,0);Jl.renderOrder=0;Ae.add(Jl);const xd=new Float32Array(os.count);for(let s=0;s<os.count;s++)xd[s]=Xi[s*4+3];const an=new cs(1200,1200,80,60),wn=new Float32Array(an.attributes.position.count*3),ka=an.attributes.position;for(let s=0;s<ka.count;s++){const e=ka.getX(s),t=ka.getY(s),n=Math.sqrt(e*e+t*t),i=Math.min(1,n/500);let r,o,a;if(i<.3)r=.09,o=.75,a=.72;else{const l=(i-.3)/.7;r=.09+(.04-.09)*l,o=.75+(.3-.75)*l,a=.72+(.5-.72)*l}wn[s*3]=r,wn[s*3+1]=o,wn[s*3+2]=a}an.setAttribute("color",new Le(wn,3));const ui=new Float32Array(wn.length);ui.set(wn);const Un=new Uo({vertexColors:!0,transparent:!0,opacity:.55,roughness:.01,metalness:.25,clearcoat:1,side:ln,depthWrite:!1}),Kl=new kt(new T(0,0,-1),0);Un.clippingPlanes=[Kl];const Jo=new Qe(an,Un);Jo.rotation.x=-Math.PI/2;Jo.position.set(0,0,ut);Jo.renderOrder=1;Ae.add(Jo);const vd=`
  #include <clipping_planes_pars_vertex>
  varying vec2 vUv;
  varying vec3 vWorldPos;
  varying vec3 vNormal;
  void main() {
    vUv = uv;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = viewMatrix * wp;
    gl_Position = projectionMatrix * mvPosition;
    #include <clipping_planes_vertex>
  }
`,B_=`
  #include <clipping_planes_pars_fragment>
  uniform float uTime;
  uniform vec3 uSunDir;
  uniform vec3 uCamPos;
  uniform vec3 uSunColor;
  uniform float uSunIntensity;
  uniform vec3 uSunWorldPos;
  varying vec3 vWorldPos;
  varying vec3 vNormal;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  void main() {
    #include <clipping_planes_fragment>
    vec3 viewDir = normalize(uCamPos - vWorldPos);
    vec3 sunDir = normalize(uSunDir);
    float sunElev = clamp(sunDir.y, 0.0, 1.0);
    float lowSun = 1.0 - sunElev;

    // === GLITTER PATH GEOMETRY ===
    // Project sun & camera onto water plane
    vec2 sunXZ = uSunWorldPos.xz;
    vec2 camXZ = uCamPos.xz;
    vec2 pathAxis = normalize(sunXZ - camXZ);
    vec2 fragRel = vWorldPos.xz - camXZ;

    // Decompose fragment position into along-path and perpendicular
    float along = dot(fragRel, pathAxis);
    float perp = abs(dot(fragRel, vec2(-pathAxis.y, pathAxis.x)));

    // Path width: narrows dramatically at low sun (physics: width/length = sin(elev))
    // At near-zero elevation: very tight column ~5-10 units wide
    // At zenith: wide circular spread ~150 units
    float pathHalfWidth = max(3.0, 150.0 * sunElev * sunElev + 5.0);

    // Lateral falloff: sharp Gaussian for the column edges
    float lateralSharp = mix(1.5, 0.4, lowSun * lowSun); // sharper at low sun
    float lateral = exp(-pow(perp / pathHalfWidth, lateralSharp));

    // Distance from sun projected on water
    float distToSun = length(vWorldPos.xz - sunXZ);
    // Along-path falloff: bright near sun, fading toward camera
    float pathReach = mix(150.0, 500.0, lowSun);
    float alongFade = exp(-distToSun * distToSun / (pathReach * pathReach));
    // Keep some light even far from sun for the long column look
    float alongBase = mix(0.0, 0.15, lowSun) * exp(-distToSun / 800.0);
    float alongTotal = max(alongFade, alongBase);

    // Column mask: strongest at low sun
    float columnMask = lateral * alongTotal;

    // === WAVE-PERTURBED SPECULAR ===
    vec3 n = vNormal;
    float t = uTime;
    // Multi-octave wave perturbation
    float perturbAmt = 0.05 + lowSun * 0.15;
    n.x += sin(vWorldPos.x * 1.5 + t * 2.2) * perturbAmt
         + cos(vWorldPos.z * 1.0 + t * 1.6) * perturbAmt * 0.7
         + sin(vWorldPos.x * 3.8 + t * 3.5) * perturbAmt * 0.35
         + cos(vWorldPos.x * 8.0 + t * 5.0) * perturbAmt * 0.15;
    n.z += cos(vWorldPos.x * 1.3 + t * 1.8) * perturbAmt * 0.8
         + sin(vWorldPos.z * 1.7 + t * 1.3) * perturbAmt * 0.6
         + cos(vWorldPos.z * 4.2 + t * 3.0) * perturbAmt * 0.3
         + sin(vWorldPos.z * 9.0 + t * 4.5) * perturbAmt * 0.12;
    n = normalize(n);

    // Blinn-Phong specular: tight at high sun, broader at low
    vec3 halfDir = normalize(sunDir + viewDir);
    float specExp = mix(16.0, 180.0, sunElev);
    float spec = pow(max(dot(n, halfDir), 0.0), specExp);

    // Broad diffuse glow for column body
    float glowExp = mix(2.0, 10.0, sunElev);
    float glowStr = mix(0.6, 0.1, sunElev);
    float glow = pow(max(dot(n, halfDir), 0.0), glowExp) * glowStr;

    // === HORIZONTAL WAVE STRIATIONS ===
    // Bands of brightness across the column from wave crests
    float striation1 = sin(vWorldPos.z * 0.8 + t * 1.5) * 0.5 + 0.5;
    float striation2 = sin(vWorldPos.z * 2.2 - t * 0.8) * 0.5 + 0.5;
    float striation3 = sin(vWorldPos.z * 5.5 + t * 2.5) * 0.5 + 0.5;
    float striations = striation1 * 0.5 + striation2 * 0.3 + striation3 * 0.2;
    // Striations more visible at low sun along the column
    float striationMix = lowSun * lowSun * lateral * 0.6;
    float striationMod = mix(1.0, 0.3 + striations * 1.4, striationMix);

    // Fresnel: more reflective at grazing angles
    float fresnel = pow(1.0 - max(dot(viewDir, n), 0.0), 2.0 + sunElev * 2.0);

    // === SPARKLE GLINTS ===
    float sparkleScale = mix(3.5, 6.0, sunElev);
    vec2 sparkleUV = floor(vWorldPos.xz * sparkleScale + t * 1.2);
    float sp1 = hash(sparkleUV);
    float sp2 = hash(sparkleUV + vec2(37.0, 59.0));
    float sparkleThresh = mix(0.85, 0.95, sunElev);
    float sparkle = step(sparkleThresh, sp1) * (0.5 + 0.5 * sp2);
    // Sparkles concentrate within the column
    sparkle *= mix(0.1, 1.0, lateral);
    // Extra bright sparkles near the sun
    sparkle *= (0.4 + 0.6 * alongFade);

    // === FINAL COMBINE ===
    float base = (spec * 1.4 + glow + sparkle * 0.7) * (0.2 + fresnel * 0.8);
    base *= striationMod;

    // At low sun: column mask strongly shapes the light into a path
    // At high sun: more uniform specular
    float columnInfluence = lowSun * lowSun * 0.9 + 0.1;
    float shaped = base * mix(1.0, columnMask * 2.5, columnInfluence);

    float total = clamp(shaped * uSunIntensity, 0.0, 1.5);

    gl_FragColor = vec4(uSunColor * total, total);
  }
`,Us=new vt({uniforms:{uTime:{value:0},uSunDir:{value:new T(.5,.8,.3)},uCamPos:{value:new T},uSunColor:{value:new T(1,.95,.85)},uSunIntensity:{value:.75},uSunWorldPos:{value:new T(0,200,0)}},vertexShader:vd,fragmentShader:B_,transparent:!0,blending:Ht,depthWrite:!1,side:ln,clipping:!0,clippingPlanes:[Kl]}),pi=new Qe(an.clone(),Us);pi.rotation.x=-Math.PI/2;pi.position.set(0,.05,ut);pi.renderOrder=2;pi.visible=!1;Ae.add(pi);const z_=`
  #include <clipping_planes_pars_fragment>
  uniform float uTime;
  uniform vec3 uMoonDir;
  uniform vec3 uCamPos;
  uniform vec3 uMoonColor;
  uniform float uMoonIntensity;
  uniform vec3 uMoonWorldPos;
  varying vec3 vWorldPos;
  varying vec3 vNormal;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  void main() {
    #include <clipping_planes_fragment>
    vec3 viewDir = normalize(uCamPos - vWorldPos);
    vec3 lightDir = normalize(uMoonDir);
    float lightElev = clamp(lightDir.y, 0.0, 1.0);
    float lowLight = 1.0 - lightElev;

    // === GLITTER PATH GEOMETRY ===
    vec2 lightXZ = uMoonWorldPos.xz;
    vec2 camXZ = uCamPos.xz;
    vec2 pathAxis = normalize(lightXZ - camXZ);
    vec2 fragRel = vWorldPos.xz - camXZ;

    float along = dot(fragRel, pathAxis);
    float perp = abs(dot(fragRel, vec2(-pathAxis.y, pathAxis.x)));

    float pathHalfWidth = max(3.0, 150.0 * lightElev * lightElev + 5.0);

    float lateralSharp = mix(1.5, 0.4, lowLight * lowLight);
    float lateral = exp(-pow(perp / pathHalfWidth, lateralSharp));

    float distToLight = length(vWorldPos.xz - lightXZ);
    float pathReach = mix(150.0, 500.0, lowLight);
    float alongFade = exp(-distToLight * distToLight / (pathReach * pathReach));
    float alongBase = mix(0.0, 0.15, lowLight) * exp(-distToLight / 800.0);
    float alongTotal = max(alongFade, alongBase);

    float columnMask = lateral * alongTotal;

    // === WAVE-PERTURBED SPECULAR ===
    vec3 n = vNormal;
    float t = uTime;
    float perturbAmt = 0.05 + lowLight * 0.15;
    n.x += sin(vWorldPos.x * 1.5 + t * 2.2) * perturbAmt
         + cos(vWorldPos.z * 1.0 + t * 1.6) * perturbAmt * 0.7
         + sin(vWorldPos.x * 3.8 + t * 3.5) * perturbAmt * 0.35
         + cos(vWorldPos.x * 8.0 + t * 5.0) * perturbAmt * 0.15;
    n.z += cos(vWorldPos.x * 1.3 + t * 1.8) * perturbAmt * 0.8
         + sin(vWorldPos.z * 1.7 + t * 1.3) * perturbAmt * 0.6
         + cos(vWorldPos.z * 4.2 + t * 3.0) * perturbAmt * 0.3
         + sin(vWorldPos.z * 9.0 + t * 4.5) * perturbAmt * 0.12;
    n = normalize(n);

    vec3 halfDir = normalize(lightDir + viewDir);
    float specExp = mix(16.0, 180.0, lightElev);
    float spec = pow(max(dot(n, halfDir), 0.0), specExp);

    float glowExp = mix(2.0, 10.0, lightElev);
    float glowStr = mix(0.6, 0.1, lightElev);
    float glow = pow(max(dot(n, halfDir), 0.0), glowExp) * glowStr;

    // === HORIZONTAL WAVE STRIATIONS ===
    float striation1 = sin(vWorldPos.z * 0.8 + t * 1.5) * 0.5 + 0.5;
    float striation2 = sin(vWorldPos.z * 2.2 - t * 0.8) * 0.5 + 0.5;
    float striation3 = sin(vWorldPos.z * 5.5 + t * 2.5) * 0.5 + 0.5;
    float striations = striation1 * 0.5 + striation2 * 0.3 + striation3 * 0.2;
    float striationMix = lowLight * lowLight * lateral * 0.6;
    float striationMod = mix(1.0, 0.3 + striations * 1.4, striationMix);

    float fresnel = pow(1.0 - max(dot(viewDir, n), 0.0), 2.0 + lightElev * 2.0);

    // === SPARKLE GLINTS ===
    float sparkleScale = mix(3.5, 6.0, lightElev);
    vec2 sparkleUV = floor(vWorldPos.xz * sparkleScale + t * 1.2);
    float sp1 = hash(sparkleUV);
    float sp2 = hash(sparkleUV + vec2(37.0, 59.0));
    float sparkleThresh = mix(0.85, 0.95, lightElev);
    float sparkle = step(sparkleThresh, sp1) * (0.5 + 0.5 * sp2);
    sparkle *= mix(0.1, 1.0, lateral);
    sparkle *= (0.4 + 0.6 * alongFade);

    // === FINAL COMBINE ===
    float base = (spec * 1.4 + glow + sparkle * 0.7) * (0.2 + fresnel * 0.8);
    base *= striationMod;

    float columnInfluence = lowLight * lowLight * 0.9 + 0.1;
    float shaped = base * mix(1.0, columnMask * 2.5, columnInfluence);

    float total = clamp(shaped * uMoonIntensity, 0.0, 1.0);

    gl_FragColor = vec4(uMoonColor * total, total);
  }
`,go=new vt({uniforms:{uTime:{value:0},uMoonDir:{value:new T(0,1,0)},uCamPos:{value:new T},uMoonColor:{value:new T(.6,.65,.85)},uMoonIntensity:{value:0},uMoonWorldPos:{value:new T(0,200,0)}},vertexShader:vd,fragmentShader:z_,transparent:!0,blending:Ht,depthWrite:!1,side:ln,clipping:!0,clippingPlanes:[Kl]}),mi=new Qe(an.clone(),go);mi.rotation.x=-Math.PI/2;mi.position.set(0,.04,ut);mi.renderOrder=2;mi.visible=!1;Ae.add(mi);const ro=new T,Uh=new T,Tn=new cs(800,.35,80,6),Hs=new Float32Array(Tn.attributes.position.count*4),ll=Tn.attributes.position;for(let s=0;s<ll.count;s++){const e=ll.getY(s),t=Math.abs(e)/.175,n=Math.max(0,1-t*t*t);Hs[s*4]=.09,Hs[s*4+1]=.75,Hs[s*4+2]=.72,Hs[s*4+3]=n*.6}Tn.setAttribute("color",new Le(Hs,4));const O_=new Ut({vertexColors:!0,transparent:!0,depthWrite:!1,side:ln,blending:Mn}),Ql=new Qe(Tn,O_);Ql.position.set(0,0,0);Ql.renderOrder=3;Ae.add(Ql);const U_=new Float32Array(Tn.attributes.position.count);for(let s=0;s<Tn.attributes.position.count;s++)U_[s]=Tn.attributes.position.getY(s);const bn=an.attributes.position,H_=new Float32Array(bn.count);for(let s=0;s<bn.count;s++)H_[s]=bn.getZ(s);function $l(s){let e=s|0;return function(){e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}const ec=4096,yd=new Float32Array(ec);{const s=$l(Gn*2654435761+1);for(let e=0;e<ec;e++)yd[e]=s()}function oo(s,e){return yd[(Math.floor(s*7919)+Math.floor(e*104729)&2147483647)%ec]}function Ot(s,e,t){const n=s*t,i=e*t,r=Math.floor(n),o=Math.floor(i),a=n-r,l=i-o,c=a*a*(3-2*a),h=l*l*(3-2*l),u=oo(r,o),d=oo(r+1,o),p=oo(r,o+1),m=oo(r+1,o+1),x=u+(d-u)*c,v=p+(m-p)*c;return x+(v-x)*h}const Qs=-242,Ji=158,Ui=5,G_=$l(Gn*1597334677+2),k_=5,V_=30,W_=250,X_=500,q_=5,Y_=18,j_=250,Z_=500,J_=.5,K_=3,Q_=40,$_=400,eM=1,tM=8,nM=30,iM=500,_d=Ji-(Ji-Qs)*.2,cl=80,sM=_d-cl,rM=25,hl=new Float32Array(64);for(let s=0;s<64;s++)hl[s]=G_();function Hh(s,e){const n=(Math.atan2(e-(Qs+Ji)*.5,s)+Math.PI)/(2*Math.PI)*64,i=Math.floor(n)&63,r=n-Math.floor(n),o=hl[i],a=hl[i+1&63];return o+(a-o)*r}const qi=10,Va=5,Wa=-8,ci=-18,Xn=-30,_r=new cs(1800,1800,140,140),Qt=_r.attributes.position;for(let s=0;s<Qt.count;s++){const e=Qt.getX(s),t=Qt.getY(s),n=Math.max(Qs,Math.min(Ji,t)),i=Math.max(0,Math.abs(e)-Ui),r=t-n,o=Math.sqrt(i*i+r*r),a=Math.max(0,Math.abs(e)-Ui),l=Math.max(0,t-Ji,Qs-t),c=a+l+.01,h=Math.min(1,Math.max(0,(a/c-.15)/.4)),u=e>Ui?1:e>0?e/(Ui+.01):0,d=e<-Ui?1:e<0?-e/(Ui+.01):0,p=h*u,m=h*d,x=1-p-m,g=.85+Hh(e,t)*.3,f=n,_=Math.sin(f*.025+2.3)*.35,w=Math.sin(f*.058+5.7)*.22,E=Math.sin(f*.011+.9)*.2,y=1+_+w+E,S=Math.abs(t-_d),C=p*Math.max(0,Math.min(1,1-(S-cl*.4)/(cl*.6))),I=Math.min(t-Qs,Ji-t),B=Math.min(1,Math.max(0,(I-30)/60)),U=(Ot(300,f,.008)-.5)*60,z=e*.12,L=Math.sin((f+U+z)*.079+Gn*.73)*.4,D=Math.sin((f-U*.6+z*.6)*.127+Gn*1.29)*.22,N=Math.sin((f+U*.3+z*.3)*.041+Gn*2.17)*.3,R=Math.sin(f*.199+Gn*3.11+U*.05)*.1,X=Math.sin(f*.023+Gn*4.51)*.25,K=L+D+N+R+X;let Z=Math.max(.12,1+K*1.8*B*p);{const Fe=Math.abs(f-sM),ze=Math.max(0,1-Fe/rM),ot=ze*ze*(3-2*ze)*p;Z=Z*(1-ot)+.12*ot}const ee=p-C,re=eM*C+J_*ee+q_*m+k_*x,pe=tM*C+K_*ee+Y_*m+V_*x,Me=nM*C+Q_*ee+j_*m+W_*x,W=iM*C+$_*ee+Z_*m+X_*x,Ie=re*g*y*Z,Ce=pe*g*y*Z,ge=Me*g*(1+(y-1)*.3)*Z,fe=W*g*(1+(y-1)*.15);let Se;if(o<=Ie)Se=qi;else if(o<=Ce){const Fe=(o-Ie)/(Ce-Ie),ze=Fe*Fe*(3-2*Fe);Se=qi+(Va-qi)*ze}else if(o<=ge){const Fe=(o-Ce)/(ge-Ce),ze=Fe*Fe*(3-2*Fe);Se=Va+(Wa-Va)*ze}else if(o<=fe){const Fe=(o-ge)/(fe-ge),ze=Fe*Fe*(3-2*Fe);Se=Wa+(ci-Wa)*ze}else{const ze=Math.min(1,(o-fe)/15),ot=ze<.5?4*ze*ze*ze:1-4*(1-ze)*(1-ze)*(1-ze);Se=ci+(Xn-ci)*ot}const we=(Se-Xn)/(qi-Xn),Te=Math.max(0,Math.min(1,(.35-we)/.2)),J=(.3+(1-we)*.8)*Te,$=Te,te=(Ot(e,t,.008)-.5)*5.5*J,he=(Ot(e+300,t+300,.022)-.5)*3.2*J,oe=(Ot(e+700,t+700,.055)-.5)*1.8*$,A=(Ot(e+1100,t+1100,.14)-.5)*.7*$,b=Math.max(0,we-.55)/.45,q=Ot(e+500,t+500,.01)*.4,Y=e*(.95+q)+t*.3,ie=Math.sin(Y*1.6)*.18*b*b,ce=1-Math.max(0,Math.min(1,(we-.95)/.05)),De=Math.max(0,Math.min(1,we/.5)),_e=ce*De;let P=0;if(_e>.01){const Fe=Ot(e+2e3,t+2e3,.018),ze=.42;if(Fe>ze){const ot=(Fe-ze)/(1-ze),Rt=ot*ot*4.5,Qn=(Ot(e+3e3,t+3e3,.08)-.5)*1.4*ot,Ln=(Ot(e+5e3,t+5e3,.18)-.5)*.6*ot;P=(Rt+Qn+Ln)*_e}}let O=Se+te+he+oe+A+ie+P;O=Math.max(-32,Math.min(9,O));const j=15+35*Math.max(.15,Math.min(3,Z));if(o<j){let Fe;if(o<15)Fe=1;else{const ot=(o-15)/(j-15);Fe=1-ot*ot*(3-2*ot)}const ze=10.8*Fe;O=Math.max(O,ze)}if(m>.01&&o>15){const Fe=Math.min(1,(o-15)/80),ze=Fe*Fe*(3-2*Fe),ot=m*ze*8;O=Math.max(O,ot)}const H=460,de=590-H,Ee=Math.sqrt(e*e+t*t),We=(Hh(e,t)-.5)*50,He=(Ot(e+4e3,t+4e3,.007)-.5)*70,je=(Ot(e+6e3,t+6e3,.019)-.5)*30,$e=Ee-We-He-je;if($e>H){const Fe=Math.min(1,($e-H)/de),ze=Fe*Fe*(3-2*Fe);O=O+(Xn-O)*ze}Qt.setZ(s,O)}_r.computeVertexNormals();const oM=141,aM=141,Gs=new Float32Array(oM*aM);for(let s=0;s<Qt.count;s++)Gs[s]=Qt.getZ(s);function lM(s,e){const t=(s+900)*140/1800,n=(e+900)*140/1800,i=Math.max(0,Math.min(139,Math.floor(t))),r=Math.max(0,Math.min(139,Math.floor(n))),o=Math.min(140,i+1),a=Math.min(140,r+1),l=t-i,c=n-r,h=Gs[r*141+i],u=Gs[r*141+o],d=Gs[a*141+i],p=Gs[a*141+o];return h+(u-h)*l+(d-h)*c+(h-u-d+p)*l*c}const xo=new Float32Array(Qt.count*3);{const s=$l(Gn*3266489917+3);for(let e=0;e<Qt.count;e++){const t=Qt.getZ(e),n=Qt.getX(e),i=Qt.getY(e),o=(Ot(n+500,i+500,.04)-.5)*.06,a=(s()-.5)*.015,l=(s()-.5)*.012,c=(s()-.5)*.015,h=Ot(n+2e3,i+2e3,.018),u=.42,d=h>u?(h-u)/(1-u):0;let p,m,x;if(t>=ci){const v=Math.min(1,(t-ci)/(qi-ci)),g=Math.max(0,Math.min(1,v+o)),f=g*g*(3-2*g);p=.45+f*.55,m=.42+f*.58,x=.38+f*.62;const _=Math.min(1,(t-Xn)/(qi-Xn)),w=1-Math.max(0,Math.min(1,(_-.95)/.05));if(d>0&&w>0){const E=d*w*.4;p=p*(1-E)+.5*E,m=m*(1-E)+.4*E,x=x*(1-E)+.3*E}}else{const v=Math.min(1,(t-Xn)/(ci-Xn)),g=Math.max(0,Math.min(1,v+o*.3)),f=g*g*(3-2*g);p=.04+f*.31,m=.08+f*.3,x=.22+f*.2}xo[e*3]=Math.min(1,Math.max(0,p+a)),xo[e*3+1]=Math.min(1,Math.max(0,m+l)),xo[e*3+2]=Math.min(1,Math.max(0,x+c))}}_r.setAttribute("color",new Le(xo,3));const Md=new En({vertexColors:!0,roughness:.92,metalness:0});Md.onBeforeCompile=s=>{s.vertexShader=s.vertexShader.replace("#include <common>",`#include <common>
     varying vec3 vSeabedWorldPos;`),s.vertexShader=s.vertexShader.replace("#include <worldpos_vertex>",`#include <worldpos_vertex>
     vSeabedWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;`),s.fragmentShader=s.fragmentShader.replace("#include <common>",`#include <common>
     varying vec3 vSeabedWorldPos;

     // Simple 2D hash noise for seafloor texture
     float sbHash(vec2 p) {
       return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
     }
     float sbNoise2D(vec2 p) {
       vec2 i = floor(p);
       vec2 f = fract(p);
       f = f * f * (3.0 - 2.0 * f); // smoothstep
       float a = sbHash(i);
       float b = sbHash(i + vec2(1.0, 0.0));
       float c = sbHash(i + vec2(0.0, 1.0));
       float d = sbHash(i + vec2(1.0, 1.0));
       return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
     }`),s.fragmentShader=s.fragmentShader.replace("#include <dithering_fragment>",`#include <dithering_fragment>
     {
       // --- Seafloor sand/sediment noise ---
       // Two octaves: large patches + fine grain
       // Fades in from zone B — no noise on island sand (zone A), smooth onset
       vec2 sbUv = vSeabedWorldPos.xz;
       float n1 = sbNoise2D(sbUv * 0.15) - 0.5;  // broad patches (~7m)
       float n2 = sbNoise2D(sbUv * 0.6)  - 0.5;  // fine grain (~1.7m)
       float noiseFade = smoothstep(-7.0, -12.0, vSeabedWorldPos.y); // 0 at reef edge (zone D), 1 at deep reef (zone E)
       float sandNoise = (n1 * 0.12 + n2 * 0.06) * noiseFade;
       gl_FragColor.rgb += sandNoise;

       // --- Depth fog: starts at y=-15, fully opaque by y=-38 ---
       float fogDepth = smoothstep(-15.0, -38.0, vSeabedWorldPos.y);
       vec3 abyssBlue = vec3(0.03, 0.07, 0.20);
       gl_FragColor.rgb = mix(gl_FragColor.rgb, abyssBlue, fogDepth);
     }`)};const Mr=new Qe(_r,Md);Mr.rotation.x=-Math.PI/2;Mr.position.y=-11;Mr.receiveShadow=!1;Ae.add(Mr);rs.seabedMesh=Mr;for(let s=0;s<bn.count;s++){const e=bn.getX(s),t=bn.getY(s),n=e,i=ut-t,r=lM(n,i),o=Math.max(0,Math.min(1,(r+30)/40));let a,l,c;if(o>.7){const u=(o-.7)/.3;a=.05+u*.05,l=.5+u*.3,c=.55+u*.2}else if(o>.35){const u=(o-.35)/.35;a=.03+u*.02,l=.25+u*.25,c=.45+u*.1}else{const u=o/.35;a=.02+u*.01,l=.1+u*.15,c=.3+u*.15}const h=s*3;wn[h]=a,wn[h+1]=l,wn[h+2]=c,ui[h]=a,ui[h+1]=l,ui[h+2]=c}an.attributes.color.needsUpdate=!0;const cM=new cs(4e3,4e3,1,1),wd=new En({color:0,roughness:1,metalness:0});wd.onBeforeCompile=s=>{s.vertexShader=s.vertexShader.replace("#include <common>",`#include <common>
     varying vec3 vAbyssWorldPos;`),s.vertexShader=s.vertexShader.replace("#include <worldpos_vertex>",`#include <worldpos_vertex>
     vAbyssWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;`),s.fragmentShader=s.fragmentShader.replace("#include <common>",`#include <common>
     varying vec3 vAbyssWorldPos;`),s.fragmentShader=s.fragmentShader.replace("#include <dithering_fragment>",`#include <dithering_fragment>
     {
       float fogDepth = smoothstep(-15.0, -38.0, vAbyssWorldPos.y);
       vec3 abyssBlue = vec3(0.03, 0.07, 0.20);
       gl_FragColor.rgb = mix(gl_FragColor.rgb, abyssBlue, fogDepth);
     }`)};const tc=new Qe(cM,wd);tc.rotation.x=-Math.PI/2;tc.position.y=-42;Ae.add(tc);const ul=85,vo=42,Ko=ul*vo,ri=.06,hM=new Float32Array([-ri/2,0,0,ri/2,0,0,-ri*.8,-10/2,0,ri*.8,-10/2,0,-ri/3,-10,0,ri/3,-10,0]),uM=[0,2,1,1,2,3,2,4,3,3,4,5],vs=new Be;vs.setAttribute("position",new Le(hM,3));vs.setIndex(uM);const bd=new Float32Array(Ko),Sd=new Float32Array(Ko),Td=new Float32Array(Ko),ao=new ke,Ed=new vt({uniforms:{uTime:{value:0},uCloudDim:{value:1},uDncMul:{value:1},uColor:{value:new le(11598064)},uSunX:{value:0}},vertexShader:`
    attribute float aPhase;
    attribute float aBaseOp;
    attribute float aWidthScale;
    uniform float uTime;
    uniform float uCloudDim;
    uniform float uDncMul;
    uniform float uSunX;
    varying float vOpacity;

    void main() {
      // Dual-sine opacity pulse
      float pulse = 0.4 + sin(uTime * 0.25 + aPhase) * 0.35
                        + sin(uTime * 0.6 + aPhase * 1.7) * 0.25;
      vOpacity = aBaseOp * max(0.0, pulse) * uCloudDim * uDncMul;

      // Sun-relative tilt: rays fan out from sun position
      float worldX = instanceMatrix[3][0];
      float dx = worldX - uSunX;
      float tilt = clamp(dx / 400.0, -1.0, 1.0) * 0.15;

      // Subtle sway on top
      float sway = sin(uTime * 0.5 + aPhase) * 0.008
                 + sin(uTime * 1.1 + aPhase * 2.3) * 0.003;
      float totalRot = tilt + sway;
      float cs = cos(totalRot);
      float sn = sin(totalRot);

      // Scale width per-instance, apply tilt+sway rotation
      vec3 p = position;
      p.x *= aWidthScale;
      vec3 swayed = vec3(p.x * cs - p.y * sn, p.x * sn + p.y * cs, p.z);

      vec4 worldPos = instanceMatrix * vec4(swayed, 1.0);
      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,fragmentShader:`
    uniform vec3 uColor;
    varying float vOpacity;
    void main() {
      gl_FragColor = vec4(uColor, vOpacity);
    }
  `,transparent:!0,depthWrite:!1,side:ln,blending:Ht}),wr=new Tu(vs,Ed,Ko);wr.frustumCulled=!1;for(let s=0;s<ul;s++)for(let e=0;e<vo;e++){const t=s*vo+e,n=.03+Math.random()*.06;Td[t]=n/ri,Sd[t]=.015+Math.random()*.02,bd[t]=Math.random()*Math.PI*2;const i=800/ul,r=400/vo;ao.position.set(-400+s*i+(Math.random()-.5)*i*.7,0,-5-e*r-Math.random()*r*.7),ao.rotation.set(0,Math.random()*Math.PI,0),ao.updateMatrix(),wr.setMatrixAt(t,ao.matrix)}wr.instanceMatrix.needsUpdate=!0;vs.setAttribute("aPhase",new Vo(bd,1));vs.setAttribute("aBaseOp",new Vo(Sd,1));vs.setAttribute("aWidthScale",new Vo(Td,1));Ae.add(wr);const XM=wr,dM=`
  varying vec2 vUv;
  varying float vDepthFade;
  void main() {
    vUv = uv;
    // World Y for depth-based caustic fade (plane at y=-11, rotated -PI/2)
    vec3 worldPos = (modelMatrix * vec4(position, 1.0)).xyz;
    // Fade caustics: full at y=-5, gone by y=-30 (light reaches the deep lagoon floor)
    vDepthFade = smoothstep(-30.0, -5.0, worldPos.y);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,fM=`
  uniform float uTime;
  uniform float uIntensity;
  uniform float uCausticScale;
  varying vec2 vUv;
  varying float vDepthFade;

  // Simple 2D hash
  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return fract(sin(p) * 43758.5453);
  }

  // Voronoi edge detection — returns brightness at cell edges
  float voronoi(vec2 uv, float time) {
    vec2 i = floor(uv);
    vec2 f = fract(uv);
    float d1 = 1.0, d2 = 1.0;
    for (int y = -1; y <= 1; y++) {
      for (int x = -1; x <= 1; x++) {
        vec2 neighbor = vec2(float(x), float(y));
        vec2 point = hash(i + neighbor);
        // Animate points
        point = 0.5 + 0.5 * sin(time * 0.4 + 6.2831 * point);
        vec2 diff = neighbor + point - f;
        float dist = length(diff);
        if (dist < d1) { d2 = d1; d1 = dist; }
        else if (dist < d2) { d2 = dist; }
      }
    }
    return d2 - d1;
  }

  void main() {
    // Two layers at different scales and speeds for complexity
    float scale1 = 149.0 * uCausticScale;
    float scale2 = 114.0 * uCausticScale;
    float v1 = voronoi(vUv * scale1, uTime);
    float v2 = voronoi(vUv * scale2 + vec2(3.7, 1.3), uTime * 0.7);

    // Sharp caustic lines from cell edges
    float c1 = smoothstep(0.0, 0.12, v1);
    float c2 = smoothstep(0.0, 0.10, v2);

    // Combine: bright where edges are (invert so edges = bright)
    float caustic = (1.0 - c1) * 0.6 + (1.0 - c2) * 0.4;
    caustic = pow(caustic, 1.5) * 1.2;

    vec3 color = vec3(0.6, 0.95, 1.0) * caustic;
    gl_FragColor = vec4(color, caustic * 0.12 * uIntensity * vDepthFade);
  }
`,Ad=new vt({uniforms:{uTime:{value:0},uIntensity:{value:1},uCausticScale:{value:3}},vertexShader:dM,fragmentShader:fM,transparent:!0,blending:Ht,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),Qo=new Qe(_r.clone(),Ad);Qo.rotation.x=-Math.PI/2;Qo.position.set(0,-11,0);Qo.renderOrder=2;Ae.add(Qo);const nc=500,ic=new Be,yo=new Float32Array(nc*3),Ld=new Float32Array(nc);for(let s=0;s<nc;s++)yo[s*3]=(Math.random()-.5)*200,yo[s*3+1]=-1-Math.random()*10,yo[s*3+2]=(Math.random()-.5)*200,Ld[s]=.5;ic.setAttribute("position",new Le(yo,3));ic.setAttribute("alpha",new Le(Ld,1));const pM=new vt({transparent:!0,depthWrite:!1,blending:Ht,uniforms:{uScale:{value:yt.domElement.height*yt.getPixelRatio()*.5},uSize:{value:.15},uColor:{value:new le(10547432)}},vertexShader:`
    attribute float alpha;
    varying float vAlpha;
    uniform float uSize;
    uniform float uScale;
    void main() {
      vAlpha = alpha;
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = max(1.0, uSize * (uScale / -mv.z));
      gl_Position = projectionMatrix * mv;
    }
  `,fragmentShader:`
    uniform vec3 uColor;
    varying float vAlpha;
    void main() {
      float d = length(gl_PointCoord - 0.5) * 2.0;
      if (d > 1.0) discard;
      float soft = 1.0 - d * d;
      gl_FragColor = vec4(uColor, vAlpha * soft);
    }
  `}),mM=new ds(ic,pM);Ae.add(mM);const $o=1500,sc=new Be,_o=new Float32Array($o*3),Cd=new Float32Array($o),gM=new Float32Array($o);for(let s=0;s<$o;s++)_o[s*3]=(Math.random()-.5)*200,_o[s*3+1]=5+Math.random()*55,_o[s*3+2]=(Math.random()-.5)*200,Cd[s]=.5+Math.random()*.2,gM[s]=.4+Math.random()*.3;sc.setAttribute("position",new Le(_o,3));sc.setAttribute("alpha",new Le(Cd,1));const Rd=new vt({transparent:!0,depthWrite:!1,blending:Mn,uniforms:{uScale:{value:yt.domElement.height*yt.getPixelRatio()*.5},uSize:{value:.45},uColor:{value:new le(15265524)}},vertexShader:`
    attribute float alpha;
    varying float vAlpha;
    uniform float uSize;
    uniform float uScale;
    void main() {
      vAlpha = alpha;
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = max(2.0, uSize * (uScale / -mv.z));
      gl_Position = projectionMatrix * mv;
    }
  `,fragmentShader:`
    uniform vec3 uColor;
    varying float vAlpha;
    void main() {
      // Vertical rain streak — narrow in X, elongated in Y
      float dx = abs(gl_PointCoord.x - 0.5) * 2.0;
      float dy = abs(gl_PointCoord.y - 0.5) * 2.0;
      // Narrow horizontal (streak shape) — sharp falloff in X
      float xFade = 1.0 - smoothstep(0.0, 0.35, dx);
      // Softer vertical falloff — tapers at top and bottom
      float yFade = 1.0 - dy * dy;
      float streak = xFade * yFade;
      if (streak < 0.01) discard;
      gl_FragColor = vec4(uColor, vAlpha * streak * 0.65);
    }
  `}),Pd=new ds(sc,Rd);Pd.visible=!1;Ae.add(Pd);const ea=300,ta=new Be,Mo=new Float32Array(ea*3),Id=new Float32Array(ea),Dd=new Float32Array(ea);for(let s=0;s<ea;s++)Mo[s*3]=(Math.random()-.5)*160,Mo[s*3+1]=.05+Math.random()*.08,Mo[s*3+2]=ol+(Math.random()-.5)*80,Id[s]=Math.random()*Math.PI*2,Dd[s]=.3+Math.random()*.7;ta.setAttribute("position",new Le(Mo,3));ta.setAttribute("aPhase",new Le(Id,1));ta.setAttribute("aSpeed",new Le(Dd,1));const xM=new vt({transparent:!0,depthWrite:!1,blending:Ht,uniforms:{uTime:{value:0},uOpacity:{value:0},uScale:{value:yt.domElement.height*yt.getPixelRatio()*.5}},vertexShader:`
    attribute float aPhase;
    attribute float aSpeed;
    uniform float uTime;
    uniform float uOpacity;
    uniform float uScale;
    varying float vAlpha;
    void main() {
      // Twinkle: each particle pulses at its own rate + phase
      float pulse = sin(uTime * aSpeed + aPhase);
      // Remap -1..1 to 0..1, then bias toward off (most particles dim most of the time)
      float glow = pulse * 0.5 + 0.5;
      glow = glow * glow * glow; // cubic falloff — brief bright flashes, long dim periods
      vAlpha = glow * uOpacity;

      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = max(1.0, (1.5 + glow * 2.5) * (uScale / -mv.z));
      gl_Position = projectionMatrix * mv;
    }
  `,fragmentShader:`
    varying float vAlpha;
    void main() {
      float d = length(gl_PointCoord - 0.5) * 2.0;
      if (d > 1.0) discard;
      float soft = 1.0 - d * d;
      // Cyan-green bioluminescent color
      vec3 color = vec3(0.15, 0.85, 0.75);
      gl_FragColor = vec4(color, vAlpha * soft);
    }
  `}),na=new ds(ta,xM);na.visible=!1;na.renderOrder=2;Ae.add(na);function rc(s,e,t){return[s[0]+(e[0]-s[0])*t,s[1]+(e[1]-s[1])*t,s[2]+(e[2]-s[2])*t]}function lt(s,e,t){return s+(e-s)*t}function ni(s,e,t){const n=s>>16&255,i=s>>8&255,r=s&255,o=e>>16&255,a=e>>8&255,l=e&255,c=Math.round(n+(o-n)*t),h=Math.round(i+(a-i)*t),u=Math.round(r+(l-r)*t);return c<<16|h<<8|u}function Xa(s){return s*s*(3-2*s)}function Gh(s,e,t){const n=[];for(let i=0;i<s.length;i++)n.push({p:s[i].p,c:rc(s[i].c,e[i].c,t)});return n}function vM(s){tn.clearRect(0,0,4,1024);const e=tn.createLinearGradient(0,0,0,1024);for(const t of s){const[n,i,r]=t.c;e.addColorStop(t.p,`rgb(${Math.round(n)},${Math.round(i)},${Math.round(r)})`)}if(tn.fillStyle=e,tn.fillRect(0,0,4,1024),Vn.visible){let t,n,i;if(Ae.fog){const o=Ae.fog.color;t=Math.round(o.r*255),n=Math.round(o.g*255),i=Math.round(o.b*255)}else{const o=s[s.length-1].c;t=Math.round(o[0]*.4),n=Math.round(o[1]*.4),i=Math.round(o[2]*.4)}const r=tn.createLinearGradient(0,860,0,1024);r.addColorStop(0,"rgba(0,0,0,0)"),r.addColorStop(.4,`rgba(${t},${n},${i},0.4)`),r.addColorStop(1,`rgb(${t},${n},${i})`),tn.fillStyle=r,tn.fillRect(0,860,4,164)}Ae.background.needsUpdate=!0}function yM(s,e){const t=e[e.length-1].c,n=[40,216,204],i=(t[0]+t[1]+t[2])/765,r=Math.max(.15,1-i*.9),o=rc(n,t,r),a=o[0]*.06,l=o[1]*.1,c=o[2]*.16;li.clearRect(0,0,4,512);const h=li.createLinearGradient(0,0,0,512);h.addColorStop(0,`rgb(${Math.round(o[0])},${Math.round(o[1])},${Math.round(o[2])})`),h.addColorStop(.15,`rgb(${Math.round(o[0]*.75)},${Math.round(o[1]*.78)},${Math.round(o[2]*.8)})`),h.addColorStop(.45,`rgb(${Math.round(o[0]*.25)},${Math.round(o[1]*.3)},${Math.round(o[2]*.35)})`),h.addColorStop(1,`rgb(${Math.round(a)},${Math.round(l)},${Math.round(c)})`),li.fillStyle=h,li.fillRect(0,0,4,512),md.needsUpdate=!0}function _M(s,e){e=Math.max(0,Math.min(1,e));for(let t=0;t<s.length-1;t++)if(e<=s[t+1].p){const n=s[t+1].p-s[t].p,i=n>0?(e-s[t].p)/n:0;return rc(s[t].c,s[t+1].c,i)}return s[s.length-1].c}let kh=0;const MM=.15;function qM(s){me.lastFrameTime<0&&(me.lastFrameTime=s);const e=s-me.lastFrameTime;me.lastFrameTime=s;const t=new Date,n=t.getFullYear()*1e4+t.getMonth()*100+t.getDate();if(n!==Bh&&(Bh=n,Mt=al(t),Js(po,Mt.phase),vn.image=sn,vn.needsUpdate=!0),me.forcedMoonPhase>=0&&me.forcedMoonPhase!==me._lastForcedMoon){me._lastForcedMoon=me.forcedMoonPhase;const O=me.forcedMoonPhase*.125,k=(1-Math.cos(O*2*Math.PI))/2;Mt={phase:O,illumination:k,name:["New Moon","Waxing Crescent","First Quarter","Waxing Gibbous","Full Moon","Waning Gibbous","Last Quarter","Waning Crescent"][me.forcedMoonPhase]},Js(po,O),vn.image=sn,vn.needsUpdate=!0}else me.forcedMoonPhase<0&&me._lastForcedMoon>=0&&(me._lastForcedMoon=-1,Mt=al(t),Js(po,Mt.phase),vn.image=sn,vn.needsUpdate=!0);if(me.paused||(me.cycleTime=ad()),me.timeLapse){const O=Math.min(e,.05);me.cycleTime+=O*60,me.cycleTime>=Dh&&(me.cycleTime-=Dh)}let i=me.cycleTime,r=3,o=0;for(let O=0;O<4;O++)if(i<fo[O]+Bs[O]){r=O,o=(i-fo[O])/Bs[O];break}me.phase=r,me.phaseT=o;const a=(r+1)%4,l=.2;let c=0;o>1-l&&(c=Xa((o-(1-l))/l));let h,u=!1;r===0?h=-.06+o*.21:r===1?h=.15+o*.7:r===2?h=.85+o*.21:(h=1.06+o*.88,u=!0);const d=380;let p,m,x;if(u){const O=Kt.azStart-Kt.azEnd,j=(Kt.azEnd+(h-1)*O)*Math.PI/180,se=Math.sin(h*Math.PI)*20,de=se*Math.PI/180;p=-Math.cos(j)*d,m=Math.sin(de)*d,x=Math.sin(j)*d,kn.position.set(it.position.x+p,m,it.position.z+x),kn.visible=!1,me.sunElevDeg=se}else{const O=Kt.azStart-Kt.azEnd,j=(Kt.azStart-h*O)*Math.PI/180,se=Math.sin(h*Math.PI)*Kt.elevPeak,de=se*Math.PI/180;p=-Math.cos(j)*d,m=Math.sin(de)*d,x=Math.sin(j)*d;const Ee=Math.min(1,Math.max(0,(m+12)/20));kn.position.set(it.position.x+p,m,it.position.z+x),kn.visible=Ee>.01,zs.opacity=Ee,me.sunElevDeg=se;const We=Kt.elevPeak,je=1-Math.max(0,se)/Math.max(1,We);je>.6?zs.map=__:zs.map=ld,zs.needsUpdate=!0;const Fe=50+je*je*120,ze=1+Math.sin(s*.5)*.02,ot=1-je*je*.25;kn.scale.set(Fe*ze,Fe*ot*ze,1)}const v=400,g=r===3?o:r===2&&o>.85?0:r===0&&o<.2?1:0,f=Math.sin(g*Math.PI)*Wn.elevArc;let _=Wn.elevBase+f;const w=_*Math.PI/180,y=(Wn.azCenter+(g-.5)*Wn.azDrift)*Math.PI/180,S=-Math.cos(y)*v,C=Math.sin(w)*v,I=Math.sin(y)*v,B=-Math.cos(y)*Math.cos(w),U=Math.sin(w),z=Math.sin(y)*Math.cos(w);let L=0;r===3?L=1:r===2&&o>.85?L=(o-.85)/.15:r===0&&o<.2&&(L=1-o/.2),L=L*L*(3-2*L);const D=L>.01;if(di.visible=D,fi.visible=D,D){di.position.set(it.position.x+S,C,it.position.z+I),fi.position.set(it.position.x+S,C,it.position.z+I),hd.opacity=L*.85;const O=Mt.illumination*Mt.illumination;ud.opacity=L*.6*O}const N=L;me.moonX=S,me.moonY=C,me.moonZ=I,me.moonElevDeg=_,me.moonVisible=D,me.moonPhase=Mt.phase,me.moonIllumination=Mt.illumination,me.moonPhaseName=Mt.name;const R=r===3?1:r===2&&o>.6?(o-.6)/.4:r===0&&o<.4?1-o/.4:0;if(Os.uniforms.uOpacity.value=R,Os.uniforms.uTime.value=s,Lo.position.copy(it.position),Lo.rotation.y=s*.001,D){Ga.set(it.position.x+S,C,it.position.z+I).project(it);const O=18*.5/v*it.projectionMatrix.elements[5];Os.uniforms.uMoonClip.value.set(Ga.x,Ga.y,O*1.3*Mt.illumination,Mt.illumination>.05?1:0)}else Os.uniforms.uMoonClip.value.w=0;if(pd.uniforms.uOpacity.value=Vn.visible?0:R*.35,na.visible=!1,r===3){if(!Ue.active&&(Ue.nextSpawnTime===0&&(Ue.nextSpawnTime=s+10+Math.random()*20,Ue.spawnCount=0),s>=Ue.nextSpawnTime&&Ue.spawnCount<4)){Ue.active=!0,Ue.startTime=s,Ue.duration=.4+Math.random()*.4;const O=Math.random()*Math.PI*2,k=.05+Math.random()*.3,j=475;Ue.startPos[0]=j*Math.sin(k)*Math.cos(O),Ue.startPos[1]=j*Math.cos(k),Ue.startPos[2]=j*Math.sin(k)*Math.sin(O);const H=(Math.random()-.5)*.8,se=.1+Math.random()*.3;Ue.dir[0]=Math.cos(O+H)*se*j,Ue.dir[1]=-Math.abs(se)*j*.5,Ue.dir[2]=Math.sin(O+H)*se*j,Ue.speed=300+Math.random()*200,Zi.visible=!0,Ue.spawnCount++;const de=Yl*(1-o);Ue.nextSpawnTime=s+5+Math.random()*Math.max(5,de/Math.max(1,4-Ue.spawnCount))}if(Ue.active){const k=(s-Ue.startTime)/Ue.duration;if(k>=1)Ue.active=!1,Zi.visible=!1;else{const j=ai.attributes.position.array,H=ai.attributes.aAlpha.array,se=Ue.speed/475;for(let de=0;de<Ks;de++){const Ee=Math.max(0,k-de/Ks*.15);j[de*3]=Ue.startPos[0]+Ue.dir[0]*Ee*se,j[de*3+1]=Ue.startPos[1]+Ue.dir[1]*Ee*se,j[de*3+2]=Ue.startPos[2]+Ue.dir[2]*Ee*se;const We=1-de/Ks,He=k<.1?k/.1:k>.7?(1-k)/.3:1;H[de]=We*We*He*.9}ai.attributes.position.needsUpdate=!0,ai.attributes.aAlpha.needsUpdate=!0}}}else Ue.active&&(Ue.active=!1,Zi.visible=!1),Ue.spawnCount=0,Ue.nextSpawnTime=0;if(s-kh>MM){kh=s;const O=me.sunElevDeg,k=!u&&h<.5||u&&h>1.5?l_:c_;let j;if(O<-6)j=Fh;else if(O<0){const F=Xa((O+6)/6);j=Gh(Fh,k,F)}else if(O<8)j=k;else if(O<18){const F=Xa((O-8)/10);j=Gh(k,Nh,F)}else j=Nh;vM(j),yM(c,j);const H=j[j.length-1].c,se=(H[0]-H[2])/255,de=(H[0]+H[1]+H[2])/765;let Ee=Math.max(.02,Math.min(.9,se*1.2+de*.15));It.rain?Ee=0:Vn.visible&&(Ee*=.05);const We=ur.attributes.color.array;for(let F=0;F<os.count;F++)We[F*4]=H[0]/255,We[F*4+1]=H[1]/255,We[F*4+2]=H[2]/255,We[F*4+3]=xd[F]*Ee;ur.attributes.color.needsUpdate=!0;const He=Tn.attributes.color.array,je=no[r],$e=no[a],Fe=lt(je.r,$e.r,c),ze=lt(je.g,$e.g,c),ot=lt(je.b,$e.b,c);for(let F=0;F<ll.count;F++)He[F*4]=Math.min(1,.09*Fe),He[F*4+1]=Math.min(1,.75*ze),He[F*4+2]=Math.min(1,.72*ot);Tn.attributes.color.needsUpdate=!0;const Rt=hr.attributes.color.array,Qn=[1.15,1.3,1.15,.6],Ln=lt(Qn[r],Qn[a],c);let ys=!1,Mi=0,_s=1,Ms=0,br=1,Sr=.9,M=.7,G=0;if(It.cover>0&&Vn.visible&&me.sunElevDeg>-2){ys=!0,G=Math.min(1,Math.max(0,(me.sunElevDeg+2)/7))*(It.rain?.08:.18);const V=io[r],ne=io[a],Re=ni(V.col,ne.col,c);br=(Re>>16&255)/255,Sr=(Re>>8&255)/255,M=(Re&255)/255;const ve=it.position.x+p,be=m,Ge=it.position.z+x,ye=Vn.rotation.y,Pe=Math.cos(ye),xe=Math.sin(ye),Oe=ve*Pe+Ge*xe,Et=be,nt=-ve*xe+Ge*Pe,qt=Math.sqrt(Oe*Oe+Et*Et+nt*nt);Mi=Oe/qt,_s=Et/qt,Ms=nt/qt}for(let F=0;F<_n.count;F++){const ne=1-ed[F],Re=_M(j,ne);let ve=Re[0]/255*Ln,be=Re[1]/255*Ln,Ge=Re[2]/255*Ln;if(ys){const ye=_n.getX(F),Pe=_n.getY(F),xe=_n.getZ(F),Oe=Math.sqrt(ye*ye+Pe*Pe+xe*xe),nt=(ye*Mi+Pe*_s+xe*Ms)/Oe*.5+.5;ve+=nt*G*br,be+=nt*G*Sr,Ge+=nt*G*M}Rt[F*3]=Math.min(1,ve),Rt[F*3+1]=Math.min(1,be),Rt[F*3+2]=Math.min(1,Ge)}hr.attributes.color.needsUpdate=!0}const X=io[r],K=io[a],Z=1-It.cover*.5,ee=Math.max(0,Math.min(1,me.sunElevDeg/40)),re=.4+ee*.6;tt.color.setHex(ni(X.col,K.col,c));const pe=Math.min(1,Math.max(0,(me.sunElevDeg+2)/5));tt.intensity=lt(X.int,K.int,c)*Z*pe;{const k=p,j=Math.max(m,.5),H=x,se=Math.sqrt(k*k+j*j+H*H),de=k/se,Ee=j/se,We=H/se;if(tt.position.set(de*80,Ee*80,ut+We*80),!u){const je=1+(1-Math.max(0,Math.min(1,me.sunElevDeg/72)))*1.2,$e=130;tt.shadow.camera.left=-$e*je,tt.shadow.camera.right=$e*je,tt.shadow.camera.top=$e*je,tt.shadow.camera.bottom=-$e*je*.5,tt.shadow.camera.far=300*je,tt.shadow.camera.updateProjectionMatrix()}}if(Wi){Wi.color.setHex(ni(X.hSky,K.hSky,c)),Wi.groundColor.setHex(ni(X.hGnd,K.hGnd,c));const O=lt(X.hInt,K.hInt,c),k=.5+ee*.5;Wi.intensity=O*k}const Me=r===3?.1:r===2?lt(.6,.1,c):r===0?lt(.5,1,o):1;if(kl.intensity=.3*Me*Z*re,Vl.intensity=.4*Me*re,Wl.intensity=r===3?.15:.4*Z,Xl.intensity=r===3?.1:.3*Z,_>0&&N>.01){oi.position.set(B*100,Math.max(U*100,5),z*100),oi.intensity=.2*N*(.3+Math.min(1,_/40)*.7)*Mt.illumination;const O=Math.min(1,_/50);oi.color.setRGB((128+O*16)/255,(136+O*8)/255,(160+O*24)/255)}else oi.intensity=0;if(yt.toneMappingExposure=lt(X.exp,K.exp,c),Ae.fog){const O=It.rain?8425632:12636376,k=It.rain?1712176:4214880;let j;r===3?j=0:r===1?j=1:r===0?j=Math.min(1,o*2):j=1-c,Ae.fog.color.setHex(ni(k,O,j))}if(It.rain){let j;r===3?j=0:r===1?j=1:r===0?j=Math.min(1,o*2):j=1-c;const H=ni(7899296,15265524,j);Rd.uniforms.uColor.value.setHex(H)}const W=r===3?.05:r===0||r===2?.5:1;Ed.uniforms.uDncMul.value=W;let Ie;r===3?Ie=.3:r===2?Ie=lt(1,.3,c):r===0?Ie=lt(.3,1,Math.min(1,o*2)):Ie=1;const Ce=Ie*Z;Ad.uniforms.uIntensity.value=Ce,me.causticIntensity=Ce;{const O=!u&&!It.rain?Math.min(1,Math.max(0,(me.sunElevDeg+1)/6)):0;if(O>.001){pi.visible=!0;const k=Math.max(0,Math.min(1,me.sunElevDeg/72)),j=1-It.cover*.55,H=(1.8-k*1.2)*j*O;Us.uniforms.uSunIntensity.value=H;const se=It.cover*.4,de=1,Ee=lt(.45,.95,k)+se*(1-lt(.45,.95,k)),We=lt(.15,.85,k)+se*(1-lt(.15,.85,k));Us.uniforms.uSunColor.value.set(de,Ee,We)}else pi.visible=!1}if(ro.set(p,Math.max(m,1),x).normalize(),Us.uniforms.uSunDir.value.copy(ro),Us.uniforms.uSunWorldPos.value.set(it.position.x+ro.x*d,m,it.position.z+ro.z*d),D&&_>0&&!It.rain){mi.visible=!0,Uh.set(B,U,z),go.uniforms.uMoonDir.value.copy(Uh),go.uniforms.uMoonWorldPos.value.set(it.position.x+B*v,U*v,it.position.z+z*v);const O=Math.max(0,Math.min(1,_/65));go.uniforms.uMoonIntensity.value=1*N*(.6+O*.4)*Mt.illumination}else mi.visible=!1;const ge=no[r],fe=no[a],Se=lt(ge.r,fe.r,c),we=lt(ge.g,fe.g,c),Te=lt(ge.b,fe.b,c);me.waterTintR=Se,me.waterTintG=we,me.waterTintB=Te;const J=an.attributes.color.array,$=It.rain&&Ae.fog;let te,he,oe;$&&(te=Ae.fog.color.r,he=Ae.fog.color.g,oe=Ae.fog.color.b);for(let O=0;O<bn.count;O++){let k=Math.min(1,ui[O*3]*Se),j=Math.min(1,ui[O*3+1]*we),H=Math.min(1,ui[O*3+2]*Te);if($){const se=bn.getX(O),de=bn.getY(O),Ee=Math.max(Math.abs(se),Math.abs(de));if(Ee>400){const We=Math.min(1,(Ee-400)/200);k=k+(te-k)*We,j=j+(he-j)*We,H=H+(oe-H)*We}}J[O*3]=k,J[O*3+1]=j,J[O*3+2]=H}an.attributes.color.needsUpdate=!0;const A=r===3?.65:r===1?.5:.55;Un.opacity=lt(Un.opacity,A,.02);const b=It.rain?.8:.01,q=It.rain?0:1;Un.roughness=lt(Un.roughness,b,.05),Un.clearcoat=lt(Un.clearcoat,q,.05);const Y=[14731440,14542058,13674632,2107456];nd.color.setHex(ni(Y[r],Y[a],c));const ie=document.getElementById("dncPhaseLabel"),ce=document.getElementById("dncTimeLabel"),De=document.getElementById("dncSlider"),_e=["🌅","☀️","🌇","🌙"],P=me.timeLapse&&me._tlUITime!==void 0&&s-me._tlUITime<.1;if(me.timeLapse&&(me._tlUITime=P?me._tlUITime:s),ie&&!P){const O=_e[r]+" "+o_[r];ie.textContent!==O&&(ie.textContent=O)}if(ce&&!P){let O=6;for(let H=0;H<4;H++){const se=fo[H],de=se+Bs[H];if(i>=se&&i<de){const Ee=(i-se)/Bs[H],[We,He]=od[H];O=We+Ee*(He-We);break}}O>=24&&(O-=24);const k=Math.floor(O),j=Math.floor((O-k)*60);ce.textContent=String(k).padStart(2,"0")+":"+String(j).padStart(2,"0")}De&&!P&&(!me.paused||me.timeLapse)&&(De.value=i)}const Ro=new yn;Ae.add(Ro);function YM(s,e){return Ju.get(s+","+e)||{rockHeight:0,totalHeight:0}}const Nd=new En({color:new le(.22,.21,.19),roughness:.88,metalness:.04,flatShading:!1}),oc=new En({color:new le(1,1,1),roughness:.92,metalness:0,flatShading:!1}),Ki={uCausticTime:{value:0},uCausticIntensity:{value:1},uCausticScale:{value:3}};function wM(s){s.onBeforeCompile=e=>{e.uniforms.uCausticTime=Ki.uCausticTime,e.uniforms.uCausticIntensity=Ki.uCausticIntensity,e.uniforms.uCausticScale=Ki.uCausticScale,e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
       varying vec3 vWorldPos;`),e.vertexShader=e.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
       vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;`),e.fragmentShader=e.fragmentShader.replace("#include <common>",`#include <common>
       uniform float uCausticTime;
       uniform float uCausticIntensity;
       uniform float uCausticScale;
       varying vec3 vWorldPos;

       vec2 safeHash22(vec2 p) {
         vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
         p3 += dot(p3, p3.yzx + 33.33);
         return fract((p3.xx + p3.yz) * p3.zy);
       }

       float causticVoronoi(vec2 uv, float t) {
         vec2 i = floor(uv);
         vec2 f = fract(uv);
         float d1 = 1.0;
         float d2 = 1.0;
         for (int y = -1; y <= 1; y++) {
           for (int x = -1; x <= 1; x++) {
             vec2 neighbor = vec2(float(x), float(y));
             vec2 point = safeHash22(i + neighbor);
             point = 0.5 + 0.5 * sin(t * 0.4 + 6.2831 * point);
             vec2 diff = neighbor + point - f;
             float dist = length(diff);
             if (dist < d1) { d2 = d1; d1 = dist; }
             else if (dist < d2) { d2 = dist; }
           }
         }
         return d2 - d1;
       }`),e.fragmentShader=e.fragmentShader.replace("#include <dithering_fragment>",`#include <dithering_fragment>
       {
         float uwd = clamp(-vWorldPos.y / 3.0, 0.0, 1.0);
         if (uwd > 0.0 && uCausticIntensity > 0.0) {
           vec2 wUv = vWorldPos.xz / 800.0 + 0.5;
           float v1 = causticVoronoi(wUv * 149.0 * uCausticScale, uCausticTime);
           float v2 = causticVoronoi(wUv * 114.0 * uCausticScale + vec2(3.7, 1.3), uCausticTime * 0.7);
           float c1 = smoothstep(0.0, 0.12, v1);
           float c2 = smoothstep(0.0, 0.10, v2);
           float caustic = (1.0 - c1) * 0.6 + (1.0 - c2) * 0.4;
           caustic = clamp(caustic, 0.0, 1.0);
           caustic = caustic * caustic * caustic;
           float bright = caustic * 0.15 * uwd * uCausticIntensity;
           gl_FragColor.rgb = gl_FragColor.rgb + bright * vec3(1.0, 1.0, 1.0);
           gl_FragColor.rgb = min(gl_FragColor.rgb, vec3(1.0));
         }
       }`)}}wM(Nd);(function(){oc.onBeforeCompile=e=>{e.uniforms.uCausticTime=Ki.uCausticTime,e.uniforms.uCausticIntensity=Ki.uCausticIntensity,e.uniforms.uCausticScale=Ki.uCausticScale,e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
       varying vec3 vWorldPos;`),e.vertexShader=e.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
       vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;`),e.fragmentShader=e.fragmentShader.replace("#include <common>",`#include <common>
       uniform float uCausticTime;
       uniform float uCausticIntensity;
       uniform float uCausticScale;
       varying vec3 vWorldPos;

       vec2 safeHash22(vec2 p) {
         vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
         p3 += dot(p3, p3.yzx + 33.33);
         return fract((p3.xx + p3.yz) * p3.zy);
       }

       float causticVoronoi(vec2 uv, float t) {
         vec2 i = floor(uv);
         vec2 f = fract(uv);
         float d1 = 1.0;
         float d2 = 1.0;
         for (int y = -1; y <= 1; y++) {
           for (int x = -1; x <= 1; x++) {
             vec2 neighbor = vec2(float(x), float(y));
             vec2 point = safeHash22(i + neighbor);
             point = 0.5 + 0.5 * sin(t * 0.4 + 6.2831 * point);
             vec2 diff = neighbor + point - f;
             float dist = length(diff);
             if (dist < d1) { d2 = d1; d1 = dist; }
             else if (dist < d2) { d2 = dist; }
           }
         }
         return d2 - d1;
       }`),e.fragmentShader=e.fragmentShader.replace("#include <dithering_fragment>",`#include <dithering_fragment>
       {
         float uwd = clamp(-vWorldPos.y / 3.0, 0.0, 1.0);
         if (uwd > 0.0 && uCausticIntensity > 0.0) {
           vec2 wUv = vWorldPos.xz / 800.0 + 0.5;
           float v1 = causticVoronoi(wUv * 149.0 * uCausticScale, uCausticTime);
           float v2 = causticVoronoi(wUv * 114.0 * uCausticScale + vec2(3.7, 1.3), uCausticTime * 0.7);
           float c1 = smoothstep(0.0, 0.12, v1);
           float c2 = smoothstep(0.0, 0.10, v2);
           float caustic = (1.0 - c1) * 0.6 + (1.0 - c2) * 0.4;
           caustic = clamp(caustic, 0.0, 1.0);
           caustic = caustic * caustic * caustic;
           float bright = caustic * 0.15 * uwd * uCausticIntensity;
           gl_FragColor.rgb = gl_FragColor.rgb + bright * vec3(1.0, 1.0, 1.0);
           gl_FragColor.rgb = min(gl_FragColor.rgb, vec3(1.0));
         }
       }`)}})();const ia=1,dr=-54,fr=146,Qi=20;function bM(s){if(s<=-35)return 6;const e=Math.min(1,(s+35)/10),t=e*e*(3-2*e),n=Math.sin(s*.06)*.35,i=Math.sin(s*.14+2)*.2,r=Math.sin(s*.03+5)*.25,o=Math.max(0,n+i+r);return 6+t*o}function Fd(s,e){const t=s/ss,n=(e-ut)/ss,i=Math.max(0,Math.abs(t)-ia),r=n<dr?dr-n:n>fr?n-fr:0,o=i>r?n:t,a=Math.sin(o*.32+1.7)*.1,l=Math.sin(o*.71+4.1)*.06,c=Math.sin(o*.13+.5)*.08,h=1+a+l+c,u=Qi*h,d=Math.sqrt((i/u)**2+(r/u)**2);if(d>=1.1)return 0;const p=bM(n);let m;if(i===0&&r===0)m=p;else{const x=Math.max(0,1-d),v=Math.pow(x,.8),g=v*v*(3-2*v);m=p*g}return m}let SM=null,On=null;const ii={radius:20,centerX:0,centerZ:0,extentX:20,extentZ:20};function TM(){const s=ss,e=(ia+Qi)*s,t=(dr-Qi)*s+ut,n=(fr+Qi)*s+ut;ii.centerX=0,ii.centerZ=(t+n)/2,ii.extentX=e,ii.extentZ=(n-t)/2,ii.radius=Math.max(20,Math.sqrt(e*e+ii.extentZ*ii.extentZ)+10)}function EM(){const s=ss,e=3,t=Qi*1.3,n=ia+t+e,i=dr-t-e,r=fr+t+e,o=-n*s,a=n*s,l=i*s+ut,c=r*s+ut,h=a-o,u=c-l,d=1,p=Math.ceil(h/d),m=Math.ceil(u/d),x=new cs(h,u,p,m);x.rotateX(-Math.PI/2);const v=x.attributes.position.array,g=(o+a)/2,f=(l+c)/2,_=v.length/3,w=new Uint8Array(_);for(let S=0;S<v.length;S+=3){v[S]+=g,v[S+2]+=f;const C=Fd(v[S],v[S+2]);C>4.8?(v[S+1]=Rh+C*s,w[S/3]=1):(v[S+1]=Rh,w[S/3]=0)}const E=x.index?x.index.array:null;if(E){const S=[];for(let C=0;C<E.length;C+=3){const I=E[C],B=E[C+1],U=E[C+2];w[I]&&w[B]&&w[U]&&S.push(I,B,U)}x.setIndex(S)}x.computeVertexNormals();const y=new Qe(x,oc);return y.castShadow=!0,y.receiveShadow=!0,y}function AM(){On&&(Ro.remove(On),On.geometry.dispose(),On=null),On=EM(),On&&Ro.add(On),TM(),rs.currentRockMesh=SM,rs.currentSandMesh=On}function LM(){const s=Qi*1.3,e=ia+s,t=dr-s,n=fr+s;for(let i=-Math.ceil(e);i<=Math.ceil(e);i++)for(let r=Math.floor(t);r<=Math.ceil(n);r++){const o=i*ss,a=r*ss+ut,l=Fd(o,a);l<=0||Ju.set(i+","+r,{rockHeight:0,totalHeight:l})}}function Vh(s,e){return Math.abs(s)<=Ph&&Math.abs(e)<=Ph}function jM(s,e){if(!Vh(s,e))return;const t=Math.floor(Ky.brush/2);for(let n=-t;n<=t;n++)for(let i=-t;i<=t;i++){const r=s+i,o=e+n;if(!Vh(r,o))continue;const a=r+","+o;Ih.paintedCells.has(a)||(Ih.paintedCells.add(a),Ha.mode==="flora"&&(Ha.selectedSpecies==="REMOVE"?to.removeFlora&&to.removeFlora(r,o):to.placeFlora&&to.placeFlora(Ha.selectedSpecies,r,o)))}}function ZM(){}rs.blocksGroup=Ro;rs.sharedRockMat=Nd;rs.sharedSandMat=oc;LM();AM();export{le as $,U_ as A,Kl as B,Bo as C,Un as D,BM as E,ii as F,IM as G,OM as H,ut as I,ol as J,co as K,yl as L,Fv as M,En as N,Q as O,Rh as P,Ju as Q,PM as R,Ru as S,ss as T,RM as U,T as V,cn as W,cs as X,Ut as Y,ln as Z,Ih as _,Qe as a,ke as a0,Gn as a1,Fd as a2,Tu as a3,Be as a4,Le as a5,lM as a6,vt as a7,Ht as a8,ds as a9,fo as aA,Bs as aB,zM as aC,GM as aD,Pd as aE,Qu as aF,Gl as aG,nd as aH,XM as aI,wl as aJ,us as aK,WM as aL,ui as aM,$o as aN,gM as aO,sd as aP,rd as aQ,to as aR,ZM as aS,CM as aa,jy as ab,me as ac,ue as ad,ls as ae,Lt as af,zv as ag,vr as ah,Bl as ai,Ro as aj,kt as ak,Ph as al,HM as am,Ha as an,Ky as ao,NM as ap,YM as aq,Vh as ar,jM as as,AM as at,a_ as au,Ki as av,kM as aw,ho as ax,VM as ay,UM as az,yn as b,it as c,FM as d,Qy as e,DM as f,qM as g,H_ as h,an as i,pi as j,Us as k,go as l,mi as m,Ed as n,Jy as o,kn as p,It as q,Ad as r,Ae as s,rs as t,mM as u,nc as v,bn as w,yt as x,Ql as y,ll as z};
