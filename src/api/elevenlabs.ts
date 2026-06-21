import axios from 'axios';

const ELEVENLABS_API_KEY = process.env.REACT_APP_ELEVENLABS_API_KEY;
const ELEVENLABS_API_URL = 'https://api.elevenlabs.io/v1';

const elevenlabsClient = axios.create({
  baseURL: ELEVENLABS_API_URL,
  headers: {
    'xi-api-key': ELEVENLABS_API_KEY,
  },
});

export interface VoiceSettings {
  stability: number;
  similarity_boost: number;
}

export const textToSpeech = async (
  text: string,
  voiceId: string = 'EXAVITQu4vr4xnSDxMaL',
  settings: VoiceSettings = { stability: 0.5, similarity_boost: 0.75 }
): Promise<Buffer> => {
  try {
    const response = await elevenlabsClient.post(
      `/text-to-speech/${voiceId}`,
      {
        text: text,
        voice_settings: settings,
      },
      { responseType: 'arraybuffer' }
    );

    return response.data;
  } catch (error) {
    console.error('ElevenLabs TTS Error:', error);
    throw new Error('Failed to generate speech');
  }
};

export const getAvailableVoices = async (): Promise<any[]> => {
  try {
    const response = await elevenlabsClient.get('/voices');
    return response.data.voices;
  } catch (error) {
    console.error('ElevenLabs Voices Error:', error);
    throw new Error('Failed to get available voices');
  }
};
