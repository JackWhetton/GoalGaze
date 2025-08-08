# GoalGaze - Motivation & Productivity App

A beautiful, full-featured productivity app built with React and Redux that helps users stay motivated with inspirational quotes, stunning backgrounds, weather updates, and personal goal tracking.

## 🚀 Live Demo
[View Live App on Netlify](your-netlify-url-here)

## ✨ Features

### 📝 Goal Management
- Add and track personal goals
- Mark goals as completed
- Delete goals you no longer need
- Persistent storage across sessions

### 💬 Inspirational Quotes
- Curated collection of 20+ motivational quotes
- Random quote generation with smart rotation
- Favorite quotes functionality
- Loading states and error handling

### 🖼️ Beautiful Backgrounds
- 6 high-quality random nature photos
- Refresh to get new random images
- Upload custom background images
- Persistent background selection

### 🌤️ Weather Widget
- London weather display (mock data)
- Clean, minimalist design
- Temperature and weather conditions

## 🛠️ Technologies Used

- **Frontend**: React 18, Redux Toolkit
- **State Management**: Redux with modern Redux Toolkit patterns
- **Styling**: CSS3 with modern features (backdrop-filter, gradients)
- **Image Service**: Lorem Picsum (free, no API key required)
- **Build Tool**: Create React App
- **Deployment**: Netlify
- **Version Control**: Git & GitHub

## 🏗️ Architecture

### State Management
- **Redux Store**: Centralized state management with Redux Toolkit
- **Slices**: Modular state slices for goals, quotes, weather, and backgrounds
- **Async Thunks**: For simulated API calls and data fetching
- **Selectors**: Optimized state selection with memoization

### Component Structure
```
src/
├── components/          # React components
│   ├── GoalInputForm.js     # Goal creation form
│   ├── GoalList.js          # Goal display and management
│   ├── QuoteDisplay.js      # Quote display with favorites
│   ├── WeatherWidget.js     # Weather information display
│   └── InspirationalImageViewer.js  # Background image selector
├── redux/              # Redux store and slices
│   ├── store.js            # Store configuration
│   ├── goalsSlice.js       # Goals state management
│   ├── quotesSlice.js      # Quotes state management
│   ├── weatherSlice.js     # Weather state management
│   └── backgroundSlice.js  # Background images state
└── App.js              # Main application component
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/goalgaze.git
   cd goalgaze
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

This creates a `build` directory with optimized production files.

## 📦 Deployment

### Deploying to Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `build/`
   - Deploy!

## 🎯 Usage

1. **Setting Goals**: Use the goal input form to add new personal goals
2. **Managing Goals**: Click checkboxes to mark goals complete, or delete unwanted goals
3. **Inspirational Quotes**: Click the ✨ button to get new motivational quotes
4. **Favorite Quotes**: Click the heart icon to save quotes you love
5. **Changing Backgrounds**: Select from available photos or upload your own
6. **Refreshing Images**: Click the 🔄 button to get new random background photos

## 🔧 Configuration

### Environment Variables
This app doesn't require any environment variables - it's designed to work out of the box!

### Customization
- **Add More Quotes**: Edit `src/redux/quotesSlice.js` to add more inspirational quotes
- **Change Weather Location**: Edit `src/redux/weatherSlice.js` to change the weather location
- **Styling**: Modify CSS files to customize the appearance

## 📱 Responsive Design

GoalGaze is fully responsive and works great on:
- 🖥️ Desktop computers
- 📱 Mobile phones  
- 📟 Tablets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- **Lorem Picsum** for providing free, high-quality random images
- **Create React App** for the excellent development environment
- **Redux Toolkit** for modern, efficient state management
- **Netlify** for seamless deployment and hosting

## 📧 Contact

Your Name - your.email@example.com
Project Link: https://github.com/your-username/goalgaze

---

Made with ❤️ using React and Redux
- Inspirational images with cycling
- Add, delete, and complete goals

## Future Work
- Dark mode
- Save goals to localStorage or a backend
- Daily quote/image scheduler

### Deployment
This application is deployed via **Netlify** and is publicly accessible at:  
👉 [https://your-netlify-url.netlify.app](https://your-netlify-url.netlify.app)