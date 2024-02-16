import './App.css';
import { Routes, Route } from 'react-router-dom';
import PagesRouter from './pages/PagesRouter';
import Callback from './pages/Callback';

import { MantineProvider } from '@mantine/core';
import courseflowTheme from './utils/courseflowDesignSystem';
import './App.css';

import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/dates/styles.css';
import './MantineComponents.css';

export default function App() {

  return (
    <MantineProvider theme={courseflowTheme}>
      <Routes>
        <Route path="*" element={<PagesRouter />} />
        <Route path='/callback' element={<Callback />} />
      </Routes>
    </MantineProvider>
  );
}

