var Db = require('mongodb').Db,
Server = require('mongodb').Server,
Connection = require('mongodb').Connection, 
format = require('util').format;

var host = process.env.IP;
var port = Connection.DEFAULT_PORT;
var db = new Db('myki', new Server('localhost', port, {w: 'majority', safe: false, journal: false, fsync: false}), {native_parser:false});
  
module.exports = db;