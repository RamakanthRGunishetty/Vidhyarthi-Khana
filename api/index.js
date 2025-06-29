const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();

// Parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Serve everything in /docs at the site root
app.use(express.static(path.join(__dirname, '../docs')));

// Explicit root route (optional, since static will already serve index.html)
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../docs/index.html'));
});

// Handle signup form
app.post('/Sign_up', (req, res) => {
  const { email, password } = req.body;
  mongoose.connection.collection('users').insertOne({ email, password }, (err) => {
    if (err) return res.status(500).send('❌ Error saving user');
    // After signup, send them to project1.html
    res.redirect('/project1.html');
  });
});

// Handle payment form
app.post('/payments', (req, res) => {
  const { name, item, price } = req.body;
  mongoose.connection.collection('payments').insertOne({ user: name, item, price }, (err) => {
    if (err) return res.status(500).send('❌ Payment error');
    res.send('✅ Payment saved');
  });
});

// MongoDB connection setup
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', () => console.log('❌ Error connecting to DB'));
db.once('open', () => console.log('✅ Connected to DB'));

// Export for serverless environments
module.exports = app;
module.exports.handler = serverless(app);
