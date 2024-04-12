import{S as p,i as c}from"./assets/vendor-8c59ed88.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const f="https://pixabay.com/api/",g="43325943-c4525b1bf8c32c5adbdca812a";function h(i){const s=new URLSearchParams({key:g,q:i,orientation:"horizontal",image_type:"photo",safesearch:"true"});return fetch(`
  ${f}/?${s}`).then(r=>{if(!r.ok)throw new Error(r.status);return r.json()})}const u=document.querySelector(".loader");function y(i){return i.map(({webformatURL:s,largeImageURL:r,tags:a,likes:e,views:t,comments:o,downloads:d})=>`<li class="gallery-items">      
          <div class="gallery-item">
            <a  href="${r}">
            <img  data-source=${r} src="${s}" alt="${a}" >
           </a>
          </div>
          <div class="image-info">
            <div>
             <p class="images-name">Likes:</p> 
             <p class="images-num"> ${e}</p>
            </div>
            <div>
              <p class="images-name">Views:</p>
              <p class="images-num"> ${t}</p>
            </div>
            <div>
             <p class="images-name">Comments:</p>
             <p class="images-num"> ${o}</p>
            </div>
            <div>
             <p class="images-name">Downloads:</p>
             <p class="images-num"> ${d}</p>
            </div>
          </div>
      </li>`).join("")}function L(){u.classList.remove("is-hidden")}function l(){u.classList.add("is-hidden")}const v=new p(".gallery a",{captionsData:"alt",captionDelay:250}),m=document.querySelector(".js-form"),n=document.querySelector(".gallery");document.querySelector(".loader");m.addEventListener("submit",S);function S(i){i.preventDefault();const s=i.currentTarget.elements.search.value.trim();if(L(),n.innerHTML="",!s)return n.innerHTML="",l(),i.target.reset(),c.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});h(s).then(r=>{if(r.hits.length===0)return n.innerHTML="",i.target.reset(),c.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});n.innerHTML=y(r.hits),v.refresh()}).catch(r=>{console.log(r)}).finally(()=>{l()}),m.reset()}
//# sourceMappingURL=commonHelpers.js.map
