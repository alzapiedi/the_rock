const cheerio = require('cheerio');
const superagent = require('superagent');

function isTheRockInThisMovie(movieUrl) {
   return new Promise((resolve, reject) => {
    superagent.get(movieUrl).then(response => {
      const htmlDocument = response.text;
      const $ = cheerio.load(htmlDocument);

      let hasTheRock = false;
      //
      // Find out if the rock is in the movie;
      //
      // if (some condition is true) hasTheRock = true
      resolve(hasTheRock);
    })
    .catch(error => reject(error));
  });
}

const movieUrl = ''; // Replace this with an imdb movie URL
isTheRockInThisMovie(movieUrl).then(hasRock => console.log(hasRock ? 'The Rock is in this movie' : 'The Rock is not in this movie'));
