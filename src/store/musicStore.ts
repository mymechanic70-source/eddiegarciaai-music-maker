import create from 'zustand';

interface Music {
  id: string;
  title: string;
  artist: string;
  duration: number;
  genre: string;
  mood: string;
  url: string;
  lyrics?: string;
  createdAt: Date;
}

interface MusicStore {
  currentMusic: Music | null;
  playlist: Music[];
  favorites: Music[];
  isPlaying: boolean;
  currentTime: number;
  
  setCurrentMusic: (music: Music) => void;
  addToPlaylist: (music: Music) => void;
  removeFromPlaylist: (id: string) => void;
  addToFavorites: (music: Music) => void;
  removeFromFavorites: (id: string) => void;
  setIsPlaying: (playing: boolean) => void;
  setCurrentTime: (time: number) => void;
  clearPlaylist: () => void;
}

export const useMusicStore = create<MusicStore>((set) => ({
  currentMusic: null,
  playlist: [],
  favorites: [],
  isPlaying: false,
  currentTime: 0,
  
  setCurrentMusic: (music) => set({ currentMusic: music }),
  
  addToPlaylist: (music) =>
    set((state) => ({
      playlist: [...state.playlist, music],
    })),
  
  removeFromPlaylist: (id) =>
    set((state) => ({
      playlist: state.playlist.filter((m) => m.id !== id),
    })),
  
  addToFavorites: (music) =>
    set((state) => ({
      favorites: [...state.favorites, music],
    })),
  
  removeFromFavorites: (id) =>
    set((state) => ({
      favorites: state.favorites.filter((m) => m.id !== id),
    })),
  
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  
  setCurrentTime: (time) => set({ currentTime: time }),
  
  clearPlaylist: () => set({ playlist: [] }),
}));
