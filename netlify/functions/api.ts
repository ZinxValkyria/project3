import { Request, Response } from 'express';
import axios from 'axios';
import crypto from 'crypto';

// Function to generate Marvel API hash
function generateMarvelHash(privateKey: string, publicKey: string) {
  const timestamp = new Date().getTime();
  const hashInput = `${timestamp}${privateKey}${publicKey}`;
  return {
    timestamp,
    hash: crypto.createHash('md5').update(hashInput).digest('hex')
  };
}

export async function searchGames(req: Request, res: Response) {
  try {
    const searchQuery = req.query.query as string;
    const apiKey = '7930cc9ef2b94485a6ca5cd3d3788bfd'; 
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
}

export async function getAnime(req: Request, res: Response) {
  try {
    const response = await axios.get('https://ghibliapi.herokuapp.com/films');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching anime data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function getMarvelCharacter(req: Request, res: Response) {
  try {
    const characterName = req.query.character as string;
    const { timestamp, hash } = generateMarvelHash("b18a73dd711b2d33ff628eeb6466bbde95923bef", "ec9a3c0941677edd5c57cf7071929d11");

    const response = await axios.get(
      `https://gateway.marvel.com/v1/public/characters?name=${characterName}&apikey=ec9a3c0941677edd5c57cf7071929d11&ts=${timestamp}&hash=${hash}`
    );

    const characterData = response.data.data.results[0];

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
}
