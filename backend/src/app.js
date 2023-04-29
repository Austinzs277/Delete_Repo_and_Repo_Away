const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS
app.use(cors());

// this is for test 
app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});
// above is for test 

module.exports = app;
