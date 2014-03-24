var request = require('supertest');
var Server = require('../app/server');
var Db = require('../app/db');
var http = require('http');
var assert = require('assert');
var q = require('q');

var ip = process.env.IP || '127.0.0.1';
var port = process.env.PORT || 3001;
var database = new Db();
var srv = new Server(database);
var nodeServer;

describe('db', function () {

    before(function (done) {
        database.mongo.open(function (err, db) { // need refacto mongo connector should be private
            if (err) throw err;
            var page = {title: 'page1',
                content: 'this is content',
                updatedAt: 1394535470441,
                id: 1};
            var collection = database.mongo.collection('pages'); //TODO refacto
            collection.insert(page, {safe:false}, function(err, result) {
            }) ;
            nodeServer = srv.app.listen(port, ip);
            nodeServer.on('listening', function () {
                done();
            });
        });
    });

    after(function(done){
        nodeServer.close();
        database.mongo.collection('pages').remove(function(){});
        database.mongo.close();
        done();
    });

    describe('remove data in  database', function () {
        it(' should remove all pages in the database', function (done) {
            database.removeAll().then(function(result){

               assert.equal(result, true, "removeAll renvoie true");

                var collection = database.mongo.collection('pages');
                collection.find().toArray(function(err, items){

                   assert.equal(0, items.length, "il ne doit plus exister de pages dans la base");
                    done();
                });
            });
        });
    });

});
