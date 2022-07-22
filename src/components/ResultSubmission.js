import React from 'react';
import formatTime from '../utilities/formatTime';

function ResultSubmission({
  score,
  handleScoreSubmission,
  cancelScoreSubmission,
}) {
  return (
    <div className='overlay'>
      <div className='modal'>
        <p>You found Waldo in {formatTime(score)}!</p>
        <p>Would you like to submit your score?</p>
        <form onSubmit={handleScoreSubmission}>
          <label htmlFor='username'>Name:</label>
          <input type='text' name='username' />
          <div className='btnContainer'>
            <button type='submit'>submit score</button>
            <button type='button' onClick={cancelScoreSubmission}>
              cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResultSubmission;
