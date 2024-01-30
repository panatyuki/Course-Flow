import classes from '../style/Login.module.css';
import blueRight from '../images/imagesLogin/blueRight.svg';
import circleGrey from '../images/imagesLogin/circleGrey.svg';
import circleOrange from '../images/imagesLogin/circleOrange.svg';
import crossGreen from '../images/imagesLogin/crossGreen.svg';
import orangeLeft from '../images/imagesLogin/orangeLeft.svg';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
    
  return (
    <div className={classes.container}>
      <div className={classes.loginBox}>
        <span className={classes.loginHead}>Welcome back!</span>
        <span className={classes.loginTopic}>Email</span>
        <input type="email" placeholder='Enter Email' className={classes.loginInput}></input>
        <span className={classes.LoginTopic}>Password</span>
        <input type="password" placeholder='Enter Password' className={classes.loginInput}></input>
        <button className={classes.loginButton}>Log in</button>
        <div>
          <span className={classes.askForAccount}>Don’t have an account?</span>
          <span onClick={() => {
            navigate('/register');
          }} className={classes.register}> Register</span>
        </div>
      </div>
      <img className={classes.blueRight} src={blueRight} />
      <img className={classes.circleGrey} src={circleGrey} />
      <img className={classes.circleOrange} src={circleOrange} />
      <img className={classes.crossGreen} src={crossGreen} />
      <img className={classes.orangeLeft} src={orangeLeft} />
    </div>
  );
}

export default Login;