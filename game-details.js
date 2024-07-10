document.addEventListener('DOMContentLoaded', function() {
  const game = JSON.parse(localStorage.getItem('selectedGame'));

  if (!game) {
    window.location.href = 'index.html';
    return;
  }

  document.getElementById('gameDetailImage').src = game.thumbnail;
  document.getElementById('gameDetailTitle').innerText = `Title: ${game.title}`;
  document.getElementById('gameDetailDescription').innerText = game.short_description;
  document.getElementById('gameDetailCategory').innerText = game.genre;
  document.getElementById('gameDetailPlatform').innerText = game.platform;
  document.getElementById('gameDetailStatus').innerText = 'Live';  

  document.getElementById('closeButton').addEventListener('click', function() {
    window.location.href = 'index.html';
  });
});
