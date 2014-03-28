var express = require('express');
var db = require('./db');

function Server(db){
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded());
    var cors = require('cors');
    this.app.use(cors());
    this.db = db;
    this.app.get('/pages', function(req, res) {
        var collection = db.mongo.collection('pages'); //TODO refacto
        collection.find().toArray(function(err, items){
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.json(items);
        });
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

Server.prototype.constructor = Server;

module.exports = Server;