import React from 'react';

function Game({ gamePic }) {
  return (
    <div className='gamePicture'>
      <img src={gamePic} alt='gamePic' />
    </div>
  );
}

export default Game;
