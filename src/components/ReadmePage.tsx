import { Box, Center, Stack, Text } from '@chakra-ui/react';

interface ReadmePageProps {
  hasContentBeenDisplayed: boolean | null;
}

export default function ReadmePage({ hasContentBeenDisplayed }: ReadmePageProps) {
  return (
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
          <Text fontSize="2xl" fontFamily="Lucida Console" marginLeft="40px" marginRight="40px">
            Interested in collaborating? Check out the <Box as="span" color="#14e051">contact tab</Box> to get in touch!
          </Text>
          <Text fontSize="2xl" fontFamily="Lucida Console" marginLeft="40px" marginRight="40px">
            &lt;<Box as="span" color="#167cdb">Introduction</Box>/&gt;
          </Text>
        </Stack>
      </Center>
    </Box>
  );
}
