import React from 'react';
import classes from '../style/OurCourse.module.css';
import CourseInfo from '../component/OurCourse';

// import Ant Design มาใช้ทำแถบ Input
import { Input } from 'antd';

import magnifyingGlass from '../images/imagesSearchOurCourses/magnifyingGlass.svg';

function OurCourse() {
  return (
    <div>
      <div className={classes.searchTitle}>
        <h2>Our Courses</h2>
      </div>

      <div className={classes.searchBox}>
        <Input className={classes.searchInputBox} placeholder='Search...' prefix={<img src={magnifyingGlass} alt="Magnifying Glass" />} />
      </div>
      
      <CourseInfo />

    </div>
  );
}

export default OurCourse;