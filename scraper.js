const request = require('request');
const fs = require('fs');

class Scraper {
	constructor() {
		this.options = {
			url: null,
			headers: {
				'User-Agent': 'curl/7.47.0'
			}
		};
		this.avRegex = new RegExp(/(https?:\/\/.+?(mp3|mp4)\??)/g);
	}

	scrapeAVLinks(url, callback) {
		this.options.url = url;
		request(this.options, (err, res, html) => {
			if(err || res.statusCode !== 200){
				return callback(err); // todo
			}
			callback(null, html.match(this.avRegex));
		});
	}
};

module.exports = new Scraper();