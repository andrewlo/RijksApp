export function shortenString(str, length = 25) {
  return str.length > length ? str.substr(0, length - 1) + '...' : str;
}
