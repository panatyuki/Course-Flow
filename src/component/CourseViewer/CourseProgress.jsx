import { Progress, Text, Box } from '@mantine/core';
import classes from '../../style/CourseViewer/CourseProgress.module.css';
function CourseProgress({ totalSublessons, totalCompleted }) {
  const progress = (totalCompleted / totalSublessons) * 100;
  return (
    <Box>
      <Text>{progress}% Complete</Text>
      <div className={classes.courseProgressBar}>
        <div className={classes.courseProgressLine} style={{ width: `${progress}%` }}></div>
      </div>
    </Box>
  );
}
export default CourseProgress;