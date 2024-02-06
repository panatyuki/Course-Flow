import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Background from './Background';
import classes from '../style/MyCourses.module.css';
import CourseCard from './CourseCard';
import { Tabs } from '@mantine/core';

// Mock profile pic data
import nishikawaTakanori from '../images/nishikawaTakanori.jpg';

function MyCourses () {
  const [data, setData] = useState([]);
  
  const fetchData = async (url = '/course') => {
    try {
      let response = await axios.get(import.meta.env.VITE_API_SERVER + url);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();

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

          <div className={classes.tab}>
            <Tabs color="dark">
              
              <div className={classes.tabPosition}>
                <Tabs.List>
                  <Tabs.Tab value="first">All Courses</Tabs.Tab>
                  <Tabs.Tab value="second">Inprogress</Tabs.Tab>
                  <Tabs.Tab value="third">Complete</Tabs.Tab>
                </Tabs.List>
              </div>
              
              <div className={classes.containerCoursesCards}>

                <Tabs.Panel value="first">
                  <div className={classes.courseCard}>   
                    {courseCard}       
                  </div>
                </Tabs.Panel>

                <Tabs.Panel value="second"></Tabs.Panel>
                <Tabs.Panel value="third"></Tabs.Panel>

              </div>

            </Tabs>

          </div>
          
        </div>
      </div>
    </>
  );
}

export default MyCourses;