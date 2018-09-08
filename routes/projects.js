var express = require('express');
var path = require('path');
var router = express.Router();

var project_controller = require('../controllers/projectController');

/*  "/api/projects"
 *    GET: Finds all projects
 *    POST: Not used
 *    PUT: Not used
 *    DELETE: Not used
 */

 router.get('/', project_controller.projects_get);


 module.exports = router;