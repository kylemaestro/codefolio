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
      <div className="buttons">
        <Button>
          <span role="img" aria-label="readme">
            🗒️
          </span>
          readme
        </Button>
        <Button>
          <span role="img" aria-label="folded hands">
            🚩
          </span>
          projects
        </Button>
        <Button>
          <span role="img" aria-label="ai">
            ✨
          </span>
          ai
        </Button>
        <Button>
          <span role="img" aria-label="megaphone">
            📢
          </span>
          contact
        </Button>
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
