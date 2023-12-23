import { useLogin } from '@refinedev/core';
import { useEffect, useRef } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { ThemedTitleV2 } from '@refinedev/mui';

import { yariga } from '../assets';

import { CredentialResponse } from '../interfaces/google';

// Todo: Update your Google Client ID here
const GOOGLE_CLIENT_ID = process.env.REACT_DASHBOARD_GOOGLE_CLIENT_ID;

export const Login: React.FC = () => {
  console.log(GOOGLE_CLIENT_ID);
  const { mutate: login } = useLogin<CredentialResponse>();

  const GoogleButton = (): JSX.Element => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (typeof window === 'undefined' || !window.google || !divRef.current) {
        return;
      }

      try {
        window.google.accounts.id.initialize({
          ux_mode: 'popup',
          client_id: GOOGLE_CLIENT_ID,
          callback: async (res: CredentialResponse) => {
            if (res.credential) {
              login(res);
            }
          },
        });
        window.google.accounts.id.renderButton(divRef.current, {
          theme: 'filled_blue',
          size: 'medium',
          type: 'standard',
        });
      } catch (error) {
        console.log(error);
      }
    }, []);

    return <div ref={divRef} />;
  };

  return (
    <Box component="div" sx={{ backgroundColor: '#FCFCFC' }}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh' }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
          <div>
            <img src={yariga} alt="Yariga Logo" />
          </div>
          <Box mt={4}>
            <GoogleButton />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
