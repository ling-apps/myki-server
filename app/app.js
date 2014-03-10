var express = require('express');

var app = express();

app.get('/pages', function(req, res) {
    res.send('ok');
});

app.listen(3001);

