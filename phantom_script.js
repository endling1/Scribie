phantom.create(function (ph) {
ph.createPage(function (page) {
page.open(url, function (status) {
	console.log(status);
});