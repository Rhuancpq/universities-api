const University = require('../model/university')

class UniversitiesController {
  async listUniversities(req, res) {
    try {
      const universities = await University.find()
      res.json(universities)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async getUniversities(req, res) {}

  async postUniversity(req, res) {}

  async putUniversity(req, res) {}

  async deleteUniversity(req, res) {}
}

module.exports = UniversitiesController
