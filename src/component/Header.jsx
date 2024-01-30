import classes from '../style/Header.module.css';
import courseFlow from '../images/imagesHeader/courseFlow.svg';

function Header() {
  return (
    <div className={classes.header}>
      <div className={classes.courseFlowLogo}>
        <img src={courseFlow} alt='courseFlowLogo' />
      </div>
      <div className={classes.headerRight}>
        <span className={classes.ourCourses}>Our Courses</span>
        <button className={classes.logInButton}>Log in</button>
      </div>
    </div>
  );
}

export default Header;