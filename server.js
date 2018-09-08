var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;

// Add collection for DB here. Currently there is none. e.g.
// var MYCOLLECTIONNAME_COLLECTION = 'mycollectionname';

var app = express();
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse
// the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// Routes

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log('ERROR: ' + reason);
  res.status(code || 500).json({"error": message});
}

// Route Imports
var projects = require('./routes/projects');

// API Endpoints
app.use('/api/projects', projects);

