import './App.css';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, Box } from '@chakra-ui/react';
import icon from '../../assets/duck.svg';

function SplashScreen() {
  return (
    <ChakraProvider>
      <Box
        backgroundPosition="center"
        backgroundRepeat="repeat"
        background="#0c001e"
      />
      <div>
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
