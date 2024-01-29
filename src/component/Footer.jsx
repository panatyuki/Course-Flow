import { useNavigate } from 'react-router-dom';
import classes from '../style/Footer.module.css';
import courseFlowLogo from '../images/CourseFlow.png';
import fbLogo from '../images/fb.png';


function Footer() {
  const navigate = useNavigate();

  return (
    <>
      <div className={classes.topFooter}>
        <h2>Want to start learning?</h2>
        <button className={classes.button}>
          <p>Check out our courses</p>
        </button>
      </div>
      <div className={classes.footer}>
        <img src={courseFlowLogo} alt='courseFlowLogo' />
        <div className={classes.textBoxCenter}>
          <p>ALL Courses</p>
          <p>Bundle Package</p>
        </div>
      </div>
    </>
  );
}

export default Footer;