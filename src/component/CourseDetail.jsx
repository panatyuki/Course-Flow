import classes from '../style/CourseDetail.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Accordion } from '@mantine/core';
import CourseCard from './CourseCard';
import { imageCourseDetail } from '../data/imageBackground';
import { useNavigate,useParams } from 'react-router-dom';


function CourseDetail () {
  const [courseData, setCourseData] = useState([]);
  const [randomCourse, setRandomCourse] = useState([]);
  const [course, setCourse] = useState({});

  const [desireButton, setDesireButton] = useState(false);
  const [subscribeButton, setSubscribeButton] = useState(false);
  const [desireButtonWord, setDesireButtonWord] = useState('');
  const [isDesiredCourse, setIsDesiredCourse] = useState(null);
  const [isSubscribe, setIsSubscribe] = useState(false);

  const [desiredCourseId, setDesiredCourseId] = useState([]);

  const { userId } = '56325519-5580-48f4-bd17-f2f49fd6bad5';



  // console.log(desiredCourseId);
  // console.log(course.id);
  
  
  const isCousreIdInDesiredCourse = () => {
    if (desiredCourseId.length === 0) {
      setDesireButtonWord('Get in Desire Course');
      setIsDesiredCourse(false);
    } else {
      setDesireButtonWord('Remove from Desire Course');
      setIsDesiredCourse(true);
    }
  };

  const openDesireModal = () => {
    if (isDesiredCourse) {
      setIsDesiredCourse(false);
      setDesireButtonWord('Get in Desire Course');
      deleteDesiredCourse(userId, course.id);
    } else {
      setDesireButton(true);
      document.body.style.overflow = 'hidden';
    }
  };

  const closeDesireModal = () => {
    setDesireButton(false);
    document.body.style.overflow = 'auto';
  };


  const handleYesDesired = () => {
    try {
      createDesiredCourse(userId, course.id);
      setDesireButtonWord('Remove from Desire Course');
      setIsDesiredCourse(true);
      closeDesireModal();
    } catch (error) {
      console.error(error);
    }
  };





  const openSubscribeModal = () => {
    setSubscribeButton(true);
    document.body.style.overflow = 'hidden';
  };

  const closeSubscribeModal = () => {
    setSubscribeButton(false);
    document.body.style.overflow = 'auto';
  };



  const handleYesSubscribe = () => {
    setIsSubscribe(true);
    closeSubscribeModal();
  };










  const navigate = useNavigate();
  const params = useParams();

  const getCourseData = async() => {
    const response = await axios.get(import.meta.env.VITE_API_SERVER+'/course');
    setCourseData(response.data);
    // console.log(response.data);
  };

  const getCourseDataById = async()=>{
    const response = await axios.get(import.meta.env.VITE_API_SERVER+`/course/${params.courseId}`);
    setCourse(response.data);
    // console.log(response.data);
  };








  // const getDesiredCourseByUserId = async (userId) => {
  //   // console.log(userId);
  //   try {
  //     const response = await axios.get(`${import.meta.env.VITE_API_SERVER}/user/desired-course/${userId}`);
  //     setDesiredCourseId(response.data.data);
  //     console.log(response.data.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  

  const getDesiredCourseUserIdByCourse = async (userId, courseId) => {
    // console.log(userId);
    // console.log(courseId);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_SERVER}/user/desired-course/${userId}/${courseId}`);
      setDesiredCourseId(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };




  const createDesiredCourse = async (userId, courseId) => {
    
    try {
      // console.log(userId);
      // console.log(courseId);
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

  useEffect (() => {
    getCourseData();
    getCourseDataById();
    getDesiredCourseUserIdByCourse(userId, course.id);
    isCousreIdInDesiredCourse();
  }, [course.id]);




  


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



                {desireButton && (
                  <div className={classes.modalOverlay}>
                    <div open className={classes.modalContainer}>
                      <div className={classes.headModal}>
                        <h1 className='cf-body-1'>Confirmation</h1>
                        <img src={imageCourseDetail.exit} alt='exit' onClick={closeDesireModal} style={{ cursor: 'pointer' }} />
                      </div>
      
                      <div className={classes.confirmDetail}>
                        <p className='cf-body-2' style={{ color: 'var(--gray-700, #646D89)' }}>Do you sure to Add to desired course?</p>

                        <div className={classes.confirmButton}>
                          <div className={classes.noButton} onClick={closeDesireModal}>
                            <p className='cf-body-2' style={{ fontWeight: '700' }}>No, I don't</p>
                          </div>
                          <div className={classes.yesButton} onClick={handleYesDesired}>
                            <p className='cf-body-2' style={{ fontWeight: '700' }}>Yes, Add to Desired Course</p>
                          </div>
                        </div>
 
                      </div>
                    </div>
                  </div>
                )}

                {subscribeButton && (
                  <div className={classes.modalOverlay}>
                    <div open className={classes.modalContainer}>
                      <div className={classes.headModal}>
                        <h1 className='cf-body-1'>Confirmation</h1>
                        <img src={imageCourseDetail.exit} alt='exit' onClick={closeSubscribeModal} style={{ cursor: 'pointer' }} />
                      </div>
      
                      <div className={classes.confirmDetail}>
                        <p className='cf-body-2' style={{ color: 'var(--gray-700, #646D89)' }}>Do you sure to subscribe Service Design Essentials Course?</p>

                        <div className={classes.confirmButton}>
                          <div className={classes.noButton} onClick={closeSubscribeModal}>
                            <p className='cf-body-2' style={{ fontWeight: '700' }}>No, I don't</p>
                          </div>
                          <div className={classes.yesButton} onClick={handleYesSubscribe}>
                            <p className='cf-body-2' style={{ fontWeight: '700' }}>Yes, I want to subscribe</p>
                          </div>
                        </div>
 
                      </div>
                    </div>
                  </div>
                )}




                
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

                  {!isSubscribe && (<button className={classes.buttonGetInDesireCourse} onClick={openDesireModal}>
                    <p className='cf-body-2' >{desireButtonWord}</p>
                  </button>)}

                  {!isSubscribe && (<button className={classes.buttonSubscribeThisCourse} onClick={openSubscribeModal}>
                    <p className='cf-body-2'>Subscribe This Course</p>
                  </button>)}

                  {isSubscribe && (<button className={classes.buttonSubscribeThisCourse} onClick={() => navigate('/')}>
                    <p className='cf-body-2'>Start Learning</p>
                  </button>)} 

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