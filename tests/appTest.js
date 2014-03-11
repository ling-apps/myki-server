var request = require('supertest');
var app = require('../app/app');
var assertions = require('mocha').assertions;
var assert = require('assert');

describe('App', function() {

    before(function(done){
        done();
    });
    describe('/pages', function() {
        it(' should return pages content', function(done) {
            request('localhost:3001')
                .get('/pages')
                .expect(200)
                .end(function(err, res){
                    assert.deepEqual(res.body[0], {title : 'page1',
                        content : 'this is content',
                        updatedAt : 1394535470441,
                        id: 1});
                    done();
                });
        });
    });
});
