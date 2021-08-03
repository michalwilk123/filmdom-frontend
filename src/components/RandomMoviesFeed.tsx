import { Spacer, StackProps, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MovieListElement } from "../utils/backendInterfaces";
import { useWindowDimensions } from "../utils/customHooks";
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
  // NOTE: fetching data from api!
  return testFilmList.slice(0, num);
};

interface Props extends StackProps {
  args?: null;
}

export const RandomMoviesFeed = (props: Props) => {
  const [randomMovieList, setRandomMovieList] = useState<MovieListElement[]>(
    []
  );
  const { width } = useWindowDimensions();

  useEffect(() => {
    setRandomMovieList(fetchRandomMovies(NUM_OF_MOVIES));
  }, []);

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
