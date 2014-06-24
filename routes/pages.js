var express = require('express');
var router = express.Router();
var mongo = require('../db');

router.get('/', function(req, res) {

    mongo.getCollection('pages', function(err, collection) {
        if (err) res.json(500, err);

        collection.find().toArray(function(err, pages) {
            if (err) {
                res.json(500, err);
            } else {
                res.json(pages);
            }
        })
    });
    
});

router.post('/', function(req, res) {

    var page = {
        title: req.body.title,
        content: req.body.content
    };

    mongo.getCollection('pages', function(err, collection) {
        if (err) res.json(500, err);

        collection.insert(page, function(err, savedPage) {
            if (err) res.json(500, err);

            res.json(savedPage);
        });
    });

});

module.exports = router;