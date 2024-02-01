import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { PasswordInput, TextInput, } from '@mantine/core';
import classes from '../style/Register.module.css';
import { imageRegisterAndLogin } from '../data/imageBackground';
import axios from 'axios';
import { DateInput } from '@mantine/dates';

function Register() {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      name: '',
      dateOfBirth: '',
      educationalBackground: '',
      email: '',
      password: '',
    },
    validate: {
      name: (value) => (value === '' ? 'Enter your name' : /^[a-zA-Z'-]+$/.test(value) ? null :'Cannot use other special characters or numbers'),
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

  const register = async(value) => {
    const result = await axios.post(import.meta.env.VITE_API_SERVER+'/user/create', value);
    console.log(result);
    navigate('/');
  };

  useEffect(() => {
    console.log();
  }, []);

  return (
    <div className={classes.containerRegisterPage}>
      <div className={classes.container}>
        <form className={classes.registerBox} onSubmit={form.onSubmit(register)}>
          <h2 style={{ color: '#ffffff' }}>Register to start learning!</h2>
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
            <p className='cf-body-2' style={{ fontWeight: '700', color: '#2F5FAC', cursor: 'pointer' }} onClick={() => { navigate('/login');}}> Login </p>
          </div>
        </form>
        <img className={classes.bigVectorPosition} src={imageRegisterAndLogin.blueRight} alt='bigVector' />
        <img className={classes.mediumEllipsePosition} src={imageRegisterAndLogin.circleGreyRL} alt='mediumEllipse' />
        <img className={classes.smallEllipsePosition} src={imageRegisterAndLogin.circleOrange} alt='smallEllipse' />
        <img className={classes.plusPosition} src={imageRegisterAndLogin.crossGreen} alt='plus' />
        <img className={classes.circlePosition} src={imageRegisterAndLogin.orangeLeft} alt='circle' />
      </div>
    </div>
  );
}

export default Register;