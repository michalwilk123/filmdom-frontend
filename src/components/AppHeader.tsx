import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  LinkBox,
  Spacer,
} from "@chakra-ui/react";
import React from "react";
import { Link as ReactLink, useHistory } from "react-router-dom";
import { CurrentUserStatus } from "./CurrentUserStatus";

export const AppHeader = () => {
  let history = useHistory();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log("siema siema");
  };

  return (
    <Box bgColor="red.300" height="80px" width="100%">
      <HStack
        paddingX="7"
        alignContent="center"
        width={{ base: "100%", xl: "80%" }}
        paddingY="2"
      >
        <Center>
          <LinkBox as={ReactLink} to="/home">
            <Heading pt="2" pl="5" fontSize="4xl">
              FilmDom
            </Heading>
          </LinkBox>
        </Center>
        <Spacer />
        <HStack alignSelf="center" spacing="5">
          <Button
            colorScheme="red"
            paddingX="10"
            onClick={() => history.push("/ranking")}
          >
            Ranking
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
    </Box>
  );
};
