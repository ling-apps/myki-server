var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {

    res.json({name: 'files api', desc: 'manipulate library'})

});

var files = [
    {
        name: 'file1',
        desc: 'this is the file number 1'
    },
    {
        name: 'file2',
        desc: 'this is the file number 2'
    },
    {
        name: 'file3',
        desc: 'this is the file number 3'
    },
    {
        name: 'file4',
        desc: 'this is the file number 4'
    },
    {
        name: 'file5',
        desc: 'this is the file number 5'
    },
    {
        name: 'file6',
        desc: 'this is the file number 6'
    }
];

router.get('/list', function(req, res) {
    res.json(files);
});

router.post('/', function(req, res) {
    files.push(req.body);

    res.json(files);
});

router.put('/:name', function(req, res) {
   res.json(files)
});

module.exports = router;