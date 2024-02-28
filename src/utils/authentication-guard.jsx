import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import React from 'react';

export const AuthenticationGuard = ({ component: ProtectedComponent }) => {
  const { loginWithRedirect } = useAuth0();

  const AuthGuardedComponent = withAuthenticationRequired(ProtectedComponent, {
    onRedirecting: () => (
      loginWithRedirect({
        appState: {
          returnTo: '/',
        },
      })
    ),
  });
  
  return <AuthGuardedComponent />;
};