const express = require('express');
const compression = require('compression');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const ObjectID = mongodb.ObjectID;

require('dotenv').config();

// Add collection for DB here. Currently there is none. e.g.
// var MYCOLLECTIONNAME_COLLECTION = 'mycollectionname';

// Route Imports
const projects = require('./routes/projects');


const app = express();
app.use(compression());
app.use(bodyParser.json());

// Create link to Angular build directory
const distDir = __dirname + '/dist/';
app.use(express.static(distDir));

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
  res.status(code || 500).json({ "error": message });
}

//app.use(express.static(path.join(__dirname, 'dist')));

// API Endpoints
app.use('/api/projects', projects);

// Catch other routes and pass to Angular
app.all('*', (req, res) => {
  res.status(200).sendFile(path.join(__dirname + '/dist/index.html'));
})

module.exports = app;