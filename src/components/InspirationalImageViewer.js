import React, { useState, useEffect } from 'react';
import './InspirationalImageViewer.css';

// Default inspirational images (outside component to avoid re-creation)
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

const InspirationalImageViewer = ({ onBackgroundChange }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [customImageName, setCustomImageName] = useState('');

  // Initialize with first default image
  useEffect(() => {
    const savedImage = localStorage.getItem('selectedBackgroundImage');
    if (savedImage) {
      try {
        const parsed = JSON.parse(savedImage);
        setSelectedImage(parsed);
        if (onBackgroundChange) {
          onBackgroundChange(parsed.url);
        }
      } catch (error) {
        console.error('Error loading saved image:', error);
        // Fall back to first default image
        setSelectedImage(defaultImages[0]);
        if (onBackgroundChange) {
          onBackgroundChange(defaultImages[0].url);
        }
      }
    } else {
      // Set first default image as initial background
      setSelectedImage(defaultImages[0]);
      if (onBackgroundChange) {
        onBackgroundChange(defaultImages[0].url);
      }
    }
  }, [onBackgroundChange]);

  // Handle selecting a default image
  const selectDefaultImage = (image) => {
    setSelectedImage(image);
    localStorage.setItem('selectedBackgroundImage', JSON.stringify(image));
    if (onBackgroundChange) {
      onBackgroundChange(image.url);
    }
  };

  // Handle custom file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const customImage = {
          id: 'custom-' + Date.now(),
          url: e.target.result,
          name: customImageName || file.name.replace(/\.[^/.]+$/, "")
        };
        setSelectedImage(customImage);
        localStorage.setItem('selectedBackgroundImage', JSON.stringify(customImage));
        if (onBackgroundChange) {
          onBackgroundChange(customImage.url);
        }
      };
      reader.readAsDataURL(file);
    }
    event.target.value = ''; // Reset input
  };

  return (
    <div className="inspirational-image-viewer">
      <div className="background-selector">
        <h3>🖼️ Background</h3>
        
        {/* Current Selection Display */}
        {selectedImage && (
          <div className="current-selection">
            <div className="selected-image-preview">
              <img src={selectedImage.url} alt={selectedImage.name} />
            </div>
            <p className="selected-image-name">Current: {selectedImage.name}</p>
          </div>
        )}

        {/* Default Images */}
        <div className="default-images-section">
          <h4>Choose a Background:</h4>
          <div className="default-images">
            {defaultImages.map((image) => (
              <div 
                key={image.id}
                className={`image-option ${selectedImage?.id === image.id ? 'selected' : ''}`}
                onClick={() => selectDefaultImage(image)}
              >
                <img src={image.url} alt={image.name} />
                <span className="image-name">{image.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Image Upload */}
        <div className="custom-upload-section">
          <h4>Upload Custom:</h4>
          <div className="upload-controls">
            <input
              type="text"
              placeholder="Image name (optional)"
              value={customImageName}
              onChange={(e) => setCustomImageName(e.target.value)}
              className="image-name-input"
            />
            <label className="file-upload-button">
              📁 Choose Image
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspirationalImageViewer;
