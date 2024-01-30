import { useForm } from '@mantine/form';
import classes from '../style/Register.module.css';
import bigVector from '../images/imagesRegister/bigVector.svg';
import circle from '../images/imagesRegister/circle.svg';
import mediumEllipse from '../images/imagesRegister/mediumEllipse.svg';
import plus from '../images/imagesRegister/plus.svg';
import smallEllipse from '../images/imagesRegister/smallEllipse.svg';

function Register() {
  const form = useForm({
    initialValues: {

    },

    validate: {
      
    },
  });

  return (
    <div className={classes.container}>
      <img className={classes.bigVectorPosition} src={bigVector} alt='bigVector' />
      <img className={classes.mediumEllipsePosition} src={mediumEllipse} alt='mediumEllipse' />
      <img className={classes.smallEllipsePosition} src={smallEllipse} alt='smallEllipse' />
      <img className={classes.plusPosition} src={plus} alt='plus' />
      <img className={classes.circlePosition} src={circle} alt='circle' />
    </div>
  );
}

export default Register;