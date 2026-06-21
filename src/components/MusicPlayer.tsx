import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useMusic } from '../hooks/useMusic';

const MusicPlayer: React.FC = () => {
  const { currentMusic, isPlaying, pauseMusic, resumeMusic, nextTrack, previousTrack } = useMusic();

  if (!currentMusic) {
    return (
      <View style={styles.container}>
        <Text style={styles.placeholder}>Select a track to play</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.title}>{currentMusic.title}</Text>
        <Text style={styles.artist}>{currentMusic.artist}</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity onPress={previousTrack}>
          <Text style={styles.icon}>⏮️</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={isPlaying ? pauseMusic : resumeMusic}>
          <Text style={styles.playIcon}>{isPlaying ? '⏸️' : '▶️'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={nextTrack}>
          <Text style={styles.icon}>⏭️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0f3460',
    borderTopWidth: 1,
    borderTopColor: '#00d4ff',
    padding: 15,
  },
  info: {
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00d4ff',
  },
  artist: {
    fontSize: 12,
    color: '#a8dadc',
    marginTop: 4,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
  icon: {
    fontSize: 24,
  },
  playIcon: {
    fontSize: 32,
  },
  placeholder: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },
});

export default MusicPlayer;
