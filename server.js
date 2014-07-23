var app = require('./app');
var mongo = require('./db');

app.set('port', process.env.PORT || 3001);

mongo.open(function() {

    var server = app.listen(app.get('port'), function(err) {
        console.log('Express server listening on port ' + server.address().port);
    });

});
