var express = require('express');

var app = express();

app.get('/pages', function(req, res) {
    var pages = [{
        title : 'page1',
        content : 'this is content',
        updatedAt : 1394535470441,
        id: 1
    }];

    res.json(pages);
});

app.listen(3001);


module.exports = app;

