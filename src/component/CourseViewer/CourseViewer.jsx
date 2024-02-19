import { Paper, Accordion, NavLink, Grid, Text, Title } from '@mantine/core';
import CourseProgress from './CourseProgress';
import classes from '../../style/CourseViewer/CourseViewer.module.css';
import ProgressSymbol from '../../assets/course_progress/ProgressSymbol';
import { useEffect, useState } from 'react';
import fetchLessonsData from '../../utils/fetchLessonsData';
import fetchUserProgress from '../../utils/fetchUserProgress';
import CourseVideo from './CourseVideo';

// Misc
// Use /learn/:courseId/:sublessonId to navigate to a specific sublesson
// By default, use the latest sublesson that the user has not completed
function CourseViewer() {
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [userProgress, setUserProgress] = useState([]);
  const [lessonsData, setLessonsData] = useState({});

  const [sublessonsStatus, setSublessonsStatus] = useState({});
  const [activeSublessonIdx, setActiveSublessonIdx] = useState(null);


  useEffect(() => {
    setIsFetchingData(true);
    setLessonsData(fetchLessonsData());
    setUserProgress(fetchUserProgress().progress);
    setIsFetchingData(false);
  }, []);


  useEffect(() => {
    // create a map of course progress for populating the sidebar.
    userProgress.forEach(progress => {
      setSublessonsStatus(prevSublessonsStatus => (
        { ...prevSublessonsStatus, [progress.subLessonId]: progress.isComplete }
      ));
    });
  }, [userProgress]);

  function handleSublessonClick(index) {
    setActiveSublessonIdx(index);
  }


  const lessonsSidebar = lessonsData.lessons?.map((lesson, index) => {
    // these go inside each Accordion's panel.
    const sublessonsNavLink = lesson.sublessons.map((sublesson, index) => {
      const status = sublessonsStatus[sublesson.id] ?? 'NOT_STARTED';
      return (<NavLink 
        key={sublesson.id}
        active={sublesson.id === activeSublessonIdx}
        label={sublesson.title}
        leftSection={<ProgressSymbol status={status}/>}
        onClick={() => handleSublessonClick(sublesson.id)}
      />); 
    });
    return (
      <Accordion.Item key={lesson.id} value={lesson.title}>
        <Accordion.Control>{lesson.title}</Accordion.Control>
        <Accordion.Panel>{sublessonsNavLink}</Accordion.Panel>
      </Accordion.Item>
    );

  });

  return (
    <main className={classes.courseViewer}>
      <Grid gutter="lg">
        <Grid.Col span={4}>
          <Paper className={classes.courseViewerSidebar} shadow='lg'>
            <Text>Course</Text>
            <Title>{lessonsData.name}</Title>
            <Text>{lessonsData.summary}</Text>
            <CourseProgress totalSublessons={15} totalCompleted={3} />
            <Accordion>
              {lessonsSidebar}
            </Accordion>
          </Paper>
        </Grid.Col>
        <Grid.Col span={8}>
          <section>
            <h2 className={classes.sublessonTitle}>Never Gonna Give You Up</h2>
            <CourseVideo />
          </section>
        </Grid.Col>

      </Grid>

    </main>
  );
}
export default CourseViewer;