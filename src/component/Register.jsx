import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { PasswordInput, TextInput, } from '@mantine/core';
import classes from '../style/Register.module.css';
import axios from 'axios';
import { DateInput } from '@mantine/dates';
import { useAuth } from '../contexts/AuthContext';
import BackgroundLoginAndRegister from './BackgroundLogiAndRegister';

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();


  const form = useForm({
    initialValues: {
      name: '',
      dateOfBirth: '',
      educationalBackground: '',
      email: '',
      password: '',
    },
    validate: {
      name: (value) => (value === '' ? 'Enter your name' : /^[a-zA-Z' -]+$/.test(value) ? null :'Cannot use other special characters or numbers'),
      dateOfBirth: (value) => {
        const currentDate = new Date();
        const sixYearsAgo = new Date(currentDate.getFullYear() - 6, currentDate.getMonth(), currentDate.getDate());
        if(value === '') {
          return 'Enter your birthday';
        } else if (value > sixYearsAgo) {
          return 'User must be more than 6 years old';
        } else {
          return null;
        }},
      educationalBackground: (value) => (value === '' ? 'Enter your education background' : null),
      email: (value) => (value === '' ? 'Enter your email' : /^\S+@\S+\.\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value === '' ? 'Enter your password' : value.length <= 12 ? 'Password must have at least 13 letters' : null),
    },
  });

  const register = async (value) => {

    try {
      const result = await axios.post(import.meta.env.VITE_API_SERVER+'/user/create', value);
      await login(value.email, value.password);
      navigate('/loading');
    }
    catch (error) {
      console.error(error);
    }

  };

  useEffect(() => {
    console.log();
  }, []);

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
              window.location.reload();
              window.scrollTo(0, 0);
            }}> Login </p>
          </div>
        </form>
        
      </div>
    </div>

  );
}

export default Register;