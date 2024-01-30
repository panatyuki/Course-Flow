import { useState, useEffect } from 'react';
import { Accordion } from '@mantine/core';
import classes from '../style/CourseDetail.module.css';
import imgCourse1 from '../images/imagesCourseDetail/imgCourse1.png';
import imgCourse2 from '../images/imagesCourseDetail/imgCourse2.png';
import imgCourse3 from '../images/imagesCourseDetail/imgCourse3.png';
import lessonIcon from '../images/imagesCourseDetail/lessonIcon.svg';
import hoursIcon from '../images/imagesCourseDetail/hoursIcon.svg';

function CourseDetail() {
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
  
  const mockDataCourse = [
    { img:  imgCourse1 , name: 'Service Design Essentials', description: 'Lorem ipsum dolor sit amet, conse ctetur adipiscing elit.', lesson: '6', hours: '6' },
    { img:  imgCourse2 , name: 'Software Developer', description: 'Lorem ipsum dolor sit amet, conse ctetur adipiscing elit.', lesson: '6', hours: '6' },
    { img:  imgCourse3 , name: 'UX/UI Design Beginner', description: 'Lorem ipsum dolor sit amet, conse ctetur adipiscing elit.', lesson: '6', hours: '6' },
    { img:  imgCourse1 , name: 'Service Design Essentials', description: 'Lorem ipsum dolor sit amet, conse ctetur adipiscing elit.', lesson: '6', hours: '6' },
    { img:  imgCourse2 , name: 'Software Developer', description: 'Lorem ipsum dolor sit amet, conse ctetur adipiscing elit.', lesson: '6', hours: '6' },
    { img:  imgCourse3 , name: 'UX/UI Design Beginner', description: 'Lorem ipsum dolor sit amet, conse ctetur adipiscing elit.', lesson: '6', hours: '6' },
  ];

  const getRandomIndex = (length, count) => {
    const indices = [];
    while (indices.length < count) {
      const randomIndex = Math.floor(Math.random() * length);
      if (!indices.includes(randomIndex)) {
        indices.push(randomIndex);
      }
    }
    return indices;
  };

  const [randomIndices, setRandomIndices] = useState([]);

  useEffect(() => {
    // Generate random indices only once
    const indices = getRandomIndex(mockDataCourse.length, 3);
    setRandomIndices(indices);
    console.log(randomIndices);
  }, []); // Empty dependency array means the effect runs once

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

  return (
    <>
      <div className={classes.moduleSampleAccordion}>
        <div className={classes.accordion}>
          <h2>Module Samples</h2>
          <Accordion defaultValue="Apples" order={2} >
            {accordion}
          </Accordion>
        </div> 
      </div>
      <div className={classes.containerOtherInterestingCourse}>
        <h2>Other Interesting Course</h2>
        <div className={classes.containerCardOtherInterestingCourse}>
          {randomIndices.map((index) => (
            <div key={index} className={classes.courseCard}>
              <img src={mockDataCourse[index].img} alt={mockDataCourse[index].name} className={classes.imgCourseCard} />
              <div className={classes.textCourseCard}>
                <p className='cf-body-3' style={{ color: '#F47E20' , fontWeight: '400' }}>Course</p>
                <h3 style={{ lineHeight: '0' }}>{mockDataCourse[index].name}</h3>
                <p className='cf-body-2' style={{ color: '#646D89' }} >{mockDataCourse[index].description}</p>
              </div>   
              <div className={classes.footerCourseCard}> 
                <div className={classes.detailFooterCourseCard}>
                  <img src={lessonIcon} alt='lessonIcon' />
                  <span className='cf-body-2'>{mockDataCourse[index].lesson} Lesson</span>
                </div>
                <div className={classes.detailFooterCourseCard}>
                  <img src={hoursIcon} alt='hoursIcon' />
                  <span className='cf-body-2'>{mockDataCourse[index].hours} Hours</span>
                </div>
              </div>   
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CourseDetail;