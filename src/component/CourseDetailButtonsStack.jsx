import { useEffect, useState } from 'react';
import useAxiosWithAuth0 from '../utils/intercepter';
import GoToCourse from './buttons/GoToCourse';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { Loader } from '@mantine/core';
import ToggleDesiredCourse from './buttons/ToggleDesiredCourse';
import SubscribeCourse from './buttons/SubscribeCourse';



function CourseDetailButtonsStack({ courseId }) {
  const { axiosInstance } = useAxiosWithAuth0();
  const { isAuthenticated, isLoading } = useAuth0();
  const [isCourseSubscribed, setIsCourseSubscribed] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      setIsFetchingData(true);
      const courseSubscription = axiosInstance.get('/user/subscribed-course/', { params: { courseId } });
      setIsCourseSubscribed(courseSubscription.data ? true : false);
      setIsFetchingData(false);
    }
  },
  [isAuthenticated]);

  if (isFetchingData || isLoading) {
    return <Loader color="orange" type="dots" />;
  }
  else if (isCourseSubscribed) {
    return <GoToCourse courseId={courseId} />;
  }
  else {
    return (
      <>
        {withAuthenticationRequired(<ToggleDesiredCourse courseId={courseId} />)}
        {withAuthenticationRequired(<SubscribeCourse courseId={courseId} />)}
      </>
    );
  }
  
}
export default CourseDetailButtonsStack;