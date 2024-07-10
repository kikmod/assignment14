document.addEventListener('DOMContentLoaded', function() {
  class GameFetcher {
    constructor(apiUrl, apiKey, apiHost) {
      this.apiUrl = apiUrl;
      this.apiKey = apiKey;
      this.apiHost = apiHost;
      this.gamesContainer = document.getElementById('games-container');
    }

    async fetchGames(genre = '') {
      try {
        let url = this.apiUrl;
        if (genre) {
          url += `?category=${genre}`;
        }

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'x-rapidapi-key': this.apiKey,
            'X-RapidAPI-Host': this.apiHost
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        this.renderGames(data);
      } catch (error) {
        console.error('Error fetching the games:', error);
        this.gamesContainer.innerHTML = `<h2>Error fetching the games: ${error.message}</h2>`;
      }
    }

    renderGames(games) {
      this.gamesContainer.innerHTML = '';
      games.forEach((game, index) => {
        if (index % 4 === 0) {
          let row = document.createElement('div');
          row.classList.add('row', 'mb-4');
          this.gamesContainer.appendChild(row);
        }

        const gameCard = document.createElement('div');
        gameCard.classList.add('col-lg-3', 'col-sm-12', 'col-md-6', 'mb-4', 'game-card', 'position-relative');
        gameCard.innerHTML = `
          <div class="card w-100" data-id="${game.id}" data-title="${game.title}" data-description="${game.short_description}" data-thumbnail="${game.thumbnail}" data-genre="${game.genre}" data-platform="${game.platform}">
            <div class="black-line"></div>
            <figure class="position-relative">
              <img src="${game.thumbnail}" class="card-img-top w-100" alt="${game.title}">
            </figure>
            <div class="card-body">
              <div class="fst justify-content-between d-flex flex-row align-items-center mb-2">
                <h3 class="card-title h6 small">${game.title}</h3>
                <span class="list-group-item1 text-bg-primary p-2">${game.freetogame_profile_url ? 'Free' : 'Paid'}</span>
              </div>
              <p class="card-text text-center opacity-50">${truncateText(game.short_description, 100)}</p>
            </div>
            <ul class="list-group list-group-flush">
              <div class="scnd mt-2 justify-content-between d-flex flex-row align-items-center mb-2">
                <span class="badge badge-color">${game.genre}</span>
                <span class="badge badge-color">${game.platform}</span>
              </div>
            </ul>
            <div class="black-line"></div>
          </div>
        `;

        gameCard.addEventListener('click', () => {
          this.showGameDetails(game);
        });

        gameCard.addEventListener('mouseover', () => {
          gameCard.classList.add('hovered');
        });

        gameCard.addEventListener('mouseout', () => {
          gameCard.classList.remove('hovered');
        });

        this.gamesContainer.lastChild.appendChild(gameCard);
      });
    }

    showGameDetails(game) {
      localStorage.setItem('selectedGame', JSON.stringify(game));
      window.location.href = 'game-detail.html';
    }
  }

  function truncateText(text, limit) {
    if (text.length > limit) {
      return text.substring(0, limit) + '...';
    }
    return text;
  }

  const gameFetcher = new GameFetcher(
    'https://free-to-play-games-database.p.rapidapi.com/api/games',
    '9746d5c86amsh155ae12b1fa6ec7p1572fbjsna88c2d2924d7',
    'free-to-play-games-database.p.rapidapi.com'
  );

  // Initial fetch for all games
  gameFetcher.fetchGames();

  // Event listeners for genre filters
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const genre = this.getAttribute('data-genre');
      gameFetcher.fetchGames(genre);
    });
  });
});
