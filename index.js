const API_KEY = '94ec7854f2a7874921d5b4b9eccfd2e8'; // Replace with your actual TMDb API key
const BASE_URL = 'https://api.themoviedb.org';
const IMG_PATH = 'https://image.tmdb.org';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const movieContainer = document.getElementById('movie-container');

// Initial search for 'fast car' themed movies
getMovies(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=fast+car`);

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value;
    if (searchTerm && searchTerm !== '') {
        getMovies(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchTerm}`);
        searchInput.value = '';
    } else {
        window.location.reload();
    }
});

async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();
    showMovies(data.results);
}

function showMovies(movies) {
    movieContainer.innerHTML = '';
    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie-card');
        movieEl.innerHTML = `
            <img src="${poster_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${vote_average >= 7 ? 'green' : vote_average >= 5 ? 'orange' : 'red'}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `;
        movieContainer.appendChild(movieEl);
    });
}