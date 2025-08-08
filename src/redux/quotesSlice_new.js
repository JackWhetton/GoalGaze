import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'https://api.quotable.io';

// Async thunk for fetching a random quote from Quotable API
export const fetchRandomQuote = createAsyncThunk(
  'quotes/fetchRandom',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/quotes/random?tags=motivational|inspirational|success|wisdom&maxLength=200`);
      
      if (!response.ok) {
        throw new Error(`Quotable API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // The API returns an array, so we take the first quote
      const quote = data[0];
      
      // Transform the API response to match our app's structure
      return {
        id: quote._id,
        text: quote.content,
        author: quote.author,
        tags: quote.tags,
        length: quote.length
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching quotes by specific tags
export const fetchQuoteByTag = createAsyncThunk(
  'quotes/fetchByTag',
  async (tag, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/quotes/random?tags=${tag}&maxLength=200`);
      
      if (!response.ok) {
        throw new Error(`Quotable API error: ${response.status}`);
      }
      
      const data = await response.json();
      const quote = data[0];
      
      return {
        id: quote._id,
        text: quote.content,
        author: quote.author,
        tags: quote.tags,
        length: quote.length
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state with a default quote (fallback)
const initialState = {
  currentQuote: {
    id: 'default',
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
    tags: ['motivational'],
    length: 57
  },
  favoriteQuotes: [],
  quoteHistory: [],
  loading: false,
  error: null,
  lastUpdated: null
};

const quotesSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {
    // Action to set a specific quote
    setQuote: (state, action) => {
      if (state.currentQuote) {
        state.quoteHistory.unshift(state.currentQuote);
        if (state.quoteHistory.length > 10) {
          state.quoteHistory = state.quoteHistory.slice(0, 10);
        }
      }
      state.currentQuote = action.payload;
      state.lastUpdated = new Date().toISOString();
    },
    
    // Action to add quote to favorites
    addToFavorites: (state, action) => {
      const quote = action.payload;
      const isAlreadyFavorite = state.favoriteQuotes.some(fav => fav.id === quote.id);
      if (!isAlreadyFavorite) {
        state.favoriteQuotes.push(quote);
      }
    },
    
    // Action to remove quote from favorites
    removeFromFavorites: (state, action) => {
      const quoteId = action.payload;
      state.favoriteQuotes = state.favoriteQuotes.filter(quote => quote.id !== quoteId);
    },
    
    // Action to clear quote history
    clearHistory: (state) => {
      state.quoteHistory = [];
    },
    
    // Action to clear error
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchRandomQuote
      .addCase(fetchRandomQuote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRandomQuote.fulfilled, (state, action) => {
        state.loading = false;
        
        // Add current quote to history if it exists
        if (state.currentQuote) {
          state.quoteHistory.unshift(state.currentQuote);
          if (state.quoteHistory.length > 10) {
            state.quoteHistory = state.quoteHistory.slice(0, 10);
          }
        }
        
        state.currentQuote = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchRandomQuote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Handle fetchQuoteByTag
      .addCase(fetchQuoteByTag.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuoteByTag.fulfilled, (state, action) => {
        state.loading = false;
        
        // Add current quote to history if it exists
        if (state.currentQuote) {
          state.quoteHistory.unshift(state.currentQuote);
          if (state.quoteHistory.length > 10) {
            state.quoteHistory = state.quoteHistory.slice(0, 10);
          }
        }
        
        state.currentQuote = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchQuoteByTag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// Export actions
export const {
  setQuote,
  addToFavorites,
  removeFromFavorites,
  clearHistory,
  clearError
} = quotesSlice.actions;

// Export selectors
export const selectCurrentQuote = (state) => state.quotes.currentQuote;
export const selectFavoriteQuotes = (state) => state.quotes.favoriteQuotes;
export const selectQuoteHistory = (state) => state.quotes.quoteHistory;
export const selectQuotesLoading = (state) => state.quotes.loading;
export const selectQuotesError = (state) => state.quotes.error;
export const selectLastUpdated = (state) => state.quotes.lastUpdated;
export const selectIsQuoteFavorite = (state, quoteId) =>
  state.quotes.favoriteQuotes.some(quote => quote.id === quoteId);

// Export reducer
export default quotesSlice.reducer;
