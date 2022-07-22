import React from 'react';

function Score({ username, picture, score }) {
  return (
    <tr className='scoreRow'>
      <td className='userName'>{username}</td>
      <td className='picture'>{picture}</td>
      <td className='userScore'>{score}</td>
    </tr>
  );
}

export default Score;
