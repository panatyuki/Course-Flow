import { useNavigate } from 'react-router-dom';
import { Anchor, Group } from '@mantine/core';
import classes from '../style/Footer.module.css';
import { imageFooter } from '../data/imageBackground';

const links = [
  { link: '/our-course', label: 'ALL Courses' },
  { link: '/', label: 'Bundle Package' },
];


function Footer() {
  const navigate = useNavigate();

  const items = links.map((link) => (
    <Anchor
      c="dimmed"
      key={link.label}
      lh={1}
      onClick={() => {
        navigate('/our-course');
      }}
      size='xl'
    >
      {link.label}
    </Anchor>
  ));

  return (
    <>
      <div className={classes.subFooter}>
        <div className={classes.leftSubFooter}>
          <h2>Want to start learning?</h2>
          <button className={classes.button} onClick={() => {
            navigate('/our-course');
          }}>
            <p>Check out our courses</p>
          </button>
        </div>
        <img src={imageFooter.polygon} alt='polygon' width={42} height={42} className={classes.rightSubFooterPolygon} />
        <img src={imageFooter.ellipse} alt='ellipse' width={26} height={26} className={classes.rightSubFooterEllipse} />
        <img src={imageFooter.teachLogo} alt='teachLogo' width={592} height={448} className={classes.rightSubFooterTechLogo} />
      </div>
      <div className={classes.footer}>
        <img src={imageFooter.courseFlowLogo} alt='courseFlowLogo' className={classes.logoLink} onClick={() => {navigate('/');}} />
        <Group className={classes.links}>
          {items}
        </Group>
        <div className={classes.logoBox}>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <img src={imageFooter.facebookLogo} alt='facebookLogo'/>
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <img src={imageFooter.instagramLogo} alt='instagramLogo'/>
          </a>
          <a href="https://twitter.com/?lang=en" target="_blank" rel="noopener noreferrer">
            <img src={imageFooter.twitterLogo} alt='twitterLogo' />
          </a>
        </div>
      </div>
    </>
  );
}

export default Footer;