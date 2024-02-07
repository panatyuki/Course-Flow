import React,{ useState, useEffect } from 'react';
import classes from '../style/OurCourse.module.css';
import Background from './Background';
import CourseCard from './CourseCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function DesiredCourses (){
  const [data,setData] = useState([]);

  const fetchData = async ()=> {
    try{
      const response = await axios(import.meta.env.VITE_API_SERVER + '/course');
      setData(response.data);
    } catch(error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(()=>{
    fetchData();
  },[]);
  
  const navigate = useNavigate();

  const courseCard = data.map((course,index)=>{
    return(
      <div key={index} onClick={()=>{
        navigate(`/course-detail/${data[index].id}`);
      }} >
        <CourseCard detailCourse={course} />
      </div>
    );
  });

  return(
    <div>
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
  );
  
}

export default DesiredCourses;