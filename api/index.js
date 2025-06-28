const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// ✅ MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', () => console.log('❌ Error in DB connection'));
db.once('open', () => console.log('✅ DB Connected'));

// ✅ API Routes

app.post('/api/Sign_up', (req, res) => {
  const { email, password } = req.body;

  db.collection('users').insertOne({ email, password }, (err) => {
    if (err) return res.status(500).send('Error saving user');
    res.redirect('/project1.html');
  });
});

app.post('/api/payments', (req, res) => {
  const { name, item, price } = req.body;

  db.collection('payments').insertOne({ user: name, item, price }, (err) => {
    if (err) return res.status(500).send('Payment error');
    res.send('Payment recorded successfully');
  });
});

module.exports = serverless(app);
