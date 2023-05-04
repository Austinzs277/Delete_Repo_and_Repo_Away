export function getCookie(name) {
    const cookiePattern = new RegExp(`(?:(?:^|.*;\\s*)${name}\\s*\\=\\s*([^;]*).*$)|^.*$`);
    const cookieValue = document.cookie.replace(cookiePattern, '$1');
    return cookieValue ? decodeURIComponent(cookieValue) : null;
}