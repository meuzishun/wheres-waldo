import React from 'react';
import { Link } from 'react-router-dom';

function GameImage({ imageUrl, handleImageChoice }) {
  return (
    <div>
      <Link to='/game'>
        <img src={imageUrl} alt='waldoPic' onClick={handleImageChoice} />
      </Link>
    </div>
  );
}

export default GameImage;
