import classes from '../style/Header.module.css';
import { useNavigate } from 'react-router-dom';
import { imageHeader } from '../data/imageBackground';
import { useState } from 'react';
import LoginButton from './buttons/LoginButton';
import SignupButton from './buttons/SignupButton';
import { Group } from '@mantine/core';
import { useAuth0 } from '@auth0/auth0-react';

function Header() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const { user, logout } = useAuth0();

  const navigate = useNavigate();
  console.log(user);

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  return (
    <div className={classes.header}>
      <div className={classes.courseFlowLogo}>
        <img src={imageHeader.courseFlow} alt='courseFlowLogo' onClick={() => {
          navigate('/');
        }}/>
      </div>
      <div className={classes.headerRight}>
        <div className={classes.ourCourses} onClick={() => navigate('/our-course')}>
          <p className='cf-body-2' style={{ lineHeight: '0', fontWeight: '700' }}>Our Courses</p>
        </div>
        
        {!user ? 
          <Group>
            <LoginButton/>
            <SignupButton/>
          </Group> : (
            <div className={classes.profile}>
              <img src={user.picture} alt='profile' width='40' height='40' />
              <p className='cf-body-2' style={{ color: '#424C6B' }}>Hello {user.name}</p>
              <img src={imageHeader.arrowDropdown} alt='arrowDropdown' className={classes.arrowDropdown} onClick={() => 
                setOpenDropdown((prev) => !(prev))
              } />
              {
                openDropdown && (
                  <div className={classes.dropdownContainer}>
                    <div className={classes.sectionUp}>
                      <div className={classes.dropdownTextSectionUpContainer}>
                        <img src={user.picture} alt='profileIcon' />
                        <span className='cf-body-3' style={{ color: '#646D89' }}>Profile</span>
                      </div>
                      <div className={classes.dropdownTextSectionUpContainer} onClick={() => navigate('/my-courses') }>
                        <img src={imageHeader.myCourseIcon} alt='myCourseIcon' />
                        <span className='cf-body-3' style={{ color: '#646D89' }}>My Course</span>
                      </div>
                      <div className={classes.dropdownTextSectionUpContainer}>
                        <img src={imageHeader.myHomeworkIcon} alt='myHomeworkIcon' />
                        <span className='cf-body-3' style={{ color: '#646D89' }}>My Homework</span>
                      </div>
                      <div className={classes.dropdownTextSectionUpContainer} onClick={(()=>{navigate('/desired-courses');})}>
                        <img src={imageHeader.myDesireCourseIcon} alt='myDesireCourseIcon' />
                        <span className='cf-body-3' style={{ color: '#646D89' }}>My Desire Courses</span>
                      </div>
                    </div>
                    <div className={classes.dropdownTextSectionDownContainer} onClick={handleLogout}>
                      <img src={imageHeader.logoutIcon} alt='logoutIcon' />
                      <span className='cf-body-3' style={{ color: '#646D89' }}>Log out</span>
                    </div>
                  </div> 
                )
              }   
            </div>
          )}
      </div>
    </div>
  );
}

export default Header;