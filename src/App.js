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
import { Routes, Route, useNavigate } from 'react-router-dom';

//* Importing components and styles
import Header from './components/Header';
import NewGameMenu from './components/NewGameMenu';
import Game from './components/Game';
import HighScores from './components/HighScores';
import ResultModal from './components/ResultModal';
import Footer from './components/Footer';
import './App.css';

//* Importing additional utilities
import uniqid from 'uniqid';
import timer from './utilities/timer';
import extractFileName from './utilities/extractFileName';

// const storage = getStorage(firebaseApp);
// const waldoImages = ref(storage, 'waldo_images');
const db = getFirestore(firebaseApp);
const scoresRef = collection(db, 'scores');

function App() {
  const navigate = useNavigate();
  const [menuImageUrls, setMenuImageUrls] = useState([]);
  const [gameImageUrl, setGameImageUrl] = useState(undefined);
  const [gameOver, setGameOver] = useState(false);
  const [gameCharacters, setGameCharacters] = useState([]);
  const [foundCharacters, setFoundCharacters] = useState([]);
  const [showResultModal, setShowResultModal] = useState(false);
  const [scores, setScores] = useState([]);
  const [latestTime, setLatestTime] = useState(null);

  const handleImageChoice = (e) => {
    const gameImageUrl = e.target.src;
    setGameImageUrl(gameImageUrl);
    const gameImageName = extractFileName(gameImageUrl);
    const docRef = doc(db, 'locations', gameImageName);
    getDoc(docRef).then((snapshot) => {
      const data = snapshot.data();
      const characters = Object.keys(data);
      setGameCharacters(characters);
    });
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
    timer.start();
  };

  const checkCoords = (data, boxCoords) => {
    return (
      data.x >= boxCoords.x1 &&
      data.x <= boxCoords.x2 &&
      data.y >= boxCoords.y1 &&
      data.y <= boxCoords.y2
    );
  };
  // const checkCoords = (data, record) => {
  //   return (
  //     data.x >= record.coordinates.x1 &&
  //     data.x <= record.coordinates.x2 &&
  //     data.y >= record.coordinates.y1 &&
  //     data.y <= record.coordinates.y2
  //   );
  // };

  const checkAttempt = (record) => {
    const docRef = doc(db, 'locations', record.fileName);
    getDoc(docRef).then((snapshot) => {
      const data = snapshot.data();
      if (checkCoords(data, record)) {
        timer.stop();
        setLatestTime(timer.getTotalTime());
        setShowResultModal(true);
      } else {
        console.log('Nope...');
      }
    });
  };

  const checkCharacterCoords = (character, boxCoords) => {
    const docRef = doc(db, 'locations', extractFileName(gameImageUrl));
    getDoc(docRef).then((snapshot) => {
      const data = snapshot.data();
      if (checkCoords(data[character], boxCoords)) {
        setFoundCharacters((prev) => [...prev, character]);
      } else {
        console.log('Nope...');
      }
    });
  };

  const checkAllCharactersFound = () => {
    if (gameCharacters.length === 0) return;
    if (
      gameCharacters.every((character) => foundCharacters.includes(character))
    ) {
      setGameOver(true);
      timer.stop();
      setLatestTime(timer.getTotalTime());
      setFoundCharacters([]);
      setShowResultModal(true);
    }
  };

  const getOrderedScores = () => {
    const orderedScores = query(scoresRef, orderBy('time'));
    getDocs(orderedScores).then((snapshot) => {
      const scoresDocs = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setScores(scoresDocs);
    });
  };

  const handleResultSubmission = (e) => {
    e.preventDefault();
    addDoc(scoresRef, {
      id: uniqid(),
      username: e.target.username.value,
      picture: extractFileName(gameImageUrl),
      time: latestTime,
    });
    setLatestTime(null);
    setShowResultModal(false);
    getOrderedScores();
    navigate('/highscores');
  };

  const cancelResultSubmission = () => {
    setLatestTime(null);
    setShowResultModal(false);
    navigate('/');
  };

  //* This is temporarily for getting game images to not tap the database too much in development
  useEffect(() => {
    setMenuImageUrls([
      './tempAssets/beach.jpg',
      './tempAssets/gobbling.jpg',
      './tempAssets/racing.jpg',
      './tempAssets/skiing.jpg',
      './tempAssets/space.jpg',
      './tempAssets/worldwide.jpg',
    ]);
    getOrderedScores();
  }, []);

  useEffect(() => {
    checkAllCharactersFound();
  }, [foundCharacters]);

  //! SAVE THIS CODE
  //!===========================================================================
  // useEffect(() => {
  //   listAll(waldoImages)
  //     .then((res) => {
  //       res.items.forEach((item) => {
  //         getDownloadURL(ref(storage, item.fullPath)).then((url) => {
  //           setMenuImageUrls((prev) => {
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
            <NewGameMenu
              menuImageUrls={menuImageUrls}
              handleImageChoice={handleImageChoice}
            />
          }
        />
        <Route
          path='/game'
          element={
            <Game
              gameImageUrl={gameImageUrl}
              gameCharacters={gameCharacters}
              checkAttempt={checkAttempt}
              checkCharacterCoords={checkCharacterCoords}
              checkAllCharactersFound={checkAllCharactersFound}
            />
          }
        />
        <Route path='/highscores' element={<HighScores scores={scores} />} />
      </Routes>
      <Footer />
      {showResultModal ? (
        <ResultModal
          time={latestTime}
          handleResultSubmission={handleResultSubmission}
          cancelResultSubmission={cancelResultSubmission}
        />
      ) : null}
      {/* {console.log('App rendered')} */}
    </div>
  );
}

export default App;
