import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import classes from '../style/OurCourse.module.css';
import { useDebounceCallback } from '@mantine/hooks';
import CourseCard from './courseCard';
import { imageOurCourse } from '../data/imageBackground';

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
    console.log(data.length);
  }, [searchText]);

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/course-detail/');
  };

  const courseCard = data.map(( course, index ) => {
    return (
      <div key={index} onClick={() => {handleCardClick();}} >
        <CourseCard  detailCourse={course} />
      </div>   
    );
  });

  return (
    <>
      <div className={classes.containerInput}>  
        <img className={classes.setBlueCircle} src={imageOurCourse.blueCircle} alt='object' />
        <img className={classes.setLeftBlueCircle} src={imageOurCourse.leftBlueCircle} alt='object' />
        <img className={classes.setCross} src={imageOurCourse.plus} alt='object' />
        <img className={classes.setTriangle} src={imageOurCourse.triangle} alt='object' />
        <img className={classes.setRightBlueCircle} src={imageOurCourse.rightBlueCircle} alt='object' />
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
          {courseCard}       
        </div>             
      </div>
    </>
  );
};



export default CourseInfo;