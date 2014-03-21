var Server = require('./server');
var Db = require('./db');

var ip = process.env.IP || '127.0.0.1';
var port = process.env.PORT || 3001;

var database = new Db();
var srv = new Server(database);
database.mongo.open(function(err, db) {
    if (err) throw err;

    srv.app.listen(port, ip); //TODO refacto? app should be private ?
});