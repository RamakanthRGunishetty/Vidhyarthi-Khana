// api/index.js
const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB once per cold start
let conn;
async function getDB() {
  if (conn) return conn;
  conn = await mongoose.createConnection(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return conn;
}

// POST /api/Sign_up
app.post('/api/Sign_up', async (req, res) => {
  try {
    const db = await getDB();
    const { email, password } = req.body;
    await db.collection('users').insertOne({ email, password });
    return res.redirect('/project1.html');
  } catch (e) {
    console.error(e);
    return res.status(500).send('DB Error');
  }
});

// POST /api/payments
app.post('/api/payments', async (req, res) => {
  try {
    const db = await getDB();
    const { name, item, price } = req.body;
    await db.collection('payments').insertOne({ user: name, item, price });
    return res.send('OK');
  } catch (e) {
    console.error(e);
    return res.status(500).send('DB Error');
  }
});

module.exports = serverless(app);
