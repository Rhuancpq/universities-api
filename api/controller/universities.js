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

  async showUniversity(req, res) {
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

  async postUniversity(req, res) {
    try {
      const {
        name,
        country,
        state_province,
        domains,
        alpha_two_code,
        web_pages,
      } = req.body
      if (
        !name ||
        !country ||
        !state_province ||
        !domains ||
        !alpha_two_code ||
        !web_pages
      ) {
        res.status(400).json({ error: 'Missing required fields' })
        return
      }

      const university = await University.findOne({
        name,
        country,
        state_province,
      })

      if (university) {
        res.status(400).json({ error: 'University already exists' })
        return
      }

      const newUniversity = new University({
        name,
        country,
        state_province,
        domains,
        alpha_two_code,
        web_pages,
      })
      await newUniversity.save()
      res.json(newUniversity)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async putUniversity(req, res) {
    try {
      const id = req.params.id
      const { name, domains, web_pages } = req.body
      const university = await University.findByIdAndUpdate(
        id,
        {
          name,
          domains,
          web_pages,
        },
        { new: true }
      )
      res.json(university)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

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
