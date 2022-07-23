import React, { useEffect } from 'react';
import extractFileName from '../utilities/extractFileName';

function Game({ gamePic, checkAttempt }) {
  useEffect(() => {
    const boxCursor = document.querySelector('.boxCursor');
    const innerBox = document.querySelector('.innerBox');
    const image = document.querySelector('.gameImage');

    const getImgCoords = (e) => {
      return {
        x: e.offsetX / e.target.width,
        y: e.offsetY / e.target.height,
      };
    };

    const getBoxCoords = (e) => {
      return {
        x1: (e.offsetX - 40) / e.target.width,
        y1: (e.offsetY - 40) / e.target.height,
        x2: (e.offsetX + 40) / e.target.width,
        y2: (e.offsetY + 40) / e.target.height,
      };
    };

    const createClickRecord = (e) => {
      // const brokenUrl = e.target.src.split('/');
      // const fileName = brokenUrl[brokenUrl.length - 1];
      const fileName = extractFileName(e.target.src);
      const coordinates = getBoxCoords(e);

      return {
        fileName,
        coordinates,
      };
    };

    const mouseMoveHandler = (e) => {
      boxCursor.style.left = e.clientX - boxCursor.offsetWidth / 2 + 'px';
      innerBox.style.left = e.clientX - innerBox.offsetWidth / 2 + 'px';
      boxCursor.style.top = e.clientY - boxCursor.offsetHeight / 2 + 'px';
      innerBox.style.top = e.clientY - innerBox.offsetHeight / 2 + 'px';
      boxCursor.style.opacity = 1;
    };

    const imgClickHandler = (e) => {
      // console.log(getImgCoords(e));
      const record = createClickRecord(e);
      checkAttempt(record);
      // console.log(record);
    };

    const mouseEnterImageHandler = () => {
      boxCursor.classList.remove('hidden');
      innerBox.classList.remove('hidden');
      image.addEventListener('mousemove', mouseMoveHandler);
      image.addEventListener('click', imgClickHandler);
    };

    const mouseLeaveImageHandler = () => {
      boxCursor.classList.add('hidden');
      innerBox.classList.add('hidden');
      image.removeEventListener('mousemove', mouseMoveHandler);
      image.removeEventListener('click', imgClickHandler);
    };

    image.addEventListener('mouseenter', mouseEnterImageHandler);
    image.addEventListener('mouseleave', mouseLeaveImageHandler);

    return () => {
      image.addEventListener('mousemove', mouseMoveHandler);
      image.addEventListener('click', imgClickHandler);
      image.removeEventListener('mouseenter', mouseEnterImageHandler);
      image.removeEventListener('mouseleave', mouseLeaveImageHandler);
    };
  }, []);

  return (
    <div className='gamePicture '>
      <span className='boxCursor hidden'></span>
      <span className='innerBox hidden'></span>
      <img className='gameImage' src={gamePic} alt='gamePic' />
      {/* {console.log('Game rendered')} */}
    </div>
  );
}

export default Game;
