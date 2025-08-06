import React, { useState, useEffect } from 'react';
import './QuoteDisplay.css';

// Inspirational quotes array
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
  },
  {
    id: 16,
    text: "If you don't like the road you're walking, start paving another one!",
    author: "Dolly Parton"
  },
  {
    id: 17,
    text: "The only limit to our realization of tomorrow will be our doubts today.",
    author: "Franklin Delano Roosevelt"
  },
  {
    id: 18,
    text: "It is never too late to be what you might have been.",
    author: "George Eliot"
  },
  {
    id: 19,
    text: "You don't have to be defined or confined by your environment, by your family circumstances.",
    author: "Mariah Carey"
  },
  {
    id: 20,
    text: "Being vulnerable is a strength, not a weakness.",
    author: "Selena Gomez"
  },
  {
    id: 21,
    text: "Never bend your head. Always hold it high. Look the world straight in the eye.",
    author: "Helen Keller"
  },
  {
    id: 22,
    text: "The power of imagination makes us infinite.",
    author: "John Muir"
  },
  {
    id: 23,
    text: "If my mind can conceive it, if my heart can believe it, then I can achieve it.",
    author: "Muhammad Ali"
  },
  {
    id: 24,
    text: "The best preparation for tomorrow is doing your best today.",
    author: "H. Jackson Brown Jr."
  },
  {
    id: 25,
    text: "Start by doing what's necessary; then, do what's possible; and suddenly you are doing the impossible.",
    author: "Francis of Assisi"
  },
  {
    id: 26,
    text: "Shoot for the Moon, and if you miss, you will still be among the stars.",
    author: "Les Brown"
  },
  {
    id: 27,
    text: "If we did all the things we are capable of, we would literally astound ourselves.",
    author: "Thomas Edison"
  },
  {
    id: 28,
    text: "Don't limit yourself. You can go as far as your mind lets you.",
    author: "Mary Kay Ash"
  },
  {
    id: 29,
    text: "Life isn't about finding yourself. Life is about creating yourself.",
    author: "George Bernard Shaw"
  },
  {
    id: 30,
    text: "The best way to get started is to quit talking and begin doing.",
    author: "Walt Disney"
  },
  {
    id: 31,
    text: "We may encounter many defeats, but we must not be defeated.",
    author: "Maya Angelou"
  },
  {
    id: 32,
    text: "If you can change your mind, you can change your life.",
    author: "William James"
  },
  {
    id: 33,
    text: "Don't count the days. Make the days count.",
    author: "Muhammad Ali"
  },
  {
    id: 34,
    text: "You don't have to be great to start, but you have to start to be great.",
    author: "Zig Ziglar"
  },
  {
    id: 35,
    text: "Keep your face always toward the sunshine, and shadows will fall behind you.",
    author: "Walt Whitman"
  },
  {
    id: 36,
    text: "Everything you've ever wanted is on the other side of fear.",
    author: "George Addair"
  },
  {
    id: 37,
    text: "Doubt kills more dreams than failure ever will.",
    author: "Suzy Kassem"
  },
  {
    id: 38,
    text: "Turn your face to the Sun and the shadows fall behind you.",
    author: "Unknown"
  },
  {
    id: 39,
    text: "It is in your moments of decision that your destiny is shaped.",
    author: "Tony Robbins"
  },
  {
    id: 40,
    text: "If opportunity doesn't knock, build a door.",
    author: "Milton Berle"
  },
  {
    id: 41,
    text: "Change the world by being yourself.",
    author: "Amy Poehler"
  },
  {
    id: 42,
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius"
  },
  {
    id: 43,
    text: "If you can dream it, you can do it.",
    author: "Walt Disney"
  },
  {
    id: 44,
    text: "You just can't beat the person who never gives up.",
    author: "Babe Ruth"
  },
  {
    id: 45,
    text: "There is nothing impossible to they who will try.",
    author: "Alexander the Great"
  },
  {
    id: 46,
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain"
  },
  {
    id: 47,
    text: "Nothing is impossible. The word itself says 'I'm possible!'",
    author: "Audrey Hepburn"
  },
  {
    id: 48,
    text: "You will never win if you never begin.",
    author: "Helen Rowland"
  },
  {
    id: 49,
    text: "What you do today can improve all your tomorrows.",
    author: "Ralph Marston"
  },
  {
    id: 50,
    text: "Do what you can with all you have, wherever you are.",
    author: "Theodore Roosevelt"
  }
];

const QuoteDisplay = () => {
  const [currentQuote, setCurrentQuote] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // Function to get a random quote
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * inspirationalQuotes.length);
    return inspirationalQuotes[randomIndex];
  };

  // Initialize with a random quote
  useEffect(() => {
    const quote = getRandomQuote();
    setCurrentQuote(quote);
    
    // Trigger fade-in animation
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  // Function to change quote (for future use)
  const changeQuote = () => {
    setIsVisible(false);
    setTimeout(() => {
      const newQuote = getRandomQuote();
      setCurrentQuote(newQuote);
      setIsVisible(true);
    }, 300);
  };

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
      
      {/* Optional: Button to get a new quote */}
      <button 
        className="new-quote-btn" 
        onClick={changeQuote}
        title="Get new quote"
      >
        ✨
      </button>
    </div>
  );
};

export default QuoteDisplay;
