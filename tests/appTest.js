var request = require('supertest');
var app = require('../app/server');
var db = require('../app/db');
var http = require('http');
var assert = require('assert');

var ip = process.env.IP || '127.0.0.1';
var port = process.env.PORT || 3001;
describe('App', function() {

    before(function(done){
        db.open(function(err, db) {
            if (err) throw err;
            
            var srv = app.listen(port, ip);
            srv.on('listening', function() {
               done(); 
            });            
        });
    });
    
    describe('/pages', function() {
        it(' should return pages content', function(done) {
            request(ip+':'+port)
                .get('/pages')
                .expect(200)
                .end(function(err, res){
                    var result = res.body[0];
                    var expected = {title: 'page1',
                            content : 'this is content',
                            updatedAt : 1394535470441,
                            id: 1};
                    assert.equal(result.title, expected.title);
                    assert.equal(result.content, expected.content);
                    assert.equal(result.updatedAt, expected.updatedAt);
                    assert.equal(result.id, expected.id);
                    done();
                });
        });
    });
});
