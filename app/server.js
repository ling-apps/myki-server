var express = require('express');
var db = require('./db');

function Server(db){
    this.app = express();
    this.app.use(express.bodyParser());
    this.db = db;
    this.app.get('/pages', function(req, res) {
        var page = {
            title : 'page1',
            content : 'this is content',
            updatedAt : 1394535470441,
            id: 1
        };
        var collection = db.mongo.collection('pages'); //TODO refacto
        collection.insert(page, {safe:false}, function(err, result) {
            collection.find().toArray(function(err, items){
                res.json(items);
            });
        }) ;

    });

    this.app.post('/page', function(req, res) {
        var page = req.body.page;
        var collection = db.mongo.collection('pages'); //TODO refacto
        collection.insert(page, {safe:false}, function(err, result) {
            if(err){
                res.send(500);
            } else {
                res.send(200);
            }
        }) ;

    });
}

Server.prototype = Object.create(Object.prototype);

module.exports = Server;