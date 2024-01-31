import React from 'react';
import classes from '../style/OurCourse.module.css';
import CourseInfo from '../component/OurCourse';

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