import { Box, Container } from "@chakra-ui/react";
import React from "react";
import { LastCommentsFeed } from "./LastCommentsFeed";
import { RandomMoviesFeed } from "./RandomMoviesFeed";

export const HomePage = () => {
  return (
    <Container
      minWidth={{ base: "100vw", md: "90vw", lg: "80vw", xl: "70vw" }}
      display="flex"
    >
      <Box bgColor="white" width="30%">
        <LastCommentsFeed />
      </Box>

      <Box flex={1} maxW="70%">
        <RandomMoviesFeed />
      </Box>
    </Container>
  );
};
