import { Flex, Heading, Select, Spacer } from "@chakra-ui/react";
import axios from "axios";
import React, { ReactElement, useEffect } from "react";
import { getMovieActors, getMovieGenres, getMovies } from "../../utils/apiConnector";
import { dispatchMovie, dispatchMovieGenres, dispatchMovieActors } from "../../utils/apiDispatcher";
import { MovieListElement } from "../../utils/backendInterfaces";
import { MovieSortMethods } from "../../utils/commonIterfaces";
import { sortMethodStringToEnum } from "../../utils/other";

/* NOTE: I chose that we really like the user resources and sort, filter the data
 * in backend. I do not know if this approach is correct. We can save up some
 * cpu time on backend if we leave the data unsorted
 */

// const testFilmList: MovieListElement[] = [
//   {
//     id: 1,
//     title: "Django Unchained",
//     thumbnail:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiM2ek2bgWMbQGeqTnArHy9RoEGS_z_RYUvlDrRxgBCXL0LzUD",
//     description: "very cool movie",
//     director: "Quentin Tarantino",
//     noOfComments: 2,
//     avgRating: 4,
//     produceDate: "1999-03-14",
//   },
//   {
//     id: 10,
//     title: "Forrest Gump",
//     thumbnail: "https://fwcdn.pl/fpo/09/98/998/7314731.3.jpg",
//     description: "nice movie",
//     director: "Robert Zemeckis",
//     noOfComments: 10,
//     avgRating: 4.2,
//     produceDate: "2001-02-10",
//   },
//   {
//     id: 2,
//     title: "Lorem Ipsum",
//     thumbnail: null,
//     description: "w/e movie",
//     director: "John Doe",
//     noOfComments: 0,
//     avgRating: 0,
//     produceDate: "2010-10-01",
//   },
// ];

const fetchRanking = (sort_method:MovieSortMethods): MovieListElement[] => {
  // NOTE: fetching data from the api!
  let movieGenres: string[];
  let movieActors: string[];
  let movieList: MovieListElement[] = [];

  axios
    .all([
      getMovieGenres(),
      getMovieActors(),
      getMovies({limit:5, sortMethod: sort_method }),
    ])
    .then(
      axios.spread((genreRes, actorRes, movieRes) => {
        movieGenres = genreRes.data;
        movieActors = actorRes.data;
        movieList = genreRes.data.results.map((x: any) => dispatchMovie(x));
        movieList
          .map((e) => dispatchMovieGenres(e, movieGenres))
          .map((e) => dispatchMovieActors(e, movieActors));
      })
    )
    .catch((errors) => console.log(errors));
  
  return movieList;
};

interface Props {
  rankingStateFunc: React.Dispatch<React.SetStateAction<MovieListElement[]>>;
}

export const MovieFilterFeed = (props: Props): ReactElement => {
  useEffect(() => {
    handleRankingListRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRankingListRequest = (
    e: React.SyntheticEvent | undefined = undefined
  ) => {
    if (e !== undefined) {
      e.preventDefault();
    }
    const movieList = fetchRanking(MovieSortMethods.BEST);

    props.rankingStateFunc(movieList);
  };

  const onSortTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const movieList = fetchRanking(sortMethodStringToEnum(e.target.value));
    props.rankingStateFunc(movieList);
  };

  return (
    <Flex py="3" px="6" width="inherit">
      <Heading>Ranking</Heading>
      <Spacer />
      <Select
        _hover={{ cursor: "pointer" }}
        onChange={onSortTypeChange}
        width="250px"
      >
        {Object.values(MovieSortMethods).map((method) => (
          <option key={method}>{method}</option>
        ))}
      </Select>
    </Flex>
  );
};
