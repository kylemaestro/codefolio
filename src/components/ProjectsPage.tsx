import { Box, Card, CardBody, CardFooter, Center, Flex, HStack, Image, Stack, Badge, Heading, Link, Button, Tooltip, Icon, Text} from '@chakra-ui/react';
import { BsGithub, BsSteam } from 'react-icons/bs';
import { BiSolidBookBookmark } from 'react-icons/bi';
import redditThumb from '../../assets/project-images/archiver.png';
import chickensThumb from '../../assets/project-images/chickens-preview.png';
import codefolioThumb from '../../assets/project-images/codefolio.png';
import dinnerThumb from '../../assets/project-images/dinner.png';

interface ProjectsPageProps {
  hasContentBeenDisplayed: boolean | null;
  buttonTransitionSpeed: string;
}

export default function ProjectsPage({ hasContentBeenDisplayed, buttonTransitionSpeed }: ProjectsPageProps) {
  return (
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
        overflowY="auto"
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
                    CLI utility for backing up saved Reddit content, including comments, posts, and images. Uses Python, the Reddit API, and OAuth2.
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
                    2D Action-strategy game inspired by Worms: Armageddon. Releasing on Steam in Early Access sometime in 2024!
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
                    2 Player versus game inspired by Asteroids. Players share a keyboard to control spaceships, lay mines, command battleships, and destroy the enemy base!
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
  );
}
