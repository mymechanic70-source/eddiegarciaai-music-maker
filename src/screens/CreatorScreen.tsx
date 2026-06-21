import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAI } from '../hooks/useAI';

const CreatorScreen: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const { generateLyrics, loading, error } = useAI();
  const [lyrics, setLyrics] = useState('');

  const handleGenerateLyrics = async () => {
    try {
      const result = await generateLyrics(prompt);
      setLyrics(result);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Music Creator</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Describe Your Music</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter music description or mood..."
          placeholderTextColor="#666"
          value={prompt}
          onChangeText={setPrompt}
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleGenerateLyrics}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#00d4ff" />
          ) : (
            <Text style={styles.buttonText}>Generate Lyrics</Text>
          )}
        </TouchableOpacity>

        {error && <Text style={styles.error}>{error}</Text>}

        {lyrics && (
          <View style={styles.lyricsContainer}>
            <Text style={styles.label}>Generated Lyrics</Text>
            <View style={styles.lyricsBox}>
              <Text style={styles.lyrics}>{lyrics}</Text>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    padding: 20,
    backgroundColor: '#16213e',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00d4ff',
  },
  section: {
    padding: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00d4ff',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#0f3460',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#00d4ff',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#00d4ff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#1a1a2e',
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: '#ff6b6b',
    marginBottom: 15,
  },
  lyricsContainer: {
    marginTop: 20,
  },
  lyricsBox: {
    backgroundColor: '#0f3460',
    borderRadius: 8,
    padding: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#00d4ff',
  },
  lyrics: {
    color: '#a8dadc',
    fontSize: 14,
    lineHeight: 22,
  },
});

export default CreatorScreen;
