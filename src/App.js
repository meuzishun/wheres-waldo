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

const storage = getStorage(firebaseApp);
const waldoImages = ref(storage, 'waldo_images');
const db = getFirestore(firebaseApp);
const scoresRef = collection(db, 'scores');

function App() {
  const navigate = useNavigate();
  const [menuImagePackages, setMenuImagePackages] = useState([]);
  const [gameImagePackage, setGameImagePackage] = useState(undefined);
  const [gameCharacters, setGameCharacters] = useState([]);
  const [foundCharacters, setFoundCharacters] = useState([]);
  const [showResultModal, setShowResultModal] = useState(false);
  const [scores, setScores] = useState([]);
  const [latestTime, setLatestTime] = useState(null);

  const clearGameCharacterList = () => {
    setGameCharacters([]);
  };

  const handleImageChoice = (e) => {
    const image = e.target;
    const gameImagePackage = {
      title: image.dataset.imagetitle,
      filename: image.dataset.imagefilename,
      url: image.src,
    };
    setGameImagePackage(gameImagePackage);
    const docRef = doc(db, 'locations', gameImagePackage.filename);
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

  const checkCharacterCoords = (character, boxCoords) => {
    const docRef = doc(db, 'locations', gameImagePackage.filename);
    getDoc(docRef).then((snapshot) => {
      const data = snapshot.data();
      if (
        checkCoords(data[character], boxCoords) &&
        !foundCharacters.includes(character)
      ) {
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
      timer.stop();
      setLatestTime(timer.getTotalTime());
      setFoundCharacters([]);
      setGameCharacters([]);
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
      picture: gameImagePackage.title,
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

  useEffect(() => {
    getOrderedScores();
  }, []);

  useEffect(() => {
    checkAllCharactersFound();
  }, [foundCharacters]);

  useEffect(() => {
    listAll(waldoImages)
      .then((res) => {
        res.items.forEach((item) => {
          getDownloadURL(ref(storage, item.fullPath)).then((url) => {
            setMenuImagePackages((prev) => {
              if (prev.some((imagePackage) => imagePackage.url === url)) {
                return prev;
              }
              const imagePackage = {
                title: item.name.split('.')[0],
                filename: item.name,
                url: url,
              };
              return [...prev, imagePackage];
            });
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //!===========================================================================

  return (
    <div className='App'>
      <Header
        gameCharacters={gameCharacters}
        foundCharacters={foundCharacters}
      />
      <Routes>
        <Route
          path='/'
          element={
            <NewGameMenu
              menuImagePackages={menuImagePackages}
              handleImageChoice={handleImageChoice}
              clearGameCharacterList={clearGameCharacterList}
            />
          }
        />
        <Route
          path='/game'
          element={
            <Game
              gameImagePackage={gameImagePackage}
              gameCharacters={gameCharacters}
              foundCharacters={foundCharacters}
              checkCharacterCoords={checkCharacterCoords}
              clearGameCharacterList={clearGameCharacterList}
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
