import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { useWindowDimensions } from "../utils/customHooks";
import { LastCommentsFeed } from "./LastCommentsFeed";
import { RandomMoviesFeed } from "./RandomMoviesFeed";

const HomePageDefault = () => {
  return (
    <Container
      minWidth={{ base: "100%", md: "90%", lg: "80%", xl: "70%" }}
      display="flex"
    >
      <Box bgColor="white" width="30%">
        <Flex px="2" py="2" bgColor="white" justifyContent="center">
          <Heading fontSize="2xl" fontWeight="medium">
            Last comments
          </Heading>
        </Flex>
        <LastCommentsFeed />
      </Box>

      <Box flex={1} maxW="70%">
        <Flex
          px="2"
          pb="5"
          pt="2"
          bgColor="white"
          justifyContent="center"
          mx="2"
        >
          <Heading fontSize="2xl" fontWeight="medium">
            This movies may interest you
          </Heading>
        </Flex>
        <RandomMoviesFeed pt="2" px="2" width="100%" />
      </Box>
    </Container>
  );
};

const HomePageSmall = () => {
  return (
    <Container minWidth={{ base: "100vw", md: "90vw", lg: "80vw", xl: "70vw" }}>
      <Flex px="2" py="2" bgColor="white" justifyContent="center">
        <Heading fontSize="2xl" fontWeight="medium">
          This movies may interest you
        </Heading>
      </Flex>
      <Flex mb="3">
        <RandomMoviesFeed px="0" width="100%" spacing="1" />
      </Flex>

      <Flex px="2" py="2" bgColor="white" justifyContent="center">
        <Heading fontSize="2xl" fontWeight="medium">
          Last comments
        </Heading>
      </Flex>

      <Flex>
        <LastCommentsFeed />
      </Flex>
    </Container>
  );
};

export const HomePage = () => {
  const { width } = useWindowDimensions();

  if (width > 900) {
    return <HomePageDefault />;
  } else {
    return <HomePageSmall />;
  }
};
