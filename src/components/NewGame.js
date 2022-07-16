import React from 'react';

function NewGame() {
  return (
    <div className='newGamePage'>
      <h1>choose a picture</h1>
      <div className='pictureContainer'>
        <img src='./assets/beach.jpg' />
        <img src='./assets/gobbling.jpg' />
        <img src='./assets/racing.jpg' />
        <img src='./assets/skiing.jpg' />
        <img src='./assets/space.jpg' />
        <img src='./assets/worldwide.jpg' />
      </div>
    </div>
  );
}

export default NewGame;
