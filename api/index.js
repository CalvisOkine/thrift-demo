const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.post('/location', (req, res) => {
  console.log('Location received:', {
    ...req.body,
    ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
    time: new Date().toISOString()
  });
  res.json({ ok: true });
});

// api/index.js
const express = require('express');
const app = express();

app.use(express.json());

app.post('/location', (req, res) => {
  console.log('Location received:', {
    ...req.body,
    ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
    time: new Date().toISOString()
  });
  res.status(200).json({ ok: true });
});

// This is the critical change.
// Instead of app.listen(), you export the app for Vercel to run.
module.exports = app;
