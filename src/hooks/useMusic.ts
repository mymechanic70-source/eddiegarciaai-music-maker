import { useState, useCallback } from 'react';
import { useMusicStore } from '../store/musicStore';

export const useMusic = () => {
  const store = useMusicStore();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const playMusic = useCallback(async (music: any) => {
    try {
      setLoading(true);
      store.setCurrentMusic(music);
      store.setIsPlaying(true);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [store]);

  const pauseMusic = useCallback(() => {
    store.setIsPlaying(false);
  }, [store]);

  const resumeMusic = useCallback(() => {
    store.setIsPlaying(true);
  }, [store]);

  const stopMusic = useCallback(() => {
    store.setIsPlaying(false);
    store.setCurrentTime(0);
  }, [store]);

  const nextTrack = useCallback(() => {
    if (!store.currentMusic) return;
    const index = store.playlist.findIndex((m) => m.id === store.currentMusic?.id);
    if (index < store.playlist.length - 1) {
      playMusic(store.playlist[index + 1]);
    }
  }, [store.currentMusic, store.playlist, playMusic]);

  const previousTrack = useCallback(() => {
    if (!store.currentMusic) return;
    const index = store.playlist.findIndex((m) => m.id === store.currentMusic?.id);
    if (index > 0) {
      playMusic(store.playlist[index - 1]);
    }
  }, [store.currentMusic, store.playlist, playMusic]);

  return {
    ...store,
    playMusic,
    pauseMusic,
    resumeMusic,
    stopMusic,
    nextTrack,
    previousTrack,
    error,
    loading,
  };
};
