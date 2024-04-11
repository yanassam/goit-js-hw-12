const loader = document.querySelector('.loader');

export function createGalleryMarkup(array) {
  return array
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="gallery-items">      
          <div class="gallery-item">
            <a  href="${largeImageURL}">
            <img  data-source=${largeImageURL} src="${webformatURL}" alt="${tags}" >
           </a>
          </div>
          <div class="image-info">
            <div>
             <p class="images-name">Likes:</p> 
             <p class="images-num"> ${likes}</p>
            </div>
            <div>
              <p class="images-name">Views:</p>
              <p class="images-num"> ${views}</p>
            </div>
            <div>
             <p class="images-name">Comments:</p>
             <p class="images-num"> ${comments}</p>
            </div>
            <div>
             <p class="images-name">Downloads:</p>
             <p class="images-num"> ${downloads}</p>
            </div>
          </div>
      </li>`
    )
    .join('');
}

export function showLoader() {
  loader.classList.remove('is-hidden');
}

export function hiddeLoader() {
  loader.classList.add('is-hidden');
}
