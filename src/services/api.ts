const API_URL =
  'https://www.rijksmuseum.nl/api/en/collection?key=pUaGTYo5&format=json';
const PAGE_SIZE = 15;

export function fetchArtList({ search }) {
  return fetch(`${API_URL}&q=${search || ''}&ps=${PAGE_SIZE}`).then(res =>
    res.json()
  );
}
