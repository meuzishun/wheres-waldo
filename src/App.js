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
  const [scores, setScores] = useState([]);
  const [latestTime, setLatestTime] = useState(null);
  const [showResultModal, setShowResultModal] = useState(false);

  const handleImageChoice = (e) => {
    setGameImageUrl(e.target.src);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
    timer.start();
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
        setLatestTime(timer.getTotalTime());
        setShowResultModal(true);
      } else {
        console.log('Nope...');
      }
    });
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
            <Game gameImageUrl={gameImageUrl} checkAttempt={checkAttempt} />
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
