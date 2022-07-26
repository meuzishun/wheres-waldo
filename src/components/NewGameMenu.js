import React, { useEffect } from 'react';
import GameImage from './GameImage';
import uniqid from 'uniqid';

function NewGameMenu({
  menuImageUrls,
  handleImageChoice,
  clearGameCharacterList,
}) {
  useEffect(() => {
    clearGameCharacterList();
  }, []);
  return (
    <div className='newGamePage'>
      <h1>choose a picture</h1>
      <div className='pictureContainer'>
        {menuImageUrls
          ? menuImageUrls.map((imageUrl) => (
              <GameImage
                key={uniqid()}
                imageUrl={imageUrl}
                handleImageChoice={handleImageChoice}
              />
            ))
          : null}
      </div>
      {/* {console.log('NewGame rendered')} */}
    </div>
  );
}

export default NewGameMenu;
