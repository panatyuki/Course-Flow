import classes from '../style/Login.module.css';
import blueRight from '../images/imagesLogin/blueRight.svg';
import circleGrey from '../images/imagesLogin/circleGrey.svg';
import circleOrange from '../images/imagesLogin/circleOrange.svg';
import crossGreen from '../images/imagesLogin/crossGreen.svg';
import orangeLeft from '../images/imagesLogin/orangeLeft.svg';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { supabase, session } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email && !password) {
      setError('Please Enter your email and password');
    } else if (!email) {
      setError('Please Enter your email');
    } else if (!password) {
      setError ('Please Enter your password');
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (session) {
      console.log(session);
      navigate('/');
    }
    else {
      console.error(error);
    }
  };

  
    
  return (
    <div className={classes.containerLoginPage}>
      <div className={classes.container}>
        <div className={classes.loginBox}>
          <form onSubmit={handleSubmit}>
            <span className={classes.loginHead}>
              <h2 style={{ lineHeight: '0' }}>Welcome back!</h2>
            </span>
            <label className={classes.loginTopic} htmlFor='email'>
              <span className='cf-body-2'>Email</span>
            </label>
            <input
              className={classes.loginInput}
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter Email'
            />
            <span className={classes.loginTopic}>
              <span className='cf-body-2' htmlFor='password'>Password</span>        
            </span>
            <input
              className={classes.loginInput}
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter Password'
            />
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <button className={classes.loginButton} type='submit'>
              <p className='cf-body-2' style={{ fontWeight: '700' }}>Log in</p>  
            </button>
          </form>
          <div className={classes.textBox}>
            <p className='cf-body-2'>
              Don’t have an account?
            </p>
            <p className='cf-body-2' style={{ fontWeight: '700', cursor: 'pointer', color: '#2F5FAC' }} onClick={() => {
              navigate('/register');
            }}> 
            Register
            </p>
          </div>
        </div>
        <img className={classes.blueRight} src={blueRight} />
        <img className={classes.circleGrey} src={circleGrey} />
        <img className={classes.circleOrange} src={circleOrange} />
        <img className={classes.crossGreen} src={crossGreen} />
        <img className={classes.orangeLeft} src={orangeLeft} />
      </div>
    </div>
  );
}

export default Login;