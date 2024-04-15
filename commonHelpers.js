import{a as m,S as L,i as d}from"./assets/vendor-6e0bf343.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();m.defaults.baseURL="https://pixabay.com";async function p(i,t){const a="43325943-c4525b1bf8c32c5adbdca812a";return await m.get("/api/",{params:{key:a,q:i,orientation:"horizontal",image_type:"photo",safesearch:"true",per_page:"15",page:t}})}const f=document.querySelector(".loader");function g(i){return i.map(({webformatURL:t,largeImageURL:a,tags:o,likes:e,views:s,comments:r,downloads:y})=>`<li class="gallery-items">      
          <div class="gallery-item">
            <a  href="${a}">
            <img  data-source=${a} src="${t}" alt="${o}" >
           </a>
          </div>
          <div class="image-info">
            <div>
             <p class="images-name">Likes:</p> 
             <p class="images-num"> ${e}</p>
            </div>
            <div>
              <p class="images-name">Views:</p>
              <p class="images-num"> ${s}</p>
            </div>
            <div>
             <p class="images-name">Comments:</p>
             <p class="images-num"> ${r}</p>
            </div>
            <div>
             <p class="images-name">Downloads:</p>
             <p class="images-num"> ${y}</p>
            </div>
          </div>
      </li>`).join("")}function v(){f.classList.remove("is-hidden")}function h(){f.classList.add("is-hidden")}const b=new L(".gallery a",{captionsData:"alt",captionDelay:250}),w=document.querySelector(".js-form"),c=document.querySelector(".gallery"),l=document.querySelector(".btn-load-more");w.addEventListener("submit",P);l.addEventListener("click",S);let n=1,u=null;async function P(i){i.preventDefault(),u=i.currentTarget.elements.search.value.trim(),v(),l.classList.add("is-hidden"),c.innerHTML="",n=1;try{const{data:{hits:t,totalHits:a}}=await p(u,n);if(a>0&&d.success({message:`We found ${a} fotos!`,position:"topRight"}),t.length===0)return c.innerHTML="",i.target.reset(),d.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});c.innerHTML=g(t),a>15&&l.classList.remove("is-hidden"),b.refresh()}catch{}finally{h()}}async function S(){n+=1;try{const{data:{hits:i,totalHits:t}}=await p(u,n);c.insertAdjacentHTML("beforeEnd",g(i));const{height:a}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:a*2,behavior:"smooth"}),Math.ceil(t/15)===n&&(l.classList.add("is-hidden"),d.info({message:"The END!",position:"topRight"}))}catch(i){console.log(i.response.status)}finally{h()}}
//# sourceMappingURL=commonHelpers.js.map
