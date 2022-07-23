import React from 'react';
import Picture from './Picture';
import uniqid from 'uniqid';

function NewGame({ pictures, handlePicClick }) {
  return (
    <div className='newGamePage' onClick={handlePicClick}>
      <h1>choose a picture</h1>
      <div className='pictureContainer'>
        {pictures
          ? pictures.map((picSrc) => <Picture key={uniqid()} picSrc={picSrc} />)
          : null}
      </div>
      {/* {console.log('NewGame rendered')} */}
    </div>
  );
}

export default NewGame;
