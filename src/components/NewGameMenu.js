import React from 'react';
import GameImage from './GameImage';
import uniqid from 'uniqid';

function NewGameMenu({ menuImagePackages, handleImageChoice }) {
  return (
    <div className='newGamePage'>
      <h1>choose a picture</h1>
      <div className='pictureContainer'>
        {menuImagePackages
          ? menuImagePackages.map((imagePackage) => (
              <GameImage
                key={uniqid()}
                imagePackage={imagePackage}
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
