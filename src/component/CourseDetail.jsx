import classes from '../style/CourseDetail.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Accordion } from '@mantine/core';
import CourseCard from './courseCard';
import { imageCourseDetail } from '../data/imageBackground';
import { useNavigate,useParams } from 'react-router-dom';

function CourseDetail (){
  const [courseData, setCourseData] = useState([]);
  const [randomCourse, setRandomCourse] = useState([]);
  const [course,setCourse] = useState({});

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
    const randomCourseShow = getRandomCourse(courseData, 3); 
    setRandomCourse(randomCourseShow);
    console.log(randomCourseShow);
  }, [courseData]);
    getCourseData();
    getCourseDataById();
  },[]);

  const MockModuleAccordion = [
    { topicNumber: '01' , topic: 'Introduction', description: <ul>
      <li>Welcome to the Course</li>
      <li>Course Overview</li>
      <li>Getting to Know You</li>
      <li>What is Service Design ?</li>
      <li>Service Design vs. UX vs. UI vs. Design Thinking</li>
      <li>4 Levels of Service Design in an Organization</li>
      <li>Scope of Service Design</li>
      <li>Develop an Entirely New Service - U Drink I Drive</li>
      <li>Improving Existing Services - Credit Cards</li>
      <li>Improving Existing Services - MK</li>
      <li>Levels of Impact</li>
    </ul>
    },{ topicNumber: '02' , topic: 'Service Design Theories and Principles', description: <ul>
      <li>Welcome to the Course</li>
      <li>Course Overview</li>
      <li>Getting to Know You</li>
      <li>What is Service Design ?</li>
      <li>Service Design vs. UX vs. UI vs. Design Thinking</li>
      <li>4 Levels of Service Design in an Organization</li>
      <li>Scope of Service Design</li>
      <li>Develop an Entirely New Service - U Drink I Drive</li>
      <li>Improving Existing Services - Credit Cards</li>
      <li>Improving Existing Services - MK</li>
      <li>Levels of Impact</li>
    </ul>
    },{ topicNumber: '03' , topic: 'Understanding Users and Finding Opportunities', description: <ul>
      <li>Welcome to the Course</li>
      <li>Course Overview</li>
      <li>Getting to Know You</li>
      <li>What is Service Design ?</li>
      <li>Service Design vs. UX vs. UI vs. Design Thinking</li>
      <li>4 Levels of Service Design in an Organization</li>
      <li>Scope of Service Design</li>
      <li>Develop an Entirely New Service - U Drink I Drive</li>
      <li>Improving Existing Services - Credit Cards</li>
      <li>Improving Existing Services - MK</li>
      <li>Levels of Impact</li>
    </ul>
    },{ topicNumber: '04' , topic: 'Identifying and Validating Opportunities for Design', description: <ul>
      <li>Welcome to the Course</li>
      <li>Course Overview</li>
      <li>Getting to Know You</li>
      <li>What is Service Design ?</li>
      <li>Service Design vs. UX vs. UI vs. Design Thinking</li>
      <li>4 Levels of Service Design in an Organization</li>
      <li>Scope of Service Design</li>
      <li>Develop an Entirely New Service - U Drink I Drive</li>
      <li>Improving Existing Services - Credit Cards</li>
      <li>Improving Existing Services - MK</li>
      <li>Levels of Impact</li>
    </ul>
    },{ topicNumber: '05' , topic: 'Prototyping', description: <ul>
      <li>Welcome to the Course</li>
      <li>Course Overview</li>
      <li>Getting to Know You</li>
      <li>What is Service Design ?</li>
      <li>Service Design vs. UX vs. UI vs. Design Thinking</li>
      <li>4 Levels of Service Design in an Organization</li>
      <li>Scope of Service Design</li>
      <li>Develop an Entirely New Service - U Drink I Drive</li>
      <li>Improving Existing Services - Credit Cards</li>
      <li>Improving Existing Services - MK</li>
      <li>Levels of Impact</li>
    </ul>
    },{ topicNumber: '06' , topic: 'Course Summary', description: <ul>
      <li>Welcome to the Course</li>
      <li>Course Overview</li>
      <li>Getting to Know You</li>
      <li>What is Service Design ?</li>
      <li>Service Design vs. UX vs. UI vs. Design Thinking</li>
      <li>4 Levels of Service Design in an Organization</li>
      <li>Scope of Service Design</li>
      <li>Develop an Entirely New Service - U Drink I Drive</li>
      <li>Improving Existing Services - Credit Cards</li>
      <li>Improving Existing Services - MK</li>
      <li>Levels of Impact</li>
    </ul>
    }
  ];

  const accordion = MockModuleAccordion.map((item) => {
    return (  
      <Accordion.Item key={item.topicNumber} value={item.topicNumber}>
        <Accordion.Control icon={<h3 style={{ color: 'var(--gray-700, #646D89)' }}>{item.topicNumber}</h3>}>
          <h3>{item.topic}</h3>
        </Accordion.Control>
        <Accordion.Panel>
          <p className='cf-body-2' style={{ color: 'var(--gray-700, #646D89)' }}>{item.description}</p>
        </Accordion.Panel>
      </Accordion.Item>
    );
  });


  const getRandomCourse = (data, count) => {
    const shuffledCourseData = [...data].sort(() => Math.random() - 0.5);
    return shuffledCourseData.slice(0, count);
  };

  const randomDataElements = randomCourse.map((item) => (
    <div key={item.id} onClick={() => { navigate(`/course/${item.id}`);}}>
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
                <Accordion defaultValue="Apples" order={2} >
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
                  <button className={classes.buttonGetInDesireCourse}>
                    <p className='cf-body-2'>Get in Desire Course</p>
                  </button>
                  <button className={classes.buttonSubscribeThisCourse}>
                    <p className='cf-body-2'>Subscribe This Course</p>
                  </button>
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