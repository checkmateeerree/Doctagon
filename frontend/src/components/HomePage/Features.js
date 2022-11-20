
import { Box, SimpleGrid, Icon, Text, Stack, Flex, Heading, Center } from '@chakra-ui/react';
import { FcIdea, FcAssistant, FcAlarmClock } from 'react-icons/fc';


const Feature = ({ title, text, icon }) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'gray.100'}
        mb={1}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={'gray.600'}>{text}</Text>
    </Stack>
  );
};

export default function Features() {
  return (
    <Box px="80px" pb="100px" pt="70px" bg="#F5F5F5">
      <Center pb="50px">
        <Heading
            fontWeight="bold"
            fontSize={{ base: 'xl', sm: '2xl', md: '5xl' }}
            lineHeight={'110%'}>
            Features
        </Heading>
      </Center>
      
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Feature
          icon={<Icon as={FcIdea} w={10} h={10} />}
          title={'Artificial Intelligence'}
          text={
            'We use machine learning algorithms to diagnose you based on what symptoms you are experiencing.'
          }
        />
        <Feature
          icon={<Icon as={FcAlarmClock} w={10} h={10} />}
          title={'Fast Diagnosis'}
          text={
            'Our whole diagnosis process will take you less than 10 minutes to complete.'
          }
        />
        <Feature
          icon={<Icon as={FcAssistant} w={10} h={10} />}
          title={'Realtime Support'}
          text={
            'After providing you with potential diagnoses, we will connect you to a trusted healthcare professional remotely.'
          }
        />
      </SimpleGrid>
    </Box>
  );
}