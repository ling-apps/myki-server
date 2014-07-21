var express = require('express');
var router = express.Router();
var mongo = require('../db');
var Page = require('../models/Page');

router.get('/', function(req, res) {

    Page.findAll(function(err, pages) {
        if (err)
            res.status(500).json(err);
        else
            res.json(pages);
    });

});

router.post('/', function(req, res) {

    var page = new Page({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        _id: req.body._id || null
    });

    page.save(function(err, page) {
        if (err) {
            res.json(500, err);
        } else {
            res.json(page);
        }
    });

});

router.get('/:id', function(req, res) {

    Page.findById(id, function(err, page) {
        if (err) {
            res.json(500, err);
        } else {
            res.json(page);
        }
    });

});

router.delete('/:id', function(req, res) {

    Page.removeById(req.params.id, function(err) {
        if (err) {
            res.json(500, err);
        } else {
            res.send(200);
        }
    });

});

module.exports = router;
