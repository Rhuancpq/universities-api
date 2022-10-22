var express = require('express')
var router = express.Router()

var UniversitiesController = require('../controller/universities')

router.get('/', function (req, res, next) {
  new UniversitiesController().listUniversities(req, res)
})

module.exports = router
