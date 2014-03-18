var srv = require('./server');
var db = require('./db');

var ip = process.env.IP || '127.0.0.1';
var port = process.env.PORT || 3001;

db.open(function(err, db) {
    if (err) throw err;

    srv.listen(port, ip);
});