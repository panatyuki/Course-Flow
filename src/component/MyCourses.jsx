import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Background from './Background';
import classes from '../style/MyCourses.module.css';
import CourseCard from './CourseCard';
import { Tabs } from '@mantine/core';
import { useAuth } from '../contexts/AuthContext';

// Mock profile pic data for show UI image frame
// Delete this section, after database about user image is done
import nishikawaTakanori from '../images/nishikawaTakanori.jpg';

function MyCourses () {
  const [data, setData] = useState([]);
  const params = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Function get all courses for each users
  const fetchData = async () => {
    try {
      let response = await axios.get(import.meta.env.VITE_API_SERVER + '/user/subscribed-course-detail/' +params.userId +'/course');
      // after all feats is done, dont't forget to delete "console.log"
      // it's just check for subscribedCourse data */
      console.log(response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [params.userId]);

  // Course card
  // map subscribedCourse for each users to CourseCard
  const courseCard = data.map((item, index) => (
    <div key={index} onClick={() => {
      navigate(`/course-detail/${item.course.id}`);
      window.location.reload();
      window.scrollTo(0, 0);
    }}>
      <CourseCard 
        detailCourse={item.course}
      />
    </div>
  ));
  
  return (
    <>
      <div className={classes.myCourses}>
        <Background />

        <div className={classes.myCoursesTitle}>
          <h2>My Courses</h2>
        </div>

        <div className={classes.containerMyCourses}>

          {/* User profile & courses progression */}
          <div className={classes.containerStickyBox}>
            <div className={classes.stickyBox}>

              <div className={classes.profilePicture}>
                <img src={nishikawaTakanori} className={classes.setProfilePicture} />
              </div>

              <div className={classes.userName}>
                <p className={classes.setUserName}>{user.user_metadata.name}</p>
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

          {/* Tab section */}
          <Tabs color="dark" defaultValue="first" >
  
            <div className={classes.tabPosition} >
              <Tabs.List> 
                <Tabs.Tab value="first">All Courses</Tabs.Tab>
                <Tabs.Tab value="second">Inprogress</Tabs.Tab>
                <Tabs.Tab value="third">Complete</Tabs.Tab>
              </Tabs.List>
            </div>
              
              
            <div className={classes.containerCoursesCards}>

              {/* All courses tab */}
              <Tabs.Panel value="first" pl='45'>
                <div className={classes.courseCard}>
                  {courseCard}       
                </div>
              </Tabs.Panel>

              {/* (mock) inprogress courses tab */}
              <Tabs.Panel value="second" pl='45'>
                <div className={classes.courseCard}>
                  {courseCard}       
                </div>
              </Tabs.Panel>

              {/* (mock) complete courses tab */}
              <Tabs.Panel value="third" pl='45'>
                <div className={classes.courseCard}> 
                  {courseCard}       
                </div>
              </Tabs.Panel>

            </div>

          </Tabs>

        </div>
      </div>
    </>
  );
}

export default MyCourses;