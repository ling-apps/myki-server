var request = require('supertest');
//var app = require('../app/app');
var assert = require('assert');

describe('App', function() {

    before(function(done){
        done();
    });
    describe('/pages', function() {
        it(' should return pages content', function(done) {
            console.log(process.env.IP+':'+process.env.PORT);
            request(process.env.IP+':'+process.env.PORT)
                .get('/pages')
                .expect(200)
                .end(function(err, res){
                    console.log (err);
                    assert.deepEqual(res.body[0], {title : 'page1',
                        content : 'this is content',
                        updatedAt : 1394535470441,
                        id: 1});
                    done();
                });
        });
    });
});
