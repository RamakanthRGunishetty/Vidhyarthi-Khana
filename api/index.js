// api/index.js
const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1) Serve everything in /public as static files:
//    /css/...   → public/css/...  
//    /images/...→ public/images/...  
//    /project1.html, /payment.html → public/project1.html, public/payment.html
app.use(express.static(path.join(__dirname, '../public')));

// 2) Serve your root-level index.html at "/"
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// 3) API routes

// POST /api/Sign_up
app.post('/api/Sign_up', async (req, res) => {
  try {
    const db = await mongoose
      .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(conn => conn.connection.db);

    const { email, password } = req.body;
    await db.collection('users').insertOne({ email, password });
    // After signup, redirect to the static project1 page
    res.redirect('/project1.html');
  } catch (err) {
    console.error('Sign_up error:', err);
    res.status(500).send('Database error');
  }
});

// POST /api/payments
app.post('/api/payments', async (req, res) => {
  try {
    const db = await mongoose
      .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(conn => conn.connection.db);

    const { name, item, price } = req.body;
    await db.collection('payments').insertOne({ user: name, item, price });
    res.send('OK');
  } catch (err) {
    console.error('Payments error:', err);
    res.status(500).send('Database error');
  }
});

// Export as a serverless function
module.exports = serverless(app);
