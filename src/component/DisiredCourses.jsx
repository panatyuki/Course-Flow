import React,{ useState, useEffect } from 'react';
import classes from '../style/OurCourse.module.css';
import Background from './Background';
import CourseCard from './CourseCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function DesiredCourses (){
  const [data,setData] = useState([]);
  

  const userId = 'auth0|65d2fa711c1cd9050291a895';

  const fetchData = async (userId)=> {
    try{
      const response = await axios(`${import.meta.env.VITE_API_SERVER}/user/desired-course/${userId}`);
      // console.log(response.data.data);
      setData(response.data.data);
    } catch(error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(()=>{
    fetchData(userId);
  },[]);
  
  const navigate = useNavigate();


  const courseCard = data.map((course,index)=>{
    console.log(course);
    return(
      <div key={index} onClick={()=>{
        navigate(`/course-detail/${data[index].id}`);
      }} >
        <CourseCard detailCourse={course.course} />
      </div>
    );
  });

  return(
    <>
      <div className={classes.disiredCourses}>
        <Background />

        <div className={classes.searchTitle}>
          <h2>Desired Courses</h2>
        </div>

        <div className={classes.containerCourseCards}>
          <div className={classes.courseCard}>
            {courseCard}
          </div>
        </div>
      
      
      </div>
    </>
  );
  
}

export default DesiredCourses;