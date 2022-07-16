import './App.css';
import Header from './components/Header';
import Game from './components/Game';
import NewGame from './components/NewGame';
import HighScores from './components/HighScores';
import Footer from './components/Footer';

function App() {
  return (
    <div className='App'>
      <Header />
      {/* <Game /> */}
      <NewGame />
      {/* <HighScores /> */}
      <Footer />
    </div>
  );
}

export default App;
