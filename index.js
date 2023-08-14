const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection

db.on('error', () => console.log('Error in Connecting to Database'))
db.once('open', () => console.log('Connected to Database'))

app.post('/Sign_up', (req, res) => {
  const email = req.body.email
  const password = req.body.password

  const data = {
    email: email,
    password: password,
  }

  db.collection('users').insertOne(data, (err, collection) => {
    if (err) {
      throw err
    }
    console.log('Record Inserted Successfully')
  })
  return res.redirect('project1.html')
})

app.post('/payments', (req, res) => {
  const user = req.body.name
  const item = req.body.item
  const price = req.body.price

  const payment = {
    user: user,
    item: item,
    price: price,
  }

  db.collection('payments').insertOne(payment, (err, collection) => {
    if (err) {
      throw err
    }
    console.log('Payments Inserted Successfully')
  })
})

app.get('/', (req, res) => {
  res.set({
    'Allow-auth': '*',
  })
  return res.redirect('Sign_up.html')
})

app.listen(port, () => {
  console.log(`Listening on PORT ${port}`)
})
