import Background from './Background';
import { useForm } from '@mantine/form';
import { TextInput, Button } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { DateInput } from '@mantine/dates';
import { useEffect, useState } from 'react';
import getProfileFormValidator from '../utils/profileFormValidator';
import axios from 'axios';
import classes from '../style/Profile.module.css';
import useAxiosWithAuth0 from '../utils/interceptor';
import { useAuth0 } from '@auth0/auth0-react';
import { imageProfile } from '../data/imageBackground';
import ProfilePhotoUploader from './buttons/ProfilePhotoUploader';

function Profile() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [submitButtonLock, toggleSubmitButtonLock] = useToggle();
  const [profileImage, setProfileImage] = useState();
  const { isAuthenticated } = useAuth0();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const { axiosInstance } = useAxiosWithAuth0();
  
  const form = useForm({
    initialValues: {
      name: '',
      dateOfBirth: '',
      educationalBackground: '',
      email: ''
    },
    enhanceGetInputProps: (payload) => {
      if (!payload.form.initialized) {
        return { disabled: true };
      }

      return {};
    },
    validate: getProfileFormValidator()
  }); 

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated) {
        const { data: user } = await axiosInstance.get('/user/profile');
        form.initialize({
          name: user.name,
          dateOfBirth: new Date(user.dateOfBirth),
          educationalBackGround: user.educationalBackground,
          email: user.email
        });
        // avatarUrl is null if the user hasn't uploaded a profile picture.
        setAvatarUrl(user.avatarUrl || null); 
      }
    };
    fetchData();
  }, [isAuthenticated]);




  const handleProfleUpdate = async (values) => {
    toggleSubmitButtonLock();
    try {
      const { name, dateOfBirth, educationalBackGround: educationalBackground, email } = values;
      const response = await axiosInstance.put('/user/profile', {
        name,
        dateOfBirth,
        educationalBackground,
        email
      });

      console.log(response);
      setSuccess('Profile updated successfully');

    } catch (error) {
      // Don't forget to handle duplicated email error.
      setError(error.message);
      console.error(error);
    }
    finally {
      toggleSubmitButtonLock();
    }
     
  };


  return (  
    <div className={classes.profilePage}>
      
      <h2 className={classes.headingText}>Profile</h2>
      <div >
        <Background />
        <main className={classes.profileContainer}>
          <ProfilePhotoUploader />
          <form
            onSubmit={form.onSubmit((values) => handleProfleUpdate(values))} 
          >
            <div className={classes.updateBox}>
              <TextInput size='lg' radius="md" label="Name" {...form.getInputProps('name')} />
              <DateInput
                size='lg' radius="md"
                label="Date Of Birth"
                placeholder="DD/MM/YY"
                {...form.getInputProps('dateOfBirth')}
              />
              <TextInput size='lg' radius="md" label="Educational Background" {...form.getInputProps('educationalBackGround')} />
              <TextInput size='lg' radius="md" label="Email" {...form.getInputProps('email')} />
              <Button size='lg' fullWidth type='submit' disabled={submitButtonLock}>Update Profile</Button>
              {success && <div style={{ color: 'green' }}>{success}</div>}
              {error && <div style={{ color: 'red' }}>{error}</div>}
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default Profile;