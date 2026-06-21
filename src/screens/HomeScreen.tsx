import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const HomeScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>EddieGarciaAI Music Maker</Text>
        <Text style={styles.subtitle}>Create AI-Powered Music</Text>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>🎵 Create New Music</Text>
          <Text style={styles.cardDescription}>Generate music using AI</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>✍️ Write Lyrics</Text>
          <Text style={styles.cardDescription}>AI-powered lyric generation</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>🎼 Compose</Text>
          <Text style={styles.cardDescription}>AI composition assistant</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>📊 Analyze</Text>
          <Text style={styles.cardDescription}>Analyze mood and emotions</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00d4ff',
  },
  subtitle: {
    fontSize: 16,
    color: '#0f3460',
    marginTop: 5,
  },
  section: {
    padding: 15,
  },
  card: {
    backgroundColor: '#0f3460',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#00d4ff',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00d4ff',
  },
  cardDescription: {
    fontSize: 14,
    color: '#a8dadc',
    marginTop: 5,
  },
});

export default HomeScreen;
