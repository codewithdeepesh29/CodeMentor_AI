const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');



const app = express();
app.use(express.json());

// Enable CORS for all origins
app.use(cors());

// Endpoint to send instructions to the terminal
app.post('/api/terminal', (req, res) => {
  const { topic } = req.body;

  // Load the corresponding instructions (replace with your logic)
  const instructionsPath = path.join(__dirname, 'instructions', `${topic}.txt`);
  fs.readFile(instructionsPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Failed to read instructions:', err);
      return res.status(500).send('Failed to load instructions.');
    }

    // Write instructions to the terminal
    console.log(`\n=== Instructions for ${topic} ===\n`);
    console.log(data);

    res.send('Instructions displayed in terminal.');
  });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});