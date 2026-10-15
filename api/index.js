const express = require('express');
const { sql } = require('@vercel/postgres');

const app = express();
app.use(express.json());

app.post('/location', async (req, res) => {
  try {
    const { lat, lon, accuracy } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    await sql`
      INSERT INTO locations (lat, lon, accuracy, ip)
      VALUES (${lat}, ${lon}, ${accuracy}, ${ip})
    `;

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Database error:', error.message);
    res.status(500).json({ ok: false, error: 'Failed to save location' });
  }
});

module.exports = app;
