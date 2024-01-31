import { useNavigate } from 'react-router-dom';
import { Carousel } from '@mantine/carousel';
import classes from '../style/Main.module.css';
import janeCooper from '../images/imagesMainMiddle/janeCooper.svg';
import estherHoward from '../images/imagesMainMiddle/estherHoward.svg';
import brooklynSimmons from '../images/imagesMainMiddle/brooklynSimmons.svg';
import polygonOrange from '../images/imagesMainMiddle/polygonOrange.svg';
import saifulIslam from '../images/imagesMainMiddle/saifulIslam.svg';
import jameCameron from '../images/imagesMainMiddle/jameCameron.svg';
import quotemarksLeft from '../images/imagesMainMiddle/quotemarksLeft.svg';
import quotemarksRight from '../images/imagesMainMiddle/quotemarksRight.svg';
import bigEllipseRight from '../images/imagesMainMiddle/bigEllipseRight.svg';
import smallEllipseRight from '../images/imagesMainMiddle/smallEllipseRight.svg';
import plus from '../images/imagesMainMiddle/plus.svg';
import backgroundBlue from '../images/imagesMainTop/backgroundBlue.svg';
import computer from '../images/imagesMainTop/computer.svg';
import ellipseLeft from '../images/imagesMainTop/ellipseLeft.svg';
import cross from '../images/imagesMainTop/cross.svg';
import circleBlue from '../images/imagesMainTop/circleBlue.svg';
import polygon from '../images/imagesMainTop/polygon.svg';
import circleGreen from '../images/imagesMainTop/circleGreen.svg';
import picRow1 from '../images/imagesMainMiddle/picRow1.svg';
import picRow2 from '../images/imagesMainMiddle/picRow2.svg';
import secure from '../images/imagesMainMiddle/secure.svg';
import support from '../images/imagesMainMiddle/support.svg';
import collab from '../images/imagesMainMiddle/collab.svg';
import ellipseTop from '../images/imagesMainMiddle/ellipseTop.svg';
import circleGrey from '../images/imagesMainMiddle/circle.svg';
import crossPurple from '../images/imagesMainMiddle/cross.svg';
import ellipseBot from '../images/imagesMainMiddle/ellipseBot.svg';

const mockDataProfessional = [
  { picture: janeCooper , name: 'Jane Cooper', position: 'UX/UI Designer' },
  { picture: estherHoward , name: 'Esther Howard', position: 'Program Manager' },
  { picture: brooklynSimmons , name: 'Brooklyn Simmons', position: 'Software Engineer' }
];

const mockDataGraduates = [
  { picture: saifulIslam , name: 'Saiful Islam', 
    description: 
  `Start with something simple and small, then expand over time. If people call it a ‘toy’ you’re definitely onto something.
  If you’re waiting for encouragement from others, you’re doing it wrong. By the time people think an idea is good, it’s probably too late.` },
  { picture: jameCameron , name: 'Jame Cameron', 
    description: 
  `Start with something simple and small, then expand over time. If people call it a ‘toy’ you’re definitely onto something.
  If you’re waiting for encouragement from others, you’re doing it wrong. By the time people think an idea is good, it’s probably too late.` },
  { picture: saifulIslam , name: 'Jimmy Foxx', 
    description: 
  `Start with something simple and small, then expand over time. If people call it a ‘toy’ you’re definitely onto something.
  If you’re waiting for encouragement from others, you’re doing it wrong. By the time people think an idea is good, it’s probably too late.` },
  { picture: saifulIslam , name: 'Saiful Islam', 
    description: 
  `Start with something simple and small, then expand over time. If people call it a ‘toy’ you’re definitely onto something.
  If you’re waiting for encouragement from others, you’re doing it wrong. By the time people think an idea is good, it’s probably too late.` },
  { picture: jameCameron , name: 'Jame Cameron', 
    description: 
  `Start with something simple and small, then expand over time. If people call it a ‘toy’ you’re definitely onto something.
  If you’re waiting for encouragement from others, you’re doing it wrong. By the time people think an idea is good, it’s probably too late.` },
  { picture: saifulIslam , name: 'Jimmy Foxx', 
    description: 
  `Start with something simple and small, then expand over time. If people call it a ‘toy’ you’re definitely onto something.
  If you’re waiting for encouragement from others, you’re doing it wrong. By the time people think an idea is good, it’s probably too late.` },
];

function GraduateCard({ graduate }) {
  return (
    <div className={classes.cardGraduates}>
      <img src={graduate.picture} alt={graduate.name} className={classes.pictureGraduatesPosition} />
      <img src={quotemarksLeft} alt='quotemarksLeft' className={classes.quotemarkLeftPosition} />
      <img src={quotemarksRight} alt='quotemarksRight' className={classes.quotemarkRightPosition} />
      <div className={classes.textCardGraduatesContainer}>
        <h3 style={{ color: 'var(--Primary, #2F5FAC)' }}>{graduate.name}</h3>
        <p className='cf-body-2' style={{ color: 'var(--gray-700, #646D89)' }}>{graduate.description}</p>
      </div>
    </div>
  );
}


function Main() {
  const navigate = useNavigate();

  const graduatesCarouselSlides = mockDataGraduates.map((grad, index) => {
    return (
      <Carousel.Slide key={index}>
        <GraduateCard graduate={grad} />
      </Carousel.Slide>);
  });

  return (
    <>
      <div className={classes.mainTop}>
        <div className={classes.box1}>
          <h1>Best Virtual Classroom Software</h1>
        </div>
        <div className={classes.box2}>
          <p className='cf-body-1'>Welcome to Schooler! The one-stop online class management system that caters to all your educational needs!</p>
        </div>
        <button className={classes.exploreButton} onClick={() => {
          navigate('/our-course');
        }}>
          <p className='cf-body-2' style={{ fontWeight: '700' }} >Explore Courses</p>
        </button>
        <img className={classes.backgroundBlue} src={backgroundBlue} />
        <img className={classes.computer} src={computer} />
        <img className={classes.ellipseLeft} src={ellipseLeft} />
        <img className={classes.cross} src={cross} />
        <img className={classes.circleBlue} src={circleBlue} />
        <img className={classes.polygon} src={polygon} />
        <img className={classes.circleGreen} src={circleGreen} />
      </div>
      <div className={classes.mainMiddle}>
        <div className={classes.container}>
          <div className={classes.row1}>
            <img className={classes.picRow1} src={picRow1}/>
            <div className={classes.textContainer}>
              <div className={classes.textHead}>
                <h2>Learning experience has been enhanced with new technologies</h2>
              </div>
              <div className={classes.textBox}>
                <div className={classes.iconBox}>
                  <img src={secure} />
                </div>
                <div>
                  <div className={classes.textSubhead}>
                    <h3 style={{ lineHeight: '0' }}>Secure & Easy</h3>
                  </div>
                  <div className={classes.text}>
                    <p className='cf-body-2'>Duis aute irure dolor in reprehenderit in voluptate velit es se cillum dolore eu fugiat nulla pariatur. Excepteur sint.</p>
                  </div>
                </div>
              </div>
              <div className={classes.textBox}>
                <div className={classes.iconBox}>
                  <img src={support} />
                </div>
                <div>
                  <div className={classes.textSubhead}>
                    <h3 style={{ lineHeight: '0' }}>Supports All Students</h3>           
                  </div>
                  <div className={classes.text}>
                    <p className='cf-body-2' >Duis aute irure dolor in reprehenderit in voluptate velit es se cillum dolore eu fugiat nulla pariatur. Excepteur sint.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.row2}>
            <div className={classes.textContainer}>
              <div className={classes.textHead}>
                <h2>Interactions between the tutor and the learners</h2>
              </div>
              <div className={classes.textBox}>
                <div className={classes.iconBox}>
                  <img src={collab} />
                </div>
                <div>
                  <div className={classes.textSubhead}>
                    <h3 style={{ lineHeight: '0' }}>Purely Collaborative</h3> 
                  </div>
                  <div className={classes.text}>
                    <p className='cf-body-2'>Duis aute irure dolor in reprehenderit in voluptate velit es se cillum dolore eu fugiat nulla pariatur. Excepteur sint.</p>
                  </div>
                </div>
              </div>
              <div className={classes.textBox}>
                <div className={classes.iconBox}>
                  <img src={support} />
                </div>
                <div>
                  <div className={classes.textSubhead}>
                    <h3 style={{ lineHeight: '0' }}>Supports All Students</h3>                   
                  </div>
                  <div className={classes.text}>
                    <p className='cf-body-2'>Duis aute irure dolor in reprehenderit in voluptate velit es se cillum dolore eu fugiat nulla pariatur. Excepteur sint.</p>
                  </div>
                </div>
              </div>
            </div>
            <img className={classes.picRow2} src={picRow2}/>
          </div>
        </div>
        <img className={classes.ellipseTop} src={ellipseTop} />
        <img className={classes.circleGrey} src={circleGrey} />
        <img className={classes.crossPurple} src={crossPurple} />
        <img className={classes.ellipseBot} src={ellipseBot} />
      </div>
      
      <div className={classes.containerProfessionalInstructors}>
        <img src={polygonOrange} alt='polygonOrange' className={classes.polygonPosition} />
        <h2>Our Professional Instructors</h2>
        <div className={classes.containerCard}>
          {
            mockDataProfessional.map((items) => {
              return (
                <div className={classes.card} key={items.name}>
                  <img src={items.picture} alt={items.name} />
                  <div>
                    <h3 style={{ lineHeight: '1' }}>{items.name}</h3>
                    <p className='cf-body-2' style={{ lineHeight: '0' ,color: '#5483D0' }}>{items.position}</p>
                  </div>  
                </div>
              );
            })
          }
        </div>
      </div>

      <div className={classes.containerGraduates}>
        <h2>Our Graduates</h2>
        <div className={classes.graduatesCarousel}>
          <Carousel slideSize="15%" height={400} align="center" slideGap="xl"  withControls={false} >
            {graduatesCarouselSlides}
          </Carousel>
        </div>
        <img src={bigEllipseRight} alt='bigEllipseRight' className={classes.bigEllipseRightPosition} />
        <img src={smallEllipseRight} alt='smallEllipseRight' className={classes.smallEllipseRightPosition} />
        <img src={plus} alt='plus' className={classes.plusPosition} />
      </div>
    </> 
  );
}

export default Main;