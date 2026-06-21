import axios from 'axios';

const AZURE_API_KEY = process.env.REACT_APP_AZURE_API_KEY;
const AZURE_REGION = process.env.REACT_APP_AZURE_REGION;
const AZURE_API_URL = `https://${AZURE_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`;

const azureClient = axios.create({
  headers: {
    'Ocp-Apim-Subscription-Key': AZURE_API_KEY,
    'Content-Type': 'application/ssml+xml',
  },
});

export const synthesizeSpeech = async (text: string, voiceGender: string = 'Female'): Promise<Buffer> => {
  try {
    const ssml = `
      <speak version='1.0' xml:lang='en-US'>
        <voice name='en-US-${voiceGender}Neural'>
          ${text}
        </voice>
      </speak>
    `;

    const response = await azureClient.post(AZURE_API_URL, ssml);
    return response.data;
  } catch (error) {
    console.error('Azure Speech Synthesis Error:', error);
    throw new Error('Failed to synthesize speech');
  }
};
