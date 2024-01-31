import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import classes from '../style/OurCourse.module.css';
import { useDebounceCallback } from '@mantine/hooks';

import blueCircle from '../images/imagesSearchOurCourses/blueCircle.svg';
import leftBlueCircle from '../images/imagesSearchOurCourses/leftBlueCircle.svg';
import cross from '../images/imagesSearchOurCourses/cross.svg';
import triangle from '../images/imagesSearchOurCourses/triangle.svg';
import rightBlueCircle from '../images/imagesSearchOurCourses/rightBlueCircle.svg';
import lessonHour from '../images/imagesSearchOurCourses/lessonHour.svg';
import lessonClock from '../images/imagesSearchOurCourses/lessonClock.svg';

const CourseInfo = () => {
  
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);

  const  debouncedGetCourse = useDebounceCallback (async () => {
    let response = await axios.get(import.meta.env.VITE_API_SERVER+`/course?keywords=${searchText}`);
    setData(response.data);
  },1000);

  const getCourse = () => {
    debouncedGetCourse();
  };

  useEffect(() => {
    getCourse();
  }, [searchText]);

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/course-detail');
  };

  return (
    <>
      <div className={classes.containerInput}>
        
        <img className={classes.setBlueCircle} src={blueCircle} alt='object' />
        <img className={classes.setLeftBlueCircle} src={leftBlueCircle} alt='object' />
        <img className={classes.setCross} src={cross} alt='object' />
        <img className={classes.setTriangle} src={triangle} alt='object' />
        <img className={classes.setRightBlueCircle} src={rightBlueCircle} alt='object' />

        <div className={classes.searchTitle}>
          <h2>Our Courses</h2>
        </div>

        <div className={classes.searchBox}>
          <input className={classes.searchInputBox}
            type='text'
            placeholder='Search...'
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
            value={searchText}
          />
        </div>
      </div>
      
      <div className={classes.containerCourseCards}>
        <div className={classes.courseCard}>
    
          {data.map((items) => {
            return(
              <div className={classes.setEachCourseCards} key={items.id} onClick={handleCardClick}>
                
                <div className={classes.setPositionImage}>
                  <img style={{ borderRadius: '8px 8px 0px 0px' }} src={items.coverImageUrl} alt={items.name} width='360' />
                </div>

                <div className={classes.courseDetail}>
                  <p className='cf-body-3' style={{ color: '#F47E20' , fontWeight: '400' }}>Course</p>
                  <h3 style={{ lineHeight:'1' }}>{items.name}</h3>
                  <p className='cf-body-2' style={{ color: '#646D89' }} >{items.summary}</p>
                </div>

                <div className={classes.footerCourseCard}>
                  <div className={classes.detailFooterCourseCard}>
                    <img src={lessonHour} alt='lessonClockLogo' />
                    <p className='cf-body-2'>{items.lesson} Lesson</p>
                  </div>
                  <div className={classes.detailFooterCourseCard}>
                    <img src={lessonClock} alt='lessonClockLogo' />
                    <p className='cf-body-2'>{items.totalLearningTime} Hour</p>
                  </div>
                </div>
                
              </div>
            );
          })}
        
        </div>
              
      </div>
    </>
  );
};

CourseInfo.propTypes = {
  description: PropTypes.string,
};

export default CourseInfo;