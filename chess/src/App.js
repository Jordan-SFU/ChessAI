import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './components/chessboard';
import Start from './components/Start';
import Test from './components/Test';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="card">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Start />} />
              <Route path="/play" element={<Menu />} />
              <Route path="/test" element={<Test />} />
            </Routes>
          </BrowserRouter>
        </div>
      </header>
      
    </div>
  );
}

export default App;
