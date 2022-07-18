// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Game from './components/Game';
import NewGame from './components/NewGame';
import HighScores from './components/HighScores';
import Footer from './components/Footer';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCkDUn5Z6gvSm-r9yb4UbKNBMxfAlOyUrk',
  authDomain: 'whereswaldo-ea81f.firebaseapp.com',
  projectId: 'whereswaldo-ea81f',
  storageBucket: 'whereswaldo-ea81f.appspot.com',
  messagingSenderId: '462284750954',
  appId: '1:462284750954:web:256577b4667fcb2b190a13',
};
// Initialize Firebase
const backendApp = initializeApp(firebaseConfig);

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
