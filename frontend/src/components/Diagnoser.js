import {
    Box,
    Heading,
    Container,
    Text,
    Button,
    Stack,
    FormControl,
    FormLabel,
    SimpleGrid,
    Input,
    Icon,
    useColorModeValue,
    createIcon,
    Checkbox, 
    CheckboxGroup,
    Link
  } from '@chakra-ui/react';
  import { Autocomplete, Option } from 'chakra-ui-simple-autocomplete';
 
  import { useEffect, useState } from 'react';
  import processSymptoms from '../utils/symptoms';

const symptomList = processSymptoms()
const options = {}
for (let i = 0; i < symptomList.length; i++){
    options[symptomList[i]] = symptomList[i]
}
console.log(options)

export default function Diagnoser() {
const [input, setInput] = useState("")
const [symptoms, setSymptoms] = useState([])
const [result, setResult] = useState([])

const handlePress = (e) => {
   
}


return (    
    <>

    <Container maxW={'3xl'}>
        <Stack
        as={Box}
        textAlign={'center'}
        spacing={{ base: 8, md: 14 }}
        py={{ base: "100px", md: "200px" }}>
            <Heading
                fontWeight="bold"
                fontSize={{ base: '2xl', sm: '4xl', md: '5xl' }}
                lineHeight={'110%'}>
                Diagnose your symptoms below.<br />
            </Heading>

            <Autocomplete
                options={options}
                result={result}
                setResult={(options1) => setResult(options1)}
                placeholder="Enter your symptoms here"
            />
           
            <Button size="lg" colorScheme="teal">
                Submit
            </Button>
        </Stack>
    </Container>
    </>
);
}
