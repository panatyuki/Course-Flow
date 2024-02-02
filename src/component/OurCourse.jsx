import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import classes from '../style/OurCourse.module.css';
import { useDebounceCallback } from '@mantine/hooks';
import CourseCard from './CourseCard';
import Background from './Background';

const CourseInfo = () => {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  
  // function สำหรับดึงข้อมูลจาก Server
  const fetchData = async (url = '/course') => {
    try {
      let response = await axios.get(import.meta.env.VITE_API_SERVER + url);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Callback function useDebounceCallback สำหรับ delay ผลการค้นหาข้อมูลเวลาใส่ข้อมูลลง input
  // Set delay = 500
  const debouncedSearch = useDebounceCallback(async () => {
    fetchData(`/course?keywords=${searchText}`);
  }, 500);

  useEffect(() => {
    fetchData();
    console.log(data);
  }, []);

  useEffect(() => {
    debouncedSearch();
  }, [searchText]);

  // function navigate สำหรับไว้เปลี่ยนหน้า Webpage
  const navigate = useNavigate();

  // map Data การ์ดคอร์สเรียนออกมา
  const courseCard = data.map(( course, index ) => {
    return (
      <div key={index} onClick={() => {
        navigate(`/course-detail/${data[index].id}`);
        window.location.reload();
        window.scrollTo(0, 0);}} >
        <CourseCard  detailCourse={course} />
      </div>   
    );
  });

  return (
    <div className={classes.ourCourse}>
      <Background />
      <div className={classes.containerInput}>  
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
    </div> 
  );
};



export default CourseInfo;