import axios from 'axios';

const SPOTIFY_CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

const spotifyClient = axios.create({
  baseURL: 'https://api.spotify.com/v1',
});

export const getRecommendations = async (accessToken: string, seedTracks: string[], mood: string): Promise<any> => {
  try {
    const response = await spotifyClient.get('/recommendations', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      params: {
        seed_tracks: seedTracks.join(','),
        seed_genres: mood.toLowerCase(),
        limit: 10,
      },
    });

    return response.data.tracks;
  } catch (error) {
    console.error('Spotify Recommendations Error:', error);
    throw new Error('Failed to get recommendations');
  }
};

export const searchTracks = async (accessToken: string, query: string): Promise<any> => {
  try {
    const response = await spotifyClient.get('/search', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      params: {
        q: query,
        type: 'track',
        limit: 20,
      },
    });
    return response.data.tracks.items;
  } catch (error) {
    console.error('Spotify Search Error:', error);
    throw new Error('Failed to search tracks');
  }
};
