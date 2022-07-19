import React, { useEffect } from 'react';

function Game({ gamePic }) {
  useEffect(() => {
    const boxCursor = document.querySelector('.boxCursor');
    const image = document.querySelector('.gameImage');
    const mouseMoveHandler = (e) => {
      boxCursor.style.left = e.clientX - boxCursor.offsetWidth / 2 + 'px';
      boxCursor.style.top = e.clientY - boxCursor.offsetHeight / 2 + 'px';
      boxCursor.style.opacity = 1;
    };
    image.addEventListener('mousemove', mouseMoveHandler);
    return () => image.removeEventListener('mousemove', mouseMoveHandler);
  }, []);

  return (
    <div className='gamePicture'>
      <span className='boxCursor'></span>
      <img className='gameImage' src={gamePic} alt='gamePic' />
      {console.log('Game rendered')}
    </div>
  );
}

export default Game;
