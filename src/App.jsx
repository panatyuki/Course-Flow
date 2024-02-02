import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import OurCourse from './pages/OurCourse';
import CourseDetailPage from './pages/CourseDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import LoadingPage from './component/LoadingPage';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path='/our-course' element={<OurCourse/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path="/course-detail" element={<CourseDetailPage/>} />
        <Route path="/course-detail/:courseId" element={<CourseDetailPage/>} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/loading' element={<LoadingPage/>} />
      </Routes>
    </>
  );
}

