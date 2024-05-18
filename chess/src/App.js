import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chessboard from './components/chessboard';
import Start from './components/Start';

function App() {
  return (

    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/chessboard" element={<Chessboard />} />
          </Routes>
        </BrowserRouter>
      </header>
      
    </div>
  );
}


export default App;
