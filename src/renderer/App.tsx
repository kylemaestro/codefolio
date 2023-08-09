import './App.css';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Button, ChakraProvider, ThemeConfig, extendTheme, useColorMode } from '@chakra-ui/react';
import icon from '../../assets/duck.svg';
import { createRoot } from 'react-dom/client';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

export const customTheme = extendTheme({ config });

function SplashScreen() {
  // The built in theme config for Chakra UI is currently broken.
  // We'll have to change it manually for now...
  // See https://github.com/chakra-ui/chakra-ui/discussions/5051
  localStorage.setItem('chakra-ui-color-mode', 'dark');

  return (
    <ChakraProvider theme={customTheme}>
      <div className="splashicon">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1>kylemeister</h1>
      <div className="Buttons">
        <a
          href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="readme">
              🗒️
            </span>
            readme
          </button>
        </a>
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="folded hands">
              🚩
            </span>
            projects
          </button>
        </a>
      </div>
    </ChakraProvider>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
      </Routes>
    </Router>
  );
}
