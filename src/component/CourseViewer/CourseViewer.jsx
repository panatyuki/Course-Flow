import { Paper, Accordion, NavLink, Grid, Text, Title, Group, Button } from '@mantine/core';
import CourseProgress from './CourseProgress';
import classes from '../../style/CourseViewer/CourseViewer.module.css';
import ProgressSymbol from '../../assets/course_progress/ProgressSymbol';
import { useEffect, useState } from 'react';
import fetchLessonsData from '../../utils/fetchLessonsData';
import fetchUserProgress from '../../utils/fetchUserProgress';
import updateVideoStatus from '../../utils/updateVideoStatus';
import CourseVideo from './CourseVideo';
import { useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import useAxiosWithAuth0 from '../../utils/interceptor';
import SublessonAssignment from './SublessonAssignment';

// Misc
// Use /learn/:courseId/:sublessonId to navigate to a specific sublesson
// By default, use the latest sublesson that the user has not completed
function CourseViewer() {
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [lessonsData, setLessonsData] = useState({});

  const [sublessonsStatus, setSublessonsStatus] = useState({});
  const [activeSublesson, setActiveSublesson] = useState(null);
  const [sublessonAssignments, setSublessonAssignments] = useState([]);
  
  const [totalSublessons, setTotalSublessons] = useState(0);
  const [completedSublessons, setCompletedSublessons] = useState(0);
  
  const { courseId } = useParams();
  const { isAuthenticated } = useAuth0();
  const { axiosInstance } = useAxiosWithAuth0();


  useEffect(() => {
    setIsFetchingData(true);
    fetchLessonsData(courseId, axiosInstance)
      .then(lessonData => {
        setLessonsData(lessonData.data);
        const sublessonsCount = lessonData.data.lessons.reduce((acc, lesson) => acc + lesson.sublessons.length, 0);
        setTotalSublessons(sublessonsCount);
        return fetchUserProgress(courseId, axiosInstance);
      })
      .then(progress => {
        // create a map of course progress for populating the sidebar.
        const sublessonStatus = {};
        progress.data.forEach(progress => {
          const sublessonId = progress.sublesson.id;
          const userAssignments = progress.sublesson.UserAssignment;
          const videoCompletion = progress.videoCompletion;

          if (userAssignments.length === 0) {
            // If there are no assignments, check video completion status
            sublessonStatus[sublessonId] = videoCompletion === 'COMPLETED' ? 'COMPLETED' : 'IN_PROGRESS';
          } else {
            // If there are assignments, check if all of them were submitted
            const allAssignmentsSubmitted = userAssignments.every(homework => homework.isSubmitted);
            sublessonStatus[sublessonId] = allAssignmentsSubmitted ? 'COMPLETED' : 'IN_PROGRESS';
          }
        });
        setSublessonsStatus(sublessonStatus);
        // agian, for tracking course progress
        const completedCount = Object.values(sublessonsStatus).reduce((acc, status) => {
          return status === 'COMPLETED' ? acc + 1 : acc;
        }, 0);
        setCompletedSublessons(completedCount);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setIsFetchingData(false);
      });
  }, [isAuthenticated]);

  // Ideally, we will add a new key value to SublessonsStatus and push the changes automatically
  // TODO: Handle changes locally to improve responsiveness.
  useEffect(() => {
    const completedCount = Object.values(sublessonsStatus).reduce((acc, status) => {
      return status === 'COMPLETED' ? acc + 1 : acc;
    }, 0);
    setCompletedSublessons(completedCount);
  }, [sublessonsStatus]);

  function handleSublessonClick(sublesson) {
    setActiveSublesson(sublesson);
  }

  function handleStartVideo() {
    updateVideoStatus(activeSublesson.id, lessonsData.enrollmentId, 'IN_PROGRESS', Number(courseId), axiosInstance)
      .then((res) => {
        const { procedure } = res.data;
        if (procedure === 'mark-inprogress') {
          setSublessonsStatus(prevSublessonsStatus => ({ ...prevSublessonsStatus, [activeSublesson.id]: 'IN_PROGRESS' }));
        }
      })
      .catch(error => console.error('Failed to start video', error));
  }
  
  function handleMarkFinished() {
    updateVideoStatus(activeSublesson.id, lessonsData.enrollmentId, 'COMPLETED', Number(courseId),  axiosInstance)
      .then((res) => {
        console.log(res);
        const { procedure, assignments } = res.data;
        if (procedure === 'render-assignments') {
          setSublessonAssignments(assignments);
          setSublessonsStatus(prevSublessonsStatus => ({ ...prevSublessonsStatus, [activeSublesson.id]: 'IN_PROGRESS' }));
        } else if (procedure === 'mark-finished') {
          setSublessonsStatus(prevSublessonsStatus => ({ ...prevSublessonsStatus, [activeSublesson.id]: 'COMPLETED' }));
        } 
      })
      .catch(error => console.error('Failed to mark video as finished', error));
  }
  


  const lessonsSidebar = lessonsData.lessons?.map((lesson, index) => {
    // these go inside each Accordion's panel.
    const sublessonsNavLink = lesson.sublessons.map((sublesson, index) => {
      const status = sublessonsStatus[sublesson.id] ?? 'NOT_STARTED';
      return (<NavLink 
        key={sublesson.id}
        active={sublesson.id === activeSublesson?.id}
        label={sublesson.title}
        leftSection={<ProgressSymbol status={status}/>}
        onClick={() => handleSublessonClick({ ...sublesson })}
      />); 
    });
    return (
      <Accordion.Item key={lesson.id} value={lesson.title}>
        <Accordion.Control>{lesson.title}</Accordion.Control>
        <Accordion.Panel>{sublessonsNavLink}</Accordion.Panel>
      </Accordion.Item>
    );

  });

  const assignmentItems = sublessonAssignments.map(sa => <SublessonAssignment key={sa.id} assignment={sa} />);

  return (
    <main className={classes.courseViewer}>
      <Grid gutter="lg">
        <Grid.Col span={4}>
          <Paper className={classes.courseViewerSidebar} shadow='lg'>
            <Text>Course</Text>
            <Title>{lessonsData.name}</Title>
            <Text>{lessonsData.summary}</Text>
            <CourseProgress totalSublessons={totalSublessons} totalCompleted={completedSublessons} />
            <Accordion>
              {lessonsSidebar}
            </Accordion>
          </Paper>
        </Grid.Col>
        <Grid.Col span={8}>
          
          <section>
            <h2 className={classes.sublessonTitle}>{activeSublesson?.title}</h2>
            <CourseVideo url={'https://example.com'}/>
            <Group>
              <Button onClick={handleStartVideo}>Start Video</Button>
              <Button onClick={handleMarkFinished}>Mark Finished</Button>
            </Group>
            {assignmentItems}
          </section>
        </Grid.Col>

      </Grid>

    </main>
  );
}
export default CourseViewer;