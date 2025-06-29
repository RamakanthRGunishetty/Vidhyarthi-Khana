// api/index.js

const express    = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const path       = require('path');
require('dotenv').config();

const app = express();

// 1) Body parsing
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// 2) Serve everything in /docs at the site root
app.use(express.static(path.join(__dirname, '../docs')));

// 3) (Optional) Explicit root route to docs/index.html
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../docs/index.html'));
});

// 4) MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser:    true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', () => console.log('❌ Error connecting to DB'));
db.once('open', () => console.log('✅ Connected to DB'));

// 5) Handle signup form
app.post('/Sign_up', (req, res) => {
  const { email, password } = req.body;
  db.collection('users').insertOne({ email, password }, err => {
    if (err) return res.status(500).send('❌ Error saving user');
    // redirect to /project1.html (served from docs/)
    res.redirect('/project1.html');
  });
});

// 6) Handle payment form
app.post('/payments', (req, res) => {
  const { name, item, price } = req.body;
  db.collection('payments').insertOne({ user: name, item, price }, err => {
    if (err) return res.status(500).send('❌ Payment error');
    res.send('✅ Payment saved');
  });
});

// 7) Export for serverless
module.exports        = app;
module.exports.handler = serverless(app);
