let scraper = require('./scraper');
const url = 'https://art19.com/shows/recode-decode/episodes/167e0f2a-832a-4bda-81b5-316879e0f236';

// Scrape static html
// scraper.scrapeAVLinks(url, (err, res) => {
// 	if(err){
// 		console.log(err);
// 		return;
// 	}
// 	console.log(res);
// });

// Scrape using selenium and firefox
scraper.scrapeAVLinks5(url, (err, res) => {
	if(err){
		console.log(err);
		return;
	}
	console.log(res);
});

// Scrape using selenium and phantom_js
// scraper.scrapeAVLinks7(url, (err, res) => {
// 	if(err){
// 		console.log(err);
// 		return;
// 	}
// 	console.log(res);
// });