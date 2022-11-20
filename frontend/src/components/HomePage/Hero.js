import {
    Box,
    Heading,
    Container,
    Text,
    Button,
    Stack,
    Icon,
    useColorModeValue,
    createIcon,
    Link
  } from '@chakra-ui/react';

export default function Hero() {
return (
    <>

    <Container maxW={'3xl'}>
        <Stack
        as={Box}
        textAlign={'center'}
        spacing={{ base: 8, md: 14 }}
        py={{ base: 20, md: 36 }}>
        <Heading
            fontWeight="bold"
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            Get medical help from <br />
            <Text as={'span'} color={'green.400'}>
            your home
            </Text>
        </Heading>
        <Text color={'gray.500'}>
            Track your health by entering information to our website about 
            your symptoms whenever you feel any discomfort. We will then diagnose
            the issue and refer you to a trusted professional.               
        </Text>
        <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
            <Link href="/register">
            <Button
                colorScheme={'green'}
                bg={'green.400'}
                rounded={'full'}
                px={6}
                _hover={{
                bg: 'green.500',
                }}>
                Get Started
            </Button>
            </Link>
            <Link href="/about">
            <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
                Learn more
            </Button>
            </Link>
        </Stack>
        </Stack>
    </Container>
    </>
);
}
