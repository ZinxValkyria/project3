const express = require('express');
const axios = require('axios');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

// Marvel Comics API keys
const publicKey = SECRET.MARVEL_API_PUB;
const privateKey = SECRET.MARVEL_API_PRI;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Function to generate Marvel API hash
function generateMarvelHash() {
  const timestamp = new Date().getTime();
  const hashInput = `${timestamp}${privateKey}${publicKey}`;
  return {
    timestamp,
    hash: crypto.createHash('md5').update(hashInput).digest('hex')
  };
}

// Set up a simple route to serve the HTML page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Set up a route to handle API requests
app.get('/api/character', async (req, res) => {
  try {
    const characterName = req.query.character || 'Spider-Man';
    const { timestamp, hash } = generateMarvelHash();

    // Make a request to the Marvel Comics API
    const response = await axios.get(
      `https://gateway.marvel.com/v1/public/characters?name=${characterName}&apikey=${publicKey}&ts=${timestamp}&hash=${hash}`
    );

    // Extract relevant character information
    const characterData = response.data.data.results[0];

    // Respond with JSON data
    res.json({
      name: characterData.name,
      thumbnail: `${characterData.thumbnail.path}.${characterData.thumbnail.extension}`,
      description: characterData.description || 'No description available.'
    });
  } catch (error) {
    console.error('Error fetching character data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
