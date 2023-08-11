import './App.css';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Avatar, Badge, Box, Button, ChakraProvider, Flex, ThemeConfig, Text, extendTheme, useColorMode, Center, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Image, Stack, HStack } from '@chakra-ui/react';
import icon from '../../assets/duck.svg';
import { useEffect, useState } from 'react';
import redditThumb from '../../assets/project-images/archiver.png'
import chickensThumb from '../../assets/project-images/chickens-preview.png'
import { ExternalLinkIcon } from '@chakra-ui/icons';

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
  const [currentScreen, setCurrentScreen] = useState("index");
  const [hasContentBeenDisplayed, setHasContentBeenDisplayed] = useState<null | boolean>(null);

  useEffect(() => {
    if (hasContentBeenDisplayed === false) {
      const timer = setTimeout(() => {
        setHasContentBeenDisplayed(true);
      }, 800);  // 400ms delay

      return () => clearTimeout(timer);
    }
  }, [hasContentBeenDisplayed]);

  return (
    <ChakraProvider theme={customTheme}>
      <div className='splashscreen-container'>
      <div className={hasButtonBeenClicked ? "splashicon image-moved-up" : "splashicon"}>
        <img width="200" alt="icon" src={icon} />
        <h1>kylemeister!</h1>
      </div>
      <div className={hasButtonBeenClicked ? "buttons buttons-moved-up" : "buttons"}>
        <Button onClick={() => {
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
        <Button onClick={() => {
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
        <Button onClick={() => {
          setHasButtonBeenClicked(true);
          setCurrentScreen("ai");
          setHasContentBeenDisplayed(true);
        }}>
          <span role="img" aria-label="ai">
            ✨
          </span>
          ai
        </Button>
        <Button onClick={() => {
          setHasButtonBeenClicked(true);
          setCurrentScreen("contact");
          setHasContentBeenDisplayed(true);
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
              //animation="fadeIn .3s .4s forwards"
              animation={
                hasContentBeenDisplayed === null
                  ? "fadeIn .3s forwards"
                  : hasContentBeenDisplayed
                  ? "fadeIn .3s forwards"
                  : "fadeIn .3s .4s forwards"
              }
            >
              <Badge borderRadius='2px' px='2' colorScheme='teal'>
                New!
              </Badge>
            </Box>
          )}
          {currentScreen === 'projects' && (
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
            //animation="fadeIn .3s .4s forwards"
            animation={
              hasContentBeenDisplayed === null
                ? "fadeIn .3s forwards"
                : hasContentBeenDisplayed
                ? "fadeIn .3s forwards"
                : "fadeIn .3s .4s forwards"
            }
          >
            <Center p={4}>
              <Box overflowY="auto" maxHeight="calc(100vh - 325px)" p={4}> {/* Adjust maxHeight as required */}
                <Stack spacing={4}>
                  <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                    h={200}
                  >
                    <Image
                      objectFit='cover'
                      maxW={{ base: '100%', sm: '200px' }}
                      src={redditThumb}
                      alt='Reddit with code background'
                    />

                    <Stack>
                      <CardBody>
                      <HStack spacing={2}>
                        <Heading size='md'>Reddit Archiver</Heading>
                        <Badge colorScheme='orange'>30 Stars on Github!</Badge>
                      </HStack>

                        <Text py='2' mb='-10' size='md'>
                        Command line utility for backing up
                        saved Reddit content, including comments, posts, and images,
                        utilizing Python, the Reddit API, and OAuth2 for authentication.
                        </Text>
                      </CardBody>

                      <CardFooter>
                        <Button variant='solid' colorScheme='gray' leftIcon={<ExternalLinkIcon />}>
                          Github
                        </Button>
                      </CardFooter>
                    </Stack>
                  </Card>
                  <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                    h={200}
                  >
                    <Image
                      objectFit='cover'
                      maxW={{ base: '100%', sm: '200px' }}
                      src={chickensThumb}
                      alt='Pixel art chicken with sunglasses'
                    />

                    <Stack spacing={4}>
                      <CardBody>
                      <HStack spacing={2}>
                        <Heading size='md'>Flock and Load</Heading>
                        <Badge colorScheme='red'>Work-in-progress</Badge>
                      </HStack>

                        <Text py='2' mb='-10'>
                        2D Action-strategy game inspired by Worms: Armageddon. Releasing
                        on Steam in Early Access sometime in 2024!
                        </Text>
                      </CardBody>

                      <CardFooter>
                        <Button variant='solid' colorScheme='gray' leftIcon={<ExternalLinkIcon/>}>
                          Steam Page
                        </Button>
                      </CardFooter>
                    </Stack>
                  </Card>
                  <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                    h={120}
                  >
                    <Image
                      objectFit='cover'
                      maxW={{ base: '100%', sm: '200px' }}
                      src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                      alt='Caffe Latte'
                    />

                    <Stack spacing={4}>
                      <CardBody>
                        <Heading size='md'>The perfect latte</Heading>

                        <Text py='2'>
                          Caffè latte is a coffee beverage of Italian origin made with espresso
                          and steamed milk.
                        </Text>
                      </CardBody>

                      <CardFooter>
                        <Button variant='solid' colorScheme='blue'>
                          Buy Latte
                        </Button>
                      </CardFooter>
                    </Stack>
                  </Card>
                  <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                    h={120}
                  >
                    <Image
                      objectFit='cover'
                      maxW={{ base: '100%', sm: '200px' }}
                      src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                      alt='Caffe Latte'
                    />

                    <Stack spacing={4}>
                      <CardBody>
                        <Heading size='md'>The perfect latte</Heading>

                        <Text py='2'>
                          Caffè latte is a coffee beverage of Italian origin made with espresso
                          and steamed milk.
                        </Text>
                      </CardBody>

                      <CardFooter>
                        <Button variant='solid' colorScheme='blue'>
                          Buy Latte
                        </Button>
                      </CardFooter>
                    </Stack>
                  </Card>
                  <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                    h={120}
                  >
                    <Image
                      objectFit='cover'
                      maxW={{ base: '100%', sm: '200px' }}
                      src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                      alt='Caffe Latte'
                    />

                    <Stack spacing={4}>
                      <CardBody>
                        <Heading size='md'>The perfect latte</Heading>

                        <Text py='2'>
                          Caffè latte is a coffee beverage of Italian origin made with espresso
                          and steamed milk.
                        </Text>
                      </CardBody>

                      <CardFooter>
                        <Button variant='solid' colorScheme='blue'>
                          Buy Latte
                        </Button>
                      </CardFooter>
                    </Stack>
                  </Card>
                </Stack>
              </Box>
            </Center>
          </Box>
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
