import React, { useEffect } from 'react';
import Score from './Score';

function HighScores({ scores }) {
  useEffect(() => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
  }, []);
  return (
    <div className='highScoresPage'>
      <h1>High Scores</h1>
      <table className='highScoresTable'>
        <thead>
          <tr>
            <td>User Name</td>
            <td>Picture</td>
            <td>Time</td>
          </tr>
        </thead>
        <tbody>
          {scores
            ? scores.map((score) => (
                <Score
                  key={score.id}
                  username={score.username}
                  picture={score.picture}
                  time={score.time}
                />
              ))
            : null}
        </tbody>
      </table>
      {/* {console.log('HighScores rendered')} */}
    </div>
  );
}

export default HighScores;
