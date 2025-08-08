import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Local quotes database - reliable and always available
const motivationalQuotes = [
  {
    id: 'q1',
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
    tags: ['action', 'motivation'],
    length: 57
  },
  {
    id: 'q2',
    text: "Your limitation—it's only your imagination.",
    author: "Unknown",
    tags: ['motivation', 'mindset'],
    length: 44
  },
  {
    id: 'q3',
    text: "Great things never come from comfort zones.",
    author: "Unknown",
    tags: ['growth', 'courage'],
    length: 43
  },
  {
    id: 'q4',
    text: "Dream it. Wish it. Do it.",
    author: "Unknown",
    tags: ['dreams', 'action'],
    length: 25
  },
  {
    id: 'q5',
    text: "Success doesn't just find you. You have to go out and get it.",
    author: "Unknown",
    tags: ['success', 'effort'],
    length: 62
  },
  {
    id: 'q6',
    text: "The harder you work for something, the greater you'll feel when you achieve it.",
    author: "Unknown",
    tags: ['work', 'achievement'],
    length: 79
  },
  {
    id: 'q7',
    text: "Dream bigger. Do bigger.",
    author: "Unknown",
    tags: ['dreams', 'ambition'],
    length: 23
  },
  {
    id: 'q8',
    text: "Don't stop when you're tired. Stop when you're done.",
    author: "Unknown",
    tags: ['persistence', 'motivation'],
    length: 53
  },
  {
    id: 'q9',
    text: "Wake up with determination. Go to bed with satisfaction.",
    author: "Unknown",
    tags: ['determination', 'satisfaction'],
    length: 55
  },
  {
    id: 'q10',
    text: "Do something today that your future self will thank you for.",
    author: "Sean Patrick Flanery",
    tags: ['future', 'action'],
    length: 59
  },
  {
    id: 'q11',
    text: "Little things make big days.",
    author: "Unknown",
    tags: ['gratitude', 'mindfulness'],
    length: 27
  },
  {
    id: 'q12',
    text: "It's going to be hard, but hard does not mean impossible.",
    author: "Unknown",
    tags: ['perseverance', 'possibility'],
    length: 57
  },
  {
    id: 'q13',
    text: "Don't wait for opportunity. Create it.",
    author: "Unknown",
    tags: ['opportunity', 'initiative'],
    length: 37
  },
  {
    id: 'q14',
    text: "Sometimes we're tested not to show our weaknesses, but to discover our strengths.",
    author: "Unknown",
    tags: ['strength', 'testing'],
    length: 81
  },
  {
    id: 'q15',
    text: "The key to success is to focus on goals, not obstacles.",
    author: "Unknown",
    tags: ['success', 'focus'],
    length: 55
  },
  {
    id: 'q16',
    text: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde",
    tags: ['authenticity', 'self'],
    length: 44
  },
  {
    id: 'q17',
    text: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein",
    tags: ['opportunity', 'difficulty'],
    length: 45
  },
  {
    id: 'q18',
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
    tags: ['belief', 'confidence'],
    length: 41
  },
  {
    id: 'q19',
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins",
    tags: ['journey', 'beginning'],
    length: 56
  },
  {
    id: 'q20',
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    tags: ['success', 'courage'],
    length: 85
  }
];

// Simulated async thunk for fetching a random quote from our local database
export const fetchRandomQuote = createAsyncThunk(
  'quotes/fetchRandom',
  async (_, { rejectWithValue, getState }) => {
    try {
      // Simulate API delay for realistic experience
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const { quotes } = getState();
      const currentQuoteId = quotes.currentQuote?.id;
      
      // Filter out the current quote to avoid showing the same quote
      const availableQuotes = motivationalQuotes.filter(quote => quote.id !== currentQuoteId);
      
      // If all quotes have been shown, reset and use all quotes
      const quotesToChooseFrom = availableQuotes.length > 0 ? availableQuotes : motivationalQuotes;
      
      // Get random quote
      const randomIndex = Math.floor(Math.random() * quotesToChooseFrom.length);
      const selectedQuote = quotesToChooseFrom[randomIndex];
      
      return selectedQuote;
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
