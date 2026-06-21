import axios from 'axios';

const HF_API_KEY = process.env.REACT_APP_HUGGINGFACE_API_KEY;
const HF_API_URL = 'https://api-inference.huggingface.co/models';

const hfClient = axios.create({
  baseURL: HF_API_URL,
});

export const classifyGenre = async (musicDescription: string): Promise<any> => {
  try {
    const response = await hfClient.post(
      '/joeddav/xlnet-base-cased-ag_news',
      { inputs: musicDescription },
      { headers: { 'Authorization': `Bearer ${HF_API_KEY}` } }
    );

    return response.data;
  } catch (error) {
    console.error('Hugging Face Classification Error:', error);
    throw new Error('Failed to classify music genre');
  }
};
