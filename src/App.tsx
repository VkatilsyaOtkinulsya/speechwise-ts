import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AppLayout from './components/layout/MainLayout';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
