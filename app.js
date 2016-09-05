/**
 * Created by xu on 2016/8/29.
 */
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var port = process.env.PORT || 4000;
var open = require('open');
var app = express();

app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');

app.get('/', function(req, res){
	res.render('index3');
});

app.listen(port, '', function(err){
	if(err) return;
	console.log('Server started, listening on port:' + port)
	open('http://localhost:' + port + '/')
});