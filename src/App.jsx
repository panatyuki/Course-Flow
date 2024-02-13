import './App.css';
import { Routes, Route } from 'react-router-dom';
import PagesRouter from './pages/PagesRouter';
import Callback from './pages/Callback';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<PagesRouter />} />
        <Route path='/callback' element={<Callback />} />
      </Routes>
    </>
  );
}

