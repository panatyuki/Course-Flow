import classes from '../style/Header.module.css';
import courseFlow from '../images/imagesHeader/courseFlow.svg';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return (
    <div className={classes.header}>
      <div className={classes.courseFlowLogo}>
        <img src={courseFlow} alt='courseFlowLogo' />
      </div>
      <div className={classes.headerRight}>
        <span className={classes.ourCourses}>Our Courses</span>
        <button onClick={() => {
          navigate('/login');
        }} className={classes.logInButton}>Log in</button>
      </div>
    </div>
  );
}

export default Header;