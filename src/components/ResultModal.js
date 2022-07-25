import React, { useEffect } from 'react';
import formatTime from '../utilities/formatTime';

function ResultModal({ time, handleResultSubmission, cancelResultSubmission }) {
  //TODO: seems like this is a textbook use-case for Refs
  useEffect(() => {
    const input = document.querySelector('.usernameInput');
    input.focus();
  }, []);

  return (
    <div className='overlay'>
      <div className='modal'>
        <p>You found Waldo in {formatTime(time)}!</p>
        <p>Would you like to submit your score?</p>
        <form onSubmit={handleResultSubmission}>
          <label htmlFor='username'>Name:</label>
          <input className='usernameInput' type='text' name='username' />
          <div className='btnContainer'>
            <button className='submitBtn' type='submit'>
              submit score
            </button>
            <button
              className='cancelBtn'
              type='button'
              onClick={cancelResultSubmission}
            >
              cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResultModal;
