import './App.css';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Avatar, Badge, Box, Button, ChakraProvider, Flex, Icon, InputRightAddon,
  ThemeConfig, Text, extendTheme, useColorMode, Center, ButtonGroup,
  Card, CardBody, CardFooter, Divider, Heading, Image, Stack, HStack, AvatarBadge, Tooltip, Input, Textarea, InputGroup, useToast, AbsoluteCenter, Link, Progress } from '@chakra-ui/react';
import kyleIcon from '../../assets/duck.svg';
import { useEffect, useState } from 'react';
import redditThumb from '../../assets/project-images/archiver.png';
import chickensThumb from '../../assets/project-images/chickens-preview.png';
import codefolioThumb from '../../assets/project-images/codefolio.png';
import dinnerThumb from '../../assets/project-images/dinner.png';
import { BsGithub, BsSteam } from 'react-icons/bs';
import { BiSolidBookBookmark } from 'react-icons/bi';
import { AiFillQuestionCircle } from "react-icons/ai";
import { LockIcon, QuestionOutlineIcon } from '@chakra-ui/icons';

const buttonTransitionSpeed = ".1s"

// Setup AWS for SecretsManager
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const secretsManager = new AWS.SecretsManager();

function SplashScreen() {
  // The built in theme config for Chakra UI is currently broken.
  // We'll have to change it manually for now...
  // See https://github.com/chakra-ui/chakra-ui/discussions/5051
  localStorage.setItem('chakra-ui-color-mode', 'dark');

  const [hasButtonBeenClicked, setHasButtonBeenClicked] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("index");
  const [hasContentBeenDisplayed, setHasContentBeenDisplayed] = useState<null | boolean>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [subject, setSubject] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const toast = useToast();

  useEffect(() => {
    if (hasContentBeenDisplayed === false) {
      const timer = setTimeout(() => {
        setHasContentBeenDisplayed(true);
      }, 800);  // 800ms delay

      return () => clearTimeout(timer);
    }
  }, [hasContentBeenDisplayed]);

  async function getDiscordWebhookUrlAsync() {
      const secretName = 'discord-webhook';

      try {
          const data = await secretsManager.getSecretValue({ SecretId: secretName }).promise();

          if (data.SecretString) {
              const secret = JSON.parse(data.SecretString);
              return secret.webhookURL;
          }
          throw new Error('Failed to retrieve Discord webhook URL.');
      } catch (err) {
          console.error('Error retrieving secret:', err);
          return null;
      }
  }

  async function sendMessageToDiscordAsync() {
    // TODO: Migrate to EC2 and use IAM roles for secrets manager
    // const webhookURL = await getDiscordWebhookUrlAsync();
    const webhookURL = "https://discord.com/api/webhooks/1140138356567716040/DUx7SZRGC8BE2lEHIjdcrj-mbk8t1wfYd7SgTbdmMvOu9LVHDcxxHqEy_9Db_ysW12dC";

    const messageContent = `
        ✨ New Message from ${name} ✨
        Reply Email: ${email}
        Subject: ${subject}
        Message: ${message}
    `;

    const payload = {
        content: messageContent,
    };

    const response = await fetch(webhookURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        console.log("Message sent to Discord!");
    } else {
        console.error("Failed to send message to Discord.");
    }
  }

  async function handleSendMessageClick() {
    if (name === '' || email === '' || subject === '' || message === '') {
      toast({
        title: 'Please fillout all fields prior to launch 💥🚀',
        description: "",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return;
    }

    setIsLoading(true);

    await sendMessageToDiscordAsync();

    toast({
      title: 'Message sent!',
      description: "",
      status: 'success',
      duration: 3000,
      isClosable: true,
    })

    setName('');
    setEmail('');
    setSubject('');
    setMessage('');

    setCurrentScreen("contact-confirmation");

    setIsLoading(false);
  }

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
          setCurrentScreen("ai");
          if (hasContentBeenDisplayed === null) {
            setHasContentBeenDisplayed(false);
          }
        }}>
          <span role="img" aria-label="ai">
            ✨
          </span>
          ai
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
            <Box
              overflowY="auto"
              overflowX="auto"
              boxShadow="sm"
              bg="#151a24"
              w={["95vw", "90vw", "80vw", "70vw", "60vw"]}
              h={["75vh", "75vh", "75vh", "70vh", "70vh"]}
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
              <Center w="100%" h="100%">
                <Stack>
                  <Text fontSize="2xl" fontFamily="Lucida Console" marginLeft="40px" marginRight="40px">
                    &lt;<Box as="span" color="#167cdb">Introduction</Box>&gt;
                  </Text>
                  <Text fontSize="2xl" fontFamily="Lucida Console" marginLeft="60px" marginRight="40px">
                    Hi! I'm <Box as="span" color="#167cdb">Kyle</Box>. I make games and hang out in <Box as="span" color="#167cdb">The Cloud</Box>.
                  </Text>
                  <Text fontSize="2xl" fontFamily="Lucida Console" marginLeft="60px" marginRight="40px">
                    I have 3 years of experience building and deploying <Box as="span" color="#14e051">enterprise-grade .NET solutions</Box> and APIs on AWS. I also develop my own games using the <Box as="span" color="#14e051">Unity Engine</Box>.
                  </Text>
                  <Text fontSize="2xl" fontFamily="Lucida Console" marginLeft="60px" marginRight="40px">
                    Some <Box as="span" color="#14e051">AWS technologies</Box> I'm experienced in include API Gateway, DynamoDB, Lambda, S3, CodePipeline, CodeBuild, Step Functions, Route53, Lightsail, and Cloudwatch.
                  </Text>
                  <Text fontSize="2xl" fontFamily="Lucida Console" marginLeft="60px" marginRight="40px">
                    Some other tech I'm interested in is <Box as="span" color="#14e051">generative AI</Box>, React, ASP.NET, Github Actions, Python, Slack-bots, and building custom PCs.
                  </Text>
                  <Text fontSize="2xl" fontFamily="Lucida Console" marginLeft="60px" marginRight="40px">
                    Interested in collaborating? Check out the <Box as="span" color="#14e051">contact tab</Box> to get in touch!
                  </Text>
                  <Text fontSize="2xl" fontFamily="Lucida Console" marginLeft="40px" marginRight="40px">
                    &lt;<Box as="span" color="#167cdb">Introduction</Box>/&gt;
                  </Text>
                </Stack>
              </Center>
            </Box>
          )}
          {currentScreen === 'projects' && (
          <Flex
            position="fixed"
            top="0"
            left="0"
            right="0"
            bottom="0"
            alignItems="center"
            justifyContent="center"
          >
          <Box
            boxShadow="sm"
            bg="#151a24"
            w={["95vw", "90vw", "80vw", "70vw", "60vw"]}
            h={["75vh", "75vh", "75vh", "70vh", "70vh"]}
            borderRadius="6px"
            opacity="0"
            animation={
              hasContentBeenDisplayed === null
                ? "fadeIn .3s forwards"
                : hasContentBeenDisplayed
                ? "fadeIn .3s forwards"
                : "fadeIn .3s .4s forwards"
            }
            overflowY = "auto"
          >
            <Center p={4}>
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
                      <Badge colorScheme='blue'>Open-source</Badge>
                    </HStack>

                      <Text py='2' mb='-10' size='md'>
                      CLI utility for backing up
                      saved Reddit content, including comments, posts, and images.
                      Uses Python, the Reddit API, and OAuth2.
                      </Text>
                    </CardBody>

                    <CardFooter>
                      <Link href="https://github.com/kylemaestro/Saved-Archiver-for-Reddit">
                        <Button variant='solid' colorScheme='gray' leftIcon={<Icon as={BsGithub}/>} transitionDuration={buttonTransitionSpeed}>
                          Github
                        </Button>
                      </Link>
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
                      <Tooltip label="Steam page coming soon!" aria-label="coming-soon-steam" bg="#3e3841" color='#eaaeae' placement='right'>
                        <Button variant='solid' colorScheme='gray' leftIcon={<Icon as={BsSteam} />} className='disabled-button' transitionDuration={buttonTransitionSpeed} disabled style={{ cursor: 'not-allowed'}}>
                          Steam Page
                        </Button>
                      </Tooltip>
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
                    src={codefolioThumb}
                    alt='File folder with code in outrun style'
                  />

                  <Stack spacing={4}>
                    <CardBody>
                    <HStack spacing={1}>
                      <Heading size='md'>Codefolio</Heading>
                      <Badge colorScheme='blue'>Open-source</Badge>
                    </HStack>

                      <Text py='2' mb='-10'>
                      This website! Built with React+Electron and running on an AWS Lightsail instance.
                      </Text>
                    </CardBody>

                    <CardFooter>
                      <Link href="https://github.com/kylemaestro/codefolio">
                        <Button variant='solid' colorScheme='gray' leftIcon={<Icon as={BsGithub} />} transitionDuration={buttonTransitionSpeed}>
                          Github
                        </Button>
                      </Link>
                      <Link href="https://github.com/kylemaestro/codefolio#readme">
                        <Button variant='solid' colorScheme='gray' leftIcon={<Icon as={BiSolidBookBookmark} />} transitionDuration={buttonTransitionSpeed}>
                          Setup Guide
                        </Button>
                      </Link>
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
                    src={dinnerThumb}
                    alt='Arcade spaceships firing at each other'
                  />

                  <Stack spacing={4}>
                    <CardBody>
                    <HStack spacing={2}>
                      <Heading size='md'>Dinner's On You</Heading>
                      <Badge colorScheme='blue'>Open-source</Badge>
                    </HStack>

                      <Text py='2' mb='-10'>
                      2 Player versus game inspired by Asteroids. Players share a
                      keyboard to control spaceships, lay mines, command battleships,
                      and destroy the enemy base!
                      </Text>
                    </CardBody>

                    <CardFooter>
                      <Link href="https://github.com/kylemaestro/dinners-on-you">
                        <Button variant='solid' colorScheme='gray' marginRight="10px" leftIcon={<Icon as={BsGithub} />} transitionDuration={buttonTransitionSpeed}>
                          Github
                        </Button>
                      </Link>
                    </CardFooter>
                  </Stack>
                </Card>
              </Stack>
            </Center>
          </Box>
          </Flex>
          )}
          { currentScreen === 'contact' && (
            <Box
            boxShadow="sm"
            bg="#151a24"
            w={["95vw", "90vw", "80vw", "70vw", "60vw"]}
            h={["75vh", "75vh", "75vh", "70vh", "70vh"]}
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
            <Center width="100%">
              <Stack spacing={3}>
                <Tooltip label="Online" aria-label='Avatar tooltip' placement='right-end' bg="#45c781">
                  <Avatar
                    marginTop="8vh"
                    name="kyle andrus"
                    size="2xl"
                    src={kyleIcon}>
                    <AvatarBadge boxSize='.85em' bg='#45c781'/>
                  </Avatar>
                </Tooltip>
              </Stack>
            </Center>
            <Center marginTop="4vh" id='message-form'>
              <Stack spacing={3} width="50%">
                <Input
                  placeholder="your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <HStack width="100%">
                  <Input
                    placeholder="your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                  <Tooltip label="I'll only use your email to reply - no selling your info or spamming your inbox, promise!" aria-label="A tooltip" bg="#45c781">
                    <LockIcon/>
                  </Tooltip>
                </HStack>
                <Input
                  placeholder="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
                <Textarea
                  placeholder="🚀 ready to launch your message into my inbox?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button
                  transitionDuration={buttonTransitionSpeed}
                  onClick={() => handleSendMessageClick()}
                  _hover={{
                    backgroundColor: "#45c781",
                    color: "black"
                  }}
                  id = "sendMessageButton"
                >
                  Message Me!
                </Button>
              </Stack>
            </Center>
          </Box>
          )}
          { currentScreen === 'contact-confirmation' && (
            <Box
            boxShadow="sm"
            bg="#151a24"
            w={["95vw", "90vw", "80vw", "70vw", "60vw"]}
            h={["75vh", "75vh", "75vh", "70vh", "70vh"]}
            borderRadius="6px"
            position="fixed"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            >
              <Center width="100%">
              <Stack spacing={3}>
                <Tooltip label="Online" aria-label='Avatar tooltip' placement='right-end' bg="#45c781">
                  <Avatar
                    marginTop="8vh"
                    name="kyle andrus"
                    size="2xl"
                    src={kyleIcon}>
                    <AvatarBadge boxSize='.85em' bg='#45c781'/>
                  </Avatar>
                </Tooltip>
              </Stack>
            </Center>
              <Center marginTop="4vh">
                <Stack spacing={3} width="50%">
                  <Text py='4' mb='100' fontFamily="Lucida Console">
                    🚀 Message sent! I'll be in touch soon. 🚀
                  </Text>
                </Stack>
              </Center>
            </Box>
          )}
          { currentScreen === 'ai' && (
            <Box
              boxShadow="sm"
              bg="#151a24"
              w={["95vw", "90vw", "80vw", "70vw", "60vw"]}
              h={["75vh", "75vh", "75vh", "70vh", "70vh"]}
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
              <AbsoluteCenter>
                <Text py='2' mb='-10' fontFamily="Lucida Console">
                  🚧 Coming soon! 🚧
                </Text>
              </AbsoluteCenter>
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
