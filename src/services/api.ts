const API_URL = 'https://www.rijksmuseum.nl/api/en/collection';
const API_KEY = 'pUaGTYo5';

const PAGE_SIZE = 15;

export function fetchArtList({ search, pageNum }) {
  return fetch(
    `${API_URL}?key=${API_KEY}&q=${search ||
      ''}&ps=${PAGE_SIZE}&p=${pageNum}&format=json`
  ).then(res => res.json());
}

export function fetchArtDetails({ objectNumber }) {
  return fetch(
    `${API_URL}/${objectNumber}?key=${API_KEY}&format=json`
  ).then(res => res.json());
}
