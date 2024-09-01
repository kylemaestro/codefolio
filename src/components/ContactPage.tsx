import { Box, Center, Stack, Input, HStack, Tooltip, Textarea, Button, Avatar, AvatarBadge, useToast } from '@chakra-ui/react';
import { LockIcon } from '@chakra-ui/icons';
import kyleIcon from '../../assets/duck.svg';
import { useState } from 'react';

interface ContactPageProps {
  hasContentBeenDisplayed: boolean | null;
  buttonTransitionSpeed: string;
  setCurrentScreen: (screen: string) => void;
}

export default function ContactPage({
  hasContentBeenDisplayed,
  buttonTransitionSpeed,
  setCurrentScreen,
}: ContactPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  async function sendMessageToDiscordAsync() {
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
        title: 'Please fill out all fields prior to launch 💥🚀',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    await sendMessageToDiscordAsync();

    toast({
      title: 'Message sent!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    setName('');
    setEmail('');
    setSubject('');
    setMessage('');

    setCurrentScreen("contact-confirmation");

    setIsLoading(false);
  }

  return (
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
            onClick={handleSendMessageClick}
            _hover={{
              backgroundColor: "#45c781",
              color: "black"
            }}
            isLoading={isLoading}
            id = "sendMessageButton"
          >
            Message Me!
          </Button>
        </Stack>
      </Center>
    </Box>
  );
}
