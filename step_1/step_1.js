const cheerio = require('cheerio');
const superagent = require('superagent');


function fetchAllMovies() {
  const movies = [];
  return new Promise((resolve, reject) => {
    superagent.get('http://www.boxofficemojo.com/daily/chart/').then(response => {
      const htmlDocument = response.text;
      const $ = cheerio.load(htmlDocument);
      //
      // parse the document and add each movie to the movies array
      //
      resolve(movies);
    })
    .catch(error => reject(error));
  });
}

fetchAllMovies().then(movies => console.log(movies)).catch(error => console.log(error.message));
