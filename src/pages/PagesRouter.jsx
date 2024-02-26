import { Routes, Route } from 'react-router-dom';
import {
  Register,
  Profile,
  OurCourse,
  Landing,
  Header,
  Footer,
  CourseDetail,
  MyCourses,
  DesiredCourses,
  Assignments
} from '../component';
import CourseViewer from '../component/CourseViewer/CourseViewer';
import { ProfileProvider } from '../context/ProfileContext';
import TestZone from '../utils/TestZone';



function PagesRouter() {
  return (
    <ProfileProvider>
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
        <Route path='/learn' element={<CourseViewer />} />
        <Route path='/test-zone' element={<TestZone />} />
      </Routes>
      <Footer />
    </ProfileProvider>
  );
}

export default PagesRouter;