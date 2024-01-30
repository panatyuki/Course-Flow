import { Accordion } from '@mantine/core';

function CourseDetail() {
  const MockModuleAccordion = [
    { topicNumber: 1 , topic: 'Introduction', description: `Welcome to the Course
    Course Overview
    Getting to Know You
    What is Service Design ?
    Service Design vs. UX vs. UI vs. Design Thinking
    4 Levels of Service Design in an Organization
    Scope of Service Design
    Develop an Entirely New Service - U Drink I Drive
    Improving Existing Services - Credit Cards
    Improving Existing Services - MK
    Levels of Impact` }
  ];

  const accordion = MockModuleAccordion.map((item) => {
    <Accordion.Item key={item.topicNumber} value={item.topicNumber}>
      <Accordion.Control icon={item.topicNumber}>{item.topic}</Accordion.Control>
      <Accordion.Panel>{}</Accordion.Panel>
    </Accordion.Item>;
  });

  return (
    <>
      <div className="moduleSamplesAccordion">
        
      </div>
    </>
  );
}

export default CourseDetail;