import React from 'react';

function Score({ username, score }) {
  return (
    <div className='scoreContainer'>
      <p className='userName'>{username}</p>
      <p className='userScore'>{score}</p>
    </div>
  );
}

export default Score;
