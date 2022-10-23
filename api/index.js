const app = require('./app')
const mongoose = require('mongoose')

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://mongo:27017/universities'
const MONGODB_USER = process.env.MONGODB_USER || 'root'
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD || 'example'

async function main() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: 'admin',
      user: MONGODB_USER,
      pass: MONGODB_PASSWORD,
    })

    app.listen(5000, () => {
      console.log('Server running on port 5000')
    })
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

main()
