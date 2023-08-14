var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
require('dotenv').config()

const app = express()
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

var db = mongoose.connection

db.on('error', () => console.log('Error in Connecting to Database'))
db.once('open', () => console.log('Connected to Database'))

app.post('/Sign_up', (req, res) => {
  var email = req.body.email
  var password = req.body.password

  var data = {
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
  var user = req.body.name
  var item = req.body.item
  var price = req.body.price

  var payment = {
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

app
  .get('/', (req, res) => {
    res.set({
      'Allow-auth': '*',
    })
    return res.redirect('Sign_up.html')
  })
  .listen(3002)

console.log('Listening on PORT 3002')
