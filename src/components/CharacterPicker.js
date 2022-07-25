import React from 'react';

function CharacterPicker({ location, gameCharacters, handleCharacterClick }) {
  const pickerStyle = { left: location.x, top: location.y };
  return (
    <div className='characterPicker' style={pickerStyle}>
      {/* <p data-character='waldo' onClick={handleCharacterClick}>
        Waldo
      </p>
      <p data-character='odlaw' onClick={handleCharacterClick}>
        Odlaw
      </p>
      <p data-character='wizard' onClick={handleCharacterClick}>
        Wizard
      </p> */}
      {gameCharacters
        ? gameCharacters.map((character) => (
            <p
              key={character}
              data-character={character}
              onClick={handleCharacterClick}
            >
              {character}
            </p>
          ))
        : null}
    </div>
  );
}

export default CharacterPicker;
