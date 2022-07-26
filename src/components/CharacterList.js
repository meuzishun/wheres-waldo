import React from 'react';

function CharacterList({ gameCharacters, foundCharacters }) {
  return (
    <div className='characterList'>
      {gameCharacters
        ? gameCharacters
            .filter((character) => !foundCharacters.includes(character))
            .map((character) => (
              <p key={character} className='characterName'>
                {character}
              </p>
            ))
        : null}
    </div>
  );
}

export default CharacterList;
