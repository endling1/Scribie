const request = require('request');
const fs = require('fs');
const { JSDOM } = require('jsdom');
const browser = require('zombie');

class Scraper {
	constructor() {
		this.options = {
			url: null,
			headers: {
				'User-Agent': 'curl/7.47.0'
			}
		};
		this.avRegex = new RegExp(/(https?:\/\/.+?(mp3|mp4)\??)/g);
		this.jsRegex = new RegExp(/("https?:\/\/.+?js")/g);
	}

	/* 
		Scrapes links with mp3/mp4 extensions in html page and
		returns an array of matched links
	*/
	scrapeAVLinks(url, callback) {
		this.options.url = url;
		request(this.options, (err, res, html) => {
			if(err || res.statusCode !== 200){
				return callback(new Error('Error scraping url : ' + err));
			}
			callback(null, html.match(this.avRegex) || []);
		});
	}

	/* 
		Scrapes links with mp3/mp4 extensions in html page,
		also loads scripts and scrapes them for mp3/mp4 and
		returns an array of matched links
	*/
	scrapeAVLinks2(url, callback){
		this.options.url = url;
		request(this.options, (err, res, html) => {
			if(err){
				return callback(err);
			}
			let avLinks = html.match(this.avRegex) || [];
			let scripts = html.match(this.jsRegex) || [];

			// Sequentially scrape JS scripts
			function scrapeScripts(i){
				if(i >= scripts.length){
					return callback(null, avLinks);
				}

				this.options.url = scripts[i].replace(/["]+/g, '');
				request(this.options, (err, res, js) => {
					if(!err){
						const match = js.match(this.avRegex);
						if(match && match.length){
							avLinks = avLinks.concat(match);
						}
					}
					scrapeScripts(++i);
				});
			};

			scrapeScripts = scrapeScripts.bind(this);
			scrapeScripts(0);
		});
	}

	/*
		Headless browser JSDOM, it is unable to recognize HTML canvas
		and certain DOM commands hence throws errors
	*/
	scrapeAVLinks3(url, callback){
		this.options.url = url;
		request(this.options, (err, res, html) => {
			if(err){
				return callback(err);
			}
			var dom = new JSDOM(html, {runScripts: "dangerously", resources: "usable"});
			
			const window = dom.window;
			window.onModulesLoaded = () => {
			  callback(null, dom.serialize().match(this.avRegex));
			};
		});
	}

	/*
		Headless browser Zombie.js, it is unable to recognize
		certain DOM commands (document.queryCommandSupported is not a function),
		hence throws errors
	*/
	scrapeAVLinks4(url, callback){
		browser.visit(url, { runScripts: true }, function (err, browser) { 
    		if(err){
    			return callback(err, null);
    		} 
    		browser.wait({duration: 4000}).then(() => {
    			callback(null, browser.html.match(this.avRegex));
    		});
		});
	}
};

module.exports = new Scraper();