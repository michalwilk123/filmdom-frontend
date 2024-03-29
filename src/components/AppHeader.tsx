import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  LinkBox,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link as ReactLink, useHistory } from "react-router-dom";
import { useWindowDimensions } from "../utils/customHooks";
import { CurrentUserStatus } from "./CurrentUserStatus";
import queryString from "query-string";

interface HeaderVariantsProps {}

const AppHeaderDefault = (props: HeaderVariantsProps) => {
  const [inputVal, setInputVal] = useState("");
  let history = useHistory();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = queryString.stringify({ search_phrase: inputVal });
    history.push(`/ranking/${params}`);
    setInputVal("");
  };

  return (
    <Box bgColor="red.300" height="80px" width="100%">
      <HStack
        mx="auto"
        alignContent="center"
        width={{ base: "100%", xl: "60%" }}
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
          <Box></Box>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <InputGroup>
                <Input
                  autoComplete="false"
                  bgColor="white"
                  type="text"
                  placeholder="find movie"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
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

const AppHeaderSmall = (props: HeaderVariantsProps) => {
  let history = useHistory();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchPhrase = (e.currentTarget[0] as any).value;
    const params = queryString.stringify({ search_phrase: searchPhrase });
    history.push(`/ranking/${params}`);
  };

  return (
    <Box bgColor="red.300" minH="80px" width="100%">
      <VStack>
        <Flex width="100%" px="2" pt="2">
          <Button
            colorScheme="red"
            paddingX="10"
            onClick={() => history.push("/ranking")}
          >
            Ranking
          </Button>
          <Spacer />
          <CurrentUserStatus />
        </Flex>
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%", padding: "10px" }}
        >
          <FormControl>
            <InputGroup>
              <Input
                autoComplete="false"
                bgColor="white"
                type="reset"
                placeholder="find movie"
              />
              <InputRightElement paddingRight="4">
                <Button type="submit" h="1.75rem">
                  <SearchIcon />
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </form>
      </VStack>
    </Box>
  );
};

interface Props {}

export const AppHeader = (props: Props) => {
  const { width } = useWindowDimensions();

  if (width > 950) {
    return <AppHeaderDefault />;
  } else {
    return <AppHeaderSmall />;
  }
};
