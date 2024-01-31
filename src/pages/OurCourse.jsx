import React from 'react';
import classes from '../style/OurCourse.module.css';
import CourseInfo from '../component/OurCourse';

// import Ant Design มาใช้ทำแถบ Input
// ใส่ไปแค่ที่ตรงนี้ที่เดียว




function OurCourse() {
  return (
    <div>
      <div className={classes.searchTitle}>
        <h2>Our Courses</h2>
      </div>

      <div className={classes.searchBox}>
        
      </div>
      
      <CourseInfo />

    </div>
  );
}

export default OurCourse;