import { useForm } from '@mantine/form';
import { PasswordInput, TextInput, } from '@mantine/core';
import classes from '../style/Register.module.css';
import { DateInput } from '@mantine/dates';
import axios from 'axios';

import BackgroundLoginAndRegister from './BackgroundLogiAndRegister';
import getProfileFormValidator from '../utils/profileFormValidator';
import { useAuth0 } from '@auth0/auth0-react';

export default function Register() {
  const { loginWithRedirect } = useAuth0();

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
      const result = await axios.post(`${import.meta.env.VITE_API_SERVER}/public/user`, value);
      if (result.status === 200) {
        loginWithRedirect({
          appState: {
            returnTo: '/',
          },
        });
      }
      console.log(result);
    }
    catch (error) {
      // handle registration error ... such as duplicated email
      console.log(error);
      if (error.response.status === 409) {
        form.setFieldError('email', 'A user with this email already exists.');
        return;
      }
      window.alert('Unexpected error, please contact us.');
    }

  };

  return (
    <div className={classes.containerRegisterPage}>
      <div className={classes.container}>
        <BackgroundLoginAndRegister />
        <form
          className={classes.registerBox}
          onSubmit={form.onSubmit(register)}
        >
          <h2 style={{ color: '#22269E' }}>Register to start learning!</h2>
          <TextInput
            size="lg"
            radius="md"
            label="Name"
            placeholder="Enter Name and Lastname"
            {...form.getInputProps('name')}
          />
          <DateInput
            size="lg"
            radius="md"
            label="Date Of Birth"
            placeholder="DD/MM/YY"
            valueFormat="DD/MM/YY"
            {...form.getInputProps('dateOfBirth')}
          />
          <TextInput
            size="lg"
            radius="md"
            label="Educational Background"
            placeholder="Enter Educational Background"
            {...form.getInputProps('educationalBackground')}
          />
          <TextInput
            size="lg"
            radius="md"
            label="Email"
            placeholder="Enter Email"
            {...form.getInputProps('email')}
          />
          <PasswordInput
            size="lg"
            radius="md"
            label="Password"
            placeholder="Enter password"
            {...form.getInputProps('password')}
          />
          <button className={classes.registerButton}>
            <p className="cf-body-2" style={{ fontWeight: '700' }}>
              Register
            </p>
          </button>
          <div className={classes.textBox}>
            <p className="cf-body-2">Already have an account?</p>
            <p
              className="cf-body-2"
              style={{ fontWeight: '700', color: '#2F5FAC', cursor: 'pointer' }}
              onClick={() =>
                loginWithRedirect({
                  appState: {
                    returnTo: '/',
                  },
                })
              }
            >
              {' '}
              Login{' '}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

