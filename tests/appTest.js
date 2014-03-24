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

describe('App', function () {

    before(function (done) {
        database.mongo.open(function (err, db) { // need refacto mongo connector should be private
            if (err) throw err;

            nodeServer = srv.app.listen(port, ip);
            nodeServer.on('listening', function () {
                done();
            });
        });
    });

    after(function(done){
        nodeServer.close();
        done();
    });

    describe('/pages', function () {
        it(' should return pages content', function (done) {
            request(ip + ':' + port)
                .get('/pages')
                .expect(200)
                .end(function (err, res) {
                    var result = res.body[0];
                    var expected = {title: 'page1',
                        content: 'this is content',
                        updatedAt: 1394535470441,
                        id: 1};
                    assert.equal(result.title, expected.title);
                    assert.equal(result.content, expected.content);
                    assert.equal(result.updatedAt, expected.updatedAt);
                    assert.equal(result.id, expected.id);
                    done();
                });
        });
    });
    describe('/page post', function () {
        it(' should save page content', function (done) {
            var id = 1;
            var expected = {title: 'page1',
                content: 'this is content',
                updatedAt: 1394535470441,
                id: id};
            request(ip + ':' + port)
                .post('/page')
                .send({page: expected})
                .expect(200)
                .end(function(){

                database.find(id).then(function (savedResult) {
                    assert.equal(savedResult.title, expected.title);
                    assert.equal(savedResult.content, expected.content);
                    assert.equal(savedResult.updatedAt, expected.updatedAt);
                    assert.equal(savedResult.id, expected.id);
                    done();
                });
            });
        });
    });
});
