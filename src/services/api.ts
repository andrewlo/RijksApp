const API_URL = 'https://www.rijksmuseum.nl/api/en/collection?key=pUaGTYo5&format=json';

export function fetchArtList(search = 'landscape') {
  return fetch(`${API_URL}&q=${search}`)
      .then(res => res.json())
}