var express = require('express'),
    app = express(),
    path = require('path');
	module.exports = app;

	require('./configure')(app);

app.set('port', (process.env.PORT || 8080));

app.get('/', function(req, res){
    res.sendfile(path.join(__dirname, '../browser'));
});

app.listen(app.get('port'), function(){
    console.log("server is listening on port", app.get('port'));
});
