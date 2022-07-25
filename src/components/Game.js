import React, { useEffect, useState } from 'react';
import CharacterPicker from './CharacterPicker';

function Game({ gameImageUrl, gameCharacters, checkCharacterCoords }) {
  const [showCharacterPicker, setShowCharacterPicker] = useState(false);
  const [characterPickerLocation, setCharacterPickerLocation] = useState(null);
  const [boxCoords, setBoxCoords] = useState(null);

  const getPagePosition = (e) => {
    return {
      x: e.offsetX,
      y: e.offsetY,
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

  const handleCharacterClick = (e) => {
    const character = e.target.dataset.character;
    checkCharacterCoords(character, boxCoords);
    setShowCharacterPicker(false);
    setCharacterPickerLocation(null);
  };

  const escapePicker = (e) => {
    //TODO: another place to use ref
    if (e.keyCode === 27) {
      setShowCharacterPicker(false);
      setCharacterPickerLocation(null);
      const boxCursor = document.querySelector('.boxCursor');
      const innerBox = document.querySelector('.innerBox');
      boxCursor.classList.add('hidden');
      innerBox.classList.add('hidden');
    }
  };

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

    const imgClickHandler = (e) => {
      setBoxCoords(getBoxCoords(e));
      setCharacterPickerLocation(getPagePosition(e));
      setShowCharacterPicker(true);
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
      image.removeEventListener('mousemove', mouseMoveHandler);
      image.removeEventListener('click', imgClickHandler);
      image.removeEventListener('mouseenter', mouseEnterImageHandler);
      image.removeEventListener('mouseleave', mouseLeaveImageHandler);
    };
  }, []);

  return (
    <div className='gamePicture '>
      <span className='boxCursor hidden'></span>
      <span className='innerBox hidden'></span>
      <img className='gameImage' src={gameImageUrl} alt='gamePic' />
      {showCharacterPicker ? (
        <CharacterPicker
          gameCharacters={gameCharacters}
          location={characterPickerLocation}
          handleCharacterClick={handleCharacterClick}
          escapePicker={escapePicker}
        />
      ) : null}
      {/* {console.log('Game rendered')} */}
    </div>
  );
}

export default Game;
