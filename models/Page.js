var mongo = require('../db');
var ObjectID = require('mongodb').ObjectID;

function Page(opts) {
    this.title = opts.title || "";
    this.content = opts.title || "";
    this.author = opts.author || "";
    if (opts._id) {
        this._id = ObjectID.createFromHexString(opts._id);

    }

}

Page.prototype = Object.create({}, {
    _id: {configurable: false, writable: true, enumerable: true},
    id: {configurable: false, writable: true, enumerable: true},
    title: {configurable: false, writable: true, enumerable: true},
    content: {configurable: false, writable: true, enumerable: true},
    author: {configurable: false, writable: true, enumerable: true},
    createdAt: {configurable: false, writable: true, enumerable: true},
    updatedAt: {configurable: false, writable: true, enumerable: true},
    version: {configurable: false, writable: true, enumerable: true, value: -1},
    removed: {configurable: false, writable: true, enumerable: true, value: false}
});

Page.findAll = function(cb) {

    mongo.getCollection('pages', function(err, collection) {
        if (err)
            return cb(err);

        collection.find({removed: false}).toArray(function(err, pages) {
            cb(err, pages);
        });
    });

};

Page.findById = function(cb) {

    mongo.getCollection('pages', function(err, collection) {
        if (err)
            return cb(err);

        collection.findOne({removed: false, _id: ObjectID.createFromHexString(id)}, {"sort": ["version", "desc"], "limit": 1}, function(err, page) {
            cb(err, page);
        });
    });

};

Page.prototype.destroy = function(cb) {
    mongo.getCollection('pages', function(err, collection) {
        if (err)
            return cb(err);

        collection.remove({_id: ObjectID.createFromHexString(id)}, function(err, doc) {
            cb(err, doc);
        });

    });
};

Page.prototype.save = function(cb) {
    this.version += 1;
    if (!this.createdAt)
        this.createdAt = new Date();
    this.updatedAt = new Date();
    var self = this;

    mongo.getCollection('pages', function(err, collection) {
        if (err)
            return cb(err);

        collection.save(self, function(err, page) {
            cb(err, page);
        });
    });

};

Page.prototype.getHistory = function() {};

module.exports = Page;