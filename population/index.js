const { MongoClient } = require('mongodb')
const axios = require('axios')

const uri = process.env.MONGODB_URI || 'mongodb://root:example@mongo:27017/'

const client = new MongoClient(uri, { useUnifiedTopology: true })

const countries = [
  'argentina',
  'brazil',
  'chile',
  'colombia',
  'paraguay',
  'peru',
  'suriname',
  'uruguay',
]

async function run() {
  try {
    await client.connect()
    const database = client.db('universities')

    const collections = await database.listCollections().toArray()
    const collection = database.collection('universities')
    if (collections.some((c) => c.name === 'universities')) {
      await collection.drop()
    }

    for (const country of countries) {
      const { data } = await axios.get(
        'http://universities.hipolabs.com/search?country=' + country
      )

      if (data.length > 0) {
        await collection.insertMany(data)
      }

      console.log('Inserted documents =>', data.length)
      console.log('Completed =>', country)
    }
  } finally {
    await client.close()
  }
}

run().catch(console.dir)
