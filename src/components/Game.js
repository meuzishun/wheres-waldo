import React, { useEffect } from 'react';

function Game({ gamePic }) {
  useEffect(() => {
    const boxCursor = document.querySelector('.boxCursor');
    const innerBox = document.querySelector('.innerBox');
    const image = document.querySelector('.gameImage');
    const mouseMoveHandler = (e) => {
      boxCursor.style.left = e.clientX - boxCursor.offsetWidth / 2 + 'px';
      innerBox.style.left = e.clientX - innerBox.offsetWidth / 2 + 'px';
      boxCursor.style.top = e.clientY - boxCursor.offsetHeight / 2 + 'px';
      innerBox.style.top = e.clientY - innerBox.offsetHeight / 2 + 'px';
      boxCursor.style.opacity = 1;
    };

    const mouseEnterImageHandle = () => {
      boxCursor.classList.remove('hidden');
      innerBox.classList.remove('hidden');
      image.addEventListener('mousemove', mouseMoveHandler);
    };

    const mouseLeaveImageHandler = () => {
      boxCursor.classList.add('hidden');
      innerBox.classList.add('hidden');
      image.removeEventListener('mousemove', mouseMoveHandler);
    };

    image.addEventListener('mouseenter', mouseEnterImageHandle);
    image.addEventListener('mouseleave', mouseLeaveImageHandler);
    return () => {
      image.removeEventListener('mouseenter', mouseEnterImageHandle);
      image.removeEventListener('mouseleave', mouseLeaveImageHandler);
    };
  }, []);

  return (
    <div className='gamePicture '>
      <span className='boxCursor hidden'></span>
      <span className='innerBox hidden'></span>
      <img className='gameImage' src={gamePic} alt='gamePic' />
      {console.log('Game rendered')}
    </div>
  );
}

export default Game;
