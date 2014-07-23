var MongoClient = require('mongodb').MongoClient;
var Connection = require('mongodb').Connection;
var ObjectID = require('mongodb').ObjectID;

var url = process.env.MONGOHQ_URL || 'mongodb://localhost:'+Connection.DEFAULT_PORT + '/myki';

var db = null;
module.exports.open = function(cb) {
    MongoClient.connect(url, function(err, mdb) {
        if (err) throw new Error(err);

        db = mdb;
        cb();
    });
};

module.exports.getDb = function() {
    return db;
};

module.exports.getCollection = function(collectionName, cb) {
    db.collection(collectionName, function(err, collection) {
        if (err) {
            cb(err);
        } else {
            cb(err, collection);
        }
    });
};

module.exports.findById = function(collectionName, id, cb) {
    db.collection(collectionName, function(err, collection) {
        if (err) {
            cb(err);
        } else {
            collection.findOne({_id: ObjectID.createFromHexString(id)}, function(err, doc) {
                if (err)
                    cb(err);
                else
                    cb(err, doc);
            });
        }

    });
};

module.exports.removeById = function(collectionName, id, cb) {
    db.collection(collectionName, function(err, collection) {
        if (err) {
            cb(err);
        } else {
            collection.remove({_id: ObjectID.createFromHexString(id)}, function(err, doc) {
                if (err)
                    cb(err);
                else
                    cb(err, doc);
            });
        }

    });
};
