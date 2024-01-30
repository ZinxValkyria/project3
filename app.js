const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const ejs = require('ejs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
app.set('views', path.join(__dirname, 'public'));

// Marvel Comics API keys
const publicKey = "ec9a3c0941677edd5c57cf7071929d11";
const privateKey = "b18a73dd711b2d33ff628eeb6466bbde95923bef";

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

app.set('view engine', 'ejs');

// Set up a simple route to serve the HTML page
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/movies', (req, res) => {
  res.render('movies');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/marvel', (req, res) => {
  res.render('marvel');
});

app.get('/gaming', (req, res) => {
  res.render('gaming');
});


app.get('/search', async (req, res) => {
  try {
    const searchQuery = req.query.query;
    const apiKey = '7930cc9ef2b94485a6ca5cd3d3788bfd'; // Replace with your RAWG API key
    const apiUrl = 'https://api.rawg.io/api/games';
    const response = await axios.get(apiUrl, {
      params: {
        key: apiKey,
        search: searchQuery,
      },
    });

    const games = response.data.results;
    res.json(games);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Sta


// Set up a route to handle API requests for Studio Ghibli films
app.get('/api/anime', async (req, res) => {
  try {
    // Make a request to the Studio Ghibli API
    const response = await axios.get('https://ghibliapi.herokuapp.com/films');

    // Respond with JSON data
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching anime data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




// Set up a route to handle API requests
app.get('/api/character', async (req, res) => {
  try {
    const characterName = req.query.character;
    const { timestamp, hash } = generateMarvelHash();

    // Make a request to the Marvel Comics API
    const response = await axios.get(
      `https://gateway.marvel.com/v1/public/characters?name=${characterName}&apikey=${publicKey}&ts=${timestamp}&hash=${hash}`
    );

    // Extract relevant character information
    const characterData = response.data.data.results[0];

    // Respond with JSON data
    res.json({
      id: characterData.id,
      name: characterData.name,
      description: characterData.description || 'No description available.',
      modified: characterData.modified,
      resourceURI: characterData.resourceURI,
      thumbnail: `${characterData.thumbnail.path}.${characterData.thumbnail.extension}`,
      comics: characterData.comics,
      series: characterData.series,
      stories: characterData.stories,
      events: characterData.events,
      urls: characterData.urls
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

module.exports = app;