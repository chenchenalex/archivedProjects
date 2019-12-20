var express = require('express'),
	path = require('path'),
	app = express();

app.use(express.static(path.join(__dirname + '/public')));

app.get('*', function(req, res){
	res.sendFile(path.join(__dirname + '/public/views/index.html'));
})

app.listen(8087);

console.log('Port listening on 8087');