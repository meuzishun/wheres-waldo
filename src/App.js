import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Game from './components/Game';
import NewGame from './components/NewGame';
import HighScores from './components/HighScores';
import Footer from './components/Footer';

function App() {
  const [gamePic, setGamePic] = useState(undefined);

  const handlePicClick = (e) => {
    console.log(e.target);
    setGamePic(e.target.src);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
  };

  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path='/'
            element={<NewGame handlePicClick={handlePicClick} />}
          />
          <Route path='/game' element={<Game gamePic={gamePic} />} />
          <Route path='/highscores' element={<HighScores />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
