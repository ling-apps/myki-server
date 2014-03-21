var mongoDB = require('mongodb').Db,
q = require('q'),
Server = require('mongodb').Server,
Connection = require('mongodb').Connection,
format = require('util').format;

var host = process.env.IP;
var port = Connection.DEFAULT_PORT;

function Db(){
    // this line generates console warning. Don't find the fix
    this.mongo = new mongoDB('myki', new Server('localhost', port, {w: 'majority', safe: false, journal: false, fsync: false}), {native_parser:false});
};

Db.prototype = Object.create(Object.prototype, {
    mongo: {writable: true, configurable: true}
});

Db.prototype.find = function(id) {
    var deferred = q.defer();
    var collection = this.mongo.collection('pages');
    collection.find().toArray(function(err, items){
            deferred.resolve(items[0]);//TODO refacto
        });
    return deferred.promise;
}

module.exports = Db;