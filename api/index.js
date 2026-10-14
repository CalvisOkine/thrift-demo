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

module.exports = app;
