const cheerio = require('cheerio');
const superagent = require('superagent');

function fetchMovieUrl(movie) {
  return new Promise((resolve, reject) => {
    superagent.get(`https://www.imdb.com/find?q=${encodeURIComponent(movie)}`).then(response => {
      const htmlDocument = response.text;
      const $ = cheerio.load(htmlDocument);
      //
      // parse the document and find the URL for the movies actual page
      //
      resolve(url);
    })
    .catch(error => reject(error));
  });
}

const movie = ''; // Replace this with a movie title
fetchMovieUrl(movie).then(url => console.log(url));
