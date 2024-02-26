import { useEffect, useState } from 'react';
import useAxiosWithAuth0 from '../utils/interceptor';
import GoToCourse from './buttons/GoToCourse';
import { useAuth0 } from '@auth0/auth0-react';
import { Loader, Stack } from '@mantine/core';
import ToggleDesiredCourse from './buttons/ToggleDesiredCourse';
import SubscribeCourse from './buttons/SubscribeCourse';

function CourseDetailButtonsStack({ courseId }) {
  const { axiosInstance } = useAxiosWithAuth0();
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const [isCourseSubscribed, setIsCourseSubscribed] = useState(false);
  const [isDesiredCourse, setIsDesiredCourse] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(true);

  function checkAuth(callbackFn) {
    return async () => {
      if (!isAuthenticated) {
        // Not authenticated, trigger login
        await loginWithRedirect({
          appState: { returnTo: window.location.pathname },
        });
      } else {
        // User is authenticated, proceed to call the original function
        await callbackFn();
      }
    };
  }

  async function fetchUserSubscriptionData() {
    try {
      if (isAuthenticated) {
        setIsFetchingData(true);
        const courseSubscription = await axiosInstance.get(`/user/subscribed-course/${courseId}`);
        console.log(courseSubscription);
        setIsCourseSubscribed(courseSubscription.data ? true : false);
        if (isCourseSubscribed) return;
        const courseDesired = await axiosInstance.get(`/user/desired-course/${courseId}`);
        setIsDesiredCourse(courseDesired.data ? true : false);
        setIsFetchingData(false);
      } else {
        setIsFetchingData(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUserSubscriptionData();
  }, [isAuthenticated]);

  if (isFetchingData || isLoading) {
    return <Loader color="orange" type="dots" />;
  } else if (isCourseSubscribed) {
    return <GoToCourse courseId={courseId} />;
  } else {
    return (
      <Stack>
        <ToggleDesiredCourse
          courseId={courseId}
          isDesiredCourse={isDesiredCourse}
          setIsDesiredCourse={setIsDesiredCourse}
          checkAuth={checkAuth}
        />
        <SubscribeCourse courseId={courseId} checkAuth={checkAuth} />
      </Stack>
    );
  }
}
export default CourseDetailButtonsStack;
