import axios from 'axios';

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1';

const openaiClient = axios.create({
  baseURL: OPENAI_API_URL,
  headers: {
    'Authorization': `Bearer ${OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export const generateLyrics = async (prompt: string): Promise<string> => {
  try {
    const response = await openaiClient.post('/chat/completions', {
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a talented songwriter. Generate creative, memorable lyrics based on the user prompt.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 500,
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to generate lyrics');
  }
};

export const generateMusicPrompt = async (description: string): Promise<string> => {
  try {
    const response = await openaiClient.post('/chat/completions', {
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a music production expert. Convert descriptions into detailed music production prompts.',
        },
        {
          role: 'user',
          content: description,
        },
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to generate music prompt');
  }
};
