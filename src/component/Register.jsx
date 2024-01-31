import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from '@mantine/form';
import { PasswordInput, TextInput, } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import classes from '../style/Register.module.css';
import { imageRegisterAndLogin } from '../data/imageBackground';

function Register() {
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [educationBackground, setEducationBackground] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      name: '',
      dateOfBirth: '',
      educationBackground: '',
      email: '',
      password: '',
    },

    validate: {
      name: (value) => (value === '' ? 'Enter your name' : /^[a-zA-Z'-]+$/.test(value) ? setName(event.target.value) :'Cannot use other special characters or numbers'),
      dateOfBirth: (value) => (value === '' ? 'Enter your date of birth' : /^\S+@\S+$/.test(value) ? setDateOfBirth(event.target.value) : 'Name must contain only letters (lowercase or uppercase), and can include only'),
      educationBackground: (value) => (value === '' ? 'Enter your education background' : setEducationBackground(event.target.value)),
      email: (value) => (value === '' ? 'Enter your email' : /^\S+@\S+$/.test(value) ? setEmail(event.target.value) : 'Invalid email'),
      password: (value) => (value === '' ? 'Enter your password' : value.length <= 12 ? 'Password must have at least 13 letters' : setPassword(event.target.value)),
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if(name !== '' && dateOfBirth !== '' && educationBackground !== '' && email !== '' && password !== ''){
      const data = {
        name,
        dateOfBirth,
        educationBackground,
        email,
        password,
      };
    }  else {
      console.log(form.values);
    }
  };

  return (
    <div className={classes.containerRegisterPage}>
      <div className={classes.container}>
        <form className={classes.registerBox} onSubmit={form.onSubmit(handleSubmit)}>
          <h2 style={{ color: '#22269E' }}>Register to start learning!</h2>
          <TextInput size='lg' radius="md" label="Name" placeholder="Enter Name and Lastname" {...form.getInputProps('name')}  />
          <DateInput size='lg' radius="md"  label="Date Of Birth" placeholder="DD/MM/YY" {...form.getInputProps('dateOfBirth')} />
          <TextInput size='lg' radius="md" label="Educational Background" placeholder="Enter Educational Background" {...form.getInputProps('educationBackground')} />
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