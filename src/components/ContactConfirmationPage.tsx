import { Box, Center, Stack, Text, Avatar, AvatarBadge, Tooltip } from '@chakra-ui/react';
import kyleIcon from '../../assets/duck.svg';

export default function ContactConfirmationPage() {
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
  );
}
