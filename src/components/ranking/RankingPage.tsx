import { Flex, VStack } from "@chakra-ui/react";
import React, { ReactElement, useState } from "react";
import { MovieListElement } from "../../utils/backendInterfaces";
import { useWindowDimensions } from "../../utils/responsiveUtils";
import { MovieCard } from "./MovieCard";
import { MovieFilterFeed } from "./MovieFilterFeed";

export const RankingPage = (): ReactElement => {
  const [movieRanking, setMovieRanking] = useState<MovieListElement[]>([]);
  const { width } = useWindowDimensions();

  const isThumbnailShown = (): boolean => {
    return width > 1200;
  };

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
                showthumbnail={isThumbnailShown()}
                movie={movie}
                key={movie.id.toString()}
                isUserLogged={true}
              />
            );
          })}
        </VStack>
      </VStack>
    </Flex>
  );
};
