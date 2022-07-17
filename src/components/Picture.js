import React from 'react';
import { Link } from 'react-router-dom';

function Picture({ picSrc }) {
  return (
    <div>
      <Link to='/game'>
        <img src={picSrc} alt='waldoPic' />
      </Link>
    </div>
  );
}

export default Picture;
