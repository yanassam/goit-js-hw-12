// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

import axios from 'axios';

import { fetchPhotosByQ } from './js/pixaabay-api.js';
import { createGalleryMarkup } from './js/render-function.js';
import { showLoader, hiddeLoader } from './js/render-function.js';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const form = document.querySelector('.js-form');
const gallery = document.querySelector('.gallery');
// const loader = document.querySelector('.loader');
const loadBtn = document.querySelector('.btn-load-more');
form.addEventListener('submit', creatGallery);
loadBtn.addEventListener('click', onClick);
let page = 1;
let imagePhoto = null;

function creatGallery(event) {
  event.preventDefault();

  imagePhoto = event.currentTarget.elements.search.value.trim();
  showLoader();
  loadBtn.classList.add('is-hidden');
  gallery.innerHTML = ''; //очистили галерею

  if (!imagePhoto) {
    gallery.innerHTML = ''; //очистили галерею

    hiddeLoader();
    event.target.reset(); //очистили форму
    return iziToast.error({
      //если ощибка сразу віход
      message: `Sorry, there are no images matching your search query. Please try again!`,
      position: 'topRight',
    });
  }

  page = 1;

  fetchPhotosByQ(imagePhoto, page)
    .then(data => {
      if (data.totalHits > 0) {
        iziToast.success({
          message: `We found ${data.totalHits} fotos!`,
          position: 'topRight',
        });
      }
      if (data.hits.length === 0) {
        gallery.innerHTML = ''; //очистили галерею
        event.target.reset();
        return iziToast.error({
          message: `Sorry, there are no images matching your search query. Please try again!`,
          position: 'topRight',
        });
      }

      gallery.innerHTML = createGalleryMarkup(data.hits);
      if (data.totalHits > 15) {
        loadBtn.classList.remove('is-hidden');
      }
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

function onClick() {
  page += 1;

  fetchPhotosByQ(imagePhoto, page).then(data => {
    gallery.insertAdjacentHTML('beforeEnd', createGalleryMarkup(data.hits));

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    const lastPages = Math.ceil(data.totalHits / 15);

    if (lastPages === page) {
      loadBtn.classList.add('is-hidden');
      iziToast.info({
        message: `The END!`,
        position: 'topRight',
      });
    }
  });
}
