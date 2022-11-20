import React, { useState } from 'react';
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Textarea,
  FormHelperText,
  InputRightElement,
} from '@chakra-ui/react';
import axios from "axios"

import { useToast } from '@chakra-ui/react';

export default function Register() {
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);
    const toast = useToast();

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const onFirstNameChange = (e) => {
        setFirstName(e.target.value)
    }
    const onLastNameChange = (e) => {
        setLastName(e.target.value)
    }
    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const onPwChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        try {
            const response = await axios.post(
                "https://doctagon.herokuapp.com/register",
                JSON.stringify({ email, password, "first_name": firstName, "last_name": lastName }),
                {
                  headers: { "Content-Type": "application/json" },
                }
              );
              alert("account successfully created")
              window.location = "/login"
        }
        catch (err) {
            alert("user already exists")
          }
    }

  return (
    <>
        <Box
            borderWidth="1px"
            rounded="lg"
            shadow="1px 1px 3px rgba(0,0,0,0.3)"
            maxWidth={800}
            p={6}
            m="100px auto"
            as="form">
        
        <>
            <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
            User Registration
            </Heading>
            <Flex>
            <FormControl mr="5%" onChange={onFirstNameChange}>
                <FormLabel htmlFor="first-name" fontWeight={'normal'}>
                First name
                </FormLabel>
                <Input id="first-name" placeholder="First name" />
            </FormControl>
    
            <FormControl onChange={onLastNameChange}>
                <FormLabel htmlFor="last-name" fontWeight={'normal'}>
                Last name
                </FormLabel>
                <Input id="last-name" placeholder="First name" />
            </FormControl>
            </Flex>
            <FormControl mt="2%" onChange={onEmailChange}>
            <FormLabel htmlFor="email" fontWeight={'normal'}>
                Email address
            </FormLabel>
            <Input id="email" type="email" />
            <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
    
            <FormControl onChange={onPwChange}>
            <FormLabel htmlFor="password" fontWeight={'normal'} mt="2%">
                Password
            </FormLabel>
            <InputGroup size="md">
                <Input
                pr="4.5rem"
                type={show ? 'text' : 'password'}
                placeholder="Enter password"
                />
                <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                </Button>
                </InputRightElement>
            </InputGroup>
            </FormControl>
        </>
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
              <Button
                w="7rem"
                colorScheme="blue"
                variant="solid"
                onClick={() => {
                  handleSubmit();
                  
                }}>
                Submit
              </Button>
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  );
}