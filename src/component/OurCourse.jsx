import React from 'react';
import PropTypes from 'prop-types';
import classes from '../style/OurCourse.module.css';

import imgCourse1 from '../images/imagesSearchOurCourses/imgCourse1.png';
import imgCourse2 from '../images/imagesSearchOurCourses/imgCourse2.png';
import imgCourse3 from '../images/imagesSearchOurCourses/imgCourse3.png';

import lessonHour from '../images/imagesSearchOurCourses/lessonHour.svg';
import lessonClock from '../images/imagesSearchOurCourses/lessonClock.svg';

const CourseInfo = () => {
  const mockDataCourse = [
    { img: imgCourse1 , name: 'Service Design Essentials', description: 'Lorem ipsum dolor sit amet, conse ctetur adipiscing elit.', lesson: '6', hours: '6' },
    { img: imgCourse2 , name: 'Software Developer', description: 'Lorem ipsum dolor sit amet, conse ctetur adipiscing elit.', lesson: '6', hours: '6' },
    { img: imgCourse3 , name: 'UX/UI Design Beginner', description: 'Lorem ipsum dolor sit amet, conse ctetur adipiscing elit.', lesson: '6', hours: '6' },
    { img: imgCourse1 , name: 'Service Design Essentials', description: 'Lorem ipsum dolor sit amet, conse ctetur adipiscing elit.', lesson: '6', hours: '6' },
    { img: imgCourse2 , name: 'Software Developer', description: 'Lorem ipsum dolor sit amet, conse ctetur adipiscing elit.', lesson: '6', hours: '6' },
    { img: imgCourse3 , name: 'UX/UI Design Beginner', description: 'Lorem ipsum dolor sit amet, conse ctetur adipiscing elit.', lesson: '6', hours: '6' },
  ];
  return (
    <div className={classes.containerCourseCards}>
      <div className={classes.courseCard}>
    
        {mockDataCourse.map((items) => {
          return(
            <div className={classes.setEachCourseCards} key={items.name}>
              <div className={classes.setPositionImage}>
                <img style={{ borderRadius: '8px 8px 0px 0px' }} src={items.img} alt={items.name} />
              </div>
              <div className={classes.containerCourse}>
                <p>Course</p>
              </div>
              <div className={classes.courseTitle}>
                <h3>{items.name}</h3>
              </div>
              <div className={classes.courseDetail}>
                <p>{items.description}</p>
              </div>

              <div className={classes.lessonTime}>
                <div>
                  <img src={lessonHour} alt='lessonClockLogo' />
                  <span>{items.lesson} Lesson</span>
                </div>
                <div>
                  <img src={lessonClock} alt='lessonClockLogo' />
                  <span>{items.hours} Hour</span>
                </div>
              </div> 
            </div>
          );
        })}
        
      </div>
              
    </div>
  );
};

CourseInfo.propTypes = {
  description: PropTypes.string,
};

export default CourseInfo;