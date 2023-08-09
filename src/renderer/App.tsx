import './App.css';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Avatar, Badge, Box, Button, ChakraProvider, Flex, ThemeConfig, Text, extendTheme, useColorMode } from '@chakra-ui/react';
import icon from '../../assets/duck.svg';
import { useState } from 'react';

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

  const [hasButtonBeenClicked, setHasButtonBeenClicked] = useState(false);
  const [readmeClicked, setReadmeClicked] = useState(false);
  const [projectsClicked, setProjectsClicked] = useState(false);
  const [aiClicked, setAiClicked] = useState(false);
  const [contactClicked, setContactClicked] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("index");

  return (
    <ChakraProvider theme={customTheme}>
      <div className='splashscreen-container'>
      <div className={hasButtonBeenClicked ? "splashicon image-moved-up" : "splashicon"}>
        <img width="200" alt="icon" src={icon} />
        <h1>kylemeister</h1>
      </div>
      <div className={hasButtonBeenClicked ? "buttons buttons-moved-up" : "buttons"}>
        <Button onClick={() => {
          setHasButtonBeenClicked(true);
          setCurrentScreen("readme");
        }}>
          <span role="img" aria-label="readme">
            🗒️
          </span>
          readme
        </Button>
        <Button onClick={() => {
          setHasButtonBeenClicked(true);
          setCurrentScreen("projects");
        }}>
          <span role="img" aria-label="folded hands">
            🚩
          </span>
          projects
        </Button>
        <Button onClick={() => {
          setHasButtonBeenClicked(true);
          setCurrentScreen("ai");
        }}>
          <span role="img" aria-label="ai">
            ✨
          </span>
          ai
        </Button>
        <Button onClick={() => {
          setHasButtonBeenClicked(true);
          setCurrentScreen("contact");
        }}>
          <span role="img" aria-label="megaphone">
            📢
          </span>
          contact
        </Button>
      </div>
      {(hasButtonBeenClicked && currentScreen === 'readme') && (
            <Box
              bg="#151a24"
              width="50vw"
              height="66.67vh"
              borderRadius="6px"
              position="fixed"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              opacity="0"
              animation="fadeIn 1s 0.5s forwards"
            >
              <Badge borderRadius='2px' px='2' colorScheme='teal'>
                New!
              </Badge>
            </Box>
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
