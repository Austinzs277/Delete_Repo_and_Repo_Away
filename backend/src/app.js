const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS
app.use(cors());

app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

module.exports = app;
