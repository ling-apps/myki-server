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

router.get('/:id', function(req, res) {

    mongo.findById('pages', req.params.id, function(err, page) {
        if (err) res.json(500, err);

        res.json(page);
    });

});

router.delete('/:id', function(req, res) {

    mongo.removeById('pages', req.params.id, function(err, page) {
        if (err) res.status(500).json(err);

        res.send(200);
    });

});

module.exports = router;
