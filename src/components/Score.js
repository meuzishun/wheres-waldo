import React from 'react';

function Score({ username, picture, score }) {
  return (
    <div className='scoreContainer'>
      <p className='userName'>{username}</p>
      <p className='picture'>{picture}</p>
      <p className='userScore'>{score}</p>
    </div>
  );
}

export default Score;
