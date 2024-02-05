import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoadingPage from './component/LoadingPage';

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/loading' element={<LoadingPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  );
}

