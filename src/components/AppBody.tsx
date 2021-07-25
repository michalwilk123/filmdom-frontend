import { Flex, Grid, GridItem, Spacer } from "@chakra-ui/react";
import React from "react";
import { LastCommentsFeed } from "./LastCommentsFeed";
import { RandomMoviesFeed } from "./RandomMoviesFeed";

export const AppBody = () => {
  return (
    <Flex
      width="100vw"
      bgColor="gray.100"
      justifyContent="center"
      p="5"
      minHeight="700"
    >
      <Grid
        templateColumns="repeat(6, 1fr)"
        width={{ base: "100vw", md: "90vw", lg: "80vw", xl: "70vw" }}
        gap={5}
      >
        <GridItem boxShadow="base" rounded="lg" colSpan={2} bgColor="white">
          <LastCommentsFeed />
        </GridItem>
        <GridItem boxShadow="base" rounded="lg" colSpan={4} bgColor="white">
          <RandomMoviesFeed />
        </GridItem>
      </Grid>
    </Flex>
  );
};
