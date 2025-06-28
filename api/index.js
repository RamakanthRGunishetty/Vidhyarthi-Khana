const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', () => console.log('Error in DB connection'));
db.once('open', () => console.log('DB Connected'));

app.get('./', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/Sign_up.html'));
});

app.post('/Sign_up', (req, res) => {
  const { email, password } = req.body;
  db.collection('users').insertOne({ email, password }, (err) => {
    if (err) return res.status(500).send('Error saving user');
    res.redirect('/project1.html');
  });
});

app.post('/payments', (req, res) => {
  const { name, item, price } = req.body;
  db.collection('payments').insertOne({ user: name, item, price }, (err) => {
    if (err) return res.status(500).send('Payment error');
    res.send('OK');
  });
});

// EXPORT as serverless function
module.exports = serverless(app);
