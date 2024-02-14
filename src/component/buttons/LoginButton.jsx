import { Button } from '@mantine/core';
import { useAuth0 } from '@auth0/auth0-react';

function LoginButton() {
  const { loginWithRedirect } = useAuth0();
  
  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: '/'
      }
    });
  };

  return (
    <button className='button-secondary'>Login</button>
  );
}
export default LoginButton;