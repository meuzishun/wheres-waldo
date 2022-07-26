import React from 'react';
import { Link } from 'react-router-dom';

function GameImage({ imagePackage, handleImageChoice }) {
  return (
    <div>
      <Link to='/game'>
        <img
          src={imagePackage.url}
          data-imagetitle={imagePackage.title}
          data-imagefilename={imagePackage.filename}
          alt='waldoPic'
          onClick={handleImageChoice}
        />
      </Link>
    </div>
  );
}

export default GameImage;
