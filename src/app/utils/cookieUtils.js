export function getTokenFromCookies() {
  if (typeof document !== 'undefined') {
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('album-token='))
      ?.split('=')[1];
    return cookieValue || '';
  }
  return '';
}
