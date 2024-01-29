import classes from '../style/Main.module.css';
import janeCooper from '../images/janeCooper.svg';
import estherHoward from '../images/estherHoward.svg';
import brooklynSimmons from '../images/brooklynSimmons.svg';

const mockDataProfessional = [
  { picture: janeCooper , name: 'Jane Cooper', position: 'UX/UI Designer' },
  { picture: estherHoward , name: 'Esther Howard', position: 'Program Manager' },
  { picture: brooklynSimmons , name: 'Brooklyn Simmons', position: 'Software Engineer' }
];

function Main() {
  return (
    <>
      <div className={classes.containerProfessionalInstructors}>
        <h2>Our Professional Instructors</h2>
        <div className={classes.containerCard}>
          {
            mockDataProfessional.map((items) => {
              return (
                <div className={classes.card} key={items.name}>
                  <img src={items.picture} alt={items.name} />
                  <div>
                    <h3 style={{ lineHeight: '0' }}>{items.name}</h3>
                    <p className='cf-body-2' style={{ lineHeight: '0' ,color: 'var(--blue-400, #5483D0)' }}>{items.position}</p>
                  </div>  
                </div>
              );
            })
          }
        </div>
      </div>
    </> 
  );
}

export default Main;