import React from 'react';

function Game({ gamePic }) {
  return (
    <div className='gamePicture'>
      <img src={gamePic} alt='gamePic' />
      {console.log('Game rendered')}
    </div>
  );
}

export default Game;
