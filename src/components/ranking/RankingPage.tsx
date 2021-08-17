import { Button, ButtonGroup, Flex, Spacer, VStack } from "@chakra-ui/react";
import axios from "axios";
import React, { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  getMovieGenres,
  getMovieActors,
  getMovies,
} from "../../utils/apiConnector";
import {
  dispatchMovie,
  dispatchMovieGenres,
  dispatchMovieActors,
} from "../../utils/apiDispatcher";
import { MovieListElement } from "../../utils/backendInterfaces";
import { MovieSortMethods } from "../../utils/commonIterfaces";
import { useWindowDimensions } from "../../utils/customHooks";
import { MovieCard } from "./MovieCard";
import { MovieFilterFeed } from "./MovieFilterFeed";
import queryString from "query-string";
import { flattenDict, sortMethodStringToEnum } from "../../utils/other";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

export const RankingPage = (): ReactElement => {
  const [movieRanking, setMovieRanking] = useState<MovieListElement[]>([]);
  const { args } = useParams<{ args: string | undefined }>();
  const [nextPage, setNextPage] = useState<null | string>(null);
  const [prevPage, setPrevPage] = useState<null | string>(null);
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);

  const { width } = useWindowDimensions();

  useEffect(() => {
    // FETCHING INITIAL DATA
    let fetchParams: any = {};

    if (args) {
      const urlParams = queryString.parse(args);
      urlParams.sort_method &&
        (fetchParams.sort_method = sortMethodStringToEnum(
          urlParams.sort_method as string
        ));
      urlParams.search_phrase &&
        urlParams.search_phrase.length > 2 &&
        (fetchParams.searchPhrase = urlParams.search_phrase);
    }
    fetchRanking(fetchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [args, currentPageNum]);

  const fetchRanking = (args: {
    sort_method?: MovieSortMethods;
    searchPhrase?: string;
  }): MovieListElement[] => {
    let movieGenres: { [key: string]: string };
    let movieActors: string[];
    let movieList: MovieListElement[] = [];

    axios
      .all([
        getMovieGenres(),
        getMovieActors(),
        getMovies({
          sortMethod: args.sort_method,
          searchPhrase: args.searchPhrase,
          page: currentPageNum,
        }),
      ])
      .then(
        axios.spread((genreRes, actorRes, movieRes) => {
          movieGenres = flattenDict(genreRes.data);
          movieActors = actorRes.data;
          movieList = movieRes.data.results.map((x: any) => dispatchMovie(x));
          movieList = movieList
            .map((e) => dispatchMovieGenres(e, movieGenres))
            .map((e) => dispatchMovieActors(e, movieActors));
          setNextPage(movieRes.data.next);
          setPrevPage(movieRes.data.previous);
          setMovieRanking(movieList);
        })
      )
      .catch((errors) => console.log(errors));

    return movieList;
  };

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
        <MovieFilterFeed />
        <VStack px={5} width="100%">
          {movieRanking.map((movie: MovieListElement) => {
            return (
              <MovieCard
                movie={movie}
                key={movie.id.toString()}
                width="inherit"
                bgColor="gray.100"
                p="2"
                args={{
                  showthumbnail: isThumbnailShown(),
                  allowCommenting: true,
                }}
              />
            );
          })}
        </VStack>
        <Spacer />
        {(nextPage || prevPage) && (
          <Flex width="inherit" justifyContent="center" backgroundColor="white">
            <ButtonGroup mb="10px" p="1px">
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
    </Flex>
  );
};
