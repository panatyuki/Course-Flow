import { Button } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import useAxiosWithAuth0 from '../../utils/interceptor';


function ToggleDesiredCourse({ courseId }) {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const { axiosInstance } = useAxiosWithAuth0();
  const [isDesired, setIsDesiredCourse] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(true);


  function checkAuth(callbackFn) {
    return async () => {
      if (!isAuthenticated) {
        // Not authenticated, trigger login
        await loginWithRedirect({
          appState: { returnTo: window.location.pathname }
        });
      } else {
        // User is authenticated, proceed to call the original function
        await callbackFn();
      }
    };
  }

  async function remove() {
    try {
      await axiosInstance.delete('/user/desired-course', {
        data: { courseId: courseId }
      });
      setIsDesiredCourse(false);
    } catch (error) {
      console.error(error);
    }
    
  }

  async function add() {
    try {
      await axiosInstance.post('/user/desired-course', { courseId: courseId });
      setIsDesiredCourse(true);
      console.log(courseId, 'added to desired course');
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      setIsFetchingData(true);
      axiosInstance
        .get('/user/desired-course', { params: { courseId } })
        .then((res) => {
          setIsDesiredCourse(res.data ? true : false);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsFetchingData(false);
        });
    } else {
      setIsFetchingData(false);
    }
  }, [isAuthenticated]);


  if (isFetchingData) {
    return null;
  }

  if (isDesired) {
    return <Button variant='secondary' onClick={checkAuth(remove)}>Remove from Desired Course</Button>;
  } else {
    return <Button variant='secondary' onClick={checkAuth(add)}>Add to Desired Course</Button>;
  }

}

export default ToggleDesiredCourse;