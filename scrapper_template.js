const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

// The URL of the page we want to scrape
const url = 'https://www.next-episode.net/';

// Load the list of your favorite TV shows from a text file
const favorites = fs.readFileSync('favorites.txt', 'utf8').split('\n');

// Get the HTML content of the page
axios.get(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);

    // Parse the TV shows airing yesterday, today, and tomorrow
    const allShows = [];
    $('.day-1 .widget-item-title a, .day-2 .widget-item-title a, .day-3 .widget-item-title a').each((i, element) => {
      allShows.push($(element).text());
    });

    // Filter the TV shows to only include your favorites
    const favoriteShows = allShows.filter(show => favorites.includes(show));

    // Log the results to the console
    console.log('Your favorite TV shows airing yesterday, today, and tomorrow:');
    console.log(favoriteShows);
  })
  .catch(error => {
    console.log(error);
  });
