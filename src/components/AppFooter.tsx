import { Flex, Text, Link, Center, VStack, HStack } from "@chakra-ui/react";
import React from "react";

export const AppFooter = () => {
  return (
    <Flex bgColor="gray.400" width="100vw" justifyContent="center" py="5">
      <Center width={{ base: "100vw", md: "90vw", lg: "80vw" }}>
        <VStack spacing="0">
          <Text as="b">Contact Info</Text>
          <HStack>
            <Link color="blue.600" href="https://github.com/michalwilk123">
              Github
            </Link>
            <Link color="blue.600">Blog</Link>
          </HStack>
          <Text>
            Created by Michał Wilk 2021 for{" "}
            <Link color="blue.600" href="https://idego-group.com/">
              Idego Group
            </Link>
          </Text>
          <Link to="/">Return to the main page</Link>
        </VStack>
      </Center>
    </Flex>
  );
};
