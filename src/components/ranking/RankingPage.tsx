import { Flex, VStack } from "@chakra-ui/react";
import React, { ReactElement, useState } from "react";
import { MovieListElement } from "../../utils/backendInterfaces";
import { useWindowDimensions } from "../../utils/responsiveUtils";
import { MovieCard } from "./MovieCard";
import { MovieFilterFeed } from "./MovieFilterFeed";

export const RankingPage = (): ReactElement => {
  const [movieRanking, setMovieRanking] = useState<MovieListElement[]>([]);
  const { width } = useWindowDimensions();

  return (
    <Flex
      bgColor="white"
      width={{ base: "100vw", md: "90vw", lg: "80vw", xl: "70vw" }}
      rounded="lg"
      px="5"
    >
      <VStack width="100%">
        <MovieFilterFeed rankingStateFunc={setMovieRanking} />
        <VStack px={5} width="100%">
          {movieRanking.map((movie: MovieListElement) => {
            return (
              <MovieCard
                showthumbnail={true && width > 1200}
                movie={movie}
                key={movie.id.toString()}
              />
            );
          })}
        </VStack>
      </VStack>
    </Flex>
  );
};
