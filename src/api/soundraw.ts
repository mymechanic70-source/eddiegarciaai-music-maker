import axios from 'axios';

const SOUNDRAW_API_KEY = process.env.REACT_APP_SOUNDRAW_API_KEY;
const SOUNDRAW_API_URL = 'https://api.soundraw.io';

const soundrawClient = axios.create({
  baseURL: SOUNDRAW_API_URL,
  headers: {
    'Authorization': `Bearer ${SOUNDRAW_API_KEY}`,
  },
});

export interface MusicGenerationParams {
  genre: string;
  mood: string;
  duration: number;
  tempo?: number;
  style?: string;
}

export const generateMusic = async (params: MusicGenerationParams): Promise<string> => {
  try {
    const response = await soundrawClient.post('/generate', {
      genre: params.genre,
      mood: params.mood,
      duration: params.duration,
      tempo: params.tempo || 120,
      style: params.style || 'original',
    });

    return response.data.musicId;
  } catch (error) {
    console.error('Soundraw Generation Error:', error);
    throw new Error('Failed to generate music');
  }
};

export const downloadMusic = async (musicId: string): Promise<string> => {
  try {
    const response = await soundrawClient.get(`/download/${musicId}`);
    return response.data.downloadUrl;
  } catch (error) {
    console.error('Soundraw Download Error:', error);
    throw new Error('Failed to download music');
  }
};
