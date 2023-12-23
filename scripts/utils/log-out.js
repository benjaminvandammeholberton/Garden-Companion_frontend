export function logOut() {
  const logOutButton = document.getElementById('log-out');
  logOutButton.addEventListener('click', () => {
    localStorage.removeItem('access_token');
    window.location.href = 'login.html';
  });
}
