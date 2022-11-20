import { Flex, Text, Wrap, WrapItem, Stack } from "@chakra-ui/layout";
import { Button, Link } from "@chakra-ui/react";
import React from "react";

export default function CallToAction() {
  return (
    <Flex bgColor="white" px={4} py={16} justify="center">
        <Stack>
        <Text fontSize={{ base: "md", md: "xl", lg: "2xl" }} my="auto" fontWeight="medium">
            Sign up to our website to access our online resources and features!
        </Text>
    
        <Wrap my="auto" spacing="12px" justify="center">
        <WrapItem>
          <Button
            colorScheme="blue"
            borderRadius="8px"
            variant="outline"
            py="4"
            px="4"
            lineHeight="1"
          >
            <Link href="/register">
                Join Today  
            </Link>
          </Button>
        </WrapItem>
        <WrapItem>
          <Button
            colorScheme="teal"
            borderRadius="8px"
            variant="outline"
            py="4"
            px="4"
            lineHeight="1"
          >
            <Link href="/contact">
                Contact Us 
            </Link>
          </Button>
        </WrapItem>
      </Wrap>
      </Stack>
    </Flex>
  );
}
