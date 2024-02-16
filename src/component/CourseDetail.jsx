import classes from '../style/CourseDetail.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Accordion } from '@mantine/core';
import CourseCard from './CourseCard';
import { imageCourseDetail } from '../data/imageBackground';
import { useNavigate,useParams } from 'react-router-dom';

import { Modal } from '@mantine/core';

function CourseDetail () {
  const [courseData, setCourseData] = useState([]);
  const [randomCourse, setRandomCourse] = useState([]);
  const [course, setCourse] = useState({});

  const [desiredModal, setDesiredModal] = useState(false);
  const [subscribeModal, setSubscribedModal] = useState(false);

  const [desireCourse, setDesiredCourse] = useState([]);
  const [isDesiredCourse, setIsDesiredCourse] = useState(null);
  const [desiredbuttonWord, setDesiredButtonWord] = useState('');

  const [subscribedCourse, setSubscribedCourse] = useState([]);
  const [isSubscribeCourse, setIsSubscribedCourse] = useState(null);
  const [subscribedButtonWord, setSubscribedButtonWord] = useState('');



  const [userId, setUserId] = useState('bossla');


  // console.log(desireCourse);
  
  // const checkDesiredCourse = () => {
  //   if (desireCourse.length === 0) {
  //     setDesiredButtonWord('get in desired course');
  //     setIsDesiredCourse(false);
  //   } else {
  //     setDesiredButtonWord('Remove from Desire Course');
  //     setIsDesiredCourse(true);
  //   }
  // };

  const handleDesiredButton = () => {
    if (isDesiredCourse) {
      deleteDesiredCourse(userId, params.courseId);
      setIsDesiredCourse(false);
      setDesiredButtonWord('get in desired course');
    } else {
      setDesiredModal(true);
    }
  };

  const handleSubscribedButton = () => {
    if (isSubscribeCourse) {
      navigate('/');
    } else {
      setSubscribedModal(true);
    }
  };
      


  const handleYesDesired = () => {
    createDesiredCourse(userId, params.courseId);
    setDesiredModal(false);
    setIsDesiredCourse(true);
    setDesiredButtonWord('Remove from Desire Course');
  };

  const handleYesSubscribe = () => {
    createSubscribedCourse(userId, params.courseId);
    setIsSubscribedCourse(true);
    setSubscribedButtonWord('Start Learning');
    setSubscribedModal(false);
    
  };
  


  // console.log(subscribedCourse);
  const getDesiredCourseUserIdByCourse = async(userId) => {
    try {
      // console.log(userId);
      const response = await axios.get(`${import.meta.env.VITE_API_SERVER}/user/desired-course/${userId}/${params.courseId}`);
      setDesiredCourse(response.data);
      // console.log(response);
    } catch (error) {
      console.error(error);
      setDesiredCourse([]);
    }
    
  };

  const createDesiredCourse = async (userId, courseId) => {
    try {
      console.log(userId);
      console.log(courseId);
      const response = await axios.post(import.meta.env.VITE_API_SERVER+'/user/desired-course',
        { userId, courseId }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteDesiredCourse = async (userId, courseId) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_SERVER}/user/desired-course/${userId}`,
        { data: {
          courseId
        }
        });
      return console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  const getSubscribedCourseUserIdByCourse = async (userId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_SERVER}/user/subscribed-course/${userId}/${params.courseId}`);
      setSubscribedCourse(response);
      console.log(response);
    } catch (error) {
      console.error(error);
      setSubscribedCourse([]);
    }
  };

  const createSubscribedCourse = async (userId, courseId) => {
    try {
      console.log(userId);
      console.log(courseId);
      const response = await axios.post(import.meta.env.VITE_API_SERVER+'/user/subscribed-course',
        { userId, courseId }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };






  const navigate = useNavigate();
  const params = useParams();

  const getCourseData = async() => {
    const response = await axios.get(import.meta.env.VITE_API_SERVER+'/course');
    setCourseData(response.data);
  };

  const getCourseDataById = async()=>{
    const response = await axios.get(import.meta.env.VITE_API_SERVER+`/course/${params.courseId}`);
    setCourse(response.data);
  };














  useEffect (() => {
    getCourseData();
    getCourseDataById();
    getDesiredCourseUserIdByCourse(userId);
    getSubscribedCourseUserIdByCourse(userId);
  }, [params.courseId]);

  useEffect (() => {
    if (subscribedCourse.length === 0) {
      setIsSubscribedCourse(false);
      setSubscribedButtonWord('Subscribe This Course');
    } else {
      setIsSubscribedCourse(true);
      setSubscribedButtonWord('Start Learning');
    }
  },[subscribedCourse]);
  

  useEffect (() => {
    // console.log(desireCourse);
    if (desireCourse.length === 0) {
      setDesiredButtonWord('get in desired course');
      setIsDesiredCourse(false);
    } else {
      setDesiredButtonWord('Remove from Desire Course');
      setIsDesiredCourse(true);
    }
  }, [desireCourse]);
  
  














  

  useEffect (() => {
    const randomCourseShow = getRandomCourse(courseData, 3); 
    setRandomCourse(randomCourseShow);
  }, [courseData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseDataResponse, courseResponse] = await Promise.all([
          axios.get(import.meta.env.VITE_API_SERVER + '/course'),
          axios.get(import.meta.env.VITE_API_SERVER + `/course/${params.courseId}`)
        ]);
  
        setCourseData(courseDataResponse.data);
        setCourse(courseResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [params.courseId]);


  const accordion = course.lessons?.map((lesson, idx) => {
    const unorderedSublessonList = lesson.sublessons.map((sublesson) => {
      return (
        <li key={sublesson.id}>{sublesson.title}</li>
      );
    });
    return (  
      <Accordion.Item key={idx} value={`lesson-${idx+1}`}>
        <Accordion.Control icon={<h3 style={{ color: 'var(--gray-700, #646D89)' }}>{idx+1}</h3>}>
          <h3>{lesson.title}</h3>
        </Accordion.Control>
        <Accordion.Panel>
          <ul>
            {unorderedSublessonList}
          </ul>
        </Accordion.Panel>
      </Accordion.Item>
    );
  });


  const getRandomCourse = (data, count) => {
    const courseData = [...data];
    const filteredCourseData = courseData.filter((item) => item.id !== course.id);
    
    const shuffledCourseData = filteredCourseData.sort(() => Math.random() - 0.5);
    return shuffledCourseData.slice(0, count);
  };


  const randomDataElements = randomCourse.map((item) => (
    <div key={item.id} onClick={() => {
      navigate(`/course-detail/${item.id}`);
    }}>
      <CourseCard detailCourse={item} />
    </div>
  ));

  const number = course.price;
  const options = {
    style: 'decimal', // This is the default value; it's included here for demonstration.
    minimumFractionDigits: 2, // Ensures that there are at least two digits after the decimal point.
    maximumFractionDigits: 2, // Ensures that there are no more than two digits after the decimal point.
  };
  const priceFormattedNumber =  number?.toLocaleString('en-US', options)||'0.00';
  // console.log(priceFormattedNumber); // Output: "1,234,567.89"  

  return (
    <>  
      <div className={classes.containerPage}>
        <div className={classes.containerCourseDetail}>
          <button className={classes.buttonBack} onClick={() => {
            navigate('/our-course');
            window.location.reload();
            window.scrollTo(0, 0);
          }}>
            <img src={imageCourseDetail.arrowBack} /> <p className='cf-body-2' style={{ fontWeight: '700' }}>Back</p>
          </button>
          <div className={classes.container}>
            <div className={classes.dataContainer}>
              <iframe width="800" height="460" src={course.videoTrailerUrl} allowFullScreen frameBorder="0"></iframe>
              <div>
                <h2>Course Detail</h2>
                <div className='cf-body-2'>
                  {course.detail}
                </div>
              </div>
              <div className={classes.accordion}>
                <h2>Module Samples</h2>


                <Accordion defaultValue="lesson-1" >
                  {accordion}
                </Accordion>
              </div> 
            </div>


            <div className={classes.stickyBoxContainer}>
              <div className={classes.stickyBox}>
                <div className={classes.containerTextStickyBox}>
                  <div className='cf-body-3' style={{ color: '#F47E20' }}>Course</div>
                  <h3>{course.name}</h3>
                  <span className='cf-body-2' style={{ color: '#646D89' }}>
                    {course.summary}
                  </span>
                  <h3 style={{ color: '#646D89' }}>THB {priceFormattedNumber}</h3>
                </div>  
                <div className={classes.containerButtonStickyBox}>
                  
                  {!isSubscribeCourse && (<button className={classes.buttonGetInDesireCourse} onClick={handleDesiredButton}>
                    <p className='cf-body-2'>{desiredbuttonWord}</p>
                  </button>)}

                  <button className={classes.buttonSubscribeThisCourse} onClick={handleSubscribedButton}>
                    <p className='cf-body-2'>{subscribedButtonWord}</p>
                  </button>

                  {/* <button className={classes.buttonSubscribeThisCourse} onClick={() => navigate('/')}>
                    <p className='cf-body-2'>Start Learning</p>
                  </button> */}

                  <Modal
                    opened={desiredModal}
                    onClose={() => setDesiredModal(false)}
                    title="Confirmation" 
                    transitionProps={{ transition: 'fade', duration: 600, timingFunction: 'linear' }}
                    size='430'
                    radius={20}
                    className={classes.modalDesign}
                  >
                    <span className={classes.modalDetail}>Do you sure to Add to desired course?</span>
                    <div className={classes.modalLayout}>  
                      <button className={classes.noButton} onClick={() => setDesiredModal(false)}>No, I don't</button>
                      <button className={classes.yesButton} onClick={handleYesDesired}>Yes, Add to desired course</button>
                    </div>
                  </Modal>

                  <Modal
                    opened={subscribeModal}
                    onClose={() => setSubscribedModal(false)}
                    title="Confirmation"
                    transitionProps={{ transition: 'fade', duration: 600, timingFunction: 'linear' }}
                    size='500'
                    radius={20}
                    className={classes.modalDesign}
                  >
                    <span className={classes.modalDetail}>Do you sure to subscribe Service Design Essentials Course?</span>
                    <div className={classes.modalLayout}>  
                      <button className={classes.noButton} onClick={() => setSubscribedModal(false)}>No, I don't</button>
                      <button className={classes.yesButton} onClick={handleYesSubscribe}>Yes, I want to subscribe</button>
                    </div>
                  </Modal>

                </div>
              </div>
            </div>



            
          </div>  
        </div>
      </div>
      
      <div className={classes.containerOtherInterestingCourse}>
        <h2>Other Interesting Course</h2>
        <div className={classes.containerCardOtherInterestingCourse}>
          {randomDataElements}
        </div>
      </div>
      


    </>
  );
}

export default CourseDetail;