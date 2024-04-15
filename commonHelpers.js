import{S as L,i as l}from"./assets/vendor-8c59ed88.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}})();const v="https://pixabay.com/api/",b="43325943-c4525b1bf8c32c5adbdca812a";function h(i,e){const o=new URLSearchParams({key:b,q:i,orientation:"horizontal",image_type:"photo",safesearch:"true",per_page:"15",page:e});return fetch(`
  ${v}/?${o}`).then(r=>{if(!r.ok)throw new Error(r.status);return r.json()})}const f=document.querySelector(".loader");function p(i){return i.map(({webformatURL:e,largeImageURL:o,tags:r,likes:t,views:s,comments:n,downloads:y})=>`<li class="gallery-items">      
          <div class="gallery-item">
            <a  href="${o}">
            <img  data-source=${o} src="${e}" alt="${r}" >
           </a>
          </div>
          <div class="image-info">
            <div>
             <p class="images-name">Likes:</p> 
             <p class="images-num"> ${t}</p>
            </div>
            <div>
              <p class="images-name">Views:</p>
              <p class="images-num"> ${s}</p>
            </div>
            <div>
             <p class="images-name">Comments:</p>
             <p class="images-num"> ${n}</p>
            </div>
            <div>
             <p class="images-name">Downloads:</p>
             <p class="images-num"> ${y}</p>
            </div>
          </div>
      </li>`).join("")}function P(){f.classList.remove("is-hidden")}function m(){f.classList.add("is-hidden")}const S=new L(".gallery a",{captionsData:"alt",captionDelay:250}),g=document.querySelector(".js-form"),a=document.querySelector(".gallery"),u=document.querySelector(".btn-load-more");g.addEventListener("submit",$);u.addEventListener("click",w);let c=1,d=null;function $(i){if(i.preventDefault(),d=i.currentTarget.elements.search.value.trim(),P(),u.classList.add("is-hidden"),a.innerHTML="",!d)return a.innerHTML="",m(),i.target.reset(),l.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});c=1,h(d,c).then(e=>{if(e.totalHits>0&&l.success({message:`We found ${e.totalHits} fotos!`,position:"topRight"}),e.hits.length===0)return a.innerHTML="",i.target.reset(),l.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});a.innerHTML=p(e.hits),e.totalHits>15&&u.classList.remove("is-hidden"),S.refresh()}).catch(e=>{console.log(e)}).finally(()=>{m()}),g.reset()}function w(){c+=1,h(d,c).then(i=>{a.insertAdjacentHTML("beforeEnd",p(i.hits));const{height:e}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"}),Math.ceil(i.totalHits/15)===c&&(u.classList.add("is-hidden"),l.info({message:"The END!",position:"topRight"}))})}
//# sourceMappingURL=commonHelpers.js.map
