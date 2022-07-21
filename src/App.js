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
} from 'firebase/firestore';

//* Importing React, various hooks and routing functions
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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

const storage = getStorage(firebaseApp);
const db = getFirestore(firebaseApp);

function App() {
  const [pictures, setPictures] = useState([]);
  const [gamePic, setGamePic] = useState(undefined);
  const [scores, setScores] = useState([]);

  const handlePicClick = (e) => {
    setGamePic(e.target.src);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
    timer.start();
  };

  const addScore = (score) => {
    // setScores((prev) => {
    //   return [...prev, score];
    // });

    //TODO: take score and add it to the database
    const scoresRef = collection(db, 'scores');
    addDoc(scoresRef, score);
    //TODO: update scores with response from database
    getDocs(scoresRef).then((snapshot) => {
      const scoresDocs = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setScores(scoresDocs);
    });
  };

  const checkCoords = (record) => {
    const docRef = doc(db, 'locations', record.fileName);
    getDoc(docRef).then((snapshot) => {
      const data = snapshot.data();
      if (
        data.x >= record.coordinates.x1 &&
        data.x <= record.coordinates.x2 &&
        data.y >= record.coordinates.y1 &&
        data.y <= record.coordinates.y2
      ) {
        //TODO: do something if they are and do something else if they do not...
        timer.stop();
        console.log('You found Waldo!');
        console.log(`It took you: ${timer.getTotalTime()}`);
        addScore({
          id: uniqid(),
          username: 'testuser1',
          picture: extractFileName(gamePic),
          score: timer.getTotalTime(),
        });
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
      <BrowserRouter>
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
            element={<Game gamePic={gamePic} checkCoords={checkCoords} />}
          />
          <Route path='/highscores' element={<HighScores scores={scores} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      {console.log('App rendered')}
    </div>
  );
}

export default App;
