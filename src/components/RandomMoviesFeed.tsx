import { Spacer, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MovieListElement } from "../utils/backendInterfaces";
import { MovieCard } from "./ranking/MovieCard";

const NUM_OF_MOVIES = 5;

const testFilmList: MovieListElement[] = [
  {
    id: 1,
    title: "Django Unchained",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiM2ek2bgWMbQGeqTnArHy9RoEGS_z_RYUvlDrRxgBCXL0LzUD",
    description: "very cool movie",
    director: "Quentin Tarantino",
    noOfComments: 2,
    avgRating: 4,
    produceDate: "1999-03-14",
  },
  {
    id: 10,
    title: "Forrest Gump",
    thumbnail: "https://fwcdn.pl/fpo/09/98/998/7314731.3.jpg",
    description: "nice movie",
    director: "Robert Zemeckis",
    noOfComments: 10,
    avgRating: 4.2,
    produceDate: "2001-02-10",
  },
  {
    id: 2,
    title: "Lorem Ipsum",
    thumbnail: null,
    description: "w/e movie",
    director: "John Doe",
    noOfComments: 0,
    avgRating: 0,
    produceDate: "2010-10-01",
  },
];

const fetchRandomMovies = (num: number): MovieListElement[] => {
  return testFilmList.slice(0, num);
};

export const RandomMoviesFeed = () => {
  const [randomMovieList, setRandomMovieList] = useState<MovieListElement[]>(
    []
  );

  useEffect(() => {
    setRandomMovieList(fetchRandomMovies(NUM_OF_MOVIES));
  }, []);

  return (
    <VStack height="full" pt="2" px="2" width="100%">
      {randomMovieList.map((movie: MovieListElement) => (
        <MovieCard
          bgColor="gray.100"
          width="inherit"
          // TODO : clean this!
          // my="2"
          // width="300px"
          movie={movie}
          args={{ showthumbnail: true }}
        />
      ))}
      <Spacer />
    </VStack>
  );
};
