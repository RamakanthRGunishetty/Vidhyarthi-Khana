// api/index.js

const express    = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const path       = require('path');
require('dotenv').config();

const app = express();

// 1. Parse JSON and form bodies
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// 2. Serve static from /public at the root
//    → GET  /           → public/index.html
//    → GET  /css/...    → public/css/...
//    → GET  /project1.html, /payment.html, etc.
app.use(express.static(path.join(__dirname, '../public')));

// 3. Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser:    true,
    useUnifiedTopology: true,
  })
  .catch(err => console.error('❌ Mongo connect error:', err));

const db = mongoose.connection;
db.once('open', () => console.log('✅ MongoDB connected'));

// 4. POST /api/Sign_up
app.post('/api/Sign_up', (req, res) => {
  const { email, password } = req.body;
  db.collection('users').insertOne({ email, password }, err => {
    if (err) return res.status(500).send('❌ Error saving user');
    // after signup, redirect client to project1.html
    res.redirect('/project1.html');
  });
});

// 5. POST /api/payments
app.post('/api/payments', (req, res) => {
  const { name, item, price } = req.body;
  db.collection('payments').insertOne({ user: name, item, price }, err => {
    if (err) return res.status(500).send('❌ Payment error');
    res.send('✅ Payment saved');
  });
});

// 6. Export for Vercel (serverless)
module.exports = app;
module.exports.handler = serverless(app);
