import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import { LastCommentsFeed } from "./LastCommentsFeed";
import { RandomMoviesFeed } from "./RandomMoviesFeed";

export const HomePage = () => {
  return (
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
  );
};
