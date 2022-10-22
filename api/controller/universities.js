const University = require('../model/university')

const PAGINATION_LIMIT = 20

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

class UniversitiesController {
  async listUniversities(req, res) {
    try {
      const page = req.query.page || 1
      const country = req.query.country || ''
      const universities = await University.find({
        country: capitalizeFirstLetter(country),
      })
        .skip((page - 1) * PAGINATION_LIMIT)
        .limit(PAGINATION_LIMIT)
        .select('_id name country state-province')
      res.json(universities)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async getUniversities(req, res) {
    try {
      const id = req.params.id
      const universities = await University.findById(id).select(
        '_id name country state-province'
      )
      res.json(universities)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async postUniversity(req, res) {}

  async putUniversity(req, res) {}

  async deleteUniversity(req, res) {
    try {
      const id = req.params.id
      const university = await University.findByIdAndDelete(id)
      res.json(university)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

module.exports = UniversitiesController
