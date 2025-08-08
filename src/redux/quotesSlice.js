import { createSlice } from '@reduxjs/toolkit';

// Mock inspirational quotes data
const inspirationalQuotes = [
  {
    id: 1,
    text: "Faith is love taking the form of aspiration.",
    author: "William Ellery Channing"
  },
  {
    id: 2,
    text: "You can't cross the sea merely by standing and staring at the water.",
    author: "Rabindranath Tagore"
  },
  {
    id: 3,
    text: "No bird soars too high if he soars with his own wings.",
    author: "William Blake"
  },
  {
    id: 4,
    text: "Don't judge each day by the harvest you reap but by the seeds that you plant.",
    author: "Robert Louis Stevenson"
  },
  {
    id: 5,
    text: "Think like a queen. A queen is not afraid to fail. Failure is another stepping stone to greatness.",
    author: "Oprah Winfrey"
  },
  {
    id: 6,
    text: "Don't stop when you're tired, stop when you're done.",
    author: "David Goggins"
  },
  {
    id: 7,
    text: "You define your own life. Don't let other people write your script.",
    author: "Oprah Winfrey"
  },
  {
    id: 8,
    text: "You are never too old to set another goal or to dream a new dream.",
    author: "Malala Yousafzai"
  },
  {
    id: 9,
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    id: 10,
    text: "Spread love everywhere you go.",
    author: "Mother Teresa"
  },
  {
    id: 11,
    text: "It always seems impossible until it's done.",
    author: "Nelson Mandela"
  },
  {
    id: 12,
    text: "Believe you can, and you're halfway there.",
    author: "Theodore Roosevelt"
  },
  {
    id: 13,
    text: "In a gentle way, you can shake the world.",
    author: "Mahatma Gandhi"
  },
  {
    id: 14,
    text: "Try to be a rainbow in someone else's cloud.",
    author: "Maya Angelou"
  },
  {
    id: 15,
    text: "When you have a dream, you've got to grab it and never let go.",
    author: "Carol Burnett"
  }
];

// Helper function to get random quote
const getRandomQuote = (quotes) => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

// Initial state with mock data
const initialState = {
  currentQuote: getRandomQuote(inspirationalQuotes),
  allQuotes: inspirationalQuotes,
  favoriteQuotes: [],
  quoteHistory: [],
  loading: false,
  error: null
};

const quotesSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {
    // Action to set a new random quote
    setRandomQuote: (state) => {
      const newQuote = getRandomQuote(state.allQuotes);
      // Ensure we don't get the same quote twice in a row
      if (newQuote.id === state.currentQuote?.id && state.allQuotes.length > 1) {
        return quotesSlice.caseReducers.setRandomQuote(state);
      }
      
      // Add current quote to history if it exists
      if (state.currentQuote) {
        state.quoteHistory.unshift(state.currentQuote);
        // Keep only last 10 quotes in history
        if (state.quoteHistory.length > 10) {
          state.quoteHistory = state.quoteHistory.slice(0, 10);
        }
      }
      
      state.currentQuote = newQuote;
    },
    
    // Action to set a specific quote
    setQuote: (state, action) => {
      if (state.currentQuote) {
        state.quoteHistory.unshift(state.currentQuote);
        if (state.quoteHistory.length > 10) {
          state.quoteHistory = state.quoteHistory.slice(0, 10);
        }
      }
      state.currentQuote = action.payload;
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
  setRandomQuote,
  setQuote,
  addToFavorites,
  removeFromFavorites,
  clearHistory,
  setLoading,
  setError
} = quotesSlice.actions;

// Export selectors
export const selectCurrentQuote = (state) => state.quotes.currentQuote;
export const selectAllQuotes = (state) => state.quotes.allQuotes;
export const selectFavoriteQuotes = (state) => state.quotes.favoriteQuotes;
export const selectQuoteHistory = (state) => state.quotes.quoteHistory;
export const selectQuotesLoading = (state) => state.quotes.loading;
export const selectQuotesError = (state) => state.quotes.error;
export const selectIsQuoteFavorite = (state, quoteId) =>
  state.quotes.favoriteQuotes.some(quote => quote.id === quoteId);

// Export reducer
export default quotesSlice.reducer;
