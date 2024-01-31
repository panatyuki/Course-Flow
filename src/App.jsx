import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import OurCourse from './pages/OurCourse';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path='/ourCourse' element={<OurCourse/>} />
      </Routes>
    </>
  );
}

