import React from 'react';
import { Link } from 'react-router-dom';

function GameImage({ imageUrl }) {
  return (
    <div>
      <Link to='/game'>
        <img src={imageUrl} alt='waldoPic' />
      </Link>
    </div>
  );
}

export default GameImage;
