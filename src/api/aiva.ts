import axios from 'axios';

const AIVA_API_KEY = process.env.REACT_APP_AIVA_API_KEY;
const AIVA_API_URL = 'https://www.aiva.ai/api';

const aivaClient = axios.create({
  baseURL: AIVA_API_URL,
  headers: {
    'Authorization': `Bearer ${AIVA_API_KEY}`,
  },
});

export interface CompositionParams {
  style: string;
  mood: string;
  length: number;
  instrumentation?: string[];
}

export const composeMusic = async (params: CompositionParams): Promise<string> => {
  try {
    const response = await aivaClient.post('/compositions', {
      style: params.style,
      mood: params.mood,
      length: params.length,
      instrumentation: params.instrumentation || [],
    });

    return response.data.compositionId;
  } catch (error) {
    console.error('AIVA Composition Error:', error);
    throw new Error('Failed to compose music');
  }
};

export const getCompositionStatus = async (compositionId: string): Promise<any> => {
  try {
    const response = await aivaClient.get(`/compositions/${compositionId}`);
    return response.data;
  } catch (error) {
    console.error('AIVA Status Error:', error);
    throw new Error('Failed to get composition status');
  }
};
