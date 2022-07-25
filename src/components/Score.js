import React from 'react';
import formatTime from '../utilities/formatTime';

function Score({ username, picture, time }) {
  const formatFileName = (filename) => {
    const name = filename.split('.')[0];
    return name[0].toUpperCase() + name.substring(1);
  };

  return (
    <tr className='scoreRow'>
      <td className='userName'>{username}</td>
      <td className='picture'>{formatFileName(picture)}</td>
      <td className='userScore'>{formatTime(time)}</td>
    </tr>
  );
}

export default Score;
