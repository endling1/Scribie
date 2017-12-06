let scraper = require('./scraper');
const url = 'https://www.archaeologypodcastnetwork.com/archyfantasies/66';

scraper.scrapeAVLinks(url, (err, res) => {
	if(err){
		console.log(err);
		return;
	}
	console.log(res);
});

scraper.scrapeAVLinks5(url, (err, res) => {
	if(err){
		console.log(err);
		return;
	}
	console.log(res);
});