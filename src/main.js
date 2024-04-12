// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchPhotosByQ } from './js/pixaabay-api.js';
import { createGalleryMarkup } from './js/render-function.js';

import { showLoader, hiddeLoader } from './js/render-function.js';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const form = document.querySelector('.js-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

form.addEventListener('submit', creatGallery);

function creatGallery(event) {
  event.preventDefault();

  const imagePhoto = event.currentTarget.elements.search.value.trim();
  showLoader();
  gallery.innerHTML = '';
  if (!imagePhoto) {
    gallery.innerHTML = '';
    hiddeLoader();
    event.target.reset();
    return iziToast.error({
      message: `Sorry, there are no images matching your search query. Please try again!`,
      position: 'topRight',
    });
  }

  fetchPhotosByQ(imagePhoto)
    .then(data => {
      // console.log(data);
      if (data.hits.length === 0) {
        gallery.innerHTML = '';
        event.target.reset();
        return iziToast.error({
          message: `Sorry, there are no images matching your search query. Please try again!`,
          position: 'topRight',
        });
      }

      gallery.innerHTML = createGalleryMarkup(data.hits);
      lightbox.refresh();
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      hiddeLoader();
    });
  form.reset();
}
