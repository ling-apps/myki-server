var express = require('express');
var db = require('./db');

var app = express();



app.set('ip', process.env.IP);
app.set('port', process.env.PORT || 3001);
console.log(process.env.PORT);
console.log(process.env.IP);
app.get('/pages', function(req, res) {
    var page = {
        title : 'page1',
        content : 'this is content',
        updatedAt : 1394535470441,
        id: 1
    };
   /* db.collection('pages', function(err, collection) {
        collection.insert(page, {safe:false}, function(err, result) {
           collection.find({}).toArray(function(err, items){
            res.json(items);           
           }); 
        }) ;
    });*/
res.json(page); 
    
});


app.listen();

module.exports = app;

