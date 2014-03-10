var request = require('supertest');

describe('App', function() {
    describe('/pages', function() {
        it(' should return content', function(done) {
            request('localhost:3001')
                .get('/pages')
                .expect(200, done);
        });
    });
});
