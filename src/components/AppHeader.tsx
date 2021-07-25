import { SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  Flex,
  FormControl,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
} from "@chakra-ui/react";
import React from "react";
import { CurrentUserStatus } from "./CurrentUserStatus";

export const AppHeader = () => {
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log("siema siema");
  };

  return (
    <Flex bgColor="red.300" width="100vw" height="80px">
      <HStack
        paddingX="7"
        alignContent="center"
        templateColumns="repeat(5, 1fr)"
        width={{ base: "100vw", xl: "80vw" }}
        paddingY="2"
      >
        <Center>
          <Heading pt="2" pl="5" fontSize="4xl">
            FilmDom
          </Heading>
        </Center>
        <Spacer />
        <HStack alignSelf="center" spacing="5">
          <Button colorScheme="blackAlpha" paddingX="10">
            Ranking filmów
          </Button>
          <form onSubmit={handleSubmit}>
            <FormControl onSubmit={handleSubmit}>
              <InputGroup>
                <Input
                  autoComplete="false"
                  bgColor="white"
                  type="text"
                  placeholder="szukaj filmu"
                />
                <InputRightElement paddingRight="4">
                  <Button type="submit" h="1.75rem">
                    <SearchIcon />
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </form>
          <CurrentUserStatus />
        </HStack>
      </HStack>
    </Flex>
  );
};
