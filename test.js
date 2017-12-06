let scraper = require('./scraper');
const url = 'https://art19.com/shows/recode-decode/episodes/167e0f2a-832a-4bda-81b5-316879e0f236';
scraper.scrapeAVLinks(url, (err, res) => {
	console.log(err);
	console.log(res);
})