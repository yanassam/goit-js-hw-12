// const BASEUrl = 'https://pixabay.com/api/';
// const API_KEY = '43325943-c4525b1bf8c32c5adbdca812a';
import axios from 'axios';

// axios.defaults.headers.common['Authorization'] =
// 'Client-ID 43325943-c4525b1bf8c32c5adbdca812a';
axios.defaults.baseURL = 'https://pixabay.com';

export async function fetchPhotosByQ(q, page) {
  const API_KEY = '43325943-c4525b1bf8c32c5adbdca812a';

  return await axios.get('/api/', {
    params: {
      key: API_KEY,
      q,
      orientation: 'horizontal',
      image_type: 'photo',
      safesearch: 'true',
      per_page: '15',
      page,
    },
  });
}

// export function fetchPhotosByQ(q, page) {
//   const params = new URLSearchParams({
//     key: API_KEY,
//     q,
//     orientation: 'horizontal',
//     image_type: 'photo',
//     safesearch: 'true',
//     per_page: '15',
//     page,
//   });

//   return fetch(`
//   ${BASEUrl}/?${params}`).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }
