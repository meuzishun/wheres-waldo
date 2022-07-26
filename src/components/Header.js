import React from 'react';
import { Link } from 'react-router-dom';
import CharacterList from './CharacterList';

function Header({ gameCharacters, foundCharacters }) {
  return (
    <header>
      <h2>
        where's <span id='waldo'>waldo</span>
      </h2>
      <CharacterList
        gameCharacters={gameCharacters}
        foundCharacters={foundCharacters}
      />
      <nav>
        <ul>
          <li>
            <Link to='/'>new game</Link>
          </li>
          <li>
            <Link to='highscores'>high scores</Link>
          </li>
        </ul>
      </nav>
      {/* {console.log('Header rendered')} */}
    </header>
  );
}

export default Header;
