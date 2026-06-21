import axios from 'axios';

const WATSON_API_KEY = process.env.REACT_APP_IBM_WATSON_API_KEY;
const WATSON_URL = process.env.REACT_APP_IBM_WATSON_URL;

const watsonClient = axios.create({
  baseURL: WATSON_URL,
  auth: {
    username: 'apikey',
    password: WATSON_API_KEY || '',
  },
});

export interface MoodAnalysis {
  anger: number;
  disgust: number;
  fear: number;
  joy: number;
  sadness: number;
}

export const analyzeMood = async (text: string): Promise<MoodAnalysis> => {
  try {
    const response = await watsonClient.post('/v1/analyze?version=2021-08-01', {
      text: text,
      features: {
        emotion: {},
      },
    });

    const emotions = response.data.emotion.document.emotion;
    return {
      anger: emotions.anger || 0,
      disgust: emotions.disgust || 0,
      fear: emotions.fear || 0,
      joy: emotions.joy || 0,
      sadness: emotions.sadness || 0,
    };
  } catch (error) {
    console.error('Watson API Error:', error);
    throw new Error('Failed to analyze mood');
  }
};
