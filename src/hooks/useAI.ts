import { useState, useCallback } from 'react';
import * as openai from '../api/openai';
import * as watson from '../api/watson';
import * as azure from '../api/azure';
import * as soundraw from '../api/soundraw';
import * as aiva from '../api/aiva';

export const useAI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateLyrics = useCallback(async (prompt: string) => {
    try {
      setLoading(true);
      const result = await openai.generateLyrics(prompt);
      setError(null);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to generate lyrics';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const analyzeMood = useCallback(async (text: string) => {
    try {
      setLoading(true);
      const result = await watson.analyzeMood(text);
      setError(null);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to analyze mood';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const generateMusic = useCallback(async (params: any) => {
    try {
      setLoading(true);
      const result = await soundraw.generateMusic(params);
      setError(null);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to generate music';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const synthesizeSpeech = useCallback(async (text: string, voiceId?: string) => {
    try {
      setLoading(true);
      const result = await azure.synthesizeSpeech(text, voiceId);
      setError(null);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to synthesize speech';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    generateLyrics,
    analyzeMood,
    generateMusic,
    synthesizeSpeech,
    loading,
    error,
  };
};
