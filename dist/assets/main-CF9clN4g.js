const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/main-DaXNI3Gy.js","assets/terrain-A1Y9pPeg.js"])))=>i.map(i=>d[i]);
import{G as Ye,s as U,M as ie,a as $,C as Ae,S as re,b as le,D as we,c as w,d as P,e as Q,o as ke,I as s,t as De,R as Ie,V as K,f as Pe,g as We,w as D,h as Be,i as Re,j as de,k as J,m as j,l as ee,n as Z,p as He,q as ce,r as Ne,u as B,v as qe,x as Fe,y as L,z as R,A as Xe,B as I,E as Oe,F as Ue,H as X,J as H,K as $e,L as pe}from"./terrain-A1Y9pPeg.js";const W=Math.PI/2;let _=0,Y=s;function je(){const e=Math.sin(W),t=Math.cos(W),a=pe*e,r=pe*t,o=a,i=$e+r;_=X.centerX+o,Y=s+X.centerZ+i,w.position.set(e*P+_,Math.max(.3,.3+Q*1.5),t*P+Y),w.lookAt(_,ke+Q*2,Y),w.fov=50,w.updateProjectionMatrix(),H.panX=o,H.panTargetX=o,H.panZ=i,H.panTargetZ=i}je();const oe=[];window._landingPalms=oe;const Ze=new Ye;Ze.load("assets/models/FL-001.glb",e=>{const t=e.scene;t.traverse(r=>{r.isMesh&&(r.castShadow=!0,r.receiveShadow=!0)}),[{x:.6,z:s-85,scale:3,rotY:2.2},{x:-.8,z:s-83,scale:2.8,rotY:4.5},{x:.3,z:s-81,scale:3.1,rotY:1.3},{x:-.5,z:s-79,scale:2.9,rotY:3.1},{x:.8,z:s-77,scale:3,rotY:5},{x:-1,z:s-75,scale:2.7,rotY:.8},{x:.4,z:s-73,scale:3.2,rotY:2.5},{x:-.7,z:s-71,scale:2.8,rotY:4.2},{x:1.2,z:s-69,scale:3,rotY:1},{x:-.3,z:s-67,scale:2.9,rotY:3.5},{x:.9,z:s-65,scale:3.1,rotY:5.3},{x:-.6,z:s-63,scale:2.7,rotY:.5},{x:.2,z:s-61,scale:3.3,rotY:2.8},{x:-1.1,z:s-59,scale:2.8,rotY:4},{x:.7,z:s-57,scale:3,rotY:1.7},{x:-.4,z:s-55,scale:2.9,rotY:3.9},{x:1,z:s-53,scale:3.2,rotY:5.6},{x:-.8,z:s-51,scale:2.7,rotY:.3},{x:.5,z:s-49,scale:3.1,rotY:2.1},{x:-.2,z:s-47,scale:2.8,rotY:4.4},{x:.8,z:s-45,scale:3,rotY:1.5},{x:-.9,z:s-43,scale:2.9,rotY:3.7},{x:.3,z:s-41,scale:3.2,rotY:5.1},{x:-.5,z:s-39,scale:2.7,rotY:.9},{x:1.1,z:s-37,scale:3,rotY:2.6},{x:-.7,z:s-35,scale:2.8,rotY:4.8},{x:.6,z:s-33,scale:3.1,rotY:1.2},{x:-.3,z:s-31,scale:2.9,rotY:3.4},{x:.9,z:s-29,scale:3,rotY:5.5},{x:-1,z:s-27,scale:2.7,rotY:.7},{x:.4,z:s-25,scale:3.2,rotY:2.3},{x:-.6,z:s-23,scale:2.8,rotY:4.6},{x:1.2,z:s-21,scale:3,rotY:1.8},{x:-.4,z:s-19,scale:2.9,rotY:3.2},{x:.7,z:s-17,scale:3.1,rotY:5},{x:-.8,z:s-15,scale:2.7,rotY:.4},{x:.2,z:s-13,scale:3.3,rotY:2.9},{x:-.5,z:s-11,scale:2.8,rotY:4.3},{x:1,z:s-9,scale:3,rotY:1.6},{x:-.3,z:s-7,scale:2.9,rotY:3.8},{x:.8,z:s-5,scale:3.2,rotY:5.2},{x:-.7,z:s-3,scale:2.7,rotY:.6},{x:.5,z:s-1,scale:3.1,rotY:2.4},{x:-.4,z:s+1,scale:2.8,rotY:4.1},{x:.9,z:s+5,scale:3,rotY:1.3},{x:-.6,z:s+9,scale:2.9,rotY:3.6},{x:.3,z:s+13,scale:3.2,rotY:5.4},{x:-.8,z:s+17,scale:2.7,rotY:.8},{x:1.1,z:s+21,scale:3,rotY:2.7},{x:-.3,z:s+25,scale:2.9,rotY:4.9},{x:.7,z:s+29,scale:3.1,rotY:1.1},{x:-.5,z:s+33,scale:2.8,rotY:3.3},{x:.4,z:s+37,scale:3,rotY:5.1},{x:-.9,z:s+41,scale:2.7,rotY:.5},{x:.6,z:s+45,scale:3.2,rotY:2.2},{x:-.2,z:s+49,scale:2.9,rotY:4.7},{x:.8,z:s+55,scale:3,rotY:1.4},{x:-.7,z:s+61,scale:2.8,rotY:3.5},{x:.3,z:s+67,scale:3.1,rotY:5.3},{x:-.4,z:s+73,scale:2.9,rotY:.9},{x:1,z:s+79,scale:3,rotY:2.6},{x:-.6,z:s+85,scale:2.7,rotY:4.2},{x:.5,z:s+91,scale:3.2,rotY:1.7},{x:-.3,z:s+97,scale:2.8,rotY:3.8},{x:.9,z:s+103,scale:3,rotY:5},{x:-.8,z:s+111,scale:2.9,rotY:.7},{x:.4,z:s+119,scale:3.1,rotY:2.3},{x:-.5,z:s+127,scale:2.7,rotY:4.5},{x:.7,z:s+135,scale:3,rotY:1.9},{x:-.2,z:s+143,scale:2.9,rotY:3.4}].forEach((r,o)=>{const i=t.clone(),l=r.scale*(.9+Math.random()*.2),d=.85+Math.random()*.3;i.scale.set(l,l*d,l),i.position.set(r.x,1,r.z),i.rotation.y=r.rotY,i.rotation.x=(Math.random()-.5)*.04,i.rotation.z=(Math.random()-.5)*.04,U.add(i),oe.push(i)})});function Ve(e,t){const a=De.blocksGroup;if(!a||a.children.length===0)return 1;const o=new Ie(new K(e,50,t),new K(0,-1,0)).intersectObjects(a.children,!0);return o.length>0?o[0].point.y:1}const Te=Ve(0,-155);let E;{const a=new ie({color:4491519}),r=new ie({color:16768324}),o=new $(new Ae(.3,.3,1,12,1),a);o.castShadow=!0;const i=new $(new re(.3,12,8,0,Math.PI*2,0,Math.PI/2),r);i.position.y=1/2;const l=new $(new re(.3,12,8,0,Math.PI*2,0,Math.PI/2),a);l.rotation.x=Math.PI,l.position.y=-1/2;const d=new le;d.add(o,i,l),d.position.y=1/2+.3,E=new le,E.add(d),E.position.set(0,Te,-155),E.rotation.y=Math.PI,E.scale.setScalar(1),U.add(E)}let te=!0;{let a=function(){if(!te)return;requestAnimationFrame(a);const r=t.clone().project(w),o=(r.x*.5+.5)*window.innerWidth,i=(-r.y*.5+.5)*window.innerHeight;e.style.left=o+"px",e.style.top=i+"px"};const e=document.createElement("div");e.className="this-is-you",e.textContent="This is you 😊",document.body.appendChild(e);const t=new K(0,Te+1.6+.5,-155);setTimeout(a,500),setTimeout(()=>{e.style.opacity="0",setTimeout(()=>{te=!1,e.remove()},1e3)},1e4)}function Ge(e){const t=W,a=Math.sin(t),r=Math.cos(t),o=P*(1-Ue),i=Math.abs(a)*X.extentX+Math.abs(r)*X.extentZ,l=Math.max(o,i+10),d=_,y=Y;L.position.set(Math.sin(t)*l+d,0,Math.cos(t)*l+y),L.rotation.y=t,L.visible=!0,L.material.opacity=1;const n=Math.cos(t),c=Math.sin(t),m=L.position.x,f=L.position.z;for(let b=0;b<R.count;b++){const v=R.getX(b),C=m+v*n,A=f-v*c,z=Math.sin(C*.15+e*1.2)*.14+Math.cos(-(A-s)*.12+e*.9)*.1+Math.sin(C*.4+-(A-s)*.3+e*1.8)*.05+Math.cos(C*.08+e*.4)*.2;R.setY(b,Xe[b]+z)}R.needsUpdate=!0;const g=-Math.sin(t),x=-Math.cos(t),p=l-.1,u=Math.sin(t)*p+d,h=Math.cos(t)*p+y,T=-(g*u+x*h);I.normal.set(g,0,x),I.constant=T,Oe.clippingPlanes=[I],J.clippingPlanes=[I],ee.clippingPlanes=[I]}const Qe=400,Ke=15e3,Je=performance.now();let se=!1,Ee=performance.now();we.onStart=()=>{se=!0};we.onLoad=()=>{se=!1,Ee=performance.now()};function et(){const e=document.getElementById("sceneCurtain");e&&e.classList.add("lifted"),setTimeout(()=>{e&&e.remove()},2e3)}const ue=document.getElementById("curtainClip"),me=document.getElementById("curtainFillMove"),tt=setInterval(()=>{const e=performance.now(),t=!se&&e-Ee>=Qe;(window._mainReady&&t||e-Je>=Ke)&&(clearInterval(tt),ue&&ue.classList.add("filled"),me&&me.classList.add("filled"),et())},100);let Me=!0;function Se(){if(!Me)return;requestAnimationFrame(Se);const e=Pe.getElapsedTime();We(e);for(let n=0;n<D.count;n++){const c=D.getX(n),m=D.getY(n);D.setZ(n,Be[n]+Math.sin(c*.15+e*1.2)*.14+Math.cos(m*.12+e*.9)*.1+Math.sin(c*.4+m*.3+e*1.8)*.05+Math.cos(c*.08+e*.4)*.2)}D.needsUpdate=!0,Re.computeVertexNormals();const t=de.geometry.attributes.position;for(let n=0;n<t.count;n++){const c=t.getX(n),m=t.getY(n);t.setZ(n,Math.sin(c*.15+e*1.2)*.14+Math.cos(m*.12+e*.9)*.1+Math.sin(c*.4+m*.3+e*1.8)*.05+Math.cos(c*.08+e*.4)*.2)}if(t.needsUpdate=!0,de.geometry.computeVertexNormals(),J.uniforms.uTime.value=e,J.uniforms.uCamPos.value.copy(w.position),j.visible){const n=j.geometry.attributes.position;for(let c=0;c<n.count;c++){const m=n.getX(c),f=n.getY(c);n.setZ(c,Math.sin(m*.15+e*1.2)*.14+Math.cos(f*.12+e*.9)*.1+Math.sin(m*.4+f*.3+e*1.8)*.05+Math.cos(m*.08+e*.4)*.2)}n.needsUpdate=!0,j.geometry.computeVertexNormals(),ee.uniforms.uTime.value=e,ee.uniforms.uCamPos.value.copy(w.position)}const a=ce.cover;Z.uniforms.uTime.value=e,Z.uniforms.uCloudDim.value=1-a*.7,Z.uniforms.uSunX.value=He.position.x,ce.domeRef.rotation.y=e*.003,Ne.uniforms.uTime.value=e;const r=B.geometry.attributes.position.array,o=B.geometry.attributes.alpha.array,i=-3,l=-.5;for(let n=0;n<qe;n++){r[n*3]+=Math.sin(e*.2+n)*.003,r[n*3+1]+=.003+Math.sin(e*.3+n*.5)*.001,r[n*3+2]+=Math.cos(e*.15+n)*.002;const c=r[n*3+1];c>i?o[n]=.5*Math.max(0,(l-c)/(l-i)):o[n]=.5,c>l&&(r[n*3+1]=-11,r[n*3]=(Math.random()-.5)*200,r[n*3+2]=(Math.random()-.5)*200,o[n]=.5)}B.geometry.attributes.position.needsUpdate=!0,B.geometry.attributes.alpha.needsUpdate=!0,oe.forEach((n,c)=>{n.rotation.z=Math.sin(e*.5+c*1.7)*.06}),Ge(e);const d=Math.sin(e*.3)*.01,y=Math.sin(e*.15)*.08;w.position.set(Math.sin(W)*P+y+_,2.55+d,Math.cos(W)*P+Y),w.lookAt(_,ke+Q*2,Y),Fe.render(U,w)}Se();window._landingCleanup=function(){Me=!1,te=!1;const e=document.querySelector(".this-is-you");e&&e.remove(),E&&(U.remove(E),E=null)};function at(){const t=["#ff577f","#ff884b","#ffd384","#fff9b0","#3ec1d3","#6cc4a1","#a8e6cf","#b8b5ff","#ff6b6b","#feca57","#48dbfb","#ff9ff3"],a=document.createElement("div");a.style.cssText="position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:hidden;",document.body.appendChild(a);for(let r=0;r<120;r++){const o=document.createElement("div"),i=t[Math.floor(Math.random()*t.length)],l=20+Math.random()*60,d=Math.random()*.6,y=2+Math.random()*1.5,n=(Math.random()-.5)*40,c=(Math.random()-.5)*1080,m=6+Math.random()*6,f=Math.random()>.4?m*(1.5+Math.random()):m,g=Math.random()>.6?"50%":"2px";o.style.cssText=`
      position:absolute;
      left:${l}%;
      top:-3%;
      width:${m}px;
      height:${f}px;
      background:${i};
      border-radius:${g};
      opacity:1;
      pointer-events:none;
      animation:confettiFall ${y}s ${d}s ease-in forwards;
      --drift:${n}vw;
      --spin:${c}deg;
    `,a.appendChild(o)}setTimeout(()=>a.remove(),5e3)}const nt="https://script.google.com/macros/s/AKfycbw97pWaHISz1VdJsQAp6zlLDM1tWnsxQkNsPblod1zah-oHk-c9yMsbsy8PwZ3ppcEITQ/exec",be=document.getElementById("signupForm"),ot=document.getElementById("emailInput"),N=document.getElementById("submitBtn"),q=document.getElementById("formMessage");be.addEventListener("submit",async e=>{e.preventDefault();const t=ot.value.trim();if(!t||!t.includes("@")||!t.includes(".")){q.innerHTML='<p class="landing-error">Please enter a valid email address.</p>';return}N.disabled=!0,N.textContent="Sending...",q.innerHTML="";try{await fetch(nt,{method:"POST",mode:"no-cors",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t})}),be.style.display="none",q.innerHTML=`<div class="landing-success">🌴 You're on the list! We'll ping you when it's ready. 🌴</div>`,at()}catch{N.disabled=!1,N.textContent="Notify me 🌴",q.innerHTML='<p class="landing-error">Something went wrong. Please try again.</p>'}});window.addEventListener("resize",()=>{w.aspect=window.innerWidth/window.innerHeight,w.updateProjectionMatrix()});const ae="https://stranded.live/?desktop",st="ms-windows-store://pdp/?productid=9NTM2QC6QWS7",fe="https://apps.microsoft.com/detail/9ntm2qc6qws7",it="https://apps.apple.com/app/id1494023538",rt="https://script.google.com/macros/s/AKfycbw97pWaHISz1VdJsQAp6zlLDM1tWnsxQkNsPblod1zah-oHk-c9yMsbsy8PwZ3ppcEITQ/exec",lt="phc_yX55DiaZbji4bjTM4jvrdonJ3W3kQApiCbqKr4QLkFhX",dt="https://eu-assets.i.posthog.com/static/array.js",ct=2e3;function ye(){const e=new URLSearchParams(location.search);return!!(e.has("desktop")||e.get("wallpaper")==="1"||typeof window.livelyPropertyListener<"u"||typeof window.wallpaperRegisterAudioListener=="function")}function Ce(){const e=(navigator.userAgentData&&navigator.userAgentData.platform||navigator.platform||"").toLowerCase();return e.includes("win")?"windows":e.includes("mac")?"mac":e.includes("linux")?"linux":"other"}function ze(){return window.matchMedia("(max-width: 700px)").matches||window.matchMedia("(pointer: coarse) and (max-width: 1024px)").matches}function pt(){return navigator.doNotTrack==="1"||window.doNotTrack==="1"||navigator.msDoNotTrack==="1"}let O=null;const ne=[];function S(e,t){O?O.capture(e,t||{}):ne.push([e,t||{}])}function ut(){if(pt())return;const e=document.createElement("script");e.src=dt,e.async=!0,e.onload=()=>{!window.posthog||typeof window.posthog.init!="function"||window.posthog.init(lt,{api_host:"https://eu.i.posthog.com",persistence:"memory",autocapture:!1,capture_pageview:!1,capture_pageleave:!1,disable_session_recording:!0,person_profiles:"identified_only",loaded:r=>{O=r;for(const[o,i]of ne)O.capture(o,i);ne.length=0}})},document.head.appendChild(e),S("island_view",{os:Ce(),mobile:ze()});let t=0;const a=setInterval(()=>{document.visibilityState==="visible"&&(t++,t>=60&&(clearInterval(a),S("dwell_60s",{})))},1e3)}function mt(){if(document.getElementById("ctaStyle"))return;const e=document.createElement("style");e.id="ctaStyle",e.textContent=`
  .cta-pill {
    position: fixed;
    bottom: max(30px, env(safe-area-inset-bottom, 30px));
    left: 50%;
    transform: translateX(-50%) translateY(8px);
    z-index: 300;
    padding: 16px 34px;
    border: 1.5px solid rgba(191,233,228,0.75);
    border-radius: 32px;
    background: linear-gradient(180deg, rgba(159,224,216,0.30), rgba(106,188,177,0.22));
    backdrop-filter: blur(14px) saturate(1.2);
    -webkit-backdrop-filter: blur(14px) saturate(1.2);
    color: #fff;
    font: 700 15px/1 system-ui, -apple-system, sans-serif;
    letter-spacing: 0.03em;
    text-shadow: 0 1px 8px rgba(10,40,36,0.35);
    box-shadow: 0 10px 36px rgba(96,180,168,0.40), inset 0 1px 0 rgba(255,255,255,0.35);
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.9s ease, transform 0.9s ease, background 0.2s, border-color 0.2s, box-shadow 0.2s;
  }
  .cta-pill::after {
    /* breathing lagoon glow — opacity-only animation (compositor, no repaints) */
    content: '';
    position: absolute;
    inset: -14px;
    border-radius: 44px;
    background: radial-gradient(closest-side, rgba(143,216,207,0.35), rgba(143,216,207,0));
    z-index: -1;
    pointer-events: none;
    animation: ctaGlow 3.2s ease-in-out infinite;
  }
  @keyframes ctaGlow {
    0%, 100% { opacity: 0.45; }
    50%      { opacity: 1; }
  }
  .cta-pill.show { opacity: 1; transform: translateX(-50%) translateY(0); }
  .cta-pill:hover {
    background: linear-gradient(180deg, rgba(175,232,225,0.42), rgba(120,200,189,0.32));
    border-color: rgba(220,245,242,0.95);
    box-shadow: 0 14px 44px rgba(96,180,168,0.55), inset 0 1px 0 rgba(255,255,255,0.45);
    transform: translateX(-50%) translateY(-3px) scale(1.02);
  }
  .cta-backdrop {
    position: fixed;
    inset: 0;
    z-index: 400;
    background: rgba(4,10,14,0.4);
    backdrop-filter: blur(7px);
    -webkit-backdrop-filter: blur(7px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 18px;
    opacity: 0;
    transition: opacity 0.25s ease;
  }
  .cta-backdrop.show { opacity: 1; }
  .cta-card {
    width: min(520px, 94vw);
    max-height: min(86vh, 720px);
    overflow-y: auto;
    border-radius: 22px;
    border: 1px solid rgba(255,255,255,0.22);
    background: rgba(8,16,22,0.62);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    box-shadow: 0 18px 60px rgba(0,0,0,0.45);
    color: #fff;
    padding: 26px 26px 22px;
    transform: translateY(10px);
    transition: transform 0.25s ease;
  }
  .cta-backdrop.show .cta-card { transform: translateY(0); }
  .cta-h {
    font-family: 'Tahiti', serif;
    font-size: clamp(1.35rem, 4.2vw, 1.8rem);
    letter-spacing: 0.06em;
    line-height: 1.1;
    margin: 0 0 6px;
    text-align: center;
  }
  .cta-sub {
    font: 400 13px/1.5 system-ui, sans-serif;
    color: rgba(255,255,255,0.75);
    text-align: center;
    margin: 0 0 18px;
  }
  .cta-close {
    position: absolute;
    top: 14px; right: 16px;
    width: 32px; height: 32px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.25);
    background: rgba(255,255,255,0.08);
    color: #fff;
    font: 400 15px/1 system-ui, sans-serif;
    cursor: pointer;
    transition: background 0.2s;
  }
  .cta-close:hover { background: rgba(255,255,255,0.2); }
  .cta-tabs { display: flex; gap: 5px; margin-bottom: 16px; }
  .cta-tabs button {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    padding: 8px 4px;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.22);
    background: rgba(0,0,0,0.3);
    color: #fff;
    font: 600 11px/1.2 system-ui, sans-serif;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
  }
  .cta-tabs button .os { font-weight: 400; font-size: 9.5px; opacity: 0.65; }
  .cta-tabs button:hover { background: rgba(255,255,255,0.12); }
  .cta-tabs button.on { background: rgba(255,255,255,0.9); color: #14202a; }
  .cta-tabs button.on .os { opacity: 0.6; }
  .cta-badge {
    display: inline-block;
    margin-left: 6px;
    padding: 2px 8px;
    border-radius: 999px;
    background: rgba(143,216,207,0.18);
    border: 1px solid rgba(143,216,207,0.5);
    color: #bfe9e4;
    font: 600 10px/1.3 system-ui, sans-serif;
    vertical-align: middle;
  }
  .cta-steps { margin: 0; padding: 0 0 0 2px; list-style: none; counter-reset: ctastep; }
  .cta-steps li {
    counter-increment: ctastep;
    position: relative;
    padding: 0 0 14px 34px;
    font: 400 13px/1.55 system-ui, sans-serif;
    color: rgba(255,255,255,0.88);
  }
  .cta-steps li::before {
    content: counter(ctastep);
    position: absolute;
    left: 0; top: 1px;
    width: 22px; height: 22px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.35);
    background: rgba(255,255,255,0.1);
    font: 600 11px/22px system-ui, sans-serif;
    text-align: center;
  }
  .cta-note {
    font: 400 12px/1.55 system-ui, sans-serif;
    color: rgba(255,255,255,0.65);
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 12px;
    padding: 10px 12px;
    margin: 0 0 14px;
  }
  .cta-link {
    color: #9fe0d8;
    text-decoration: underline;
    text-underline-offset: 2px;
  }
  .cta-copyrow { display: flex; gap: 6px; margin: 8px 0 2px; }
  .cta-copyrow input {
    flex: 1;
    min-width: 0;
    padding: 9px 12px;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.25);
    background: rgba(0,0,0,0.35);
    color: #cfe8e4;
    font: 500 12px/1 ui-monospace, Consolas, monospace;
    outline: none;
  }
  .cta-copyrow button, .cta-mailrow button {
    padding: 9px 16px;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.4);
    background: rgba(255,255,255,0.14);
    color: #fff;
    font: 600 12px/1 system-ui, sans-serif;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.2s;
  }
  .cta-copyrow button:hover, .cta-mailrow button:hover { background: rgba(255,255,255,0.28); }
  .cta-shot {
    display: block;
    width: 100%;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.14);
    margin: 8px 0 2px;
  }
  .cta-mailrow { display: flex; gap: 6px; margin-top: 8px; }
  .cta-mailrow input {
    flex: 1;
    min-width: 0;
    padding: 9px 12px;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.25);
    background: rgba(0,0,0,0.35);
    color: #fff;
    font: 400 13px/1 system-ui, sans-serif;
    outline: none;
  }
  .cta-mailrow input:focus { border-color: rgba(255,255,255,0.6); }
  .cta-mailmsg { font: 400 12px/1.4 system-ui, sans-serif; margin-top: 7px; min-height: 16px; }
  .cta-mailmsg.ok { color: #9fe0d8; }
  .cta-mailmsg.err { color: #ff9f9f; }
  .cta-mailrow button {
    background: linear-gradient(180deg, rgba(159,224,216,0.9), rgba(122,201,190,0.8));
    border-color: rgba(220,245,242,0.85);
    color: #11332e;
    font-weight: 700;
  }
  .cta-mailrow button:hover { background: linear-gradient(180deg, rgba(180,235,228,0.95), rgba(140,214,203,0.85)); }
  .cta-bottle {
    margin-top: 18px;
    padding: 16px 16px 13px;
    border-radius: 16px;
    border: 1px solid rgba(143,216,207,0.4);
    background: linear-gradient(180deg, rgba(143,216,207,0.13), rgba(143,216,207,0.04));
  }
  .cta-bottle h3 { margin: 0 0 5px; font: 700 14px/1.3 system-ui, sans-serif; }
  .cta-bottle p { margin: 0 0 6px; font: 400 12px/1.55 system-ui, sans-serif; color: rgba(255,255,255,0.72); }
  .cta-sheet {
    position: fixed;
    left: 0; right: 0;
    bottom: 0;
    z-index: 400;
    border-radius: 20px 20px 0 0;
    border: 1px solid rgba(255,255,255,0.2);
    border-bottom: none;
    background: rgba(8,16,22,0.72);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    padding: 18px 18px max(18px, env(safe-area-inset-bottom, 18px));
    color: #fff;
    transform: translateY(102%);
    transition: transform 0.3s cubic-bezier(0.22, 0.61, 0.36, 1);
  }
  .cta-sheet.show { transform: translateY(0); }
  .cta-sheet p { margin: 0 0 10px; font: 400 13px/1.5 system-ui, sans-serif; color: rgba(255,255,255,0.85); }
  .cta-sheet .cta-actions { display: flex; gap: 6px; margin-top: 10px; }
  .cta-sheet .cta-actions button {
    flex: 1;
    padding: 10px 12px;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.35);
    background: rgba(255,255,255,0.12);
    color: #fff;
    font: 600 12px/1 system-ui, sans-serif;
    cursor: pointer;
  }
  `,document.head.appendChild(e)}function Le(e,t){const a=document.createElement("div");a.innerHTML=`
    <div class="cta-mailrow">
      <input type="email" autocomplete="email" placeholder="your@email.com" aria-label="Email address">
      <button type="button">Send 🍾</button>
    </div>
    <div class="cta-mailmsg" role="status"></div>`;const r=a.querySelector("input"),o=a.querySelector("button"),i=a.querySelector(".cta-mailmsg");return o.addEventListener("click",async()=>{const l=r.value.trim();if(!l||!l.includes("@")||!l.includes(".")){i.className="cta-mailmsg err",i.textContent="That email doesn’t look right.";return}o.disabled=!0,o.textContent="Sending…";const d=typeof e=="function"?e():e;try{await fetch(rt,{method:"POST",mode:"no-cors",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:l,source:d,wish:"install-interest: "+d,bug:"empty"})}),i.className="cta-mailmsg ok",i.textContent="Bottle received. Watch the horizon.",r.value="",S("email_submit",{source:d})}catch{i.className="cta-mailmsg err",i.textContent="The tide ate it. Try again?"}o.disabled=!1,o.textContent="Send 🍾"}),a}function V(e){const t=document.createElement("div");t.className="cta-copyrow",t.innerHTML=`
    <input type="text" readonly value="${ae}" aria-label="Wallpaper link">
    <button type="button">Copy</button>`;const a=t.querySelector("input"),r=t.querySelector("button");return r.addEventListener("click",async()=>{let o=!1;try{await navigator.clipboard.writeText(ae),o=!0}catch{try{a.focus(),a.select(),o=document.execCommand("copy")}catch{}}r.textContent=o?"Copied ✓":"Copy failed",setTimeout(()=>{r.textContent="Copy"},1700),o&&S("url_copy",{host:e})}),t}function ge(e,t){return`<img class="cta-shot" src="assets/install/${e}" alt="${t}" loading="lazy" onerror="this.style.display='none'">`}let k=null,F=null;const xe=[{id:"lively",os:"Windows",name:"Lively"},{id:"we",os:"Windows",name:"Wallpaper Engine"},{id:"plash",os:"macOS",name:"Plash"}];let _e="lively";function bt(e){const t=document.createElement("div");if(t.dataset.panel=e,e==="lively"){t.innerHTML=`
      <ol class="cta-steps">
        <li>Install <a class="cta-link" href="${st}"
              onclick="setTimeout(()=>{ if (document.visibilityState==='visible') window.open('${fe}','_blank','noopener'); }, 600); return false;"
            >Lively Wallpaper</a> <span class="cta-badge">Recommended · Free</span><br>
            <a class="cta-link" href="${fe}" target="_blank" rel="noopener">Microsoft Store page</a>
            ${ge("lively-store.png","Lively Wallpaper on the Microsoft Store")}</li>
        <li>In Lively: click <strong>+ Add Wallpaper</strong>, then paste this link:
            ${ge("lively-add-url.png","Lively — Add Wallpaper dialog with the URL field")}</li>
      </ol>`,t.children[0].children[1].appendChild(V("lively"));const a=document.createElement("ol");a.className="cta-steps",a.style.counterReset="ctastep 2",a.innerHTML="<li>Done. Hover the palms. Click the sand. The gear icon (top-right) has settings.</li>",t.appendChild(a)}return e==="we"&&(t.innerHTML=`
      <div class="cta-note">Already own Wallpaper Engine ($4 on Steam)? It works, with one limit:
        it forwards mouse movement but not clicks, so palms sway under your cursor but
        tap-to-walk stays off.</div>
      <ol class="cta-steps">
        <li>Right-click the Wallpaper Engine icon in your system tray.</li>
        <li>Choose <strong>Change Wallpaper</strong> → <strong>Open From URL</strong>, and paste this link:</li>
      </ol>`,t.querySelectorAll(".cta-steps li")[1].appendChild(V("we"))),e==="plash"&&(t.innerHTML=`
      <ol class="cta-steps">
        <li>Install <a class="cta-link" href="${it}" target="_blank" rel="noopener">Plash</a>
            (free, Mac App Store).</li>
        <li>Click the Plash menu-bar icon → <strong>Add Website</strong> → paste this link:</li>
        <li>Enable Plash’s <strong>Browsing Mode</strong> if you want the island to respond
            to your cursor.</li>
      </ol>`,t.querySelectorAll(".cta-steps li")[1].appendChild(V("plash"))),t}function he(e,t){_e=t,e.querySelectorAll(".cta-tabs button").forEach(a=>{a.classList.toggle("on",a.dataset.tab===t),a.setAttribute("aria-selected",a.dataset.tab===t?"true":"false")}),e.querySelectorAll("[data-panel]").forEach(a=>{a.style.display=a.dataset.panel===t?"":"none"}),S("tab_view",{tab:t})}function ft(){if(F=document.activeElement,!k){const t=document.createElement("div");t.className="cta-backdrop",t.innerHTML=`
      <div class="cta-card" role="dialog" aria-modal="true" aria-label="Make this island your desktop wallpaper" style="position:relative;">
        <button type="button" class="cta-close" aria-label="Close">✕</button>
        <h2 class="cta-h">Make this island your desktop wallpaper</h2>
        <p class="cta-sub">A calm, living island behind your windows. Pick your setup:</p>
        <div class="cta-tabs" role="tablist">
          ${xe.map(o=>`<button type="button" role="tab" data-tab="${o.id}">
              ${o.os?`<span class="os">${o.os}</span>`:'<span class="os">&nbsp;</span>'}${o.name}
            </button>`).join("")}
        </div>
      </div>`;const a=t.querySelector(".cta-card");for(const o of xe)a.appendChild(bt(o.id));const r=document.createElement("div");r.className="cta-bottle",r.innerHTML=`
      <h3>Prefer a one-click app? 🍾</h3>
      <p>We’re building a tiny installer — download, and the island is your
        desktop. No third-party apps, no URLs. Leave your email and a message
        in a bottle will wash up when it ships.</p>`,r.appendChild(Le(()=>"oneclick:"+_e)),a.appendChild(r),t.querySelectorAll(".cta-tabs button").forEach(o=>{o.addEventListener("click",()=>he(t,o.dataset.tab))}),t.querySelector(".cta-close").addEventListener("click",G),t.addEventListener("click",o=>{o.target===t&&G()}),t.addEventListener("keydown",o=>{if(o.key==="Escape"){G();return}if(o.key!=="Tab")return;const i=t.querySelectorAll("button, input, a[href]"),l=Array.from(i).filter(n=>n.offsetParent!==null);if(!l.length)return;const d=l[0],y=l[l.length-1];o.shiftKey&&document.activeElement===d?(y.focus(),o.preventDefault()):!o.shiftKey&&document.activeElement===y&&(d.focus(),o.preventDefault())}),document.body.appendChild(t),k=t}k.style.display="flex",document.body.style.overflow="hidden";const e=Ce();he(k,e==="mac"?"plash":"lively"),requestAnimationFrame(()=>k.classList.add("show")),k.querySelector(".cta-close").focus()}function G(){k&&(k.classList.remove("show"),document.body.style.overflow="",setTimeout(()=>{k&&(k.style.display="none")},250),F&&F.focus&&F.focus())}let M=null;function yt(){if(!M){const e=document.createElement("div");e.className="cta-sheet",e.setAttribute("role","dialog"),e.setAttribute("aria-label","Send this to your computer"),e.innerHTML="<p>The island lives on desktops. Mail yourself the link:</p>",e.appendChild(Le("mobile"));const t=document.createElement("div");t.className="cta-actions",t.innerHTML=`
      <button type="button" data-act="copy">Copy link</button>
      ${navigator.share?'<button type="button" data-act="share">Share</button>':""}
      <button type="button" data-act="close">Close</button>`,e.appendChild(t),t.querySelector('[data-act="copy"]').addEventListener("click",async r=>{const o=r.currentTarget;let i=!1;try{await navigator.clipboard.writeText(ae),i=!0}catch{}o.textContent=i?"Copied ✓":"Copy failed",setTimeout(()=>{o.textContent="Copy link"},1700),i&&S("url_copy",{host:"mobile"})});const a=t.querySelector('[data-act="share"]');a&&a.addEventListener("click",()=>{S("share_click",{}),navigator.share({title:"Stranded in Paradise",url:"https://stranded.live"}).catch(()=>{})}),t.querySelector('[data-act="close"]').addEventListener("click",gt),document.body.appendChild(e),M=e}M.style.display="",requestAnimationFrame(()=>M.classList.add("show"))}function gt(){M&&(M.classList.remove("show"),setTimeout(()=>{M&&(M.style.display="none")},320))}function xt(){mt();const e=document.createElement("style");e.textContent=".sip-set { display: none !important; }",document.head.appendChild(e);const t=ze(),a=document.createElement("button");a.type="button",a.className="cta-pill",a.textContent=t?"Send this to your computer":"Make this your desktop",a.addEventListener("click",()=>{S("cta_click",{mobile:t}),t?yt():ft()}),document.body.appendChild(a),requestAnimationFrame(()=>a.classList.add("show"))}ye()||setTimeout(()=>{ye()||(xt(),ut())},ct);const ht="modulepreload",vt=function(e){return"/"+e},ve={},wt=function(t,a,r){let o=Promise.resolve();if(a&&a.length>0){let l=function(n){return Promise.all(n.map(c=>Promise.resolve(c).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};document.getElementsByTagName("link");const d=document.querySelector("meta[property=csp-nonce]"),y=(d==null?void 0:d.nonce)||(d==null?void 0:d.getAttribute("nonce"));o=l(a.map(n=>{if(n=vt(n),n in ve)return;ve[n]=!0;const c=n.endsWith(".css"),m=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${n}"]${m}`))return;const f=document.createElement("link");if(f.rel=c?"stylesheet":ht,c||(f.as="script"),f.crossOrigin="",f.href=n,y&&f.setAttribute("nonce",y),document.head.appendChild(f),c)return new Promise((g,x)=>{f.addEventListener("load",g),f.addEventListener("error",()=>x(new Error(`Unable to preload CSS for ${n}`)))})}))}function i(l){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=l,window.dispatchEvent(d),!d.defaultPrevented)throw l}return o.then(l=>{for(const d of l||[])d.status==="rejected"&&i(d.reason);return t().catch(i)})};(function(){if(window._isWallpaper=!0,new URLSearchParams(location.search).get("dev")!=="1")try{sessionStorage.removeItem("sipDev")}catch{}kt();var t=document.getElementById("hud");t&&(t.style.display="flex"),window._seamlessTransition=!0,wt(()=>import("./main-DaXNI3Gy.js"),__vite__mapDeps([0,1])).then(function(){window._mainReady=!0}).catch(function(a){console.error("Failed to load game:",a),window._mainReady=!0})})();function kt(){var e=document.createElement("div");e.id="devUI",e.style.display="none",e.innerHTML=['<div id="buildPanel" style="display:none;"></div>','<span id="seedLabel"></span><button id="btnNewSeed"></button>','<div id="cloudToggle" style="display:none;">','<button id="btnRotLeft"></button>','<button id="btnTopDown"><span id="camLabel"></span></button>','<button id="btnRotRight"></button>','<button id="btnBuild"></button>','<select id="weatherSelect"><option value="auto"></option></select>','<select id="moonPhaseSelect"><option value="auto"></option></select>','<div id="dncPanel">','<span id="dncPhaseLabel"></span>','<input type="range" id="dncSlider" min="0" max="600" value="50">','<select id="dncSelect"><option value="auto"></option></select>','<span id="dncTimeLabel"></span>',"</div>","</div>",'<div id="calibPanelStack" style="display:none;">','<div id="calibHeader"><span id="calibToggle"></span></div>','<div id="calibBody" style="display:none;">','<div id="vpCalibDebug"><div id="vpCalibHeader"><span id="vpCalibToggle"></span></div><div id="vpCalibBody" style="display:none;">','<button id="vpToggle_mobile"><span></span></button><select id="vpDevSel_mobile"></select>','<button id="vpToggle_tablet"><span></span></button><select id="vpDevSel_tablet"></select>','<button id="vpToggle_desktop"><span></span></button><select id="vpDevSel_desktop"></select>',"</div></div>",'<div id="sunArcDebug"><div id="sunArcHeader"><button id="sunArcHide"></button><span id="sunArcToggle"></span></div><div id="sunArcBody" style="display:none;">','<button id="sacTab_mobile"></button><button id="sacTab_tablet"></button><button id="sacTab_desktop"></button>','<input type="range" id="slAzStart"><span id="sacAzS"></span>','<input type="range" id="slAzEnd"><span id="sacAzE"></span>','<input type="range" id="slElevPeak"><span id="sacElP"></span>','<div id="vpSel_mobile"><select id="devSel_mobile"></select></div>','<div id="vpSel_tablet"><select id="devSel_tablet"></select></div>','<div id="vpSel_desktop"><select id="devSel_desktop"></select></div>',"</div></div>",'<div id="moonArcDebug"><div id="moonArcHeader"><button id="moonArcHide"></button><span id="moonArcToggle"></span></div><div id="moonArcBody" style="display:none;">','<button id="macTab_mobile"></button><button id="macTab_tablet"></button><button id="macTab_desktop"></button>','<input type="range" id="slMoonAzCenter"><span id="macAzC"></span>','<input type="range" id="slMoonAzDrift"><span id="macAzD"></span>','<input type="range" id="slMoonElevBase"><span id="macElB"></span>','<input type="range" id="slMoonElevArc"><span id="macElA"></span>','<div id="macVpSel_mobile"><select id="macDevSel_mobile"></select></div>','<div id="macVpSel_tablet"><select id="macDevSel_tablet"></select></div>','<div id="macVpSel_desktop"><select id="macDevSel_desktop"></select></div>',"</div></div>",'<div id="causticDebug"><div id="causticDbgHeader"><span id="causticDbgToggle"></span></div><div id="causticDbgBody" style="display:none;"><input type="range" id="causticScaleRange" min="0.5" max="4.0" step="0.1" value="3.0"><span id="causticScaleVal">3.0</span></div></div>','<div id="camDebug"><div id="camDbgHeader"><span id="camDbgToggle"></span></div><div id="camDbgBody" style="display:none;">','<input type="range" id="camDbgZoom"><span id="camDbgZoomVal"></span>','<input type="range" id="camDbgPosX"><input type="range" id="camDbgPosZ"><span id="camDbgPosVal"></span>','<input type="range" id="camDbgLookY"><span id="camDbgLookYVal"></span>','<div id="camDbgLive"></div>',"</div></div>","</div>","</div>"].join(""),document.body.appendChild(e);var t=document.createElement("div");t.id="gameUI",t.style.display="none",document.body.appendChild(t);var a=document.createElement("button");a.id="modeToggle",a.style.display="none",document.body.appendChild(a);var r=document.createElement("button");r.id="hideDevUI",r.style.display="none",document.body.appendChild(r);var o=document.createElement("button");o.id="playerToggle",o.style.display="none",document.body.appendChild(o);var i=document.createElement("div");i.className="signup-bar",i.id="guestSignupBar",i.style.cssText="position:fixed;top:0;left:0;right:0;z-index:200;display:flex;align-items:center;justify-content:center;gap:12px;padding:12px 20px;background:rgba(0,0,0,0.3);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);flex-wrap:wrap;transform:translateY(-100%);transition:transform 0.6s cubic-bezier(0.22,1,0.36,1);",i.innerHTML=[`<p class="signup-label">Get a message in a bottle when it's ready:</p>`,'<form class="signup-form" id="signupBarForm" style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;justify-content:center;">','<input class="signup-input" id="barEmailInput" type="email" placeholder="your@email.com" required autocomplete="email" style="padding:8px 14px;border:2px solid rgba(255,255,255,0.4);border-radius:25px;background:rgba(0,0,0,0.25);backdrop-filter:blur(12px);color:#fff;font:400 13px/1 system-ui,sans-serif;text-align:left;outline:none;width:min(200px,40vw);">','<span id="wishWrap" style="display:inline-flex;position:relative;overflow:hidden;border-radius:25px;">','<button id="wishToggle" type="button" style="padding:8px 14px;border:2px dotted rgba(255,255,255,0.6);border-radius:25px;background:rgba(255,255,255,0.15);backdrop-filter:blur(12px);color:#fff;font:600 13px/1 system-ui,sans-serif;cursor:pointer;transition:all 0.35s;white-space:nowrap;max-width:160px;overflow:hidden;box-sizing:border-box;">Add a wish</button>','<input id="wishInput" type="text" placeholder="I wish I could..." maxlength="200" autocomplete="off" style="padding:8px 14px;border:0;border-radius:25px;background:rgba(0,0,0,0.25);backdrop-filter:blur(12px);color:#fff;font:400 13px/1 system-ui,sans-serif;outline:none;max-width:0;opacity:0;overflow:hidden;padding-left:0;padding-right:0;transition:max-width 0.4s cubic-bezier(0.22,1,0.36,1),opacity 0.3s ease 0.1s,padding 0.4s ease,border-width 0.35s ease;">','<div id="wishDropdown" style="position:absolute;top:calc(100% + 6px);left:50%;transform:translateX(-50%) translateY(-4px);min-width:240px;background:rgba(10,10,20,0.85);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.2);border-radius:14px;padding:6px 0;z-index:300;opacity:0;pointer-events:none;transition:opacity 0.2s ease,transform 0.2s ease;box-shadow:0 8px 32px rgba(0,0,0,0.4);"></div>',"</span>",'<span id="bugWrap" style="display:inline-flex;position:relative;overflow:hidden;border-radius:25px;">','<button id="bugToggle" type="button" style="padding:8px 14px;border:2px dotted rgba(255,255,255,0.6);border-radius:25px;background:rgba(255,255,255,0.15);backdrop-filter:blur(12px);color:#fff;font:600 13px/1 system-ui,sans-serif;cursor:pointer;transition:all 0.35s;white-space:nowrap;max-width:160px;overflow:hidden;box-sizing:border-box;">Report a bug</button>','<input id="bugInput" type="text" placeholder="Describe the bug..." maxlength="300" autocomplete="off" style="padding:8px 14px;border:0;border-radius:25px;background:rgba(0,0,0,0.25);backdrop-filter:blur(12px);color:#fff;font:400 13px/1 system-ui,sans-serif;outline:none;max-width:0;opacity:0;overflow:hidden;padding-left:0;padding-right:0;transition:max-width 0.4s cubic-bezier(0.22,1,0.36,1),opacity 0.3s ease 0.1s,padding 0.4s ease,border-width 0.35s ease;">',"</span>",'<span style="width:1px;height:20px;background:rgba(255,255,255,0.3);flex-shrink:0;"></span>','<button id="sendBtn" type="submit" style="padding:8px 14px;border:2px solid rgba(255,255,255,0.6);border-radius:25px;background:rgba(255,255,255,0.15);backdrop-filter:blur(12px);color:#fff;font:600 13px/1 system-ui,sans-serif;cursor:pointer;transition:all 0.2s;white-space:nowrap;box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center;">Send ✨</button>',"</form>",'<div id="barFormMessage"></div>'].join(""),document.body.appendChild(i),i.offsetHeight,i.style.display="flex",setTimeout(function(){i.style.transform="translateY(0)"},50),Tt()}function Tt(){var e="https://script.google.com/macros/s/AKfycbw97pWaHISz1VdJsQAp6zlLDM1tWnsxQkNsPblod1zah-oHk-c9yMsbsy8PwZ3ppcEITQ/exec";window._notify=function(p){try{var u=new(window.AudioContext||window.webkitAudioContext),h=u.createOscillator(),T=u.createGain();h.connect(T),T.connect(u.destination),h.type="sine",h.frequency.setValueAtTime(880,u.currentTime),h.frequency.setValueAtTime(1108.73,u.currentTime+.08),h.frequency.setValueAtTime(1318.51,u.currentTime+.16),T.gain.setValueAtTime(.15,u.currentTime),T.gain.exponentialRampToValueAtTime(.001,u.currentTime+.4),h.start(u.currentTime),h.stop(u.currentTime+.4)}catch{}var b=document.getElementById("taskToast");b||(b=document.createElement("div"),b.id="taskToast",b.style.cssText="position:fixed;top:20px;left:50%;transform:translateX(-50%);background:rgba(76,175,80,0.95);color:#fff;padding:12px 24px;border-radius:12px;font:600 14px/1 system-ui,sans-serif;z-index:9999;pointer-events:none;opacity:0;transition:opacity 0.3s,transform 0.3s;backdrop-filter:blur(8px);box-shadow:0 4px 20px rgba(0,0,0,0.3);",document.body.appendChild(b)),b.textContent=p||"Task complete",b.style.opacity="1",b.style.transform="translateX(-50%) translateY(0)",clearTimeout(b._timer),b._timer=setTimeout(function(){b.style.opacity="0",b.style.transform="translateX(-50%) translateY(-10px)"},3e3)};var t=document.getElementById("signupBarForm"),a=document.getElementById("barEmailInput"),r=document.getElementById("wishWrap"),o=document.getElementById("wishToggle"),i=document.getElementById("wishInput"),l=document.getElementById("sendBtn"),d=document.getElementById("barFormMessage"),y=document.getElementById("guestSignupBar"),n=document.getElementById("wishDropdown");if(o&&o.addEventListener("click",function(){o.style.cssText+="opacity:0;max-width:0;padding:0;border-width:0;pointer-events:none;";var p=i;p.style.maxWidth="min(220px, 35vw)",p.style.opacity="1",p.style.padding="8px 14px",p.style.borderWidth="2px",p.style.border="2px solid rgba(255,255,255,0.4)",r.style.overflow="visible",setTimeout(function(){p.focus(),n&&(n.style.opacity="1",n.style.pointerEvents="auto",n.style.transform="translateX(-50%) translateY(0)")},400)}),n){var c=["🏠 Build a treehouse","🐬 Swim with dolphins","💎 Find buried treasure","🏝️ Live on this island forever","🦜 Tame a parrot","🌊 Surf a tsunami","🦀 Befriend a coconut crab","🧜‍♀️ Make love to mermaids"],m="padding:8px 16px;color:rgba(255,255,255,0.8);font:400 12px/1.4 system-ui,sans-serif;cursor:pointer;transition:background 0.15s,color 0.15s;white-space:nowrap;";n.innerHTML=c.map(function(p){return'<div class="wish-dropdown-item" style="'+m+'">'+p+"</div>"}).join(""),n.addEventListener("click",function(p){var u=p.target.closest(".wish-dropdown-item");if(u){var h=u.textContent.replace(/^.+?\s/,"");i.value="I wish I could "+h.charAt(0).toLowerCase()+h.slice(1),n.style.opacity="0",n.style.pointerEvents="none",n.style.transform="translateX(-50%) translateY(-4px)",i.focus()}}),n.addEventListener("mouseover",function(p){var u=p.target.closest(".wish-dropdown-item");u&&(u.style.background="rgba(255,255,255,0.12)",u.style.color="#fff")}),n.addEventListener("mouseout",function(p){var u=p.target.closest(".wish-dropdown-item");u&&(u.style.background="",u.style.color="rgba(255,255,255,0.8)")}),document.addEventListener("click",function(p){r.contains(p.target)||(n.style.opacity="0",n.style.pointerEvents="none",n.style.transform="translateX(-50%) translateY(-4px)",i.style.opacity==="1"&&!i.value&&(i.style.maxWidth="0",i.style.opacity="0",i.style.padding="0",i.style.paddingLeft="0",i.style.paddingRight="0",i.style.borderWidth="0",r.style.overflow="hidden",o.style.cssText=o.style.cssText.replace(/opacity:0;max-width:0;padding:0;border-width:0;pointer-events:none;/g,""),o.style.opacity="1",o.style.maxWidth="160px",o.style.padding="8px 14px",o.style.borderWidth="2px",o.style.pointerEvents="auto"))}),i.addEventListener("focus",function(){i.value||(n.style.opacity="1",n.style.pointerEvents="auto",n.style.transform="translateX(-50%) translateY(0)")}),i.addEventListener("input",function(){n.style.opacity="0",n.style.pointerEvents="none",n.style.transform="translateX(-50%) translateY(-4px)"})}var f=document.getElementById("bugWrap"),g=document.getElementById("bugToggle"),x=document.getElementById("bugInput");g&&(g.addEventListener("click",function(){g.style.cssText+="opacity:0;max-width:0;padding:0;border-width:0;pointer-events:none;";var p=x;p.style.maxWidth="min(260px, 45vw)",p.style.opacity="1",p.style.padding="8px 14px",p.style.borderWidth="2px",p.style.border="2px solid rgba(255,255,255,0.4)",f.style.overflow="visible",setTimeout(function(){p.focus()},400)}),document.addEventListener("click",function(p){!f.contains(p.target)&&x.style.opacity==="1"&&!x.value&&(x.style.maxWidth="0",x.style.opacity="0",x.style.padding="0",x.style.paddingLeft="0",x.style.paddingRight="0",x.style.borderWidth="0",f.style.overflow="hidden",g.style.cssText=g.style.cssText.replace(/opacity:0;max-width:0;padding:0;border-width:0;pointer-events:none;/g,""),g.style.opacity="1",g.style.maxWidth="160px",g.style.padding="8px 14px",g.style.borderWidth="2px",g.style.pointerEvents="auto")})),t&&t.addEventListener("submit",async function(p){p.preventDefault();var u=a.value.trim();if(!u||!u.includes("@")||!u.includes(".")){a.style.borderColor="#ff9999",a.setAttribute("placeholder","email required"),setTimeout(function(){a.style.borderColor="",a.setAttribute("placeholder","your@email.com")},2e3);return}var h=i.value.trim()||"empty",T=x&&x.value.trim()||"empty";if(l.disabled=!0,l.textContent="Sending",l.style.cssText+="pointer-events:none;opacity:0.7;",!document.getElementById("sendSpinStyle")){var b=document.createElement("style");b.id="sendSpinStyle",b.textContent='@keyframes spin{to{transform:rotate(360deg)}}#sendBtn.sending::after{content:"";display:inline-block;width:12px;height:12px;margin-left:6px;border:2px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%;animation:spin .6s linear infinite;vertical-align:middle;}',document.head.appendChild(b)}l.classList.add("sending"),d&&(d.innerHTML="");try{await fetch(e,{method:"POST",mode:"no-cors",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:u,wish:h,bug:T})});var v=[];v.push("We’ve received your interest"),h!=="empty"&&v.push("your wish"),T!=="empty"&&v.push("your bug report");var C=v.length===1?v[0]:v.slice(0,-1).join(", ")+" and "+v[v.length-1];C+=". Thank you! 🌴",t.style.opacity="0",t.style.transition="opacity 0.4s ease",t.style.pointerEvents="none";var A=y.querySelector(".signup-label");A&&(A.style.display="none");var z=document.createElement("div");z.style.cssText="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#fff;font:600 15px/1.4 system-ui,sans-serif;text-align:center;opacity:0;transition:opacity 0.5s ease 0.2s;padding:0 20px;",z.textContent=C,y.appendChild(z),setTimeout(function(){z.style.opacity="1"},50),d&&(d.style.display="none"),y.style.transition="transform 0.6s cubic-bezier(0.55,0,1,0.45) 4s",y.style.transform="translateY(-100%)"}catch{l.disabled=!1,l.textContent="Send ✨",l.classList.remove("sending"),l.style.pointerEvents="",l.style.opacity=""}})}
