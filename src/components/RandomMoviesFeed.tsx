import { Spacer, StackProps, VStack } from "@chakra-ui/react";
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
import { MovieSortMethods, ResponseListElement } from "../utils/commonIterfaces";
import { useWindowDimensions } from "../utils/customHooks";
import { MovieCard } from "./ranking/MovieCard";

const NUM_OF_MOVIES = 5;

// const testFilmList: MovieListElement[] = [
//   {
//     id: 1,
//     title: "Django Unchained",
//     thumbnail:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiM2ek2bgWMbQGeqTnArHy9RoEGS_z_RYUvlDrRxgBCXL0LzUD",
//     description: "very cool movie",
//     director: "Quentin Tarantino",
//     avgRating: 4,
//     produceDate: "1999-03-14",
//   },
//   {
//     id: 10,
//     title: "Forrest Gump",
//     thumbnail: "https://fwcdn.pl/fpo/09/98/998/7314731.3.jpg",
//     description: "nice movie",
//     director: "Robert Zemeckis",
//     avgRating: 4.2,
//     produceDate: "2001-02-10",
//   },
//   {
//     id: 2,
//     title: "Lorem Ipsum",
//     thumbnail: null,
//     description: "w/e movie",
//     director: "John Doe",
//     avgRating: 0,
//     produceDate: "2010-10-01",
//   },
// ];

interface Props extends StackProps {
  args?: null;
}

export const RandomMoviesFeed = (props: Props) => {
  const [nextPage, setNextPage] = useState<null | string>(null);
  const [prevPage, setPrevPage] = useState<null | string>(null);
  const [randomMovieList, setRandomMovieList] = useState<MovieListElement[]>(
    []
  );
  const { width } = useWindowDimensions();

  useEffect(() => {
    setRandomMovieList(fetchRandomMovies());
  }, []);

  const fetchRandomMovies = (): MovieListElement[] => {
    let movieGenres: string[];
    let movieActors: string[];
    let movieList: MovieListElement[] = [];

    axios
      .all([
        getMovieGenres(),
        getMovieActors(),
        getMovies({ sortMethod: MovieSortMethods.RANDOM }),
      ])
      .then(
        axios.spread((genreRes, actorRes, movieRes) => {
          console.log(genreRes.data);
          genreRes.data.sort((a:ResponseListElement,b:ResponseListElement)=>a.id-b.id);
          actorRes.data.sort((a:ResponseListElement,b:ResponseListElement)=>a.id-b.id);

          movieGenres = genreRes.data.map((x: ResponseListElement) => x.name);
          movieActors = actorRes.data.map((x: ResponseListElement) => x.name);
          movieList = movieRes.data.results.map((x: any) => dispatchMovie(x));
          movieList
            .map((e) => dispatchMovieGenres(e, movieGenres))
            .map((e) => dispatchMovieActors(e, movieActors));
          setNextPage(movieRes.data.next);
          setPrevPage(movieRes.data.prev);
          setRandomMovieList(movieList);
        })
      )
      .catch((errors) => console.log(errors));

    return movieList;
    // NOTE: fetching data from api!
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
    </VStack>
  );
};
