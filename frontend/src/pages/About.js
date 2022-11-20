import { Heading, Flex, Text, VStack, Center, Box, Wrap} from "@chakra-ui/react";

export default function About() {
  return (
    <Flex px="8" justify="center" pb="50" py="100px">
        <VStack spacing="20px" maxWidth="800px">
          <Heading textAlign="center" borderBottom="1px solid" pb="5" width="400px">Our Purpose</Heading>
          <Center px="25px">
            <Text textAlign="center">In today's world, medical access is severely 
                restricted due to numerous factors, such as the rising cost, 
                and geographical restrictions of healthcare. Some of our team members have experienced this issue
                firsthand, having lived in rural areas before.
                This is why we created Doctagon, 
                an online AI service that uses machine learning to diagnose
                users based on symptoms they're experiencing.
                After diagnosing these users, Doctagon refers them to trusted healthcare professionals remotely
                so they can receive quick access to quality medical attention. In addition, Doctagon will refer 
                them to in-person healthcare providers if they want to receive further care for their symptoms.
                We provide easy access for everyone to receive the attention they need for their medical issues.
            </Text>
          </Center>
        </VStack>
    </Flex>

  );
}
