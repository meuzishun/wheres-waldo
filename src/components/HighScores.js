import React from 'react';
import Score from './Score';

function HighScores({ scores }) {
  console.log(scores);
  return (
    <div className='highScoresPage'>
      <div className='highScoresContainer'>
        {scores
          ? scores.map((score) => (
              <Score
                key={score.id}
                username={score.username}
                picture={score.picture}
                score={score.score}
              />
            ))
          : null}
      </div>
      {console.log('HighScores rendered')}
    </div>
  );
}

export default HighScores;
