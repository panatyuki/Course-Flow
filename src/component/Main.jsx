import { Carousel } from '@mantine/carousel';
import classes from '../style/Main.module.css';
import janeCooper from '../images/janeCooper.svg';
import estherHoward from '../images/estherHoward.svg';
import brooklynSimmons from '../images/brooklynSimmons.svg';
import polygonOrange from '../images/polygonOrange.svg';
import saifulIslam from '../images/saifulIslam.svg';
import jameCameron from '../images/jameCameron.svg';
import quotemarksLeft from '../images/quotemarksLeft.svg';
import quotemarksRight from '../images/quotemarksRight.svg';
import bigEllipseRight from '../images/bigEllipseRight.svg';
import smallEllipseRight from '../images/smallEllipseRight.svg';
import plus from '../images/plus.svg';

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
  { picture: saifulIslam , name: 'Janie Star', 
    description: 
  `Start with something simple and small, then expand over time. If people call it a ‘toy’ you’re definitely onto something.
  If you’re waiting for encouragement from others, you’re doing it wrong. By the time people think an idea is good, it’s probably too late.` },
  { picture: jameCameron , name: 'Jame Cameron', 
    description: 
  `Start with something simple and small, then expand over time. If people call it a ‘toy’ you’re definitely onto something.
  If you’re waiting for encouragement from others, you’re doing it wrong. By the time people think an idea is good, it’s probably too late.` },
  { picture: jameCameron , name: 'Jame Cameron', 
    description: 
  `Start with something simple and small, then expand over time. If people call it a ‘toy’ you’re definitely onto something.
  If you’re waiting for encouragement from others, you’re doing it wrong. By the time people think an idea is good, it’s probably too late.` },
];


function Main() {
  return (
    <>
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
                    <p className='cf-body-2' style={{ lineHeight: '0' ,color: 'var(--blue-400, #5483D0)' }}>{items.position}</p>
                  </div>  
                </div>
              );
            })
          }
        </div>
      </div>
      <div className={classes.containerGraduates}>
        <h2>Our Graduates</h2>
        <div >
          <Carousel slideSize="70%" height={200} slideGap="xl" controlsOffset="xs" controlSize={21} loop dragFree>
            <Carousel.Slide className={classes.containerCardGraduates}>
              {
                mockDataGraduates.map((item) => (
                  <div key={item.picture} >
                    <div key={item} className={classes.cardGraduates}>
                      <img src={item.picture} alt={item.name} className={classes.pictureGraduatesPosition} />
                      <img src={quotemarksLeft} alt='quotemarksLeft' className={classes.quotemarkLeftPosition} />
                      <img src={quotemarksRight} alt='quotemarksRight' className={classes.quotemarkRightPosition} />
                      <div className={classes.textCardGraduatesContainer}>
                        <h3 style={{ color: 'var(--Primary, #2F5FAC)' }}>{item.name}</h3>
                        <p className='cf-body-2' style={{ color: 'var(--gray-700, #646D89)' }}>{item.description}</p>
                      </div>
                    </div>
                  </div>))
              }
            </Carousel.Slide>
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