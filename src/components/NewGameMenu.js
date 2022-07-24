import React from 'react';
import GameImage from './GameImage';
import uniqid from 'uniqid';

function NewGameMenu({ menuImageUrls, handleImageChoice }) {
  return (
    <div className='newGamePage' onClick={handleImageChoice}>
      <h1>choose a picture</h1>
      <div className='pictureContainer'>
        {menuImageUrls
          ? menuImageUrls.map((imageUrl) => (
              <GameImage key={uniqid()} imageUrl={imageUrl} />
            ))
          : null}
      </div>
      {/* {console.log('NewGame rendered')} */}
    </div>
  );
}

export default NewGameMenu;
