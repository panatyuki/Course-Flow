import { Paper } from '@mantine/core';
import CourseProgress from './CourseProgress';
function CourseViewer() {
  return (
    <div>
      <Paper style={{ width: '300px', height: '500px', background: 'white' }} shadow='xs'>
        <CourseProgress totalSublessons={50} totalCompleted={15} />
      </Paper>
    </div>
  );
}
export default CourseViewer;