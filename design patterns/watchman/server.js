var express = require('express'),
	app = express(),
	path = require('path'),
	adminRouter = app.Router();

adminRouter.get('/', function(req, res){
	res.send('Hello this is admin panel homepage!')
})	

adminRouter.get('/test1', function(req, res){
	res.send('Hello this is admin panel test1!')
})	

adminRouter.get('/test2', function(req, res){
	res.send('Hello this is admin panel test2!')
})	

adminRouter.get('/test3/:name', function(req, res){
	res.send('Hi!' + req.params.name);
})	

app.use('/admin', adminRouter);

app.get('/', function(req, res){
	res.sendFile()
})

app.listen(1337);

console.log('Listening on the port 1337...')