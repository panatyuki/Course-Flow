import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CourseDetailPage from './pages/CourseDetailPage';
import LoginPage from './pages/LoginPage';



export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/course-detail" element={<CourseDetailPage/>} />
        <Route path="/login" element={<LoginPage/>} />
      </Routes>
    </>
  );
}

