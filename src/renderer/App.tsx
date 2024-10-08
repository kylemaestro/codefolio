import './App.css';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Button, ChakraProvider, Image, useToast} from '@chakra-ui/react';
import kyleIcon from '../../assets/duck.svg';
import { useEffect, useState } from 'react';
import ReadmePage from '../components/ReadmePage';
import ProjectsPage from '../components/ProjectsPage';
import ContactPage from '../components/ContactPage';
import ContactConfirmationPage from '../components/ContactConfirmationPage';

const buttonTransitionSpeed = ".1s"

// Setup AWS for SecretsManager
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

function SplashScreen() {
  // The built in theme config for Chakra UI is currently broken.
  // We'll have to change it manually for now...
  // See https://github.com/chakra-ui/chakra-ui/discussions/5051
  localStorage.setItem('chakra-ui-color-mode', 'dark');

  const [hasButtonBeenClicked, setHasButtonBeenClicked] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("index");
  const [hasContentBeenDisplayed, setHasContentBeenDisplayed] = useState<null | boolean>(null);

  useEffect(() => {
    if (hasContentBeenDisplayed === false) {
      const timer = setTimeout(() => {
        setHasContentBeenDisplayed(true);
      }, 800);  // 800ms delay

      return () => clearTimeout(timer);
    }
  }, [hasContentBeenDisplayed]);

  return (
    <ChakraProvider>
      <link rel="icon" href="../../assets/favicon.ico" />
      <div className='splashscreen-container'>
      <div className={hasButtonBeenClicked ? "splashicon image-moved-up" : "splashicon"}>
        <Image
          w="200px"
          src={kyleIcon}
        />
        <h1>kylemeister!</h1>
      </div>
      <div className={hasButtonBeenClicked ? "buttons buttons-moved-up" : "buttons"}>
        <Button
        transitionDuration={buttonTransitionSpeed}
        onClick={() => {
          setHasButtonBeenClicked(true);
          setCurrentScreen("readme");
          if (hasContentBeenDisplayed === null) {
            setHasContentBeenDisplayed(false);
          }
        }}>
          <span role="img" aria-label="readme">
            🗒️
          </span>
          readme
        </Button>
        <Button
        transitionDuration={buttonTransitionSpeed}
        onClick={() => {
          setHasButtonBeenClicked(true);
          setCurrentScreen("projects");
          if (hasContentBeenDisplayed === null) {
            setHasContentBeenDisplayed(false);
          }
        }}>
          <span role="img" aria-label="folded hands">
            🚩
          </span>
          projects
        </Button>
        <Button
        transitionDuration={buttonTransitionSpeed}
        onClick={() => {
          setHasButtonBeenClicked(true);
          setCurrentScreen("contact");
          if (hasContentBeenDisplayed === null) {
            setHasContentBeenDisplayed(false);
          }
        }}>
          <span role="img" aria-label="megaphone">
            📢
          </span>
          contact
        </Button>
      </div>
      {hasButtonBeenClicked && (
        <div className='content-container'>
          {currentScreen === 'readme' && (
            <ReadmePage hasContentBeenDisplayed={hasContentBeenDisplayed} />
          )}
          {currentScreen === 'projects' && (
            <ProjectsPage
              hasContentBeenDisplayed={hasContentBeenDisplayed}
              buttonTransitionSpeed={buttonTransitionSpeed}
            />
          )}
          { currentScreen === 'contact' && (
            <ContactPage
              hasContentBeenDisplayed={hasContentBeenDisplayed}
              buttonTransitionSpeed={buttonTransitionSpeed}
              setCurrentScreen={setCurrentScreen}
            />
          )}
          { currentScreen === 'contact-confirmation' && (
            <ContactConfirmationPage />
          )}
        </div>
      )}
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
