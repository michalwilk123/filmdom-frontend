import { Flex, VStack } from "@chakra-ui/react";
import React, { ReactElement, useState } from "react";
import { MovieListElement } from "../../utils/backendInterfaces";
import { MovieCard } from "./MovieCard";
import { MovieFilterFeed } from "./MovieFilterFeed";

export const RankingPage = ():ReactElement => {
  const [movieRanking, setMovieRanking] = useState<MovieListElement[]>([]);

  return (
    <Flex
      bgColor="white"
      width={{ base: "100vw", md: "90vw", lg: "80vw", xl: "70vw" }}
      rounded="lg"
    >
      <MovieFilterFeed rankingStateFunc={setMovieRanking}/>
      <VStack>
        {movieRanking.map((movie:MovieListElement) => {
          <MovieCard movie={movie}/>
        })}
      </VStack>
    </Flex>
  );
}
