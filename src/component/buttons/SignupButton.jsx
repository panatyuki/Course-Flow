import { Link } from 'react-router-dom';
export default function SignupButton() {
  return (
    <Link to="/register"><button className='button'>Register</button></Link>
  );
}