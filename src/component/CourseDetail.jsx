import classes from '../style/CourseDetail.module.css';
import arrowBack from '../images/imagesCourseDetail/arrow_back.svg';
import { useState, useEffect } from 'react';
import { Accordion } from '@mantine/core';
import imgCourse1 from '../images/imagesCourseDetail/imgCourse1.png';
import imgCourse2 from '../images/imagesCourseDetail/imgCourse2.png';
import imgCourse3 from '../images/imagesCourseDetail/imgCourse3.png';
import CourseCard from './courseCard';

function CourseDetail (){
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

  useEffect(() => {
    const indices = getRandomIndex(mockDataCourse.length, 3);
    setRandomIndices(indices);
    console.log(randomIndices);
  }, []); 

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

  const courseCard = randomIndices.map(( course, index ) => {
    return (
      <CourseCard key={index} detailCourse={mockDataCourse[course]} />
    );
  });

  return (
    <>  
      <div className={classes.containerPage}>
        <div className={classes.containerCourseDetail}>
          <button className={classes.buttonBack}>
            <img src={arrowBack} /> <p className='cf-body-2' style={{ fontWeight: '700' }}>Back</p>
          </button>
          <div className={classes.container}>
            <div className={classes.dataContainer}>
              <iframe width="800" height="460" src="https://www.youtube.com/embed/9em32dDnTck" allowFullScreen frameBorder="0"></iframe>
              <div>
                <h2>Course Detail</h2>
                <div className='cf-body-2'>
                Lorem ipsum dolor sit, amet consectetur adipisicing 
                elit. Hic explicabo inventore at sequi veniam esse 
                atque similique necessitatibus? Illo, tenetur. Iure 
                eveniet deleniti dolor eaque similique repudiandae, 
                tenetur quod fugiat sapiente neque sint in distinctio 
                molestiae hic animi at praesentium magni, laboriosam 
                illum ipsum fuga pariatur molestias atque sunt! Ipsum 
                aut fuga minima a quas ullam culpa obcaecati quaerat 
                alias fugiat quae error doloremque accusamus magni 
                aperiam autem amet, exercitationem itaque. Iusto 
                delectus, tenetur omnis adipisci placeat cum illo 
                vero inventore quasi quidem at, ex ipsa quas soluta 
                praesentium, natus quae qui asperiores dolorum sit 
                optio non. Quas excepturi, repudiandae, blanditiis 
                voluptates consectetur incidunt quos accusantium 
                consequuntur unde suscipit architecto possimus enim, 
                impedit facere necessitatibus? Provident at 
                necessitatibus nam numquam corrupti obcaecati, 
                iusto veritatis esse quae quas repellendus officiis 
                libero non velit corporis sunt porro culpa quam illo 
                voluptatibus voluptates perspiciatis explicabo neque 
                eius! Hic dolore ad totam modi vero neque, nesciunt 
                placeat voluptatum amet tempora natus. Rerum natus, ea 
                aut reprehenderit aspernatur sunt hic nulla sint ipsam 
                esse, laudantium obcaecati reiciendis repellat fuga qui 
                velit quis eaque. Deleniti id adipisci accusamus 
                asperiores veniam optio fugit corporis hic harum 
                laboriosam! Reiciendis neque vero incidunt suscipit 
                aliquid iusto corrupti ipsum pariatur.
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
                  <h3>Service Design Essentials</h3>
                  <span className='cf-body-2' style={{ color: '#646D89' }}>
                  Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Voluptatem
                  </span>
                  <h3 style={{ color: '#646D89' }}>Price (THB x,xxx.xx)</h3>
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
          {courseCard}
        </div>
      </div>
    </>
  );
}

export default CourseDetail;