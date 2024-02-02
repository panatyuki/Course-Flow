import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import BackgroundLoginAndRegister from './BackgroundLogiAndRegister';
import classes from '../style/Login.module.css'; // Ensure this path is correct

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { supabase } = useAuth();

  const handleLoginClick = async () => {
    if (!email && !password) {
      setError('Please Enter your email and password');
      return;
    } else if (!email) {
      setError('Please Enter your email');
      return;
    } else if (!password) {
      setError('Please Enter your password');
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      navigate('/'); // Navigate to dashboard or home page after successful login
    }
  };

  return (
    <div className={classes.container}>
      <BackgroundLoginAndRegister />
      <div className={classes.loginBox}>
        <div className={classes.loginHead}>
          <h2>Welcome back!</h2>
        </div>
        <label className={classes.loginTopic} htmlFor='email'>Email</label>
        <input
          className={classes.loginInput}
          type='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter Email'
        />
        <label className={classes.loginTopic} htmlFor='password'>Password</label>
        <input
          className={classes.loginInput}
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Enter Password'
        />
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button className={classes.loginButton} onClick={handleLoginClick}>
          <p className='cf-body-2'>Log in</p>
        </button>
        <div className={classes.textBox}>
          <p>Don’t have an account?</p>
          <p style={{ fontWeight: '700', cursor: 'pointer', color: '#2F5FAC' }} onClick={() => {
            navigate('/register');
          }}> 
          Register
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
