import {create} from 'zustand';

const useStore = create((set) => ({
  username: '',
  setUsername: (newUsername) => set({ username: newUsername }),
  logout: () => set({ username: '' }), // Agrega la función de logout
}));

export default useStore;
