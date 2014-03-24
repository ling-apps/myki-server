var mongoDB = require('mongodb').Db,
q = require('q'),
Server = require('mongodb').Server,
Connection = require('mongodb').Connection,
format = require('util').format;

var host = process.env.IP;
var port = Connection.DEFAULT_PORT;

function Db(){
    this.mongo = new mongoDB('myki',
        new Server('localhost', port), {w: 1});
};

Db.prototype = Object.create(Object.prototype, {
    mongo: {writable: true, configurable: true}
});

Db.prototype.constructor = Db;

Db.prototype.find = function(id) { //add the collection name in parameters
    var deferred = q.defer();
    var collection = this.mongo.collection('pages');
    collection.find().toArray(function(err, items){
            deferred.resolve(items[0]);//TODO refacto
        });
    return deferred.promise;
},

Db.prototype.removeAll = function() { //add the collection name in parameters
    var deferred = q.defer();
    var collection = this.mongo.collection('pages');
    collection.remove(function(){
        deferred.resolve(true);//TODO refacto
    });
    return deferred.promise;
}

module.exports = Db;