import classes from '../style/Header.module.css';
import { useNavigate } from 'react-router-dom';
import { imageHeader } from '../data/imageBackground';
import { useAuth } from '../contexts/AuthContext';

function Header() {
  const navigate = useNavigate();
  const { session } = useAuth();

  const profileDropdown = () => {
    return (
      <div className={classes.profile}>
      </div>
    );
  };

  return (
    <div className={classes.header}>
      <div className={classes.courseFlowLogo}>
        <img src={imageHeader.courseFlow} alt='courseFlowLogo' onClick={() => {navigate('/');}}/>
      </div>
      <div className={classes.headerRight}>
        <p className={classes.ourCourses} onClick={() => {
          navigate('/our-course');
        }}>
          <p className='cf-body-2' style={{ lineHeight: '0', fontWeight: '700' }}>Our Courses</p>     
        </p>
        <button onClick={() => {
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