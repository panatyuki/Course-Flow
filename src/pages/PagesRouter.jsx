import { Routes, Route } from 'react-router-dom';
import {  Register, Profile, OurCourse, Landing, Header, Footer, CourseDetail, MyCourses, DesiredCourses, Assignments } from '../component';

function PagesRouter() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path='/our-course' element={<OurCourse/>} />
        <Route path='/register' element={<Register />} />
        <Route path="/course-detail/:courseId" element={<CourseDetail/>} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/my-courses/:userId' element={<MyCourses />} />
        <Route path='/desired-courses' element={<DesiredCourses />} />
        <Route path='/assignments' element={<Assignments />} />
      </Routes>
      <Footer />
    </>
  );
}

export default PagesRouter;