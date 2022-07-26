import React, { useEffect } from 'react';

function CharacterPicker({
  location,
  gameCharacters,
  foundCharacters,
  handleCharacterClick,
  escapePicker,
}) {
  const pickerStyle = { left: location.x, top: location.y };
  useEffect(() => {
    document.addEventListener('keydown', escapePicker);
    return () => {
      document.removeEventListener('keydown', escapePicker);
    };
  }, []);
  return (
    <div className='characterPicker' style={pickerStyle}>
      {gameCharacters
        ? gameCharacters
            .filter((character) => {
              return !foundCharacters.includes(character);
            })
            .map((character) => (
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
