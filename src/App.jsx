import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import './App.css';

import { Center, Box } from '@mantine/core';

export default function App() {
  return (
    <MantineProvider>
      {
        <Center className='greeting'>
          <Box bg="var(--mantine-color-blue-light)">Welcome to your final project!</Box>
        </Center>
      }
    </MantineProvider>
  );
}

