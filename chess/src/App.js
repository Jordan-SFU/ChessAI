import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chessboard from './components/chessboard';
import Start from './components/Start';

function App() {
  return (

    <div className="App">
      <header className="App-header">
        <div className="card">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Start />} />
              <Route path="/play" element={<Chessboard />} />
            </Routes>
          </BrowserRouter>
        </div>
      </header>
      
    </div>
  );
}

export default App;
