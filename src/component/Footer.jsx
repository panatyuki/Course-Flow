import { useNavigate } from 'react-router-dom';
import { Anchor, Group } from '@mantine/core';
import classes from '../style/Footer.module.css';
import teachLogo from '../images/imageTeach.svg';
import polygon from '../images/polygon.svg';
import ellipse from '../images/ellipse.svg';
import courseFlowLogo from '../images/courseFlow.svg';
import facebookLogo from '../images/facebookLogo.svg';
import instagramLogo from '../images/instagramLogo.svg';
import twitterLogo from '../images/twitterLogo.svg';

const links = [
  { link: '/', label: 'ALL Courses' },
  { link: '/', label: 'Bundle Package' },
];

function Footer() {
  const navigate = useNavigate();
  const items = links.map((link) => (
    <Anchor
      c="dimmed"
      key={link.label}
      lh={1}
      onClick={() => navigate(`'${links.link}'`)}
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
          <button className={classes.button}>
            <p>Check out our courses</p>
          </button>
        </div>
        <img src={polygon} alt='polygon' width={42} height={42} className={classes.rightSubFooterPolygon} />
        <img src={ellipse} alt='ellipse' width={26} height={26} className={classes.rightSubFooterEllipse} />
        <img src={teachLogo} alt='teachLogo' width={592} height={448} className={classes.rightSubFooterTechLogo} />
      </div>
      <div className={classes.footer}>
        <img src={courseFlowLogo} alt='courseFlowLogo' className={classes.logoLink} onClick={() => {navigate('/');}} />
        <Group >
          {items}
        </Group>
        <div className={classes.logoBox}>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <img src={facebookLogo} alt='facebookLogo'/>
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <img src={instagramLogo} alt='instagramLogo'/>
          </a>
          <a href="https://twitter.com/?lang=en" target="_blank" rel="noopener noreferrer">
            <img src={twitterLogo} alt='twitterLogo' />
          </a>
        </div>
      </div>
    </>
  );
}

export default Footer;