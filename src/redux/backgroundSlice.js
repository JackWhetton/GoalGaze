import { createSlice } from '@reduxjs/toolkit';

// Default background images
const defaultImages = [
  {
    id: 'default1',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    name: 'Mountain Peak'
  },
  {
    id: 'default2', 
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    name: 'Forest Path'
  },
  {
    id: 'default3',
    url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    name: 'Forest Bridge'
  }
];

// Initial state with mock data
const initialState = {
  currentBackground: {
    id: 'default1',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    name: 'Mountain Peak'
  },
  availableImages: defaultImages,
  customImages: [],
  loading: false,
  error: null
};

const backgroundSlice = createSlice({
  name: 'background',
  initialState,
  reducers: {
    // Action to set the current background image
    setBackgroundImage: (state, action) => {
      state.currentBackground = action.payload;
      // Save to localStorage for persistence
      if (typeof window !== 'undefined') {
        localStorage.setItem('selectedBackgroundImage', JSON.stringify(action.payload));
      }
    },
    
    // Action to add a custom image
    addCustomImage: (state, action) => {
      const customImage = {
        ...action.payload,
        id: 'custom-' + Date.now(),
        source: 'custom'
      };
      state.customImages.push(customImage);
      state.availableImages.push(customImage);
    },
    
    // Action to remove a custom image
    removeCustomImage: (state, action) => {
      const imageId = action.payload;
      state.customImages = state.customImages.filter(img => img.id !== imageId);
      state.availableImages = state.availableImages.filter(img => img.id !== imageId);
      
      // If the removed image was the current background, switch to default
      if (state.currentBackground.id === imageId) {
        state.currentBackground = defaultImages[0];
      }
    },
    
    // Action to load saved background from localStorage
    loadSavedBackground: (state) => {
      if (typeof window !== 'undefined') {
        const savedImage = localStorage.getItem('selectedBackgroundImage');
        if (savedImage) {
          try {
            const parsed = JSON.parse(savedImage);
            state.currentBackground = parsed;
          } catch (error) {
            console.error('Error loading saved background:', error);
            state.currentBackground = defaultImages[0];
          }
        }
      }
    },
    
    // Actions for loading states (for future API integration)
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

// Export actions
export const {
  setBackgroundImage,
  addCustomImage,
  removeCustomImage,
  loadSavedBackground,
  setLoading,
  setError
} = backgroundSlice.actions;

// Export selectors
export const selectCurrentBackground = (state) => state.background.currentBackground;
export const selectAvailableImages = (state) => state.background.availableImages;
export const selectCustomImages = (state) => state.background.customImages;
export const selectDefaultImages = () => defaultImages;
export const selectBackgroundLoading = (state) => state.background.loading;
export const selectBackgroundError = (state) => state.background.error;

// Export reducer
export default backgroundSlice.reducer;
