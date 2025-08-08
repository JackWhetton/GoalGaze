import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectCurrentQuote, 
  setRandomQuote, 
  addToFavorites, 
  removeFromFavorites,
  selectFavoriteQuotes 
} from '../redux/quotesSlice';
import './QuoteDisplay.css';

const QuoteDisplay = () => {
  const dispatch = useDispatch();
  const currentQuote = useSelector(selectCurrentQuote);
  const favoriteQuotes = useSelector(selectFavoriteQuotes);

  const [isVisible, setIsVisible] = useState(false);

  // Initialize with the current quote from Redux
  useEffect(() => {
    // Trigger fade-in animation
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  // Function to change quote using Redux
  const changeQuote = () => {
    setIsVisible(false);
    setTimeout(() => {
      dispatch(setRandomQuote());
      setIsVisible(true);
    }, 300);
  };

  // Function to toggle favorite status
  const toggleFavorite = () => {
    if (favoriteQuotes.some(quote => quote.id === currentQuote.id)) {
      dispatch(removeFromFavorites(currentQuote.id));
    } else {
      dispatch(addToFavorites(currentQuote));
    }
  };

  const isFavorite = favoriteQuotes.some(quote => quote.id === currentQuote.id);

  if (!currentQuote) return null;

  return (
    <div className={`quote-display ${isVisible ? 'visible' : ''}`}>
      <div className="quote-content">
        <blockquote className="quote-text">
          "{currentQuote.text}"
        </blockquote>
        <cite className="quote-author">
          — {currentQuote.author}
        </cite>
      </div>
      
      <div className="quote-actions">
        {/* Button to get a new quote */}
        <button 
          className="new-quote-btn" 
          onClick={changeQuote}
          title="Get new quote"
        >
          ✨
        </button>
        
        {/* Button to favorite/unfavorite */}
        <button 
          className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
          onClick={toggleFavorite}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  );
};

export default QuoteDisplay;
