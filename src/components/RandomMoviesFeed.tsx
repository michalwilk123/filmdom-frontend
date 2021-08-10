import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  Flex,
  Spacer,
  StackProps,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  getMovieActors,
  getMovieGenres,
  getMovies,
} from "../utils/apiConnector";
import {
  dispatchMovie,
  dispatchMovieActors,
  dispatchMovieGenres,
} from "../utils/apiDispatcher";
import { MovieListElement } from "../utils/backendInterfaces";
import {
  MovieSortMethods,
  ResponseListElement,
} from "../utils/commonIterfaces";
import { useWindowDimensions } from "../utils/customHooks";
import { MovieCard } from "./ranking/MovieCard";

interface Props extends StackProps {
  args?: null;
}

export const RandomMoviesFeed = (props: Props) => {
  const [nextPage, setNextPage] = useState<null | string>(null);
  const [prevPage, setPrevPage] = useState<null | string>(null);
  const [randomMovieList, setRandomMovieList] = useState<MovieListElement[]>(
    []
  );
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  const { width } = useWindowDimensions();

  useEffect(() => {
    fetchRandomMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPageNum]);

  const fetchRandomMovies = (): void => {
    let movieGenres: string[];
    let movieActors: string[];
    let movieList: MovieListElement[] = [];

    axios
      .all([
        getMovieGenres(),
        getMovieActors(),
        getMovies({
          sortMethod: MovieSortMethods.RANDOM,
          page: currentPageNum,
        }),
      ])
      .then(
        axios.spread((genreRes, actorRes, movieRes) => {
          genreRes.data.sort(
            (a: ResponseListElement, b: ResponseListElement) => a.id - b.id
          );
          actorRes.data.sort(
            (a: ResponseListElement, b: ResponseListElement) => a.id - b.id
          );

          movieGenres = genreRes.data.map((x: ResponseListElement) => x.name);
          movieActors = actorRes.data.map((x: ResponseListElement) => x.name);
          movieList = movieRes.data.results.map((x: any) => dispatchMovie(x));
          movieList
            .map((e) => dispatchMovieGenres(e, movieGenres))
            .map((e) => dispatchMovieActors(e, movieActors));
          setNextPage(movieRes.data.next);
          setPrevPage(movieRes.data.previous);
          setRandomMovieList(movieList);
        })
      )
      .catch((errors) => console.log(errors));
  };

  return (
    <VStack {...props}>
      {randomMovieList.map((movie: MovieListElement, index: number) => (
        <MovieCard
          bgColor="gray.100"
          width="inherit"
          movie={movie}
          key={index}
          args={{
            showthumbnail: width > 1200,
            allowCommenting: true,
          }}
        />
      ))}
      <Spacer />
      {(nextPage || prevPage) && (
        <Flex width="inherit" justifyContent="center" backgroundColor="white">
          <ButtonGroup my="5px" p="1px">
            {prevPage && (
              <Button
                onClick={() => setCurrentPageNum(currentPageNum - 1)}
                mr="10px"
              >
                <ChevronLeftIcon mr="5px" /> Previous
              </Button>
            )}
            {nextPage && (
              <Button
                onClick={() => setCurrentPageNum(currentPageNum + 1)}
                ml="10px"
              >
                Next <ChevronRightIcon ml="5px" />
              </Button>
            )}
          </ButtonGroup>
        </Flex>
      )}
    </VStack>
  );
};
