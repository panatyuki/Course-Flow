import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { PasswordInput, TextInput, } from '@mantine/core';
import classes from '../style/Register.module.css';
import { DateInput } from '@mantine/dates';
import useAxiosWithAuth0 from '../utils/interceptor';

import BackgroundLoginAndRegister from './BackgroundLogiAndRegister';
import getProfileFormValidator from '../utils/profileFormValidator';

export default function Register() {
  const navigate = useNavigate();
  const { axiosInstance } = useAxiosWithAuth0();

  const form = useForm({
    initialValues: {
      name: '',
      dateOfBirth: '',
      educationalBackground: '',
      email: '',
      password: '',
    },
    validate: getProfileFormValidator(true),
  });

  const register = async (value) => {

    try {
      const result = await axiosInstance.post('/user/create', value);
      if (result.status === 200) {
        // show modal and ask if the user wants to log in
        console.log('Response status is HTTP 200');
      }
      console.log(result);
    }
    catch (error) {
      // handle registration error ... such as duplicated email
      console.error(error);
    }

  };

  return (

    <div className={classes.containerRegisterPage}>
      <div className={classes.container}>
        <BackgroundLoginAndRegister />
        <form className={classes.registerBox} onSubmit={form.onSubmit(register)}>
          <h2 style={{ color: '#22269E' }}>Register to start learning!</h2>
          <TextInput size='lg' radius="md" label="Name" placeholder="Enter Name and Lastname" {...form.getInputProps('name')}  />
          <DateInput
            size='lg' radius="md"
            label="Date Of Birth"
            placeholder="DD/MM/YY"
            valueFormat="DD/MM/YY"
            {...form.getInputProps('dateOfBirth')}  
          />     
          <TextInput size='lg' radius="md" label="Educational Background" placeholder="Enter Educational Background" {...form.getInputProps('educationalBackground')} />
          <TextInput size='lg' radius="md" label="Email" placeholder="Enter Email" {...form.getInputProps('email')} />
          <PasswordInput size='lg' radius="md"  label="Password" placeholder="Enter password" {...form.getInputProps('password')} />
          <button className={classes.registerButton}>
            <p className='cf-body-2' style={{ fontWeight: '700' }}>Register</p>
          </button>
          <div className={classes.textBox}>
            <p className='cf-body-2'>Already have an account?</p>
            <p className='cf-body-2' style={{ fontWeight: '700', color: '#2F5FAC', cursor: 'pointer' }} onClick={() => { 
              navigate('/login');
            }}> Login </p>
          </div>
        </form>
        
      </div>
    </div>

  );
}

