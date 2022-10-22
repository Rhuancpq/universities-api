const app = require('./app')
const mongoose = require('mongoose')

async function main() {
  try {
    await mongoose.connect('mongodb://mongo:27017/universities', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: 'admin',
      user: 'root',
      pass: 'example',
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
