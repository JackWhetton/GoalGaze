import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectCurrentBackground, 
  selectAvailableImages, 
  setBackgroundImage, 
  addCustomImage 
} from '../redux/backgroundSlice';
import './InspirationalImageViewer.css';

const InspirationalImageViewer = () => {
  const dispatch = useDispatch();
  const currentBackground = useSelector(selectCurrentBackground);
  const availableImages = useSelector(selectAvailableImages);
  const [customImageName, setCustomImageName] = useState('');

  // Handle selecting an image
  const handleSelectImage = (image) => {
    dispatch(setBackgroundImage(image));
  };

  // Handle custom file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const customImage = {
          url: e.target.result,
          name: customImageName || file.name.replace(/\.[^/.]+$/, ""),
          source: 'custom'
        };
        dispatch(addCustomImage(customImage));
        dispatch(setBackgroundImage(customImage));
        setCustomImageName(''); // Reset the name input
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
        {currentBackground && (
          <div className="current-selection">
            <div className="selected-image-preview">
              <img src={currentBackground.url} alt={currentBackground.name} />
            </div>
            <p className="selected-image-name">Current: {currentBackground.name}</p>
          </div>
        )}

        {/* Available Images */}
        <div className="default-images-section">
          <h4>Choose a Background:</h4>
          <div className="default-images">
            {availableImages.map((image) => (
              <div 
                key={image.id}
                className={`image-option ${currentBackground?.id === image.id ? 'selected' : ''}`}
                onClick={() => handleSelectImage(image)}
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
