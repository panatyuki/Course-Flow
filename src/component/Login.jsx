import classes from '../style/Login.module.css';
import { useNavigate } from 'react-router-dom';
import { imageRegisterAndLogin } from '../data/imageBackground';

function Login() {
  const navigate = useNavigate();
    
  return (
    <div className={classes.containerLoginPage}>
      <div className={classes.container}>
        <div className={classes.loginBox}>
          <span className={classes.loginHead}>
            <h2 style={{ lineHeight: '0' }}>Welcome back!</h2>
          </span>
          <span className={classes.loginTopic}>
            <p className='cf-body-2'>Email</p>
          </span>
          <input type="email" placeholder='Enter Email' className={classes.loginInput}></input>
          <span className={classes.LoginTopic}>
            <p className='cf-body-2'>Password</p>        
          </span>
          <input type="password" placeholder='Enter Password' className={classes.loginInput}></input>
          <button className={classes.loginButton}>
            <p className='cf-body-2' style={{ fontWeight: '700' }}>Log in</p>  
          </button>
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
        <img className={classes.blueRight} src={imageRegisterAndLogin.blueRight} />
        <img className={classes.circleGrey} src={imageRegisterAndLogin.circleGreyRL} />
        <img className={classes.circleOrange} src={imageRegisterAndLogin.circleOrange} />
        <img className={classes.crossGreen} src={imageRegisterAndLogin.crossGreen} />
        <img className={classes.orangeLeft} src={imageRegisterAndLogin.orangeLeft} />
      </div>
    </div>
    
  );
}

export default Login;