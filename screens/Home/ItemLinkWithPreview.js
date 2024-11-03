// screens/Home/ItemLinkWithPreview.js
import React, { useState } from 'react';

const ItemLinkWithPreview = ({ item }) => {
  const [previewImage, setPreviewImage] = useState(null);

  const fetchPreviewImage = async () => {
    setPreviewImage(null);
    try {
      const response = await fetch(`http://localhost:5000/api/fetch-image?url=${encodeURIComponent(item.url)}`);
      const data = await response.json();
      if (data.previewImage) {
        setPreviewImage(data.previewImage);
      } else {
        setPreviewImage(null);
      }
    } catch (error) {
      console.error("Failed to fetch preview image:", error);
      setPreviewImage(null);
    }
  };

  return (
    <div
      className="item-link"
      onMouseEnter={fetchPreviewImage}
      onMouseLeave={() => setPreviewImage(null)}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <a href={item.url} target="_blank" rel="noopener noreferrer">{item.url}</a>
      {previewImage && (
        <div className="preview-image" style={{
          position: 'absolute',
          top: '100%',
          left: '0',
          background: 'white',
          border: '1px solid #ccc',
          padding: '5px',
          zIndex: 10
        }}>
          <img src={previewImage} alt="Preview" style={{ width: '100px', height: 'auto' }} />
        </div>
      )}
    </div>
  );
};

export default ItemLinkWithPreview;
