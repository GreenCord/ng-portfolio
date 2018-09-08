//var project = require('../models/project');
var async = require('async');

// API Routes ------------------------------

// GET
exports.projects_get = (req, res) =>{
  console.log('/api/projects GET');
  res.send('SUCCESS');
};