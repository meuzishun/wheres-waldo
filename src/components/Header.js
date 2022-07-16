import React from 'react';

function Header() {
  return (
    <header>
      <h2>
        where's <span id='waldo'>waldo</span>
      </h2>
      <nav>
        <ul>
          <li>new game</li>
          <li>high scores</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
