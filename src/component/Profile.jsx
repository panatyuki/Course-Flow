import Background from './Background';
import { useForm } from '@mantine/form';
import { Box, TextInput, Button } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { DateInput } from '@mantine/dates';
import { useEffect, useState } from 'react';
import getProfileFormValidator from '../utils/profileFormValidator';

function Profile() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [submitButtonLock, toggleSubmitButtonLock] = useToggle();

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

  // useEffect(() => {
  //   if (session) {
  //     form.initialize({
  //       name: session.user.user_metadata.name,
  //       dateOfBirth: new Date(session.user.user_metadata.dateOfBirth),
  //       educationalBackGround: session.user.user_metadata.educationalBackground,
  //       email: session.user.email
  //     });
  //   }
  // }, [session]);


  const handleProfleUpdate = async (values) => {
    // toggleSubmitButtonLock();
    // try {
    //   const { name, dateOfBirth, educationalBackGround, email } = values;
    //   let res = null;
    //   if (email !== session.user.email) {
    //     res = await supabase.auth.updateUser({ email, data: { name, dateOfBirth, educationalBackGround } });
    //   }
    //   else {
    //     res = await supabase.auth.updateUser({
    //       data: { name, dateOfBirth, educationalBackGround }
    //     });
    //   }
    //   const { error, data } = res;
    //   if (error) {
    //     setError(error.message);
    //   }
    //   else {
    //     setSuccess('Profile updated successfully');
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
    // toggleSubmitButtonLock(); 
  };


  return (
    <div>
      <Background />
      <Box mx='auto' py="150px" maw='300px'>
        <form
          onSubmit={form.onSubmit((values) => handleProfleUpdate(values))}
        >
          <TextInput label="Name" {...form.getInputProps('name')} />
          <DateInput
            size='lg' radius="md"
            label="Date Of Birth"
            placeholder="DD/MM/YY"
            {...form.getInputProps('dateOfBirth')}  
          />  
          <TextInput label="Educational Background" {...form.getInputProps('educationalBackGround')} />
          <TextInput label="Email" {...form.getInputProps('email')} />
          <Button fullWidth type='submit' disabled={submitButtonLock}>Update Profile</Button>
          {success && <div style={{ color: 'green' }}>{success}</div>}   
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
      </Box>
    </div>
  );
}

export default Profile;