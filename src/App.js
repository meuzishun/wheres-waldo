import './App.css';
import Game from './components/Game';
import Header from './components/Header';
import NewGame from './components/NewGame';
import HighScores from './components/HighScores';

function App() {
  return (
    <div className='App'>
      <Header />
      {/* <Game /> */}
      {/* <NewGame /> */}
      <HighScores />
    </div>
  );
}

export default App;
