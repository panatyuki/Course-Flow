import { Routes, Route } from 'react-router-dom';
import { Login, Register, Profile, OurCourse, Landing, Header, Footer, CourseDetail } from '../component';

function HomePage() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path='/our-course' element={<OurCourse/>} />
        <Route path="/login" element={<Login/>} />
        <Route path='/register' element={<Register />} />
        <Route path="/course-detail/:courseId" element={<CourseDetail/>} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
      <Footer />
    </>
  );
}

export default HomePage;