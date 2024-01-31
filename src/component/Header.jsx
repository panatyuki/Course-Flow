import classes from '../style/Header.module.css';
import courseFlow from '../images/imagesHeader/courseFlow.svg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Header() {
  const navigate = useNavigate();
  const { session } = useAuth();

  return (
    <div className={classes.header}>
      <div className={classes.courseFlowLogo}>
        <img src={courseFlow} alt='courseFlowLogo' onClick={() => {navigate('/');}}/>
      </div>
      <div className={classes.headerRight}>
        <span className={classes.ourCourses}>
          <p className='cf-body-2' style={{ lineHeight: '0', fontWeight: '700' }}>Our Courses</p>     
        </span>
        {!session ? <button onClick={() => {
          navigate('/login');
        }} className={classes.logInButton}>
          <p className='cf-body-2' style={{ lineHeight: '0', fontWeight: '700' }}>Log in</p>
        </button> : <p className='cf-body-2'>Hello {session.user.email}</p>}
      </div>
    </div>
  );
}

export default Header;