import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useMusicStore } from '../store/musicStore';

const LibraryScreen: React.FC = () => {
  const { favorites, playlist } = useMusicStore();

  const renderMusicItem = (music: any) => (
    <TouchableOpacity style={styles.item}>
      <View>
        <Text style={styles.itemTitle}>{music.title}</Text>
        <Text style={styles.itemSubtitle}>{music.artist}</Text>
        <Text style={styles.itemGenre}>{music.genre} • {music.mood}</Text>
      </View>
      <Text style={styles.duration}>{Math.floor(music.duration / 60)}:{String(music.duration % 60).padStart(2, '0')}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Library</Text>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity style={styles.activeTab}>
          <Text style={styles.activeTabText}>Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Playlist</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={favorites}
        renderItem={({ item }) => renderMusicItem(item)}
        keyExtractor={(item) => item.id}
        style={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No favorites yet</Text>
          </View>
        }
      />
    </View>
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
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#0f3460',
    borderBottomWidth: 1,
    borderBottomColor: '#00d4ff',
  },
  tab: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },
  activeTab: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#00d4ff',
  },
  tabText: {
    color: '#a8dadc',
    fontSize: 14,
  },
  activeTabText: {
    color: '#00d4ff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
    padding: 15,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0f3460',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00d4ff',
  },
  itemSubtitle: {
    fontSize: 12,
    color: '#a8dadc',
    marginTop: 4,
  },
  itemGenre: {
    fontSize: 11,
    color: '#666',
    marginTop: 2,
  },
  duration: {
    color: '#00d4ff',
    fontSize: 12,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
  },
});

export default LibraryScreen;
