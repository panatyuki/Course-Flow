import Background from './Background';
import { useForm } from '@mantine/form';
import { Box, TextInput, Button } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { DateInput } from '@mantine/dates';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import getProfileFormValidator from '../utils/profileFormValidator';
import axios from 'axios';
import classes from '../style/Profile.module.css';
import { imageProfile } from '../data/imageBackground';

function Profile() {
  const { session, supabase } = useAuth();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [submitButtonLock, toggleSubmitButtonLock] = useToggle();
  const [profileImage, setProfileImage] = useState();
  
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
    if (session) {
      form.initialize({
        name: session.user.user_metadata.name,
        dateOfBirth: new Date(session.user.user_metadata.dateOfBirth),
        educationalBackGround: session.user.user_metadata.educationalBackground,
        email: session.user.email
      });
    }
  }, [session]);    

  const handleFileChange = (event) => {
    const newProfileImage = event.target.files[0];
    setProfileImage(newProfileImage);
  };

  const handleRemoveImage = () => {
    setProfileImage();
  };

  const handleProfleUpdate = async (values) => {
    toggleSubmitButtonLock();
    try {
      const { name, dateOfBirth, educationalBackGround, email } = values;
      let res = null;
      if (email !== session.user.email) {
        res = await supabase.auth.updateUser({ email, data: { name, dateOfBirth, educationalBackGround } });
      }
      else {
        res = await supabase.auth.updateUser({
          data: { name, dateOfBirth, educationalBackGround }
        });
      }
      const { error, data } = res;
      if (error) {
        setError(error.message);
      }
      else {
        setSuccess('Profile updated successfully');
      }
     
    } catch (error) {
      console.error(error);
    }
    
    try{
      const { data, error } = await supabase
        .storage  
        .from('Profile Image')
        .upload(session.user.id+'.png' , profileImage, {
          cacheControl: '3600',
          upsert: true
        });
      console.log('data', data);
      console.log('error', error);
    } catch (error) {
      console.error(error);
    }
    toggleSubmitButtonLock();  
  };


  return (  
    <div className={classes.profilePage}>
      
      <h2 className={classes.headingText}>Profile</h2>
      <div >
        <Background />
        <form
          onSubmit={form.onSubmit((values) => handleProfleUpdate(values))} className={classes.profileContainer}
        >
          <div>
            <div>
              <label htmlFor="upload" className={classes.customFileInputLabel && profileImage ? classes.visibleInput : classes.hiddenInput}>
                <img src={imageProfile.noProfileAvatar} alt='noProfile' />
              </label>
              <input
                type="file"
                id="upload"
                className={classes.hiddenFileInput}
                onChange={handleFileChange}
              />
              
            </div>
            
            <div className={classes.profileImage && profileImage ? classes.visibleImage : classes.hiddenImage}>
            
              <img
                
                src={profileImage ? URL.createObjectURL(profileImage) : ''}
                alt={profileImage ? profileImage.name : ''}
                width='400'
                height='400'
              />
              <button
                className={classes.deleteImage}
                onClick={(e) => handleRemoveImage(e)}
              >
                    X
              </button>
            </div>
    
          </div>
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
      </div>
    </div>
  );
}

export default Profile;