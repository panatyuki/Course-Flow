import { Button } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import useAxiosWithAuth0 from '../../utils/intercepter';


function ToggleDesiredCourse({ courseId }) {
  const { isAuthenticated } = useAuth0();
  const { axiosInstance } = useAxiosWithAuth0;
  const [isDesired, setIsDesiredCourse] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(true);

  async function remove(courseId) {
    console.log(courseId, 'removed from desired course');
  }

  async function add(courseId) {
    console.log(courseId, 'added to desired course');
  }

  useEffect(() => {
    if (isAuthenticated) {
      setIsFetchingData(true);
      axiosInstance
        .get('/user/desired-course/', { params: { courseId } })
        .then((res) => {
          setIsDesiredCourse(res.data ? true : false);
          setIsFetchingData(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    setIsFetchingData(false);
  }, [isAuthenticated]);

  if (isDesired) {
    <Button variant='secondary' onClick={remove}>Remove from Desired Course</Button>;
  }
  return (
    <Button variant='secondary' disabled={isFetchingData} onClick={add}>Add to Desired Course</Button>
  );
}
export default ToggleDesiredCourse;