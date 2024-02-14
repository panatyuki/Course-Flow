import './App.css';
import { Routes, Route } from 'react-router-dom';
import PagesRouter from './pages/PagesRouter';
import Callback from './pages/Callback';

import { MantineProvider, createTheme, Button } from '@mantine/core';

import './App.css';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/dates/styles.css';

export default function App() {
  const courseflowTheme = createTheme({
    components: {
      Button: Button.extend({
        classNames: {
          root: 'button-primary'
        }
      })
    }
  });
  return (
    <MantineProvider theme={courseflowTheme}>
      <Routes>
        <Route path="*" element={<PagesRouter />} />
        <Route path='/callback' element={<Callback />} />
      </Routes>
    </MantineProvider>
  );
}

