// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

// import axios from 'axios';

import { fetchPhotosByQ } from './js/pixaabay-api.js';
import { createGalleryMarkup } from './js/render-function.js';
import { showLoader, hiddeLoader } from './js/render-function.js';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const form = document.querySelector('.js-form');
const gallery = document.querySelector('.gallery');

const loadBtn = document.querySelector('.btn-load-more');
form.addEventListener('submit', creatGallery);
loadBtn.addEventListener('click', onClick);
let page = 1;
let imagePhoto = null;

async function creatGallery(event) {
  event.preventDefault();
  imagePhoto = event.currentTarget.elements.search.value.trim();
  showLoader();
  loadBtn.classList.add('is-hidden');
  gallery.innerHTML = ''; //очистили галерею
  page = 1;
  try {
    const {
      data: { hits, totalHits },
    } = await fetchPhotosByQ(imagePhoto, page);

    if (totalHits > 0) {
      iziToast.success({
        message: `We found ${totalHits} fotos!`,
        position: 'topRight',
      });
    }
    if (hits.length === 0) {
      gallery.innerHTML = ''; //очистили галерею
      event.target.reset();
      return iziToast.error({
        message: `Sorry, there are no images matching your search query. Please try again!`,
        position: 'topRight',
      });
    }

    gallery.innerHTML = createGalleryMarkup(hits);
    if (totalHits > 15) {
      loadBtn.classList.remove('is-hidden');
    }
    lightbox.refresh();
  } catch (error) {
    error => {
      console.log(error.response.status);

      if (error.response.status === 401) {
        iziToast.error({
          position: 'topRight',
          message: `You not authorization`,
        });
      }
      if (error.response.status === 404) {
        iziToast.error({
          position: 'topRight',
          message: `Bad request, please try again `,
        });
      }
      if (error.response.status === 500) {
        iziToast.error({
          position: 'topRight',
          message: `Server error`,
        });
      }
    };
  } finally {
    hiddeLoader();
  }
}

async function onClick() {
  page += 1;
  try {
    const {
      data: { hits, totalHits },
    } = await fetchPhotosByQ(imagePhoto, page);
    gallery.insertAdjacentHTML('beforeEnd', createGalleryMarkup(hits));

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    const lastPages = Math.ceil(totalHits / 15);
    // test
    if (lastPages === page) {
      loadBtn.classList.add('is-hidden');
      iziToast.info({
        message: `The END!`,
        position: 'topRight',
      });
    }
  } catch (error) {
    console.log(error.response.status);
  } finally {
    hiddeLoader();
  }
}

// function creatGallery(event) {
//   event.preventDefault();

//   imagePhoto = event.currentTarget.elements.search.value.trim();
//   showLoader();
//   loadBtn.classList.add('is-hidden');
//   gallery.innerHTML = ''; //очистили галерею

//   if (!imagePhoto) {
//     gallery.innerHTML = ''; //очистили галерею

//     hiddeLoader();
//     event.target.reset(); //очистили форму
//     return iziToast.error({
//       //если ощибка сразу віход
//       message: `Sorry, there are no images matching your search query. Please try again!`,
//       position: 'topRight',
//     });
//   }

//   page = 1;

//   fetchPhotosByQ(imagePhoto, page)
//     .then(res => {
//       // console.log(data);
//       if (res.data.totalHits > 0) {
//         iziToast.success({
//           message: `We found ${res.data.totalHits} fotos!`,
//           position: 'topRight',
//         });
//       }
//       if (res.data.hits.length === 0) {
//         gallery.innerHTML = ''; //очистили галерею
//         event.target.reset();
//         return iziToast.error({
//           message: `Sorry, there are no images matching your search query. Please try again!`,
//           position: 'topRight',
//         });
//       }

//       gallery.innerHTML = createGalleryMarkup(res.data.hits);
//       if (res.data.totalHits > 15) {
//         loadBtn.classList.remove('is-hidden');
//       }
//       lightbox.refresh();
//     })
//     .catch(error => {
//       console.log(error);
//     })
//     .finally(() => {
//       hiddeLoader();
//     });

//   form.reset();
// }

// function onClick() {
//   page += 1;

//   fetchPhotosByQ(imagePhoto, page).then(data => {
//     gallery.insertAdjacentHTML('beforeEnd', createGalleryMarkup(data.hits));

//     const { height: cardHeight } = document
//       .querySelector('.gallery')
//       .firstElementChild.getBoundingClientRect();

//     window.scrollBy({
//       top: cardHeight * 2,
//       behavior: 'smooth',
//     });

//     const lastPages = Math.ceil(data.totalHits / 15);
//     // test
//     if (lastPages === page) {
//       loadBtn.classList.add('is-hidden');
//       iziToast.info({
//         message: `The END!`,
//         position: 'topRight',
//       });
//     }
//   });
// }
