var express = require('express')
var router = express.Router()

var UniversitiesController = require('../controller/universities')

router.get('/', function (req, res, next) {
  new UniversitiesController().listUniversities(req, res)
})

router.get('/:id', function (req, res, next) {
  new UniversitiesController().getUniversities(req, res)
})

router.delete('/:id', function (req, res, next) {
  new UniversitiesController().deleteUniversity(req, res)
})

module.exports = router
