require('dotenv').config();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('./public'));

require('./config/routes.js')(app);

var port = (process.env.NODE_PORT || 8002);
app.listen(port, function() {
  console.log('Amazing things happening on port ' + port);
});
