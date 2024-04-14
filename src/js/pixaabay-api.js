const BASEUrl = 'https://pixabay.com/api/';
const API_KEY = '43325943-c4525b1bf8c32c5adbdca812a';

export function fetchPhotosByQ(q, page) {
  const params = new URLSearchParams({
    key: API_KEY,
    q,
    orientation: 'horizontal',
    image_type: 'photo',
    safesearch: 'true',
    per_page: '15',
    page,
  });

  return fetch(`
  ${BASEUrl}/?${params}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
