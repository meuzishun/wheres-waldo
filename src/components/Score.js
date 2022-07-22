import React from 'react';

function Score({ username, picture, score }) {
  const formatTime = (ms) => {
    return new Date(ms).toISOString().slice(11, -1);
  };

  const formatFileName = (filename) => {
    const name = filename.split('.')[0];
    return name[0].toUpperCase() + name.substring(1);
  };

  return (
    <tr className='scoreRow'>
      <td className='userName'>{username}</td>
      <td className='picture'>{formatFileName(picture)}</td>
      <td className='userScore'>{formatTime(score)}</td>
    </tr>
  );
}

export default Score;
