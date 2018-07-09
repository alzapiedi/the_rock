const cheerio = require('cheerio');
const superagent = require('superagent');

const movieUrls = {};

function fetchAllMovies() {
  const movies = [];
  return new Promise((resolve, reject) => {
    superagent.get('http://www.boxofficemojo.com/daily/chart/').then(response => {
      const $ = cheerio.load(response.text);
      const items = $('big').parent().next().find('b').each((idx, el) => movies.push($(el).text().replace(/\(\d{4} RE\-\w*\)/, '')));
      resolve(movies);
    })
    .catch(error => reject(error));
  });
}

function fetchMovieUrl(movie) {
  return new Promise((resolve, reject) => {
    superagent.get(`https://www.imdb.com/find?q=${encodeURIComponent(movie)}`).then(response => {
      const $ = cheerio.load(response.text);
      const path = $('.result_text').find('a').attr('href');
      if (!path) {
        console.log('FAILED TO GET URL FOR ' + movie);
        resolve(null);
      }
      resolve({ title: movie, url: `https://www.imdb.com${path}` });
    })
    .catch(error => reject(error));
  });
}

function fetchMovieDetails(entry) {
  const { title, url } = entry;
  const movieDetails = { title, hasRock: false };
   return new Promise((resolve, reject) => {
    superagent.get(url).then(response => {
      const $ = cheerio.load(response.text);
      $('.cast_list').find('tr').each((idx, el) => {
        if (idx === 0) return;
        if ($(el).text().indexOf('Dwayne Johnson') > -1) movieDetails.hasRock = true;
      });
      resolve(movieDetails);
    })
    .catch(error => reject(error));
  });
}

function fetchAllMovieUrls(movies) {
  const promises = movies.map(movie => new Promise((resolve, reject) => fetchMovieUrl(movie).then(resolve).catch(reject)));
  return Promise.all(promises);
}

function fetchAllMovieDetails(movieEntries) {
  const promises = movieEntries.map(entry => new Promise((resolve, reject) => fetchMovieDetails(entry).then(resolve).catch(reject)));
  return Promise.all(promises);
}

function handleResult(result) {
  const rockMovies = result.filter(movie => movie.hasRock);
  if (rockMovies.length === 0) return console.log('There are no movies in theaters featuring The Rock');
  console.log('Movies featuring The Rock:')
  rockMovies.forEach((movie, idx) => {
    console.log(`${idx + 1}: ${movie.title}`);
  });
}

fetchAllMovies().then(fetchAllMovieUrls).then(fetchAllMovieDetails).then(handleResult);
