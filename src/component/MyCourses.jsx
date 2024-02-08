import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Background from './Background';
import classes from '../style/MyCourses.module.css';
import CourseCard from './CourseCard';
import { Tabs } from '@mantine/core';

// Mock profile pic data
import nishikawaTakanori from '../images/nishikawaTakanori.jpg';

function MyCourses () {
  const [data, setData] = useState([]);
  const params = useParams();

  const userId = 'panat1';
  
  const fetchData = async () => {
    try {
      let response = await axios.get(import.meta.env.VITE_API_SERVER + '/user/subscribed-course-detail/' +params.userId +'/course');
      console.log(response.data.data[0].subscribedCourse);
      setData(response.data.data[0].subscribedCourse);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();

  const courseCard = data.map(( courses, index ) => {
    return (
      <div key={index} onClick={() => {
        navigate(`/course-detail/${data[index].id}`);
        window.location.reload();
        window.scrollTo(0, 0);}} >
        <CourseCard 
          detailCourse={courses.course}
        />
      </div>
    );
  });

  return (
    <>
      <div className={classes.myCourses}>
        <Background />

        <div className={classes.myCoursesTitle}>
          <h2>My Courses</h2>
        </div>

        <div className={classes.containerMyCourses}>

          <div className={classes.containerStickyBox}>
            <div className={classes.stickyBox}>

              <div className={classes.profilePicture}>
                <img src={nishikawaTakanori} className={classes.setProfilePicture} />
              </div>

              <div className={classes.userName}>
                <p className={classes.setUserName}>Nishikawa Takanori</p>
              </div>

              <div className={classes.status}>
                <div className={classes.smallBox}>
                  <span style={{ color:'#646D89' }}>Course Inprogress</span>
                  <span>12</span>
                </div>
                <div className={classes.smallBox}>
                  <span style={{ color:'#646D89' }}>Course Complete</span>
                  <span>12</span>
                </div>
              </div>

            </div>
          </div>

          <Tabs color="dark" defaultValue="first" >
  
            <div className={classes.tabPosition} >
              <Tabs.List> 
                <Tabs.Tab value="first">All Courses</Tabs.Tab>
                <Tabs.Tab value="second">Inprogress</Tabs.Tab>
                <Tabs.Tab value="third">Complete</Tabs.Tab>
              </Tabs.List>
            </div>
              
            <div className={classes.containerCoursesCards}>

              <Tabs.Panel value="first" pl='45'>
                <div className={classes.courseCard}>   
                  {courseCard}       
                </div>
              </Tabs.Panel>

              <Tabs.Panel value="second" pl='45'></Tabs.Panel>
              <Tabs.Panel value="third" pl='45'></Tabs.Panel>

            </div>

          </Tabs>

 
          
        </div>
      </div>
    </>
  );
}

export default MyCourses;