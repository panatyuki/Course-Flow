import classes from '../style/Header.module.css';
import courseFlow from '../images/imagesHeader/courseFlow.svg';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return (
    <div className={classes.header}>
      <div className={classes.courseFlowLogo}>
        <img src={courseFlow} alt='courseFlowLogo' onClick={() => {navigate('/');}}/>
      </div>
      <div className={classes.headerRight}>
        <span className={classes.ourCourses}>
          <p className='cf-body-2' style={{ lineHeight: '0', fontWeight: '700' }}>Our Courses</p>     
        </span>
        <button onClick={() => {
          navigate('/login');
        }} className={classes.logInButton}>
          <p className='cf-body-2' style={{ lineHeight: '0', fontWeight: '700' }}>Log in</p>
        </button>
      </div>
    </div>
  );
}

export default Header;