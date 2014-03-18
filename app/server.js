var express = require('express');
var db = require('./db');

var app = express();

app.get('/pages', function(req, res) {
    var page = {
        title : 'page1',
        content : 'this is content',
        updatedAt : 1394535470441,
        id: 1
    };
    var collection = db.collection('pages');
        collection.insert(page, {safe:false}, function(err, result) {
           collection.find().toArray(function(err, items){
            res.json(items);           
           }); 
        }) ;
    
});

module.exports = app;