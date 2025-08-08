import { createSlice } from '@reduxjs/toolkit';

// Default background images using free, high-quality sources
const defaultImages = [
  {
    id: 'default1',
    url: 'https://picsum.photos/1920/1080?random=1',
    name: 'Nature Scene',
    source: 'Lorem Picsum'
  },
  {
    id: 'default2', 
    url: 'https://picsum.photos/1920/1080?random=2',
    name: 'Scenic View',
    source: 'Lorem Picsum'
  },
  {
    id: 'default3',
    url: 'https://picsum.photos/1920/1080?random=3',
    name: 'Landscape',
    source: 'Lorem Picsum'
  },
  {
    id: 'default4',
    url: 'https://picsum.photos/1920/1080?random=4',
    name: 'Mountain View',
    source: 'Lorem Picsum'
  },
  {
    id: 'default5',
    url: 'https://picsum.photos/1920/1080?random=5',
    name: 'Ocean Breeze',
    source: 'Lorem Picsum'
  },
  {
    id: 'default6',
    url: 'https://picsum.photos/1920/1080?random=6',
    name: 'Forest Calm',
    source: 'Lorem Picsum'
  }
];

// Initial state with mock data
const initialState = {
  currentBackground: {
    id: 'default1',
    url: 'https://picsum.photos/1920/1080?random=1',
    name: 'Nature Scene',
    source: 'Lorem Picsum'
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
    
    // Action to refresh random images
    refreshRandomImages: (state) => {
      // Update the random image URLs to get new images
      state.availableImages = state.availableImages.map(image => {
        if (image.source === 'Lorem Picsum') {
          return {
            ...image,
            url: `https://picsum.photos/1920/1080?random=${Math.floor(Math.random() * 1000)}`
          };
        }
        return image;
      });
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
  refreshRandomImages,
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
