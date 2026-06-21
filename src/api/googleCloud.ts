import axios from 'axios';

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_CLOUD_API_KEY;
const GOOGLE_API_URL = 'https://language.googleapis.com/v1';

const googleClient = axios.create({
  baseURL: GOOGLE_API_URL,
});

export const analyzeMusic = async (text: string): Promise<any> => {
  try {
    const response = await googleClient.post(
      `/documents:analyzeSentiment?key=${GOOGLE_API_KEY}`,
      {
        document: {
          type: 'PLAIN_TEXT',
          content: text,
        },
        encodingType: 'UTF8',
      }
    );

    return response.data;
  } catch (error) {
    console.error('Google Cloud API Error:', error);
    throw new Error('Failed to analyze music');
  }
};

export const classifyGenre = async (musicDescription: string): Promise<string> => {
  try {
    const response = await googleClient.post(
      `/documents:classifyText?key=${GOOGLE_API_KEY}`,
      {
        document: {
          type: 'PLAIN_TEXT',
          content: musicDescription,
        },
      }
    );

    return response.data.categories[0]?.name || 'Unknown';
  } catch (error) {
    console.error('Google Cloud Classification Error:', error);
    throw new Error('Failed to classify genre');
  }
};
