import React from 'react';
import Picture from './Picture';
import uniqid from 'uniqid';

function NewGame({ handlePicClick }) {
  const picSrcs = [
    './assets/beach.jpg',
    './assets/gobbling.jpg',
    './assets/racing.jpg',
    './assets/skiing.jpg',
    './assets/space.jpg',
    './assets/worldwide.jpg',
  ];
  return (
    <div className='newGamePage' onClick={handlePicClick}>
      <h1>choose a picture</h1>
      <div className='pictureContainer'>
        {picSrcs.map((picSrc) => (
          <Picture key={uniqid()} picSrc={picSrc} />
        ))}
        {/* <img src='./assets/beach.jpg' />
        <img src='./assets/gobbling.jpg' />
        <img src='./assets/racing.jpg' />
        <img src='./assets/skiing.jpg' />
        <img src='./assets/space.jpg' />
        <img src='./assets/worldwide.jpg' /> */}
      </div>
    </div>
  );
}

export default NewGame;
