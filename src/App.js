//* Importing Firebase (configured app and various functions)
import firebaseApp from './utilities/firebaseApp';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  query,
  orderBy,
} from 'firebase/firestore';

//* Importing React, various hooks and routing functions
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

//* Importing components and styles
import Header from './components/Header';
import Game from './components/Game';
import NewGame from './components/NewGame';
import HighScores from './components/HighScores';
import Footer from './components/Footer';
import './App.css';

//* Importing additional utilities
import uniqid from 'uniqid';
import timer from './utilities/timer';
import extractFileName from './utilities/extractFileName';
import ResultSubmission from './components/ResultSubmission';

const storage = getStorage(firebaseApp);
const db = getFirestore(firebaseApp);
const scoresRef = collection(db, 'scores');

function App() {
  //! not working
  const navigate = useNavigate();
  const [pictures, setPictures] = useState([]);
  const [gamePic, setGamePic] = useState(undefined);
  const [scores, setScores] = useState([]);
  const [latestScore, setLatestScore] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handlePicClick = (e) => {
    setGamePic(e.target.src);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
    timer.start();
  };

  const handleScoreSubmission = (e) => {
    e.preventDefault();
    console.log(e.target.username.value);
    addScore({
      id: uniqid(),
      username: e.target.username.value,
      picture: extractFileName(gamePic),
      score: latestScore,
    });
    setLatestScore(null);
    setShowResult(false);
    navigate('/highscores');
  };

  const cancelScoreSubmission = () => {
    setLatestScore(null);
    setShowResult(false);
    navigate('/');
  };

  const getOrderedScores = () => {
    const orderedScores = query(scoresRef, orderBy('score'));
    getDocs(orderedScores).then((snapshot) => {
      const scoresDocs = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setScores(scoresDocs);
    });
  };

  const addScore = (score) => {
    addDoc(scoresRef, score);
    getOrderedScores();
  };

  const checkCoords = (data, record) => {
    return (
      data.x >= record.coordinates.x1 &&
      data.x <= record.coordinates.x2 &&
      data.y >= record.coordinates.y1 &&
      data.y <= record.coordinates.y2
    );
  };

  const checkAttempt = (record) => {
    const docRef = doc(db, 'locations', record.fileName);
    getDoc(docRef).then((snapshot) => {
      const data = snapshot.data();
      if (checkCoords(data, record)) {
        timer.stop();
        setLatestScore(timer.getTotalTime());
        setShowResult(true);
      } else {
        console.log('Nope...');
      }
    });
  };

  //* This is temporarily for getting game pictures to not tap the database too much in development
  useEffect(() => {
    setPictures([
      './tempAssets/beach.jpg',
      './tempAssets/gobbling.jpg',
      './tempAssets/racing.jpg',
      './tempAssets/skiing.jpg',
      './tempAssets/space.jpg',
      './tempAssets/worldwide.jpg',
    ]);
    getOrderedScores();
  }, []);

  //! SAVE THIS CODE
  //!===========================================================================
  // useEffect(() => {
  //   const waldoPictures = ref(storage, 'waldo_images');

  //   listAll(waldoPictures)
  //     .then((res) => {
  //       res.items.forEach((item) => {
  //         getDownloadURL(ref(storage, item.fullPath)).then((url) => {
  //           setPictures((prev) => {
  //             if (!prev.includes(url)) {
  //               return [...prev, url];
  //             }
  //             return prev;
  //           });
  //         });
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  //   const scoresCollection = collection(db, 'scores');

  //   getDocs(scoresCollection).then((snapshot) => {
  //     const scoresDocs = snapshot.docs.map((doc) => {
  //       return { ...doc.data(), id: doc.id };
  //     });
  //     setScores(scoresDocs);
  //   });
  // }, []);
  //!===========================================================================

  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route
          path='/'
          element={
            <NewGame pictures={pictures} handlePicClick={handlePicClick} />
          }
        />
        <Route
          path='/game'
          element={<Game gamePic={gamePic} checkAttempt={checkAttempt} />}
        />
        <Route path='/highscores' element={<HighScores scores={scores} />} />
      </Routes>
      <Footer />
      {showResult ? (
        <ResultSubmission
          score={latestScore}
          handleScoreSubmission={handleScoreSubmission}
          cancelScoreSubmission={cancelScoreSubmission}
        />
      ) : null}
      {console.log('App rendered')}
    </div>
  );
}

export default App;
