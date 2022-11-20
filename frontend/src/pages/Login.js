import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    Link,
    useColorModeValue,
  } from '@chakra-ui/react';

  import { useState } from 'react';
  import axios from "axios"
  
  export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const onPwChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(
                "https://doctagon.herokuapp.com/login",
                JSON.stringify({ email, password }),
                {
                  headers: { "Content-Type": "application/json" },
                }
              );
              localStorage.setItem("SESSION_ID", response.data["SESSION_ID"])
              alert("successfully logged in")
              window.location = "/"
        }
        catch (err) {
            alert("incorrect user credentials")
          }
    }

    return (
      <Flex
        mt={-6}
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={5}>
              <FormControl id="email" onChange={onEmailChange}>
                <FormLabel>Email</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password" onChange={onPwChange}>
                <FormLabel>Password</FormLabel>
                <Input type="password" />
              </FormControl>
              <Stack spacing={5}>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={handleSubmit}
                  >
                  Sign In
                </Button>
                <Text>----------------------------or----------------------------</Text>
                <Button
                    bg={'green.400'}
                    color={'white'}
                    _hover={{
                        bg: 'green.500',
                    }}>
                    <Link href="/register">
                        Register
                    </Link>
                </Button>
                
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }